export const DIMENSION_IDS = [
  "systeemkritiek",
  "balans",
  "doorvragen",
  "actie",
  "tolerantie",
  "zelfverdenking",
];

export const DIMENSIONS = [
  {
    id: "systeemkritiek",
    naam: "Systeemkritiek",
    subtitel: "incl. AI",
    beeld: "raster",
    kleur: "#1B2A4A",
    stellingen: [
      {
        id: 1,
        tekst: "Ik neem een advies van een protocol sneller aan dan een advies van een collega.",
        omgekeerd: true,
      },
      {
        id: 2,
        tekst: "Als een AI-systeem een aanbeveling doet, vraag ik mezelf af waarop die gebaseerd is, voordat ik hem overneem.",
        omgekeerd: false,
      },
      {
        id: 3,
        tekst: "Ik durf een gangbare werkwijze in mijn organisatie ter discussie te stellen.",
        omgekeerd: false,
      },
    ],
  },
  {
    id: "balans",
    naam: "Balans wantrouwen-vertrouwen",
    subtitel: null,
    beeld: "weegschaal",
    kleur: "#3D5A80",
    stellingen: [
      {
        id: 4,
        tekst: "Ik geef mensen het voordeel van de twijfel, ook als iets vreemd overkomt.",
        omgekeerd: false,
      },
      {
        id: 5,
        tekst: "Als iemand van de norm afwijkt, ga ik er eerder van uit dat er een goede reden is dan dat er iets mis is.",
        omgekeerd: false,
      },
      {
        id: 6,
        tekst: "Ik vertrouw sneller op mijn eerste indruk dan ik eigenlijk zou willen toegeven.",
        omgekeerd: true,
      },
    ],
  },
  {
    id: "doorvragen",
    naam: "Doorvragen & doordenken",
    subtitel: null,
    beeld: "pad",
    kleur: "#5C6B8A",
    stellingen: [
      {
        id: 7,
        tekst: "Bij een vermoeden stel ik mezelf minstens één vraag extra voordat ik het loslaat.",
        omgekeerd: false,
      },
      {
        id: 8,
        tekst: "Ik stop niet bij de eerste verklaring die aannemelijk klinkt.",
        omgekeerd: false,
      },
      {
        id: 9,
        tekst: "Ik zoek liever naar het ongemakkelijke antwoord dan naar het geruststellende.",
        omgekeerd: false,
      },
    ],
  },
  {
    id: "actie",
    naam: "Actie na twijfel",
    subtitel: null,
    beeld: "deur",
    kleur: "#D97757",
    stellingen: [
      {
        id: 10,
        tekst: "Als ik iets vreemd vind, kaart ik dat ook daadwerkelijk aan.",
        omgekeerd: false,
      },
      {
        id: 11,
        tekst: "Ik laat twijfel niet alleen intern rondzingen — ik doe er iets mee.",
        omgekeerd: false,
      },
      {
        id: 12,
        tekst: "Ik durf mijn twijfel uit te spreken, ook als ik de enige ben die iets ziet.",
        omgekeerd: false,
      },
    ],
  },
  {
    id: "tolerantie",
    naam: "Tolerantie voor ongemak",
    subtitel: null,
    beeld: "golven",
    kleur: "#B8BCC2",
    stellingen: [
      {
        id: 13,
        tekst: "Ik kan de spanning verdragen die ontstaat als ik iemand anders bevraag.",
        omgekeerd: false,
      },
      {
        id: 14,
        tekst: "Het maakt me niet te veel uit als mijn twijfel het gesprek ongemakkelijk maakt.",
        omgekeerd: false,
      },
      {
        id: 15,
        tekst: "Ik trek me terug uit een discussie zodra die ongemakkelijk wordt.",
        omgekeerd: true,
      },
    ],
  },
  {
    id: "zelfverdenking",
    naam: "Zelfverdenking",
    subtitel: null,
    beeld: "spiegel",
    kleur: "#D9A441",
    stellingen: [
      {
        id: 16,
        tekst: "Ik twijfel net zo makkelijk aan mijn eigen aannames als aan die van een ander.",
        omgekeerd: false,
      },
      {
        id: 17,
        tekst: "Als ik ergens zeker van ben, vraag ik mezelf af waar die zekerheid vandaan komt.",
        omgekeerd: false,
      },
      {
        id: 18,
        tekst: "Ik ben bereid om terug te komen op een standpunt, ook als dat me iets kost.",
        omgekeerd: false,
      },
    ],
  },
];

export const LIKERT_LABELS = {
  1: "Helemaal oneens",
  2: "Oneens",
  3: "Neutraal",
  4: "Eens",
  5: "Helemaal eens",
};

export const ARCHETYPES = {
  bevestiger: {
    id: "bevestiger",
    naam: "De Bevestiger",
    beschrijving:
      "Je neemt veel aan wat gegeven is — protocollen, gewoontes, eerste indrukken. Dat geeft rust, maar verdenken begint bij het durven kijken achter het eerste beeld.",
    kleur: "#B8BCC2",
  },
  twijfelaar: {
    id: "twijfelaar",
    naam: "De Twijfelaar",
    beschrijving:
      "Je ziet veel en denkt diep na — maar de stap naar actie blijft soms achter. Je twijfel is scherp; het uitspreken ervan is je volgende horizon.",
    kleur: "#5C6B8A",
  },
  onderzoeker: {
    id: "onderzoeker",
    naam: "De Onderzoeker",
    beschrijving:
      "Twijfel wordt bij jou vakmanschap: je doorvraagt, handelt en kijkt ook naar jezelf. Je bent niet bang voor het ongemakkelijke antwoord.",
    kleur: "#D9A441",
  },
  vermijder: {
    id: "vermijder",
    naam: "De Vermijder",
    beschrijving:
      "Je ziet het wel — maar ontwijkt de confrontatie als het ongemakkelijk wordt. Kleine stappen in het gesprek kunnen grote verschillen maken.",
    kleur: "#D97757",
  },
};

export const MICRO_ACTIES = {
  systeemkritiek: {
    midden: "vraag bij je volgende AI-advies bewust: waar baseert dit zich op?",
    laag: "kies één gangbare werkwijze en stel de vraag: waarom doen we dit zo?",
  },
  balans: {
    midden: "geef bij je volgende ontmoeting iemand bewust het voordeel van de twijfel.",
    laag: "schrijf op wat je eerste indruk was — en wat je zou zien als je langer kijkt.",
  },
  doorvragen: {
    midden: "stel bij je volgende twijfel bewust één vraag extra, voordat je het loslaat.",
    laag: "vraag bij het volgende nieuwsbericht: wat zou het tegenovergestelde verhaal zijn?",
  },
  actie: {
    midden: "deel je twijfel deze week met één persoon — niet om te klagen, maar om te verkennen.",
    laag: "kaart één klein ding aan dat je vreemd vindt, ook als het ongemakkelijk voelt.",
  },
  tolerantie: {
    midden: "blijf één minuut langer in een ongemakkelijk gesprek dan je instinct zegt.",
    laag: "merk op wanneer je weg wilt — en blijf nog even zitten.",
  },
  zelfverdenking: {
    midden: "vraag jezelf bij een stellige mening: waar komt mijn zekerheid vandaan?",
    laag: "kies één overtuiging en zoek bewust naar een tegenargument.",
  },
};
