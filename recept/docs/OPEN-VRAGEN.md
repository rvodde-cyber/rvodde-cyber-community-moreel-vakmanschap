# Open vragen en aanleveringen

Laatste update: **5 november 2026** (taalronde cold opens).

## Besloten (5 nov 2026)

| Onderwerp | Besluit |
| --- | --- |
| **Taalronde cold opens A2–A5** | Letterlijke teksten in `SKELETON_COLD` / `COLD_OPEN`; bron `docs/TAALGIDS.md`. |
| **Tijdgeestlaag** | Register `data/episodes/tijdgeest.ts`, ticker in UI, geluid-mechanisme; teksten `docs/TIJDGEEST.md`. |
| **Speelflow cold open A1** | Auto-regels, `COLD_NEXT` uit register, 3 verplichte klikken intro→MT; zie `STAP-FLOW-ONDERZOEK.md`. |
| **Typografie per tijdperk** | Self-hosted fonts + leesbaar-alternatief; zie `docs/TYPOGRAFIE.md`. |
| **Gesprekskaarten** | Fase `gesprek`, export v2; A4 demo uit; zie `docs/GESPREKSKAART.md`. |
| **Anne-Fleur** | Lotte hernoemd; nazaat founders, 2036-register zonder dialect/tonval. |

## Open (tijdgeest, 5 nov 2026)

| Onderwerp | Actie |
| --- | --- |
| **Audio tijdgeest** | Bestanden kiezen/maken — `docs/GELUID-CHECK.md` |
| **Firefly Renault + rekwisieten** | RENAULT-84 t/m 36, REKW-* — `docs/TIJDGEEST.md`, `docs/BEELDEN-CHECK.md` |
| **Rekwisieten in beeld** | Beslissen waar rekwisieten zichtbaar worden (nu vooral documentatie) |
| **Speelflow verder** | Optioneel: ronde-2 intro compacter na playtest; docent-timer op skeletten |
| **Typografie visueel** | Richard beoordeelt uiterlijk per tijdperk na spelen (1984–2036); aanpassingen via `themes/periods.ts` |
| **Gesprekskaarten** | Richard beoordeelt kaarten na spelen; vergelijkscherm v1 + timer docent later — `docs/GESPREKSKAART.md` |
| **Landingspagina + intro** | Richard beoordeelt posterlook en intro beeld rechts (360 / 768 / 1920 px); akkoord beelden I1–I5 — `docs/BEELDEN-CHECK.md` |

## Besloten (2–3 nov 2026)

| Onderwerp | Besluit |
| --- | --- |
| **Fase 0** | `DESIGNGIDS.md` aangemaakt; jaartallen interventiedocs; **besluit 13** herzien (twee ranglijsten). |
| **Besluit 13** | Twee ranglijsten na afloop; geen winnaar op één getal — zie `overzicht.md`, `keuzes-en-dashboard.md`, `BESLUITEN-CURSOR.md`. |
| **A1 stap 1** | Register `EPISODE_CONTENT` / `episodeContent()`; refactor zonder gedragswijziging A4. |
| **A1 stap 2** | Inhoud aflevering 1: cold opens, briefje-dilemma, slotscène, pauzekaart, UI `BriefjePanel`. |
| **Notatie / interventies** | Zie eerdere regels A1–A5 definitief; A4 demo; echo `demo-a4-H` op `a5-2-3`. |

## Jaartallen gecorrigeerd (fase 0, 3 nov 2026)

Canoniek: `data/episodes/meta.ts`, `docs/serieconcept.md` → **1984, 1996, 2009, 2026, 2036**.

