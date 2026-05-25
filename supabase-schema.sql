-- ──────────────────────────────────────────────────────────────
-- WakaTribe — Supabase schema (multi-tenant, public-internet safe)
-- Run this ONCE in Supabase SQL Editor.
-- Safe to re-run: all drops/creates are idempotent.
-- ──────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ── Helpers: map email → tenant id ──────────────────────────────
create or replace function public.tenant_from_email(email text)
returns text
language sql immutable as $$
  select case split_part(lower(coalesce(email,'')), '@', 2)
    when 'wakanow.com'    then 'wakanow'
    when 'kalabash54.com' then 'kalabash'
    when 'pointview.com'  then 'pointview'
    when 'onburd.com'     then 'onburd'
    else null
  end;
$$;

-- Current authenticated user's tenant (null if not signed in)
create or replace function public.current_tenant()
returns text
language sql stable as $$
  select public.tenant_from_email(auth.jwt()->>'email');
$$;

-- ── Domain-gated signup ─────────────────────────────────────────
-- Blocks anyone whose email isn't one of the 4 allowed domains
-- from ever creating an auth record — even via the public API.
create or replace function public.validate_email_domain()
returns trigger
language plpgsql as $$
begin
  if public.tenant_from_email(new.email) is null then
    raise exception 'Email domain not allowed. Use your @wakanow.com, @kalabash54.com, @pointview.com, or @onburd.com address.';
  end if;
  return new;
end;
$$;

drop trigger if exists validate_email_domain_trigger on auth.users;
create trigger validate_email_domain_trigger
  before insert on auth.users
  for each row execute function public.validate_email_domain();

-- ── visits ──────────────────────────────────────────────────────
create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,

  -- Visitor
  visitor_name      text not null,
  visitor_phone     text not null,
  visitor_company   text,
  purpose           text not null default 'meeting',
  photo_url         text,

  -- Host: either registry id, or free-text fallback
  host_employee_id  text,
  host_name         text,
  host_email        text,
  host_dept         text,

  -- Lifecycle
  status text not null default 'pending_host',
  -- pending_host | approved | declined | checked_in | checked_out | expired

  gate_initiated_at    timestamptz not null default now(),
  host_decided_at      timestamptz,
  host_decision        text,
  host_note            text,
  reception_checkin_at timestamptz,
  reception_checkin_by text,
  checkout_at          timestamptz,
  checkout_method      text,

  host_notify_token    text not null unique default gen_random_uuid()::text,
  created_at           timestamptz not null default now()
);

create index if not exists visits_tenant_idx   on public.visits(tenant_id);
create index if not exists visits_status_idx   on public.visits(status);
create index if not exists visits_token_idx    on public.visits(host_notify_token);
create index if not exists visits_gate_at_idx  on public.visits(gate_initiated_at desc);

-- ── notifications (email/SMS audit trail) ───────────────────────
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  tenant_id   text not null,
  kind        text not null,
  visit_id    uuid references public.visits(id) on delete cascade,
  host_email  text,
  host_phone  text,
  host_name   text,
  subject     text,
  body        text,
  link        text,
  sent_at     timestamptz not null default now(),
  delivered   boolean default false
);

create index if not exists notif_tenant_idx  on public.notifications(tenant_id);
create index if not exists notif_visit_idx   on public.notifications(visit_id);
create index if not exists notif_sent_at_idx on public.notifications(sent_at desc);

-- ── Row Level Security: tenant-scoped, auth required ────────────
alter table public.visits        enable row level security;
alter table public.notifications enable row level security;

-- Drop old permissive policies if they exist
drop policy if exists "visits_all_select"      on public.visits;
drop policy if exists "visits_all_insert"      on public.visits;
drop policy if exists "visits_all_update"      on public.visits;
drop policy if exists "notif_all_select"       on public.notifications;
drop policy if exists "notif_all_insert"       on public.notifications;
drop policy if exists "visits_tenant_select"   on public.visits;
drop policy if exists "visits_tenant_insert"   on public.visits;
drop policy if exists "visits_tenant_update"   on public.visits;
drop policy if exists "notif_tenant_select"    on public.notifications;
drop policy if exists "notif_tenant_insert"    on public.notifications;

-- Authenticated staff can only see/touch rows in their own tenant
create policy "visits_tenant_select" on public.visits
  for select to authenticated
  using (tenant_id = public.current_tenant());

create policy "visits_tenant_insert" on public.visits
  for insert to authenticated
  with check (tenant_id = public.current_tenant());

create policy "visits_tenant_update" on public.visits
  for update to authenticated
  using (tenant_id = public.current_tenant())
  with check (tenant_id = public.current_tenant());

create policy "notif_tenant_select" on public.notifications
  for select to authenticated
  using (tenant_id = public.current_tenant());

create policy "notif_tenant_insert" on public.notifications
  for insert to authenticated
  with check (tenant_id = public.current_tenant());

-- The anon role cannot touch either table directly.
-- Token-based actions (host approval from email link) go through
-- the SECURITY DEFINER functions below.

-- ── Public (token-authenticated) functions for host approval ────
-- These are the ONLY paths the anon key can take against visit data.

create or replace function public.get_visit_by_token(p_token text)
returns public.visits
language sql
security definer
set search_path = public
stable as $$
  select * from public.visits where host_notify_token = p_token limit 1;
$$;

create or replace function public.approve_visit_by_token(
  p_token    text,
  p_decision text,
  p_note     text default null
)
returns public.visits
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.visits;
begin
  if p_decision not in ('approved', 'declined') then
    raise exception 'invalid decision';
  end if;

  -- Atomic: only flips pending_host → approved/declined
  update public.visits
     set status          = p_decision,
         host_decided_at = now(),
         host_decision   = p_decision,
         host_note       = p_note
   where host_notify_token = p_token
     and status = 'pending_host'
   returning * into v;

  -- If no row updated, token might be invalid OR already resolved
  if v.id is null then
    select * into v from public.visits where host_notify_token = p_token;
    if v.id is null then
      raise exception 'invalid token';
    end if;
    -- else: already resolved — return current state so UI can show "already decided"
  end if;

  return v;
end;
$$;

revoke all on function public.get_visit_by_token(text)                 from public;
revoke all on function public.approve_visit_by_token(text, text, text) from public;
grant execute on function public.get_visit_by_token(text)              to anon, authenticated;
grant execute on function public.approve_visit_by_token(text, text, text) to anon, authenticated;

-- ── Realtime ─────────────────────────────────────────────────────
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'visits'
  ) then
    alter publication supabase_realtime add table public.visits;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'notifications'
  ) then
    alter publication supabase_realtime add table public.notifications;
  end if;
end $$;

-- ── Verify ───────────────────────────────────────────────────────
-- Run these after the script to confirm:
--   select public.tenant_from_email('cynthiaok@wakanow.com');  -- 'wakanow'
--   select public.tenant_from_email('admin@kalabash54.com');   -- 'kalabash'
--   select public.tenant_from_email('hacker@evil.com');        -- null
--   select count(*) from public.visits;                         -- 0
