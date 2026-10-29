/** Introteksten — letterlijk uit docs/introteksten.md */

export type IntroBlok = {
  geschiedenis: string;
  uitdagingen: string;
  hint: string;
  opdracht: string;
};

export const INTRO_TEKSTEN: Record<1 | 2 | 3 | 4 | 5, IntroBlok> = {
  1: {
    geschiedenis:
      'Het ruikt naar hete olie en nat gras. In de schuur achter zijn ouderlijk huis in Berkel-Enschot staat Harrie van Gorp, tweeëntwintig jaar oud, tot zijn ellebogen in het paneermeel. Zijn vriendin Lies houdt de kas bij op de keukentafel, slager Gerrit levert het vlees en kent het recept beter dan Harrie zelf, en drie buren komen bijspringen als het druk wordt. De telefoon, een enkel toestel aan de muur, gaat de laatste weken bijna de hele avond.',
    uitdagingen:
      'Vanmiddag belde een inkoper van een supermarktketen. Tien keer het normale volume, te leveren over zes weken. Harrie wil meteen ja zeggen. Lies heeft het nog niet gehoord. Twee buren hebben zich ziek gemeld, en de schuur telt precies acht vierkante meter werkruimte.',
    hint: 'Kijk goed wie er aan tafel zit wanneer de grote beslissingen vallen, en wie daar straks niet bij was. Een schuur is klein, maar een handtekening kan er net zo groot in doorklinken als in een directiekamer.',
    opdracht:
      'Jullie vormen het kernteam rond Harrie. Onderzoek wat er speelt, kies twee interventies en verdeel het geld. Dit is een conceptskelet: de uitkomst is nog niet gekoppeld aan de volledige spelmotor.',
  },
  2: {
    geschiedenis:
      'Twaalf jaar later zoemt er een lopende band door een fabriekshal op industrieterrein Loven in Tilburg. Dertig mensen in witte jassen herhalen elk hun eigen handeling, duizenden keren per dag. Harrie, inmiddels directeur-eigenaar, loopt zeven dagen per week over de vloer en groet iedereen bij naam, of denkt dat hij dat nog kan.',
    uitdagingen:
      'Het ziekteverzuim kruipt omhoog, net als de klok van de productieteller boven de band. Niemand maakt meer een hele kroket; iedereen doet hetzelfde ene gebaar, de hele dag. Gerrit, nu ploegbaas, roept steeds vaker "sneller" naar een ploeg die hem steeds minder hoort.',
    hint: 'Een lopende band verdeelt het werk in stukjes. Vraag je af wat er gebeurt met het gevoel een vak te beheersen, wanneer niemand meer een heel product in zijn handen houdt, en wie dat het eerst voelt.',
    opdracht:
      'Jullie sturen het MT van de fabriek. Onderzoek, kies twee interventies, verdeel het budget. Conceptinterventies — inhoud en gewichten zijn nog niet getoetst.',
  },
  3: {
    geschiedenis:
      'Drie vestigingen nu: Tilburg, Waalwijk, Dongen. Harrie is 54 en voelt voor het eerst dat hij niet overal tegelijk kan zijn. Aan de ene kant van de tafel zit zijn dochter Sanne, 32, die elk proces in de fabriek kent omdat ze er letterlijk in is opgegroeid. Aan de andere kant zijn zoon Marco, net dertig, met een gloednieuw pak en een stem die nooit twijfelt.',
    uitdagingen:
      'De vestigingen gaan steeds meer hun eigen gang; het hoofdkantoor in Tilburg ziet de cijfers pas als het al te laat is om bij te sturen. En er hangt een vraag boven de tafel die niemand hardop stelt: wie neemt het straks over, en op basis waarvan beslist een vader dat eigenlijk?',
    hint: 'Wie het langst heeft meegedraaid, is niet vanzelfsprekend wie het hardst zijn stem verheft. Let op wie er aan deze tafel zwijgt, en waarom.',
    opdracht:
      'Jullie sturen het MT. Na dit deel kiest het team wie Harrie opvolgt — die keuze wordt opgeslagen voor latere afleveringen (gevolgen: TODO in data).',
  },
  4: {
    geschiedenis:
      'Van Gorp Drones, Vossenberg, Tilburg. Geen lopende band meer, maar robotarmen en schermen vol grafieken. Sturingssysteem TEMPO bepaalt het tempo op de vloer tot op de seconde, algoritme PILOT fluistert de leiding advies in het oor. Harrie is 71, president-commissaris, en zit zaterdagavond aan zijn eigen verjaardagstaart terwijl niemand aan tafel van zijn telefoon opkijkt.',
    uitdagingen:
      'Maandagochtend, 09:14 uur. Het verzuim is weer gestegen. Ploegleider Ans weet \'s ochtends niet wat de norm die dag wordt. En ergens in een la ligt de eerste order voor een defensietoepassing, nog ongeopend. Marco wil vrijdag een plan zien, en maar 1,5 miljoen euro om het mee te betalen.',
    hint: 'Een dashboard laat precies zien wat het meet, en niets van wat het mist. Vraag bij elk getal: wie heeft dit ingevoerd, en wie komt er in deze cijfers helemaal niet voor?',
    opdracht:
      'Jullie vormen samen het managementteam (MT) van Van Gorp Drones. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies en verdelen jullie het budget. Voor onderzoek en besluit samen hebben jullie ongeveer tien minuten.',
  },
  5: {
    geschiedenis:
      'Een glazen toren in de Spoorzone van Tilburg, duizenden medewerkers, divisies die niemand meer allemaal kan opnoemen. Harrie is er niet meer. In zijn testament stond één zin die iemand heeft doorgestreept, en niemand weet nog precies wie.',
    uitdagingen:
      'De erfgenamen zitten tegenover elkaar aan een tafel die veel te groot aanvoelt voor wat er nog over is van de familie. Een investeerder wacht ongeduldig op antwoord. En ergens, in een schuur in Berkel-Enschot die niemand meer heeft bezocht, ligt nog altijd het oorspronkelijke receptschrift.',
    hint: 'Een bedrijf dat alles kan meten, is onderweg iets kwijtgeraakt dat zich niet laat meten. Vraag je af: wat is er nog over van waarmee dit ooit, in een schuur, is begonnen?',
    opdracht:
      'Jullie sturen het MT van de holding. Conceptskelet: interventies en uitkomsten zijn nog niet definitief.',
  },
};

export const INTRO_BEELD: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'I1',
  2: 'I2',
  3: 'I3',
  4: 'T4',
  5: 'I5',
};
