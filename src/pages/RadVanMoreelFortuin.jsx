import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameHome from "../components/rad/GameHome.jsx";
import SessionSetup from "../components/rad/SessionSetup.jsx";
import Wheel from "../components/rad/Wheel.jsx";
import DilemmaCard from "../components/rad/DilemmaCard.jsx";
import PerspectiveOverlay from "../components/rad/PerspectiveOverlay.jsx";
import Timer from "../components/rad/Timer.jsx";
import ReflectionScreen from "../components/rad/ReflectionScreen.jsx";
import { getAllCards, localizeCard, filterCards } from "../data/gesprekskaarten/index.js";

const PHASES = {
  HOME: "home",
  SETUP: "setup",
  WHEEL: "wheel",
  DILEMMA: "dilemma",
  PERSPECTIVE: "perspective",
  TIMER: "timer",
  REFLECTION: "reflection",
  END: "end",
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)] ?? null;
}

function selectCard(sessie) {
  const allCards = getAllCards();
  const filters = {};
  if (sessie.categorie) filters.categorie = sessie.categorie;
  if (sessie.moeilijkheid) filters.moeilijkheid = sessie.moeilijkheid;
  const gefilterd = filterCards(allCards, filters);
  const pool = gefilterd.length > 0 ? gefilterd : allCards;
  const raw = pickRandom(pool);
  return raw ? localizeCard(raw, "nl") : null;
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

export default function RadVanMoreelFortuin() {
  const [fase, setFase] = useState(PHASES.HOME);
  const [sessie, setSessie] = useState(null);
  const [waarde, setWaarde] = useState(null);
  const [card, setCard] = useState(null);

  const goTo = useCallback((f) => setFase(f), []);

  function handleStartSessie(config) {
    setSessie(config);
    goTo(PHASES.WHEEL);
  }

  function handleSpinComplete(selectedWaarde) {
    setWaarde(selectedWaarde);
    const selectedCard = selectCard(sessie ?? {});
    setCard(selectedCard);
    goTo(PHASES.DILEMMA);
  }

  function handleNieuwRond() {
    setWaarde(null);
    setCard(null);
    goTo(PHASES.WHEEL);
  }

  function handleAfsluiten() {
    setSessie(null);
    setWaarde(null);
    setCard(null);
    goTo(PHASES.END);
  }

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {fase === PHASES.HOME && (
          <motion.div key="home" {...pageVariants}>
            <GameHome onStart={() => goTo(PHASES.SETUP)} />
          </motion.div>
        )}

        {fase === PHASES.SETUP && (
          <motion.div key="setup" {...pageVariants}>
            <SessionSetup
              onStart={handleStartSessie}
              onBack={() => goTo(PHASES.HOME)}
            />
          </motion.div>
        )}

        {fase === PHASES.WHEEL && (
          <motion.div key="wheel" {...pageVariants}>
            <Wheel onSpinComplete={handleSpinComplete} />
          </motion.div>
        )}

        {fase === PHASES.DILEMMA && card && (
          <motion.div key="dilemma" {...pageVariants}>
            <DilemmaCard
              card={card}
              waarde={waarde}
              onContinue={() => goTo(PHASES.PERSPECTIVE)}
            />
          </motion.div>
        )}

        {fase === PHASES.PERSPECTIVE && (
          <motion.div key="perspective" {...pageVariants}>
            <PerspectiveOverlay onContinue={() => goTo(PHASES.TIMER)} />
          </motion.div>
        )}

        {fase === PHASES.TIMER && (
          <motion.div key="timer" {...pageVariants}>
            <Timer
              duur={sessie?.timerDuur ?? 300}
              card={card}
              waarde={waarde}
              onComplete={() => goTo(PHASES.REFLECTION)}
            />
          </motion.div>
        )}

        {fase === PHASES.REFLECTION && (
          <motion.div key="reflection" {...pageVariants}>
            <ReflectionScreen
              card={card}
              waarde={waarde}
              onNieuwRond={handleNieuwRond}
              onAfsluiten={handleAfsluiten}
            />
          </motion.div>
        )}

        {fase === PHASES.END && (
          <motion.div key="end" {...pageVariants}>
            <EndScreen onOpnieuw={() => goTo(PHASES.HOME)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EndScreen({ onOpnieuw }) {
  return (
    <div className="min-h-screen bg-[#0f0d0a] text-white flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#534ab7]/10 blur-[120px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-md"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#534ab7]/80 mb-4">
          Sessie afgerond
        </p>
        <h2
          className="font-display text-5xl font-semibold text-white mb-4"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Goed gesprek.
        </h2>
        <p className="text-base text-white/50 leading-relaxed mb-10">
          Morele vorming gaat niet over het vinden van het juiste antwoord.
          Het gaat over het blijven stellen van de juiste vragen — samen.
        </p>

        <div className="space-y-3">
          <button
            onClick={onOpnieuw}
            className="w-full rounded-2xl bg-[#c87d2e] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#d98c3e] hover:shadow-xl active:scale-[0.98]"
          >
            Nieuwe sessie starten
          </button>
          <a
            href="/gesprekskaarten"
            className="block w-full rounded-2xl border border-white/12 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white/60 transition-all hover:border-white/25 hover:text-white/80"
          >
            Bekijk alle gesprekskaarten
          </a>
        </div>
      </motion.div>
    </div>
  );
}
