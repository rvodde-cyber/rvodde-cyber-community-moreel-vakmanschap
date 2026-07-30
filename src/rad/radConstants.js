/**
 * Vaste configuratie voor "Rad van Moreel Fortuin".
 *
 * Focus: Zien & Voelen. Geen scores, geen oordeel — alleen spanning
 * zichtbaar maken, laten voelen en het gesprek activeren.
 */

/** Fasen van de spelflow (state machine). */
export const PHASES = {
  HOME: "home",
  SETUP: "setup",
  WHEEL: "wheel",
  DILEMMA: "dilemma",
  PERSPECTIVE: "perspective",
  TIMER: "timer",
  REFLECTION: "reflection",
};

/**
 * Rad-segmenten: morele waarden/spanningsvelden. Het rad kiest een
 * "morele lens" waardoor de groep het dilemma extra moet wegen.
 * Kleuren sluiten aan op de warme, editorial huisstijl.
 */
export const WHEEL_SEGMENTS = [
  { id: "loyaliteit", nl: "Loyaliteit", en: "Loyalty", color: "#993c1d" },
  { id: "rechtvaardigheid", nl: "Rechtvaardigheid", en: "Justice", color: "#185fa5" },
  { id: "moed", nl: "Moed", en: "Courage", color: "#993556" },
  { id: "publiek-belang", nl: "Publiek belang", en: "Public interest", color: "#0f6e56" },
  { id: "geheimhouding", nl: "Geheimhouding", en: "Confidentiality", color: "#534ab7" },
  { id: "empathie", nl: "Empathie", en: "Empathy", color: "#c0392b" },
  { id: "macht", nl: "Macht", en: "Power", color: "#854f0b" },
  { id: "veiligheid", nl: "Veiligheid", en: "Safety", color: "#1a9080" },
];

/** Perspectieven voor de perspectief-injectie (random getrokken). */
export const PERSPECTIVES = [
  { id: "medewerker", nl: "de medewerker", en: "the employee" },
  { id: "leidinggevende", nl: "de leidinggevende", en: "the manager" },
  { id: "burger", nl: "de burger", en: "the citizen" },
  { id: "vriend", nl: "de vriend(in)", en: "the friend" },
  { id: "student", nl: "de student", en: "the student" },
  { id: "slachtoffer", nl: "het slachtoffer", en: "the victim" },
  { id: "klokkenluider", nl: "de klokkenluider", en: "the whistleblower" },
  { id: "buitenstaander", nl: "de buitenstaander", en: "the outsider" },
  { id: "familie", nl: "een familielid", en: "a family member" },
  { id: "verantwoordelijke", nl: "de eindverantwoordelijke", en: "the person in charge" },
];

/** Reflectievragen na de timer. Geen goed/fout — alleen verdieping. */
export const REFLECTION_QUESTIONS = {
  nl: [
    "Welke waarden botsten met elkaar?",
    "Wat voelde ongemakkelijk?",
    "Wanneer twijfelde je het meest?",
    "Welke verantwoordelijkheid voelde je?",
    "Veranderde je blik door het gekozen perspectief?",
  ],
  en: [
    "Which values clashed with each other?",
    "What felt uncomfortable?",
    "When did you doubt the most?",
    "What responsibility did you feel?",
    "Did the chosen perspective shift your view?",
  ],
};

/** Heuristische waarden-tags per categorie (voor de lokale fallback-kaarten). */
export const CATEGORY_VALUE_HINTS = {
  "dagelijks-leven": ["Loyaliteit", "Eerlijkheid", "Empathie"],
  werk: ["Loyaliteit", "Rechtvaardigheid", "Macht"],
  duurzaamheid: ["Publiek belang", "Verantwoordelijkheid", "Rechtvaardigheid"],
  "diversiteit-inclusie": ["Rechtvaardigheid", "Respect", "Moed"],
  "social-media": ["Privacy", "Eerlijkheid", "Veiligheid"],
  studentenleven: ["Loyaliteit", "Eerlijkheid", "Moed"],
  zorg: ["Empathie", "Veiligheid", "Geheimhouding"],
  "nucleaire-geneeskunde": ["Veiligheid", "Publiek belang", "Verantwoordelijkheid"],
  onderzoeksintegriteit: ["Eerlijkheid", "Rechtvaardigheid", "Publiek belang"],
  onderwijs: ["Rechtvaardigheid", "Empathie", "Verantwoordelijkheid"],
  overheid: ["Publiek belang", "Macht", "Rechtvaardigheid"],
};

/** Leesbare categorielabels (NL/EN). */
export const CATEGORY_LABELS = {
  "dagelijks-leven": { nl: "Dagelijks leven", en: "Daily life" },
  werk: { nl: "Werk", en: "Work" },
  duurzaamheid: { nl: "Duurzaamheid", en: "Sustainability" },
  "diversiteit-inclusie": { nl: "Diversiteit & inclusie", en: "Diversity & inclusion" },
  "social-media": { nl: "Social media", en: "Social media" },
  studentenleven: { nl: "Studentenleven", en: "Student life" },
  zorg: { nl: "Zorg", en: "Care" },
  "nucleaire-geneeskunde": { nl: "Nucleaire geneeskunde", en: "Nuclear medicine" },
  onderzoeksintegriteit: { nl: "Onderzoeksintegriteit", en: "Research integrity" },
  onderwijs: { nl: "Onderwijs", en: "Education" },
  overheid: { nl: "Overheid", en: "Government" },
};

