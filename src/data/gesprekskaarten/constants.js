/** Vaste metadata — UI-labels komen uit vertalingen.js */

export const CATEGORIE_SLUGS = [
  "dagelijks-leven",
  "werk",
  "duurzaamheid",
  "diversiteit-inclusie",
  "social-media",
  "studentenleven",
  "zorg",
  "onderwijs",
  "overheid",
];

export const MOEILIJKHEID_MIN = 1;
export const MOEILIJKHEID_MAX = 3;

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
