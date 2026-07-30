import { AnimatePresence, motion } from "framer-motion";
import { Eye, RefreshCw } from "lucide-react";

/**
 * Perspectief-injectie: overlay die de groep uitnodigt het dilemma
 * vanuit een willekeurige rol te bekijken.
 */
export default function PerspectiveOverlay({
  perspective,
  label,
  ui,
  onShuffle,
  onNext,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto w-full max-w-xl text-center"
    >
      <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#534ab7]">
        <Eye size={14} strokeWidth={2.5} />
        {ui.kicker}
      </p>

      <h2 className="mt-4 font-display text-3xl font-semibold text-primair sm:text-4xl">
        {ui.titel}
      </h2>

      <div className="mt-6 min-h-[96px] rounded-3xl border border-rand bg-surface p-8 shadow-warm">
        <AnimatePresence mode="wait">
          <motion.p
            key={perspective?.id ?? "none"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="font-display text-4xl font-semibold text-[#534ab7] sm:text-5xl"
          >
            {label}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="mt-5 text-base leading-relaxed text-secundair">{ui.onderregel}</p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onShuffle}
          className="inline-flex items-center gap-2 rounded-full border border-rand bg-surface px-6 py-3 text-base font-semibold text-primair transition hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
        >
          <RefreshCw size={16} strokeWidth={2.5} />
          {ui.opnieuw}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-[#1a2744] px-8 py-3 text-base font-semibold text-white shadow-warm transition hover:bg-[#26365c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
        >
          {ui.verder}
        </button>
      </div>
    </motion.div>
  );
}
