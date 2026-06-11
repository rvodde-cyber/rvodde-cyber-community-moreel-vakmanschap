import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

function isComingSoon(tool) {
  return /\(coming soon\)|\(binnenkort\)/i.test(tool);
}

const WORKSHEET_TOOL_ANCHORS = new Set([
  "Werkbladen",
  "Worksheets",
  "Moreel Beraad",
  "Moral Deliberation"
]);

function scrollToWorksheetSection(event) {
  event.preventDefault();
  event.stopPropagation();
  document.getElementById("werkbladen-sectie")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function StapKaart({ stap, compact = false, isActive = false, onSelect }) {
  const { t } = useTaal();
  const isSelectable = Boolean(onSelect);

  return (
    <motion.article
      key={stap.nummer}
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={
        isSelectable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      className={`rounded-[2rem] border-2 bg-white p-6 shadow-warm md:p-8 ${
        isSelectable ? "cursor-pointer transition-shadow hover:shadow-[0_20px_60px_rgba(26,39,68,0.12)]" : ""
      } ${isActive ? "ring-2 ring-offset-2" : ""}`}
      style={{ borderColor: stap.kleur, ...(isActive ? { ringColor: stap.kleur } : {}) }}
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
          {stap.tools.map((tool) => {
            const pillClass = `rounded-full px-3 py-1.5 text-sm ${
              isComingSoon(tool)
                ? "bg-[#eeedea] font-normal italic text-[#888780]"
                : "font-semibold"
            }`;
            const pillStyle = isComingSoon(tool)
              ? undefined
              : { backgroundColor: stap.kleurLicht, color: stap.kleur };

            if (WORKSHEET_TOOL_ANCHORS.has(tool)) {
              return (
                <a
                  key={tool}
                  href="#werkbladen-sectie"
                  onClick={scrollToWorksheetSection}
                  className={`${pillClass} cursor-pointer transition-opacity hover:opacity-80`}
                  style={pillStyle}
                >
                  {tool}
                </a>
              );
            }

            return (
              <span key={tool} className={pillClass} style={pillStyle}>
                {tool}
              </span>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
