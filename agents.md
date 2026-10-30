replace with correct info based on clay config

## Supabase migration authoring: explicit Data API grants

Supabase's [October 30, 2026 hosted-project change](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) removes automatic Data API exposure for newly created `public` tables. For every new `public` table intended for REST/GraphQL access, include explicit, least-privilege `GRANT` statements in the same migration that creates it. Choose only the roles and operations the actual caller needs; this includes server-side Data API callers using `service_role`. Do not grant `anon` access by default or expose internal tables merely because they are in `public`.

This repository owns `db/inquiries-setup.sql`; it records an already-applied setup, not a seed to rerun. Preserve its service-only inquiry boundary. Future tables need an intentional access decision, not a copy of broad grants.

Grants control object access; RLS separately controls rows. Consult [Securing your API](https://supabase.com/docs/guides/api/securing-your-api) when designing future access. Missing required table privileges can produce `42501`; diagnose the caller role and intended operation rather than disabling RLS or widening permissions. Function execution privileges are a separate decision, not covered by this table rule.

Existing tables keep their grants. Direct Postgres-only access and self-hosted deployments are unaffected by this hosted rollout. The announcement does not establish a precise cutover hour or prove this app is broken. This is documentation-only guidance: do not run migrations, alter existing tables, change grants/RLS, or change project settings just to add this note.
