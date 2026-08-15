// De twintig stellingen — vijf per blad, waarvan er per blad precies één
// omgekeerd scoort om "alles hoog invullen"-gedrag te dempen.
//
// De formulering is per blad geïnspireerd op een gevalideerd instrument uit de
// organisatiepsychologie of bedrijfsethiek — niet letterlijk overgenomen, maar
// inhoudelijk herleidbaar. De bronnen staan bij het betreffende blad in
// ./leaves.js.
//
// De volgorde hieronder is bewust afgewisseld: vijf rondes waarin de vier
// bladen steeds in een andere volgorde langskomen, zodat de scan niet als vier
// losse blokjes voelt. De volgorde is vast en niet willekeurig, zodat elke
// invuller exact dezelfde scan doorloopt — en de deel-codes onderling
// vergelijkbaar blijven.
//
// `reverse: true` markeert een negatief geformuleerde stelling: instemmen
// betekent dáár een lágere score (score' = 6 − score). De vier omgekeerde
// stellingen staan bewust verspreid over de lijst en nooit naast elkaar; een
// blokje negatieve stellingen valt op en nodigt uit tot doorklikken.

/**
 * @typedef {object} Statement
 * @property {string} id
 * @property {string} leafId
 * @property {string} text
 * @property {boolean} reverse
 */

/** @type {Statement[]} */
export const statements = [
  // Ronde 1
  {
    id: "int-1",
    leafId: "integriteit",
    text: "Als hier iets misgaat, wordt dat eerlijk benoemd in plaats van goedgepraat.",
    reverse: false,
  },
  {
    id: "team-1",
    leafId: "team",
    text: "Fouten maken wordt in dit team gezien als iets om van te leren, niet om af te straffen.",
    reverse: false,
  },
  {
    id: "org-1",
    leafId: "organisatie",
    text: "Rollen en verantwoordelijkheden zijn hier helder belegd: mensen weten wat er van hen verwacht wordt.",
    reverse: false,
  },
  {
    id: "lei-1",
    leafId: "leiderschap",
    text: "Leidinggevenden laten hier zien waar ze zelf voor staan, ook bij tegenslag.",
    reverse: false,
  },

  // Ronde 2
  {
    id: "team-3",
    leafId: "team",
    text: "Een fout die je maakt, wordt je hier lang nagedragen.",
    reverse: true,
  },
  {
    id: "lei-2",
    leafId: "leiderschap",
    text: "Je kunt een leidinggevende aanspreken zonder dat dat risico voor je oplevert.",
    reverse: false,
  },
  {
    id: "int-2",
    leafId: "integriteit",
    text: "Leidinggevenden doen zelf wat ze van anderen verwachten op het gebied van integriteit.",
    reverse: false,
  },
  {
    id: "org-2",
    leafId: "organisatie",
    text: "Veranderingen worden hier goed uitgelegd voordat ze worden doorgevoerd.",
    reverse: false,
  },

  // Ronde 3
  {
    id: "lei-3",
    leafId: "leiderschap",
    text: "Leidinggevenden reageren defensief als je ze aanspreekt op hun gedrag.",
    reverse: true,
  },
  {
    id: "int-4",
    leafId: "integriteit",
    text: "Als je ongewenst gedrag aankaart, hoef je niet bang te zijn voor de gevolgen.",
    reverse: false,
  },
  {
    id: "team-2",
    leafId: "team",
    text: "Dit team weet waar het samen naartoe werkt.",
    reverse: false,
  },
  {
    id: "org-3",
    leafId: "organisatie",
    text: "Het is vaak onduidelijk wie waarvoor verantwoordelijk is.",
    reverse: true,
  },

  // Ronde 4
  {
    id: "int-5",
    leafId: "integriteit",
    text: "Als iemand een grens overschrijdt, wordt daar op een eerlijke en consequente manier iets mee gedaan.",
    reverse: false,
  },
  {
    id: "org-4",
    leafId: "organisatie",
    text: "Er is voldoende vertrouwen dat deze organisatie noodzakelijke veranderingen ook echt kan doorvoeren.",
    reverse: false,
  },
  {
    id: "team-4",
    leafId: "team",
    text: "Het is veilig om binnen dit team een risico te nemen.",
    reverse: false,
  },
  {
    id: "lei-4",
    leafId: "leiderschap",
    text: "Leidinggevenden geven eerlijk toe wanneer ze zelf een fout maken.",
    reverse: false,
  },

  // Ronde 5
  {
    id: "int-3",
    leafId: "integriteit",
    text: "Kritiek op hoe beslissingen genomen worden, wordt hier liever niet gehoord.",
    reverse: true,
  },
  {
    id: "team-5",
    leafId: "team",
    text: "Om hulp vragen aan een collega voelt hier vanzelfsprekend.",
    reverse: false,
  },
  {
    id: "lei-5",
    leafId: "leiderschap",
    text: "Leidinggevenden weten het team te motiveren voor een gezamenlijke koers.",
    reverse: false,
  },
  {
    id: "org-5",
    leafId: "organisatie",
    text: "De organisatie leert structureel van eerdere fouten of incidenten.",
    reverse: false,
  },
];

// Antwoordschaal 1–5. De labels staan hier zodat ze in één keer te herzien zijn.
export const scaleOptions = [
  { value: 1, label: "Helemaal mee oneens", short: "Oneens" },
  { value: 2, label: "Mee oneens", short: "Beetje oneens" },
  { value: 3, label: "Neutraal", short: "Neutraal" },
  { value: 4, label: "Mee eens", short: "Beetje eens" },
  { value: 5, label: "Helemaal mee eens", short: "Eens" },
];

export const MIN_ANSWER = 1;
export const MAX_ANSWER = 5;
