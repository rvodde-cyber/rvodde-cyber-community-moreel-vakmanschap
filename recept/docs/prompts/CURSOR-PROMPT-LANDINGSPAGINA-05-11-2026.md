# Recept – Cursor-prompt landingspagina in de look van de poster (5 november 2026)

Besluit Richard (5 november 2026): de landingspagina (HomeScreen) krijgt dezelfde filmische look als de Recept-poster (`recept-demo-poster.png` in het project): volledig beeld met de man in de fabriek (MENU.jpg), grote serif-titel RECEPT met brede letterafstand, cursieve ondertitel, gouden accent, dataregel met statuschips en een rustige, donkere afronding onderaan. De functies van de pagina (voornaam invullen, aflevering kiezen, doorgaan, hulplinks) blijven bestaan.

## Ontwerpspecificatie (naar de poster)
- **Achtergrond:** `public/beelden/MENU.jpg` (de man met de robotarmen) als full-bleed achtergrond, `object-fit: cover`, met een donkere verloopoverlay: lichte donkerblauwe tint bovenin, bijna zwart (--bg #060A0E) onderin zodat tekst leesbaar blijft (contrast minimaal 4,5:1).
- **Kicker:** bovenin, hoofdletters, ruime letterafstand (ongeveer 0,28em), klein, kleur --soft: "EEN HR-DRAMA IN VIJF AFLEVERINGEN".
- **Titel:** "RECEPT" zeer groot (clamp ongeveer 64 tot 168 px), serif Instrument Serif, ruime letterafstand (ongeveer 0,12em), kleur crème (#F1EBE0), licht schaduweffect voor leesbaarheid.
- **Ondertitel:** cursieve serif in crème: "Van Gorp Drones". Eronder een korte pakkende regel in serif (gebruik: "Een worstenbroodjesfabriek. Vijf tijdperken. Jullie beslissen.") en de gouden cursieve regel (kleur --gold #D9B36A): "Het MT vergadert. Jullie beslissen."
- **Dataregel:** een dunne band met twee lijnen en vier chips (data-lettertype, hoofdletters, klein): "▲ VERZUIM 8,0%", "● ORDER DFN-2231", "▲ NORM STATION 14 +5%", "● PILOT-ADVIES"; driehoeken amber (--amber), bolletjes cyaan (--cyan). Puur decoratie: `aria-hidden="true"`.
- **Onderdeel "Speel mee":** onderaan op het donkere vlak, links het formulier (voornaam van de zus, maximaal 12 tekens; behoud de bestaande logica en validatie), rechts de aflevering-kiezer. Titel in serif "Scan en speel" is niet nodig (geen QR); gebruik "Kies je aflevering". Drie korte feiten met vierkante bullets (cyaan, de laatste amber): "In teams van vier", "Ongeveer een uur", "Zet het geluid aan".
- **Aflevering-kiezer:** vijf kaarten in een rij (op smal scherm onder elkaar of horizontaal scrollbaar): nummer, jaartal in data-lettertype, titel in serif, en een label ("Speelbaar" voor A1 en A4; "Skelet" voor A2, A3 en A5 via `showsSkeletLabel`). Kaarten met een dunne gouden rand bij focus en hover; uitgeschakeld (gedimd, `disabled`) zolang de voornaam korter is dan 2 tekens, zoals nu.
- **Voettekst:** klein, hoofdletters, --soft: "VAN GORP DRONES / VOSSENBERG, TILBURG / 2026", plus de bestaande hulplinks (HelpLinks).
- **Lettertypen:** serif = Instrument Serif (normal en italic); data en labels = Chakra Petch (400 en 500). Self-hosted via Fontsource (`@fontsource/instrument-serif`, `@fontsource/chakra-petch`), alleen subset latin en alleen deze gewichten; controleer de licentie (OFL) en noteer die in docs/TYPOGRAFIE.md. Geen externe fontverzoeken. Laad ze alleen op het startscherm of via de bestaande lazy-loader. Fallbacks blijven de bestaande stacks (--serif, --data). De schakelaar "Leesbaar lettertype" werkt ook hier (display wordt dan sans).
- **Kleuren:** gebruik de bestaande tokens uit src/styles/recept.css (--bg, --panel, --ink, --soft, --cyan, --amber, --gold); crème #F1EBE0 voor de titel is nieuw (voeg als --cream toe).
- **Toegankelijkheid:** achtergrondbeeld is decoratief (`role="presentation"`/CSS-achtergrond, geen alt nodig); één `h1` (RECEPT); logische focusvolgorde; zichtbare focusring; contrast 4,5:1 voor tekst op het beeld; werkt met 200% zoom; `prefers-reduced-motion`: geen animatie; anders een zeer zachte fade-in van titel en kaarten (maximaal 600 ms).
- **Responsief:** telefoon (360 px), tablet en beamer (1920 px). Op smal scherm de titel kleiner, de kiezer onder het formulier, het beeld gecentreerd op de man (`object-position` ongeveer 70% 40%). Een gewicht onder 250 kB extra; MENU.jpg alleen op het startscherm laden (niet in de rest van het spel).

## Cursor-prompt

Taak: landingspagina (src/screens/HomeScreen.tsx en bijbehorende CSS) restylen volgens de ontwerpspecificatie hierboven. Taal NL. Geen deploy. Commit niet zelf. Gedrag blijft gelijk: voornaam, START_EPISODE, hasSave/Doorgaan, HelpLinks, de aflevering-kiezer en `showsSkeletLabel`. Engine, rounds, golden-referenties en alle andere fasen blijven ongewijzigd; alle bestaande tests (152) blijven groen. Werk in de map recept/.

1. Lees HomeScreen.tsx, de klassen `.setup`, `.setup-in`, `.ep-picker`, `.btn`, `.kick`, `.ep` in src/styles/recept.css, src/App.tsx, themes/periods.ts en de lettertype-loader (loadPeriodFonts.ts). Beschrijf kort in docs/DESIGNGIDS.md (nieuw hoofdstuk "Landingspagina") hoe de opbouw is.
2. Installeer en importeer de lettertypen (zie specificatie), gecontroleerd op licentie en uitsluitend latin; werk docs/TYPOGRAFIE.md bij.
3. Bouw de nieuwe opbouw: hero met achtergrondbeeld en overlay, kicker, titel, ondertitelregels, dataregel, onderdeel "Speel mee" met formulier en aflevering-kaarten, voettekst. Gebruik nieuwe klassen met prefix `landing-` zodat bestaande stijlen voor andere schermen niet breken.
4. Zorg dat het beeld alleen op het startscherm laadt (CSS-achtergrond of `<img loading="eager">` binnen HomeScreen; niet in de globale CSS), met een donkere achtergrondkleur als vangnet als het beeld ontbreekt.
5. Tests: (a) HomeScreen toont de h1 "RECEPT" en vijf afleverkaarten; (b) knoppen zijn uitgeschakeld bij een voornaam korter dan 2 tekens en actief daarna; (c) klikken op een kaart dispatcht SET_NAME en START_EPISODE met de juiste aflevering; (d) label "Skelet" bij A2, A3 en A5 en niet bij A1 en A4; (e) de dataregel is `aria-hidden`; (f) geen verwijzingen naar externe fontdomeinen; (g) alle bestaande tests groen.
5b. Controleer visueel (Playwright of handmatig) op 360, 768 en 1920 px breed en meld eventuele overloop of onleesbare tekst.
6. Docs: werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij (open: Richard beoordeelt de landingspagina naast de poster).
7. Draai npm test en npm run build. Meld kort: wat is aangepast, gebruikte lettertypen en licenties, aantal tests groen, afwijkingen.

## Bronnen

World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/
