import werkbladenRaw from "./werkbladen.json";
import { bibliotheekData } from "./bibliotheekData.js";

export const FASE_KLEUREN = {
  zien: "#185fa5",
  voelen: "#854f0b",
  wegen: "#993556",
  handelen: "#0f6e56",
  volhouden: "#993c1d",
};

const STAP_NAAR_SLUG = {
  1: "zien",
  2: "voelen",
  3: "wegen",
  4: "handelen",
  5: "volhouden",
};

function localizeText(field, dataLang) {
  if (!field || typeof field !== "object") return field ?? "";
  const en = field.en;
  if (dataLang === "en" && typeof en === "string" && en.trim()) return en;
  return field.nl ?? "";
}

function localizeThemas(field, dataLang) {
  if (!field || typeof field !== "object") return [];
  const en = field.en;
  if (dataLang === "en" && Array.isArray(en) && en.length > 0) return en;
  return Array.isArray(field.nl) ? field.nl : [];
}

function localizeItem(item, dataLang) {
  return {
    ...item,
    titel: localizeText(item.titel, dataLang),
    omschrijving: localizeText(item.omschrijving, dataLang),
    themas: localizeThemas(item.themas, dataLang),
  };
}

export function getWerkbladen(dataLang) {
  return werkbladenRaw.map((item) => localizeItem(item, dataLang));
}

export function getWerkbladenVoorStap(stapSlugNl, dataLang) {
  return getWerkbladen(dataLang).filter((item) => item.fasen.includes(stapSlugNl));
}

export function downloadPad(id, bestand) {
  return `/downloads/werkbladen/${id}/${bestand}`;
}

export function sfeerbeeldPad(item) {
  if (item.sfeerbeeld) {
    return `/images/werkbladen/${item.sfeerbeeld}`;
  }
  const hoofdfase = item.fasen?.[0] ?? "wegen";
  return `/images/bibliotheek/stap-${hoofdfase}.jpg`;
}

export function hoofdfaseKleur(item) {
  const hoofdfase = item.fasen?.[0] ?? "wegen";
  return FASE_KLEUREN[hoofdfase] ?? FASE_KLEUREN.wegen;
}

export function getFaseNaam(faseSlug, dataLang) {
  const stapNr = Object.entries(STAP_NAAR_SLUG).find(([, slug]) => slug === faseSlug)?.[0];
  if (!stapNr) return faseSlug;
  const stap = bibliotheekData[dataLang]?.find((s) => s.stap === Number(stapNr));
  return stap?.stapNaam ?? faseSlug;
}

export function getWerkbladenCount() {
  return werkbladenRaw.length;
}
