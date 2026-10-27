

# De Dronefabriek – Spelmotor
 · 
De spelmotor berekent elke uitkomst uit oorzaken: interventies veranderen drijvers (werkeisen, hulpbronnen, AMO, vertrouwen), en de meters volgen uit vaste rekenregels die rechtstreeks uit JD-R, AMO, HPWS, Greiner en het betrokkenheidsonderzoek van Gallup komen. Zo is elk resultaat voor deelnemers te herleiden tot een keten van keuze, oorzaak, mechanisme en gevolg. De drijvers zijn in ronde 1 en 2 verborgen en worden vanaf ronde 3 zichtbaar.

## Architectuur
Interventies werken nooit rechtstreeks op de meters. Ze veranderen drijvers, en de meters worden elke ronde opnieuw uit die drijvers berekend.

| Laag
 | Inhoud
 | Zichtbaar voor deelnemers
 | 
| 1. Interventies
 | Twee interventies per ronde, met labels: welke drijvers ze veranderen, welk AMO-domein ze raken, hun Greiner-passing per ronde, kosten en rechtvaardigheidseffect
 | Ja; de labels pas na de keuze
 | 
| 2. Drijvers
 | De werkelijke toestand van de fabriek: werkeisen, hulpbronnen, AMO, vertrouwen, fase
 | Ronde 1–2 alleen als signalen uit onderzoeksacties; vanaf ronde 3 als diagnosepaneel
 | 
| 3. Meters
 | Productiviteit, winst, reputatie, welzijn, betrokkenheid, vertrouwen; verborgen: eerlijkheid en menselijke maat
 | Zes meters ja; de twee verborgen meters in de nabespreking
 | De motor rekent deterministisch: dezelfde keuzes geven altijd dezelfde uitkomst. Gebeurtenissen zoals de defensieorder zijn vaste verhaalpunten, geen toeval. Alle gewichten, labels en startwaarden staan in één databestand, los van de code.

## Drijvers en startwaarden
Alle drijvers lopen van 0 tot 100. De startwaarden geven het beeld van ronde 1: hoog tempo en veel algoritmische controle, weinig regelruimte en erkenning.

| Drijver
 | Groep
 | Gewicht
 | Start ronde 1
 | Toelichting
 | 
| Tempo
 | Hindernis-eis
 | 0,30
 | 80
 | TEMPO verhoogt dit elke ronde met 5, tenzij een interventie de norm begrenst
 | 
| Algoritmische controle
 | Hindernis-eis
 | 0,20
 | 70
 | Monitoring en sturing door TEMPO en PILOT
 | 
| Rolonduidelijkheid
 | Hindernis-eis
 | 0,15
 | 55
 | Niemand weet wat TEMPO morgen vraagt
 | 
| Bureaucratie
 | Hindernis-eis
 | 0,15
 | 30
 | Stijgt in ronde 4 door de controlecrisis
 | 
| Morele eisen
 | Hindernis-eis
 | 0,20
 | 15
 | Stijgt sterk met de defensieorder vanaf ronde 3
 | 
| Nieuwe techniek leren
 | Uitdagende eis
 | 0,50
 | 60
 | Nieuwe dronemodellen en AI-systemen
 | 
| Verantwoordelijkheid
 | Uitdagende eis
 | 0,50
 | 40
 | Eigenaarschap over kwaliteit en planning
 | 
| Regelruimte
 | Hulpbron
 | 0,20
 | 30
 | Zeggenschap over tempo, volgorde en taakroulatie
 | 
| Steun leidinggevende
 | Hulpbron
 | 0,20
 | 40
 | Ploegleiders sturen via het dashboard
 | 
| Steun collega's
 | Hulpbron
 | 0,10
 | 55
 | Oude krokettenploeg houdt elkaar nog vast
 | 
| Betekenis
 | Hulpbron
 | 0,15
 | 35
 | Medewerkers zien niet meer waar hun werk voor dient
 | 
| Ontwikkeling
 | Hulpbron
 | 0,10
 | 40
 | Scholing voor drone-assemblage is beperkt
 | 
| Erkenning
 | Hulpbron
 | 0,15
 | 30
 | Alleen de ranglijst van TEMPO telt
 | 
| Middelen en informatie
 | Hulpbron
 | 0,10
 | 40
 | TEMPO geeft opdrachten zonder uitleg
 | 
