/** Vaste metadata — UI-labels komen uit vertalingen.js (NL/EN) en i18n.js (DE/SV/CS) */

export const CATEGORIE_SLUGS = [
  "dagelijks-leven",
  "werk",
  "duurzaamheid",
  "diversiteit-inclusie",
  "social-media",
  "studentenleven",
  "zorg",
  "nucleaire-geneeskunde",
  "onderzoeksintegriteit",
  "onderwijs",
  "overheid",
];

export const MOEILIJKHEID_MIN = 1;
export const MOEILIJKHEID_MAX = 3;

/** 1 = micro, 2 = meso, 3 = macro */
export const COMPLEXITY_KEYS = ["micro", "meso", "macro"];

export const MOEILIJKHEID_TO_COMPLEXITY = {
  1: "micro",
  2: "meso",
  3: "macro",
};

export const COMPLEXITY_COLOR = "#993556";
export const ATTRIBUTION_COLOR = "#5f5e5a";

/** Categoriekleuren (v3.0 Conversation Card Generator) */
export const CATEGORIE_KLEUREN = {
  onderwijs: "#1a9080",
  werk: "#e05a1a",
  "dagelijks-leven": "#e0a01a",
  duurzaamheid: "#c0392b",
  "diversiteit-inclusie": "#27ae60",
  "social-media": "#e8820a",
  studentenleven: "#8e44ad",
  zorg: "#0f6e56",
  "nucleaire-geneeskunde": "#2563eb",
  onderzoeksintegriteit: "#7c3aed",
  overheid: "#185fa5",
};

export function getCategorieKleur(slug) {
  return CATEGORIE_KLEUREN[slug] ?? "#5f5e5a";
}

export function getCategorieKleurLicht(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.12)`;
}

export function getComplexityKey(moeilijkheid) {
  return MOEILIJKHEID_TO_COMPLEXITY[Number(moeilijkheid)] ?? "micro";
}

export const TAALNIVEAUS = ["A2", "B1", "B2", "C1"];

export const CARD_STATUSSEN = ["concept", "getest", "aanbevolen"];

export const CATEGORY_FROM_LEGACY = {
  "Dagelijks leven": "dagelijks-leven",
  "Daily life": "dagelijks-leven",
  Werk: "werk",
  Work: "werk",
  Duurzaamheid: "duurzaamheid",
  Sustainability: "duurzaamheid",
  "Diversiteit & Inclusie": "diversiteit-inclusie",
  "Diversity & Inclusion": "diversiteit-inclusie",
  "Social Media": "social-media",
  Studentenleven: "studentenleven",
  "Student life": "studentenleven",
  "Nuclear medicine": "nucleaire-geneeskunde",
  "Nucleaire geneeskunde": "nucleaire-geneeskunde",
  "Research integrity": "onderzoeksintegriteit",
  Onderzoeksintegriteit: "onderzoeksintegriteit",
};

export const TEASER_SET = {
  id: "morele-moed-teaser",
  stap: 4,
  downloads: {
    nl: {
      href: "/downloads/gesprekskaarten/GK_MM_Teaser_NL.docx",
      filename: "GK_MM_Teaser_NL.docx",
    },
    en: {
      href: "/downloads/gesprekskaarten/GK_MM_Teaser_EN.pdf",
      filename: "GK_MM_Teaser_EN.pdf",
    },
  },
};

export const STANDARD_VRAGEN = {
  nl: {
    vraag1: "Wat zou jij doen en waarom?",
    vraag2: "Welke waarden zijn hier in het spel?",
  },
  en: {
    vraag1: "What would you do, and why?",
    vraag2: "What values are at stake here?",
  },
};

/** Rough complexity for teaser import — review when editing cards */
export const TEASER_MOEILIJKHEID = [2, 3, 1, 2, 2, 3, 3, 2, 3, 2, 2, 2, 1, 2, 2];

export const TEASER_TAALNIVEAU = "B2";
