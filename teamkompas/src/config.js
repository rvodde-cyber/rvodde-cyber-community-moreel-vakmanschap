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

export const ethischLeiderschap = {
  titel: "Ethisch leiderschap — een spiegel voor jezelf",
  intro:
    "Ethisch leiderschap vraagt om twee dingen tegelijk: zelf integer handelen, én dat " +
    "zichtbaar en bespreekbaar maken voor je team (Treviño; Heres, 2014). Onderzoek laat " +
    "zien dat leidinggevenden dit bij zichzelf vaak overschatten. Dit is geen toets — " +
    "niets wordt opgeslagen, gescoord of gedeeld. Alleen voor jezelf.",
  vragen: [
    "Is voor mijn team zichtbaar hoe ik omga met lastige ethische afwegingen, of gebeurt dat vooral achter de schermen?",
    "Bespreek ik integriteits- of ethische kwesties expliciet met mijn team, of komt het alleen ter sprake als het al misgaat?",
    "Reageer ik zichtbaar en consistent als iemand een grens overschrijdt, ook als dat ongemakkelijk is?",
    "Nodig ik actief tegenspraak uit, of merk ik dat mensen hun twijfels liever voor zich houden?",
    "Is er een principe waar ik middenin sta, waarvan ik weet dat vasthouden eraan me iets zou kunnen kosten — en houd ik het toch overeind?",
  ],
  bron:
    "Gebaseerd op onderzoek naar ethisch leiderschap van Treviño en Heres (VU/Universiteit " +
    "Utrecht/Erasmus Universiteit, 2014 e.v.), en op Kidder's definitie van morele moed " +
    "(2005): principe, risico, en het bewust doorstaan daarvan.",
};
