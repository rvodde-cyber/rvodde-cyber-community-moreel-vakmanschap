# Recept – introscherm per tijdperk: de fabriek groeit mee (5 november 2026)

Besluit Richard (5 november 2026): elk tijdperk krijgt een eigen beginpagina (introscherm) die laat zien hoe het bedrijf groeit: van de schuur (1984) via een eerste fabriekje (1996) en drie vestigingen (2009) en de dronefabriek (2026) tot een conglomeraat (2036). Dit bouwt voort op de opdracht "landingspagina en introscherm" (CURSOR-PROMPT-LANDING-EN-INTRO-05-11-2026.md); voer deze opdracht pas uit nadat die klaar en getest is.

## Beeldbrieven voor Richard (Adobe Firefly)

Formaat voor alle vijf: liggend 3:2, 1800 × 1200 px, fotorealistisch, geen tekst, geen logo's, geen herkenbare personen, maximaal 250 kB (JPG). Bestanden in `public/beelden/`. Dezelfde rode Renault 5 komt in elk beeld terug als rode draad (zie docs/TIJDGEEST.md).

| Code | Aflevering | Bestand | Beeld |
| --- | --- | --- | --- |
| I1 | 1 · 1984 | I1.jpg | huis met schuur, Berkel-Enschot (al geplaatst) |
| I2 | 2 · 1996 | I2.jpg | eerste fabriekshal, Loven (Tilburg) |
| I3 | 3 · 2009 | I3.jpg | bedrijventerrein met drie vestigingen |
| T4 | 4 · 2026 | T4.jpg | dronefabriek (bestaat al) |
| I5 | 5 · 2036 | I5.jpg | glazen hoofdkantoor van het conglomeraat |

**I2 · 1996 – eerste fabriekshal**
```
Photorealistic photograph, early morning in 1996, a modest industrial hall on the edge of Tilburg in the Netherlands, light brown brick walls with a corrugated metal roof and a wide loading dock, a white refrigerated delivery van with its doors open, wooden pallets and plastic crates stacked outside, a rusty red Renault 5 parked behind a chain-link fence, fluorescent light glowing through high windows, grey overcast sky, wet asphalt, muted greens and greys, slightly grainy 35mm film look, cinematic wide shot, no people, no text, no signs, no logos
```

**I3 · 2009 – drie vestigingen**
```
Photorealistic photograph, clear morning in 2009, a modern business park in the Netherlands with three identical low industrial buildings in a row, glass office fronts with silver cladding, neat lawns, a long straight road with small flags on poles without any logos, a few company cars in the car park including a well-kept red vintage Renault 5 as a classic car, cold blue-white sunlight, slightly desaturated colours, crisp digital photography look from the late 2000s, wide aerial-view composition, no people, no text, no signs, no logos
```

**I5 · 2036 – glazen hoofdkantoor**
```
Photorealistic photograph, golden hour in 2036, a sleek curved glass headquarters building of a food and robotics conglomerate in a green Dutch business district, the glass facade reflecting a small old wooden barn in the distance, a calm plaza with young trees and soft sculptural benches, a pristine red Renault 5 displayed like a museum piece behind a glass pavilion at the entrance, quiet and spacious, warm light against cool glass, subtle futuristic details, hyper-clean cinematic wide shot, no people, no text, no signs, no logos
```

Controleer elk beeld: geen leesbare tekst of logo's, geen personen, de rode Renault 5 zichtbaar maar niet dominant. Ontbreekt een bestand, dan toont het spel de plaatsaanduiding "BEELD <code> VOLGT".

## Sfeer per tijdperk (ontwerpspecificatie)

