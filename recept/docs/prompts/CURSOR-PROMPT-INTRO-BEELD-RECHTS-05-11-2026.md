# Recept – introscherm met beeld rechts (5 november 2026)

Besluit Richard (5 november 2026): op het introscherm (Aflevering 1 / 1984, "Alles met de hand") staat rechts naast de tekst een mooi beeld: een woonhuis in Berkel-Enschot met een schuur ernaast. Dezelfde indeling geldt voor alle afleveringen; elk tijdperk krijgt zijn eigen introbeeld (codes I1 tot en met I5).

## Beeldbrief voor Richard (Adobe Firefly)

Bestand: `public/beelden/I1.jpg` (liggend 3:2, 1800 × 1200 px, maximaal 250 kB; JPG of WebP). Het beeld mag een rechterkolom van ongeveer 40% van de breedte vullen en wordt bijgesneden (`object-fit: cover`), dus houd het onderwerp in het midden.

Engelse prompt (Firefly, fotorealistisch, zonder tekst):

> Photorealistic photograph, late autumn dusk in 1984, a modest detached brick family house in a Dutch village near Tilburg in North Brabant, red-brown bricks, a tiled pitched roof, small front garden with a wooden gate, warm yellow light in one window, a weathered wooden barn standing right next to the house with its big door slightly open and a faint warm glow inside, a bicycle leaning against the fence, a small red Renault 5 parked in front of the barn, soft mist, long shadows, muted film colours, slightly grainy 35mm film look, cinematic composition, wide shot, no people, no text, no signs, no logos

Controleer na het maken: geen leesbare tekst of logo's, geen herkenbare personen, een huis en een schuur duidelijk naast elkaar, de rode Renault 5 zichtbaar maar niet dominant (rode draad door de serie; zie docs/TIJDGEEST.md). Noem het bestand `I1.jpg`. Ontbreekt het bestand, dan toont het spel een sfeervolle plaatsaanduiding "BEELD I1 VOLGT".

## Cursor-prompt

Taak: introscherm met beeld rechts. Taal NL. Geen deploy. Commit niet zelf. Engine, rounds, golden-referenties en alle andere fasen blijven ongewijzigd; alle bestaande tests blijven groen. Werk in de map recept/.

1. Lees src/screens/phases/IntroPhase.tsx, src/components/SceneBackground.tsx, data/sceneCodes.ts (INTRO_SCENE) en de intro-CSS in src/styles/recept.css. Beschrijf kort in docs/DESIGNGIDS.md hoe het introscherm nu is opgebouwd.
2. Indeling vanaf 900 px breed: twee kolommen. Links de bestaande tekst (kicker "Aflevering 1 / 1984", titel, Geschiedenis, Uitdagingen, knop) met een maximale leesbreedte van ongeveer 60ch; rechts een gekaderd beeld (INTRO_SCENE[episode].fileCode) dat meescrolt (sticky, bovenkant 24 px) en over de volledige hoogte van het scherm past (maximaal 80vh), met afgeronde hoeken van 4 px, een dunne rand in --line, een zachte donkere verloop aan de onderrand en een subtiele onderschrift in data-lettertype, hoofdletters, klein: "BERKEL-ENSCHOT, 1984" (per aflevering uit het register: plaats en jaar; voeg een veld `introBeeldTekst` toe aan EPISODE_CONTENT of gebruik de bestaande plaats- en jaargegevens). Onder 900 px: het beeld boven de tekst, maximaal 40vh.
3. Beeld: `<img>` met `loading="eager"`, `decoding="async"`, vaste beeldverhouding 3:2 via `aspect-ratio` (geen verspringende lay-out), `alt` = korte beschrijving per aflevering uit het register (A1: "Woonhuis met een schuur ernaast in Berkel-Enschot, schemering in 1984"; schrijf passende alt-teksten voor A2, A3, A4 en A5). Ontbreekt het bestand (onerror), toon de bestaande sfeervolle plaatsaanduiding "BEELD I1 VOLGT" in dezelfde afmeting.
4. Gebruik voor A4 het bestaande intro-beeld (T4) in dezelfde indeling; A4 blijft verder ongewijzigd (demo, golden). Als de rechterkolom daar het uiterlijk van de demo verandert, zet de nieuwe indeling voor A4 achter de vlag `introBeeldRechts` (standaard uit voor A4, aan voor A1, A2, A3 en A5) in EPISODE_CONTENT.
5. Toegankelijkheid en prestaties: logische focusvolgorde (tekst, knop; beeld is geen focuspunt), alt-tekst aanwezig, contrast onderschrift 4,5:1, werkt bij 200% zoom en met "Leesbaar lettertype", `prefers-reduced-motion`: geen animatie, anders een zachte fade-in van maximaal 500 ms. Het beeld laadt alleen in de introfase van die aflevering.
6. Tests: (a) elke aflevering heeft een introbeeld-code en alt-tekst in het register; (b) IntroPhase rendert voor A1 de tekst en het beeld (met alt); (c) bij een ontbrekend bestand verschijnt de plaatsaanduiding; (d) A4 met vlag uit rendert zoals voorheen; (e) alle bestaande tests groen.
7. Controleer visueel op 360, 768 en 1920 px breed en meld overloop of onleesbare tekst.
8. Docs: werk docs/BEELDEN-CHECK.md (I1: beeld nog te maken, brief hierboven), docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij. Draai npm test en npm run build. Meld kort: wat is aangepast, aantal tests groen, afwijkingen.

## Bronnen

World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/
