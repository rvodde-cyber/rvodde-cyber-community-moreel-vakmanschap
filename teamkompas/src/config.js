// TeamKompas — config.js
// Bronvermelding (verplicht zichtbaar in de intro):
// Geïnspireerd op het Teamwiel van Vroemen (Vroemen & Vroemen, 2009, "Team op vleugels",
// Amsterdam University Press) — 6 succesfactoren die in balans leiden tot geïnspireerd
// samenwerken — gecombineerd met het fasemodel van teamontwikkeling van Bruce Tuckman (1965).

export const framing = {
  onderwijs: {
    appTitle: "Wisselwerking",
    teamScanTitle: (orgName) => `Teamscan ${orgName}`,
    introText:
      "Een kompas voor teamontwikkeling, gebaseerd op het Teamwiel van Vroemen.",
  },
  zakelijk: {
    appTitle: "Wisselwerking",
    teamScanTitle: (orgName) => `Teamscan ${orgName}`,
    introText:
      "Inzicht in de balans van uw team, gebaseerd op het Teamwiel van Vroemen.",
  },
};

export const activeFraming = "onderwijs"; // wissel hier tussen 'onderwijs' | 'zakelijk'

export const colors = {
  surface: "#FFFFFF",
  surface2: "#FBF8F4",
  dotsLight: "#FBD9A0",
  dotsStrong: "#C9791C",
  hubFill: "#C9791C",
  hubRing: "#E3A65C",
  projectionBg: "#231F1A",   // pas in sessie 3 nodig, alvast vastleggen
  projectionText: "#F5F1EC",
  labelAccent: "#8A4B0F",
};

export const fonts = {
  voice: "'Source Serif Pro', Georgia, serif", // titels en reflectievragen
  ui: "'Inter', -apple-system, sans-serif",     // labels, knoppen
};

export const wheelGeometry = {
  viewBox: "-40 -40 680 680",
  center: { x: 300, y: 300 },
  hubRadius: 70,
  rimRadius: 235,
  rimStrokeWidth: 14,
  spokeWidth: 10,
  knobRadius: 22,
  knobPositionRadius: 220,
  knobTravelMinRadius: 88,
  knobTravelMaxRadius: 225,
  factorLabelRadius: 280,
  resultLabelRadius: 235,
};

export const welkom = {
  titel: "Welkom bij Wisselwerking",
  tekst: "Ontdek in een paar minuten waar jullie team staat — en wat er nodig is voor de volgende stap.",
};

export const bronvermelding =
  "Geïnspireerd op het Teamwiel van Vroemen (Vroemen & Vroemen, 2009, " +
  '"Team op vleugels", Amsterdam University Press), gecombineerd met het ' +
  "fasemodel van teamontwikkeling van Bruce Tuckman (1965) en het onderscheid " +
  "tussen groep en team van Katzenbach & Smith (1993, The Wisdom of Teams).";

export const metafoor = {
  titel: "Groep of team?",
  tekst:
    "Sprinters lopen naast elkaar, ieder voor het eigen resultaat. Een estafetteteam " +
    "wint of verliest samen — het stokje moet worden doorgegeven, en pas de laatste " +
    "loper over de finish bepaalt het teamresultaat. Dat is het verschil tussen een " +
    "groep en een team (Katzenbach & Smith, 1993).",
};

export const scanThreshold = 5; // pas in sessie 2 nodig (teamscan), alvast vastleggen

export const fundament = {
  titel: "Het fundament onder de dynamiek",
  intro:
    "Van der Schoor & Van de Wiel (2013) onderscheiden vier dimensies van effectieve " +
    "teams: bestaansrecht, inrichting, dynamiek en omgeving. Het teamwiel hierna gaat " +
    "over dynamiek — hoe jullie samenwerken. Deze drie korte vragen gaan over het " +
    "fundament daaronder. Niet verplicht, niet gescoord, niet opgeslagen.",
  vragen: [
    {
      dimensie: "Bestaansrecht",
      vraag: "Waarom bestaat dit team, en is dat voor iedereen nog steeds duidelijk?",
    },
    {
      dimensie: "Inrichting",
      vraag: "Past de manier waarop we georganiseerd zijn — rollen, verantwoordelijkheden, overlegstructuur — nog bij wat het team moet doen?",
    },
    {
      dimensie: "Omgeving",
      vraag: "Welke ontwikkelingen buiten het team — in de organisatie, bij klanten, technologisch — hebben op dit moment de meeste invloed op ons?",
    },
  ],
  bron:
    "Van der Schoor, J. & Van de Wiel, G. (2013). Teams van de toekomst: " +
    "Leidinggeven aan het nieuwe samenwerken. Academic Service (BIM Media).",
};

export const ethischLeiderschap = {
  titel: "Ethisch leiderschap — een spiegel voor jezelf",
  intro:
    "Ethisch leiderschap vraagt om twee dingen tegelijk: zelf integer handelen, én dat " +
    "zichtbaar en bespreekbaar maken voor je team (Treviño; Brown, Treviño & Harrison, " +
    "2005). Onderzoek laat zien dat leidinggevenden dit bij zichzelf vaak overschatten " +
    "(Heres). Dit is geen toets — niets wordt opgeslagen, gescoord of gedeeld. Alleen voor jezelf.",
  vragen: [
    "Sta ik voor mezelf stil bij de ethische afwegingen die ik maak, ook als niemand daarom vraagt?",
    "Is voor mijn team zichtbaar hoe ik omga met lastige ethische afwegingen, of gebeurt dat vooral achter de schermen?",
    "Bespreek ik integriteits- of ethische kwesties expliciet met mijn team, of komt het alleen ter sprake als het al misgaat?",
    "Reageer ik zichtbaar en consistent als iemand een grens overschrijdt, ook als dat ongemakkelijk is?",
    "Ondersteun ik actief de kaders en afspraken die er al zijn (gedragscodes, procedures), of laat ik die vooral links liggen tot er iets misgaat?",
    "Als iemand in mijn team iets zou willen melden dat niet klopt, hoe zeker weet ik dat diegene dat bij mij zou durven doen?",
    "Is er een principe waar ik middenin sta, waarvan ik weet dat vasthouden eraan me iets zou kunnen kosten — en houd ik het toch overeind? Geldt voor mij hetzelfde patroon als wat er in het teamwiel naar boven kwam bij 'Respect voor verschillen' of 'Gedeelde verantwoordelijkheid'?",
  ],
  bron:
    "Gebaseerd op het onderscheid tussen moreel persoon en moreel manager (Treviño; Brown, " +
    "Treviño & Harrison, 2005) en op de praktijken van zichtbaar ethisch leiderschap uit " +
    "onderzoek van Heres (Universiteit Utrecht/VU/Erasmus Universiteit, 2014 e.v.), " +
    "aangevuld met Kidder's definitie van morele moed (2005): principe, risico, en het " +
    "bewust doorstaan daarvan. Brown, Treviño & Harrison (2005) tonen aan dat ethisch " +
    "leiderschap direct samenhangt met de meldingsbereidheid van medewerkers.",
};
