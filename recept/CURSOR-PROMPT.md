# CURSOR-PROMPT: Recept, de volledige game in één bouw

Taal van alle zichtbare tekst en documentatie: Nederlands. Code, bestandsnamen en commentaar mogen Engels zijn. Toon in de interface: professioneel, persoonlijk en enthousiast, nooit hyperbolisch.

## 1. Rol, doel en werkwijze

Je bouwt **Recept**: een HR-businessgame in de vorm van een dramaserie, voor hbo-studenten HR en Psychologie. Een MT van vier of vijf studenten stuurt het fictieve familiebedrijf Van Gorp (van de schuur in 1984 tot een conglomeraat in 2036) door de groeifasen van Greiner. Elke uitkomst is herleidbaar tot keuze, oorzaak, mechanisme en gevolg (JD-R, AMO, HPWS, Greiner, Gallup). Het spel is bedoeld om morele vakmanschap te oefenen (Model Moreel Vakmanschap: Zien, Voelen, Wegen, Handelen, Volhouden) en niet om een score te halen.

Werkwijze:
1. Lees eerst `docs/` en `referentie/` volledig. Maak daarna een korte bouwplanning (maximaal 40 regels) en werk die af in de volgorde van paragraaf 11. Stel geen vragen als het antwoord in de bronnen staat; kies bij een gat een redelijke standaard, leg die vast in `docs/BESLUITEN-CURSOR.md` en ga door.
2. Houd de bronnen leidend. Bij een tegenstrijdigheid geldt: referentiecode voor getallen en gedrag, `docs/` voor logica en tekst, deze prompt voor architectuur en kwaliteit. Leg elke afwijking vast in `docs/AFWIJKINGEN.md`.
3. Verzin geen HR-inhoud, wetenschappelijke claims of bronnen. Ontbrekende inhoud komt als data met `status: "concept"` (zie paragraaf 5).

## 2. Bronnen in de repository

