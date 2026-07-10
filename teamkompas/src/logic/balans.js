const niveauScore = { kwetsbaar: 1, groeiend: 2, sterk: 3 };

export function bepaalBalans(scores) {
  // scores: { doelen: "kwetsbaar", initiatief: "groeiend", ... }
  const entries = Object.entries(scores).map(([key, niveau]) => ({
    key,
    waarde: niveauScore[niveau],
  }));
  const zwakste = entries.reduce((a, b) => (a.waarde < b.waarde ? a : b));
  const sterkste = entries.reduce((a, b) => (a.waarde > b.waarde ? a : b));
  const spreiding = sterkste.waarde - zwakste.waarde;
  return { zwaksteFactor: zwakste.key, sterksteFactor: sterkste.key, spreiding };
}
