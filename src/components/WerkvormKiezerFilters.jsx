import { useMemo } from "react";
import { useTaal } from "../context/TaalContext";
import { COMPLEXITY_KEYS } from "../data/gesprekskaarten/constants";
import { FASE_KLEUREN, getFaseNaam } from "../data/werkbladen";
import { getBibliotheekDataLang } from "../data/vertalingen";
import { getRegioLijst } from "../data/werkvormen";
import {
  EMPTY_KIEZER_FILTERS,
  FASE_SLUGS,
  GROUP_FILTER_KEYS,
  NIVEAU_FILTER_KEYS,
  SORT_KEYS,
  STATUS_KEYS,
  TIME_FILTER_KEYS,
} from "../lib/werkvormenKiezer";

const uiTekst = {
  nl: {
    showing: "{count} van {total} werkbladen",
    reset: "Filters wissen",
    empty: "Geen werkbladen gevonden. Probeer een filter los te laten of de zoekterm aan te passen.",
    fase: "Fase",
    tijd: "Tijd",
    groep: "Groepsgrootte",
    niveau: "Niveau",
    context: "Context",
    contextHint: "Context en complexiteit alleen bij beschikbare werkbladen",
    complexiteit: "Complexiteit",
    regio: "Regio",
    status: "Status",
    zoek: "Zoeken",
    zoekPlaceholder: "Titel, herkomst of beschrijving…",
    sort: "Sorteren",
    sortId: "Nummer (MW)",
    sortTitel: "Titel",
    sortTijd: "Tijd (kort → lang)",
    statusBeschikbaar: "Beschikbaar",
    statusVoorbereiding: "In voorbereiding",
    statusExtern: "Externe methode",
    tijd_tot_20: "Tot 20 min",
    tijd_20_45: "20–45 min",
    tijd_45_90: "45–90 min",
    tijd_boven_90: "> 90 min",
    tijd_meerdere_doorlopend: "Meerdere sessies / doorlopend",
    groep_1_5: "1–5",
    groep_6_15: "6–15",
    groep_16_30: "16–30",
    groep_boven_30: "> 30",
  },
  en: {
    showing: "{count} of {total} worksheets",
    reset: "Clear filters",
    empty: "No worksheets found. Try removing a filter or changing your search.",
    fase: "Phase",
    tijd: "Duration",
    groep: "Group size",
    niveau: "Level",
    context: "Context",
    contextHint: "Context and complexity apply only to available worksheets",
    complexiteit: "Complexity",
    regio: "Region",
    status: "Status",
    zoek: "Search",
    zoekPlaceholder: "Title, origin or description…",
    sort: "Sort by",
    sortId: "Number (MW)",
    sortTitel: "Title",
    sortTijd: "Duration (short → long)",
    statusBeschikbaar: "Available",
    statusVoorbereiding: "In preparation",
    statusExtern: "External method",
    tijd_tot_20: "Up to 20 min",
    tijd_20_45: "20–45 min",
    tijd_45_90: "45–90 min",
    tijd_boven_90: "> 90 min",
    tijd_meerdere_doorlopend: "Multiple sessions / ongoing",
    groep_1_5: "1–5",
    groep_6_15: "6–15",
    groep_16_30: "16–30",
    groep_boven_30: "> 30",
  },
};

const STATUS_LABEL_KEY = {
  beschikbaar: "statusBeschikbaar",
  in_voorbereiding: "statusVoorbereiding",
  externe_methode: "statusExtern",
};

