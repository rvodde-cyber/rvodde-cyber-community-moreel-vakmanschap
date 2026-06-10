import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

function isComingSoon(tool) {
  return /\(coming soon\)|\(binnenkort\)/i.test(tool);
}

export default function StapKaart({ stap, compact = false }) {
  const { t } = useTaal();

  return (
    <motion.article
      key={stap.nummer}
      className="rounded-[2rem] border-2 bg-white p-6 shadow-warm md:p-8"
      style={{ borderColor: stap.kleur }}
      initial={{ opacity: 0, x: compact ? 0 : 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-center gap-4">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
          style={{ backgroundColor: stap.kleur }}
        >
          {stap.nummer}
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secundair">
            {stap.flowLabel}
          </p>
          <h3 className="font-display text-4xl font-semibold leading-none" style={{ color: stap.kleur }}>
            {stap.naam}
          </h3>
        </div>
      </div>

      <p className="mb-5 font-display text-2xl italic leading-snug text-primair">
        &ldquo;{stap.kernvraag}&rdquo;
      </p>
      <p className="leading-7 text-secundair">{stap.beschrijving}</p>

      <div className="mt-7">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-secundair">
          {t.stapKaart.tools}
        </p>
        <div className="flex flex-wrap gap-2">
          {stap.tools.map((tool) => (
            <span
              key={tool}
              className={`rounded-full px-3 py-1.5 text-sm ${
                isComingSoon(tool)
                  ? "bg-[#eeedea] font-normal italic text-[#888780]"
                  : "font-semibold"
              }`}
              style={
                isComingSoon(tool)
                  ? undefined
                  : { backgroundColor: stap.kleurLicht, color: stap.kleur }
              }
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
