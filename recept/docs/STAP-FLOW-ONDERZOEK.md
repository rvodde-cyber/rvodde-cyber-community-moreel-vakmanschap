# Stap flow-onderzoek — aflevering 1 (5 november 2026)

Doel: hapering en overmatig klikken in de speelflow; A4/golden ongewijzigd.

## Oorzaak hapering (opgelost)

| Probleem | Locatie | Fix |
| --- | --- | --- |
| Cold open stopte bij regel 5 | `gameReducer` `COLD_NEXT` met vaste `max = 4` | Grens uit register: `canColdNext()` / `coldOpenMaxSub()` in `data/episodes/coldOpenFlow.ts` |
| A1 r1 heeft 8 regels (index 0–7), r2 heeft 5 regels (0–4) | `COLD_OPEN_EP1` | Zelfde fix; geen wijziging aan cold-openteksten |

## Faseovergangen aflevering 1 (reducer)

| Fase | Uitgang | Actie | Opmerking |
| --- | --- | --- | --- |
| intro | cold | `SET_PHASE` | 1× Verder (bewust leesmoment) |
| cold (trailer) | cold (scène) | `PLAY_FILM` → `END_FILM` of `TRAILER_DONE` | Trailer eindigt automatisch met `END_FILM`; geen extra klik |
| cold (scène) | onderzoek | auto `COLD_NEXT` + 1× Start MT-overleg | Geen klik per regel meer |
| onderzoek | besluit | `SET_PHASE` / flow UI | Ongewijzigd |
| besluit | scan/uitkomst | `CONFIRM_BESLUIT` | Ongewijzigd |
| uitkomst | film | `PLAY_FILM` slot | Bewuste klik slot |
| film slot-r1 | tussen | `END_FILM` | Automatisch einde film |
| tussen | intro r2 | `START_ROUND_2` | 1× CTA pauzekaart |
| intro r2 | cold r2 | `SET_PHASE` | Kort leesmoment briefje — behouden |
| … r2 | voorspel | `END_FILM` finale | Automatisch einde film |
| voorspel | nabespreking | keuze + knop | Voorspelling = keuzemoment |

Geen blokkades gevonden: elke film (`trailer-r1`, `slot-r1`, `finale`) heeft een `END_FILM`-pad; taalronde-stub cold opens voor A2/A3/A5 in `SKELETON_COLD` blijven documentatie/hook; speelbare cold opens staan in `coldOpenEp*`.

## Verplichte klikken vóór / na (A1, ronde 1 tot MT-overleg)

| Moment | Vóór (nov) | Na (nov) |
| --- | --- | --- |
| Intro → cold | 1 | 1 |
| Trailer starten | 1 | 1 |
| Cold open (8 regels) | 7× Verder + laatste knop | 0 (auto) + 1× Start MT-overleg |
| **Totaal intro → onderzoek** | **~10** | **3** |

Optioneel: Overslaan, Naar de scène (trailer), Pauze — niet meegeteld als verplicht.

## Overige fasen A1 (stap 4)

| Fase | Aanpassing | Reden |
| --- | --- | --- |
| TussenPhase | Geen | Eén pauzekaart-CTA + tafelvragen = leesmoment |
| UitkomstPhase | Geen | Slotfilm-knop + dilemma/keuzes elders |
| VoorspelPhase | Geen | Voorspelling + tafelvragen |
| IntroPhase r2 | Geen | Tekst over briefje — leesmoment |

## Teksten

- Generieke „Stap 1 van 4…” vervangen door `coldOpenCopy.ts` (trailer + scène).
- „Beslistijd tien minuten” alleen als `usesBeslistijdTimer(episode)` (interventie + A4).

## Tests

`engine/__tests__/coldOpenFlow.test.ts` — registergrenzen, leestijd, auto-gate, 3 klikken, A1 `END_FILM`-paden.

