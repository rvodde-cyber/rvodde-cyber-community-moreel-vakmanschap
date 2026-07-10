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
  knobTravelMinRadius: 95,
  knobTravelMaxRadius: 218,
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
