# Vercel migration — September 27, 2026

Source: approved Relevaint Site commit e548352189c32174e0d0f17bbc177833cfdc70a4. Destination: existing lowkeycm/Relevaint-web main branch, retaining its initial agents.md file and commit history.

Requested fixes: featured Total Detailing project is one full-width image with a foreground description crossing its bottom edge (140px desktop overlap, 52px mobile); service footer uses the supplied Relevaint logo.

Port: replaced Vinext/Cloudflare build scripts with native Next.js, kept approved design, unmodified Scrollcraft engine, local media, 3D interactions, videos, and service routes. Removed platform-specific identity handling from the Vercel port; never trust spoofable ChatGPT identity headers on Vercel.

SEO: generated static HTML for all five service pages; on-demand rendered homepage; per-page metadata/canonical URLs; sitemap and robots routes. Static output inspected without scripts: each service contains its H1 and 2,000+ text characters. Deployment protection and domain setup still govern public indexing.

Backend connection (September 28): RelevAInt AIOS is connected through a scoped, authenticated Edge Function. A dedicated inquiry table has RLS enabled and public API grants revoked; a service-only RPC applies idempotency and per-email rate limits. Vercel holds only the dedicated ingress token. Existing AIOS tables and earlier Site records are untouched. `/inquiries` points authorized project members to the new records and preserves access to the original inbox. No email notifications or CRM follow-up automation were added.

Verification: Next.js production build and TypeScript passed. Local browser confirmed the Total Detailing card overlaps its image by 140px. Desktop footer logo visually confirmed. Mobile width 390px: 52px image/card overlap, no horizontal overflow. The initial Vercel production deployment was verified, including HTML, service navigation, project carousel, and video playback.
