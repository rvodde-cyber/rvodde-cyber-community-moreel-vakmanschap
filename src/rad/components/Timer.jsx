import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown.js";

const R = 130;
const CIRC = 2 * Math.PI * R;

function formatTime(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Timerfase: rustige spanning via een aflopende cirkel. Geen scores —
 * alleen ruimte om het groepsgesprek te voeren.
 */
export default function Timer({ duration, ui, onComplete }) {
  const { remaining, running, progress, pause, resume } = useCountdown(duration, {
    autoStart: true,
    onComplete,
  });

  const finished = remaining === 0;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
      <h2 className="font-display text-3xl font-semibold text-primair sm:text-4xl">
        {ui.titel}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-secundair">{ui.onderregel}</p>

      <div className="relative mt-8 flex items-center justify-center">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r={R} fill="none" stroke="#e6e0d6" strokeWidth="14" />
          <motion.circle
            cx="150"
            cy="150"
            r={R}
            fill="none"
            stroke="#534ab7"
            strokeWidth="14"
            strokeLinecap="round"
            transform="rotate(-90 150 150)"
            strokeDasharray={CIRC}
            animate={{ strokeDashoffset: CIRC * (1 - progress) }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={running && !finished ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-display text-6xl font-semibold tabular-nums text-primair">
            {formatTime(remaining)}
          </span>
          {finished && (
            <span className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#993556]">
              {ui.voorbij}
            </span>
          )}
        </motion.div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        {!finished && (
          <button
            type="button"
            onClick={running ? pause : resume}
            className="inline-flex items-center gap-2 rounded-full border border-rand bg-surface px-6 py-3 text-base font-semibold text-primair transition hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
          >
            {running ? <Pause size={16} strokeWidth={2.5} /> : <Play size={16} strokeWidth={2.5} />}
            {running ? ui.pauze : ui.hervat}
          </button>
        )}
        <button
          type="button"
          onClick={onComplete}
          className="rounded-full bg-[#1a2744] px-8 py-3 text-base font-semibold text-white shadow-warm transition hover:bg-[#26365c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
        >
          {ui.klaar}
        </button>
      </div>
    </div>
  );
}
