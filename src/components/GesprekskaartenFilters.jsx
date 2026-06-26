import { useMemo } from "react";
import { useTaal } from "../context/TaalContext";

const EMPTY = {
  categorie: "",
  moeilijkheid: "",
  taalniveau: "",
  zoek: "",
};

export default function GesprekskaartenFilters({ filters, onChange, options, resultCount, totalCount }) {
  const { t } = useTaal();
  const f = t.gesprekskaart.filters;

  const categorieLabels = useMemo(() => {
    const map = f.categorieLabels ?? {};
    return (options.categorieen ?? []).map((slug) => ({
      value: slug,
      label: map[slug] ?? slug,
    }));
  }, [options.categorieen, f.categorieLabels]);

  const hasActiveFilters =
    filters.categorie || filters.moeilijkheid || filters.taalniveau || filters.zoek;

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

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{f.categorie}</span>
          <select
            value={filters.categorie}
            onChange={(e) => onChange({ ...filters, categorie: e.target.value })}
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
            {(options.moeilijkheden ?? []).map((n) => (
              <option key={n} value={String(n)}>
                {"★".repeat(n)}{"☆".repeat(3 - n)} ({n}/3)
              </option>
            ))}
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

        <label className="flex flex-col gap-1.5 text-sm md:col-span-2 lg:col-span-1">
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
    </div>
  );
}

export { EMPTY as EMPTY_FILTERS };
