# Stap 3 — verkenning interventiemodel (5 november 2026)

## (a) ComputeResult-velden die de UI per meter gebruikt

| Meter (ontwerp) | ComputeResult / UI | Waar |
| --- | --- | --- |
| Productiviteit | `P0`, `P1` (volgende ronde) | `DashboardColumn`, `UitkomstPhase` (details, alleen A4) |
| Betrokkenheid | `B` (+ `betr`/`anb` in A4-export) | `DashboardColumn` |
| Verzuim | `verz` (percentage) | `UitkomstPhase` details, `teamExport` |
| Verloop | `verl` (percentage) | `teamExport`; niet op dashboard A4 |
| Budget | `bud` + `bcalc().left` (A4: euro-begroting) | `GameShell` header, `BesluitPhase` |
| Welzijn / vertrouwen / resultaat | `W`, `V`, `winst`, `eurRes` | Alleen A4-dashboard (`usesDemoBudget`) |
| Verborgen | niet in `ComputeResult`; state `hidden.menselijkeMaat` / `eerlijkheid` | `NabesprekingPhase`, na ronde via `hiddenMeters.ts` (A4) |

Interventiemodus vult dezelfde `ComputeResult`-velden waar de 1984-skin meters toont (`P0`, `B`, `verz`, `verl`); overige velden neutraal zoals `stubCompute`.

## (b) Waar stubCompute wordt aangeroepen

- `src/game/gameReducer.ts` → `CONFIRM_BESLUIT` als `useSkeletonMotor(episode)` true (A1–A3, A5 vóór stap 3).

## (c) budgetUi / budgetFix en budgetpunten

- **A4:** `usesDemoBudget` → `budgetOf` / `marcoBud`, kaartkosten via `kostEur(k.kosten)`, plus begrotingssliders (`posten`).
- **Skeleton:** `budgetOfDef` + volledige posten uit `SKELETON_ROUNDS`.
- **Interventiemodus (besluit 2):** `budgetVoorRonde` / `roundDef.budget`; A1: **8** (r1) en **9** (r2) punten; kosten via `kostenCategorie` → 3/5/6; geen posten; muntlabel **gulden** (1984).

## (d) Minimale aanpassingen

1. Register `motorKind: 'interventie' | 'skeleton' | 'a4'` in `EpisodeContent` (geen `episode === 1` in reducer).
2. `data/interventies/vertaaltabel.ts`, `startwaarden.ts`, `engine/interventieCompute.ts`.
3. `data/episodes/a1Rounds.ts` + `EPISODE_CONTENT[1].rounds`.
4. Schema: 4 of 5 kaarten; A4 blijft 5.
5. UI: `BesluitPhase` zonder PILOT/begroting bij interventie; `UitkomstPhase` met uitkomstteksten; dashboard 1984-meters.
6. `hiddenMeters`: verborgen effecten uit interventiedata i.p.v. A4-kaartletters.
7. State `interventieMeters` voor voortgang ronde 1 → 2 en `effectLater` (50%, niet naar volgende aflevering).

## Technische kanttekening

- A4 `hiddenMeters` koppelt aan kaart-id A–J; interventiemodus vereist een **eigen** hidden-pad (geen mix). Oplossing: `applyHiddenInterventie` na `interventieCompute`.
- `DashboardColumn` is A4-controlekamer; 1984 gebruikt dezelfde component met `motorKind === 'interventie'` (waarden i.p.v. alleen ringen waar nodig).
