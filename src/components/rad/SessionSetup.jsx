import { useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIE_SLUGS } from "../../data/gesprekskaarten/constants.js";

const CATEGORIE_LABELS = {
  "dagelijks-leven": "Dagelijks leven",
  werk: "Werk",
  duurzaamheid: "Duurzaamheid",
  "diversiteit-inclusie": "Diversiteit & Inclusie",
  "social-media": "Social Media",
  studentenleven: "Studentenleven",
  zorg: "Zorg",
  "nucleaire-geneeskunde": "Nucleaire geneeskunde",
  onderzoeksintegriteit: "Onderzoeksintegriteit",
  onderwijs: "Onderwijs",
  overheid: "Overheid",
};

const TIMER_OPTIES = [
  { label: "3 min", value: 180 },
  { label: "5 min", value: 300 },
  { label: "8 min", value: 480 },
  { label: "10 min", value: 600 },
];

const MOEILIJKHEID_LABELS = {
  0: "Alle niveaus",
  1: "Micro — persoonlijk",
  2: "Meso — professioneel",
  3: "Macro — maatschappelijk",
};

export default function SessionSetup({ onStart, onBack }) {
  const [categorie, setCategorie] = useState("");
  const [moeilijkheid, setMoeilijkheid] = useState(0);
  const [aantalSpelers, setAantalSpelers] = useState(4);
  const [timerDuur, setTimerDuur] = useState(300);

  function handleStart() {
    onStart({ categorie: categorie || null, moeilijkheid: moeilijkheid || null, aantalSpelers, timerDuur });
  }

  return (
    <div className="min-h-screen bg-[#0f0d0a] text-white flex flex-col">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#854f0b]/8 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 px-6 py-12 max-w-xl mx-auto w-full">
        {/* Back */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Terug
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#854f0b] mb-3">
            Sessie instellen
          </p>
          <h2
            className="font-display text-4xl font-semibold mb-8"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Hoe spelen jullie?
          </h2>

          <div className="space-y-8">
            {/* Categorie */}
            <section>
              <label className="block text-sm font-semibold text-white/60 mb-3">
                Thema
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategorie("")}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
                    categorie === ""
                      ? "bg-[#c87d2e] border-[#c87d2e] text-white"
                      : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/70"
                  }`}
                >
                  Alles
                </button>
                {CATEGORIE_SLUGS.filter(s => CATEGORIE_LABELS[s]).map((slug) => (
                  <button
                    key={slug}
                    onClick={() => setCategorie(slug)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
                      categorie === slug
                        ? "bg-[#c87d2e] border-[#c87d2e] text-white"
                        : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/70"
                    }`}
                  >
                    {CATEGORIE_LABELS[slug]}
                  </button>
                ))}
              </div>
            </section>

            {/* Moeilijkheid */}
            <section>
              <label className="block text-sm font-semibold text-white/60 mb-3">
                Niveau
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {Object.entries(MOEILIJKHEID_LABELS).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setMoeilijkheid(Number(val))}
                    className={`rounded-xl border px-3 py-3 text-xs font-medium text-left transition-all ${
                      moeilijkheid === Number(val)
                        ? "border-[#c87d2e]/60 bg-[#c87d2e]/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>

            {/* Aantal spelers */}
            <section>
              <label className="block text-sm font-semibold text-white/60 mb-3">
                Aantal spelers
                <span className="ml-2 font-bold text-white">{aantalSpelers}</span>
              </label>
              <input
                type="range"
                min={2}
                max={12}
                value={aantalSpelers}
                onChange={(e) => setAantalSpelers(Number(e.target.value))}
                className="w-full accent-[#c87d2e] cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/25 mt-1">
                <span>2</span>
                <span>12</span>
              </div>
            </section>

            {/* Timer */}
            <section>
              <label className="block text-sm font-semibold text-white/60 mb-3">
                Discussietijd
              </label>
              <div className="flex gap-2">
                {TIMER_OPTIES.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTimerDuur(opt.value)}
                    className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition-all ${
                      timerDuur === opt.value
                        ? "border-[#c87d2e]/60 bg-[#c87d2e]/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Start */}
          <div className="mt-12">
            <button
              onClick={handleStart}
              className="w-full group flex items-center justify-center gap-3 rounded-2xl bg-[#c87d2e] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#d98c3e] hover:shadow-xl active:scale-[0.98]"
            >
              Start het rad
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