## A2 / A3 / A5 — sjabloon A1 (6 nov 2026, bijgewerkt A3 speelbaar)

**Doel:** hergebruik van de A1-stroom (twee rondes interventiemotor, dilemma ronde 2, tussenkaart, slotfilm met dynamische `slotLine`, pauzekaart). **A2, A3 en A5** volgen dat patroon (`EPISODE_*_CONTENT`).

| Onderdeel | A1 (sjabloon) | A2 (1996) | A3 (2009) | A5 (2036) |
| --- | --- | --- | --- | --- |
| Register | `EPISODE_1_CONTENT` | `EPISODE_2_CONTENT` | `EPISODE_3_CONTENT` | `EPISODE_5_CONTENT` |
| Motor | `interventie` | idem | idem | `interventie` |
| Rondedef | `a1Rounds` + `INTERVENTIES_A1` | `a2Rounds` + `INTERVENTIES_A2` | `a3Rounds` + `INTERVENTIES_A3` | `a5Rounds` + `INTERVENTIES_A5` |
| Budget | 8/9 | 8/9 | 8/9 (`budgetVoorRonde(3, ronde)`) | 8/9 (`budgetVoorRonde(5, ronde)`) |
| Cold open | `coldOpenEp1` | `coldOpenEp2` | `coldOpenEp3` (r1 = taalronde gelijk `SKELETON_COLD[3]`; r2 = vergaderruimte + sms-setup) | `coldOpenEp5` (r2 = hoofdkantoor + app-setup) |
| Dilemma | `ep1-frans` · briefje | `ep2-wim` · briefje | `ep3-waalwijk` · sms (`sms2009`, `SmsDilemmaPanel`) | `ep5-schrift` · app (`AppDilemmaPanel`) |
| Slotfilm | `buildSlotEp1` + `slotLineA1` | `buildSlotEp2` + `slotLineA2` | `buildSlotEp3` + `slotLineA3` + brugzin Defensie/drones | `buildSlotEp5` + `slotLineA5` |
| `showsSkeletLabel` | nee | nee | nee | nee |
| Disclaimer intro | — | — | — (interventie: budget + tien minuten) | — (idem) |

**A2:** `coldOpenEp2`, `a2Rounds`, `ep2-wim`, `slotLineA2`, `buildSlotEp2`, pauze-/tussenkaart (hoofdstuk 2 bron).

**A3:** `coldOpenEp3`, `a3Rounds`, `ep3-waalwijk`, `slotLineA3`, `buildSlotEp3`, pauze-/tussenkaart (hoofdstuk 3 bron); slotcue staat in `data/filmSequences.ts` (`buildSlotEp3`), niet in `data/skeleton/film.ts`.

**A5:** `coldOpenEp5`, `a5Rounds`, `ep5-schrift`, `slotLineA5`, `buildSlotEp5`; pauzekaart zonder voorspelling.

## Introteksten (5–6 nov 2026, rechtzetting demo)

Onderzoek: `IntroPhase.tsx` (vak **JULLIE OPDRACHT**; A4 r1/r2 apart met `A4_INTRO_CARRY_*`), `content/intros.nl.ts` (geschiedenis/uitdagingen/hint + skelet-**opdracht**regel), `data/episodes/introUiCopy.ts` (`introCarryLines`, `introBeslistijdZin`, `budgetVoorRonde`).

**Waar komen “conceptskelet”, “mln”, “tien minuten” voor?**

| Bron | Inhoud |
| --- | --- |
| `introCarryLines` / `A4_INTRO_CARRY_*` | Opdrachtvak intro ronde 1 (niet-demo) en A4-carry; skelet-disclaimer zonder mln; A1 budget in **punten** |
| `IntroPhase` A4 r2 | **UITDAGINGEN**: `mln(budgetOf(2, …))` (demo ongewijzigd) |
| `GameShell`, `DashboardColumn` | HUD/dashboard: mln waar van toepassing |
| `data/rounds.ts` | Storyfeed o.a. orderregel met “€ 4,2 mln” (data, geen intro-copy) |
| `content/howItWorks.nl.ts` | Algemene uitleg (niet introscherm) |

