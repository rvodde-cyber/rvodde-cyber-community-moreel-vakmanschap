import { useMemo } from "react";
import { useTaal } from "../context/TaalContext";
import { COMPLEXITY_KEYS } from "../data/gesprekskaarten/constants";
import { FASE_KLEUREN, getFaseNaam } from "../data/werkbladen";
import { getBibliotheekDataLang } from "../data/vertalingen";

export const EMPTY_WERKBLAD_FILTERS = {
  complexiteit: "",
  vakgebied: "",
  opleidingsniveau: "",
  zoek: "",
  fasen: [],
};

const uiTekst = {
  nl: {
    showing: "{count} van {total} werkbladen",
    reset: "Filters wissen",
    complexiteit: "Complexiteit",
    vakgebied: "Vakgebied",
    opleidingsniveau: "Opleidingsniveau",
    zoek: "Zoeken",
    zoekPlaceholder: "Titel of thema…",
    fase: "Fase",
    all: "Alle",
  },
  en: {
    showing: "{count} of {total} worksheets",
    reset: "Clear filters",
    complexiteit: "Complexity",
    vakgebied: "Field",
    opleidingsniveau: "Education level",
    zoek: "Search",
    zoekPlaceholder: "Title or theme…",
    fase: "Phase",
    all: "All",
  },
};

const FASE_SLUGS = ["zien", "voelen", "wegen", "handelen", "volhouden"];

/** Split comma-separated opleidingsniveau (e.g. "MBO, HBO, WO") into distinct levels. */
export function parseOpleidingsniveaus(value) {
  if (!value || typeof value !== "string") return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

export function filterWerkbladen(items, filters) {
  const q = filters.zoek.trim().toLowerCase();
  return items.filter((item) => {
    if (filters.complexiteit && item.complexiteit !== filters.complexiteit) return false;
    if (filters.vakgebied && item.vakgebied !== filters.vakgebied) return false;
    if (filters.opleidingsniveau) {
      const levels = parseOpleidingsniveaus(item.opleidingsniveau);
      if (!levels.includes(filters.opleidingsniveau)) return false;
    }
    if (filters.fasen?.length > 0) {
      const match = filters.fasen.some((f) => item.fasen.includes(f));
      if (!match) return false;
    }
    if (q) {
      const inTitel = item.titel.toLowerCase().includes(q);
      const inThema = item.themas.some((t) => t.toLowerCase().includes(q));
      if (!inTitel && !inThema) return false;
    }
    return true;
  });
}

export function collectFilterOptions(items) {
  const vakgebied = [...new Set(items.map((i) => i.vakgebied).filter(Boolean))].sort();
  const opleidingsniveau = [
    ...new Set(items.flatMap((i) => parseOpleidingsniveaus(i.opleidingsniveau))),
  ].sort();
  return { vakgebied, opleidingsniveau, complexiteit: COMPLEXITY_KEYS };
}

export default function WerkbladFilters({
  filters,
  onChange,
  options,
  resultCount,
  totalCount,
  showFaseFilter = false,
}) {
  const { taal, t } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const ui = uiTekst[dataLang] ?? uiTekst.nl;
  const complexLabels = t.gesprekskaart?.complexiteitLabels ?? {};

  const hasActive =
    filters.complexiteit ||
    filters.vakgebied ||
    filters.opleidingsniveau ||
    filters.zoek ||
    (filters.fasen?.length ?? 0) > 0;

  const toggleFase = (slug) => {
    const current = filters.fasen ?? [];
    const next = current.includes(slug) ? current.filter((f) => f !== slug) : [...current, slug];
    onChange({ ...filters, fasen: next });
  };

  const faseKnoppen = useMemo(
    () =>
      FASE_SLUGS.map((slug) => ({
        slug,
        label: getFaseNaam(slug, dataLang),
        kleur: FASE_KLEUREN[slug],
      })),
    [dataLang],
  );

  return (
    <div className="mb-8 rounded-xl border border-rand bg-white p-4 shadow-warm md:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-secundair">
          {ui.showing.replace("{count}", String(resultCount)).replace("{total}", String(totalCount))}
        </p>
        {hasActive && (
          <button
            type="button"
            onClick={() => onChange({ ...EMPTY_WERKBLAD_FILTERS })}
            className="text-sm font-semibold text-accent transition hover:underline"
          >
            {ui.reset}
          </button>
        )}
      </div>

      {showFaseFilter && (
        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold text-primair">{ui.fase}</p>
          <div className="flex flex-wrap gap-2">
            {faseKnoppen.map(({ slug, label, kleur }) => {
              const active = filters.fasen?.includes(slug);
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => toggleFase(slug)}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition"
                  style={{
                    backgroundColor: active ? kleur : "transparent",
                    color: active ? "#fff" : kleur,
                    border: `1.5px solid ${kleur}`,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{ui.complexiteit}</span>
          <select
            value={filters.complexiteit}
            onChange={(e) => onChange({ ...filters, complexiteit: e.target.value })}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          >
            <option value="">{ui.all}</option>
            {(options.complexiteit ?? COMPLEXITY_KEYS).map((key) => (
              <option key={key} value={key}>
                {complexLabels[key] ?? key}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{ui.vakgebied}</span>
          <select
            value={filters.vakgebied}
            onChange={(e) => onChange({ ...filters, vakgebied: e.target.value })}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          >
            <option value="">{ui.all}</option>
            {(options.vakgebied ?? []).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{ui.opleidingsniveau}</span>
          <select
            value={filters.opleidingsniveau}
            onChange={(e) => onChange({ ...filters, opleidingsniveau: e.target.value })}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          >
            <option value="">{ui.all}</option>
            {(options.opleidingsniveau ?? []).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2 lg:col-span-1">
          <span className="font-semibold text-primair">{ui.zoek}</span>
          <input
            type="search"
            value={filters.zoek}
            onChange={(e) => onChange({ ...filters, zoek: e.target.value })}
            placeholder={ui.zoekPlaceholder}
            className="min-w-0 rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          />
        </label>
      </div>
    </div>
  );
}
