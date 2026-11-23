import themasData from "../data/themas.json" with { type: "json" };

const THEMA_LIST = themasData.themas ?? [];

const THEMA_BY_ID = new Map(THEMA_LIST.map((t) => [t.id, t]));

export const THEMA_IDS = THEMA_LIST.map((t) => t.id);

export function getThemas(dataLang = "nl") {
  const lang = dataLang === "en" ? "en" : "nl";
  const synKey = lang === "en" ? "synoniemen_en" : "synoniemen_nl";
  return THEMA_LIST.map((t) => ({
    id: t.id,
    label: t[lang] ?? t.nl,
    synoniemen: t[synKey] ?? [],
  }));
}

export function themaLabel(id, dataLang = "nl") {
  const entry = THEMA_BY_ID.get(id);
  if (!entry) return id;
  return dataLang === "en" ? entry.en : entry.nl;
}

export function normalizeZoek(text) {
  if (text == null) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesThemas(itemThemaIds, selectedIds) {
  if (!selectedIds?.length) return true;
  const itemIds = itemThemaIds ?? [];
  return selectedIds.some((id) => itemIds.includes(id));
}

export function zoekTermen(q) {
  const norm = normalizeZoek(q);
  if (!norm) return [];
  return norm.split(" ").filter(Boolean);
}

export function buildThemaHaystack(themaIds) {
  if (!themaIds?.length) return "";
  const parts = [];
  for (const id of themaIds) {
    const t = THEMA_BY_ID.get(id);
    if (!t) continue;
    parts.push(t.nl, t.en, ...(t.synoniemen_nl ?? []), ...(t.synoniemen_en ?? []));
  }
  return normalizeZoek(parts.join(" "));
}

export function matchesZoekInText(haystack, q) {
  const terms = zoekTermen(q);
  if (!terms.length) return true;
  const norm = normalizeZoek(haystack);
  return terms.every((term) => norm.includes(term));
}