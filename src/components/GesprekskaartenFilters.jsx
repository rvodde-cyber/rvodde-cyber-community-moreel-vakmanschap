import { useMemo } from "react";
import { useTaal } from "../context/TaalContext";
import { getComplexityKey, PASSENDE_ZORG_SUBCATEGORIEEN } from "../data/gesprekskaarten/constants";
import { getGesprekskaartStrings } from "../data/gesprekskaarten/i18n";

const EMPTY = {
  set: "",
  categorie: "",
  subcategorie: "",
  moeilijkheid: "",
  taalniveau: "",
  zoek: "",
};

export default function GesprekskaartenFilters({
  filters,
  onChange,
  options,
  resultCount,
  totalCount,
  showPassendeZorgSubfilter = false,
  passendeZorgSubcategorieCounts = null,
}) {
  const { taal, t } = useTaal();
  const f = t.gesprekskaart.filters;
  const gk = getGesprekskaartStrings(taal);
  const subCopy = f.passendeZorgSubfilter ?? {};

  const setLabels = useMemo(() => {
    const map = f.setLabels ?? {};
    return (options.sets ?? []).map((slug) => ({
      value: slug,
      label: map[slug] ?? slug,
    }));
  }, [options.sets, f.setLabels]);

  const categorieLabels = useMemo(() => {
    const map = f.categorieLabels ?? {};
    return (options.categorieen ?? []).map((slug) => ({
      value: slug,
      label: map[slug] ?? slug,
    }));
  }, [options.categorieen, f.categorieLabels]);

  const hasActiveFilters =
    filters.set ||
    filters.categorie ||
    filters.subcategorie ||
    filters.moeilijkheid ||
    filters.taalniveau ||
    filters.zoek;

  const subLabelMap = subCopy.subcategorieLabels ?? {};

  return (
    <div className="mb-8 rounded-xl border border-rand bg-white p-4 shadow-warm md:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-secundair">
          {f.showing.replace("{count}", String(resultCount)).replace("{total}", String(totalCount))}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => onChange(EMPTY)}
            className="text-sm font-semibold text-accent transition hover:underline"
          >
            {f.reset}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{f.reeks}</span>
          <select
            value={filters.set}
            onChange={(e) => {
              const set = e.target.value;
              const next = { ...filters, set };
              if (set !== "passende-zorg") next.subcategorie = "";
              onChange(next);
            }}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          >
            <option value="">{f.all}</option>
            {setLabels.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{f.categorie}</span>
          <select
            value={filters.categorie}
            onChange={(e) => {
              const categorie = e.target.value;
              const next = { ...filters, categorie };
              if (categorie !== "passende-zorg") next.subcategorie = "";
              onChange(next);
            }}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          >
            <option value="">{f.all}</option>
            {categorieLabels.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{f.moeilijkheid}</span>
          <select
            value={filters.moeilijkheid}
            onChange={(e) => onChange({ ...filters, moeilijkheid: e.target.value })}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          >
            <option value="">{f.all}</option>
            {(options.moeilijkheden ?? []).map((n) => {
              const key = getComplexityKey(n);
              const label = gk.complexiteitLabels?.[key] ?? `${"★".repeat(n)}${"☆".repeat(3 - n)}`;
              return (
                <option key={n} value={String(n)} title={gk.complexiteitTooltips?.[key] ?? ""}>
                  {label}
                </option>
              );
            })}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{f.taalniveau}</span>
          <select
            value={filters.taalniveau}
            onChange={(e) => onChange({ ...filters, taalniveau: e.target.value })}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          >
            <option value="">{f.all}</option>
            {(options.taalniveaus ?? []).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <span className="font-semibold text-primair">{f.zoek}</span>
          <input
            type="search"
            value={filters.zoek}
            onChange={(e) => onChange({ ...filters, zoek: e.target.value })}
            placeholder={f.zoekPlaceholder}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair"
          />
        </label>
      </div>

      {showPassendeZorgSubfilter && passendeZorgSubcategorieCounts && (
        <div className="mt-4 border-t border-rand pt-4">
          <p className="mb-2 text-sm font-semibold text-primair">{subCopy.label ?? "Onderdeel"}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label={subCopy.label ?? "Onderdeel"}>
            <button
              type="button"
              onClick={() => onChange({ ...filters, subcategorie: "" })}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                !filters.subcategorie
                  ? "border-accent bg-accent text-white"
                  : "border-rand bg-[#fafaf8] text-primair hover:border-accent"
              }`}
            >
              {subCopy.all ?? "Alle"} ({passendeZorgSubcategorieCounts.all})
            </button>
            {PASSENDE_ZORG_SUBCATEGORIEEN.map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    categorie: filters.categorie || "passende-zorg",
                    subcategorie: slug,
                  })
                }
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  filters.subcategorie === slug
                    ? "border-accent bg-accent text-white"
                    : "border-rand bg-[#fafaf8] text-primair hover:border-accent"
                }`}
              >
                {subLabelMap[slug] ?? slug} ({passendeZorgSubcategorieCounts[slug] ?? 0})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { EMPTY as EMPTY_FILTERS };