| Vaardigheden
 | AMO: A
 | –
 | 60
 | Vakmanschap van de vaste kern
 | 
| Inspraak
 | AMO: O
 | –
 | 30
 | OR en ploegoverleg worden nauwelijks betrokken
 | Daaruit volgen de startindexen: hindernis-eisen 54, hulpbronnen 37, uitdagende eisen 50. Verzuim start op 8% per ronde, verloop op 7%.

## Rol van de modellen
Elk model heeft één taak in de motor, zodat ze elkaar aanvullen en niet overlappen.

| Model
 | Taak in de motor
 | Regel
 | Wat deelnemers leren
 | 
| JD-R (Bakker & Demerouti, 2017)
 | Mechanisme achter welzijn en betrokkenheid
 | Uitputtingspad: hindernis-eisen drukken welzijn, hulpbronnen bufferen. Motivatiepad: hulpbronnen voeden betrokkenheid. Uitdagende eisen werken positief als hulpbronnen voldoende zijn (Crawford et al., 2010)
 | Een maatregel kan het ene pad raken en het andere niet
 | 
| AMO (Appelbaum et al., 2000; Jiang et al., 2012)
 | Prestatieformule
 | Productiviteit = vaardigheid × motivatie × kansen, als geometrisch gemiddelde: één laag domein trekt het geheel omlaag
 | Kunnen zonder mogen levert weinig op
 | 
| HPWS (Combs et al., 2006; MacDuffie, 1995)
 | Bundellogica over de rondes
 | Synergiebonus bij samenhang over A, M en O; straf bij tegenstrijdige combinaties; prestatiedrukmaatregelen verhogen ook de eisen (Kroon et al., 2009)
 | Losse goede maatregelen zijn nog geen goed systeem
 | 
| Greiner (1972)
 | Timing
 | Per ronde een passingsfactor: passend, neutraal of terugval naar de oplossing van een vorige fase
 | Een goede maatregel moet ook op het goede moment komen
 | 
| Gallup (Harter et al., 2002)
 | Taal en volgorde van betrokkenheid
 | Vier niveaus: basis, eigen bijdrage, erbij horen, groei. Hogere niveaus tellen pas volledig mee als de basis op orde is. De leidinggevende weegt dubbel
 | Betrokkenheid bouw je van onderaf, en de leidinggevende maakt het verschil
 | 
| Bedoeld versus ervaren HR (Wright & Nishii, 2013; Bowen & Ostroff, 2004)
 | Vertrouwen als versterker
 | Het effect van elke interventie wordt vermenigvuldigd met een vertrouwensfactor
 | Dezelfde maatregel werkt minder in een organisatie zonder vertrouwen
 | De Gallup-bouwstenen worden in eigen woorden geformuleerd. De Q12-vragen zelf zijn beschermd en worden niet letterlijk overgenomen.

