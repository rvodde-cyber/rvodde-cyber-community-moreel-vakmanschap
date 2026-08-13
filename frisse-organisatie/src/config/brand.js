// Merk- en instellingslaag.
//
// Alles wat een ander bureau zou willen wijzigen staat hier of in ./leaves.js en
// ./copy.js — nooit verspreid door de componenten. Een latere white-label-modus
// (buiten scope, zie briefing §9) hoeft dan alleen dit object te overschrijven.

export const brand = {
  // Werktitel "Klavertje Vier" blijft de interne en visuele metafoor; de
  // productnaam hieronder is wat de gebruiker ziet.
  productName: "De Frisse Organisatie",
  tagline: "Verkennende instapscan",
  // Generiek houden: geen eigennamen in de UI-teksten, zodat externe
  // consultants het instrument ongewijzigd kunnen inzetten.
  organisation: "",
  contactEmail: "",
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
