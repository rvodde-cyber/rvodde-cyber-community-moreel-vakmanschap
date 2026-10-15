/** Pure filter/sort helpers for the werkbladenkiezer (128 MW entries). */

export const FASE_SLUGS = ["zien", "voelen", "wegen", "handelen", "volhouden"];

export const STATUS_KEYS = ["beschikbaar", "in_voorbereiding", "externe_methode"];

export const TIME_FILTER_KEYS = [
  "tot_20",
  "20_45",
  "45_90",
  "boven_90",
  "meerdere_doorlopend",
];

export const GROUP_FILTER_KEYS = ["1_5", "6_15", "16_30", "boven_30"];

export const NIVEAU_FILTER_KEYS = ["MBO", "HBO", "WO"];

export const SORT_KEYS = ["id", "titel", "tijd"];

export const EMPTY_KIEZER_FILTERS = {
  fasen: [],
  tijd: [],
  groep: [],
  niveaus: [],
  context: [],
  complexiteit: [],
  regio: [],
  status: [...STATUS_KEYS],
  zoek: "",
  sort: "id",
};

const TIME_BLOCKS = {
  tot_20: { min: 0, max: 20 },
  "20_45": { min: 20, max: 45 },
  "45_90": { min: 45, max: 90 },
  boven_90: { min: 90, max: Infinity },
};

const GROUP_BLOCKS = {
  "1_5": { min: 1, max: 5 },
  "6_15": { min: 6, max: 15 },
  "16_30": { min: 16, max: 30 },
  boven_30: { min: 31, max: Infinity },
};

const WERKBLAD_CODE_RE = /^WB-MW(\d{2,3})-/;

export function parseMwNumericId(id) {
  const m = /^MW(\d+)$/.exec(String(id ?? ""));
  return m ? Number(m[1], 10) : 0;
}

export function extractMwFromWerkbladCode(werkbladCode) {
  if (!werkbladCode || typeof werkbladCode !== "string") return null;
  const m = WERKBLAD_CODE_RE.exec(werkbladCode);
  return m ? `MW${m[1].padStart(m[1].length <= 2 ? 2 : m[1].length, "0")}` : null;
}

/** Normalize MW id to MW01 style for map keys. */
export function normalizeMwId(id) {
  const n = parseMwNumericId(id);
  if (!n) return String(id ?? "");
  if (n < 100) return `MW${String(n).padStart(2, "0")}`;
  return `MW${n}`;
}

function localizedTekst(field, dataLang) {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (dataLang === "en" && field.en?.trim()) return field.en;
  return field.nl ?? "";
}

export function rangesOverlap(aMin, aMax, bMin, bMax) {
  const loA = aMin ?? 0;
  const hiA = aMax ?? Infinity;
  const loB = bMin ?? 0;
  const hiB = bMax ?? Infinity;
  return loA <= hiB && loB <= hiA;
}

export function deriveWerkvormStatus(werkvorm, linkedWerkbladCount) {
  if (werkvorm?.label === "C") return "externe_methode";
  if (linkedWerkbladCount > 0) return "beschikbaar";
  if (werkvorm?.label === "A" || werkvorm?.label === "B") return "in_voorbereiding";
  return "in_voorbereiding";
}

export function matchesTimeFilter(duur, selectedTimeKeys) {
  if (!selectedTimeKeys?.length) return true;
  if (!duur) return false;

  const type = duur.type;
  if (type === "variabel" || type === "n.v.t.") return false;

  if (type === "meerdere sessies" || type === "doorlopend") {
    return selectedTimeKeys.includes("meerdere_doorlopend");
  }

  const min = duur.min ?? 0;
  const max = duur.max ?? duur.min ?? Infinity;

  return selectedTimeKeys.some((key) => {
    if (key === "meerdere_doorlopend") return false;
    const block = TIME_BLOCKS[key];
    if (!block) return false;
    return rangesOverlap(min, max, block.min, block.max);
  });
}

export function matchesGroupFilter(groep, selectedGroupKeys) {
  if (!selectedGroupKeys?.length) return true;
  if (!groep || groep.min == null && groep.max == null) return false;

  const min = groep.min ?? 0;
  const max = groep.max ?? groep.min ?? Infinity;

  return selectedGroupKeys.some((key) => {
    const block = GROUP_BLOCKS[key];
    if (!block) return false;
    return rangesOverlap(min, max, block.min, block.max);
  });
}

