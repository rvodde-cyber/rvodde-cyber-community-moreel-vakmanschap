# Recept – Cursor-prompt introteksten rechtzetten en landingspagina lichter (5 november 2026)

Aanleiding: Richard bekeek de online demo (recept-k8m3n7p2.netlify.app). Op het introscherm van aflevering 1 staat nog de tekst van het conceptskelet ("Dit is een conceptskelet: de uitkomst is nog niet gekoppeld aan de volledige spelmotor" en "Budget deze ronde: € 0,00 mln."), terwijl aflevering 1 nu de interventiemodus met budgetpunten gebruikt. De landingspagina is donkerder dan de poster.

## Cursor-prompt

Taak: (1) de introteksten rechtzetten zodat ze per aflevering en per motor kloppen en (2) de donkere laag op de landingspagina verlichten. Taal NL. Geen deploy. Commit niet zelf. Engine, rounds, golden-referenties en de inhoud van A4 (demo) blijven ongewijzigd; alle bestaande tests (167) blijven groen. Werk in de map recept/.

1. Onderzoek: lees src/screens/phases/IntroPhase.tsx (de vakken JULLIE OPDRACHT en de regel "Budget deze ronde: {mln(...)}"), data/episodes/content.ts (motorKind, usesDemoBudget, showsSkeletLabel in data/episodes/motor.ts) en data/episodes/a1Rounds.ts met data/interventies/vertaaltabel.ts (BUDGET_PER_RONDE_A1, budgetVoorRonde). Zoek in src/ en data/ naar alle plekken waar teksten over "conceptskelet", "€ ... mln" of "tien minuten" worden getoond, en maak een lijst per aflevering en ronde van wat de speler nu te zien krijgt (docs/STAP-FLOW-ONDERZOEK.md, hoofdstuk "Introteksten").

2. Teksten per motor, afgeleid uit het register (geen `if episode === 4` in de component):
- Motor 'interventie' (A1): geen conceptskelet-zin en geen bedrag in miljoenen. Opdrachtvak: "Jullie vormen samen het managementteam. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies en verdelen jullie de budgetpunten. Jullie budget deze ronde: {budgetVoorRonde(ronde)} punten." Gebruik de bestaande functie voor de budgetpunten (8 in ronde 1, 9 in ronde 2), nooit een hard getal in de tekst.
- Motor 'a4' (demo): teksten en bedragen in miljoenen ongewijzigd.
- Motor 'skeleton' (A2, A3, A5): de conceptskelet-zin blijft, maar zonder het misleidende bedrag "€ 0,00 mln.". Tekst: "Dit is een eerste opzet: de uitkomst is nog niet gekoppeld aan de volledige spelmotor." Toon geen budgetregel zolang er voor die aflevering geen budget is.
- De tijdsaanduiding "ongeveer tien minuten" alleen tonen als de aflevering een timer heeft (leid af uit het register of de state); anders: "Neem de tijd om samen te kiezen."
- Controleer ook de tweede ronde-teksten (carry-vak in IntroPhase) en de pauze- en tussenkaarten op dezelfde fouten.

3. Landingspagina lichter: in src/styles/recept.css de klasse .landing-overlay. Verlicht het verloop zodat de man en de robotarmen beter zichtbaar zijn, bijvoorbeeld linear-gradient(180deg, rgba(12, 22, 32, 0.45) 0%, rgba(6, 10, 14, 0.78) 50%, var(--bg) 100%). Houd de leesbaarheid van de tekst op minimaal 4,5:1 (voeg waar nodig een lichte tekstschaduw of een subtiel donker verloop achter de tekstkolom toe, geen donkere laag over het hele beeld). Controleer de dataregel en de kaarten op leesbaarheid.

4. Tests: (a) voor A1 bevat het introscherm niet de tekst "conceptskelet" en niet "mln", wel "budgetpunten" met het getal uit budgetVoorRonde; (b) voor A2, A3 en A5 verschijnt de aangepaste skelet-zin zonder "€ 0,00"; (c) A4 toont ongewijzigd de teksten in miljoenen (snapshot of gerichte test); (d) de tijdsaanduiding "tien minuten" verschijnt alleen bij een aflevering met timer; (e) alle bestaande tests groen.

5. Controle en oplevering: bekijk het introscherm van alle vijf afleveringen (ronde 1 en 2) en de landingspagina op 360, 768 en 1920 px en meld teksten die nog niet kloppen. Werk docs/VOORTGANG.md en docs/OPEN-VRAGEN.md bij. Draai npm test en npm run build. Meld kort: wat is aangepast, aantal tests groen, afwijkingen.

## Bronnen

World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/
