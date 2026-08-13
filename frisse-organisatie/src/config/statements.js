// De twaalf stellingen — drie per blad.
//
// STATUS: conceptformulering. De definitieve, gevalideerde formulering is een
// open beslissing vóór livegang (briefing §10). Alleen deze lijst aanpassen is
// genoeg; volgorde, scoring en resultaatscherm passen zich vanzelf aan.
//
// De volgorde hieronder is bewust afgewisseld (briefing §5, stap 2): drie rondes
// waarin de vier bladen steeds in een andere volgorde langskomen, zodat de scan
// niet als vier losse blokjes voelt. De volgorde is vast en niet willekeurig,
// zodat twee invullers exact dezelfde scan doorlopen.
//
// `reverse: true` markeert een negatief geformuleerde stelling (briefing §4):
// instemmen betekent dáár een lágere score. Per blad is er precies één, om
// "alles hoog invullen"-gedrag te dempen.

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
    text: "In deze organisatie durven mensen ongemakkelijke waarheden te benoemen.",
    reverse: false,
  },
  {
    id: "team-1",
    leafId: "team",
    text: "Conflicten worden hier besproken in plaats van vermeden.",
    reverse: false,
  },
  {
    id: "org-1",
    leafId: "organisatie",
    text: "Rollen en verantwoordelijkheden zijn hier helder belegd.",
    reverse: false,
  },
  {
    id: "lei-1",
    leafId: "leiderschap",
    text: "Leidinggevenden laten hier zien waar zij zelf voor staan, ook bij tegenslag.",
    reverse: false,
  },

  // Ronde 2 — hier staan de negatief geformuleerde stellingen
  {
    id: "team-2",
    leafId: "team",
    text: "Fouten toegeven aan elkaar voelt hier riskant.",
    reverse: true,
  },
  {
    id: "lei-2",
    leafId: "leiderschap",
    text: "Een leidinggevende hier aanspreken is niet zonder risico.",
    reverse: true,
  },
  {
    id: "int-2",
    leafId: "integriteit",
    text: "Als iemand hier een grens overschrijdt, blijft het meestal bij gepraat in de wandelgangen.",
    reverse: true,
  },
  {
    id: "org-2",
    leafId: "organisatie",
    text: "Veranderingen worden hier doorgevoerd voordat duidelijk is waarom.",
    reverse: true,
  },

  // Ronde 3
  {
    id: "org-3",
    leafId: "organisatie",
    text: "Deze organisatie leert structureel van eerdere fouten of incidenten.",
    reverse: false,
  },
  {
    id: "int-3",
    leafId: "integriteit",
    text: "Beslissingen worden hier consistent uitgelegd, ook als ze niet iedereen goed uitkomen.",
    reverse: false,
  },
  {
    id: "lei-3",
    leafId: "leiderschap",
    text: "Leidinggevenden maken hier tijd voor de mensen, niet alleen voor de resultaten.",
    reverse: false,
  },
  {
    id: "team-3",
    leafId: "team",
    text: "Teamleden weten wat ze aan elkaar hebben, ook onder druk.",
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
