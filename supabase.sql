-- ─────────────────────────────────────────────────────────────
--  Saizar Familia · Lagun Aurkitua
--  Pega todo esto en Supabase → SQL Editor → New query → Run
-- ─────────────────────────────────────────────────────────────

create table if not exists public.wishlists (
  person         text primary key,              -- nombre tal cual aparece en config.js
  themes         text[]      not null default '{}',
  styles         text[]      not null default '{}',
  colors         text[]      not null default '{}',
  clothing_size  text        not null default '',
  shoe_size      text        not null default '',
  items          jsonb       not null default '[]'::jsonb,  -- [{ "text": "...", "link": "https://..." }]
  avoid          text        not null default '',
  notes          text        not null default '',
  updated_at     timestamptz not null default now()
);

-- Seguridad: sin login, cualquiera con la web puede leer y escribir
-- (pero nunca borrar). Es lo que pediste: simple y sin autenticación.
alter table public.wishlists enable row level security;

drop policy if exists "wishlists_read"   on public.wishlists;
drop policy if exists "wishlists_insert" on public.wishlists;
drop policy if exists "wishlists_update" on public.wishlists;

create policy "wishlists_read"   on public.wishlists for select to anon using (true);
create policy "wishlists_insert" on public.wishlists for insert to anon with check (true);
create policy "wishlists_update" on public.wishlists for update to anon using (true) with check (true);

grant select, insert, update on public.wishlists to anon;
