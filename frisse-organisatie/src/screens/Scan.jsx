import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScaleInput from "../components/ScaleInput";
import { scan } from "../config/copy";
import { statements } from "../config/statements";
import { usePrefersReducedMotion } from "../hooks/useReveal";

const AUTO_ADVANCE_MS = 340;

/**
 * De twintig stellingen, één voor één.
 *
 * Bij welk blad een stelling hoort is bewust niet zichtbaar: dat zou het
 * antwoord kleuren en de scan weer als vier blokjes laten voelen (§5).
 */
export default function Scan({ answers, onAnswer, onBackToStart, onFinish }) {
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef(0);
  const headingRef = useRef(null);

  const statement = statements[index];
  const answer = answers[statement.id];
  const isLast = index === statements.length - 1;
  const progress = (index + (answer ? 1 : 0)) / statements.length;

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Focus verplaatsen naar de nieuwe stelling, zodat schermlezers meekomen.
  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  const goTo = (next) => {
    setShowHint(false);
    setIndex(next);
  };

  const handleAnswer = (value) => {
    onAnswer(statement.id, value);
    setShowHint(false);
    clearTimeout(timerRef.current);
    if (isLast) return;
    timerRef.current = setTimeout(() => setIndex((current) => Math.min(current + 1, statements.length - 1)), AUTO_ADVANCE_MS);
  };

  const handleNext = () => {
    if (typeof answer !== "number") {
      setShowHint(true);
      return;
    }
    clearTimeout(timerRef.current);
    if (isLast) onFinish();
    else goTo(index + 1);
  };

  const handleBack = () => {
    clearTimeout(timerRef.current);
    if (index === 0) onBackToStart();
    else goTo(index - 1);
  };

  return (
    <div className="glass droplet-accent relative overflow-hidden p-6 sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">{scan.progressLabel(index + 1, statements.length)}</p>
        <div className="h-1 w-28 overflow-hidden rounded-full bg-ink/10 sm:w-40">
          <motion.div
            className="h-full rounded-full bg-ink/70"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={statement.id}
          initial={{ opacity: 0, x: reducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            id={`statement-${statement.id}`}
            ref={headingRef}
            tabIndex={-1}
            className="mt-7 text-xl font-medium leading-snug tracking-tight text-ink outline-none sm:text-2xl"
          >
            {statement.text}
          </h1>

          <div className="mt-7">
            <ScaleInput
              value={answer}
              onChange={handleAnswer}
              labelledBy={`statement-${statement.id}`}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-xs text-ink-muted" role={showHint ? "alert" : undefined}>
        {showHint ? scan.unansweredHint : scan.skipHint}
      </p>

      <div className="mt-7 flex items-center justify-between gap-3">
        <button type="button" onClick={handleBack} className="btn-ghost">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {scan.backLabel}
        </button>
        <button type="button" onClick={handleNext} className="btn-primary">
          {isLast ? scan.finishLabel : scan.nextLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
