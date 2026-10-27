// Unit tests for POST /api/contact. Run: node --test worker/
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.js';

const ENV = { TURNSTILE_SECRET: 'ts-secret', NOTION_TOKEN: 'ntn-secret', NOTION_DATABASE_ID: 'db-id', APPS_SCRIPT_URL: 'https://script.example/exec', FORM_SECRET: 'form-secret', ASSETS: { fetch: async () => new Response('asset') } };
let n = 0;
const req = (body, { method = 'POST', ip } = {}) => new Request('https://frontdesk.whitelabelpress.com/api/contact', { method, headers: { 'content-type': 'application/json', 'cf-connecting-ip': ip || `203.0.113.${++n % 250}-${n}` }, body: method === 'POST' ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined });
const good = { name: 'Jane Cruz', email: 'Jane@Example.com', business: 'Cruz Dental', message: 'Hi!\nCan you set this up for my clinic?', 'cf-turnstile-response': 'tok', notes: '/?utm_source=x' };

function mockFetch({ turnstile = true, notion = 200, apps = { ok: true }, appsStatus = 200 } = {}) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    url = String(url); calls.push({ url, init });
    if (url.includes('turnstile')) return Response.json({ success: turnstile });
    if (url.includes('notion.com')) return new Response(notion === 200 ? '{}' : 'boom', { status: notion });
    if (url.includes('script.example')) return Response.json(apps, { status: appsStatus });
    throw new Error('unexpected ' + url);
  };
  return calls;
}
const call = (r, env = ENV) => worker.fetch(r, env);
const errs = []; const origErr = console.error; console.error = (...a) => errs.push(a.join(' '));