| Aflevering | Ronde | Motor | Wat de speler ziet in JULLIE OPDRACHT |
| --- | --- | --- | --- |
| A1 | 1 | interventie | Kern + **budget deze ronde: N punten** (`budgetVoorRonde`) + zin beslistijd (`introBeslistijdZin` → *ongeveer tien minuten*) — geen mln, geen conceptskelet |
| A1 | 2 | interventie | Intro kort (briefje); geen carry-budget in intro |
| A2 | 1 | interventie | Kern + budget **N punten** + *ongeveer tien minuten* (timer) |
| A3 | 1 | interventie | Kern + budget **N punten** + *ongeveer tien minuten* (timer) |
| A5 | 1 | interventie | Kern + budget **N punten** + *ongeveer tien minuten* (timer), zelfde patroon als A1–A3 |
| A4 | 1 | a4 | Vaste demo-copy + *tien minuten* (`A4_INTRO_CARRY_R1`) |
| A4 | 2 | a4 | Vaste demo-copy r2 + mln in **UITDAGINGEN**; carry r2 ongewijzigd |

**Tien minuten:** in het opdrachtvak als derde regel via `introBeslistijdZin`; timer = `usesBeslistijdTimer`: **A1, A2, A3, A5** (interventie) en **A4** (demo). Alleen een hypothetische aflevering met `motorKind: 'skeleton'` krijgt *Neem de tijd om samen te kiezen* en de houtskoolschets-disclaimer (`introCarryLines`).

**Eerdere fout (demo):** A1 toonde nog conceptskelet + `€ 0,00 mln` via `budgetOfDef` op skelet-rounddef — opgelost via register-gestuurde copy.

Tests: `engine/__tests__/introUiCopy.test.ts`, UI-checks in `src/screens/landingIntro.test.tsx`.

## Onderzoeken A1/A2/A3/A5 (6 november 2026)

### Waar `acties` en `TOGGLE_ACTIE` landen

| Plek | Rol |
| --- | --- |
| `data/episodes/a1Rounds.ts` … `a5Rounds.ts` | `RoundDefinition.acties`: `id`, `t`, `quote`, `sig` per ronde |
| `data/schemas/rounds.schema.ts` | Zod-validatie: 3–6 acties per ronde |
| `src/screens/phases/OnderzoekPhase.tsx` | Toont tegels; bij selectie `quote` + `sig`; max. 3 gekozen id’s in state |
| `src/game/gameReducer.ts` | `TOGGLE_ACTIE`: lijst `rounds[r].acties` (string id’s), max. 3 |
| `src/game/uiTypes.ts` | `RoundUi.acties: string[]` |
| `src/game/teamExport.ts` | Exporteert gekozen id’s (geen inhoudelijke score) |
| **Motor / `interventieCompute` / golden** | Gebruikt **interventiekaarten** (`cards`), niet de onderzoek-id’s `a1`–`a5` |
| **Nabespreking** | Conditioneel op **gekozen interventies** (`tonenAlsGekozen`), niet op onderzoek |

### Wegen onderzoek-id’s inhoudelijk mee?

**Nee.** De id’s `a1` … `a5` zijn alleen keuzelijst + teamExport; ze zitten niet in effectberekening of golden. **A4** (`data/rounds.ts`): ongewijzigd; blijft demo-referentie met eigen `acties` (6 stuks ronde 1).

### Inhoud

Per aflevering en **per ronde** vijf onderzoeken met vaste titels (`t`), bevinding (`quote`) en signaalregel (`sig`, formaat als A4). Zie `docs/TAALGIDS.md` § Signaalwoorden onderzoeken.

## Bronnen

Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
