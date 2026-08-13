-- De Frisse Organisatie — opslagschema
--
-- Uitgangspunten (briefing §3 en §7):
--   * geen inlog en geen gebruikersidentificatie;
--   * geen antwoorden per stelling — alleen het gemiddelde per blad;
--   * niets dat naar een individuele invuller te herleiden is;
--   * een expliciete bewaartermijn, afgedwongen in de database zelf.

create extension if not exists "pgcrypto";

create table if not exists public.scan_results (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  -- Sessiecode of bedrijfsnaam; vrij tekstveld, optioneel.
  session_code  text,
  -- Gemiddelde per blad, bijv. {"integriteit": 3.67, "team": 2.33, ...}.
  scores        jsonb not null,
  -- Welke hoofdconclusie eruit volgde: single | tie | balancedStrong | balancedLow.
  conclusion    text not null,
  -- Moment waarop deze rij verwijderd mag worden (frontend rekent dit uit op
  -- basis van VITE_RETENTION_MONTHS; de check hieronder begrenst de termijn).
  expires_at    timestamptz not null,

  constraint scan_results_session_code_length check (session_code is null or char_length(session_code) <= 120),
  constraint scan_results_conclusion_known check (conclusion in ('single', 'tie', 'balancedStrong', 'balancedLow')),
  constraint scan_results_retention_max check (expires_at <= created_at + interval '24 months')
);

create index if not exists scan_results_session_code_idx on public.scan_results (session_code);
create index if not exists scan_results_expires_at_idx on public.scan_results (expires_at);

-- Row Level Security: de publieke anon-sleutel mag uitsluitend toevoegen.
-- Uitlezen gebeurt alleen met de service-role-sleutel (nooit in de frontend).
alter table public.scan_results enable row level security;

drop policy if exists "anon can insert scan results" on public.scan_results;
create policy "anon can insert scan results"
  on public.scan_results
  for insert
  to anon
  with check (
    expires_at > now()
    and expires_at <= now() + interval '24 months'
  );

-- Opruimen. Handmatig aan te roepen, of via pg_cron (zie hieronder).
create or replace function public.purge_expired_scan_results()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  removed integer;
begin
  delete from public.scan_results where expires_at <= now();
  get diagnostics removed = row_count;
  return removed;
end;
$$;

-- Dagelijks opruimen om 03:15. Vereist de pg_cron-extensie (Supabase: Database
-- → Extensions → pg_cron inschakelen), daarna deze regel losdraaien:
--
--   select cron.schedule(
--     'purge-expired-scan-results',
--     '15 3 * * *',
--     $$select public.purge_expired_scan_results();$$
--   );
