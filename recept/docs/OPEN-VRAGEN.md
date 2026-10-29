# Open vragen en aanleveringen

Laatste update: **29 oktober 2026** (Piotr varianten bevestigd).

## Aflevering 4 — conceptdata vs demo (`data/rounds.ts`, v6)

De demo blijft leidend tot Richard beslist. **Kaartinterventies niet overschreven.** Ronde 2 heeft wel de begrotingspost **`piotr-vast`** (loyaliteit, ≥ €25.000 = MT koos Piotr in dienst) voor de slotvariant 2031.

| Onderwerp | Demo (speelbaar) | Concept `data/interventies-a4.ts` |
| --- | --- | --- |
| Interventies per ronde | 5 kaarten (A–E / F–J) | 4 per ronde (4.1.x / 4.2.x) |
| Setting / crisis ronde 1 | `leiderschapscrisis`, H2 2026 | Greiner coördinatie/bureaucratie, doc ±2031 |
| Ronde 1 thema's | Vitaliteit, bonus, flex, TEMPO-plafond, coaching | Defensie-hal, civiele lijn, TEMPO AI, flexploeg |
| Ronde 2 thema's | Gewetensclausule, Defensie via TEMPO, regels schrappen, ploegleiders, compliance | Piotr contract, PILOT, admin verlagen, gewetens-loket |
| Piotr in dienst | Onderzoeksactie + begroting `piotr-vast` + slotvariant | Interventie `a4-2-1` in data |
| Nabespreking ep4 | Piotr-vragen in `nabespreking-ep4.ts` (deels definitief) | A4-interventienabespreking ook in `NABESPREKING_A4` (concept) |

Richard: sync demo ↔ serieconcept of demo houden (standaard: demo geldt).

## Wat op Richard wacht

| Onderwerp | Status |
| --- | --- |
| **Live deploy** | https://recept-k8m3n7p2.netlify.app/ |
| **Wachtwoord URL** | Niet geconfigureerd (betaald). |
| **Piotr-lijn** | Scènes + varianten **definitief**; student ziet intro, privébericht, testament + één variant (finale / voorspel). **`a4r2-keuze-contract`** blijft concept. |
| **`variantZonderContract` / `variantMetContract`** | **Bevestigd** — gekoppeld aan keuze via `piotr-vast` in ronde 2. |
| **`a4-2-1` definitief** | Nog **`interventieDefinitief=false`** in data (Richard beslist apart; varianten staan klaar). |
| **Sanne / overige nabespreking** | Nog `concept` (behalve één handelenvraag definitief). |
| **Beelden** | Geen akkoord — zie `BEELDEN-CHECK.md`. |
| **Sanne toon** | Standaard A; B via docent-schakelaar. Contract ja/nee nog niet aan motor. |
| **Interventies kalibratie** | 40 concept-items A1–A5; niet aan spelmotor. |

## Inhoud ingelezen (concept)

- `data/interventies-a1.ts` … `a5.ts` + `data/interventies/all.ts`
- Echo's sectie 6 (addendum-tests)
- `data/sanne.ts` (reactie contract × toon, slot ep4, onthulling ep5)
- Sanne-vragen → `nabespreking-ep4.ts`
- Greiner → `greinerCrisisEp4` (niet aan motor)

## Technisch

- Tests: 38 (incl. piotrSpel, piotrVariant, contentStatus)
- Golden-suite zevendeling `spelmotor.md`: nog open
- Multiplayer: bewust niet v1
