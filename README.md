# AI Front Desk by WhitelabelPRESS

Marketing page for an AI front desk product, built from a Penpot design (Home board + Design System).

- Astro 7 (static) + Tailwind CSS 4 + TypeScript
- Single page (`/`) and a `404`
- Self-hosted fonts via Fontsource (Archivo, Archivo Narrow); images optimised to WebP by `astro:assets`
- Deployed as a Cloudflare Worker that only serves the static build through an assets binding (`worker/index.js`, `wrangler.jsonc`)

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs ./dist
npm run deploy   # build + wrangler deploy (needs Cloudflare auth)
```

## Demo content

This is a design build, not a live product. The early-access form does not send anything, Privacy/Terms links are inert, pricing shows `$XX` placeholders, and customer quotes are sample text. The page is marked `noindex`.

## Early-access form backend (`POST /api/signup`)
The Worker (`worker/index.js`) validates the email, checks the honeypot (`company_url`) and Cloudflare Turnstile, then in parallel (a) creates a row in the Notion database "AI Front Desk – Early access signups" and (b) calls the Apps Script web app (`apps-script/Code.gs.template`) which emails glenn@whitelabelpress.com. It succeeds if at least one of the two worked.

- Build-time (public): `PUBLIC_TURNSTILE_SITEKEY` — `PUBLIC_TURNSTILE_SITEKEY=0x4AAA... npm run build`. Without it the widget is not rendered and the form shows "not available".
- Worker bindings (never committed): secrets `TURNSTILE_SECRET`, `NOTION_TOKEN`, `FORM_SECRET`, `APPS_SCRIPT_URL`; plain text `NOTION_DATABASE_ID`. With wrangler: `wrangler secret put <NAME>`.
- Notion API version `2022-06-28`, page parent `database_id`.
- Tests: `npm test` (handler unit tests with a fake `fetch`).
