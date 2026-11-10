# Portretten — inventaris en aanleverlijst

Laatste update: **10 november 2026** (branch `feat/recept-a1`).

## Beeldspecificatie (Firefly → Richard)

| Eigenschap | Waarde |
| --- | --- |
| Formaat | Vierkant **1:1** |
| Pixel | **800 × 800** px |
| Bestand | **JPG** of **WebP**, maximaal **150 kB** |
| Kadrage | Hoofd en schouders, gecentreerd |
| Bestandsnaam | **= code** (bijv. `P-HARRIE-1984.webp`) |
| Pad in repo | `public/beelden/portretten/<code>.webp` (of `.jpg`) |
| Stijl | Zie `docs/PORTRETTEN-PROMPTS.md` (gestileerd illustratieportret) |

**Uitsluitingen:** geen portret voor de **jongere zus** (spelersrol). Geen herkomst in beeld of alt-tekst. Figuranten uit gesprekskaarten niet opnemen tenzij ze op een scherm met tegel verschijnen.

## Codeschema

`P-<TOKEN>-<JAAR>` — TOKEN = HOOFDLETTERS, koppeltekens, geen spaties (bijv. `P-ANNE-FLEUR-2036`).

Mapping legacy P1–P18 (ontwerp 4:5) → nieuwe codes waar van toepassing:

| Legacy | Nieuw (voorbeeld) |
| --- | --- |
| P1 | P-HARRIE-1984 |
| P2 | P-HARRIE-2026 |
| P3 | P-LIES-1984 |
| P4 | P-LIES-2036 |
| P5 | P-SANNE-2009 |
| P6 | P-SANNE-2036 |
| P7 | P-MARCO-2009 |
| P8 | P-MARCO-2026 |
| P9 | P-ERIK-2026 |
| P10 | P-GERRIT-1984 |
| P11 | P-ANS-1996 |
| P12 | P-ANS-2026 |
| P13 | P-JOOST-2026 |
| P14 | P-DENNIS-2026 |
| P15 | P-YASMIN-2026 |
| P16 | P-PIOTR-2026 |
| P17 | P-ANNE-FLEUR-2036 |
| P18 | P-CAROLINE-2036 |

## Hoofdtabel (prioriteit 1 = tegel Wie is wie)

