# Open vragen en aanleveringen

Laatste update: **2 november 2026** (A2-interventies definitief).

## Besloten (2 nov 2026)

| Onderwerp | Besluit |
| --- | --- |
| **Notatie** | Legenda in data + docs: `+`/`-` = richting meter; verzuim `-` gunstig; budget `-` = uitgave; `(later)` → `effectLater`. |
| **A1 interventies** | Alle **8** kaarten **definitief**; velden compleet; niet aan spelmotor. |
| **A2 interventies** | Alle **8** kaarten **definitief**; echo's ongewijzigd; velden compleet; niet aan spelmotor. |
| **A1 1.4** | Naam **Flexkrachten inhuren voor piekdrukte** (was „Flexibele jongeren…”). |
| **A1 2.2 / A2 2.2.2** | Bewuste bonus-echo + conditionele nabesprekingsvraag (alleen als `a1-2-2` én `a2-2-2` gekozen). |
| **Piotr** | Geen interventie `a4-2-1`; contract alleen via begroting **`piotr-vast`** (≥ €25.000) + slotvariant 2031. Echo-bron `piotr-vast` toegestaan naast interventie-id's. |

## Aflevering 4 — conceptdata vs demo (`data/rounds.ts`, v6)

De demo blijft leidend tot Richard beslist. **Kaartinterventies niet overschreven.** Ronde 2 heeft de begrotingspost **`piotr-vast`** voor de slotvariant 2031 (geen conceptkaart 4.2.1 meer).

| Onderwerp | Demo (speelbaar) | Concept `data/interventies-a4.ts` |
| --- | --- | --- |
| Interventies per ronde | 5 kaarten (A–E / F–J) | 4 in r1; **3 in r2** (4.2.2–4.2.4) |
| Setting / crisis ronde 1 | `leiderschapscrisis`, H2 2026 | Greiner coördinatie/bureaucratie, doc ±2031 |
| Ronde 1 thema's | Vitaliteit, bonus, flex, TEMPO-plafond, coaching | Defensie-hal, civiele lijn, TEMPO AI, flexploeg |
| Ronde 2 thema's | Gewetensclausule, Defensie via TEMPO, regels schrappen, ploegleiders, compliance | PILOT, admin verlagen, gewetens-loket (+ begroting Piotr) |
| Piotr in dienst | Onderzoeksactie + begroting `piotr-vast` + slotvariant | Zelfde lijn; geen dubbele kaart in conceptdata |
| Nabespreking ep4 | Piotr-vragen in `nabespreking-ep4.ts` (deels definitief) | A4-interventienabespreking ook in `NABESPREKING_A4` (concept) |

Richard: sync demo ↔ serieconcept of demo houden (standaard: demo geldt).

## Notatie — resterende afwijkingen bron-md vs data (niet automatisch gecorrigeerd)

| Id / bron | Afwijking |
| --- | --- |
| **A1 1.1** | Bron-md §1.1: verloop `(later)` als `-`; data: direct `verloop -`, `effectLater.verloop +` (besloten). |
| **A1 2.2** | Bron-md §2.2: verzuim `(later) +`; data: direct `verzuim -`, `effectLater.verzuim +` (presenteïsme, besloten). |
| **A2 2.2.4** | Bron-md: verzuim `-`(later); data: `effect.verzuim 0`, `effectLater.verzuim -` (zelfde bedoeling, andere opsplitsing). |
| **A4 4.2.1** | Bron-md beschrijft nog kaart Piotr; data/demo: alleen `piotr-vast` (besloten). |
| **Diverse `(later)`** | In md soms op `bud` of `verl`; in data soms alleen in `effectLater` — inhoudelijk te checken bij kalibratie. |

## Wat op Richard wacht

| Onderwerp | Status |
| --- | --- |
| **Live deploy** | https://recept-k8m3n7p2.netlify.app/ |
| **Wachtwoord URL** | Niet geconfigureerd (betaald). |
| **Piotr-lijn** | Scènes + varianten **definitief**; student ziet intro, privébericht, testament + één variant (finale / voorspel). **`a4r2-keuze-contract`** blijft concept. |
| **Nabespreking A1 + A2** | Nog **concept** (incl. conditionele Wegen-vraag A2 in `data/interventies-a2.ts`). |
| **`interventieDefinitief` A3–A5** | Nog **false** — akkoord per aflevering gewenst. |
| **Sanne / overige nabespreking** | Nog `concept` (behalve één handelenvraag definitief). |
| **Beelden** | Geen akkoord — zie `BEELDEN-CHECK.md`. |
| **Sanne toon** | Standaard A; B via docent-schakelaar. Contract ja/nee nog niet aan motor. |
| **Interventies kalibratie** | A3–A5: 23 concept-items; niet aan spelmotor. |

## Inhoud ingelezen (concept)

- `data/interventies-a3.ts` … `a5.ts` + `data/interventies/all.ts`
- `data/interventies-a1.ts` / `a2.ts` — interventies **definitief**; nabespreking **concept**
- Echo's + `echoTekstenVoorGekozenInterventies` (bonus-lijn)
- `data/sanne.ts` (reactie contract × toon, slot ep4, onthulling ep5)
- Sanne-vragen → `nabespreking-ep4.ts`
- Greiner → `greinerCrisisEp4` (niet aan motor)

## Technisch

- Tests: **47** (incl. piotrSpel, piotrVariant, contentStatus, interventie-besluiten, A1/A2-definitief)
- Golden-suite zevendeling `spelmotor.md`: nog open
- Multiplayer: bewust niet v1