## Rekenregels
De motor gebruikt tien regels. Elke regel is in één zin aan deelnemers uit te leggen.
1. Doorwerking van een interventie. De verandering van een drijver is de basisverandering van de interventie, vermenigvuldigd met de Greiner-passing (f), de diagnosekwaliteit (q) en de vertrouwensfactor. Per drijver maximaal 25 punten per ronde.
Passing f: passend 1,3; neutraal 1,0; terugval 0,5 plus 10 punten rolonduidelijkheid. Diagnose q: juiste oorzaak gevonden 1,2; deels 1,0; niet 0,8. Bij vertrouwen 50 is de factor 1,0, bij 20 is hij 0,7, bij 80 is hij 1,3.
2. Traagheid. Welzijn, betrokkenheid en vertrouwen hebben elk een doelwaarde en overbruggen per ronde de helft van de afstand daarheen. Mensen veranderen niet in één klap.
3. Uitputtingspad (welzijn). Het doel volgt uit het verschil tussen hulpbronnen (R) en hindernis-eisen (E).
4. Motivatiepad (betrokkenheid). Het doel volgt uit de vier Gallup-niveaus. Basis = gemiddelde van (100 − rolonduidelijkheid) en middelen en informatie. Eigen bijdrage = (2 × steun leidinggevende + erkenning) / 3. Erbij horen = gemiddelde van regelruimte, betekenis en steun collega's. Groei = ontwikkeling. De poortfactor g = min(1; basis / 50). Uitdagende eisen (U) tellen positief als R ≥ 50 en negatief als R < 50; hindernis-eisen remmen.
De meter toont ook de verdeling: actief niet-betrokken = max(3%; 45 − 0,5 × B); betrokken = max(5%; B − 25); de rest is niet betrokken. Bij de start is dat 13% betrokken, 26% actief niet-betrokken en 61% niet betrokken.
5. Prestatie (AMO). Vaardigheid A is de drijver vaardigheden; motivatie M = gemiddelde van betrokkenheid en eerlijkheid; kansen O = gemiddelde van regelruimte en inspraak. Capaciteit K = 1 − verzuim − vacatures. Tempofactor T = 0,8 + 0,4 × tempo / 100. Veranderingen in A, M en O werken één ronde later door; tempo werkt direct. De constante k zet de startwaarde op 68.
6. Vertraagde gevolgen. Verzuim volgende ronde = 3% + 0,25% × (70 − welzijn). Verloop volgende ronde = 2% + 0,2% × (60 − betrokkenheid) + 0,1% × (60 − vertrouwen); voor engineers × 1,5 vanwege de krappe arbeidsmarkt. Winst = 50 + 0,6 × (P − 68) − 1 per procentpunt verzuim boven 8 − 2 per procentpunt verloop boven 7 − interventiekosten + orderopbrengst.
7. Vertrouwen en kantelpunten. Vertrouwen stijgt maximaal 5 punten per ronde en daalt tot 15 punten bij een gebroken belofte (Robinson, 1996). Onder welzijn 30 volgt een verzuimgolf (+5% verzuim). Onder betrokkenheid 30 nemen kwaliteitsfouten toe (reputatie −3 per ronde). Reputatie reageert verder op kwaliteit, incidenten en de keuzes rond defensie en zelfverrijking.
8. Twee interventies per ronde. Teams kiezen elke ronde twee interventies. De veranderingen per drijver tellen op, binnen het maximum van 25 punten per drijver. Elke interventie heeft een prijs die uit de begroting komt (kostenpunten × € 50.000; D kost € 250.000, E € 300.000, B levert € 100.000 op). Raken de interventies verschillende AMO-domeinen zonder elkaar tegen te spreken, dan stijgt de productiviteit volgende ronde met 2 extra punten (HPWS-synergie). Spreken ze elkaar tegen, zoals meer controle naast meer regelruimte, dan krijgen medewerkers een dubbel signaal (Bowen & Ostroff, 2004): vertrouwen −5 en de motiverende effecten van beide interventies × 0,75. Tegenstrijdige paren worden per ronde vastgelegd in het databestand; in ronde 1 zijn dat B met D en B met E.
9. Begroting. Het MT verdeelt per ronde € 1,5 miljoen over de interventies en zes begrotingsposten. Marco's voorstel is het vertrekpunt en is al volledig verdeeld, zodat elke interventie eerst een tekort oplevert dat het MT moet wegwerken. Een post werkt via de verschuiving ten opzichte van Marco, met afnemende meeropbrengst: u = √(bedrag / 100.000) − √(Marco / 100.000).

| Post
 | Marco
 | Effect per eenheid u
 | 
| Mensen (opleiding, coaching, vaste krachten)
 | € 200.000
 | Ontwikkeling +4, vaardigheden +2, steun leidinggevende +1,5, steun collega's +1,5, eerlijkheid +1
 | 
| Machines (robotarm en onderhoud)
 | € 200.000
 | Capaciteit +1,5% × (vaardigheden / 60), nieuwe techniek leren +2
 | 
| TEMPO-upgrade (offerte Optivora)
 | € 400.000
 | Tempo +4, algoritmische controle +4, capaciteit +1%, eerlijkheid −2
 | 
