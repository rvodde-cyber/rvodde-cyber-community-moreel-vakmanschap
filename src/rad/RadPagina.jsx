import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Wifi, WifiOff } from "lucide-react";
import { useTaal } from "../context/TaalContext";
import {
  PHASES,
  RAD_UI,
  REFLECTION_QUESTIONS,
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  radLang,
} from "./radConstants.js";
import { useGameSession } from "./hooks/useGameSession.js";
import RadHome from "./components/RadHome.jsx";
import SessionSetup from "./components/SessionSetup.jsx";
import Wheel from "./components/Wheel.jsx";
import DilemmaCard from "./components/DilemmaCard.jsx";
import PerspectiveOverlay from "./components/PerspectiveOverlay.jsx";
import Timer from "./components/Timer.jsx";
import ReflectionScreen from "./components/ReflectionScreen.jsx";

export default function RadPagina() {
  const { taal } = useTaal();
  const lang = radLang(taal);
  const ui = RAD_UI[lang];
  const game = useGameSession();

  const categoryLabel = (slug) => CATEGORY_LABELS[slug]?.[lang] ?? slug;
  const moeilijkheidLabel = (n) => DIFFICULTY_LABELS[n]?.[lang] ?? String(n);
  const segmentLabel = (seg) => (seg ? seg[lang] : "");

  const localizedDilemma = game.dilemma
    ? { ...game.dilemma, ...(game.dilemma[lang] ?? {}) }
    : null;

  return (
    <main
      className="min-h-screen bg-achtergrond"
      style={{ paddingTop: "80px" }}
    >
      <div className="section-shell flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-12">
        {/* Databron-status */}
        {game.phase !== PHASES.HOME && (
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-secundair">
            {game.loading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                {ui.common.laden}
              </>
            ) : game.source === "supabase" ? (
              <>
                <Wifi size={13} className="text-[#0f6e56]" />
                {ui.common.live}
              </>
            ) : (
              <>
                <WifiOff size={13} />
                {ui.common.fallback}
              </>
            )}
          </div>
        )}

        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={game.phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              {game.phase === PHASES.HOME && (
                <RadHome ui={ui.home} lang={lang} onStart={game.goSetup} />
              )}

              {game.phase === PHASES.SETUP && (
                <SessionSetup
                  ui={ui.setup}
                  lang={lang}
                  categories={game.categories}
                  categoryLabel={categoryLabel}
                  onStart={game.startSession}
                  onBack={game.goHome}
                  disabled={game.loading}
                />
              )}

              {game.phase === PHASES.WHEEL && (
                <div className="flex w-full flex-col items-center text-center">
                  <h2 className="font-display text-4xl font-semibold text-primair">
                    {ui.wheel.titel}
                  </h2>
                  <p className="mt-2 text-base text-secundair">{ui.wheel.onderregel}</p>
                  <div className="mt-8">
                    <Wheel
                      segments={game.wheelSegments}
                      ui={{ ...ui.wheel, segmentLabel }}
                      onResult={game.spinTo}
                    />
                  </div>
                  <AnimatePresence>
                    {game.segment && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 flex flex-col items-center gap-4"
                      >
                        <span
                          className="rounded-full px-5 py-2 text-lg font-semibold text-white shadow-warm"
                          style={{ backgroundColor: game.segment.color }}
                        >
                          {ui.wheel.lens}: {segmentLabel(game.segment)}
                        </span>
                        <button
                          type="button"
                          onClick={game.revealDilemma}
                          className="rounded-full bg-[#1a2744] px-8 py-3.5 text-base font-semibold text-white shadow-warm transition hover:bg-[#26365c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
                        >
                          {ui.wheel.verder}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {game.phase === PHASES.DILEMMA && (
                <DilemmaCard
                  dilemma={localizedDilemma}
                  segment={game.segment}
                  categorieLabel={categoryLabel(game.dilemma?.categorie)}
                  moeilijkheidLabel={moeilijkheidLabel(game.dilemma?.moeilijkheid)}
                  ui={{ ...ui.dilemma, segmentLabel }}
                  onNext={game.injectPerspective}
                />
              )}

              {game.phase === PHASES.PERSPECTIVE && (
                <PerspectiveOverlay
                  perspective={game.perspective}
                  label={game.perspective ? game.perspective[lang] : ""}
                  ui={ui.perspective}
                  onShuffle={game.shufflePerspective}
                  onNext={game.startTimer}
                />
              )}

              {game.phase === PHASES.TIMER && (
                <Timer
                  duration={game.config.timer}
                  ui={ui.timer}
                  onComplete={game.goReflection}
                />
              )}

              {game.phase === PHASES.REFLECTION && (
                <ReflectionScreen
                  questions={REFLECTION_QUESTIONS[lang]}
                  ui={ui.reflection}
                  onNewRound={game.newRound}
                  onNewSession={game.goSetup}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
