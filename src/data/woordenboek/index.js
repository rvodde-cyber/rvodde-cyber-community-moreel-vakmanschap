import lexicon from "./entries.json";
import candidatesDoc from "./candidates.json";
import { clusterLabels, werkvormen } from "./werkvormen";

export { clusterLabels, werkvormen };

export const woordenboekMeta = lexicon.meta;
export const woordenboekEntries = lexicon.entries;
export const woordenboekCandidates = candidatesDoc.candidates;

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function getAlphabetLetters(entries = woordenboekEntries) {
  const present = new Set(entries.map((e) => e.letter));
  return LETTERS.filter((letter) => present.has(letter));
}

export function filterWoordenboekEntries(entries, { query = "", letter = "all", cluster = "all" } = {}) {
  const q = query.trim().toLowerCase();
  return entries.filter((entry) => {
    if (letter !== "all" && entry.letter !== letter) return false;
    if (cluster !== "all" && !(entry.clusters || []).includes(cluster)) return false;
    if (!q) return true;
    const hay = `${entry.term_nl} ${entry.definition_nl} ${entry.term_en || ""} ${entry.definition_en || ""}`.toLowerCase();
    return hay.includes(q);
  });
}

export function getEntryDisplay(entry, lang = "nl") {
  if (lang === "en" && entry.term_en) {
    return {
      term: entry.term_en,
      definition: entry.definition_en || entry.definition_nl,
      fallbackNote: entry.definition_en ? null : "NL definition — EN translation pending",
    };
  }
  return {
    term: entry.term_nl,
    definition: entry.definition_nl,
    fallbackNote: null,
  };
}
