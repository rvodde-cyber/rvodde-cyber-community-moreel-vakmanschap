import { niveauUitleg } from "../data/niveauUitleg";

const NIVEAU_VOLGORDE = ["kwetsbaar", "groeiend", "sterk"];

export default function AxisSelector({ axis, selected, onSelect, disabled = false }) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">{axis.label}</h2>
      <p className="mt-1.5 text-base text-ink-muted">Resultaat: {axis.resultaat}</p>

      <div className="glass-subtle mt-5 p-4 sm:p-5">
        <p className="mb-3.5 text-base leading-relaxed text-ink-soft">{niveauUitleg.intro}</p>
        <div className="flex flex-col gap-2.5">
          {NIVEAU_VOLGORDE.map((niveau) => (
            <p key={niveau} className="text-base leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">{niveauUitleg[niveau].label}</span>
              {" — "}
              {niveauUitleg[niveau].tekst}
            </p>
          ))}
        </div>
      </div>

      <p className="mb-3 mt-6 text-base font-medium text-ink">Welke stelling past het beste?</p>

      <div className="flex flex-col gap-2">
        {NIVEAU_VOLGORDE.map((niveau) => {
          const isSelected = selected === niveau;
          return (
            <button
              key={niveau}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(niveau)}
              className={[
                "rounded-2xl border px-4 py-3.5 text-left transition duration-300 ease-soft",
                isSelected
                  ? "border-ink/25 bg-white shadow-glass"
                  : "border-hairline bg-white/55 hover:-translate-y-0.5 hover:bg-white/80",
                disabled && !isSelected ? "opacity-55" : "",
                disabled ? "cursor-wait" : "",
              ].join(" ")}
            >
              <span className={isSelected ? "mb-1 block text-base font-semibold text-ink" : "mb-1 block text-base font-semibold text-ink-soft"}>
                {niveauUitleg[niveau].label}
              </span>
              <span className="text-base leading-relaxed text-ink-soft">{axis.niveaus[niveau]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
