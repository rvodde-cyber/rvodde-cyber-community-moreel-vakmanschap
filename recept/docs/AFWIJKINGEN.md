# Afwijkingen — Recept

## Greiner-crisis aflevering 4 (serie vs demo)

- **Serie (prompt §3.1):** aflevering 4 = bureaucratiecrisis.
- **Demo (verwacht in referentie):** ronde 1 leiderschap, ronde 2 autonomie.
- **Besluit:** crisis per ronde configureerbaar in data; voorlopig demo-waarden zodra referentie beschikbaar is.

### Harrie in 1984 (introtekst vs serieconcept)

- **introteksten.md:** Harrie 22 in de schuur.
- **serieconcept (leidend voor leeftijden):** geboren 1955 → 29 in 1984.
- **Besluit:** leeftijden en alt-teksten volgen serieconcept; introtekst aflevering 1 wordt later aangepast in de bron.

### Piotr (canon 27 oktober 2026)

- **Leidend:** `docs/PIOTR-LIJN.md` (flex ronde 1, optioneel vast ronde 2, dilemma privé, geen landnaam in UI).
- **Oudere teksten:** `morele-dilemmas.md` / `beeldbank-codes.md` noemen soms „engineer” of „Pools” — game volgt Piotr-lijn, niet die labels.
- **Demo v6:** bericht „elf jaar” vs bureau-flex; tekst in `data/dilemmas/ep4-piotr.ts` aangepast naar „jaren via het bureau”.

## Proefberekening ronde 1 vs golden (referentie v6)

Golden snapshots volgen `referentie/demo-aflevering4-v6.html` (`compute`). Afwijking t.o.v. de proeftabel in `docs/spelmotor.md`:

| Scenario | Veld | spelmotor.md | Golden v6 |
| --- | --- | --- | --- |
| Geen interventie | P1 | 68 | 67 |
| D | P1 | 73 | 74 |
| D + E | P1 | 77 | 79 |
| E | W | 46 | 45 |

W/B voor geen interventie, D en D+E komen overeen op hele punten. P1 wijkt enkele punten; goldens zijn leidend voor tests tot kalibratie.
