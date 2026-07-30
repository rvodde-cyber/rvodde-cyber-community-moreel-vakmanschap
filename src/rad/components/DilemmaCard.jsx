import { motion } from "framer-motion";
import { Layers, MessageCircle } from "lucide-react";

/**
 * Fullscreen dilemma-reveal: titel, scenario, waarden, moeilijkheid,
 * de gekozen morele lens en de discussievraag. Grote typografie,
 * rustige spacing, goede leesbaarheid.
 */
export default function DilemmaCard({
  dilemma,
  segment,
  categorieLabel,
  moeilijkheidLabel,
  ui,
  onNext,
}) {
  if (!dilemma) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto w-full max-w-2xl rounded-3xl border border-rand bg-surface p-7 shadow-warm sm:p-10"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
        <span className="rounded-full bg-surface-muted px-3 py-1 text-secundair">
          {categorieLabel}
        </span>
        <span className="rounded-full bg-surface-muted px-3 py-1 text-secundair">
          {moeilijkheidLabel}
        </span>
        {segment && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white"
            style={{ backgroundColor: segment.color }}
          >
            <Layers size={13} strokeWidth={2.5} />
            {ui.lens}: {ui.segmentLabel(segment)}
          </span>
        )}
      </div>

      <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-primair sm:text-5xl">
        {dilemma.titel}
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-secundair sm:text-xl">
        {dilemma.scenario}
      </p>

      {dilemma.waarden?.length > 0 && (
        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-secundair">
            {ui.waarden}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {dilemma.waarden.map((w) => (
              <span
                key={w}
                className="rounded-lg border border-rand bg-achtergrond px-3 py-1 text-sm font-medium text-primair"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-7 rounded-2xl border border-rand bg-surface-muted p-5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#534ab7]">
          <MessageCircle size={14} strokeWidth={2.5} />
          {ui.vraag}
        </p>
        <p className="mt-2 font-display text-2xl leading-snug text-primair">
          {dilemma.vraag}
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mt-8 w-full rounded-full bg-[#1a2744] px-8 py-3.5 text-base font-semibold text-white shadow-warm transition hover:bg-[#26365c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
      >
        {ui.verder}
      </button>
    </motion.article>
  );
}
