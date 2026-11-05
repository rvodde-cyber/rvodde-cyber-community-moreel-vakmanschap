# Gesprekskaarten — Recept

Laatste update: **5 november 2026**. Bron teksten: `docs/claude-outputs/recept-gesprekskaarten-voorstel-05-11-2026.md`.

## Plek in de flow

```
… → onderzoek → besluit → CONFIRM_BESLUIT (motor rekent uit) → [gesprek] → uitkomst → …
```

| Moment | Gedrag |
| --- | --- |
| **Ronde 1** | Na bevestigen MT-besluit: optioneel fase **`gesprek`** als `gesprekskaartActief` in `EPISODE_CONTENT` |
| **Ronde 2** | Geen gesprekskaart |
| **A4 demo** | `gesprekskaartActief: false` → direct **`scan`** (golden/demo ongewijzigd) |
| **A1, A2, A3, A5** | `gesprekskaartActief: true` → **`gesprek`** vóór uitkomst |

Implementatie: `phaseAfterBesluitConfirm()` in `src/game/gesprekFlow.ts`; reducer `CONFIRM_BESLUIT` zet alleen de fase — **compute/interventieCompute draait vóór** de kaart; `GESPREK_*` wijzigt geen `results`, budget of meters.

## State en export

| Onderdeel | Locatie |
| --- | --- |
| Kaartdefinitie | `data/gesprekskaarten.ts`, gekoppeld in `data/episodes/content.ts` |
| Invulling per sessie | `GameUiState.gesprekskaarten[]` |
| Acties | `GESPREK_OPSLAAN`, `GESPREK_OVERSLAAN` |
| Validatie | `validateGesprekOpslaan()` — zin 1–280 tekens, max 3 waarden uit `WAARDEN` |
| Migratie saves | `migrateState.ts` — `gesprekskaarten: []` als ontbrekend |
| UI | `src/screens/phases/GesprekskaartPhase.tsx` |
| Docent | `DocentPausePanel`, `NabesprekingPhase` (tabel/tekst) |

### Export JSON (`teamExport`)

`exportVersion: **2**` (was impliciet 1 zonder gesprekskaarten).

```json
{
  "exportVersion": 2,
  "gesprekskaarten": [
    {
      "episode": 1,
      "kaartId": "gk-a1-klusje-harrie",
      "zin": "…",
      "waarden": ["eerlijkheid", "zorg"],
      "overgeslagen": false,
      "tijdsduurSec": 95
    }
  ]
}
```

Bouwen: `buildTeamExport()` in `src/game/teamExport.ts`.

## Waarden (vast)

Eerlijkheid, loyaliteit, rechtvaardigheid, zorg, vertrouwen, veiligheid, transparantie — ids in `WAARDEN` (`data/schemas/gesprekskaart.schema.ts`).

## Open (Richard / later)

- Visuele beoordeling kaarten na spelen.
- Vergelijkscherm v1 (teams naast elkaar).
- Timerduur per sessie instelbaar door docent.

## Bronnen

Lectoraat Ethisch Werken, Fontys Hogeschool HRM en Psychologie. (2026). Gesprekskaarten HRM, Praktijkschok HRM en Management [Kaartenset, interne publicatie].

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
