# Recept – Cursor-prompt landingspagina en introscherm (5 november 2026)

Besluit Richard (5 november 2026): (a) de landingspagina krijgt de filmische look van de Recept-poster; (b) het introscherm van elke aflevering krijgt rechts naast de tekst een beeld (A1: een woonhuis met een schuur ernaast in Berkel-Enschot). Dit is één opdracht met twee onderdelen.

## Cursor-prompt

Taak: landingspagina (HomeScreen) restylen in de look van de poster en het introscherm (IntroPhase) met een beeld rechts. Taal NL. Geen deploy. Commit niet zelf. Gedrag blijft gelijk: voornaam, START_EPISODE, hasSave en Doorgaan, HelpLinks, de aflevering-kiezer en `showsSkeletLabel`. Engine, rounds, golden-referenties en alle andere fasen blijven ongewijzigd; alle bestaande tests (152) blijven groen. Het uiterlijk van A4 (demo) blijft zoals het is: nieuwe indelingen voor A4 staan achter een vlag in EPISODE_CONTENT die voor A4 uit staat. Werk in de map recept/.

### 0. Verkenning (eenmalig)
Lees src/screens/HomeScreen.tsx, src/screens/phases/IntroPhase.tsx, src/components/SceneBackground.tsx, data/sceneCodes.ts (INTRO_SCENE), data/episodes/content.ts, src/App.tsx, themes/periods.ts, de lettertype-loader (loadPeriodFonts.ts) en de klassen `.setup`, `.setup-in`, `.ep-picker`, `.btn`, `.kick`, `.ep` en de intro-CSS in src/styles/recept.css. Beschrijf kort in docs/DESIGNGIDS.md (nieuwe hoofdstukken "Landingspagina" en "Introscherm") hoe beide schermen nu zijn opgebouwd en hoe ze straks zijn.

### 1. Lettertypen (voor beide onderdelen)
Serif = Instrument Serif (normal en italic); data en labels = Chakra Petch (400 en 500). Self-hosted via Fontsource (`@fontsource/instrument-serif`, `@fontsource/chakra-petch`), alleen subset latin en alleen deze gewichten; controleer de licentie (OFL) en noteer die met bron in docs/TYPOGRAFIE.md. Geen externe fontverzoeken (controleer de build op fonts.googleapis.com en fonts.gstatic.com). Laad ze via de bestaande lazy-loader. Fallbacks blijven de bestaande stacks (--serif, --data). De schakelaar "Leesbaar lettertype" werkt ook op deze schermen. Voeg het token `--cream: #F1EBE0` toe aan src/styles/recept.css; gebruik verder de bestaande tokens (--bg, --panel, --ink, --soft, --cyan, --amber, --gold, --line).

### 2. Landingspagina (HomeScreen) in de look van de poster
Gebruik nieuwe klassen met prefix `landing-` zodat andere schermen niet breken.
- **Achtergrond:** `public/beelden/MENU.jpg` (de man met de robotarmen) full-bleed, `object-fit: cover`, `object-position` ongeveer 70% 40%, met een donkere verloopoverlay: lichte donkerblauwe tint bovenin, bijna zwart (--bg) onderin. Decoratief (CSS-achtergrond, geen alt). Laad het beeld alleen op het startscherm; donkere achtergrondkleur als vangnet als het beeld ontbreekt.
- **Kicker:** hoofdletters, klein, letterafstand ongeveer 0,28em, kleur --soft: "EEN HR-DRAMA IN VIJF AFLEVERINGEN".
- **Titel (enige h1):** "RECEPT" zeer groot (clamp ongeveer 64 tot 168 px), Instrument Serif, letterafstand ongeveer 0,12em, kleur --cream, lichte tekstschaduw.
- **Ondertitel:** cursieve serif in --cream: "Van Gorp Drones". Eronder in serif: "Een krokettenfabriek. Vijf tijdperken. Jullie beslissen." en een gouden cursieve regel (--gold): "Het MT vergadert. Jullie beslissen."
- **Dataregel:** dunne band met twee lijnen en vier chips in het data-lettertype, hoofdletters, klein: "▲ VERZUIM 8,0%", "● ORDER DFN-2231", "▲ NORM STATION 14 +5%", "● PILOT-ADVIES"; driehoeken --amber, bolletjes --cyan. Puur decoratie: `aria-hidden="true"`.
- **Onderdeel "Speel mee":** links het formulier (voornaam van de zus, maximaal 12 tekens; bestaande logica en validatie behouden), rechts de aflevering-kiezer onder de kop "Kies je aflevering". Drie korte feiten met vierkante bullets (cyaan, de laatste amber): "In teams van vier", "Ongeveer een uur", "Zet het geluid aan".
- **Aflevering-kiezer:** vijf kaarten in een rij (smal scherm: onder elkaar): nummer, jaartal in het data-lettertype, titel in serif, label "Speelbaar" (A1 en A4) of "Skelet" (A2, A3 en A5 via `showsSkeletLabel`). Dunne gouden rand bij focus en hover; uitgeschakeld (`disabled`, gedimd) zolang de voornaam korter is dan 2 tekens.
- **Voettekst:** klein, hoofdletters, --soft: "VAN GORP DRONES / VOSSENBERG, TILBURG / 2026", plus de bestaande HelpLinks.
- **Toegankelijkheid en responsief:** één h1; logische focusvolgorde; zichtbare focusring; contrast minimaal 4,5:1 voor tekst op het beeld; werkt bij 200% zoom; werkt op 360, 768 en 1920 px; bij `prefers-reduced-motion` geen animatie, anders een zachte fade-in van maximaal 600 ms.

