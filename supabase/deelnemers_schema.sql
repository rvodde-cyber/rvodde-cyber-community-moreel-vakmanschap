-- Community Moreel Vakmanschap — deelnemersregistratie
-- Voer dit eenmalig uit in de Supabase SQL Editor.

create table if not exists public.deelnemers (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  functie text not null,
  organisatie text,
  email text not null unique,
  aantekening text,
  taal text not null default 'nl',
  consent boolean not null default false,
  consent_op timestamptz,
  bron text not null default 'website',
  aangemeld_op timestamptz not null default now(),
  bijgewerkt_op timestamptz not null default now(),
  afgemeld_op timestamptz
);

create index if not exists deelnemers_aangemeld_op_idx
  on public.deelnemers (aangemeld_op desc);

-- Alleen actieve deelnemers voor de mailinglijst.
create index if not exists deelnemers_actief_idx
  on public.deelnemers (afgemeld_op)
  where afgemeld_op is null;

-- RLS aan zonder policies: anon en authenticated krijgen geen enkele toegang.
-- De API schrijft en leest met de service role key, die RLS omzeilt.
alter table public.deelnemers enable row level security;
