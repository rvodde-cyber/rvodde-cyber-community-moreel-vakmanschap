# Beelden — controlelijst I1–I5, Piotr, Erik, Yasmin

Bron van waarheid voor akkoord: `data/beeldenCheck.ts` (`akkoordRichard`). De app toont **alleen** beelden met akkoord = ja; anders neutraal silhouet.

Stereotypencheck-kolommen volgen **docs/VOORSTELLEN-RECEPT-29-10-2026.md §6** (ja / nee / twijfel + toelichting).

Legenda kolommen: **1** eigen verhaal · **2** geen herkomstclichés · **3** geen dreigingsframe · **4** gelijkwaardige uitbeelding · **5** functie boven afkomst · **6** geen karikatuur · **7** alt-tekst OK · **8** generatie-controle (Bianchi et al., 2023) · **9** akkoord Richard

## Sfeerbeelden I1–I5

| Code | Omschrijving | Alt-tekst (NL) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 akkoord |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| I1 | Intro aflevering 1 — woonhuis + schuur Berkel-Enschot | Bestand `public/beelden/I1.jpg` aanwezig; intro laadt JPG ook zonder `akkoordRichard`. Akkoord checklist: **nee** — Firefly-brief `docs/prompts/CURSOR-PROMPT-INTRO-BEELD-RECHTS-05-11-2026.md` | twijfel | ja | ja | n.v.t. | ja | ja | ja | n.v.t. | **nee** |
| I2 | Intro aflevering 2 — lopende band 1996 | Sfeerbeeld: fabriekshal met band (placeholder) | twijfel | ja | ja | n.v.t. | ja | ja | ja | n.v.t. | **nee** |
| I3 | Intro aflevering 3 — directietafel 2009 | Sfeerbeeld: lege directietafel (placeholder) | twijfel | ja | ja | n.v.t. | ja | ja | ja | n.v.t. | **nee** |
| I4 | Intro aflevering 4 — TEMPO (T4 demo) | Leeg kantoor met actieve schermen bij zonsopgang | n.v.t. | ja | ja | n.v.t. | n.v.t. | ja | ja | n.v.t. | **nee** |
| I5 | Intro aflevering 5 — Spoorzone 2036 | Glazen ingang met reflectie (placeholder) | twijfel | ja | ja | n.v.t. | ja | ja | ja | n.v.t. | **nee** |

Toelichting I1–I3/I5: beeld nog niet aangeleverd; check op klassieke arbeiders- of “koud conglomeraat”-clichés volgt bij definitief bestand.

## Aflevering 1 — cold open, briefje, slot (3 nov 2026)

| Code | Omschrijving | Status app | Akkoord |
| --- | --- | --- | --- |
| C1 | Keukentafel 1984 (cold open r1) | Placeholder/silhouet via `SceneBackground` | **nee** |
| W1 | Met de hand 1984 (cold open r2) | Placeholder/silhouet | **nee** |
| T1 | Schuur 1984 (slot) | Placeholder/silhouet | **nee** |
| A1-BRIEFJE | Briefje tussen kasboekpagina's (UI: tekst in `BriefjePanel`, geen apart beeld) | Geen asset vereist voor speelbare tekst | **nee** |
| A1-SCHRIFT | Twee handschriften op één pagina (slot beat 6) | Placeholder/silhouet | **nee** |

## Portretten

| Slug | Rol | Alt-tekst (NL) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 akkoord |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| piotr-nowak | Flex / ploegleider | Portret: man in werkkleding, neutrale achtergrond | twijfel | ja | ja | twijfel | ja | ja | ja | twijfel | **nee** |
| erik-verhoeven | MT / zakelijk | Portret: man in zakelijke kleding | twijfel | ja | ja | twijfel | ja | ja | ja | twijfel | **nee** |
| yasmin-el-amrani | HR | Portret: vrouw in professionele kleding | twijfel | ja | ja | twijfel | ja | ja | ja | twijfel | **nee** |
| overige MT | Diverse | Zie `docs/PORTRETTEN-PROMPTS.md` | twijfel | ja | ja | twijfel | ja | ja | ja | twijfel | **nee** |

Richard zet `akkoordRichard: true` in `data/beeldenCheck.ts` en levert WebP in `public/portretten/` of `public/beelden/`.

## Tijdgeest — Renault 5 en rekwisieten (5 nov 2026)

Bron prompts: **`docs/TIJDGEEST.md`**. Bestanden: `public/beelden/<code>.webp`. Rekwisieten in de UI pas wanneer beeld akkoord is of past bij bestaande achtergrond; tot die tijd alleen documentatie.

| Code | Omschrijving | Status app | Akkoord |
| --- | --- | --- | --- |
| RENAULT-84 | Rode Renault 5 bij schuur, kratten achterbank | Nog geen asset | **nee** |
| RENAULT-96 | Zelfde auto, roestig, industrieterrein | Nog geen asset | **nee** |
| RENAULT-09 | Klassieker op parkeerterrein fabriek | Nog geen asset | **nee** |
| RENAULT-26 | Elektrische retro-hatchback bij dronefabriek | Nog geen asset | **nee** |
| RENAULT-36 | Oude rode 5 in glazen vitrine lobby | Nog geen asset | **nee** |
| REKW-84-CASSETTE | Cassetterecorder met handgeschreven label | Nog geen asset | **nee** |
| REKW-84-TELEFOON | Telefoon met draaischijf | Nog geen asset | **nee** |
| REKW-96-PC | Beige jaren-90 pc + semafoon (apart REKW-96-SEMAFOON) | Nog geen asset | **nee** |
| REKW-96-SEMAFOON | Semafoon op bureau | Nog geen asset | **nee** |
| REKW-09-BLACKBERRY | BlackBerry | Nog geen asset | **nee** |
| REKW-09-HYVES | Pc met sociaal netwerk open (generiek, geen logo) | Nog geen asset | **nee** |
| REKW-09-WII | Spelconsole pauzeruimte | Nog geen asset | **nee** |
| REKW-26-PADEL | Padelbaan naast fabriek | Nog geen asset | **nee** |
| REKW-26-SMARTWATCH | Smartwatch (detail) | Nog geen asset | **nee** |
| REKW-36-BEZORG | Zelfrijdende bezorgwagen laaddock | Nog geen asset | **nee** |

## WCAG

Alt-teksten zijn Nederlands en beschrijvend, zonder herkomstlabels (WCAG 2.2, zie voorstel §9).
