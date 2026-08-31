import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ethischLeiderschap } from "../config";

export default function EthischLeiderschap({ onBack }) {
  const [antwoorden, setAntwoorden] = useState(Array(ethischLeiderschap.vragen.length).fill(""));

  function updateAntwoord(index, waarde) {
    const nieuw = [...antwoorden];
    nieuw[index] = waarde;
    setAntwoorden(nieuw);
  }

  return (
    <div className="glass droplet-accent relative overflow-hidden p-6 sm:p-9">
      <p className="eyebrow">Leiderschap</p>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
        {ethischLeiderschap.titel}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{ethischLeiderschap.intro}</p>

      <div className="mt-8 space-y-7">
        {ethischLeiderschap.vragen.map((vraag, i) => (
          <div key={vraag}>
            <label className="mb-3 block text-base font-semibold leading-relaxed text-ink">{vraag}</label>
            <textarea
              value={antwoorden[i]}
              onChange={(e) => updateAntwoord(i, e.target.value)}
              placeholder="Alleen zichtbaar voor jou — wordt nergens opgeslagen"
              className="field min-h-[4.5rem] resize-y"
            />
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-muted">{ethischLeiderschap.bron}</p>

      <button type="button" onClick={onBack} className="btn-ghost mt-7">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Terug naar het teamresultaat
      </button>
    </div>
  );
}
