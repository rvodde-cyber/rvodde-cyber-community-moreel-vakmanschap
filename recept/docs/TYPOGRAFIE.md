# Typografie Recept (5 november 2026)

Besluit Richard: lettertypen veranderen mee met het tijdperk; leesbaarheid gaat voor; **aflevering 4 (demo)** behoudt het bestaande uiterlijk. Volledige specificatie: `docs/prompts/CURSOR-PROMPT-LETTERTYPEN-05-11-2026.md`.

## Hoe het werkt (technisch)

| Laag | Rol |
| --- | --- |
| `themes/periods.ts` | Vier stacks per periode: `fonts.display`, `fonts.hand`, `fonts.ui`, `fonts.data` |
| `themes/periodTypography.ts` | Resolveert CSS-variabelen; demo **2026** overschrijft `:root` `--sans`/`--data`/`--title` **niet** |
| `src/components/PeriodTypographyScope.tsx` | Wrapt het spel (`App.tsx`); zet `--font-*` (+ periode-stacks buiten A4) |
| `src/fonts/loadPeriodFonts.ts` | Lazy `@fontsource`-imports per `periodKey` (alleen latin, beperkte gewichten) |
| `src/lib/a11ySettings.ts` | `readableFont` → `data-readable-font` op `<html>` |
| Instellingen | Knop **Leesbaar lettertype**: display + hand → neutrale sans, iets meer regelafstand |

**Dashboard:** `PeriodThemeScope` gebruikt dezelfde `--font-ui` / `--font-data` voor zijpaneel-widgets.

**CSS:** `src/styles/recept.css` — titels/cold open `.ep` → `--font-display`; briefje → `--font-hand`; ticker/klok blijven `--data` (demo A4 via `:root`).

### Vóór deze stap

- Alleen `fonts.ui` en `fonts.data` in `periods.ts`, toegepast op dashboard via `--period-ui-font`.
- Globale demo-UI: `:root` in `recept.css` (`--title` Cinzel, `--sans` IBM Plex Sans, `--data` Chakra Petch, `--serif` Instrument Serif) — **ongewijzigd voor A4**.

## Specificatie per aflevering

| Periode | display | hand | ui | data |
| --- | --- | --- | --- | --- |
| 1984 | Special Elite | Caveat | Georgia | Courier New |
| 1996 | VT323 | Caveat | system-ui | VT323 |
| 2009 | Verdana, Tahoma | Caveat | Verdana, Tahoma | Consolas |
| 2026 | Cinzel (documentatie; `:root --title`) | Caveat | **system-ui** (register) | **ui-monospace** (register) |
| 2036 | Nunito 300 | Caveat | Nunito | Nunito (tabular via `.data`) |

Handschrift/typemachine **niet** voor lange lopende tekst (uitkomst, nabespreking, dilemma-uitleg).

## Self-hosted lettertypen (Fontsource)

| Pakket | Gebruik | Licentie | Subset / gewichten |
| --- | --- | --- | --- |
| `@fontsource/special-elite` | 1984 display | [OFL](https://github.com/fontsource/font-files/tree/main/fonts/google/special-elite) | latin-400 |
| `@fontsource/caveat` | hand alle periodes | [OFL](https://github.com/fontsource/font-files/tree/main/fonts/google/caveat) | latin-400 |
| `@fontsource/vt323` | 1996 display + data | [OFL](https://github.com/fontsource/font-files/tree/main/fonts/google/vt323) | latin-400 |
| `@fontsource/nunito` | 2036 display/ui/data | [OFL](https://github.com/fontsource/font-files/tree/main/fonts/google/nunito) | latin-300, 400, 700 |

Verdana, Tahoma, Consolas, Georgia, Courier: **systeemfallbacks** (geen extra bestanden). Geen Google Fonts CDN in de app.

Laadpad: `src/fonts/packs/<periodKey>.ts` — alleen geïmporteerd wanneer die aflevering speelt.

## Leesbaar lettertype

Standaard **uit**. Aan: `--font-display` en `--font-hand` = `system-ui, sans-serif`; op demo 2026 ook `--title` neutraal. UI-body en data-ticker blijven zoals het tijdperk voorschrijft (tenzij het hele `:root` al wordt overschreven buiten A4).

## Bronnen

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
