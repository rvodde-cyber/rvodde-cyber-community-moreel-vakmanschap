import { motion } from "framer-motion";
import { getCategorieKleur } from "../../data/gesprekskaarten/constants.js";

const MOEILIJKHEID_LABELS = { 1: "Micro", 2: "Meso", 3: "Macro" };
const MOEILIJKHEID_DOTS = { 1: 1, 2: 2, 3: 3 };

export default function DilemmaCard({ card, waarde, onContinue }) {
  if (!card) return null;

  const kleur = getCategorieKleur(card.categorie ?? card.categorieSlug ?? "");
  const titel = card.titel ?? card.nl?.titel ?? "—";
  const verhaal = card.verhaal ?? card.nl?.verhaal ?? "";
  const vraag = card.vraag1 ?? card.nl?.vraag1 ?? "";
  const moeilijkheid = card.moeilijkheid ?? 1;

  return (
    <div className="min-h-screen bg-[#0f0d0a] flex flex-col items-center justify-center px-6 py-12">
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${kleur}15 0%, transparent 60%)` }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Waarde badge */}
        {waarde && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2"
          >
            <span
              className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: `${kleur}20`, color: kleur }}
            >
              {waarde.label?.replace("\n", "")}
            </span>
          </motion.div>
        )}

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl border border-white/8 bg-white/[0.04] p-8 sm:p-10 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35 mb-2">
                Dilemma
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {titel}
              </h2>
            </div>

            {/* Difficulty */}
            <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-1">
              <div className="flex gap-1">
                {[1, 2, 3].map((d) => (
                  <div
                    key={d}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: d <= moeilijkheid ? kleur : "rgba(255,255,255,0.1)"
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-white/30 font-medium">
                {MOEILIJKHEID_LABELS[moeilijkheid]}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-12 h-px mb-6" style={{ backgroundColor: kleur }} />

          {/* Scenario */}
          <p className="text-base sm:text-lg leading-[1.8] text-white/75 mb-8">
            {verhaal}
          </p>

          {/* Vraag */}
          <div
            className="rounded-2xl border-l-4 p-5"
            style={{ borderColor: kleur, backgroundColor: `${kleur}10` }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: kleur }}>
              Discussievraag
            </p>
            <p className="text-base font-semibold text-white/90">
              {vraag}
            </p>
          </div>
        </motion.div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={onContinue}
            className="group flex items-center gap-3 rounded-2xl bg-white/8 border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/80 hover:bg-white/12 hover:text-white transition-all"
          >
            Perspectief injecteren
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
