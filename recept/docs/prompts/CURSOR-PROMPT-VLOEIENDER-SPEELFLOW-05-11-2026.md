# Recept – Cursor-prompt vloeiendere speelflow aflevering 1 (5 november 2026)

Aanleiding: Richard speelde aflevering 1 en meldt (a) te vaak klikken op Verder/Vervolg, (b) het blijft ergens hangen, (c) het moet vloeiender. Gevonden in de code: de cold open vraagt per regel een klik (aflevering 1 ronde 1: 8 klikken, ronde 2: 5), de tekst "Stap 1 van 4. Tik op Verder…" is generiek en misleidend, en na de cold open staat "beslistijd van tien minuten" terwijl aflevering 1 mogelijk geen timer heeft.

## Ontwerpbesluiten
1. De cold open speelt automatisch af, regel voor regel, met een leestijd per regel (ongeveer 1,5 seconde plus 55 ms per teken, minimaal 2,5 en maximaal 7 seconden).
2. De speler kan elk moment sneller: klik of tik ergens op het scherm, of toets Spatie of Enter = naar de volgende regel; Overslaan blijft staan.
3. Toegankelijkheid: een Pauze/Verder-knop voor de automatische weergave (WCAG 2.2.2), toetsenbordbediening, aria-live voor de regel, en bij de instelling "verminderde beweging" (prefers-reduced-motion) géén automatische doorloop (handmatig doorklikken).
4. Het aantal verplichte klikken in aflevering 1 gaat van circa 12 naar 3: Intro "Verder", "Speel de trailer" (nodig om geluid te ontgrendelen) en "Start het MT-overleg" (bewust moment voor het team).
5. De trailer loopt na afloop automatisch door naar de cold open; de cold open loopt automatisch door naar de laatste regel met de knop "Start het MT-overleg".

## Cursor-prompt

Taak: speelflow aflevering 1 vloeiender maken en de hapering vinden en verhelpen. Taal NL. Geen deploy. Commit niet zelf. A4 (demo) en golden-referenties ongewijzigd; alle bestaande tests blijven groen. Werk in de map recept/.

1. Hapering onderzoeken. Doorloop de volledige flow van aflevering 1 (Intro, Trailer, Cold open, Onderzoek, Besluit, Uitkomst, Tussen, ronde 2, Slotfilm, Voorspel/Pauze, Nabespreking) met een script of test (Vitest met de reducer, of Playwright als dat beschikbaar is) en log elke faseovergang. Zoek fasen zonder uitgang (geen actie die verder gaat), films die niet eindigen (PLAY_FILM zonder TRAILER_DONE of einde), en acties die in aflevering 1 niets doen. Schrijf bevindingen in docs/STAP-FLOW-ONDERZOEK.md en los gevonden blokkades op. Meld exact waar het hing.
2. Cold open automatisch (src/screens/phases/ColdPhase.tsx): implementeer ontwerpbesluit 1, 2, 3 en 5. Leestijd per regel als pure functie (testbaar) in src/lib of data. Toon een subtiele voortgangsbalk of puntjes. Pauzeer de timer als het tabblad niet zichtbaar is.
3. Teksten rechtzetten: vervang de generieke regel "Stap 1 van 4…" door een regel die klopt per fase en aflevering (bijv. "Kijk de scène. Klik om sneller door te gaan."), en toon "beslistijd van tien minuten" alleen als aflevering een timer heeft (leid af uit het register of de state, niet uit een if op episode === 4). Controleer dat de tekst in aflevering 1 klopt.
4. Aantal klikken: loop de overige fasen van aflevering 1 na (IntroPhase, TussenPhase, UitkomstPhase, VoorspelPhase, PauzePhase) en verwijder tussenliggende "Verder"-schermen die geen keuze of leesmoment bevatten; combineer waar kan, zonder leesmomenten of dilemma's te raken. Noteer in docs/STAP-FLOW-ONDERZOEK.md per fase de klikken vóór en na.
5. Tests: (a) leestijdfunctie (min, max, lineair); (b) cold open loopt via een gesimuleerde klok door alle regels naar de laatste regel; (c) klik/Spatie springt naar de volgende regel; (d) Pauze stopt de doorloop; (e) bij prefers-reduced-motion geen automatische doorloop; (f) aflevering 1: maximaal 3 verplichte klikken van Intro tot Start MT-overleg (reducer-test); (g) A4 ongewijzigd. Alle bestaande tests blijven groen.
6. Docs: werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij.
7. npm test en npm run build. Meld kort: waar het hing en hoe het is opgelost, klikken vóór en na, aantal tests groen, afwijkingen.

## Bronnen

World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/
