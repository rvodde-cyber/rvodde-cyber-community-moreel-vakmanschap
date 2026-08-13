// Scoringslogica (briefing §6).
//
// Uitgangspunten: gemiddelde per blad op schaal 1–5, geen totaalscore over de
// organisatie, en een drempellogica die voorkomt dat een organisatie die overal
// zwak scoort naar één willekeurig blad wordt doorverwezen.

import { leaves, leafById } from "../config/leaves";
import { statements } from "../config/statements";
import { conclusions, qualitativeLabels, joinNames } from "../config/copy";

/** Alle vier de gemiddelden binnen deze marge = "geen duidelijke uitschieter". */
export const SPREAD_THRESHOLD = 0.5;
/** Grens tussen "dicht bij elkaar én relatief hoog" en "…én relatief laag". */
export const HEALTHY_MEAN = 3.5;
/** Grenzen voor de kwalitatieve duiding van één blad. */
export const BAND_BOUNDARIES = { urgent: 2.5, aandacht: 3.75 };

const EPSILON = 1e-6;

/**
 * Rekent een ruw antwoord (1–5) om naar een score, waarbij negatief
 * geformuleerde stellingen worden omgedraaid.
 * @param {{reverse: boolean}} statement
 * @param {number} answer
 */
export function toScore(statement, answer) {
  return statement.reverse ? 6 - answer : answer;
}

/**
 * Gemiddelde score per blad.
 * @param {Record<string, number>} answers  statement-id → 1–5
 * @returns {Record<string, number>} blad-id → gemiddelde (1–5)
 */
export function computeLeafScores(answers) {
  const totals = {};
  const counts = {};

  for (const statement of statements) {
    const answer = answers[statement.id];
    if (typeof answer !== "number") continue;
    totals[statement.leafId] = (totals[statement.leafId] ?? 0) + toScore(statement, answer);
    counts[statement.leafId] = (counts[statement.leafId] ?? 0) + 1;
  }

  return Object.fromEntries(
    leaves.map((leaf) => [leaf.id, counts[leaf.id] ? totals[leaf.id] / counts[leaf.id] : 0])
  );
}

/**
 * Vitaliteit 0–1, gebruikt door de visuele weergave van een blad.
 * @param {number} score 1–5
 */
export function vitality(score) {
  return clamp((score - 1) / 4, 0, 1);
}

/**
 * Kwalitatieve band van één blad. Bewust drie niveaus, passend bij de drie
 * visuele toestanden uit §8.1.
 * @param {number} score
 * @returns {"vitaal" | "aandacht" | "urgent"}
 */
export function bandFor(score) {
  if (score < BAND_BOUNDARIES.urgent) return "urgent";
  if (score < BAND_BOUNDARIES.aandacht) return "aandacht";
  return "vitaal";
}

/**
 * Bladen met de laagste score; bij gelijke stand komen ze er allemaal in.
 * @param {Record<string, number>} scores
 */
export function lowestLeafIds(scores) {
  const values = leaves.map((leaf) => scores[leaf.id] ?? 0);
  const min = Math.min(...values);
  return leaves.filter((leaf) => Math.abs((scores[leaf.id] ?? 0) - min) < EPSILON).map((l) => l.id);
}

/**
 * De hoofdconclusie: welk beeld tonen we, en welke bladeren lichten we uit.
 *
 * @param {Record<string, number>} scores
 * @returns {{
 *   kind: "single" | "tie" | "balancedStrong" | "balancedLow",
 *   highlightedIds: string[],
 *   title: string,
 *   body: string,
 *   spread: number,
 *   mean: number
 * }}
 */
export function deriveConclusion(scores) {
  const values = leaves.map((leaf) => scores[leaf.id] ?? 0);
  const spread = Math.max(...values) - Math.min(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

  if (spread <= SPREAD_THRESHOLD + EPSILON) {
    const kind = mean >= HEALTHY_MEAN ? "balancedStrong" : "balancedLow";
    const copy = conclusions[kind];
    return { kind, highlightedIds: [], title: copy.title([]), body: copy.body([]), spread, mean };
  }

  const highlightedIds = lowestLeafIds(scores);
  const names = highlightedIds.map((id) => leafById[id].label);
  const kind = highlightedIds.length > 1 ? "tie" : "single";
  const copy = conclusions[kind];

  return { kind, highlightedIds, title: copy.title(names), body: copy.body(names), spread, mean };
}

/**
 * Alles wat het resultaatscherm, de tooltips, de aria-labels en de PDF nodig
 * hebben — in één keer afgeleid, zodat scherm en print niet uiteen kunnen lopen.
 *
 * @param {Record<string, number>} answers
 */
export function buildResult(answers) {
  const scores = computeLeafScores(answers);
  const conclusion = deriveConclusion(scores);

  const perLeaf = leaves.map((leaf) => {
    const score = scores[leaf.id] ?? 0;
    const band = bandFor(score);
    return {
      id: leaf.id,
      label: leaf.label,
      color: leaf.color,
      summary: leaf.summary,
      instrument: leaf.instrument,
      score,
      band,
      vitality: vitality(score),
      // Bewust kwalitatief: nergens in de UI of PDF komt het cijfer terug (§6).
      qualitative: qualitativeLabels[band],
      note: leaf.notes[band],
      highlighted: conclusion.highlightedIds.includes(leaf.id),
    };
  });

  return { scores, perLeaf, conclusion };
}

/** Namen netjes aan elkaar plakken ("A, B en C"). */
export { joinNames };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
