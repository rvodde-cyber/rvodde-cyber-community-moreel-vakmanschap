-- Scherpstellen: Supabase schema
-- Voer dit uit in de Supabase SQL Editor

create table if not exists public.verdenk_submissions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  scores jsonb not null,
  archetype text not null,
  created_at timestamptz not null default now()
);

create index if not exists verdenk_submissions_created_at_idx
  on public.verdenk_submissions (created_at desc);

alter table public.verdenk_submissions enable row level security;

-- Anonieme inserts toestaan (geen login vereist)
create policy "Anonieme deelnemers mogen resultaten insturen"
  on public.verdenk_submissions
  for insert
  to anon
  with check (true);

-- Iedereen mag geaggregeerde data lezen (live scherm)
create policy "Iedereen mag resultaten lezen"
  on public.verdenk_submissions
  for select
  to anon
  using (true);

-- Realtime inschakelen
alter publication supabase_realtime add table public.verdenk_submissions;