test('success: calls turnstile, notion and apps script with the right payloads', async () => {
  const calls = mockFetch();
  const res = await call(req(good));
  assert.equal(res.status, 200); assert.deepEqual(await res.json(), { ok: true });
  assert.equal(calls.length, 3);
  const nt = calls.find((c) => c.url.includes('notion.com'));
  assert.equal(nt.init.headers['notion-version'], '2022-06-28');
  assert.equal(nt.init.headers.authorization, 'Bearer ntn-secret');
  const nb = JSON.parse(nt.init.body);
  assert.deepEqual(nb.parent, { database_id: 'db-id' });
  assert.deepEqual(Object.keys(nb.properties).sort(), ['Business', 'Email', 'Message', 'Name', 'Notes', 'Source', 'Status']);
  assert.equal(nb.properties.Name.title[0].text.content, 'Jane Cruz');
  assert.deepEqual(nb.properties.Email, { email: 'Jane@Example.com' });
  assert.equal(nb.properties.Business.rich_text[0].text.content, 'Cruz Dental');
  assert.equal(nb.properties.Message.rich_text[0].text.content, 'Hi!\nCan you set this up for my clinic?');
  assert.equal(nb.properties.Source.select.name, 'frontdesk.whitelabelpress.com');
  assert.equal(nb.properties.Status.select.name, 'New');
  assert.equal(nb.properties.Notes.rich_text[0].text.content, '/?utm_source=x');
  const ap = JSON.parse(calls.find((c) => c.url.includes('script.example')).init.body);
  assert.equal(ap.secret, 'form-secret');
  assert.deepEqual({ ...ap.fields, submitted: undefined }, { name: 'Jane Cruz', email: 'Jane@Example.com', business: 'Cruz Dental', message: 'Hi!\nCan you set this up for my clinic?', source: 'frontdesk.whitelabelpress.com', submitted: undefined, notes: '/?utm_source=x' });
  assert.ok(!isNaN(Date.parse(ap.fields.submitted)));
  const ts = calls.find((c) => c.url.includes('turnstile')).init.body; assert.equal(ts.get('secret'), 'ts-secret'); assert.equal(ts.get('response'), 'tok');
});
test('business is optional and omitted from Notion/email when empty', async () => {
  const calls = mockFetch();
  const res = await call(req({ ...good, business: '   ' })); assert.equal(res.status, 200);
  assert.ok(!('Business' in JSON.parse(calls.find((c) => c.url.includes('notion.com')).init.body).properties));
  assert.ok(!('business' in JSON.parse(calls.find((c) => c.url.includes('script.example')).init.body).fields));
});
test('validates name, business and message (required / max length)', async () => {
  const calls = mockFetch();
  const cases = [
    [{ name: '' }, 'name'], [{ name: '   ' }, 'name'], [{ name: 5 }, 'name'], [{ name: 'x'.repeat(101) }, 'name'],
    [{ business: 'x'.repeat(151) }, 'business'],
    [{ message: '' }, 'message'], [{ message: '  \n ' }, 'message'], [{ message: null }, 'message'], [{ message: 'x'.repeat(2001) }, 'message'],
  ];
  for (const [patch, field] of cases) { const res = await call(req({ ...good, ...patch })); assert.equal(res.status, 400, JSON.stringify(patch).slice(0, 40)); assert.equal((await res.json()).field, field); }
  assert.equal((await call(req({ ...good, message: 'x'.repeat(2000) }))).status, 200);
  assert.equal(calls.filter((c) => c.url.includes('notion.com')).length, 1);
});
test('honeypot returns ok without calling anything', async () => {
  const calls = mockFetch();
  const res = await call(req({ ...good, company_url: 'http://spam' }));
  assert.deepEqual(await res.json(), { ok: true }); assert.equal(calls.length, 0);
});
test('rejects bad emails', async () => {
  const calls = mockFetch();
  for (const email of ['', 'nope', 'a@b', 'a b@c.com', 'a@@b.com', 'x'.repeat(250) + '@b.co', 123, null]) {
    const res = await call(req({ ...good, email })); assert.equal(res.status, 400, String(email)); assert.equal((await res.json()).field, 'email');
  }
  assert.equal(calls.length, 0);
});
test('rejects missing / bad turnstile', async () => {
  mockFetch();
  { const { 'cf-turnstile-response': _t, ...noTok } = good; assert.equal((await call(req(noTok))).status, 403); }
  mockFetch({ turnstile: false });
  assert.equal((await call(req(good))).status, 403);
});
test('invalid json, non-object, wrong method', async () => {
  mockFetch();
  assert.equal((await call(req('{nope'))).status, 400);
  assert.equal((await call(req('[1]'))).status, 400);
  const g = await call(req(null, { method: 'GET' })); assert.equal(g.status, 405); assert.equal(g.headers.get('allow'), 'POST');
});
test('ok if only notion succeeds', async () => {
  mockFetch({ apps: { ok: false, error: 'x' } }); errs.length = 0;
  const res = await call(req(good)); assert.equal(res.status, 200); assert.ok(errs.some((e) => e.includes('email failed')));
});
test('ok if only email succeeds', async () => {
  mockFetch({ notion: 500 }); errs.length = 0;
  const res = await call(req(good)); assert.equal(res.status, 200); assert.ok(errs.some((e) => e.includes('notion failed')));
});
test('502 JSON error if both fail, secrets never leak', async () => {
  mockFetch({ notion: 500, apps: { ok: false }, appsStatus: 500 }); errs.length = 0;
  const res = await call(req(good)); const t = await res.text();
  assert.equal(res.status, 502); assert.equal(JSON.parse(t).ok, false);
  for (const s of ['ntn-secret', 'form-secret', 'ts-secret', 'script.example', 'db-id']) assert.ok(!t.includes(s), s);
  assert.equal(errs.length, 2);
});
test('missing bindings count as failures; ok if the other works', async () => {
  mockFetch(); const { NOTION_TOKEN, ...noNotion } = ENV; errs.length = 0;
  assert.equal((await call(req(good), noNotion)).status, 200);
  const { APPS_SCRIPT_URL, ...noApps } = ENV; assert.equal((await call(req(good), { ...noNotion, ...{ APPS_SCRIPT_URL: undefined } })).status, 502);
  assert.equal((await call(req(good), noApps)).status, 200);
  assert.equal((await call(req(good), { ...ENV, TURNSTILE_SECRET: undefined })).status, 503);
});
test('turnstile outage -> 502; oversized body -> 413; notes truncated', async () => {
  globalThis.fetch = async () => { throw new Error('net'); };
  assert.equal((await call(req(good))).status, 502);
  mockFetch(); assert.equal((await call(req('x'.repeat(9000)))).status, 413);
  const calls = mockFetch(); await call(req({ ...good, notes: 'a'.repeat(1000) }));
  assert.equal(JSON.parse(calls.find((c) => c.url.includes('notion.com')).init.body).properties.Notes.rich_text[0].text.content.length, 300);
});
test('rate limit per ip, and non-api paths go to assets', async () => {
  mockFetch(); let last;
  for (let i = 0; i < 12; i++) last = await call(req(good, { ip: '198.51.100.9' }));
  assert.equal(last.status, 429);
  const a = await call(new Request('https://x/')); assert.equal(await a.text(), 'asset');
  console.error = origErr;
});
