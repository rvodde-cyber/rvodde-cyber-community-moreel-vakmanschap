import { motion } from "framer-motion";

const WAARDEN_PREVIEW = [
  "Loyaliteit", "Rechtvaardigheid", "Moed", "Empathie",
  "Veiligheid", "Macht", "Geheimhouding", "Publiek belang"
];

export default function GameHome({ onStart }) {
  return (
    <div className="min-h-screen bg-[#0f0d0a] text-white flex flex-col">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#854f0b]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#534ab7]/8 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 items-center justify-center px-6 py-16 text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#854f0b]"
        >
          Moreel Vakmanschap · Stap 2: Voelen
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Rad van<br />
          <span className="italic text-[#c87d2e]">Moreel Fortuin</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-white/55"
        >
          Een speelse dialoogtool die morele spanning zichtbaar maakt.
          Niet om het antwoord te geven — maar om het gesprek te starten.
        </motion.p>

        {/* Waarden chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-2 max-w-sm"
        >
          {WAARDEN_PREVIEW.map((w, i) => (
            <span
              key={w}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50"
            >
              {w}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 rounded-2xl bg-[#c87d2e] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#d98c3e] hover:shadow-[#c87d2e]/30 hover:shadow-xl active:scale-[0.98]"
          >
            <span>Start sessie</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid gap-4 sm:grid-cols-3 max-w-2xl w-full text-left"
        >
          {[
            { n: "01", label: "Draai het rad", desc: "Een morele waarde of spanning komt bovenaan." },
            { n: "02", label: "Lees het dilemma", desc: "Een echte situatie, zonder eenduidig antwoord." },
            { n: "03", label: "Bespreek samen", desc: "Wissel van perspectief. Voel de morele frictie." },
          ].map((step) => (
            <div key={step.n} className="rounded-xl border border-white/8 bg-white/[0.03] p-5">
              <p className="mb-2 text-xs font-bold tracking-widest text-[#854f0b]/70">{step.n}</p>
              <p className="font-semibold text-white/80 mb-1">{step.label}</p>
              <p className="text-xs leading-relaxed text-white/40">{step.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 py-6 text-center text-xs text-white/20"
      >
        Geen scores · Geen winnaars · Wel echte gesprekken
      </motion.div>
    </div>
  );
}
