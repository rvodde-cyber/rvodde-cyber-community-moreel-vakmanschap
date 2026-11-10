# Inventaris — MT-rolverdeling en verborgen rolbelangen

Datum: 10 november 2026  
Branch: `feat/recept-a1`  
Doel: overzicht vóór verwijdering; beoordeling impact op scores, verborgen meters en export.

## Impact op scores / meters / export

| Onderdeel | Invloed op **scores** (P0, W, B, interventiemeters) | Invloed op **verborgen meters** (eerlijkheid, menselijke maat) | **Export** / vergelijk |
|-----------|------------------------------------------------------|----------------------------------------------------------------|------------------------|
| `spoken` + rondje MT UI | **Nee** — alleen gate voor `okBesluit` | **Nee** | Ja — `rolStandpunten` in `buildTeamExport` |
| `ROL_BELANG` / `RoleBelangModal` | **Nee** | **Nee** | Ja — `belangOnthuld` per rol in export |
| `mot` (motivatie MT) | **Nee** | **Nee** | Ja — veld `motivatie` |
| `min` / `minOn` (minderheidsstandpunt) | **Nee** | **Ja** (A4/skeleton: +eerlijkheid bij ingevulde min) | Ja — `minderheid` |
| Verborgen doelen per speler | **Niet aanwezig** — geen aparte hidden goals; alleen MT-personagebelangen in `rolBelang.ts` (docent/nabespreking) |

**Conclusie:** Roltoewijzing en geheime MT-belangen kunnen worden verwijderd zonder de spelmotor of interventiecompute te wijzigen. `mot`/minderheidsstandpunt vallen weg met de MT-besluit-UI; de nieuwe argumentstap vervangt motivatie in export en docentlog. Oude saves met `spoken`/`mot` blijven laden; velden worden genegeerd in validatie.

---

## Data

| Bestand | Functie | Koppelingen |
|---------|---------|-------------|
| `data/rollen.ts` | `MT_ROLLEN` (4 ids: dir, fin, hr, or) | BesluitPhase, RoleBelangModal, teamExport, nabespreking |
| `data/rolBelang.ts` | `ROL_BELANG[ronde][rolId]` — teksten “geheim belang” | RoleBelangModal, teamExport, NabesprekingPhase |

## State & regels

| Bestand | Wat het doet |
|---------|----------------|
| `src/game/uiTypes.ts` | `RoundUiState.spoken`, `mot`, `min`, `minOn` |
| `src/game/budgetUi.ts` | `freshRoundUi()` initialiseert `spoken: []`, `mot`, `minOn` |
| `src/game/besluitRules.ts` | `okBesluit` vereist 4× `spoken`, `mot` ≥ 8 tekens (zonder spaties), 2 kaarten, budget |
| `src/game/gameReducer.ts` | `TOGGLE_ROLE`, `MARK_ROLE_SPOKE`; `SET_FIELD` mot/min; `CONFIRM_BESLUIT` (geen rol in compute) |
| `src/game/migrateState.ts` | Merge rounds uit save — extra velden (`spoken`) blijven in object |
| `src/game/hiddenMeters.ts` | `applyHiddenAfterRound`: `minOn` + `min` → eerlijkheid (niet gekoppeld aan rollen) |

## UI & modals

| Bestand | Wat het doet |
|---------|----------------|
| `src/screens/phases/BesluitPhase.tsx` | Sectie “RONDJE MT”, knoppen per rol → `openRole`, motivatie + minderheidsstandpunt, “Besluit vastleggen” |
| `src/components/modals/RoleBelangModal.tsx` | Toon belang, “standpunt gegeven” |
| `src/context/UiModalsContext.tsx` | Modal `kind === 'role'`, `openRole`, `RoleBelangModal` |
| `src/components/modals/HowItWorksModal.tsx` | Titel “Jullie bent het MT” + stappen uit `howItWorks.nl.ts` (rolverdeling) |
| `content/howItWorks.nl.ts` | Stap 1: vier rollen verdelen; stap 5: rondje MT |
| `content/rolbeschrijving.nl.ts` | Vier MT-rollen verdelen |
| `content/glossary.nl.ts` | MT = “jullie, met rollen…” |
| `content/uitleg.ts` | tafel override A4: “rondje MT met geheime belangen” |
| `src/components/StepsNav.tsx` | Label `MT-BESLUIT` |
| `src/screens/phases/NabesprekingPhase.tsx` | Motivatie MT, details `ROL_BELANG` |
| `docs/DESIGNGIDS.md` | Vermelding `RoleBelangModal` |

## Export & docent

| Bestand | Wat het doet |
|---------|----------------|
| `src/game/teamExport.ts` | `motivatie`, `minderheid`, `rolStandpunten[]` |
| `src/components/DocentPausePanel.tsx` | Geen rol-UI; export-knop |

## Tests

| Bestand | Wat het dekt |
|---------|----------------|
| `engine/__tests__/budgetFix.test.ts` | `MARK_ROLE_SPOKE` × 4 + `mot` voor `okBesluit` |
| `engine/__tests__/gesprekskaart.test.ts` | `CONFIRM_BESLUIT` zonder argumentfase; save met `spoken` |
| `src/screens/landingIntro.test.tsx` | Landing voornaam (MT-rol niet) |

## Overige verwijzingen (geen rolverdeling-UI)

- `content/intros.nl.ts` / `data/episodes/introUiCopy.ts` — spelers als “managementteam” (tekst, geen mechaniek)
- `data/nabespreking-ep4.ts`, `data/interventies-a*.ts` — personage-MT in verhaal/interventies; geen spelerrollen
- Berichten/dilemma’s: keuze “naar MT” vs privé — personages, niet spelerrolverdeling
