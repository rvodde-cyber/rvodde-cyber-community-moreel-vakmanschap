import { useMemo } from "react";
import { getThemas, themaLabel } from "../lib/themas";

const uiTekst = {
  nl: {
    legend: "Thema",
    clear: "Thema's wissen",
  },
  en: {
    legend: "Theme",
    clear: "Clear themes",
  },
};

function toggleThema(selected, id) {
  return selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
}

export default function ThemaFilter({ selected = [], onChange, counts, dataLang = "nl" }) {
  const ui = uiTekst[dataLang] ?? uiTekst.nl;
  const themas = useMemo(() => getThemas(dataLang), [dataLang]);
  const hasSelection = selected.length > 0;

  return (
    <fieldset className="mb-4 border-0 p-0">
      <legend className="mb-2 text-sm font-semibold text-primair">{ui.legend}</legend>
      <div className="flex flex-wrap gap-2">
        {themas.map((thema) => {
          const active = selected.includes(thema.id);
          const count = counts?.[thema.id];
          const showCount = counts != null && count !== undefined;
          const disabled = !active && showCount && count === 0;
          const label = `${thema.label}${showCount ? ` (${count})` : ""}`;

          return (
            <button
              key={thema.id}
              type="button"
              aria-pressed={active}
              aria-disabled={disabled || undefined}
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                onChange(toggleThema(selected, thema.id));
              }}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#534ab7]"
              style={{
                backgroundColor: active ? "#534ab7" : "transparent",
                color: active ? "#ffffff" : disabled ? "var(--tekst-secundair)" : "var(--tekst-primair)",
                border: `1.5px solid ${active ? "#534ab7" : "var(--rand)"}`,
                opacity: disabled ? 0.45 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      {hasSelection && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="mt-3 text-sm font-semibold transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#534ab7]"
          style={{ color: "#534ab7" }}
        >
          {ui.clear}
        </button>
      )}
    </fieldset>
  );
}

export function ThemaChips({ themaIds, dataLang = "nl", max = 3 }) {
  if (!themaIds?.length) return null;
  const ids = themaIds.slice(0, max);
  return (
    <div className="flex flex-wrap gap-1">
      {ids.map((id) => (
        <span
          key={id}
          className="rounded-full px-2 py-0.5 text-[0.65rem] font-medium"
          style={{
            backgroundColor: "#eeecf9",
            color: "#534ab7",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          {themaLabel(id, dataLang)}
        </span>
      ))}
    </div>
  );
}