# Voortgang Recept (Cursor-bouw)

Laatste update: **27 oktober 2026**

Bronmap ontwerp: `Cursor projecten\Recept` (sync naar `recept/` in monorepo). Hervatten: zie `START-HIER.md`.

## Paragraaf 11 — bouwvolgorde

| Stap | Omschrijving | Status |
| --- | --- | --- |
| 1 | Projectopzet, thema’s, data, validatie, SessionAdapter | Grotendeels klaar (`themes/periods.ts`, `src/session/`) |
| 2 | Spelmotor, tests, golden ronde 1 (v6) | Klaar (10 tests) |
| 3 | Aflevering 4 ronde 1 speelbaar (controlekamer) | Eerste versie klaar; grafiek/HR-detail/chat/trailer nog open |
| 4 | Opdrachtbalk (deels), Wie is wie, Hoe het werkt, pauze/menu, rondje MT-modal | Klaar (instellingen-stub stap 8) |
| 5 | Groepsapp, reacties, dilemma Piotr + verborgen meters | Klaar (zichtbaar in nabespreking stap 8) |
| 6 | Trailer/geluid, slotscène, pauzekaart, ronde 2 | Klaar (nabespreking stap 8) |
| 7 | Afleveringen 1–3 & 5 skelet, opvolging | Open |
| 8 | Portretten, docentmodus, nabespreking, README | Open |

## Commits (monorepo `recept/`)

- `Recept: projectopzet, bronnen en spelmotor met tests`
- `Recept: SessionAdapter, thema-types en bouwplanning bijgewerkt`
- `Recept stap 3: aflevering 4 ronde 1 speelbaar (controlekamer)`

## Lokaal draaien

```bash
cd recept
npm run dev
```

Tests: `npm test` · Build: `npm run build`
