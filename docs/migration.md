# Vercel migration — September 27, 2026

Source: approved Relevaint Site commit e548352189c32174e0d0f17bbc177833cfdc70a4. Destination: existing lowkeycm/Relevaint-web main branch, retaining its initial agents.md file and commit history.

Requested fixes: featured Total Detailing project is one full-width image with a foreground description crossing its bottom edge (140px desktop overlap, 52px mobile); service footer uses the supplied Relevaint logo.

Port: replaced Vinext/Cloudflare build scripts with native Next.js, kept approved design, unmodified Scrollcraft engine, local media, 3D interactions, videos, and service routes. Removed platform-specific identity handling from the Vercel port; never trust spoofable ChatGPT identity headers on Vercel.

SEO: generated static HTML for all five service pages; on-demand rendered homepage; per-page metadata/canonical URLs; sitemap and robots routes. Static output inspected without scripts: each service contains its H1 and 2,000+ text characters. Deployment protection and domain setup still govern public indexing.

Backend boundary: Vercel project has no database/environment variables. Only unrelated Digital Gifts is exposed by the connected Supabase account; it was not touched. Prepared isolated schema and server-only RPC adapter, but did not create a database or migrate records. Contact email and booking remain usable while form storage is pending. Original protected inbox retains existing records.

Verification: Next.js production build and TypeScript passed. Local browser confirmed the Total Detailing card overlaps its image by 140px. Desktop footer logo visually confirmed. Mobile width 390px: 52px image/card overlap, no horizontal overflow. Production deployment still to be verified.
