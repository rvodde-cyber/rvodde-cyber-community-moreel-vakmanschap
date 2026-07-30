import { useState } from "react";
import { motion } from "framer-motion";

const REFLECTIE_VRAGEN = [
  { vraag: "Welke waarden botsten er in dit dilemma?", icon: "⚡" },
  { vraag: "Wat voelde ongemakkelijk?", icon: "🌊" },
  { vraag: "Wanneer twijfelde je?", icon: "🔍" },
  { vraag: "Welke verantwoordelijkheid voelde je?", icon: "⚖️" },
  { vraag: "Wat zou jij anders doen dan de anderen?", icon: "🔄" },
  { vraag: "Hoe keek jouw perspectief de situatie anders aan?", icon: "👁" },
];

export default function ReflectionScreen({ card, waarde, onNieuwRond, onAfsluiten }) {
  const [beantwoord, setBeantwoord] = useState(new Set());

  function toggle(i) {
    setBeantwoord((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const titel = card?.titel ?? card?.nl?.titel ?? "Dilemma";

  return (
    <div className="min-h-screen bg-[#0f0d0a] flex flex-col px-6 py-12">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#534ab7]/8 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#534ab7]/80 mb-3">
            Reflectie
          </p>
          <h2
            className="font-display text-4xl font-semibold text-white mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Wat raakte jullie?
          </h2>
          <p className="text-sm text-white/40 mb-2">
            Dilemma: <span className="text-white/60 font-medium">{titel}</span>
            {waarde && (
              <> · Waarde: <span className="text-white/60 font-medium">{waarde.label?.replace("\n", "")}</span></>
            )}
          </p>
          <p className="text-xs text-white/25 mb-8">
            Geen scores. Geen winnaars. Wel echte gesprekken.
          </p>
        </motion.div>

        {/* Reflectie vragen */}
        <div className="grid gap-3 flex-1">
          {REFLECTIE_VRAGEN.map((item, i) => {
            const done = beantwoord.has(i);
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => toggle(i)}
                className={`w-full text-left rounded-2xl border p-5 transition-all ${
                  done
                    ? "border-[#534ab7]/30 bg-[#534ab7]/10"
                    : "border-white/8 bg-white/[0.03] hover:border-white/15"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <p className={`text-sm font-medium leading-relaxed flex-1 ${done ? "text-white/80" : "text-white/60"}`}>
                    {item.vraag}
                  </p>
                  <div
                    className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all mt-0.5 ${
                      done ? "border-[#534ab7]/60 bg-[#534ab7]/30" : "border-white/15"
                    }`}
                  >
                    {done && (
                      <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Leefregel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-2xl border border-white/6 bg-white/[0.02] p-6 text-center"
        >
          <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Kerngedachte</p>
          <p
            className="font-display text-xl italic text-white/60 leading-relaxed"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            "Moreel vakmanschap is niet het vermogen om het juiste antwoord te geven,
            maar om de juiste vragen te blijven stellen."
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid sm:grid-cols-2 gap-3"
        >
          <button
            onClick={onNieuwRond}
            className="group flex items-center justify-center gap-2 rounded-2xl bg-[#c87d2e] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#d98c3e] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 20C5.6 17.3 8.6 15 12 15c3.4 0 6.4 2.3 8 5M20 4c-1.6 2.7-4.6 5-8 5S5.6 6.7 4 4" />
            </svg>
            Nieuw rond
          </button>
          <button
            onClick={onAfsluiten}
            className="group flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/60 transition-all hover:text-white hover:border-white/25"
          >
            Sessie afsluiten
          </button>
        </motion.div>
      </div>
    </div>
  );
}
