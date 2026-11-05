# Bewust later (niet v1)

## Multiplayer — docent-vergelijkscherm (v1)

Teams spelen lokaal; state in `localStorage`. **v1:** geen server, geen accounts, geen persoonsgegevens.

- Teams exporteren hun resultaat via `buildTeamExport` / `downloadTeamExport` in `src/game/teamExport.ts`.
- Docent importeert meerdere exports in **één scherm** met de **twee ranglijsten** (aandeelhouder vs. organisatie; zie besluit 13 in `docs/overzicht.md`).
- UI voor import/vergelijk: nog niet gebouwd (zie `docs/BOUWPLANNING.md`).

## Multiplayer — live regiekamer (v2)

**v2:** docent stuurt een zaal met meerdere teams live.

- Rondes starten/pauzeren, timer aanpassen.
- Per team fase en keuzes zien.
- Gebeurtenis naar één of alle teams sturen.

Vereist synchronisatie, authenticatie en een **AVG-plan** (geen v1).

## Accounts

Geen login in v1. Later alleen als deploy en AVG-plan dat rechtvaardigen.

## Analytics

**Niet gebouwd.** Eventuele toekomstige metingen vereisen expliciet:

- Dataminimalisatie (geen namen, geen herleidbare spelersdata)
- Toestemming en doelbinding (facilitator vs. leverancier)
- Bewaartermijn en inzage/recht op wissing (AVG)
- Geen verkoop of profiling van studenten

## Huidige app (controle 29 okt 2026)

- Geen `fetch` naar analytics- of trackingdomeinen in `src/`.
- Geen third-party scripts in `index.html`.
- Externe requests: alleen lokale assets (`public/beelden`, `public/portretten`); fonts self-hosted in CSS stacks (geen Google Fonts CDN in build).
