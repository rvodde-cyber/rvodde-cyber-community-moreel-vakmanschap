import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import {
  DIFFICULTY_OPTIONS,
  DIFFICULTY_LABELS,
  PLAYER_OPTIONS,
  TIMER_OPTIONS,
} from "../radConstants.js";

function OptionRow({ label, children }) {
  return (
    <fieldset className="rounded-2xl border border-rand bg-surface p-5">
      <legend className="px-1 text-sm font-semibold text-primair">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2 ${
        active
          ? "border-[#534ab7] bg-[#534ab7] text-white"
          : "border-rand bg-achtergrond text-primair hover:border-[#534ab7]"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Sessie-setup: categorie, moeilijkheid, aantal spelers en timerduur.
 */
export default function SessionSetup({
  ui,
  lang,
  categories,
  categoryLabel,
  onStart,
  onBack,
  disabled,
}) {
  const [categorie, setCategorie] = useState("");
  const [moeilijkheid, setMoeilijkheid] = useState(null);
  const [spelers, setSpelers] = useState(4);
  const [timer, setTimer] = useState(120);

  function timerLabel(sec) {
    return sec % 60 === 0 ? `${sec / 60} ${ui.minuut}` : `${sec} ${ui.seconden}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-xl"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm font-semibold text-secundair transition hover:text-primair"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
        {ui.terug}
      </button>

      <h2 className="mt-3 font-display text-4xl font-semibold text-primair">{ui.titel}</h2>
      <p className="mt-2 text-base leading-relaxed text-secundair">{ui.onderregel}</p>

      <div className="mt-6 space-y-4">
        <OptionRow label={ui.categorie}>
          <Chip active={categorie === ""} onClick={() => setCategorie("")}>
            {ui.alleCategorieen}
          </Chip>
          {categories.map((slug) => (
            <Chip key={slug} active={categorie === slug} onClick={() => setCategorie(slug)}>
              {categoryLabel(slug)}
            </Chip>
          ))}
        </OptionRow>

        <OptionRow label={ui.moeilijkheid}>
          <Chip active={moeilijkheid === null} onClick={() => setMoeilijkheid(null)}>
            {ui.alleCategorieen}
          </Chip>
          {DIFFICULTY_OPTIONS.map((d) => (
            <Chip key={d} active={moeilijkheid === d} onClick={() => setMoeilijkheid(d)}>
              {DIFFICULTY_LABELS[d][lang]}
            </Chip>
          ))}
        </OptionRow>

        <OptionRow label={ui.spelers}>
          {PLAYER_OPTIONS.map((n) => (
            <Chip key={n} active={spelers === n} onClick={() => setSpelers(n)}>
              {n}
            </Chip>
          ))}
        </OptionRow>

        <OptionRow label={ui.timer}>
          {TIMER_OPTIONS.map((sec) => (
            <Chip key={sec} active={timer === sec} onClick={() => setTimer(sec)}>
              {timerLabel(sec)}
            </Chip>
          ))}
        </OptionRow>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onStart({ categorie, moeilijkheid, spelers, timer })}
        className="mt-7 w-full rounded-full bg-[#1a2744] px-8 py-4 text-base font-semibold text-white shadow-warm transition hover:bg-[#26365c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {ui.start}
      </button>
    </motion.div>
  );
}
