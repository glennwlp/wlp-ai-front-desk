// Unit tests for POST /api/signup. Run: node --test worker/
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.js';

const ENV = { TURNSTILE_SECRET: 'ts-secret', NOTION_TOKEN: 'ntn-secret', NOTION_DATABASE_ID: 'db-id', APPS_SCRIPT_URL: 'https://script.example/exec', FORM_SECRET: 'form-secret', ASSETS: { fetch: async () => new Response('asset') } };
let n = 0;
const req = (body, { method = 'POST', ip } = {}) => new Request('https://frontdesk.whitelabelpress.com/api/signup', { method, headers: { 'content-type': 'application/json', 'cf-connecting-ip': ip || `203.0.113.${++n % 250}-${n}` }, body: method === 'POST' ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined });
const good = { email: 'Jane@Example.com', 'cf-turnstile-response': 'tok', notes: '/?utm_source=x' };

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
  assert.equal(nb.properties.Email.title[0].text.content, 'Jane@Example.com');
  assert.equal(nb.properties.Source.select.name, 'frontdesk.whitelabelpress.com');
  assert.equal(nb.properties.Status.select.name, 'New');
  assert.equal(nb.properties.Notes.rich_text[0].text.content, '/?utm_source=x');
  const ap = JSON.parse(calls.find((c) => c.url.includes('script.example')).init.body);
  assert.equal(ap.secret, 'form-secret'); assert.equal(ap.fields.email, 'Jane@Example.com'); assert.equal(ap.fields.source, 'frontdesk.whitelabelpress.com'); assert.ok(!isNaN(Date.parse(ap.fields.submitted)));
  const ts = calls.find((c) => c.url.includes('turnstile')).init.body; assert.equal(ts.get('secret'), 'ts-secret'); assert.equal(ts.get('response'), 'tok');
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
  assert.equal((await call(req({ email: 'a@b.co' }))).status, 403);
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
