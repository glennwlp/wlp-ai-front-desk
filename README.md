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
