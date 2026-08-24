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
  "fasemodel van Bruce Tuckman (1965), het onderscheid tussen groep en team van " +
  "Katzenbach & Smith (1993, The Wisdom of Teams) en Hackman & Wageman's Team " +
  "Effectiveness Conditions (Harvard University), geplaatst binnen de vier dimensies " +
  "van effectieve teams van Van der Schoor & Van de Wiel (2013, Teams van de toekomst).";

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
      vraag: "Bestaat dit team omdat de leden elkaar echt nodig hebben om het doel te bereiken — of zijn jullie vooral een verzameling mensen die toevallig hetzelfde project doen?",
      toelichting:
        "Deze vraag doet ertoe: een meta-analyse van De Jong, Dirks & Gillespie (2016, " +
        "112 studies, 7.700+ teams) laat zien dat vertrouwen zwaarder weegt naarmate " +
        "teamleden meer van elkaar afhankelijk zijn.",
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

export const tuckmanTyperingen = {
  forming: {
    titel: "Het eerste kennismakingsgevoel",
    tekst: "Iedereen is nog beleefd en voorzichtig. We stellen ons voor, tasten af hoe de ander werkt, en niemand wil als eerste een verkeerde toon zetten. Er is veel gevraag naar duidelijkheid — wat gaan we doen, wie doet wat — en de teamleider wordt vooral gevolgd, niet uitgedaagd. Het voelt nog wat afstandelijk, alsof we allemaal ons beste gedrag laten zien.",
  },
  storming: {
    titel: "De confrontatiefase",
    tekst: "De beleefdheid begint te schuren. Er ontstaan meningsverschillen over de aanpak, over rollen, soms ook persoonlijk. Sommige mensen trekken zich terug, anderen worden juist feller. Er wordt getest wie waar staat, wie de leiding pakt, wie zich laat gelden. Het voelt ongemakkelijk — en dat is precies waarom het soms vermeden wordt, terwijl het juist een teken van groei kan zijn.",
  },
  norming: {
    titel: "De fase van samen spelregels maken",
    tekst: "De scherpe kantjes zijn eraf. Er ontstaan ongeschreven regels: hoe we vergaderen, hoe we feedback geven, wie waarvoor verantwoordelijk is. Er groeit een gevoel van 'wij' — niet omdat het conflict weg is, maar omdat we weten hoe we ermee omgaan. Er is meer rust, meer voorspelbaarheid, en de teamleider hoeft minder te sturen.",
  },
  performing: {
    titel: "De fase van moeiteloos samenspel",
    tekst: "Het team draait. Rollen zijn helder én flexibel, er wordt gewisseld zonder gedoe. Conflict wordt niet vermeden maar juist gebruikt om scherper te worden. Er is vertrouwen, ook onder druk. De energie gaat naar het werk zelf, niet naar hoe we met elkaar omgaan — dat gaat vanzelf.",
  },
  adjourning: {
    titel: "De afrondingsfase",
    tekst: "Het project of de opdracht loopt op zijn eind, of het team gaat op de schop — nieuwe samenstelling, andere opdracht, ontbinding. Er is soms opluchting, soms weemoed. Mensen kijken al vooruit naar wat hierna komt, en de betrokkenheid bij de gezamenlijke taak neemt vanzelf af. Dit is een normale, vaak onderbelichte fase — niet elk team hoeft voor altijd te blijven bestaan.",
  },
};

export const tuckmanAdvies = {
  forming: {
    volgendeFase: "storming",
    advies:
      "Conflict niet langer vermijden maar toelaten — benoem spanningen expliciet in " +
      "plaats van ze glad te strijken. Storming voelt ongemakkelijk maar is een " +
      "noodzakelijke stap, geen mislukking.",
  },
  storming: {
    volgendeFase: "norming",
    advies:
      "Maak heldere, gedeelde afspraken over besluitvorming, communicatie en " +
      "rolverdeling — bijvoorbeeld een kort teamcontract waar iedereen input op geeft.",
  },
  norming: {
    volgendeFase: "performing",
    advies:
      "Geef het team meer ruimte en verantwoordelijkheid; treed als leider bewust meer " +
      "terug zodra het vertrouwen dat toelaat.",
  },
  performing: {
    volgendeFase: "performing",
    advies:
      "Blijf periodiek reflecteren en successen vieren; blijf alert op momenten die het " +
      "team terugduwen naar forming (nieuwe leden, reorganisatie, wisseling van doelen).",
  },
  adjourning: {
    volgendeFase: null,
    advies:
      "Vier bewust wat het team heeft bereikt, en geef ruimte voor afscheid nemen in " +
      "plaats van het project stilzwijgend te laten uitdoven. Als het team in een " +
      "nieuwe vorm verdergaat, begint de cyclus feitelijk weer bij forming — benoem dat " +
      "expliciet in plaats van te doen alsof er niets verandert.",
  },
  "gemengd beeld": {
    volgendeFase: null,
    advies:
      "Jullie antwoorden wijzen niet duidelijk op één fase — dat kan betekenen dat " +
      "verschillende onderdelen van het team in verschillende fasen zitten. Bespreek " +
      "samen welke van de vijf thema's hierboven het meest speelt.",
  },
};

export const tuckmanBron =
  "Gebaseerd op Tuckman's fasemodel van teamontwikkeling (Tuckman, 1965; Tuckman & " +
  "Jensen, 1977): forming, storming, norming, performing en adjourning.";

export const gallupNotitie =
  "Onderzoek van Gallup (2024, 183.806 teams) laat zien dat de teamleider tot 70% " +
  "van de teambetrokkenheid verklaart — de aanbeveling hierboven ligt dus voor een " +
  "groot deel in jouw handen.";
