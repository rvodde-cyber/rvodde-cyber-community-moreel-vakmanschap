export function suggereerFase(scores) {
  const waarden = Object.values(scores).map((n) => ({ kwetsbaar: 1, groeiend: 2, sterk: 3 }[n]));
  const gemiddelde = waarden.reduce((a, b) => a + b, 0) / waarden.length;
  const spreiding = Math.max(...waarden) - Math.min(...waarden);

  if (spreiding >= 2) return "gemengd beeld"; // geen fase forceren
  if (gemiddelde < 1.7) return "storming";
  if (gemiddelde < 2.3) return "norming";
  return "performing";
}