| Directie (leaseauto's en hoofdkantoor)
 | € 280.000
 | Reputatie +1, eerlijkheid −3, vertrouwen −2
 | 
| Dividend (familie Van Gorp)
 | € 300.000
 | Geen effect op de werkvloer; bepaalt de stemming in de familie (verhaalstaat)
 | 
| Reserve
 | € 120.000
 | Buffer voor de volgende ronde
 | 10. Resultaat in euro's. Resultaat nu = € 1,8 miljoen + € 45.000 × (productiviteit − 68). Prognose volgende ronde = € 1,8 miljoen + € 45.000 × (productiviteit volgende ronde − 68) − de verandering in verzuim- en verloopkosten ten opzichte van de start. De meter Resultaat = 50 + (resultaat − € 1,8 miljoen) / € 40.000.

## HR-kosten in euro's
De motor rekent verzuim, verloop en lage motivatie om naar euro's per ronde. Een ronde is een halfjaar; de assemblagehal telt 204 productiemedewerkers en 36 engineers. De bedragen zijn bewust afgerond op gangbare Nederlandse schattingen, zodat deelnemers ze kunnen narekenen.

| Kostenpost
 | Rekenregel
 | Onderbouwing
 | Start ronde 1
 | 
| Verzuim
 | Medewerkers × verzuim% × 130 werkdagen × € 300 per dag
 | Schattingen lopen van € 250 tot ruim € 400 per verzuimdag (MKB Servicedesk, z.d.; Robidus, 2025)
 | € 748.800
 | 
| Werving en selectie
 | Per vertrekker € 4.500 (productie) of € 17.500 (engineer, via bureau)
 | Bureaus rekenen doorgaans 20 tot 30% van het jaarsalaris
 | € 130.410
 | 
| Inwerken en productieverlies
 | Per vertrekker € 8.100 (productie) of € 52.500 (engineer)
 | Totale vervanging kost 30 tot 50% van het jaarsalaris voor uitvoerende functies, en meer voor schaarse specialisten
 | € 314.118
 | 
| Lage motivatie
 | Niet-betrokken: 18% van het salaris; actief niet-betrokken: 34%
 | Schatting op basis van Gallup (2020); het percentage voor actief niet-betrokkenen is een gangbare afgeleide schatting
 | € 998.928
 | Verloop per ronde = 2% + 0,2% × (60 − betrokkenheid) + 0,1% × (60 − vertrouwen); voor engineers × 1,5. De kosten van lage motivatie zitten al verborgen in de productiviteit en worden daarom getoond, maar niet nog eens van het resultaat afgetrokken. De prognose van het resultaat voor de volgende ronde telt de verandering in verzuim- en verloopkosten wel mee.
De totale HR-kosten bij de start (€ 2,2 miljoen per halfjaar) zijn hoger dan het hele investeringsbudget van € 1,5 miljoen. Dat is een vast leermoment: wie niet in mensen investeert, betaalt toch, alleen onzichtbaar. In de proefronde met D en E bespaart het MT volgende ronde ruim € 0,5 miljoen aan HR-kosten, ongeveer evenveel als de twee interventies kosten.

## Greiner-passing per ronde
Elke interventie krijgt per ronde een passing. Een terugval is de oplossing van een eerdere fase, die de huidige crisis juist verergert.

| Ronde
 | Crisis
 | Passend (f = 1,3)
 | Terugval (f = 0,5)
 | 
| 1
 | Leiderschap
 | Duidelijke richting en professioneel leiderschap: heldere normen, rolhelderheid, ploegleiders in positie
 | Ad hoc en informeel: "het komt vanzelf goed"
 | 
| 2
 | Autonomie
 | Delegeren: regelruimte en besluitvorming dicht bij de ploeg
 | Meer centrale sturing en controle
 | 
| 3
 | Controle
 | Coördinatie via gedeelde doelen en afstemming tussen civiel en defensie, met behoud van regelruimte
 | Recentraliseren: de top beslist weer alles
 | 
| 4
 | Bureaucratie
 | Samenwerking: teams, minder procedures, vertrouwen en inspraak van de OR
 | Nog meer regels en procedures
 | 
| 5
 | Externe groei
 | Allianties en partnerschappen met behoud van identiteit en sociale voorwaarden
 | Alles intern oplossen met een harde reorganisatie van bovenaf
 | In ronde 1 schuren Greiner en JD-R: Greiner vraagt om structuur, JD-R om regelruimte. Daarom telt structuur alleen als passend wanneer ze duidelijkheid geeft (een basisbouwsteen bij Gallup) zonder regelruimte weg te nemen. Dit is een vast leermoment in de nabespreking.

## Interventielabels en proefberekening ronde 1
De proefberekening laat zien dat D vooral het uitputtingspad raakt en E vooral het motivatiepad. Samen geven ze het sterkste resultaat; dat wijkt af van de huidige effectentabel van ronde 1, die beide paden even sterk liet bewegen.

| Interventie
 | Basisverandering drijvers
 | AMO
 | Greiner ronde 1
 | Kosten (winst)
 | Rechtvaardigheid
 | 
| A. Vitaliteitsprogramma en fruitmand
 | Erkenning +3; vervalt na één ronde
 | M (beperkt)
 | Neutraal
 | 3
 | Neutraal
 | 
| B. Aanwezigheidsbonus en verzuimgesprek dag 1 (PILOT)
 | Algoritmische controle +10, erkenning −5; verzuim tijdelijk −2% door ziek doorwerken, kwaliteitsfouten +
 | M (extrinsiek)
 | Neutraal
 | Opbrengst +2
 | Procedureel en interpersoonlijk −; vertrouwen −5
 | 
| C. Extra flexkrachten
 | Tempo −5, steun collega's −8, vaardigheden −3, capaciteit +4%
 | A (−)
 | Neutraal
 | 4
 | Distributief − (vaste kern versus flex)
 | 
| D. TEMPO-norm begrenzen, herstelpauzes, ploeg beslist mee
 | Tempo −15, regelruimte +15, inspraak +10, erkenning +5, betekenis +5
 | O
 | Passend
 | 5
 | Procedureel +
 | 
| E. Coaching Ans en extra ploegleider
 | Steun leidinggevende +15, erkenning +8, rolonduidelijkheid −10
 | M
 | Passend
 | 6
 | Interpersoonlijk +
 | Proefberekening bij vertrouwen 50 en diagnose deels juist (q = 1,0), uitkomst bij de start van ronde 2:

| Keuze
 | Welzijn (start 50)
 | Betrokkenheid (start 38)
 | Actief niet-betrokken (start 26%)
 | Productiviteit nu
 | Productiviteit ronde 2
 | 
| Geen interventie
 | 42
 | 37
 | 27%
 | 68
 | 68
 | 
| D
 | 48
 | 38
 | 26%
 | 63
 | 73
 | 
| E
 | 46
 | 42
 | 24%
 | 68
 | 70
 | 
| D + E
 | 51
 | 44
 | 23%
 | 63
 | 77
 | De dip en het herstel bij D ontstaan doordat tempo direct doorwerkt en kansen (O) en lager verzuim pas een ronde later. Bij D blijft de betrokkenheid steken door de poortregel: de basis staat op 43, dus de winst op erbij horen telt maar voor 85% mee. E verbetert juist de basis en de leidinggevende, de twee zwaarste hefbomen van het motivatiepad. Met D en E samen raken teams beide paden tegelijk, en door de synergie tussen kansen (O) en motivatie (M) groeit de productiviteit in ronde 2 naar 77. Alle getallen zijn een eerste proefberekening en worden gekalibreerd met de scenariotests.

## Interventielabels en proefberekening ronde 2
In ronde 2 loont D (de hele drone terug) het meest, maar hoeveel hangt af van ronde 1: met dezelfde keuze D + B eindigt de betrokkenheid op 37 na een passieve ronde 1 en op 49 na D + E in ronde 1. Dat padeffect is het Volhouden in de motor.
SDT en JCM in de drijvers. Ronde 2 gebruikt de zelfdeterminatietheorie (Deci & Ryan, 2000) en het Job Characteristics Model (Hackman & Oldham, 1976). Die krijgen geen eigen rekenregels, maar lopen via bestaande drijvers:

| Begrip
 | Drijver in de motor
 | 
| Autonomie (SDT, JCM)
 | Regelruimte
 | 
| Competentie (SDT)
 | Ontwikkeling en erkenning
 | 
| Verbondenheid (SDT)
 | Steun collega's
 | 
| Taakvariatie, taakidentiteit en taakbetekenis (JCM)
 | Betekenis
 | 
| Feedback uit het werk zelf (JCM)
 | Erkenning
 | 
| Controlerende feedback: ranglijst, camera's (SDT)
 | Algoritmische controle (hindernis-eis)
 | Gebeurtenis bij de start van ronde 2. TEMPO knipt het werk op in microtaken en zet een openbare ranglijst neer: betekenis −10, regelruimte −5, ontwikkeling −5, algoritmische controle +5. Greiner: autonomiecrisis.

| Interventie
 | Basisverandering drijvers
 | AMO
 | Greiner ronde 2
 | Kosten (winst)
 | Rechtvaardigheid en vertrouwen
 | 
| A. Camera's en foutpunten (PILOT)
 | Algoritmische controle +12, erkenning −5, steun collega's −3; fouten worden verborgen (reputatierisico ronde 3)
 | M (controlerend)
 | Terugval
 | 2
 | Procedureel en interpersoonlijk −; vertrouwen −5
 | 
| B. Teambonus op kwaliteit
 | Erkenning +5, steun collega's +5; vervalt na één ronde door gewenning (Deci et al., 1999)
 | M (extrinsiek)
 | Neutraal
 | 4
 | Distributief +; vertrouwen +2
 | 
| C. Extra kwaliteitscontroleurs aan het eind van de lijn
 | Algoritmische controle +3, verantwoordelijkheid −5; reputatie +3 doordat fouten worden gevonden, niet voorkomen
 | –
 | Neutraal
 | 4
 | Neutraal
 | 
| D. Hele drone per team, teamfeedback, proefvlucht
 | Betekenis +15, regelruimte +10, ontwikkeling +8, verantwoordelijkheid +10, nieuwe techniek leren +5, erkenning +5, algoritmische controle −10; vaardigheden tijdelijk −5 (leercurve)
 | A en O
 | Passend
 | 5
 | Procedureel +; vertrouwen +3
 | 
| E. Ranglijst afschaffen, medewerker van de maand
 | Algoritmische controle −8, erkenning +5; de microtaken blijven
 | M
 | Neutraal
 | 1
 | Distributief neutraal
 | Tegenstrijdige paren in ronde 2: A met D en A met E (controle naast autonomie of het afschaffen van de ranglijst), en B met E (teambeloning naast individuele uitverkiezing). D en E overlappen: beide halen de ranglijst weg, dus hun effect op algoritmische controle telt op tot het maximum van 25.
Proefberekening, uitkomst bij de start van ronde 3. De eerste drie rijen gaan uit van geen interventie in ronde 1; de laatste rij van D + E in ronde 1.

| Keuze ronde 2
 | Welzijn
 | Betrokkenheid
 | Actief niet-betrokken
 | Vertrouwen
 | 
| Geen interventie
 | 35
 | 35
 | 28%
 | 50
 | 
| A + C (controle en inspectie)
 | 33
 | 33
 | 29%
 | 45
 | 
| D + B (betekenis en teambonus)
 | 41
 | 37
 | 27%
 | 55
 | 
| D + B, na D + E in ronde 1
 | 56
 | 49
 | 20%
 | 60
 | Na een passieve ronde 1 blijft het effect van D beperkt, om twee redenen die de motor kan uitleggen. De basis is niet op orde (rolonduidelijkheid 55), dus de poortregel remt. En D voegt uitdaging toe terwijl de hulpbronnen onder 50 liggen, waardoor die uitdaging eerst kost voordat ze oplevert. Na D + E in ronde 1 liggen de hulpbronnen boven 50 en werkt dezelfde uitdaging juist motiverend. De productiviteit wordt berekend zodra de motor gebouwd is; de leercurve van D drukt die in ronde 3 eerst en levert daarna op.

## Zichtbaarheid van de drijvers
De drijvers zijn in ronde 1 en 2 verborgen en worden vanaf ronde 3 zichtbaar in een diagnosepaneel.

| Fase
 | Wat deelnemers zien
 | Waarom
 | 
| Ronde 1–2
 | Alleen signalen uit onderzoeksacties, als richting zonder getal: een exitgesprek toont bijvoorbeeld "regelruimte laag, betekenis dalend"
 | Deelnemers oefenen eerst het Zien: van symptoom naar oorzaak, zonder dashboard dat het antwoord geeft
 | 
| Vanaf ronde 3
 | Diagnosepaneel met alle drijvers als getal, inclusief het verloop vanaf ronde 1
 | De groep kan nu terugkijken welke oorzaken ze goed of verkeerd inschatte, en wegen op basis van data
 | 
| Na elke keuze
 | De labels van de gekozen interventie (welke drijvers, welk pad)
 | Uitleg achteraf, zodat de keuze een afweging blijft en geen rekensom
 | 
| Nabespreking
 | De volledige keten, plus eerlijkheid en menselijke maat
 | Het spiegelmoment: wat het team zag in ronde 1 naast wat het deed in ronde 5
 | De labels van de interventies blijven ook vanaf ronde 3 verborgen tot na de keuze. Zo blijft het Wegen een moreel en inhoudelijk oordeel, en geen optimalisatie op de getallen.

## Het Waarom-scherm
Na elke ronde bouwt de motor per team automatisch een uitleg op uit de rekenketen, in vijf vaste regels: wat jullie veranderden, het uitputtingspad, het motivatiepad, de prestatie en de timing. Voorbeeld na interventie D in ronde 1:
Wat jullie veranderden. Jullie begrensden het tempo en gaven de ploeg zeggenschap over pauzes en taakroulatie.
Uitputtingspad. Minder hindernis-eisen en meer hulpbronnen: het welzijn daalt minder hard (48 in plaats van 42). Het verzuim neemt volgende ronde minder toe.
Motivatiepad. Regelruimte en erkenning zijn hulpbronnen, maar de basis is nog niet op orde: medewerkers weten nog steeds niet goed wat TEMPO van hen vraagt. Daarom blijft de betrokkenheid steken op 38.
Prestatie. De productiviteit daalt nu naar 63 door het lagere tempo, en stijgt volgende ronde naar 73 doordat er meer mensen aan het werk zijn en de ploeg meer kansen krijgt.
Timing. Deze ronde draait om de leiderschapscrisis. Jullie maatregel geeft een heldere norm én ruimte, en past daardoor bij deze fase.
De teksten worden opgebouwd uit tekstblokken per drijver en per regel, zodat elke combinatie van keuzes een kloppende uitleg krijgt.

## Toetsing
De motor is pas klaar als zeven vaste speelstrategieën de uitkomst geven die de literatuur voorspelt, en als de richtingsregels altijd gelden.

| Scenario
 | Verwachte uitkomst na ronde 5
 | Getoetst model
 | 
| 1. Elke ronde alleen welzijnsvoorzieningen (fruitmand-type)
 | Welzijn iets beter dan niets doen; betrokkenheid onder 35; productiviteit zakt vanaf ronde 3
 | JD-R: eisen blijven, motivatiepad niet gevoed
 | 
| 2. Elke ronde controle (camera's, ranglijst, aanwezigheidsbonus)
 | Productiviteit stijgt in ronde 1–2, daarna verzuimgolf en verloop; vertrouwen onder 25
 | JD-R, vertrouwensasymmetrie
 | 
| 3. Alleen eisen verlagen, geen aandacht voor basis en leiderschap
 | Welzijn herstelt, betrokkenheid blijft steken
 | Gallup-poortregel
 | 
| 4. Samenhangende bundel over A, M en O, op het juiste Greiner-moment
 | Beste eindscore op beide groepen meters; productiviteit boven 75
 | HPWS, AMO, Greiner
 | 
| 5. Goede maatregel op het verkeerde moment
 | Duidelijk kleiner effect dan in de passende ronde
 | Greiner
 | 
| 6. PILOT elke ronde blind volgen
 | Korte termijn winst; eerlijkheid en menselijke maat laag
 | Algoritmisch management
 | 
| 7. Meegaan in zelfverrijking en defensie zonder ruimte voor gewetensbezwaar
 | Winst hoog; morele eisen hoog; verloop engineers hoog; eerlijkheid laag
 | JD-R (morele eisen), rechtvaardigheid
 | Richtingsregels die als geautomatiseerde tests in de code komen:
Hindernis-eisen verlagen verlaagt het welzijn nooit.
Meer hulpbronnen verlagen de betrokkenheid nooit.
Een interventie met terugval heeft altijd minder effect dan dezelfde interventie als passende keuze.
Bij lager vertrouwen heeft dezelfde interventie altijd minder effect.
Geen meter komt buiten 0–100.
Dezelfde keuzes geven altijd dezelfde uitkomst.
Daarna spelen twee collega's de scenario's na en beoordelen of de uitkomsten te verdedigen zijn tegenover een kritische HR-student.

## Open keuzes
Teams kiezen twee interventies per ronde (besloten 24 oktober 2026).
Alle interventies van ronde 3 tot en met 5 labelen op drijvers, AMO-domein en Greiner-passing.
De effectentabellen van ronde 1 en 2 in het spelontwerp vervangen door uitkomsten van de motor.
De Gallup-bouwstenen in eigen woorden formuleren voor de signalen en het Waarom-scherm.
Gewichten kalibreren tot alle zeven scenario's kloppen.
Expertcheck door twee collega's plannen.

## Literatuur
Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). Manufacturing advantage: Why high-performance work systems pay off. Cornell University Press.
Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. Journal of Occupational Health Psychology, 22(3), 273–285. https://doi.org/10.1037/ocp0000056
Bakker, A. B., Demerouti, E., & Euwema, M. C. (2005). Job resources buffer the impact of job demands on burnout. Journal of Occupational Health Psychology, 10(2), 170–180. https://doi.org/10.1037/1076-8998.10.2.170
Bowen, D. E., & Ostroff, C. (2004). Understanding HRM–firm performance linkages: The role of the "strength" of the HRM system. Academy of Management Review, 29(2), 203–221. https://doi.org/10.5465/amr.2004.12736076
Buckingham, M., & Coffman, C. (1999). First, break all the rules: What the world's greatest managers do differently. Simon & Schuster.
Combs, J., Liu, Y., Hall, A., & Ketchen, D. (2006). How much do high-performance work practices matter? A meta-analysis of their effects on organizational performance. Personnel Psychology, 59(3), 501–528. https://doi.org/10.1111/j.1744-6570.2006.00045.x
Crawford, E. R., LePine, J. A., & Rich, B. L. (2010). Linking job demands and resources to employee engagement and burnout: A theoretical extension and meta-analytic test. Journal of Applied Psychology, 95(5), 834–848. https://doi.org/10.1037/a0019364
Deci, E. L., Koestner, R., & Ryan, R. M. (1999). A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation. Psychological Bulletin, 125(6), 627–668. https://doi.org/10.1037/0033-2909.125.6.627
Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268. https://doi.org/10.1207/S15327965PLI1104_01
Gallup. (2020, oktober). Increase productivity at the lowest possible cost. Gallup.
Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.
Hackman, J. R., & Oldham, G. R. (1976). Motivation through the design of work: Test of a theory. Organizational Behavior and Human Performance, 16(2), 250–279. https://doi.org/10.1016/0030-5073(76)90016-7
Harter, J. K., Schmidt, F. L., & Hayes, T. L. (2002). Business-unit-level relationship between employee satisfaction, employee engagement, and business outcomes: A meta-analysis. Journal of Applied Psychology, 87(2), 268–279. https://doi.org/10.1037/0021-9010.87.2.268
Jiang, K., Lepak, D. P., Hu, J., & Baer, J. C. (2012). How does human resource management influence organizational outcomes? A meta-analytic investigation of mediating mechanisms. Academy of Management Journal, 55(6), 1264–1294. https://doi.org/10.5465/amj.2011.0088
Kroon, B., Van de Voorde, K., & Van Veldhoven, M. (2009). Cross-level effects of high-performance work practices on burnout: Two counteracting mediating mechanisms compared. Personnel Review, 38(5), 509–525. https://doi.org/10.1108/00483480910978027
MacDuffie, J. P. (1995). Human resource bundles and manufacturing performance: Organizational logic and flexible production systems in the world auto industry. Industrial and Labor Relations Review, 48(2), 197–221. https://doi.org/10.1177/001979399504800201
MKB Servicedesk. (z.d.). Onderschat gevolgen van verzuim niet! Maak een verzuimbeleid. https://www.mkbservicedesk.nl/9944/onderschat-gevolgen-verzuim-niet.htm
Robidus. (2025). Whitepaper verzuim. https://www.robidus.nl/wp-content/uploads/2025-05-Whitepaper-Verzuim.pdf
Robinson, S. L. (1996). Trust and breach of the psychological contract. Administrative Science Quarterly, 41(4), 574–599. https://doi.org/10.2307/2393868
Van de Voorde, K., Paauwe, J., & Van Veldhoven, M. (2012). Employee well-being and the HRM–organizational performance relationship: A review of quantitative studies. International Journal of Management Reviews, 14(4), 391–407. https://doi.org/10.1111/j.1468-2370.2011.00322.x
Wright, P. M., & Nishii, L. H. (2013). Strategic HRM and organizational behaviour: Integrating multiple levels of analysis. In J. Paauwe, D. E. Guest, & P. M. Wright (Eds.), HRM and performance: Achievements and challenges (pp. 97–110). Wiley.
