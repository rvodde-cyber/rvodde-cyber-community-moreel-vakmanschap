import {
  buildThemaHaystack,
  matchesThemas,
  matchesZoekInText,
  normalizeZoek,
} from "./themas.js";
import { filterWerkvormKiezerItems, EMPTY_KIEZER_FILTERS } from "./werkvormenKiezer.js";

export const EMPTY_BIBLIOTHEEK_ZOEK = {
  zoek: "",
  themas: [],
};

export function flattenBibliotheekMaterialen(bibliotheekStappen, dataLang) {
  const stapSlug = { 1: "zien", 2: "voelen", 3: "wegen", 4: "handelen", 5: "volhouden" };
  const rows = [];
  for (const stap of bibliotheekStappen) {
    const slug = stap.stapSlug
      ? dataLang === "en"
        ? stap.stapSlug.en
        : stap.stapSlug.nl
      : stapSlug[stap.stap] ?? String(stap.stap);
    for (const mat of stap.materialen ?? []) {
      rows.push({
        ...mat,
        stap: stap.stap,
        stapNaam: stap.stapNaam,
        stapKleur: stap.kleur,
        stapSlug: slug,
      });
    }
  }
  return rows;
}

export function materialZoekHaystack(mat) {
  const parts = [
    mat.titel,
    ...(mat.themas ?? []),
    mat.omschrijving ?? "",
    typeof mat.bron === "string" ? mat.bron : "",
    buildThemaHaystack(mat.thema_ids),
  ];
  return parts.filter(Boolean).join(" ");
}

export function matchesBibliotheekFilters(item, filters) {
  if (!matchesThemas(item.thema_ids ?? [], filters.themas)) return false;
  if (!matchesZoekInText(materialZoekHaystack(item), filters.zoek)) return false;
  return true;
}

export function filterBibliotheekMaterialen(materialen, filters) {
  return materialen.filter((m) => matchesBibliotheekFilters(m, filters));
}

export function filterWerkbladItemForZoek(item, filters, rawThemaIds) {
  const themaIds = rawThemaIds ?? item.thema_ids ?? [];
  if (!matchesThemas(themaIds, filters.themas)) return false;
  const parts = [
    item.titel,
    item.omschrijving ?? "",
    ...(item.themas ?? []),
    buildThemaHaystack(themaIds),
  ];
  if (!matchesZoekInText(parts.join(" "), filters.zoek)) return false;
  return true;
}

export function parseThemasParam(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function countKiezerForBibliotheekZoek(items, filters) {
  const kiezerFilters = {
    ...EMPTY_KIEZER_FILTERS,
    zoek: filters.zoek ?? "",
    themas: filters.themas ?? [],
  };
  return filterWerkvormKiezerItems(items, kiezerFilters).length;
}

export function buildKiezerUrl(basePath, filters) {
  const params = new URLSearchParams();
  if (filters.zoek?.trim()) params.set("zoek", filters.zoek.trim());
  if (filters.themas?.length) params.set("themas", filters.themas.join(","));
  const q = params.toString();
  return q ? `${basePath}?${q}` : basePath;
}

export function bibliotheekZoekActief(filters) {
  return Boolean(filters.zoek?.trim()) || (filters.themas?.length ?? 0) > 0;
}

export { normalizeZoek };