| Bestand | Regel (oud → nieuw) |
| --- | --- |
| `docs/INTERVENTIES-AFLEVERING-1-29-10-2026.md` | Setting: „ongeveer **2016** … aflevering 4 eindigt in 2031” → „**1984** (jaartallen: meta.ts, serieconcept.md)”. |
| `docs/INTERVENTIES-AFLEVERING-1-29-10-2026.md` | Open vraag 2: „Jaartal … **2016**” → **vervallen**; canon **1984**. |
| `docs/INTERVENTIES-AFLEVERING-2-T-M-5-29-10-2026.md` | Inhoud §2: „± **2021**” → **1996**. |
| `docs/INTERVENTIES-AFLEVERING-2-T-M-5-29-10-2026.md` | Inhoud §3: „± **2026**” → **2009**. |
| `docs/INTERVENTIES-AFLEVERING-2-T-M-5-29-10-2026.md` | Inhoud §4: „± **2031**” → **2026**. |
| `docs/INTERVENTIES-AFLEVERING-2-T-M-5-29-10-2026.md` | Inhoud §5: „± **2036**” → **2036** (± verwijderd). |
| `docs/INTERVENTIES-AFLEVERING-2-T-M-5-29-10-2026.md` | Koppen §2–§5: jaartal **1996 / 2009 / 2026 / 2036** toegevoegd (inhoudsopgave was al gecorrigeerd). |

*Interventieteksten, effecten en id’s ongewijzigd.*

## A1 — interventiemotor (stap 3, 5 nov 2026)

- Aflevering 1: `motorKind: 'interventie'`, budget **8 punten ronde 1 / 9 punten ronde 2** (Richard 5 nov 2026; `BUDGET_PER_RONDE_A1`).
- **Kalibratie na balanstest motor:** `a1-1-3` verzuim `--`; `a1-1-4` productiviteit `++` — akkoord Richard nodig (effect-symbolen, teksten ongewijzigd). **Ronde 2:** bij sommige r1-eindstanden (clamp) kan één paar domineren; statische balanstest op startwaarden is groen; playtest na budget 9.
- Startwaarden A2/A3/A5: zelfde als A1 (`startwaarden.ts` TODO) tot playtest.
- Balans A2/A3/A5: balanstest draait; dominante combinaties mogelijk tot kalibratie bij aansluiten interventiemodus.
- Open: nabespreking A1 (ethischRisico/opvolging/echo in UI), begrotingsposten vanaf A3, A2/A3/A5 naar `motorKind: 'interventie'`.

## A1 — slotLineA1 (afgerond stap 3)

`slotLineA1` gebruikt interventie-id's `a1-1-4`, `a1-2-2`, `a1-2-3`; gekoppeld aan `state.rounds[1|2].cards` in de slotfilm.

## A4-verwijzingen na besluit demo leidend

Richard: kies per regel welke **demokaart** (A–J) de bedoeling dekt. Echo's naar **A1–A3** niet wijzigen tenzij apart besloten.

### `data/interventies-a2.ts`

| Regel / veld | Verwijzing | Opmerking |
| --- | --- | --- |
| `a2-1-4` · `opvolging` | „bevordert anoniem flexwerk **(A4)**” | Demokaart? **C — Flexkrachten** |
| `a2-2-1` · `opvolging` | „Joost … **(A3, A4)**” | Algemeen; geen 4.x-id |

### `data/interventies-a3.ts`

| Regel / veld | Verwijzing | Opmerking |
| --- | --- | --- |
| `a3-1-3` · `opvolging` | „spanning met oudgedienden in **A4**” | Geen 4.x-id |
| `a3-1-4` · `opvolging` | „vertrouwen op dat **A4** nodig heeft” | Geen 4.x-id |
| `a3-1-2` · `opvolging` | „voorloper van TEMPO en **PILOT**” | Concept **4.2.2 PILOT** vs demo **G — Defensie via TEMPO** / PILOT-advies in UI |
| `a3-2-2` · `opvolging` | „bereidt AI-aansturing in **A4** voor” | Geen 4.x-id |

### `docs/_archief-oude-recept-map/interventies-a4-concept-VERVALLEN.ts` (niet importeren)

