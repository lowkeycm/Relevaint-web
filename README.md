# Relevaint website

Next.js App Router, TypeScript, Tailwind and shadcn UI. GitHub `lowkeycm/Relevaint-web` is connected to the existing Vercel project `relevaint-web` in the Pride Family Realty team.

## Develop and build

Use Node 24, then `npm ci`, `npm run dev`, or `npm run build` followed by `npm start`.

Two larger films live in `assets/video` as binary parts to accommodate the source-transfer API's request-size limit. The build reconstructs and SHA-256 checks the original MP4 files; there is no re-encoding or quality loss. All other media is in `public/media`. No dependency on the old Sites host for public website media.

## Rendering and search

The homepage is server-rendered. All five service pages are generated as HTML during the build. Client components hydrate those existing pages for the 3D interactions. Titles, descriptions, canonical links, robots.txt, and sitemap.xml are included.

`SITE_URL` controls the canonical origin; otherwise Vercel's production domain is used. Set it to `https://relevaint.io` when that domain is attached. Deployment authentication blocks public crawlers regardless of the HTML. Domain cutover and access policy are separate deployment settings.

## Inquiries

Production submissions go to the dedicated `public.relevaint_inquiries` table in RelevAInt → RelevAInt AIOS (`ohqsziwcvvzxryfgzkvx`). Existing AIOS tables and earlier Site records are unchanged. Authorized project members can review new records in the Supabase dashboard; `/inquiries` links there and to the original owner-protected Site inbox for earlier records. No notification email or follow-up automation is configured.

The Next.js route validates the form, origin and honeypot. A dedicated Supabase Edge Function authenticates Vercel using a random 384-bit token, validates again, and invokes a service-only database function. The function enforces idempotency and a maximum of three submissions per email in five minutes. This is basic abuse protection, not a complete anti-spam service. Table RLS is enabled with no public policies; anonymous and authenticated API roles have no table or RPC access. Project administrators retain dashboard access.

Production-only Vercel variables:

- `INQUIRY_INGRESS_URL`: the deployed `relevaint-web-inquiry` endpoint.
- `INQUIRY_INGRESS_TOKEN`: encrypted Secret, never `NEXT_PUBLIC_`.

The website has no project-wide Supabase key. Only the token's SHA-256 digest is in Edge Function source. The Edge Function uses Supabase's automatically supplied server key internally (new secret-key format when available, with legacy runtime fallback). Neither that key nor the plaintext ingress token belongs in Git. Preview environments fall back to email and booking while these variables are absent.

`db/inquiries-setup.sql` records the applied initial schema migration. Do not rerun it as a seed. `supabase/functions/relevaint-web-inquiry/index.js` and `supabase/config.toml` contain the deployed function and its custom-auth configuration.

To rotate the ingress token, generate a fresh cryptographically random 48-byte token, replace the expected SHA-256 digest in the Edge Function, deploy it, then replace the encrypted Vercel Production secret and redeploy the website. Schedule this together: submissions during the short transition receive a retry message and keep their form input. Never place the plaintext token in a commit or build log.

## Current migration

See `docs/migration.md`. The source Site remains available separately; this repository is now the Vercel deployment source.
