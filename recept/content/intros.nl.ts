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
      'Het ruikt naar warm deeg en nat gras. In de schuur achter zijn ouderlijk huis in Berkel-Enschot staat Harrie van Gorp, negenentwintig jaar oud, tot zijn ellebogen in het deeg. Zijn vriendin Lies houdt de kas bij op de keukentafel, slager Gerrit levert het vlees en kent het recept beter dan Harrie zelf, en vier buren komen bijspringen als het druk wordt. De telefoon, een enkel toestel aan de muur, gaat de laatste weken bijna de hele avond. Bij de notaris is vastgelegd dat jullie het laatste woord hebben over het budget.',
    uitdagingen:
      'Vanmiddag belde een inkoper van een supermarktketen. Tien keer het normale volume, te leveren over zes weken. Harrie wil meteen ja zeggen. Lies heeft het nog niet gehoord. Twee buren hebben zich ziek gemeld, en de schuur telt precies acht vierkante meter werkruimte.',
    hint: 'Let op wat er aan de familietafel wordt gezegd en wat niet. Wie is erbij, en wie kan niet meebeslissen? Ook wat niet wordt gezegd, heeft invloed.',
    opdracht:
      'Jullie zijn de jongere zus van Harrie. Jullie werken op de achtergrond, maar hebben het laatste woord over het budget. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies binnen jullie budgetpunten en schrijven jullie op waarom.',
  },
  2: {
    geschiedenis:
      'Twaalf jaar later zoemt er een lopende band door een fabriekshal op industrieterrein Loven in Tilburg. Naast de hal staat een eigen werkplaats: daar worden de machines gerepareerd en verbeterd. Dertig mensen in witte jassen herhalen elk hun eigen handeling, duizenden keren per dag. Harrie, inmiddels directeur-eigenaar, loopt zeven dagen per week over de vloer en groet iedereen bij naam, of denkt dat hij dat nog kan.',
    uitdagingen:
      'Het ziekteverzuim kruipt omhoog, net als de klok van de productieteller boven de band. Niemand maakt meer een heel worstenbroodje; iedereen doet hetzelfde ene gebaar, de hele dag. Gerrit, nu ploegbaas, roept steeds vaker "sneller" naar een ploeg die hem steeds minder hoort.',
    hint: 'Eerst maakte je als medewerker een compleet worstenbroodje, waar je trots op kon zijn. Nu is je werk teruggebracht tot steeds dezelfde handeling aan een lopende band. Bedenk eens wat dat met mensen doet.',
    opdracht:
      'Jullie zijn de jongere zus van Harrie. Jullie werken op de achtergrond, maar hebben het laatste woord over het budget. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies binnen jullie budgetpunten en schrijven jullie op waarom.',
  },
  3: {
    geschiedenis:
      'Drie vestigingen nu: Tilburg, Waalwijk, Dongen. Harrie is 54 en voelt voor het eerst dat hij niet overal tegelijk kan zijn. Net is Van Gorp Machinebouw B.V. opgericht: de eigen werkplaats van het bedrijf is een zelfstandige onderneming geworden, met een eigen directeur en eigen cijfers. Aan de ene kant van de tafel zit zijn dochter Sanne, 32, die elk proces in de fabriek kent omdat ze er letterlijk in is opgegroeid. Aan de andere kant zijn zoon Marco, net dertig, met een gloednieuw pak en een stem die nooit twijfelt.',
    uitdagingen:
      'De vestigingen gaan steeds meer hun eigen gang; het hoofdkantoor in Tilburg ziet de cijfers pas als het al te laat is om bij te sturen. En er hangt een vraag boven de tafel die niemand hardop stelt: wie neemt het straks over, en op basis waarvan beslist een vader dat eigenlijk?',
    hint: 'Aan de vergadertafel praten sommige mensen veel en zwijgen anderen. Bedenk eens waarom iemand zwijgt, en wat jullie daardoor niet te horen krijgen.',
    opdracht:
      'Jullie zijn de jongere zus van Harrie. Jullie werken op de achtergrond, maar hebben het laatste woord over het budget. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies binnen jullie budgetpunten en schrijven jullie op waarom.',
  },
  4: {
    geschiedenis:
      'Van Gorp Drones, Vossenberg, Tilburg. Geen lopende band meer, maar robotarmen en schermen vol grafieken. Sturingssysteem TEMPO bepaalt het tempo op de vloer tot op de seconde, algoritme PILOT fluistert de leiding advies in het oor. Harrie is 71, president-commissaris, en zit zaterdagavond aan zijn eigen verjaardagstaart terwijl niemand aan tafel van zijn telefoon opkijkt.',
    uitdagingen:
      'Maandagochtend, 09:14 uur. Het verzuim is weer gestegen. Ploegleider Ans weet \'s ochtends niet wat de norm die dag wordt. En ergens in een la ligt de eerste order voor een defensietoepassing, nog ongeopend. Marco wil vrijdag een plan zien, en maar 1,5 miljoen euro om het mee te betalen.',
    hint: 'Het dashboard laat cijfers zien. Bedenk eens wie die cijfers heeft ingevoerd, en wie er in deze cijfers niet in voorkomt.',
    opdracht:
      'Jullie zijn de jongere zus van Harrie. Jullie werken op de achtergrond, maar hebben het laatste woord over het budget. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies binnen jullie budgetpunten en schrijven jullie op waarom.',
  },
  5: {
    geschiedenis:
      'Een glazen toren in de Spoorzone van Tilburg, duizenden medewerkers, divisies die niemand meer allemaal kan opnoemen. Harrie is er niet meer. In zijn testament stond één zin die iemand heeft doorgestreept, en niemand weet nog precies wie.',
    uitdagingen:
      'De erfgenamen zitten tegenover elkaar aan een tafel die veel te groot aanvoelt voor wat er nog over is van de familie. Een investeerder wacht ongeduldig op antwoord. En ergens, in een schuur in Berkel-Enschot die niemand meer heeft bezocht, ligt nog altijd het oorspronkelijke receptschrift.',
    hint: 'In dit bedrijf wordt alles gemeten. Bedenk eens wat zich niet laat meten, en wat daarvan nog over is sinds de schuur.',
    opdracht:
      'Jullie zijn de jongere zus van Harrie. Jullie werken op de achtergrond, maar hebben het laatste woord over het budget. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies binnen jullie budgetpunten en schrijven jullie op waarom.',
  },
};

export const INTRO_BEELD: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'I1',
  2: 'I2',
  3: 'I3',
  4: 'T4',
  5: 'I5',
};
