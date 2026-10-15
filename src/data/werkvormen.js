import werkvormenData from "./werkvormen.json";
import werkbladenRaw from "./werkbladen.json";
import { buildAllKiezerItems } from "../lib/werkvormenKiezer.js";

export function getWerkvormenData() {
  return werkvormenData;
}

export function getRegioLijst() {
  return werkvormenData.regio_lijst ?? [];
}

export function getRegioNaam(slug, dataLang) {
  const entry = getRegioLijst().find((r) => r.slug === slug);
  if (!entry) return slug;
  return dataLang === "en" ? entry.en : entry.nl;
}

export function getKiezerItems(dataLang) {
  return buildAllKiezerItems(werkvormenData, werkbladenRaw, dataLang);
}

export function getWerkvormenCount() {
  return werkvormenData.aantal ?? werkvormenData.werkvormen?.length ?? 0;
}