export const DIFFICULTY_LABELS = {
  1: { nl: "Micro", en: "Micro" },
  2: { nl: "Meso", en: "Meso" },
  3: { nl: "Macro", en: "Macro" },
};

/** Keuzemogelijkheden voor de sessie-setup. */
export const PLAYER_OPTIONS = [3, 4, 5, 6];
export const TIMER_OPTIONS = [60, 90, 120, 180];
export const DIFFICULTY_OPTIONS = [1, 2, 3];

/** Compacte UI-teksten (NL/EN). */
export const RAD_UI = {
  nl: {
    home: {
      kicker: "Moreel Vakmanschap · Zien & Voelen",
      titel: "Rad van Moreel Fortuin",
      intro:
        "Draai het rad, krijg een dilemma en voel de morele spanning. Geen goede antwoorden, geen winnaars — wel een echt gesprek over wat er botst.",
      start: "Start sessie",
      onderregel: "3–6 spelers · ± 2 minuten per ronde",
    },
    setup: {
      titel: "Stel je sessie in",
      onderregel: "Kies waar het gesprek over gaat en hoeveel tijd jullie nemen.",
      categorie: "Categorie",
      alleCategorieen: "Alle categorieën",
      moeilijkheid: "Moeilijkheid",
      spelers: "Aantal spelers",
      timer: "Tijd voor het gesprek",
      start: "Start het rad",
      terug: "Terug",
      seconden: "sec",
      minuut: "min",
      geenKaarten: "Geen kaarten gevonden voor deze filters. Kies andere opties.",
    },
    wheel: {
      titel: "Draai aan het rad",
      onderregel: "Het rad kiest de morele lens voor deze ronde.",
      spin: "Draai het rad",
      spinning: "Draaien…",
      lens: "Morele lens",
      verder: "Onthul het dilemma",
    },
    dilemma: {
      categorie: "Categorie",
      lens: "Morele lens",
      waarden: "Waarden in het spel",
      vraag: "Bespreek",
      verder: "Neem een perspectief",
    },
    perspective: {
      kicker: "Perspectiefwisseling",
      titel: "Bekijk dit vanuit",
      onderregel: "Kruip in de huid van deze persoon. Wat verandert er?",
      opnieuw: "Ander perspectief",
      verder: "Start het gesprek",
    },
    timer: {
      titel: "In gesprek",
      onderregel: "Deel wat je ziet en voelt. Laat de stiltes vallen.",
      pauze: "Pauze",
      hervat: "Hervat",
      klaar: "Klaar — naar reflectie",
      voorbij: "Tijd voorbij",
    },
    reflection: {
      kicker: "Reflectie",
      titel: "Nabespreking",
      onderregel: "Geen scores. Geen winnaars. Alleen wat het met jullie deed.",
      nieuweRonde: "Nieuwe ronde",
      nieuweSessie: "Nieuwe sessie",
    },
    common: {
      fallback: "Offline modus — lokale dilemmakaarten",
      live: "Live data uit Supabase",
      laden: "Dilemma's laden…",
      fout: "Kon dilemma's niet laden. We gebruiken de lokale set.",
    },
  },
  en: {
    home: {
      kicker: "Moral Craftsmanship · Seeing & Feeling",
      titel: "Wheel of Moral Fortune",
      intro:
        "Spin the wheel, get a dilemma and feel the moral tension. No right answers, no winners — just a real conversation about what clashes.",
      start: "Start session",
      onderregel: "3–6 players · ± 2 minutes per round",
    },
    setup: {
      titel: "Set up your session",
      onderregel: "Choose the topic and how much time you take.",
      categorie: "Category",
      alleCategorieen: "All categories",
      moeilijkheid: "Difficulty",
      spelers: "Number of players",
      timer: "Time for the conversation",
      start: "Start the wheel",
      terug: "Back",
      seconden: "sec",
      minuut: "min",
      geenKaarten: "No cards found for these filters. Pick other options.",
    },
    wheel: {
      titel: "Spin the wheel",
      onderregel: "The wheel picks the moral lens for this round.",
      spin: "Spin the wheel",
      spinning: "Spinning…",
      lens: "Moral lens",
      verder: "Reveal the dilemma",
    },
    dilemma: {
      categorie: "Category",
      lens: "Moral lens",
      waarden: "Values at stake",
      vraag: "Discuss",
      verder: "Take a perspective",
    },
    perspective: {
      kicker: "Perspective shift",
      titel: "Look at this as",
      onderregel: "Step into this person's shoes. What changes?",
      opnieuw: "Other perspective",
      verder: "Start the conversation",
    },
    timer: {
      titel: "In conversation",
      onderregel: "Share what you see and feel. Let the silences fall.",
      pauze: "Pause",
      hervat: "Resume",
      klaar: "Done — to reflection",
      voorbij: "Time's up",
    },
    reflection: {
      kicker: "Reflection",
      titel: "Debrief",
      onderregel: "No scores. No winners. Only what it did to you.",
      nieuweRonde: "New round",
      nieuweSessie: "New session",
    },
    common: {
      fallback: "Offline mode — local dilemma cards",
      live: "Live data from Supabase",
      laden: "Loading dilemmas…",
      fout: "Could not load dilemmas. Using the local set.",
    },
  },
};

/** Bepaalt de UI-taal (alleen nl/en ondersteund; overig valt terug op nl). */
export function radLang(taal) {
  return typeof taal === "string" && taal.startsWith("en") ? "en" : "nl";
}
