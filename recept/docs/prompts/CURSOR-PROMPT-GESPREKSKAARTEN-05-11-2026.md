# Recept – Cursor-prompt gesprekskaarten (5 november 2026)

Besluit Richard (5 november 2026): per aflevering één gesprekskaart in ronde 1, na de beslissingen en vóór de uitkomsten; teamgesprek zonder effect op de meters; het team legt één zin en maximaal drie waarden vast voor de docent. Vijf kaarten, zeven waarden, goedgekeurd. Bron en toelichting: docs/claude-outputs/recept-gesprekskaarten-voorstel-05-11-2026.md.

## Cursor-prompt

Taak: gesprekskaarten bouwen. Taal NL. Geen deploy. Commit niet zelf. Engine (compute, interventieCompute), rounds, vertaaltabel, golden-referenties en het uiterlijk van A4 blijven ongewijzigd; alle bestaande tests blijven groen. Werk in de map recept/.

### 1. Verkenning
Lees src/game/gameReducer.ts, src/game/teamExport.ts, data/episodes/content.ts (EPISODE_CONTENT), themes/periods.ts, src/screens/phases/BesluitPhase.tsx en UitkomstPhase.tsx, src/components/DocentPausePanel.tsx en de fase-volgorde. Beschrijf kort in docs/GESPREKSKAART.md waar de kaart in de flow komt en hoe state en export werken.

### 2. Data en register
Maak data/gesprekskaarten.ts met type `Gesprekskaart`: `id`, `episode` (1 tot 5), `titel`, `niveau` ('micro' | 'meso'), `sterren` (1 of 2), `alinea's` (readonly string[]), `slotvraag`. Voeg `gesprekskaart` toe aan het EPISODE_CONTENT-register per aflevering. Standaardslotvraag: "Wat zou jij doen en waarom? Welke waarden zijn hier in het spel?" Waardenlijst als constante `WAARDEN` (id en label): eerlijkheid, loyaliteit, rechtvaardigheid, zorg, vertrouwen, veiligheid, transparantie. Valideer met het bestaande schema-patroon (zod of gelijkwaardig); test dat elke aflevering een kaart heeft met minstens 3 alinea's.

Teksten (letterlijk overnemen, niet herschrijven):

**A1 · "Het klusje voor Harrie" · micro · 1 ster**
1. Zaterdagmiddag vraagt Harrie aan Gerrit of hij even iets wil bezorgen: een paar extra kratten kroketten voor een café in Tilburg. "Een gunstje, Gerrit. Jij kent die man." Gerrit doet het graag; Harrie heeft hem de laatste maanden ook veel werk bezorgd.
2. Bij het café blijken het veel meer kratten dan afgesproken, en de eigenaar telt zeshonderd gulden in contanten uit. Geen bon, geen briefje. "Geef maar aan Harrie." Harrie stopt het geld in zijn jaszak. "Dat schrijven we later wel in het kasboek."
3. Zondag ziet Gerrit hoe Lies het kasboek bijhoudt, regel voor regel. Dit bedrag staat er niet in. Het is niet de eerste keer. Volgende zaterdag vraagt Harrie hem hetzelfde nog eens. Doet Gerrit het weer, spreekt hij Harrie erop aan, of vertelt hij het aan Lies?

**A2 · "Het gat in het loongebouw" · meso · 2 sterren**
1. Ingrid heeft haar eerste baan bij personeelszaken van Van Gorp. Het bedrijf groeit snel en ze brengt in kaart wie wat doet en wat iedereen verdient. Het is een rommeltje: dezelfde functies, verschillende lonen.
2. Dan belt Gerrit, ploegbaas bij de band. "Ik heb dringend een planner nodig en ik heb al iemand. Ze wil vijfhonderd gulden meer dan onze andere planners. Regel het maar, anders gaat ze naar Waalwijk."
3. Ingrid denkt aan Truus, al acht jaar planner, die nooit om meer geld heeft gevraagd. Zegt ze ja, dan is de vacature morgen vervuld en wordt het loongebouw nog schever. Zegt ze nee, dan staat de planning straks stil. Wat is eerlijker: de nieuwe goed betalen, of de oude niet passeren?

**A3 · "Topresultaten" · meso · 2 sterren**
1. Voor de derde keer in korte tijd meldt Saskia zich ziek. In het verzuimgesprek komt het eruit: werkdruk, spanning en een leidinggevende die iedereen constant opjaagt. "Ik trek het even niet meer. En ik ben echt niet de enige."
2. Mark, HR-adviseur op het hoofdkantoor in Tilburg, kent die leidinggevende. De vestiging in Dongen haalt al drie jaar op rij de targets. Marco noemt hem "onze motor". Waalwijk zit al maanden eronder.
3. Een kritisch signaal naar boven kan het team helpen, maar ook een succesvolle manager beschadigen, en Marks eigen positie. Zwijgen houdt de cijfers hoog en mensen ziek. Wat zijn topresultaten waard als ze worden betaald met de gezondheid van het team?

**A4 · "Het voorstel van IT" · meso · 2 sterren**
1. IT wil PILOT uitbreiden naar de staf: software die toetsaanslagen en actieve vensters bijhoudt, om onderpresteerders vroeg te signaleren. Yasmin, HR-manager, moet vrijdag adviseren. Twee medewerkers presteren al maanden onder, zonder duidelijke reden.
2. De software zou dat sneller laten zien dan haar eigen gesprekken. Maar gisteren hoorde ze twee collega's fluisteren: "Als dit doorgaat, ben ik weg. Ik laat me niet elke minuut natrekken." Sinds de reorganisatie is het vertrouwen al broos.
3. De directie wil een advies: voor, tegen of een tussenvorm. Yasmin opent het conceptdocument van IT, de cursor knippert. Wat typt ze?