| Code | Personage | Afl. | Jaar | Leeftijd | Rol | Uiterlijk (alleen vastgelegd) | Waar in beeld | Prio | Bron |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P-HARRIE-1984 | Harrie van Gorp | 1 | 1984 | 29 | Oprichter schuur | niet vastgelegd | Wie is wie, cold open, intro | 1 | `content/intros.nl.ts`, `docs/serieconcept.md` |
| P-HARRIE-1996 | Harrie van Gorp | 2 | 1996 | 41 | Directeur-eigenaar | niet vastgelegd | Wie is wie, cold open, intro | 1 | idem |
| P-HARRIE-2009 | Harrie van Gorp | 3 | 2009 | 54 | Directeur-eigenaar | niet vastgelegd | Wie is wie, cold open, intro | 1 | `content/intros.nl.ts`, `docs/serieconcept.md` |
| P-HARRIE-2026 | Harrie van Gorp | 4 | 2026 | 71 | President-commissaris | niet vastgelegd | Wie is wie, berichten, intro A4 | 1 | `data/personen.ts`, `content/intros.nl.ts` |
| P-LIES-1984 | Lies van Gorp | 1 | 1984 | 27 | Kasboek / klanten | niet vastgelegd | Wie is wie, cold open, onderstroom | 1 | `content/intros.nl.ts`, `docs/serieconcept.md` |
| P-LIES-1996 | Lies van Gorp | 2 | 1996 | 39 | Medeoprichter | niet vastgelegd | Wie is wie, cold open | 1 | `docs/serieconcept.md`, `data/episodes/coldOpenEp2.ts` |
| P-GERRIT-1984 | Gerrit Smulders | 1 | 1984 | 44 | Slager | witte slagersschort (prompt) | Wie is wie, cold open, gesprekskaart A1 | 1 | `docs/PORTRETTEN-PROMPTS.md`, `docs/serieconcept.md` |
| P-GERRIT-1996 | Gerrit Smulders | 2 | 1996 | 56 | Ploegbaas | niet vastgelegd | Wie is wie, cold open, slotfilm | 1 | `docs/serieconcept.md`, `content/intros.nl.ts` |
| P-JOOST-1996 | Joost Hendriks | 2 | 1996 | 22* | Werknemer / OR-start | niet vastgelegd | Wie is wie, cold open r2 | 1 | `data/personen.ts`*, `coldOpenEp2.ts` |
| P-SANNE-2009 | Sanne van Gorp | 3 | 2009 | 32 | Kandidaat-opvolger | niet vastgelegd | Wie is wie, cold open, intro | 1 | `content/intros.nl.ts`, `docs/serieconcept.md` |
| P-MARCO-2009 | Marco van Gorp | 3 | 2009 | 29 | Kandidaat-opvolger | niet vastgelegd | Wie is wie, cold open | 1 | `docs/serieconcept.md`, `data/personen.ts` |
| P-MARCO-2026 | Marco van Gorp | 4 | 2026 | 46 | Directeur | niet vastgelegd | Wie is wie, berichten | 1 | `CURSOR-PROMPT.md` §8.2, `data/personen.ts` |
| P-MARCO-2036 | Marco van Gorp | 5 | 2036 | 56 | Directeur | niet vastgelegd | Wie is wie, cold open | 1 | `docs/serieconcept.md`, `coldOpenEp5.ts` |
| P-ANS-2026 | Ans Willems | 4 | 2026 | 57 | Ploegleider | niet vastgelegd | Wie is wie, berichten | 1 | `data/personen.ts`, `data/berichten.ts` |
| P-ERIK-2026 | Erik Verhoeven | 4 | 2026 | 49 | Adviseur Optivora | nette blazer (prompt); geen schurkbeeld | Wie is wie, berichten | 1 | `docs/PORTRETTEN-PROMPTS.md`, `data/personen.ts` |
| P-JOOST-2026 | Joost Hendriks | 4 | 2026 | 52 | OR / medewerkers | casual colbert (prompt) | Wie is wie | 1 | `docs/PORTRETTEN-PROMPTS.md` |
| P-DENNIS-2026 | Dennis Kuijpers | 4 | 2026 | 39 | Financieel directeur | niet vastgelegd | Wie is wie, berichten | 1 | `data/personen.ts` |
| P-YASMIN-2026 | Yasmin El Amrani | 4 | 2026 | 29 | HR-manager | niet vastgelegd | Wie is wie, gesprekskaart A4 (tekst) | 1 | `data/personen.ts`, `data/gesprekskaarten.ts` |
| P-PIOTR-2026 | Piotr Nowak | 4 | 2026 | 34 | Flexkracht assemblage | niet vastgelegd | Wie is wie r2, berichten, dilemma | 1 | `data/personen.ts` |
| P-ANNE-FLEUR-2036 | Anne-Fleur van Gorp | 5 | 2036 | 26 | Nieuwe generatie | keurig, blond, blauwe ogen (`PORTRETTEN-PROMPTS.md`) | Wie is wie, cold open, onderstroom | 1 | `docs/PORTRETTEN-PROMPTS.md`, `coldOpenEp5.ts` |
| P-SANNE-2036 | Sanne van Gorp | 5 | 2036 | 59 | Erfgename | niet vastgelegd | Wie is wie, cold open r2 | 1 | `docs/serieconcept.md`, `coldOpenEp5.ts` |
| P-PIOTR-2036 | Piotr Nowak | 5 | 2036 | 44 | Ploegleider (of vertrokken) | niet vastgelegd | Wie is wie, cold open | 1 | `docs/serieconcept.md`, `data/personen.ts` |
| P-CAROLINE-2036 | Caroline de Wit | 5 | 2036 | 56 | Investeerder | niet vastgelegd | Wie is wie | 1 | `docs/serieconcept.md` |

\* Joost in **1996**: geboortejaar 1974 in `docs/serieconcept.md` → leeftijd **22** afgeleid; geen expliciete leeftijd in cold-opencopy.

## Prioriteit 2 (wel in verhaal, geen Wie-is-wie-tegel)

