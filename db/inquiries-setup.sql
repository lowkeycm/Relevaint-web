-- Dedicated Relevaint website storage. Existing AIOS tables are unaffected.
create table public.relevaint_inquiries (
 id uuid primary key,
 name text not null check (char_length(name) between 2 and 120),
 email text not null check (char_length(email) between 3 and 254 and email = lower(email)),
 company text not null check (char_length(company) between 2 and 160),
 service text not null check (service in ('Websites & landing pages','Video & ad creative','Social content & workflows','Funnels & follow-up','Sales tools & integrations','Connected system','Not sure yet')),
 message text not null check (char_length(message) between 10 and 4000),
 created_at timestamptz not null default now()
);
alter table public.relevaint_inquiries enable row level security;
revoke all on public.relevaint_inquiries from public, anon, authenticated;
grant select, insert on public.relevaint_inquiries to service_role;
create index relevaint_inquiries_email_created on public.relevaint_inquiries(email,created_at);
create function public.submit_relevaint_inquiry(payload jsonb) returns text
language plpgsql security invoker set search_path='' as $$
declare recent integer;
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(lower(payload->>'email'),0));
 if exists(select 1 from public.relevaint_inquiries where id=(payload->>'id')::uuid) then return 'saved'; end if;
 select count(*) into recent from public.relevaint_inquiries where email=lower(payload->>'email') and created_at>now()-interval '5 minutes';
 if recent>=3 then return 'rate_limited'; end if;
 insert into public.relevaint_inquiries(id,name,email,company,service,message)
 values((payload->>'id')::uuid,payload->>'name',lower(payload->>'email'),payload->>'company',payload->>'service',payload->>'message') on conflict(id) do nothing;
 return 'saved';
end;
$$;
revoke all on function public.submit_relevaint_inquiry(jsonb) from public,anon,authenticated;
grant execute on function public.submit_relevaint_inquiry(jsonb) to service_role;
