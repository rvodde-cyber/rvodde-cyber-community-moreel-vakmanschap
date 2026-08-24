import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { fundament } from "../config";

export default function Fundament({ onVerder }) {
  const [antwoorden, setAntwoorden] = useState(Array(fundament.vragen.length).fill(""));

  function updateAntwoord(index, waarde) {
    const nieuw = [...antwoorden];
    nieuw[index] = waarde;
    setAntwoorden(nieuw);
  }

  return (
    <div className="glass droplet-accent relative overflow-hidden p-6 sm:p-9">
      <p className="eyebrow">Fundament</p>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
        {fundament.titel}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{fundament.intro}</p>

      <div className="mt-8 space-y-7">
        {fundament.vragen.map((item, i) => (
          <div key={item.dimensie}>
            <span className="eyebrow">{item.dimensie}</span>
            <label className="mt-2 block text-base font-semibold leading-relaxed text-ink">
              {item.vraag}
            </label>
            {item.toelichting ? (
              <p className="mt-1.5 mb-3 text-sm italic leading-relaxed text-ink-muted">{item.toelichting}</p>
            ) : (
              <div className="mb-3" />
            )}
            <textarea
              value={antwoorden[i]}
              onChange={(e) => updateAntwoord(i, e.target.value)}
              placeholder="Alleen zichtbaar voor jou — wordt nergens opgeslagen"
              className="field min-h-[4.5rem] resize-y"
            />
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-muted">{fundament.bron}</p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onVerder} className="btn-primary">
          Verder naar het teamwiel
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={onVerder} className="btn-ghost">
          Sla over
        </button>
      </div>
    </div>
  );
}
