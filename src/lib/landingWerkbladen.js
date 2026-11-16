import { usesEnglishRoutes } from "../data/vertalingen.js";
import {
  EMPTY_KIEZER_FILTERS,
  FASE_SLUGS,
  filterWerkvormKiezerItems,
  kiezerSortKey,
} from "./werkvormenKiezer.js";

export function telStatussen(items) {
  const counts = { beschikbaar: 0, in_voorbereiding: 0, externe_methode: 0 };
  for (const item of items) {
    if (item.status in counts) counts[item.status] += 1;
  }
  return counts;
}

export function telPerFase(items) {
  const result = {};
  for (const slug of FASE_SLUGS) {
    const filters = {
      ...EMPTY_KIEZER_FILTERS,
      fasen: [slug],
      status: ["beschikbaar"],
    };
    result[slug] = filterWerkvormKiezerItems(items, filters).length;
  }
  return result;
}

function eligibilityForAutoPick(item) {
  return (
    item.status === "beschikbaar" &&
    item.kind !== "standalone_werkblad" &&
    Boolean(item.primaryWerkbladId)
  );
}

function pickForPhase(kandidaten, gebruikteContexten) {
  const sorted = [...kandidaten].sort((a, b) => kiezerSortKey(a) - kiezerSortKey(b));
  const metNieuweContext = sorted.find((item) => {
    const ctx = item.contexten?.[0];
    return ctx && !gebruikteContexten.has(ctx);
  });
  return metNieuweContext ?? sorted[0] ?? null;
}

export function kiesUitgelicht(items, { aantal = 5, vast = [] } = {}) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const gekozen = [];
  const gekozenIds = new Set();
  const gebruikteFasen = new Set();
  const gebruikteContexten = new Set();

  const voegToe = (item) => {
    if (!item || gekozen.length >= aantal || gekozenIds.has(item.id)) return;
    const fase = item.hoofdfase;
    if (gebruikteFasen.has(fase)) return;
    gekozen.push(item);
    gekozenIds.add(item.id);
    gebruikteFasen.add(fase);
    const ctx = item.contexten?.[0];
    if (ctx) gebruikteContexten.add(ctx);
  };

  for (const id of vast) {
    const item = byId.get(id);
    if (item?.status === "beschikbaar") voegToe(item);
  }

  for (const fase of FASE_SLUGS) {
    if (gekozen.length >= aantal || gebruikteFasen.has(fase)) continue;

    const kandidaten = items.filter(
      (item) =>
        eligibilityForAutoPick(item) &&
        item.hoofdfase === fase &&
        !gekozenIds.has(item.id),
    );
    if (!kandidaten.length) continue;

    const pick = pickForPhase(kandidaten, gebruikteContexten);
    if (pick) voegToe(pick);
  }

  gekozen.sort(
    (a, b) => FASE_SLUGS.indexOf(a.hoofdfase) - FASE_SLUGS.indexOf(b.hoofdfase),
  );
  return gekozen;
}

export function kiezerLinkVoorFase(slug, taal, aantalBeschikbaar) {
  const base = usesEnglishRoutes(taal) ? "/library/worksheets" : "/bibliotheek/werkbladen";
  const params = new URLSearchParams({ fasen: slug });
  if (aantalBeschikbaar !== 0) {
    params.set("status", "beschikbaar");
  }
  return `${base}?${params.toString()}`;
}