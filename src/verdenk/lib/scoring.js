import { DIMENSION_IDS, MICRO_ACTIES } from "../data/dimensions";
import { ARCHETYPES, DIMENSIONS } from "../data/dimensions";

export function scoreStelling(waarde, omgekeerd) {
  const n = Number(waarde);
  if (!Number.isFinite(n) || n < 1 || n > 5) return null;
  return omgekeerd ? 6 - n : n;
}

export function berekenDimensieScore(stellingen, antwoorden) {
  const scores = stellingen
    .map((s) => scoreStelling(antwoorden[s.id], s.omgekeerd))
    .filter((s) => s !== null);

  if (scores.length === 0) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function berekenAlleScores(antwoorden) {
  const result = {};
  for (const dim of DIMENSIONS) {
    result[dim.id] = berekenDimensieScore(dim.stellingen, antwoorden);
  }
  return result;
}

export function isCompleet(antwoorden) {
  return DIMENSIONS.every((dim) =>
    dim.stellingen.every((s) => {
      const v = antwoorden[s.id];
      return v >= 1 && v <= 5;
    }),
  );
}

export function bepaalArchetype(scores) {
  const vals = Object.values(scores).filter((v) => v !== null);
  if (vals.length < 6) return ARCHETYPES.twijfelaar;

  const hoog = (id) => scores[id] >= 3.5;
  const laag = (id) => scores[id] < 2.5;

  if (laag("systeemkritiek") && laag("zelfverdenking")) {
    return ARCHETYPES.bevestiger;
  }

  if (laag("tolerantie") || scores.tolerantie === Math.min(...vals)) {
    return ARCHETYPES.vermijder;
  }

  if (hoog("doorvragen") && hoog("actie") && hoog("zelfverdenking")) {
    return ARCHETYPES.onderzoeker;
  }

  const dimHoog = DIMENSION_IDS.filter((id) => hoog(id));
  if (dimHoog.length >= 4 && !hoog("actie")) {
    return ARCHETYPES.twijfelaar;
  }

  const ranked = [...DIMENSION_IDS].sort((a, b) => scores[b] - scores[a]);
  const top = ranked[0];
  const map = {
    systeemkritiek: ARCHETYPES.onderzoeker,
    balans: ARCHETYPES.bevestiger,
    doorvragen: ARCHETYPES.onderzoeker,
    actie: ARCHETYPES.onderzoeker,
    tolerantie: ARCHETYPES.vermijder,
    zelfverdenking: ARCHETYPES.twijfelaar,
  };
  return map[top] ?? ARCHETYPES.twijfelaar;
}

export function scoreNiveau(score) {
  if (score >= 4) return "hoog";
  if (score >= 2.5) return "midden";
  return "laag";
}

export function aanmoediging(dimensieId, score) {
  const niveau = scoreNiveau(score);

  if (niveau === "hoog") {
    return "Sterk ontwikkeld — vooral zo doorgaan.";
  }
  if (niveau === "midden") {
    return `Je ziet het, maar durft nog niet altijd door te pakken. Oefen met: ${MICRO_ACTIES[dimensieId].midden}.`;
  }
  return `Dit is een groeikans. Begin klein: ${MICRO_ACTIES[dimensieId].laag}.`;
}

export function aggregeerScores(submissions) {
  if (!submissions?.length) {
    return Object.fromEntries(DIMENSION_IDS.map((id) => [id, 0]));
  }

  const totals = Object.fromEntries(DIMENSION_IDS.map((id) => [id, 0]));
  const counts = Object.fromEntries(DIMENSION_IDS.map((id) => [id, 0]));

  for (const sub of submissions) {
    const scores = sub.scores ?? sub;
    for (const id of DIMENSION_IDS) {
      if (scores[id] != null && scores[id] > 0) {
        totals[id] += scores[id];
        counts[id] += 1;
      }
    }
  }

  return Object.fromEntries(
    DIMENSION_IDS.map((id) => [
      id,
      counts[id] > 0 ? Math.round((totals[id] / counts[id]) * 10) / 10 : 0,
    ]),
  );
}
