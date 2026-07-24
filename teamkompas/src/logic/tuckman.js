export function bepaalFaseDirect(waarden) {
  // waarden: { forming, storming, norming, performing, adjourning } — elk 0-100
  const entries = Object.entries(waarden);
  const maxWaarde = Math.max(...entries.map(([, v]) => v));
  const kandidaten = entries.filter(([, v]) => v === maxWaarde).map(([k]) => k);
  if (kandidaten.length > 1) return { fase: "gemengd beeld", waarden };
  return { fase: kandidaten[0], waarden };
}
