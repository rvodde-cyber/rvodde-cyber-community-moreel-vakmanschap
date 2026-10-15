import {
  EMPTY_KIEZER_FILTERS,
  FASE_SLUGS,
  GROUP_FILTER_KEYS,
  NIVEAU_FILTER_KEYS,
  SORT_KEYS,
  STATUS_KEYS,
  TIME_FILTER_KEYS,
} from "./werkvormenKiezer.js";
import { COMPLEXITY_KEYS } from "../data/gesprekskaarten/constants.js";

const ARRAY_PARAMS = {
  fasen: FASE_SLUGS,
  tijd: TIME_FILTER_KEYS,
  groep: GROUP_FILTER_KEYS,
  niveaus: NIVEAU_FILTER_KEYS,
  context: null,
  complexiteit: COMPLEXITY_KEYS,
  regio: null,
  status: STATUS_KEYS,
};

function parseList(value, allowed) {
  if (!value) return [];
  const parts = value.split(",").map((s) => s.trim()).filter(Boolean);
  if (!allowed) return parts;
  return parts.filter((p) => allowed.includes(p));
}

export function filtersFromSearchParams(searchParams, regioSlugs = []) {
  const next = { ...EMPTY_KIEZER_FILTERS };

  next.fasen = parseList(searchParams.get("fasen"), FASE_SLUGS);
  next.tijd = parseList(searchParams.get("tijd"), TIME_FILTER_KEYS);
  next.groep = parseList(searchParams.get("groep"), GROUP_FILTER_KEYS);
  next.niveaus = parseList(searchParams.get("niveaus"), NIVEAU_FILTER_KEYS);
  next.context = parseList(searchParams.get("context"), null);
  next.complexiteit = parseList(searchParams.get("complexiteit"), COMPLEXITY_KEYS);
  next.regio = parseList(searchParams.get("regio"), regioSlugs.length ? regioSlugs : null);
  next.status = parseList(searchParams.get("status"), STATUS_KEYS);
  if (next.status.length === 0) next.status = [...STATUS_KEYS];

  const sort = searchParams.get("sort");
  next.sort = SORT_KEYS.includes(sort) ? sort : "id";

  next.zoek = searchParams.get("zoek") ?? "";

  return next;
}

export function filtersToSearchParams(filters, regioSlugs = []) {
  const params = new URLSearchParams();

  for (const [key, allowed] of Object.entries(ARRAY_PARAMS)) {
    const values = filters[key] ?? [];
    const isDefaultStatus =
      key === "status" &&
      values.length === STATUS_KEYS.length &&
      STATUS_KEYS.every((s) => values.includes(s));
    if (isDefaultStatus) continue;
    if (!values.length) continue;
    if (allowed && values.some((v) => !allowed.includes(v))) continue;
    if (key === "regio" && regioSlugs.length) {
      const valid = values.filter((v) => regioSlugs.includes(v));
      if (valid.length) params.set(key, valid.join(","));
      continue;
    }
    params.set(key, values.join(","));
  }

  if (filters.sort && filters.sort !== "id") params.set("sort", filters.sort);
  if (filters.zoek?.trim()) params.set("zoek", filters.zoek.trim());

  return params;
}

export function filtersEqual(a, b) {
  const keys = Object.keys(EMPTY_KIEZER_FILTERS);
  for (const key of keys) {
    const va = a[key];
    const vb = b[key];
    if (Array.isArray(va) && Array.isArray(vb)) {
      if (va.length !== vb.length) return false;
      const sa = [...va].sort().join("|");
      const sb = [...vb].sort().join("|");
      if (sa !== sb) return false;
      continue;
    }
    if (va !== vb) return false;
  }
  return true;
}
