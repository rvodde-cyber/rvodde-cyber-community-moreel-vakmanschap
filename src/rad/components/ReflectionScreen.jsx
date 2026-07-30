import { motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Reflectiefase: verdiepende vragen. Geen scores, geen winnaars.
 */
export default function ReflectionScreen({ questions, ui, onNewRound, onNewSession }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-2xl"
    >
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#534ab7]">
        <Sparkles size={14} strokeWidth={2.5} />
        {ui.kicker}
      </p>
      <h2 className="mt-3 font-display text-4xl font-semibold text-primair sm:text-5xl">
        {ui.titel}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-secundair">{ui.onderregel}</p>

      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="mt-7 space-y-3"
      >
        {questions.map((q, i) => (
          <motion.li
            key={q}
            variants={itemVariants}
            className="flex gap-4 rounded-2xl border border-rand bg-surface p-5 shadow-warm"
          >
            <span className="font-display text-2xl font-semibold leading-none text-[#534ab7]">
              {i + 1}
            </span>
            <span className="text-lg leading-snug text-primair">{q}</span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onNewRound}
          className="inline-flex items-center gap-2 rounded-full bg-[#1a2744] px-8 py-3.5 text-base font-semibold text-white shadow-warm transition hover:bg-[#26365c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
        >
          <RotateCcw size={16} strokeWidth={2.5} />
          {ui.nieuweRonde}
        </button>
        <button
          type="button"
          onClick={onNewSession}
          className="rounded-full border border-rand bg-surface px-8 py-3.5 text-base font-semibold text-primair transition hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
        >
          {ui.nieuweSessie}
        </button>
      </div>
    </motion.div>
  );
}
