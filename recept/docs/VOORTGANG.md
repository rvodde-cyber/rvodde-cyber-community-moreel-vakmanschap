# Voortgang Recept (Cursor-bouw)

Laatste update: **10 november 2026** — portretten-voorbereiding (lijst + bouwsteen)

## Deze sessie

| Onderdeel | Status |
| --- | --- |
| **Portretten (voorbereiding)** | `docs/PORTRETTEN-LIJST.md`, codeschema `P-<NAAM>-<JAAR>`, `Portret.tsx`, glossarium per aflevering (`data/glossarium.ts`), **23+5** nog aan te leveren door Richard. Tests `portret.test.tsx`. |
| **Zus-rol (één teamrol)** | MT-rolverdeling en `RoleBelangModal` verwijderd; spelers = jongere zus. Flow: besluit → **argument** → gesprek/uitkomst. `docs/INVENTARIS-MT-ROLLEN.md`. |
| **Argumentstap** | Fase `argument`, velden 20–280 / 10–140 tekens, knop *Dit is ons besluit*; export + docentlog; timer loopt door (`useGame` + `onderzoek`/`besluit`/`argument`), geen blokkade bij 0. |
| **Teksten** | `content/uitleg.ts` (6 stappen, 4 momenten), startscherm naam zus, `howItWorks`/`glossary`, intro A1 notariszin; nabesprekingsvraag *Wie wist…* (concept) per aflevering. |
| **Tests / build** | Zie laatste run na portretten-taak (`npm test`, `npm run build`). |
| **Uitleg en spelregels** | `content/uitleg.ts`, `UitlegScreen.tsx`, routing via `App.tsx` + `UiModalsContext`; CSS `uitleg-*`; tests `uitlegScreen.test.tsx`; docs §9b `DESIGNGIDS.md`; zichtbare **cold open** → **openingsscène** (`StepsNav`, docentpaneel). |
| --- | --- |
| **Stap 2 — onderzoek A1/A2/A3/A5** | Per ronde **5** onderzoeken (`t`, `quote`, `sig`); inhoud uit opdracht; r1 ≠ r2 in `a1Rounds` … `a5Rounds`. Schema `acties`: 3–6 items. UI: `.tiles--onderzoek` (3+2 breed, 1 kolom &lt;720px); `quote` 16px/1.55, `sig` uppercase. `docs/TAALGIDS.md` § Signaalwoorden; `STAP-FLOW-ONDERZOEK.md` § Onderzoeken. **A4** `data/rounds.ts` ongewijzigd. Onderzoek-id’s wegen **niet** mee in motor/golden (alleen UI + export). Test: `onderzoekActiesInterventie.test.ts`. |
| **Intro-split (introBeeldRechts)** | Scrollcontainer `#intro-split-scroll` …; kaderfix + **telefoon `aspect-ratio 4/5`**, **tablet `4/3`**, caps **`min(55dvh, 520/560px)`**; register **`introBeeldFocus`** → `--intro-focus-x/y` op `.intro-beeld`; polaroid **zonder** vignet, andere kaders **`.intro-beeld__shade--soft`** (20% hoogte, max 0,25). Zie `DESIGNGIDS.md`, focusparen in `docs/BEELDEN-CHECK.md`. |
| **Tests types A5-interventie** | Historische mismatch-rapport: `docs/RAPPORT-A2-A3-A5-06-11-2026.md` |
| **A3 (2009) speelbaar** | Register `EPISODE_3_CONTENT`: `motorKind: 'interventie'`, `a3Rounds`, `COLD_OPEN_EP3`, dilemma `ep3-waalwijk` (sms 2009), `slotLineA3`, slotfilm `buildSlotEp3` (Defensie-brugzin), pauze-/tussenkaart; landingslabel **Speelbaar**; tests + `STAP-FLOW-ONDERZOEK.md` bijgewerkt |
| **Worstenbroodje + bedrijfslijn** | Product- en bakmetafoor in `content/`, `data/`, UI; `overstapUitleg` + `HOE HET ZO VER KWAM` op A4; A3 geschiedenis + **titelregel in A3-slotfilm** (Defensie 2020); echo A5 → Van Gorp Groep; docs `BEDRIJFSVERHAAL.md`, `TAALGIDS` §7, `TIJDGEEST` tijdlijn; test `worstenbroodjeCopy.test.ts` |
| **Introteksten + landingspagina** | `introCarryLines`: A1 + skeletten derde regel via `introBeslistijdZin` (timer vs. *Neem de tijd*); `STAP-FLOW-ONDERZOEK.md` § Introteksten uitgebreid; landingspagina: lichtere `.landing-overlay`, scrim `.landing-in::before`, data-chips + episodekaarten leesbaarder |
| **Tijdgeestlaag** | `data/episodes/tijdgeest.ts`, ticker UI (`tickerRegelsVoor`), geluid aan/uit + tekstalternatief; docs `TIJDGEEST.md`, `GELUID-CHECK.md`, beeldbank-check |
| **Speelflow A1** | Cold open auto + registergrenzen; 3 klikken intro→MT; `docs/STAP-FLOW-ONDERZOEK.md` |
| **Typografie per tijdperk** | Fontsource self-hosted, `PeriodTypographyScope`, instelling Leesbaar lettertype — `docs/TYPOGRAFIE.md` |
| **Gesprekskaarten** | Fase `gesprek` ronde 1; A4 uit; `docs/GESPREKSKAART.md`, export v2 |
| **Fase 0** | Jaartallen docs, besluit 13, `DESIGNGIDS.md`, `LATER.md` / `BOUWPLANNING.md` |
| **A1 stap 1 — generaliseren** | **`EPISODE_CONTENT`**; consumers via register |
| **A1 stap 2 — inhoud 1984** | Cold opens, `ep1-frans`, briefje-UI, `slot-ep1`, `slotLineA1`, pauzekaart; docs beeld/portret |
| **A1 stap 3 — interventiemotor** | `interventieCompute`, register `motorKind`, A1 speelbaar; budget **8 / 9** punten r1/r2 |
| **A1–A3 + A5 interventies** | **8× definitief** per aflevering; **A5** in register als `motorKind: 'interventie'` (`EPISODE_5_CONTENT`); testbestanden verwachten deels nog oude A5-skeletdefinities — zie rapport |
| **A2 (1996)** | `EPISODE_2_CONTENT`, `coldOpenEp2`, `a2Rounds`, `ep2-wim`, `slotLineA2`/`buildSlotEp2` |
| **A3 (2009)** | `EPISODE_3_CONTENT`, `coldOpenEp3`, `a3Rounds`, `ep3-waalwijk`, `SmsDilemmaPanel`, `slotLineA3`/`buildSlotEp3` |
| **A4** | Demo leidend (`data/rounds.ts`); golden tests ongewijzigd |
| **Taalronde cold opens** | A2, A3, A4 (2 regels), A5 letterlijk; Lotte → **Anne-Fleur** in actieve data/docs |
| Nabespreking A1 t/m A5 | Nog **concept** |
| Tests / build | **`npm test`** en **`npm run build`** — zie laatste run na uitlegpagina |
| Viewport stap 2 (handmatige check) | **360px:** onderzoek-tegels 1 kolom (`tiles--onderzoek`), geen horizontale scroll van de pagina. **768px:** boven 720px breed wordt het raster 3+2. **1920px:** 3+2 layout; lange titels/teksen wrappen in de tegel. |

## Live demo

| Link | URL |
| --- | --- |
| Student | https://recept-k8m3n7p2.netlify.app/ |
| Docent | https://recept-k8m3n7p2.netlify.app/?docent=1 |

## Richard — top-3

1. **A5** interventiemodus + kalibratie startwaarden/balans; **nabespreking A1** (ethischRisico/opvolging/echo); A3-kalibratie na Richard’s speeltest (`OPEN-VRAGEN.md`).
2. **Vergelijkscherm v1** (teamExport-import, twee ranglijsten).
3. Nabespreking A1–A5, Sanne, beeldakkoord; **A4-verwijzingen** (`OPEN-VRAGEN.md`).

## Lokaal

```bash
cd recept && npm test && npm run dev
```