### 3. Introscherm (IntroPhase) met beeld rechts
- **Indeling vanaf 900 px breed:** twee kolommen. Links de bestaande tekst (kicker "Aflevering 1 / 1984", titel, Geschiedenis, Uitdagingen, knop) met een leesbreedte van ongeveer 60ch; rechts een gekaderd beeld (`INTRO_SCENE[episode].fileCode`, voor A1 `I1`) dat meescrolt (sticky, 24 px van de bovenkant), maximaal 80vh hoog, afgeronde hoeken 4 px, dunne rand in --line, een zachte donkere verloop aan de onderrand en een onderschrift in het data-lettertype, hoofdletters, klein: "BERKEL-ENSCHOT, 1984" (per aflevering plaats en jaar uit het register; voeg een veld `introBeeldTekst` toe aan EPISODE_CONTENT). Onder 900 px: beeld boven de tekst, maximaal 40vh.
- **Beeld:** `<img>` met `loading="eager"`, `decoding="async"`, vaste beeldverhouding 3:2 via `aspect-ratio` (geen verspringende lay-out), `alt` per aflevering uit het register (A1: "Woonhuis met een schuur ernaast in Berkel-Enschot, schemering in 1984"; schrijf passende alt-teksten voor A2, A3, A4 en A5). Ontbreekt het bestand (onerror), toon de bestaande plaatsaanduiding "BEELD I1 VOLGT" in dezelfde afmeting.
- **A4:** gebruikt het bestaande intro-beeld (T4); de nieuwe indeling staat voor A4 achter de vlag `introBeeldRechts` (uit voor A4, aan voor A1, A2, A3 en A5), zodat de demo ongewijzigd blijft.
- **Toegankelijkheid en prestaties:** logische focusvolgorde (tekst, knop; beeld is geen focuspunt); contrast onderschrift 4,5:1; werkt bij 200% zoom en met Leesbaar lettertype; bij `prefers-reduced-motion` geen animatie, anders een fade-in van maximaal 500 ms; het beeld laadt alleen in de introfase van die aflevering.

### 4. Tests
(a) HomeScreen toont de h1 "RECEPT" en vijf afleverkaarten; (b) knoppen uitgeschakeld bij een voornaam korter dan 2 tekens en actief daarna; (c) klikken op een kaart dispatcht SET_NAME en START_EPISODE met de juiste aflevering; (d) label "Skelet" bij A2, A3 en A5, niet bij A1 en A4; (e) de dataregel is `aria-hidden`; (f) elke aflevering heeft een introbeeld-code, alt-tekst en `introBeeldTekst` in het register; (g) IntroPhase rendert voor A1 de tekst en het beeld met alt; (h) bij een ontbrekend bestand verschijnt de plaatsaanduiding; (i) A4 met vlag uit rendert zoals voorheen; (j) geen verwijzingen naar externe fontdomeinen in src/, themes/ en de build-uitvoer; (k) alle bestaande tests groen.

### 5. Controle, docs en oplevering
Controleer beide schermen visueel (Playwright of handmatig) op 360, 768 en 1920 px en meld overloop of onleesbare tekst. Werk docs/BEELDEN-CHECK.md (I1: beeld nog te maken; Firefly-brief staat in docs/prompts/CURSOR-PROMPT-INTRO-BEELD-RECHTS-05-11-2026.md), docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij (open: Richard beoordeelt landingspagina en introscherm). Draai npm test en npm run build. Meld kort: wat is aangepast, gebruikte lettertypen en licenties, aantal tests groen, afwijkingen.

## Bronnen

World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/
