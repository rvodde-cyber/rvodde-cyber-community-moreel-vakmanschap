// Merk- en instellingslaag.
//
// Alles wat een ander bureau zou willen wijzigen staat hier of in ./leaves.js en
// ./copy.js — nooit verspreid door de componenten. Een latere white-label-modus
// (buiten scope, zie briefing §9) hoeft dan alleen dit object te overschrijven.

/**
 * Contactgegevens voor de doorverwijzing (briefing §10).
 *
 * Mag leeg blijven tot vlak vóór livegang: zolang er niets is ingevuld toont de
 * app overal de placeholder-tekst hieronder in plaats van een lege of kapotte
 * knop. Vul `email` of `url` en de call-to-action wordt vanzelf klikbaar.
 */
export const CONTACT_INFO = {
  organisation: "",
  email: "",
  url: "",
  placeholder: "Contactgegevens volgen",
};

export const brand = {
  // Werktitel "Klavertje Vier" blijft de interne en visuele metafoor; de
  // productnaam hieronder is wat de gebruiker ziet.
  productName: "De Frisse Organisatie",
  tagline: "Verkennende instapscan",
  fileNamePrefix: "de-frisse-organisatie",
};

export const palette = {
  canvas: "#FAFAF9",
  canvasDeep: "#F5F5F4",
  ink: "#1C1917",
  inkSoft: "#57534E",
  inkMuted: "#78716C",
  stem: "#65A30D",
};

// Duur van de onthullingsanimatie op het resultaatscherm (briefing §8.1).
export const revealTiming = {
  durationMs: 1200,
  staggerMs: 100,
  neutralScore: 3,
};
