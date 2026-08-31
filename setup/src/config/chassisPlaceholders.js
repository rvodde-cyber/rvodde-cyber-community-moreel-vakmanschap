/**
 * PLACEHOLDER Chassis items — ESH-dimensies uit de brief.
 * Vervang door de echte vraagbank zodra docs/setup-instrument-spec.md in de repo staat.
 * Likert 1–5; spreiding (niet gemiddelde) is het rapport-signaal (later).
 */

export const LIKERT_LABELS = {
  1: "Helemaal oneens",
  2: "Oneens",
  3: "Neutraal",
  4: "Eens",
  5: "Helemaal eens",
};

export const SETUP_SECTIONS = [
  { id: "chassis", label: "Chassis", short: "Ch" },
  { id: "rijlijn", label: "Rijlijn", short: "Rj" },
  { id: "vermogen", label: "Vermogen", short: "Vm" },
  { id: "chauffeur", label: "Chauffeur", short: "Cf" },
  { id: "pitcrew", label: "Pitcrew", short: "Pc" },
];

export const chassisItems = [
  {
    id: "esh-strategy",
    dimension: "Strategie",
    text: "In onze organisatie is duidelijk welke koers we de komende periode varen.",
  },
  {
    id: "esh-structure",
    dimension: "Structuur",
    text: "Rollen en verantwoordelijkheden zijn zo geregeld dat we elkaar versterken.",
  },
  {
    id: "esh-systems",
    dimension: "Systemen",
    text: "Onze werkwijzen en systemen helpen ons om goede besluiten te nemen.",
  },
  {
    id: "esh-skills",
    dimension: "Sleutelvaardigheden",
    text: "We hebben de vaardigheden in huis die deze verandering vraagt.",
  },
  {
    id: "esh-style",
    dimension: "Managementstijl",
    text: "De manier van leidinggeven past bij wat er nu van het team gevraagd wordt.",
  },
  {
    id: "esh-staff",
    dimension: "Personeel",
    text: "De juiste mensen zitten op de plekken waar zij het verschil kunnen maken.",
  },
  {
    id: "esh-culture",
    dimension: "Cultuur",
    text: "Onze omgangsvormen maken het veilig om twijfel en tegenspraak te delen.",
  },
];
