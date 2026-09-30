import { scaleOptions } from "../config/statements";

/**
 * Antwoordschaal 1–5 als radiogroep.
 *
 * Bewust zonder zichtbare cijfers: de scan kent geen rapportcijfer, en cijfers
 * bij de knoppen nodigen uit tot rekenen in plaats van tot een oordeel.
 *
 * @param {object} props
 * @param {number | undefined} props.value
 * @param {(value: number) => void} props.onChange
 * @param {string} props.labelledBy id van de bijbehorende stelling
 */
export default function ScaleInput({ value, onChange, labelledBy }) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="grid gap-2 sm:grid-cols-5">
      {scaleOptions.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={[
              "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition duration-300 ease-soft",
              "sm:flex-col sm:items-center sm:justify-start sm:gap-2 sm:px-2 sm:py-4 sm:text-center",
              selected
                ? "border-ink/25 bg-white shadow-glass"
                : "border-hairline bg-white/55 hover:-translate-y-0.5 hover:bg-white/80",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition",
                selected ? "border-ink bg-ink" : "border-ink-muted/50 bg-transparent",
              ].join(" ")}
              aria-hidden="true"
            >
              {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
            </span>
            <span className={selected ? "text-sm font-semibold text-ink" : "text-sm text-ink-soft"}>
              <span className="sm:hidden">{option.label}</span>
              <span className="hidden sm:inline">{option.short}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