- `referentie/demo-aflevering4-v6.html`: één bestand met de speelbare demo, nieuwste stand (versie 6). Bevat spelmotor, controlekamer, begrotingstafel, HR-kosten, groepsapp, trailer met browsergeluid, slotscène, pauzekaart, opdrachtbalk, "Wie is wie en begrippen" en de "Nog nodig:"-meldingen. Dit is de referentie voor look, gedrag en rekenregels. De beelden staan los in `referentie/beelden/` (MENU, T4, C4, W4, X1, Y1, P9, R2, D1, PIOTR; het bestand verwijst er al naar).
- `docs/spelmotor.md`: rekenregels, startwaarden, labels en proefberekeningen voor ronde 1 en 2, literatuur.
- `docs/dronefabriek-deel1.md`: personages, ronde 1 en 2, interventies met effecten, uitlegteksten, profielsignalen.
- `docs/overzicht.md` (besluitenlog en open punten), `docs/serieconcept.md` (toon, afleveringen, personages over generaties, opvolging), `docs/keuzes-en-dashboard.md` (rondeverloop, rollen, beslisregel, dashboardzones, regiekamer) en `docs/beeldbank-codes.md` (beeldcodes per tijdperk). Ze zijn leidend voor personages, rondeverloop en slotscènes; de demo is leidend voor getallen en gedrag.
- `docs/introteksten.md` (letterlijke introteksten per aflevering) en `docs/morele-dilemmas.md` (vijf dilemma's en het mechanisme) zijn leidend voor die onderdelen.

## 3. Spelverloop en schermen

### 3.1 Sessie en structuur
Vijf afleveringen, elk één ronde van ongeveer 20 minuten, met een pauze van 15 minuten na aflevering 3 en een nabespreking van 30 minuten:

| Aflevering | Jaar | Titel | Greiner-crisis | Slotscène |
| --- | --- | --- | --- | --- |
| 1 | 1984 | Alles met de hand | Leiderschap | Supermarktketen wil tien keer zoveel kroketten; Harrie zegt ja zonder het Lies te vragen |
| 2 | 1996 | Sneller, Gerrit | Autonomie | Harrie zakt in elkaar op de werkvloer; Gerrit belt de ambulance |
| 3 | 2009 | Een Van Gorp aan het roer | Controle | Opvolging gekozen; Sanne staat op en verlaat het restaurant (pauze volgt) |
| 4 | 2026 | Het dashboard liegt niet | Zie 5.1 | Sprong naar 2031; Harrie overlijdt; één zin in het testament is doorgestreept |
| 5 | 2036 | Wie heeft het schrift? | Externe groei | Lotte vindt het schrift in de schuur; gaat over in de nabespreking |

Aflevering 4 heeft in de demo twee rondes (ronde 1 en ronde 2). Bouw beide volledig.

### 3.2 Stappen binnen een ronde
Introscherm (geschiedenis, uitdagingen, hint) → Speel trailer → cold open met ondertitels per klik → 1. Onderzoek (drie van zes acties, daarna een vermoeden uit vier) → 2. MT-besluit (PILOT volgen of zelf wegen, twee interventies, sluitende begroting, rondje MT met vier rollen, motivatie van één zin, optioneel minderheidsstandpunt) → 3. Uitkomst ("TEMPO herberekent de fabriek", meters, Waarom-scherm, HR-kosten, reacties) → knop **Einde van dit deel** → slotscène (± 27 s) → pauzekaart (twee tafelvragen en een voorspelling). Het besluit kan pas worden vastgelegd als aan alle vijf voorwaarden is voldaan; bij PILOT volgen staat interventie B vast.

### 3.3 Dashboard per tijdperk
Het dashboard verandert van vorm per tijdperk: 1984 kasboek op de keukentafel, 1996 groen terminalscherm met productieteller, 2009 spreadsheet en eerste BI-dashboard, 2026 controlekamer van TEMPO (zoals de demo), 2036 glanzende holding-app waarin bijna geen mensen meer voorkomen. Maak één dashboardcomponent met een thema-object per tijdperk (kleuren, lettertypen, widgetset, nieuwsband). De controlekamer van 2026 moet pixelnabij de demo zijn. De overige vier mogen eenvoudiger zijn maar moeten per tijdperk herkenbaar anders voelen.

### 3.4 Duidelijkheid voor studenten (zit al in de referentie, behouden)
Bouw na wat de referentie doet en behoud de teksten: opdrachtbalk bovenaan elk spelscherm (opdrachtvorm met "jullie"); blok "Jullie opdracht" in de intro van elke ronde en een korte uitleg bij de cold open; venster "Wie is wie en begrippen" (personen en vakwoorden), bereikbaar vanuit hoofdmenu, pauzemenu, "Hoe het werkt" en de intro; "Hoe het werkt" in gewone taal met knop "Duidelijk"; meldingen onder knoppen die beginnen met "Nog nodig:"; uitkomst met vijf oordelen (timing, samenspel, diagnose, basis, geld) met een vraag als titel, en de wetenschappelijke uitleg in de uitklapper "Voor de nabespreking: zo is het berekend". Het besluitscherm is bewust nog niet in genummerde stappen opgedeeld; doe dat wel als dat de duidelijkheid vergroot, en meld het in `docs/BESLUITEN-CURSOR.md`.

### 3.5 Speelrol en naam
Deelnemers spelen de hoger opgeleide jongere zus van Harrie (nooit in beeld). Bij de start typt elk team haar voornaam (maximaal 12 tekens, suggesties Marja, Ingrid, Mieke). Die naam keert terug in memo's, dialogen en de nabespreking. Interventies verschijnen als haar korte zakelijke memo's.

### 3.6 Ronderegels die niet mogen veranderen
Twee interventies per ronde. Vakterm is "interventies" (niet kaarten of maatregelen). Het woord "cliffhanger" komt nergens voor. Geen ranglijst tussen teams. De drijvers zijn verborgen in ronde 1 en 2 en zichtbaar vanaf ronde 3 als diagnosepaneel. Eerlijkheid en menselijke maat zijn verborgen meters en verschijnen pas in de nabespreking.

## 4. Spelmotor

- Eén pure TypeScript-module `engine/` zonder UI-afhankelijkheden. Alle gewichten, labels, startwaarden, interventies, begrotingsposten, kosten en teksten staan in data-bestanden (`data/`) en niet in de rekenfuncties.
- Port `compute()`, `hrKost()`, de Greiner-passing, synergie en tegenstrijdige paren, de begrotingsfunctie (u = √(bedrag/100.000) − √(Marco/100.000)) en de openingszin van de slotscène exact uit de referentie. Draai de referentie (v6) voor de zeven scenario's uit `docs/spelmotor.md` (Toetsing) en sla de uitkomsten op als golden snapshots in `engine/__golden__/`. Je eigen port moet die snapshots reproduceren (afronding op gehele punten). Verschillen met de proefberekeningstabellen in `docs/spelmotor.md` leg je vast in `docs/AFWIJKINGEN.md`; corrigeer het document niet stilzwijgend.
- Meters: Productiviteit, Resultaat (winst), Reputatie, Welzijn, Betrokkenheid (met verdeling betrokken / niet betrokken / actief niet-betrokken), Vertrouwen. Verborgen: Eerlijkheid, Menselijke maat. Alle meters blijven binnen 0–100.
- Deterministisch: dezelfde keuzes geven altijd dezelfde uitkomst. Geen willekeur in de motor.
- Tests met Vitest voor de richtingsregels uit `docs/spelmotor.md` (hindernis-eisen verlagen verlaagt het welzijn nooit; meer hulpbronnen verlagen de betrokkenheid nooit; een interventie met terugval heeft altijd minder effect dan dezelfde interventie als passende keuze; bij lager vertrouwen minder effect; geen meter buiten 0–100; dezelfde keuzes geven dezelfde uitkomst) plus de golden snapshots.
- Het Waarom-scherm wordt gegenereerd uit tekstblokken per drijver en per regel (wat jullie veranderden, uitputtingspad, motivatiepad, prestatie, timing), zodat elke combinatie van keuzes een sluitende uitleg krijgt.

## 5. Content

### 5.1 Aflevering 4 (volledig)
Ronde 1 (verzuim in de assemblagehal) en ronde 2 (demotivatie en fouten bij de opschaling), met alle onderzoeksacties, citaten, signalen, PILOT-adviezen, interventies, effecten, uitleg, profielsignalen en reacties zoals in `docs/dronefabriek-deel1.md` en de referentie. Voeg ronde 2 toe met het padeffect uit ronde 1 (zie `docs/spelmotor.md`, "Interventielabels en proefberekening ronde 2"). Open punt: de serie noemt de bureaucratiecrisis als Greiner-crisis van aflevering 4, terwijl de demo leiderschap (ronde 1) en autonomie (ronde 2) gebruikt. Maak de crisis per ronde configureerbaar in data, gebruik vooralsnog de demo-waarden en meld dit in `docs/AFWIJKINGEN.md`.

### 5.2 Afleveringen 1, 2, 3 en 5 (structuur volledig, interventies concept)
Bouw per aflevering het volledige skelet: introtekst (geschiedenis, uitdagingen, hint; letterlijk uit `docs/introteksten.md`), trailer-configuratie, cold-open ondertitels, onderzoeksacties, dashboardthema, tafelvragen, voorspelling, slotscène en pauzekaart. Voor de interventies van deze afleveringen geldt: maak per ronde vijf conceptinterventies in dezelfde datastructuur als aflevering 4, afgeleid van de Greiner-crisis, met `status: "concept"` en een zichtbare banner in docentmodus ("Concept: inhoud nog niet inhoudelijk getoetst"). De spelers zien de banner niet, maar het systeem logt welke concepten gespeeld zijn. Voeg geen literatuurclaims toe die niet in `docs/` staan.

### 5.3 Opvolgingskeuze (aflevering 3)
Het MT kiest Marco, Sanne of een externe directeur (stemming; bij gelijk beslist de directeur). De keuze wordt opgeslagen en kleurt berichten, scènes en kansen in aflevering 4 en 5 volgens `docs/serieconcept.md` ("Opvolging als open keuze"). Zonder dat document: bouw de keuze en sla ze op, laat de gevolgen als `TODO`-datavelden staan en meld dat.

### 5.4 Morele dilemma's
Per aflevering één persoonlijk dilemma als privébericht met drie keuzes (niets doen, in de groep bespreken, privé een besluit nemen), los van de spelmotor; het raakt alleen de verborgen meters. Bouw het mechanisme volledig en het dilemma van aflevering 4 (de order van Defensie en de verdenking van Piotr) volledig. De andere vier dilemma's staan in `docs/morele-dilemmas.md`; bouw ze als data, ook als ze nog niet speelbaar zijn gekoppeld aan een ronde. Volg de ethische bouwnoot in dat bestand.

## 6. Berichten

Chat-app zonder merkkenmerken: tekstballonnen met naam en tijd, vinkjes, "typt…" met puntjes, melding rechtsboven. Twee tabbladen: **Groep: MT Van Gorp Drones** (Marco, Dennis, Harrie, het MT) en **Privé** (Erik, Joost, Ans, Yasmin, Piotr, elk afzonderlijk). Berichten komen op vaste tijdstippen per fase; na het besluit reageren personages in het passende kanaal op wat het MT met het geld deed (zie `reacties()` in de referentie). Berichttekst staat in data, niet in code.

## 7. Trailer, slotscène en geluid

- Bewegende stilstaande beelden (langzame zoom en pan, harde wissels met lichtflits), ondertitels, interface-shots (norm, ranglijst, verzuim) en browsergeluid via Web Audio (zoemende ondertoon, versnellend tikken, dreunen, lage slottoon). Geen videobestanden.
- Trailer start pas na een tik op "Speel trailer" (iPad-audio), is altijd overslaanbaar, heeft ondertitels voor alles wat een personage zegt, en volgt `prefers-reduced-motion` (stilstaande beelden met wisselende ondertitels, zonder flits).
- Beeldplekken: elk beeld heeft een code (C4, T4, W4, X1, Y1, I4, P9 enzovoort). Ontbreekt een beeld, toon dan een sfeervolle plaatsaanduiding ("BEELD C4 VOLGT"). Beelden staan als JPG/WebP in `public/beelden/<code>.webp`, maximaal 1600 px breed.
- Slotscène: openingszin hangt af van het besluit (zie `cliffLine()` in de referentie, hernoem naar `slotLine`; het woord "cliffhanger" mag nergens in de interface of tekst voorkomen). De speler is nooit in beeld: personages praten over haar via een telefoon, een briefje of een lege stoel.

## 8. Wie is wie, portretten en rolteksten

### 8.1 Rolbeschrijving (goedgekeurd, letterlijk overnemen)
Intro van de speelrol:

> Je bent hoger opgeleid en hebt in dit bedrijf meer zeggenschap dan de meeste mensen beseffen, maar je houdt je liever op de achtergrond. Op de feestjes zie je niemand naar je zoeken, je staat zelden op de foto en het gekibbel in de wandelgangen gaat aan je voorbij. Toch komt niets in dit bedrijf in beweging zonder jouw handtekening.
>
> In het MT verdelen jullie vier rollen: directeur, financieel, HR en OR. Elke rol kijkt vanuit een eigen hoek naar dezelfde situatie, en dat is precies wat de komende ronden spannend maakt.

Zet deze tekst in `content/rolbeschrijving.nl.ts`, op één plek, en gebruik hem in de intro van aflevering 4 en in "Hoe het werkt". Schrijf alle andere nieuwe tekst in dezelfde verhalende stijl: lopende zinnen, geen opsommingen met losse kwalificaties.

### 8.2 PERSONEN (teksten letterlijk overnemen, volgorde behouden)
- **Harrie van Gorp**: Jullie broer, 71 jaar en president-commissaris van Van Gorp Drones.
- **Marco van Gorp**: Harries zoon en jullie neef. Hij stelde de begroting op en wil vrijdag een plan zien.
- **Ans Willems**: Ploegleider op de vloer. Zij voert de normen uit die TEMPO bepaalt.
- **Erik Verhoeven**: Adviseur van Optivora, de leverancier van TEMPO en PILOT. Hij heeft ook iets te verkopen.
- **Joost Hendriks**: Denkt mee vanuit de medewerkers en vraagt of de OR wordt betrokken.

Leeftijden uit het ontwerp (voor alt-tekst en beeldprompts): Harrie 71, Marco 46, Erik 49, Ans 57, Joost 52, Dennis 39, Yasmin 29, Piotr 34.

### 8.3 Portretten
Elke persoon krijgt een portret (gestileerd illustratieportret, één rustige stijl voor alle personen, vierkant 1:1, 512 × 512 WebP in `public/portretten/<slug>.webp`).
- Component `PersonCard`: portret links, tekst rechts; op smalle schermen kleiner portret links of erboven, zonder horizontaal scrollen. Rond of afgerond vierkant, 72 px mobiel en 96 px desktop, `object-fit: cover`, dunne rand in de accentkleur, `loading="lazy"`, vaste breedte en hoogte.
- Terugval: ontbreekt het bestand of faalt het laden, toon een avatar met initialen (HG, MG, AW, EV, JH, DK, YA, PN) in dezelfde vorm en het themapalet, met WCAG-contrast.
- Alt-tekst beschrijft de rol en niet het uiterlijk ("Portret van Ans Willems, ploegleider").
- Gebruik de portretten ook bij berichten (klein, 38 px) en in de personagekaarten van de nabespreking.
- Data in `data/personen.ts` met velden `slug`, `naam`, `leeftijd`, `rol`, `tekst`, `portret?`, `portretAlt`.

## 9. Ethiek, privacy en toegankelijkheid

- **Alles fictief.** Bedrijven (Van Gorp Drones, Optivora), systemen (TEMPO, PILOT) en personages zijn verzonnen; de plekken (Tilburg, Berkel-Enschot, Loven, Vossenberg, Oisterwijk, Spoorzone) bestaan echt. Geen echte merken, logo's of personen. Geen namen, teksten of muziek uit Succession.
- **Portretten en stereotypen.** Beeldgeneratie versterkt demografische stereotypen sterk (Bianchi et al., 2023). Houd daarom per portret vast: geen rol is visueel aan één achtergrond gekoppeld, Erik is niet als schurk gecodeerd, geen persoon heeft meer of minder visueel gewicht dan de rest. Vermeld in de nabespreking dat de portretten fictief en gegenereerd zijn en bied een gespreksvraag: welk beeld kreeg je bij een personage, en waar kwam dat vandaan?
- **Privacy (AVG).** Versie 1 heeft geen accounts, geen analytics, geen cookies van derden en geen externe verzoeken behalve lettertypen (zelf hosten). Spelstatus staat alleen in `localStorage` (altijd in try/catch; de app werkt ook zonder). Het team typt alleen een voornaam voor de zus; waarschuw dat er geen persoonsgegevens ingevuld hoeven te worden.
- **Toegankelijkheid.** WCAG 2.2 AA: contrast, toetsenbordbediening, zichtbare focus, `aria-live` voor berichten en uitkomsten, doelgebieden van minimaal 44 px, kleur nooit als enige betekenisdrager (cyaan en oranje altijd samen met ▲ of ▼), ondertitels voor alle audio, `prefers-reduced-motion`, lichte en donkere stand.
- **Werkt op een oudere iPad.** Vite-target `safari12`, geen zware afhankelijkheden, eerste lading onder 300 kB zonder beelden, geluid pas na een tik.
- **Moreel vakmanschap in het ontwerp.** Geen ranglijst, geen wedstrijdelement, geen gamification die het gedrag beloont dat het spel bevraagt. Nabespreking vergelijkt teams per meter en keuze als spiegel.

## 10. Techniek

- Vite + React + TypeScript (strict). Eén toestandsmachine (`useReducer` of een kleine store) met expliciete fasen; het spel is hervatbaar na verversen (state in `localStorage`).
- Mappen: `engine/`, `data/`, `content/`, `components/`, `screens/`, `themes/`, `audio/`, `public/beelden/`, `public/portretten/`, `docs/`, `referentie/`.
- Alle spelinhoud in data met een JSON-schema of Zod-validatie; bouw faalt bij ongeldige data.
- Geen backend in versie 1. Zet wel een `SessionAdapter`-interface klaar (`getState`, `dispatch`, `subscribe`) met een lokale implementatie, zodat een latere multiplayer-versie (telefoons via QR-code, regiekamer voor de docent, bijvoorbeeld op Supabase) zonder herbouw kan worden toegevoegd. Bouw die multiplayer nu niet.
- **Docentmodus** (via `?docent=1`): timer aanpassen en pauzeren, naar een stap springen, verborgen meters en drijvers inzien, conceptbanner, export van de keuzeketen van het team als JSON (voor de nabespreking).
- Nabespreking: scherm met per team de keten (vermoeden, keuze, motivatie, minderheidsstandpunt, gevolgen, rolbelangen onthuld) plus onthulling van de verborgen meters Eerlijkheid en Menselijke maat en het profiel Moreel Vakmanschap (Zien, Voelen, Wegen, Handelen, Volhouden). Geen los getal.
- Deploybaar als statische site (Netlify). Voeg `README.md` toe met installatie, scripts (`dev`, `build`, `test`, `lint`) en hoe je beelden, portretten en teksten toevoegt.

## 11. Bouwvolgorde en oplevering

Werk in deze volgorde en commit na elke stap met een duidelijke boodschap. Stop pas als stap 8 klaar is.

1. Projectopzet, thema-systeem, datastructuren en validatie.
2. Spelmotor met tests en golden snapshots (paragraaf 4).
3. Controlekamer 2026, onderzoek, besluit, begrotingstafel, uitkomst en HR-kosten: aflevering 4 ronde 1 speelbaar en gelijk aan de demo.
4. Opdrachtbalk, "Wie is wie en begrippen", "Nog nodig:", herschreven uitleg (paragraaf 3.4) en rolbeschrijving.
5. Groepsapp en privéberichten, reacties, dilemma-mechanisme en het dilemma van aflevering 4.
6. Trailer, slotscène en pauzekaart; ronde 2 van aflevering 4.
7. Afleveringen 1, 2, 3 en 5 (skelet, concepten), dashboardthema's per tijdperk, opvolgingskeuze.
8. Portretten, docentmodus, nabespreking, toegankelijkheidscontrole, README.

Oplevering: draaiende `dev`-build, groene tests, `docs/BESLUITEN-CURSOR.md` en `docs/AFWIJKINGEN.md`, en een lijst "Wat Richard nog moet aanleveren" (beelden, portretten, definitieve interventies voor aflevering 1, 2, 3 en 5, inhoudelijke toetsing van gewichten).

## 12. Wat bewust niet in versie 1 zit

Multiplayer en regiekamer op telefoons, accounts, analytics, echte video, definitieve inhoud van interventies in aflevering 1, 2, 3 en 5, kalibratie van gewichten met scenariotests en expertcheck, en rechten en pitch voor een mogelijke koper.

## Bronnen (APA 7)

Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). *Manufacturing advantage: Why high-performance work systems pay off*. Cornell University Press.

Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. *Journal of Occupational Health Psychology, 22*(3), 273–285. https://doi.org/10.1037/ocp0000056

Bianchi, F., Kalluri, P., Durmus, E., Ladhak, F., Cheng, M., Nozza, D., Hashimoto, T., Jurafsky, D., Zou, J., & Caliskan, A. (2023). Easily accessible text-to-image generation amplifies demographic stereotypes at large scale. In *Proceedings of the 2023 ACM Conference on Fairness, Accountability, and Transparency* (pp. 1493–1504). ACM. https://doi.org/10.1145/3593013.3594095

Greiner, L. E. (1972). Evolution and revolution as organizations grow. *Harvard Business Review, 50*(4), 37–46.

Harter, J. K., Schmidt, F. L., & Hayes, T. L. (2002). Business-unit-level relationship between employee satisfaction, employee engagement, and business outcomes: A meta-analysis. *Journal of Applied Psychology, 87*(2), 268–279. https://doi.org/10.1037/0021-9010.87.2.268

Kerr, S. (1975). On the folly of rewarding A, while hoping for B. *Academy of Management Journal, 18*(4), 769–783. https://doi.org/10.5465/255378

De volledige literatuurlijst van de spelmotor staat in `docs/spelmotor.md`.