function matchesZoek(item, q) {
  if (!q) return true;
  const hay = [
    item.titelNl,
    item.titelEn,
    item.herkomst,
    item.beschrijvingNl,
    item.beschrijvingEn,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

export function filterWerkvormKiezerItems(items, filters) {
  const q = (filters.zoek ?? "").trim().toLowerCase();
  const statusFilter = filters.status?.length ? filters.status : STATUS_KEYS;

  return items.filter((item) => {
    if (statusFilter.length && !statusFilter.includes(item.status)) return false;

    if (filters.fasen?.length) {
      const ok = filters.fasen.some((f) => item.fasen.includes(f));
      if (!ok) return false;
    }

    if (!matchesTimeFilter(item.duur, filters.tijd)) return false;
    if (!matchesGroupFilter(item.groep, filters.groep)) return false;

    if (filters.niveaus?.length) {
      const ok = filters.niveaus.some((n) => item.niveaus.includes(n));
      if (!ok) return false;
    }

    if (filters.regio?.length && !filters.regio.includes(item.regio)) return false;

    if (filters.context?.length) {
      if (item.status !== "beschikbaar") return false;
      const contexts = item.contexten ?? [];
      const ok = filters.context.some((c) => contexts.includes(c));
      if (!ok) return false;
    }

    if (filters.complexiteit?.length) {
      if (item.status !== "beschikbaar") return false;
      const levels = item.complexiteiten ?? [];
      const ok = filters.complexiteit.some((c) => levels.includes(c));
      if (!ok) return false;
    }

    if (!matchesZoek(item, q)) return false;

    return true;
  });
}

export function sortWerkvormKiezerItems(items, sortKey) {
  const key = sortKey ?? "id";
  const copy = [...items];

  copy.sort((a, b) => {
    if (key === "titel") {
      const ta = (a.titelDisplay ?? "").localeCompare(b.titelDisplay ?? "", "nl", { sensitivity: "base" });
      if (ta !== 0) return ta;
      return parseMwNumericId(a.id) - parseMwNumericId(b.id);
    }
    if (key === "tijd") {
      const da = durationSortKey(a.duur);
      const db = durationSortKey(b.duur);
      if (da !== db) return da - db;
      return parseMwNumericId(a.id) - parseMwNumericId(b.id);
    }
    return parseMwNumericId(a.id) - parseMwNumericId(b.id);
  });

  return copy;
}

function durationSortKey(duur) {
  if (!duur) return Number.MAX_SAFE_INTEGER;
  const type = duur.type;
  if (type === "meerdere sessies" || type === "doorlopend") return 500;
  if (type === "variabel" || type === "n.v.t.") return 600;
  if (duur.min != null) return duur.min;
  if (duur.max != null) return duur.max;
  return 400;
}

export function buildWerkbladIndexByMw(werkbladenRaw) {
  const map = new Map();
  for (const wb of werkbladenRaw ?? []) {
    const mw = extractMwFromWerkbladCode(wb.werkblad_code);
    if (!mw) continue;
    const key = normalizeMwId(mw);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(wb);
  }
  return map;
}

export function buildKiezerItem(werkvorm, werkbladenForMw, regioLijst, dataLang) {
  const regioEntry = regioLijst.find((r) => r.slug === werkvorm.regio);
  const regioNaam =
    dataLang === "en"
      ? regioEntry?.en ?? werkvorm.regio
      : regioEntry?.nl ?? werkvorm.regio;

  const linked = werkbladenForMw ?? [];
  const status = deriveWerkvormStatus(werkvorm, linked.length);

  const contexten = [...new Set(linked.map((w) => w.vakgebied).filter(Boolean))].sort();
  const complexiteiten = [
    ...new Set(linked.map((w) => w.complexiteit).filter(Boolean)),
  ].sort();

  const titelNl = werkvorm.titel?.nl ?? "";
  const titelEn = werkvorm.titel?.en ?? "";
  const beschrijvingNl = werkvorm.beschrijving?.nl ?? "";
  const beschrijvingEn = werkvorm.beschrijving?.en?.trim()
    ? werkvorm.beschrijving.en
    : beschrijvingNl;

  const titelDisplay =
    dataLang === "en" && titelEn.trim() ? titelEn : titelNl;

  const beschrijvingDisplay =
    dataLang === "en"
      ? beschrijvingEn
      : beschrijvingNl;

  const enBeschrijvingPlaceholder =
    dataLang === "en" && !werkvorm.beschrijving?.en?.trim();

  const primaryWerkblad = linked[0] ?? null;

  return {
    id: normalizeMwId(werkvorm.id),
    werkvorm,
    status,
    titelNl,
    titelEn,
    titelDisplay,
    herkomst: werkvorm.herkomst ?? "",
    regio: werkvorm.regio,
    regioNaam,
    fasen: werkvorm.fasen ?? [],
    hoofdfase: werkvorm.fasen?.[0] ?? "wegen",
    niveaus: werkvorm.niveaus ?? [],
    duur: werkvorm.duur,
    duurTekst: localizedTekst(werkvorm.duur?.tekst, dataLang),
    groep: werkvorm.groep,
    groepTekst: localizedTekst(werkvorm.groep?.tekst, dataLang),
    beschrijvingNl,
    beschrijvingEn,
    beschrijvingDisplay,
    enBeschrijvingPlaceholder,
    letOp: werkvorm.let_op ?? "",
    bronnenApa: werkvorm.bronnen_apa ?? [],
    bronKort: werkvorm.bron_kort ?? "",
    licentieWerkblad: werkvorm.licentie_werkblad,
    naamsvermeldingBron: werkvorm.naamsvermelding_bron ?? "",
    linkedWerkbladen: linked,
    primaryWerkbladId: primaryWerkblad?.id ?? null,
    contexten,
    complexiteiten,
  };
}

export function buildAllKiezerItems(werkvormenData, werkbladenRaw, dataLang) {
  const regioLijst = werkvormenData.regio_lijst ?? [];
  const byMw = buildWerkbladIndexByMw(werkbladenRaw);
  return (werkvormenData.werkvormen ?? []).map((wv) =>
    buildKiezerItem(wv, byMw.get(normalizeMwId(wv.id)) ?? [], regioLijst, dataLang),
  );
}

export function collectKiezerFilterOptions(items) {
  const context = [
    ...new Set(
      items.filter((i) => i.status === "beschikbaar").flatMap((i) => i.contexten),
    ),
  ].sort();
  const regioSlugs = [...new Set(items.map((i) => i.regio).filter(Boolean))].sort();
  return { context, regioSlugs };
}
