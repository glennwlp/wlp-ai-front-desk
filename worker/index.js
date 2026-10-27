// WLP AI Front Desk Worker.
//   POST /api/contact -> validate -> honeypot -> Turnstile -> (Notion row + Apps Script email, in parallel)
//   everything else   -> static assets.
// Worker bindings (never committed; set at deploy time, see /workspace/fd-deploy/put_real.js):
//   secret_text: TURNSTILE_SECRET, NOTION_TOKEN, FORM_SECRET, APPS_SCRIPT_URL
//   plain_text:  NOTION_DATABASE_ID
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const BUSINESS_MAX = 150;
const MESSAGE_MAX = 2000; // also Notion's per-rich-text-object limit
const NOTES_MAX = 300;
const BODY_MAX = 8 * 1024;
const SOURCE = 'frontdesk.whitelabelpress.com';
const NOTION_VERSION = '2022-06-28';
const UPSTREAM_TIMEOUT_MS = 10000;
// Pragmatic format check (one @, no spaces, dotted domain, sane label chars).
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

// Best-effort per-isolate rate limit (not global; Turnstile is the real bot gate).
const HITS = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 10;
function rateLimited(ip, now = Date.now()) {
  if (!ip) return false;
  const arr = (HITS.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 5000) for (const [k, v] of HITS) if (!v.some((t) => now - t < RATE_WINDOW_MS)) HITS.delete(k);
  return arr.length > RATE_MAX;
}

const json = (body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra } });

const timeout = () => AbortSignal.timeout(UPSTREAM_TIMEOUT_MS);

async function verifyTurnstile(token, ip, env) {
  const vf = new FormData();
  vf.append('secret', env.TURNSTILE_SECRET);
  vf.append('response', token);
  if (ip) vf.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: vf, signal: timeout() });
  const out = await r.json();
  return out && out.success === true;
}

async function createNotionRow(fields, env) {
  if (!env.NOTION_TOKEN || !env.NOTION_DATABASE_ID) throw new Error('notion: not configured');
  const text = (content) => [{ text: { content } }];
  const properties = {
    Name: { title: text(fields.name) },
    Email: { email: fields.email },
    Message: { rich_text: text(fields.message) },
    Source: { select: { name: fields.source } },
    Status: { select: { name: 'New' } },
  };
  if (fields.business) properties.Business = { rich_text: text(fields.business) };
  if (fields.notes) properties.Notes = { rich_text: text(fields.notes) };
  const r = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.NOTION_TOKEN}`, 'notion-version': NOTION_VERSION, 'content-type': 'application/json' },
    body: JSON.stringify({ parent: { database_id: env.NOTION_DATABASE_ID }, properties }),
    signal: timeout(),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    throw new Error(`notion: HTTP ${r.status} ${t.slice(0, 300)}`);
  }
}

async function sendEmailViaAppsScript(fields, env) {
  if (!env.APPS_SCRIPT_URL || !env.FORM_SECRET) throw new Error('apps-script: not configured');
  const r = await fetch(env.APPS_SCRIPT_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret: env.FORM_SECRET, fields }),
    signal: timeout(),
  });
  const out = await r.json().catch(() => null);
  if (!r.ok || !out || out.ok !== true) throw new Error(`apps-script: HTTP ${r.status} ${out && out.error ? String(out.error).slice(0, 200) : 'bad response'}`);
}

const clean = (v, max, { multiline = false } = {}) => {
  if (typeof v !== 'string') return '';
  let t = v.replace(/\r\n?/g, '\n');
  t = multiline ? t.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ') : t.replace(/[\u0000-\u001f\u007f]/g, ' ');
  return t.trim();
};
const bad = (error, field) => json({ ok: false, error, field }, 400);

async function handleContact(req, env) {
  const ip = req.headers.get('cf-connecting-ip');
  if (rateLimited(ip)) return json({ ok: false, error: 'Too many attempts. Please try again in a few minutes.' }, 429, { 'retry-after': '600' });

  let data;
  try {
    const raw = await req.text();
    if (raw.length > BODY_MAX) return json({ ok: false, error: 'Request too large.' }, 413);
    data = JSON.parse(raw);
  } catch { return json({ ok: false, error: 'Invalid request body.' }, 400); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ ok: false, error: 'Invalid request body.' }, 400);

  // Honeypot: real users never fill this. Pretend success so bots learn nothing.
  if (typeof data.company_url === 'string' && data.company_url.trim() !== '') return json({ ok: true });

  const name = clean(data.name, NAME_MAX);
  if (!name) return bad('Please enter your name.', 'name');
  if (name.length > NAME_MAX) return bad(`Your name is too long (max ${NAME_MAX} characters).`, 'name');
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  if (!email) return bad('Please enter your email address.', 'email');
  if (email.length > EMAIL_MAX || !EMAIL_RE.test(email)) return bad('Enter a valid email address, like you@yourbusiness.com.', 'email');
  const business = clean(data.business, BUSINESS_MAX);
  if (business.length > BUSINESS_MAX) return bad(`The business name is too long (max ${BUSINESS_MAX} characters).`, 'business');
  const message = clean(data.message, MESSAGE_MAX, { multiline: true });
  if (!message) return bad('Please write a message.', 'message');
  if (message.length > MESSAGE_MAX) return bad(`Your message is too long (max ${MESSAGE_MAX} characters).`, 'message');
  const notes = clean(data.notes, NOTES_MAX).slice(0, NOTES_MAX);

  const token = typeof data['cf-turnstile-response'] === 'string' ? data['cf-turnstile-response'] : '';
  if (!token || token.length > 2048) return json({ ok: false, error: 'Please complete the security check and try again.' }, 403);
  if (!env.TURNSTILE_SECRET) { console.error('contact: TURNSTILE_SECRET binding missing'); return json({ ok: false, error: 'The contact form is temporarily unavailable. Please try again later.' }, 503); }
  let human;
  try { human = await verifyTurnstile(token, ip, env); }
  catch (e) { console.error('contact: turnstile verify failed', String(e)); return json({ ok: false, error: 'Security check unavailable. Please try again shortly.' }, 502); }
  if (!human) return json({ ok: false, error: 'Security check failed. Please refresh the page and try again.' }, 403);

  const fields = { name, email, ...(business ? { business } : {}), message, source: SOURCE, submitted: new Date().toISOString(), ...(notes ? { notes } : {}) };
  const [notion, mail] = await Promise.allSettled([createNotionRow(fields, env), sendEmailViaAppsScript(fields, env)]);
  if (notion.status === 'rejected') console.error('contact: notion failed', String(notion.reason));
  if (mail.status === 'rejected') console.error('contact: email failed', String(mail.reason));
  if (notion.status === 'rejected' && mail.status === 'rejected') {
    return json({ ok: false, error: 'Sorry, we could not send your message. Please try again, or email glenn@whitelabelpress.com.' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, 405, { allow: 'POST' });
      return handleContact(req, env);
    }
    return env.ASSETS.fetch(req);
  },
};
