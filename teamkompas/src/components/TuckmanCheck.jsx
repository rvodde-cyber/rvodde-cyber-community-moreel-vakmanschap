import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { tuckmanTyperingen, tuckmanBron } from "../config";
import { ProgressBar } from "./AppShell";

const faseVolgorde = ["forming", "storming", "norming", "performing", "adjourning"];

export default function TuckmanCheck({ onVerder }) {
  const [stap, setStap] = useState(0);
  const [waarden, setWaarden] = useState({
    forming: 50,
    storming: 50,
    norming: 50,
    performing: 50,
    adjourning: 50,
  });

  const huidigeFase = faseVolgorde[stap];
  const typering = tuckmanTyperingen[huidigeFase];
  const isLast = stap === faseVolgorde.length - 1;

  function volgende() {
    if (stap < faseVolgorde.length - 1) {
      setStap(stap + 1);
    } else {
      onVerder(waarden);
    }
  }

  function vorige() {
    if (stap > 0) setStap(stap - 1);
  }

  return (
    <div className="glass droplet-accent relative overflow-hidden p-6 sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">
          Typering {stap + 1} van {faseVolgorde.length}
        </p>
        <ProgressBar value={(stap + 1) / faseVolgorde.length} />
      </div>

      <h2 className="mt-7 font-serif text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
        {typering.titel}
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-ink-soft">{typering.tekst}</p>

      <div className="mt-8">
        <label className="mb-3 block text-base font-semibold text-ink">
          In welke mate herken je dit bij jullie team?
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={waarden[huidigeFase]}
          onChange={(e) => setWaarden({ ...waarden, [huidigeFase]: Number(e.target.value) })}
          className="range"
        />
        <div className="mt-2 flex justify-between text-sm text-ink-muted">
          <span>Helemaal niet</span>
          <span>Helemaal wel</span>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-muted">{tuckmanBron}</p>

      <div className="mt-7 flex items-center justify-between gap-3">
        {stap > 0 ? (
          <button type="button" onClick={vorige} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Vorige
          </button>
        ) : (
          <span />
        )}
        <button type="button" onClick={volgende} className="btn-primary">
          {isLast ? "Verder naar het resultaat" : "Volgende"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
