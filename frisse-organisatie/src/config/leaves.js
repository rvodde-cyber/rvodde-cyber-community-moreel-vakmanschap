// De vier bladeren van het klavertje (briefing §4) met hun kleur, gekoppeld
// instrument en de kwalitatieve toelichtingen die op het scherm en in de PDF
// worden gebruikt. Bewust één bron: scherm, tooltip, aria-label en PDF lezen
// hier allemaal uit, zodat teksten niet uiteen kunnen lopen.

/**
 * @typedef {"vitaal" | "aandacht" | "urgent"} Band
 *
 * @typedef {object} Leaf
 * @property {string} id
 * @property {string} label
 * @property {string} color        basiskleur van het blad (hex)
 * @property {string} summary      één zin: waar gaat dit blad over
 * @property {Record<Band, string>} notes  1–2 zinnen toelichting per niveau
 * @property {{name: string, promise: string, href: string}} instrument
 */

/** @type {Leaf[]} */
export const leaves = [
  {
    id: "integriteit",
    label: "Integriteit & Ethiek",
    color: "#14B8A6",
    summary: "Of ongemakkelijke dingen hier benoembaar zijn, en of er iets mee gebeurt.",
    notes: {
      vitaal:
        "Mensen benoemen hier wat schuurt en dat wordt serieus genomen. Dit blad staat er op dit moment stevig bij.",
      aandacht:
        "Ongemakkelijke onderwerpen komen wel op tafel, maar niet vanzelfsprekend. Het loont om te kijken waar de rem zit.",
      urgent:
        "Wat niet klopt blijft hier vaak onbesproken of zonder gevolg. Dit domein vraagt als eerste aandacht.",
    },
    instrument: {
      name: "Morele Lakmoesproef",
      promise:
        "Een gesprek over concrete dilemma's uit uw eigen praktijk: wat vinden we hier eigenlijk normaal, en willen we dat ook?",
      href: "",
    },
  },
  {
    id: "team",
    label: "Team & Samenwerking",
    color: "#F59E0B",
    summary: "Of mensen hier op elkaar kunnen bouwen, ook als het spannend wordt.",
    notes: {
      vitaal:
        "Er is genoeg vertrouwen om het oneens te zijn en fouten toe te geven. De samenwerking houdt stand onder druk.",
      aandacht:
        "De samenwerking loopt, maar wrijving wordt eerder omzeild dan uitgesproken. Dat kost op termijn energie.",
      urgent:
        "Conflicten worden vermeden en fouten toegeven voelt riskant. Dit domein vraagt als eerste aandacht.",
    },
    instrument: {
      name: "Wisselwerking",
      promise:
        "Een teamkompas dat laat zien waar de samenwerking uit balans is en welke stap het team zelf kan zetten.",
      href: "",
    },
  },
  {
    id: "organisatie",
    label: "Organisatie & Structuur",
    color: "#6366F1",
    summary: "Of duidelijk is wie waarover gaat, en of de organisatie leert van wat misgaat.",
    notes: {
      vitaal:
        "Rollen zijn helder en veranderingen worden uitgelegd voordat ze landen. De structuur werkt mee in plaats van tegen.",
      aandacht:
        "De hoofdlijn staat, maar rond rollen en veranderingen ontstaat regelmatig ruis. Dat is te repareren.",
      urgent:
        "Onduidelijke rollen en onaangekondigde veranderingen kosten hier veel. Dit domein vraagt als eerste aandacht.",
    },
    instrument: {
      name: "Organisatieontwikkeling-tool",
      promise:
        "Een gestructureerde blik op rollen, besluitvorming en lerend vermogen — en op wat er als eerste vastloopt.",
      href: "",
    },
  },
  {
    id: "leiderschap",
    label: "Leiderschap",
    color: "#FB7185",
    summary: "Of leidinggevenden hier navolgbaar en aanspreekbaar zijn.",
    notes: {
      vitaal:
        "Leidinggevenden zijn navolgbaar in wat ze doen en aanspreekbaar op wat ze laten. Dat geeft rust in de organisatie.",
      aandacht:
        "De richting is er, maar aanspreekbaarheid en aandacht voor mensen staan onder druk. Daar valt winst te halen.",
      urgent:
        "Leidinggevenden zijn hier moeilijk aan te spreken of moeilijk te volgen. Dit domein vraagt als eerste aandacht.",
    },
    instrument: {
      name: "Leiderschapsontwikkeling-scan",
      promise:
        "Een spiegel voor leidinggevenden: wat zien anderen van uw afwegingen, en hoe aanspreekbaar bent u werkelijk?",
      href: "",
    },
  },
];

/** @type {Record<string, Leaf>} */
export const leafById = Object.fromEntries(leaves.map((leaf) => [leaf.id, leaf]));

export const leafIds = leaves.map((leaf) => leaf.id);