| Aflevering | Lichtkleur en tint over het beeld | Kader | Kicker en onderschrift |
| --- | --- | --- | --- |
| 1 · 1984 | warm, bruingeel, korrel | polaroid- of fotokader met een kleine kantlijn en een licht gekantelde hoek (maximaal 1 graad) | "AFLEVERING 1 / 1984", "BERKEL-ENSCHOT, 1984" |
| 2 · 1996 | grijsgroen tl-licht | beeld op kettingpapier-strook met perforatie links en rechts (CSS) | "AFLEVERING 2 / 1996", "LOVEN, TILBURG, 1996" |
| 3 · 2009 | koel blauwwit | venster in kantoorstijl (titelbalk met drie stippen, geen echte besturingsknoppen) | "AFLEVERING 3 / 2009", "TILBURG-WEST, 2009" |
| 4 · 2026 | cyaan donker (de huidige demo-look) | ongewijzigd | ongewijzigd |
| 5 · 2036 | zacht wit en glas, licht gloeiende rand | afgeronde hoeken (12 px), doorschijnend glaspaneel | "AFLEVERING 5 / 2036", "VOSSENBERG, TILBURG, 2036" |

Regels: de kaders zijn decoratief en nemen geen leesruimte van de tekst weg; leesbaarheid gaat voor sfeer; geen kopie van bestaande merken of besturingssystemen (geen echte Windows-knoppen of logo's).

## Cursor-prompt

Taak: introscherm per tijdperk (beeld en sfeer volgens de tabel hierboven). Taal NL. Geen deploy. Commit niet zelf. Voorwaarde: de opdracht "landingspagina en introscherm" is klaar en de tests zijn groen. Engine, rounds, golden-referenties en A4 (demo) blijven ongewijzigd; alle bestaande tests blijven groen. Werk in de map recept/.

1. Verkenning: lees IntroPhase.tsx, de CSS van het introscherm met beeld rechts, themes/periods.ts, data/sceneCodes.ts en EPISODE_CONTENT. Beschrijf kort in docs/DESIGNGIDS.md hoe het introscherm nu per aflevering wordt opgebouwd.
2. Data: voeg per aflevering een veld `introLook` toe aan EPISODE_CONTENT met `kader` ('polaroid' | 'kettingpapier' | 'venster' | 'dashboard' | 'glas'), `tint` (CSS-kleur of verloop), `kicker` en `onderschrift` (uit de tabel). A4 krijgt 'dashboard' en blijft visueel ongewijzigd.
3. Component: breid IntroPhase uit met een kaderwrapper per `kader` (CSS-klassen `intro-kader-<naam>`), met een tintlaag over het beeld (mix-blend of semi-transparante overlay, contrast van tekst blijft 4,5:1). Alles in CSS (geen extra afbeeldingen); lettertypen per tijdperk blijven uit themes/periods.ts. Polaroid: lichte rand en schaduw, kantelhoek maximaal 1 graad; kettingpapier: perforatiegaatjes via radial-gradient en een zachte groenige papiertint; venster: titelbalk met drie neutrale stippen (decoratief, aria-hidden) en een dunne rand; glas: afgeronde hoeken 12 px, achtergrond met zachte blur en dunne lichte rand.
4. Toegankelijkheid: kaders zijn decoratief (aria-hidden of role="presentation"), alt-tekst blijft op het beeld, focusvolgorde ongewijzigd, werkt met 200% zoom en Leesbaar lettertype; prefers-reduced-motion: geen animatie, anders een fade-in van maximaal 500 ms. Op smalle schermen (onder 900 px) kaders vereenvoudigen (geen kanteling, geen perforatie) en het beeld boven de tekst.
5. Tests: (a) elke aflevering heeft `introLook` met kader, tint, kicker en onderschrift; (b) IntroPhase rendert per aflevering de juiste kaderklasse; (c) A4 rendert zoals voorheen; (d) een ontbrekend beeld toont de plaatsaanduiding in het kader; (e) kaders hebben aria-hidden; (f) alle bestaande tests groen.
6. Controle: bekijk vijf introschermen op 360, 768 en 1920 px (Playwright of handmatig) en meld overloop of onleesbare tekst. Werk docs/BEELDEN-CHECK.md (I2, I3, I5: beeld nog te maken tot geplaatst), docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij. Draai npm test en npm run build. Meld kort: wat is aangepast, aantal tests groen, afwijkingen.

## Bronnen

World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/
