import { LIKERT_LABELS } from "../data/dimensions";

export default function LikertScale({ value, onChange, stellingId }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-1" role="radiogroup" aria-label="Antwoord schaal">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={LIKERT_LABELS[n]}
              onClick={() => onChange(stellingId, n)}
              className={`flex h-12 min-w-[3rem] flex-1 items-center justify-center rounded-xl border-2 text-sm font-semibold transition-all active:scale-95 sm:h-14 sm:text-base ${
                selected
                  ? "border-nachtblauw bg-nachtblauw text-verdenk-wit shadow-md"
                  : "border-mistgrijs/50 bg-white/80 text-nachtblauw/70 hover:border-amber/60 hover:bg-white"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between px-1 text-xs text-nachtblauw/50 sm:text-sm">
        <span>Helemaal oneens</span>
        <span>Helemaal eens</span>
      </div>
    </div>
  );
}
