-- Run only in the selected Relevaint Supabase project, then configure Vercel.
create table if not exists public.relevaint_inquiries (
 id uuid primary key, name text not null, email text not null,
 company text not null, service text not null, message text not null,
 created_at timestamptz not null default now()
);
alter table public.relevaint_inquiries enable row level security;
revoke all on public.relevaint_inquiries from anon, authenticated;
grant select, insert on public.relevaint_inquiries to service_role;
create index if not exists relevaint_inquiries_email_created on public.relevaint_inquiries(email,created_at);
create or replace function public.submit_relevaint_inquiry(payload jsonb) returns text
language plpgsql security invoker set search_path='' as $$
declare recent integer;
begin
 perform pg_advisory_xact_lock(hashtextextended(lower(payload->>'email'),0));
 if exists(select 1 from public.relevaint_inquiries where id=(payload->>'id')::uuid) then return 'saved'; end if;
 select count(*) into recent from public.relevaint_inquiries where email=lower(payload->>'email') and created_at>now()-interval '5 minutes';
 if recent>=3 then return 'rate_limited'; end if;
 insert into public.relevaint_inquiries(id,name,email,company,service,message) values((payload->>'id')::uuid,payload->>'name',lower(payload->>'email'),payload->>'company',payload->>'service',payload->>'message') on conflict(id) do nothing;
 return 'saved';
end;
$$;
revoke all on function public.submit_relevaint_inquiry(jsonb) from public,anon,authenticated;
grant execute on function public.submit_relevaint_inquiry(jsonb) to service_role;
