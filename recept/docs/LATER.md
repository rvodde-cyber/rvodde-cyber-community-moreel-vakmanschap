# Bewust later (niet v1)

## Multiplayer / regiekamer

Teams spelen nu lokaal op één scherm; state in `localStorage`. Later: telefoons via QR, docent-regiekamer (bijv. Supabase). **Waarom later:** SessionAdapter staat klaar, maar sync, auth en fairness vragen ontwerp- en privacywerk.

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