| Id | Nummer | Naam (concept) | Echo's (alleen in archief) |
| --- | --- | --- | --- |
| `a4-1-1` | 4.1.1 | Beveiligde Defensie-afdeling | — |
| `a4-1-2` | 4.1.2 | Civiele dronelijn | — |
| `a4-1-3` | 4.1.3 | TEMPO invoeren (AI-planning) | — |
| `a4-1-4` | 4.1.4 | Flexploeg opschalen | `a1-1-4`, `a2-1-4` (flex-echo's; demo: **C — Flexkrachten**) |
| `a4-2-2` | 4.2.2 | PILOT (AI-prestatiemonitor) | — |
| `a4-2-3` | 4.2.3 | Administratielast verlagen | — |
| `a4-2-4` | 4.2.4 | Gewetensbezwaar-loket | vs demo **F — Gewetensclausule** |
| `a4-nb-1` … `a4-nb-12` | — | Nabespreking concept-lijst | Speelbaar: `data/nabespreking-ep4.ts` (`ep4-nb-*`) |

### `docs/INTERVENTIES-AFLEVERING-2-T-M-5-29-10-2026.md`

- § structuur: uitzondering „A4 ronde 2 = 3 interventies” — **verouderd** (demo: 5+5).
- §4 volledige teksten **4.1.1–4.2.4** en koppelingen (flex → Piotr, gewetens-loket 4.2.4, Piotr 4.2.1, PILOT 4.2.2, enz.).
- §7 addendum test (d) naar **4.2.1** — verouderd.

### Overige docs (historisch / context)

| Bestand | Verwijzing |
| --- | --- |
| `docs/OPEN-VRAGEN.md` (vorige secties) | Tabel demo vs `interventies-a4.ts`, **4.2.1**, a4-2-1 |
| `docs/VOORTGANG.md` (eerdere regels) | a4-2-1, drie interventies r2 |
| `docs/claude-outputs/recept-stand-van-zaken-02-11-2026.md` | 4.2.1, drie kaarten r2 |
| `docs/prompts/CURSOR-PROMPT-BESLUITEN-INTERVENTIES-01-11-2026.md` | 4.2.1, a4-2-1, 4.2.2–4.2.4 |
| `docs/prompts/CURSOR-PROMPT-A4-DEMO-LEIDEND-03-11-2026.md` | Beschrijft deze migratie |

### Contentstatus A4-kaarten (punt 5)

- `data/contentStatus.ts`: status **`definitief`** geldt voor **scènes**, niet voor demokaarten.
- `data/rounds.ts` / `interventionCardSchema`: optioneel veld `status: 'concept' \| 'goedgekeurd'` — **niet** gezet op de tien kaarten; geen `definitief` per kaart toegevoegd (Richard's akkoord = demo zelf, geen extra veld).

## Wat op Richard wacht

| Onderwerp | Status |
| --- | --- |
| **Taalronde overige teksten** | Privéberichten, nabesprekingen, slotscènes A2 t/m A5 (cold opens klaar) |
| **Kaartvoorstellen gesprekskaarten** | Open |
| **A1 stap 3** | Koppeling interventies A1 aan spelmotor; `slotLineA1` op echte keuzes; twee rondes met eigen budget/onderzoek |
| **Bouw A1–A3 + A5 → full** | Checklist `DESIGNGIDS.md` §7 |
| **Zichtbare timer** | `.timer.low`, time-out, docentgebeurtenissen |
| **Vergelijkscherm v1** | teamExport-import, twee ranglijsten (`LATER.md`, `BOUWPLANNING.md`) |
| **Regiekamer v2** | Sync, auth, AVG |
| **Nabespreking A1 t/m A5** | Nog **concept** |
| **A4-verwijzingen** | Mapping concept → demokaart A–J |
| **Sanne / overige nabespreking** | Nog `concept` |
| **Beelden** | Geen akkoord — `BEELDEN-CHECK.md` |

## Inhoud ingelezen

- `data/interventies-a1.ts` … `a5.ts` + `data/interventies/all.ts` (32 items, A1–A3 + A5 definitief)
- **A4:** `data/rounds.ts` + `referentie/demo-aflevering4-v6.html`
- Echo's A1–A3, A5 (`demo-a4-H`) + `echoTekstenVoorGekozenInterventies`
- Piotr-lijn, `nabespreking-ep4.ts`, Sanne-data — ongewijzigd in deze taak

## Technisch

- Tests: zie `npm test` (incl. `episodeContent.test.ts`)
- Golden-suite zevendeling `spelmotor.md`: nog open
- Multiplayer v1/v2: zie `LATER.md` (vergelijkscherm, daarna regiekamer)
