# Open vragen en aanleveringen

Laatste update: **29 oktober 2026** (Piotr-lijn deels definitief).

## Aflevering 4 — conceptdata vs demo (`data/rounds.ts`, v6)

De demo blijft leidend tot Richard beslist. **Niet overschreven.**

| Onderwerp | Demo (speelbaar) | Concept `data/interventies-a4.ts` |
| --- | --- | --- |
| Interventies per ronde | 5 kaarten (A–E / F–J) | 4 per ronde (4.1.x / 4.2.x) |
| Setting / crisis ronde 1 | `leiderschapscrisis`, H2 2026 | Greiner coördinatie/bureaucratie, doc ±2031 |
| Ronde 1 thema's | Vitaliteit, bonus, flex, TEMPO-plafond, coaching | Defensie-hal, civiele lijn, TEMPO AI, flexploeg |
| Ronde 2 thema's | Gewetensclausule, Defensie via TEMPO, regels schrappen, ploegleiders, compliance | Piotr contract, PILOT, admin verlagen, gewetens-loket |
| Piotr in dienst | Onderzoeksactie + `ep4Interventies` / post `piotr-vast`, niet als kaart 4.2.1 | Interventie `a4-2-1` in data |
| Nabespreking ep4 | Piotr-vragen in `nabespreking-ep4.ts` | A4-interventienabespreking ook in `NABESPREKING_A4` (concept) |

Richard: sync demo ↔ serieconcept of demo houden (standaard: demo geldt).

## Wat op Richard wacht

| Onderwerp | Status |
| --- | --- |
| **Live deploy** | https://recept-k8m3n7p2.netlify.app/ |
| **Wachtwoord URL** | Niet geconfigureerd (betaald). |
| **Piotr-lijn** | **Definitief:** `a4r1-piotr-intro`, `a4r2-harrie-belt`, `a4r2-erik-twijfel`, `a4r2-dilemma-privebericht`, `a4-slot-testament`, `a5-onthulling`, `a5-overdracht`. **Concept:** `a4r2-keuze-contract`. Student ziet intro (ronde 1) + privébericht (ronde 2) via `piotrSpel.ts`. Overige scènes nog niet in hoofdflow. |
| **Sanne / nabespreking definitief** | Nog `concept`; studenten zien fallback waar van toepassing. |
| **`variantZonderContract`** | Nog `leeg` — bevestiging variant slotscène. |
| **`a4-2-1` definitief** | Pas na variantscène + Richard (`interventieDefinitief` in data). |
| **Beelden** | Geen akkoord — zie `BEELDEN-CHECK.md` (silhouet in app). |
| **Sanne toon** | Standaard A; B via docent-schakelaar. Contract ja/nee nog niet aan motor. |
| **Interventies kalibratie** | 40 concept-items A1–A5; geen bedragen; niet aan motor. |

## Inhoud ingelezen (concept)

- `data/interventies-a1.ts` … `a5.ts` + `data/interventies/all.ts`
- Echo's sectie 6 (addendum-tests)
- `data/sanne.ts` (reactie contract × toon, slot ep4, onthulling ep5)
- Sanne-vragen → `nabespreking-ep4.ts`
- Greiner → `greinerCrisisEp4` (niet aan motor)

## Technisch

- Tests: 33 (incl. interventies, Sanne, piotrSpel)
- Golden-suite zevendeling `spelmotor.md`: nog open
- Multiplayer: bewust niet v1
