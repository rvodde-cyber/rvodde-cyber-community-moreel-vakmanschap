/** Herkomst en licentie-labels voor werkbladen en bibliotheekmaterialen */

export function heeftWerkvorm(oorspronkelijke_werkvorm) {
  return Boolean(oorspronkelijke_werkvorm?.trim());
}

export function werkbladHerkomstTekst(oorspronkelijke_werkvorm, dataLang) {
  const lang = dataLang === "en" ? "en" : "nl";
  if (heeftWerkvorm(oorspronkelijke_werkvorm)) {
    return lang === "en"
      ? `Inspired by: ${oorspronkelijke_werkvorm.trim()} — see the source below and in the document.`
      : `Geïnspireerd op: ${oorspronkelijke_werkvorm.trim()} — zie de bron hieronder en in het document.`;
  }
  return lang === "en" ? "Original work" : "Eigen ontwikkeling";
}

/** True als de bronregel als eigen ontwikkeling geldt (geen bewerking-label). */
export function bronIsEigenOntwikkeling(bronTekst) {
  if (!bronTekst || typeof bronTekst !== "string") return true;
  const lower = bronTekst.trim().toLowerCase();
  return lower.startsWith("eigen ontwikkeling") || lower.startsWith("developed by");
}

export function materiaalHerkomstTekst(dataLang) {
  return dataLang === "en"
    ? "Inspired by the source stated."
    : "Geïnspireerd op de vermelde bron.";
}
