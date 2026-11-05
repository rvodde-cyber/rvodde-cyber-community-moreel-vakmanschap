# Voortgang Recept (Cursor-bouw)

Laatste update: **5 november 2026** — tijdgeestlaag

## Deze sessie

| Onderdeel | Status |
| --- | --- |
| **Tijdgeestlaag** | `data/episodes/tijdgeest.ts`, ticker UI (`tickerRegelsVoor`), geluid aan/uit + tekstalternatief; docs `TIJDGEEST.md`, `GELUID-CHECK.md`, beeldbank-check |
| **Speelflow A1** | Cold open auto + registergrenzen; 3 klikken intro→MT; `docs/STAP-FLOW-ONDERZOEK.md` |
| **Fase 0** | Jaartallen docs, besluit 13, `DESIGNGIDS.md`, `LATER.md` / `BOUWPLANNING.md` |
| **A1 stap 1 — generaliseren** | **`EPISODE_CONTENT`**; consumers via register |
| **A1 stap 2 — inhoud 1984** | Cold opens, `ep1-frans`, briefje-UI, `slot-ep1`, `slotLineA1`, pauzekaart; docs beeld/portret |
| **A1 stap 3 — interventiemotor** | `interventieCompute`, register `motorKind`, A1 speelbaar; budget **8 / 9** punten r1/r2 |
| **A1–A3 + A5 interventies** | **8× definitief**; A1 aan motor; A2/A3/A5 nog skeleton |
| **A4** | Demo leidend (`data/rounds.ts`); golden tests ongewijzigd |
| **Taalronde cold opens** | A2, A3, A4 (2 regels), A5 letterlijk; Lotte → **Anne-Fleur** in actieve data/docs |
| Nabespreking A1 t/m A5 | Nog **concept** |
| Tests | Zie `npm test` (cold-open- + Anne-Fleur-tests) + `npm run build` |

## Live demo

| Link | URL |
| --- | --- |
| Student | https://recept-k8m3n7p2.netlify.app/ |
| Docent | https://recept-k8m3n7p2.netlify.app/?docent=1 |

## Richard — top-3

1. **A2/A3/A5** interventiemodus + kalibratie startwaarden/balans; **nabespreking A1** (ethischRisico/opvolging/echo); begroting vanaf A3.
2. **Vergelijkscherm v1** (teamExport-import, twee ranglijsten).
3. Nabespreking A1–A5, Sanne, beeldakkoord; **A4-verwijzingen** (`OPEN-VRAGEN.md`).

## Lokaal

```bash
cd recept && npm test && npm run dev
```
