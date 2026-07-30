import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Timer({ duur, card, waarde, onComplete }) {
  const [remaining, setRemaining] = useState(duur);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  const fraction = remaining / duur;
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - fraction);

  // Urgency color
  let ringKleur = "#c87d2e";
  if (fraction < 0.33) ringKleur = "#993556";
  if (fraction < 0.1) ringKleur = "#e53e3e";

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setFinished(true);
            setTimeout(onComplete, 1200);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function togglePause() {
    if (finished) return;
    if (running) {
      clearInterval(intervalRef.current);
    }
    setRunning((r) => !r);
  }

  const titel = card?.titel ?? card?.nl?.titel ?? "Dilemma";
  const vraag = card?.vraag1 ?? card?.nl?.vraag1 ?? "";

  return (
    <div className="min-h-screen bg-[#0f0d0a] flex flex-col items-center justify-center px-6 py-12">
      <div
        className="pointer-events-none fixed inset-0 transition-all duration-1000"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${ringKleur}08 0%, transparent 60%)` }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#854f0b]"
        >
          Discussietijd
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-semibold text-white mb-1 text-center"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {titel}
        </motion.h2>
        {waarde && (
          <p className="text-xs text-white/35 mb-8 uppercase tracking-widest">
            {waarde.label?.replace("\n", "")}
          </p>
        )}

        {/* Timer ring */}
        <div
          className="relative flex items-center justify-center cursor-pointer"
          onClick={togglePause}
          title={running ? "Pauzeer" : "Hervat"}
        >
          <svg width="220" height="220" viewBox="0 0 220 220">
            {/* Track */}
            <circle
              cx="110" cy="110" r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="110" cy="110" r={radius}
              fill="none"
              stroke={ringKleur}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 110 110)"
              style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s ease" }}
            />
          </svg>

          {/* Time text */}
          <div className="absolute flex flex-col items-center">
            {finished ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-bold text-white"
              >
                Tijd!
              </motion.div>
            ) : (
              <>
                <span className="text-4xl font-bold tabular-nums text-white">
                  {formatTime(remaining)}
                </span>
                <span className="text-xs text-white/30 mt-1">
                  {running ? "Tik om te pauzeren" : "Gepauzeerd"}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Discussion prompt */}
        {vraag && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 w-full rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-center"
          >
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Vraag</p>
            <p className="text-sm font-semibold text-white/75 leading-relaxed">{vraag}</p>
          </motion.div>
        )}

        {/* Urgency hints */}
        {fraction < 0.33 && fraction > 0 && !finished && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-xs text-[#993556]/80 text-center"
          >
            Nog even — rond af, wat was de kern?
          </motion.p>
        )}

        {/* Skip button */}
        {!finished && (
          <button
            onClick={onComplete}
            className="mt-6 text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Overslaan →
          </button>
        )}
      </div>
    </div>
  );
}
