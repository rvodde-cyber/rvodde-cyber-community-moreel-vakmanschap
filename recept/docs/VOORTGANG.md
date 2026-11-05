# Voortgang Recept (Cursor-bouw)

Laatste update: **3 november 2026** — A1 stap 2 (inhoud 1984)

## Deze sessie

| Onderdeel | Status |
| --- | --- |
| **Fase 0** | Jaartallen docs, besluit 13, `DESIGNGIDS.md`, `LATER.md` / `BOUWPLANNING.md` |
| **A1 stap 1 — generaliseren** | **`EPISODE_CONTENT`**; consumers via register |
| **A1 stap 2 — inhoud 1984** | Cold opens, `ep1-frans`, briefje-UI, `slot-ep1`, `slotLineA1`, pauzekaart; docs beeld/portret |
| **A1–A3 + A5 interventies** | **8× definitief** per aflevering; niet aan spelmotor |
| **A4** | Demo leidend (`data/rounds.ts`); golden tests ongewijzigd |
| Nabespreking A1 t/m A5 | Nog **concept** |
| Tests | **76/76** groen + `npm run build` OK (stap 2) |

## Live demo

| Link | URL |
| --- | --- |
| Student | https://recept-k8m3n7p2.netlify.app/ |
| Docent | https://recept-k8m3n7p2.netlify.app/?docent=1 |

## Richard — top-3

1. **A1 stap 3** (interventies ↔ spelmotor, `slotLineA1` koppelen aan echte keuzes); daarna bouwstenen **A1–A3 + A5** naar `full` (checklist `DESIGNGIDS.md` §7).
2. **Vergelijkscherm v1** (teamExport-import, twee ranglijsten).
3. Nabespreking A1–A5, Sanne, beeldakkoord; **A4-verwijzingen** (`OPEN-VRAGEN.md`).

## Lokaal

```bash
cd recept && npm test && npm run dev
```
