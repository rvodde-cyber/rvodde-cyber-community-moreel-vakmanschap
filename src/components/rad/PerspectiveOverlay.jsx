import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PERSPECTIEVEN = [
  { rol: "Medewerker", omschrijving: "Iemand die dagelijks werkt in deze situatie." },
  { rol: "Leidinggevende", omschrijving: "Verantwoordelijk voor het team en de beslissing." },
  { rol: "Burger", omschrijving: "Een buitenstaander die de gevolgen voelt." },
  { rol: "Vriend", omschrijving: "Iemand die persoonlijk betrokken is." },
  { rol: "Student", omschrijving: "Iemand in opleiding, nog zonder macht." },
  { rol: "Slachtoffer", omschrijving: "Degene die direct geraakt wordt door de keuze." },
  { rol: "Journalist", omschrijving: "Iemand die dit morgen in het nieuws brengt." },
  { rol: "Toezichthouder", omschrijving: "Iemand die de regels bewaakt." },
  { rol: "Naaste", omschrijving: "Een familielid of goede bekende van wie het gaat." },
  { rol: "Klokkenluider", omschrijving: "Iemand die de waarheid naar buiten wil brengen." },
];

function getRandomPerspectieven(n = 3) {
  const shuffled = [...PERSPECTIEVEN].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const KLEUR_PALET = ["#7c3aed", "#185fa5", "#0f6e56", "#993556", "#854f0b"];

export default function PerspectiveOverlay({ onContinue }) {
  const [perspectieven] = useState(() => getRandomPerspectieven(3));
  const [actief, setActief] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActief(0);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0d0a] flex flex-col items-center justify-center px-6 py-12">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#7c3aed]/8 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c3aed]/80 mb-3">
            Perspectief injectie
          </p>
          <h2
            className="font-display text-4xl font-semibold text-white mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Bekijk dit vanuit...
          </h2>
          <p className="text-sm text-white/40 mb-8">
            Kies een rol en verdedig dat standpunt in de discussie.
          </p>
        </motion.div>

        {/* Perspectief kaarten */}
        <div className="grid gap-3">
          {perspectieven.map((p, i) => {
            const kleur = KLEUR_PALET[i % KLEUR_PALET.length];
            const isActief = actief === i;

            return (
              <motion.button
                key={p.rol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.12 }}
                onClick={() => setActief(isActief ? null : i)}
                className={`w-full text-left rounded-2xl border p-5 transition-all ${
                  isActief
                    ? "border-white/20 bg-white/8"
                    : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ backgroundColor: `${kleur}20`, color: kleur }}
                  >
                    {p.rol[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{p.rol}</p>
                    <p className="text-xs text-white/40 mt-0.5">{p.omschrijving}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                      isActief ? "border-white/50" : "border-white/15"
                    }`}
                  >
                    {isActief && <div className="w-2.5 h-2.5 rounded-full bg-white/70" />}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Extra perspectief hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 rounded-xl border border-white/6 bg-white/[0.02] p-4"
        >
          <p className="text-xs text-white/35 italic leading-relaxed">
            "Stel dat jij <strong className="text-white/50 font-semibold">deze persoon</strong> bent — 
            wat voel je dan als eerste? Welke belangen verdedig je?"
          </p>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <button
            onClick={onContinue}
            className="w-full group flex items-center justify-center gap-3 rounded-2xl bg-[#c87d2e] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#d98c3e] hover:shadow-xl active:scale-[0.98]"
          >
            Start discussie + timer
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