**A5 · "De kantlijn" · meso · 2 sterren**
1. Ria is tweeënzestig en beheert al eenendertig jaar het archief met de oorspronkelijke recepten en werkinstructies van het bedrijf, op papier en volgens haar eigen systeem. Alles is inmiddels gedigitaliseerd en het AI-systeem vindt in een seconde wat zij in een minuut vindt.
2. De directie vraagt Sanaa, HR-adviseur, hoe er "op korte termijn afscheid van haar kan worden genomen". Een vaststellingsovereenkomst is snel en voor iedereen overzichtelijk.
3. Sanaa weet dat de digitale versie de aantekeningen in de kantlijn niet heeft. Alleen Ria kan ze lezen en weet waarom ze er staan. Een omscholingstraject is duur en onzeker. Wat is een organisatie verschuldigd aan iemand die zij zelf heeft laten verouderen, en wie bewaart wat alleen in haar hoofd zit?

### 3. Fase en flow
Voeg een fase `gesprek` toe (of een stap binnen de besluitfase, kies wat het best in de reducer past) in ronde 1 van elke aflevering: na het bevestigen van de beslissingen van het team, vóór de uitkomst. Acties: GESPREK_START, GESPREK_OPSLAAN (zin, waarden), GESPREK_OVERSLAAN. Geen effect op de meters, het budget of de engine (test dat compute-uitkomsten met en zonder kaart gelijk zijn). A4 (demo) behoudt zijn flow: de kaart staat daar achter de vlag `gesprekskaartActief` die voor A4 standaard uit staat, zodat de demo en de golden-referenties ongewijzigd blijven; A1 t/m A3 en A5 hebben de vlag aan. Migreer bestaande opgeslagen state veilig (src/game/migrateState.ts) zodat oude saves niet breken.

### 4. Component GesprekskaartPhase
- Kaart in de stijl van het tijdperk (CSS-variabelen uit themes/periods.ts: --font-display voor de titel, --font-ui voor de tekst), A5-gevoel: een kaart met titel, niveau en sterren, alinea's, slotvraag.
- Rustige timer van twee minuten, zichtbaar maar niet stressend (zachte balk, geen aftellend alarm); het team kan verlengen (+1 minuut) of overslaan. Bij prefers-reduced-motion geen animatie; de timer is alleen visueel, niets is afgedwongen. Pauzeer bij onzichtbaar tabblad.
- Invoer: één tekstveld voor "Onze zin" (verplicht bij opslaan, maximaal 280 tekens, met teller) en maximaal drie waarden uit WAARDEN (selecteerbare chips, aria-pressed, maximaal drie met melding bij een vierde).
- Knoppen: "Naar de uitkomsten" (opslaan) en "Sla de kaart over" (laat zin en waarden leeg; wordt in de export als overgeslagen gelogd).
- Toegankelijkheid: toetsenbordbediening, labels, focusvolgorde, aria-live voor de timerwaarschuwing (alleen bij 30 seconden), contrast volgens de bestaande normen, werkt met de instelling Leesbaar lettertype.

### 5. Export en docent
Breid src/game/teamExport.ts uit met `gesprekskaarten: [{ episode, kaartId, zin, waarden, overgeslagen, tijdsduurSec }]`. Toon in DocentPausePanel/NabesprekingPhase per kaart de zin van het team en de gekozen waarden, zodat de docent teams kan vergelijken (v1: een lijst of tabel per kaart; het volledige vergelijkscherm komt later). Documenteer het exportformaat in docs/GESPREKSKAART.md en voorzie het van een versienummer.

### 6. Tests
(a) elke aflevering heeft een kaart met titel, niveau, minstens 3 alinea's en de standaardslotvraag; (b) WAARDEN bevat precies de zeven waarden; (c) opslaan weigert een lege zin, een zin boven 280 tekens en meer dan 3 waarden; (d) overslaan logt `overgeslagen: true`; (e) compute-uitkomsten en budget zijn met en zonder kaart gelijk (A1 t/m A3 en A5); (f) A4 met vlag uit doorloopt de flow ongewijzigd, golden ongewijzigd; (g) de reducer gaat in ronde 1 van besluit via gesprek naar uitkomst, en ronde 2 heeft geen kaart; (h) teamExport bevat de nieuwe sectie; (i) migratie van oude state werkt; (j) alle bestaande tests groen.

### 7. Docs en oplevering
Werk docs/GESPREKSKAART.md, docs/VOORTGANG.md, docs/OPEN-VRAGEN.md en docs/DESIGNGIDS.md bij (open: Richard beoordeelt de kaarten na het spelen; vergelijkscherm v1 en timerinstelling per sessie komen later). Draai npm test en npm run build. Meld kort: gekozen plek in de flow, aantal tests groen, afwijkingen, openstaande vragen.

## Bronnen

Lectoraat Ethisch Werken, Fontys Hogeschool HRM en Psychologie. (2026). Gesprekskaarten HRM, Praktijkschok HRM en Management [Kaartenset, interne publicatie].

World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/
