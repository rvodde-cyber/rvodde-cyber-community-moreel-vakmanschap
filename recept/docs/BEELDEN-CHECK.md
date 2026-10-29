# Beelden — controlelijst I1–I5 (en intro ep4)

Bron van waarheid voor akkoord: `data/beeldenCheck.ts` (`akkoordRichard`). De app toont alleen goedgekeurde beelden; anders neutrale placeholder.

| Code | Omschrijving | Bron / methode | Alt-tekst (NL) | Stereotypencheck | Akkoord Richard |
| --- | --- | --- | --- | --- | --- |
| I1 | Intro aflevering 1 | Nog aan te leveren | Zie data | Zie `STEREOTYPENCHECK-CRITERIA.md` (Claude) | nee |
| I2 | Intro aflevering 2 | Nog aan te leveren | Zie data | Geen uitsluitende beelden | nee |
| I3 | Intro aflevering 3 | Nog aan te leveren | Zie data | Geen impliciete codering stoelen | nee |
| I4 | Intro aflevering 4 (T4) | referentie/beelden/T4.jpg | Zie data | Geen personen | nee |
| I5 | Intro aflevering 5 | Nog aan te leveren | Zie data | Geen “koud conglomeraat”-cliché | nee |

## Portretten (8)

Zie `docs/PORTRETTEN-PROMPTS.md`. Extra aandacht stereotypencheck (Bianchi et al., 2023):

| Slug | Akkoord | Notitie stereotypencheck |
| --- | --- | --- |
| piotr-nowak | nee | Mens met eigen verhaal; geen Oost-Europa-schurk |
| erik-verhoeven | nee | Geen verkoper-schurk; gelijk visueel gewicht |
| yasmin-el-amrani | nee | HR-professional; geen tokenisme |
| overige | nee | Geen rol ↔ achtergrond koppeling |

Richard zet `akkoordRichard: true` in `data/beeldenCheck.ts` (beelden) en levert WebP in `public/portretten/`.
