# Recept – Beeldcodes (kort overzicht voor de bouw)

De volledige Firefly-prompts staan in het ontwerpdocument; Cursor heeft alleen de codes en bestemming nodig. Bestanden komen in `public/beelden/<code>.webp` (16:9, maximaal 1600 px breed) of `public/portretten/<slug>.webp` (portretten). Ontbreekt een beeld: toon een sfeervolle plaatsaanduiding "BEELD <code> VOLGT".

## Stijl per tijdperk

| Code | Tijdperk | Kleur en sfeer |
| --- | --- | --- |
| S1 | 1984, de schuur | warm amber en bruin, tungsten licht, filmkorrel |
| S2 | 1996, de lopende band | gedempt groen en grijs, tl-licht, zachte korrel |
| S3 | 2009, de overname | neutraal koel daglicht, glas en grijs beton |
| S4 | 2026, de drones | koud blauwwit ledlicht, hoog contrast, schermgloed |
| S5 | 2036, de erfenis | verzadigd-arm leisteen en staal, bewolkt, monumentaal |

## Codes

| Groep | Codes |
| --- | --- |
| Key art | K1 (familie in bestuurskamer) |
| Titelkaarten | T1 schuur 1984, T2 lege hal 1996, T3 drie fabrieken 2009, T4 drone in assemblagehal 2026, T5 glazen hoofdkantoor 2036 |
| Cold opens (familiescène) | C1 keukentafel 1984, C2 verjaardag 1996, C3 aankondiging 2009, C4 71e verjaardag Harrie 2026, C5 na de begrafenis 2036 |
| Werkvloer | W1 met de hand 1984, W2 de band 1996, W3 de controle 2009, W4 de nachtploeg 2026, W5 het kantoor 2036 |
| Portretten (legacy 4:5) | P1–P18 (zie mapping in `docs/PORTRETTEN-LIJST.md` § Legacy) |
| Portretten (vierkant, UI) | **`P-<NAAM>-<JAAR>`** bijv. `P-HARRIE-1984` → `public/beelden/portretten/P-HARRIE-1984.webp` (of `.jpg`); 800×800, max 150 kB — volledige lijst: `docs/PORTRETTEN-LIJST.md` |
| Locaties en objecten | L1 het schrift, L2 de bestuurskamer, L3 dashboardachtergrond schuur, L4 dashboardachtergrond conglomeraat |
| Tijdgeest — Renault 5 (rode draad) | **RENAULT-84**, **RENAULT-96**, **RENAULT-09**, **RENAULT-26**, **RENAULT-36** — prompts in `docs/TIJDGEEST.md` |
| Tijdgeest — rekwisieten | **REKW-84-CASSETTE**, **REKW-84-TELEFOON**, **REKW-96-PC**, **REKW-96-SEMAFOON**, **REKW-09-BLACKBERRY**, **REKW-09-HYVES**, **REKW-09-WII**, **REKW-26-PADEL**, **REKW-26-SMARTWATCH**, **REKW-36-BEZORG** — prompts in `docs/TIJDGEEST.md` |
| Aflevering 1 (1984, nieuw) | **A1-BRIEFJE** — briefje tussen kasboekpagina's; **A1-SCHRIFT** — twee handschriften op één pagina (slot close-up) |
| Aanvullend in de demo | MENU, I4, X1, Y1, R2, D1, PIOTR (zie `referentie/beelden/`) |

## Let op

De Firefly-beeldbank is fotorealistisch; de gekozen portretstijl voor de game is gestileerd (zie `PORTRETTEN-PROMPTS.md`). Bevestiging van die keuze staat nog open. Erik, Yasmin en Piotr zijn in het ontwerp aan een herkomst gekoppeld (Yasmin Marokkaans-Nederlands, Piotr Pools): bewaak dat dit niet tot stereotype uitbeelding leidt.
