# Beelden — controlelijst I1–I5, Piotr, Erik, Yasmin

Bron van waarheid voor akkoord: `data/beeldenCheck.ts` (`akkoordRichard`). De app toont **alleen** beelden met akkoord = ja; anders neutraal silhouet.

Stereotypencheck-kolommen volgen **docs/VOORSTELLEN-RECEPT-29-10-2026.md §6** (ja / nee / twijfel + toelichting).

Legenda kolommen: **1** eigen verhaal · **2** geen herkomstclichés · **3** geen dreigingsframe · **4** gelijkwaardige uitbeelding · **5** functie boven afkomst · **6** geen karikatuur · **7** alt-tekst OK · **8** generatie-controle (Bianchi et al., 2023) · **9** akkoord Richard

## Sfeerbeelden I1–I5

| Code | Omschrijving | Alt-tekst (NL) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 akkoord |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| I1 | Intro aflevering 1 — schuur 1984 | Sfeerbeeld: schuur bij schemer (placeholder) | twijfel | ja | ja | n.v.t. | ja | ja | ja | n.v.t. | **nee** |
| I2 | Intro aflevering 2 — lopende band 1996 | Sfeerbeeld: fabriekshal met band (placeholder) | twijfel | ja | ja | n.v.t. | ja | ja | ja | n.v.t. | **nee** |
| I3 | Intro aflevering 3 — directietafel 2009 | Sfeerbeeld: lege directietafel (placeholder) | twijfel | ja | ja | n.v.t. | ja | ja | ja | n.v.t. | **nee** |
| I4 | Intro aflevering 4 — TEMPO (T4 demo) | Leeg kantoor met actieve schermen bij zonsopgang | n.v.t. | ja | ja | n.v.t. | n.v.t. | ja | ja | n.v.t. | **nee** |
| I5 | Intro aflevering 5 — Spoorzone 2036 | Glazen ingang met reflectie (placeholder) | twijfel | ja | ja | n.v.t. | ja | ja | ja | n.v.t. | **nee** |

Toelichting I1–I3/I5: beeld nog niet aangeleverd; check op klassieke arbeiders- of “koud conglomeraat”-clichés volgt bij definitief bestand.

## Portretten

| Slug | Rol | Alt-tekst (NL) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 akkoord |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| piotr-nowak | Flex / ploegleider | Portret: man in werkkleding, neutrale achtergrond | twijfel | ja | ja | twijfel | ja | ja | ja | twijfel | **nee** |
| erik-verhoeven | MT / zakelijk | Portret: man in zakelijke kleding | twijfel | ja | ja | twijfel | ja | ja | ja | twijfel | **nee** |
| yasmin-el-amrani | HR | Portret: vrouw in professionele kleding | twijfel | ja | ja | twijfel | ja | ja | ja | twijfel | **nee** |
| overige MT | Diverse | Zie `docs/PORTRETTEN-PROMPTS.md` | twijfel | ja | ja | twijfel | ja | ja | ja | twijfel | **nee** |

Richard zet `akkoordRichard: true` in `data/beeldenCheck.ts` en levert WebP in `public/portretten/` of `public/beelden/`.

## WCAG

Alt-teksten zijn Nederlands en beschrijvend, zonder herkomstlabels (WCAG 2.2, zie voorstel §9).
