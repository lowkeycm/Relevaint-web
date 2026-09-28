# Relevaint website

Next.js App Router, TypeScript, Tailwind and shadcn UI. GitHub `lowkeycm/Relevaint-web` is connected to the existing Vercel project `relevaint-web` in the Pride Family Realty team.

## Develop and build

Use Node 24, then `npm ci`, `npm run dev`, or `npm run build` followed by `npm start`.

Two larger films live in `assets/video` as binary parts to accommodate the source-transfer API's request-size limit. The build reconstructs and SHA-256 checks the original MP4 files; there is no re-encoding or quality loss. All other media is in `public/media`. No dependency on the old Sites host for public website media.

## Rendering and search

The homepage is server-rendered. All five service pages are generated as HTML during the build. Client components hydrate those existing pages for the 3D interactions. Titles, descriptions, canonical links, robots.txt, and sitemap.xml are included.

`SITE_URL` controls the canonical origin; otherwise Vercel's production domain is used. Set it to `https://relevaint.io` when that domain is attached. Deployment authentication blocks public crawlers regardless of the HTML. Domain cutover and access policy are separate deployment settings.

## Inquiries: connection pending

The original Site used Cloudflare D1 and ChatGPT account authentication. Neither is portable to Vercel as-is. No customer data or credentials have been copied into this public repository.

Until a Relevaint database is chosen and configured, the public contact section provides email and booking links. It does not offer a form that cannot save. The form and validation remain implemented and activate when both server-only variables are configured:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (new `sb_secret_` key; never expose as NEXT_PUBLIC)

Before enabling the form, run `db/inquiries-setup.sql` in the selected project. It creates the protected inquiry table and service-only RPC with idempotency and rate limiting. Test saving and retrieval before production activation. This database setup has been prepared, not applied or end-to-end verified. The new inquiry inbox/authentication still needs a decision; use the Supabase dashboard for records after setup. `/inquiries` links to the existing owner-protected Site inbox for earlier records only.

## Current migration

See `docs/migration.md`. The source Site remains available separately; this repository is now the Vercel deployment source.