| Code (voorstel) | Personage | Afl. | Jaar | Leeftijd | Opmerking | Bron |
| --- | --- | --- | --- | --- | --- | --- |
| P-FRANS-1984 | Frans (buurman) | 1 | 1984 | niet vastgelegd | Dilemma `ep1-frans`; geen tegel | `data/dilemmas/stubs.ts`, `PORTRETTEN-PROMPTS.md` |
| P-LIES-2009 | Lies van Gorp | 3 | 2009 | 52 | In serieconcept wel aanwezig; geen glossariumtegel A3 | `docs/serieconcept.md` |
| P-LIES-2026 | Lies van Gorp | 4 | 2026 | 69 | idem | `docs/serieconcept.md` |
| P-LIES-2036 | Lies van Gorp | 5 | 2036 | 79 | idem | `docs/serieconcept.md` |
| P-ANS-1996 | Ans Willems | 2 | 1996 | 27 | Werkvloer; geen glossariumtegel A2 | `docs/serieconcept.md` |

Geen portretten voor: **Ingrid, Truus, Saskia, Mark, Ria, Sanaa** (alleen gesprekskaart-tekst), **Wim** (dilemma zonder avatar-tegel), **de jongere zus**.

## (a) Meerdere afleveringen — leeftijdsverloop

| Personage | 1984 | 1996 | 2009 | 2026 | 2036 |
| --- | --- | --- | --- | --- | --- |
| Harrie van Gorp | 29 | 41 | 54 | 71 | overleden 2031 |
| Lies van Gorp | 27 | 39 | 52 | 69 | 79 |
| Gerrit Smulders | 44 | 56 | † | – | – |
| Sanne van Gorp | 7 | 19 | 32 | 49 | 59 |
| Marco van Gorp | 4 | 16 | 29 | 46 | 56 |
| Erik Verhoeven | – | – | 32 | 49 | 59 |
| Ans Willems | – | 27 | 40 | 57 | 67 |
| Joost Hendriks | – | 22* | 35 | 52 | 62 |
| Dennis Kuijpers | – | – | – | 39 | 49 |
| Yasmin El Amrani | – | – | – | 29 | 39 |
| Piotr Nowak | – | – | – | 34 | 44 |
| Anne-Fleur van Gorp | – | – | – | 16 | 26 |
| Caroline de Wit | – | – | – | – | 56 |

Bron leeftijden: `docs/serieconcept.md` (leidend), aangevuld met speelbare teksten.

## (b) Inconsistenties en twijfels

| Onderwerp | Wat zegt de code/tekst | Wat zegt docs | Status |
| --- | --- | --- | --- |
| Harrie 2009 | **54** in `content/intros.nl.ts`, `data/personen.ts` | **54** in `docs/serieconcept.md` | consistent |
| Harrie 2009 | Oud ontwerp `recept-houtskoolschets` noemde **66** | – | **verouderd**; volg 54 |
| Marco 2009 | intro: „net **dertig**”; data: **29** | serieconcept **29** | intro vs. leeftijd: tekst laat „dertig” staan |
| Sanne 2026 | serieconcept **49** | geen A4-glossariumtegel | alleen narratief |
| Ans 1996 | legacy **P11 = 27** | serieconcept **27** | P2-portret nog niet in UI-lijst |
| Joost 1996 | data **22** (afgeleid uit geboortejaar) | serieconcept **–** in 1996 | leeftijd niet letterlijk in cold open |
| Portretpad | was `public/portretten/<slug>.webp` | nu `public/beelden/portretten/<code>` | **bewuste afwijking** t.o.v. `PORTRETTEN-PROMPTS.md` (512px); UI-spec 800px uit opdracht |
| Anne-Fleur uiterlijk | blond, blauwe ogen in prompt | geen code-label herkomst | alleen voor Firefly, niet in alt |

## (c) Telling benodigde portretten

| Prioriteit | Aantal | Toelichting |
| --- | --- | --- |
| **1** | **23** | Unieke codes in glossarium / `data/personen.ts` `afleveringen.portret` |
| **2** | **5** | Frans + vier Lies/ Ans-varianten zonder tegel |
| **Totaal** | **28** | Geen dubbele aanlevering van dezelfde code |

**Personages in inventaris (unieke namen, excl. zus):** 13 kernpersonen + 1 figuur (Frans) + 6 gesprekskaart-figuranten (niet geportretteerd) = **13** met ten minste één portretregel in P1.

## Implementatie in de app

- Data: `data/personen.ts` (`afleveringen[].portret`), glossarium: `data/glossarium.ts`
- UI: `src/components/Portret.tsx` (fallback initialen, webp→jpg, lazy)
- Geen assets in repo tot Richard aanlevert (`public/beelden/portretten/`).