function toggleInList(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function FilterChipGroup({ label, hint, children }) {
  return (
    <div className="mb-4">
      <p className="mb-1 text-sm font-semibold text-primair">{label}</p>
      {hint && <p className="mb-2 text-xs text-secundair">{hint}</p>}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ChipButton({ active, onClick, children, accent, ariaLabel }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={ariaLabel}
      onClick={onClick}
      className="rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2D8E]"
      style={
        accent
          ? {
              backgroundColor: active ? accent : "transparent",
              color: active ? "#fff" : accent,
              border: `1.5px solid ${accent}`,
            }
          : {
              backgroundColor: active ? "#5B2D8E" : "transparent",
              color: active ? "#fff" : "var(--tekst-primair)",
              border: `1.5px solid ${active ? "#5B2D8E" : "var(--rand)"}`,
            }
      }
    >
      {children}
    </button>
  );
}

export default function WerkvormKiezerFilters({
  filters,
  onChange,
  options,
  resultCount,
  totalCount,
}) {
  const { taal, t } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const ui = uiTekst[dataLang] ?? uiTekst.nl;
  const complexLabels = t.gesprekskaart?.complexiteitLabels ?? {};
  const regioLijst = useMemo(() => getRegioLijst(), []);

  const hasActive =
    filters.fasen?.length ||
    filters.tijd?.length ||
    filters.groep?.length ||
    filters.niveaus?.length ||
    filters.context?.length ||
    filters.complexiteit?.length ||
    filters.regio?.length ||
    filters.status?.length !== STATUS_KEYS.length ||
    filters.zoek?.trim() ||
    filters.sort !== "id";

  const faseKnoppen = useMemo(
    () =>
      FASE_SLUGS.map((slug) => ({
        slug,
        label: getFaseNaam(slug, dataLang),
        kleur: FASE_KLEUREN[slug],
      })),
    [dataLang],
  );

  const patch = (partial) => onChange({ ...filters, ...partial });

  return (
    <div className="mb-8 rounded-xl border border-rand bg-white p-4 shadow-warm md:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-secundair">
          {ui.showing.replace("{count}", String(resultCount)).replace("{total}", String(totalCount))}
        </p>
        {hasActive && (
          <button
            type="button"
            onClick={() => onChange({ ...EMPTY_KIEZER_FILTERS })}
            className="text-sm font-semibold text-[#5B2D8E] transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2D8E]"
          >
            {ui.reset}
          </button>
        )}
      </div>

      <FilterChipGroup label={ui.fase}>
        {faseKnoppen.map(({ slug, label, kleur }) => (
          <ChipButton
            key={slug}
            active={filters.fasen?.includes(slug)}
            accent={kleur}
            ariaLabel={`${ui.fase}: ${label}`}
            onClick={() => patch({ fasen: toggleInList(filters.fasen ?? [], slug) })}
          >
            {label}
          </ChipButton>
        ))}
      </FilterChipGroup>

      <FilterChipGroup label={ui.tijd}>
        {TIME_FILTER_KEYS.map((key) => (
          <ChipButton
            key={key}
            active={filters.tijd?.includes(key)}
            ariaLabel={`${ui.tijd}: ${ui[`tijd_${key}`] ?? key}`}
            onClick={() => patch({ tijd: toggleInList(filters.tijd ?? [], key) })}
          >
            {ui[`tijd_${key}`] ?? key}
          </ChipButton>
        ))}
      </FilterChipGroup>

      <FilterChipGroup label={ui.groep}>
        {GROUP_FILTER_KEYS.map((key) => (
          <ChipButton
            key={key}
            active={filters.groep?.includes(key)}
            ariaLabel={`${ui.groep}: ${ui[`groep_${key}`] ?? key}`}
            onClick={() => patch({ groep: toggleInList(filters.groep ?? [], key) })}
          >
            {ui[`groep_${key}`] ?? key}
          </ChipButton>
        ))}
      </FilterChipGroup>

      <FilterChipGroup label={ui.niveau}>
        {NIVEAU_FILTER_KEYS.map((key) => (
          <ChipButton
            key={key}
            active={filters.niveaus?.includes(key)}
            ariaLabel={`${ui.niveau}: ${key}`}
            onClick={() => patch({ niveaus: toggleInList(filters.niveaus ?? [], key) })}
          >
            {key}
          </ChipButton>
        ))}
      </FilterChipGroup>

      <FilterChipGroup label={ui.context} hint={ui.contextHint}>
        {(options.context ?? []).map((ctx) => (
          <ChipButton
            key={ctx}
            active={filters.context?.includes(ctx)}
            ariaLabel={`${ui.context}: ${ctx}`}
            onClick={() => patch({ context: toggleInList(filters.context ?? [], ctx) })}
          >
            {ctx}
          </ChipButton>
        ))}
      </FilterChipGroup>

      <FilterChipGroup label={ui.complexiteit} hint={ui.contextHint}>
        {COMPLEXITY_KEYS.map((key) => (
          <ChipButton
            key={key}
            active={filters.complexiteit?.includes(key)}
            accent="#993556"
            ariaLabel={`${ui.complexiteit}: ${complexLabels[key] ?? key}`}
            onClick={() => patch({ complexiteit: toggleInList(filters.complexiteit ?? [], key) })}
          >
            {complexLabels[key] ?? key}
          </ChipButton>
        ))}
      </FilterChipGroup>

      <FilterChipGroup label={ui.regio}>
        {regioLijst.map((r) => {
          const label = dataLang === "en" ? r.en : r.nl;
          return (
            <ChipButton
              key={r.slug}
              active={filters.regio?.includes(r.slug)}
              ariaLabel={`${ui.regio}: ${label}`}
              onClick={() => patch({ regio: toggleInList(filters.regio ?? [], r.slug) })}
            >
              {label}
            </ChipButton>
          );
        })}
      </FilterChipGroup>

      <FilterChipGroup label={ui.status}>
        {STATUS_KEYS.map((key) => (
          <ChipButton
            key={key}
            active={filters.status?.includes(key)}
            ariaLabel={`${ui.status}: ${ui[STATUS_LABEL_KEY[key]]}`}
            onClick={() => patch({ status: toggleInList(filters.status ?? [], key) })}
          >
            {ui[STATUS_LABEL_KEY[key]]}
          </ChipButton>
        ))}
      </FilterChipGroup>

      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{ui.zoek}</span>
          <input
            type="search"
            value={filters.zoek}
            onChange={(e) => patch({ zoek: e.target.value })}
            placeholder={ui.zoekPlaceholder}
            className="min-w-0 rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#5B2D8E]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-semibold text-primair">{ui.sort}</span>
          <select
            value={filters.sort}
            onChange={(e) => patch({ sort: e.target.value })}
            className="rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5B2D8E]"
          >
            {SORT_KEYS.map((key) => (
              <option key={key} value={key}>
                {key === "id" ? ui.sortId : key === "titel" ? ui.sortTitel : ui.sortTijd}
              </option>
            ))}
          </select>
        </label>
      </div>

      {resultCount === 0 && (
        <p className="mt-4 text-sm text-secundair" role="status">{ui.empty}</p>
      )}
    </div>
  );
}
