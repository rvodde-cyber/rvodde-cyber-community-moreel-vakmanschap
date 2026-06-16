import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTaal } from "../context/TaalContext";

function isComingSoon(tool) {
  return /\(coming soon\)|\(binnenkort\)/i.test(tool);
}

const CONVERSATION_TOOL_ANCHORS = new Set(["Gesprekskaarten", "Conversation Cards"]);

const stapBibliotheekSlug = {
  nl: { 1: "zien", 2: "voelen", 3: "wegen", 4: "handelen", 5: "volhouden" },
  en: { 1: "seeing", 2: "feeling", 3: "weighing", 4: "acting", 5: "persisting" },
};

export default function StapKaart({ stap, compact = false, isActive = false, onSelect }) {
  const { taal, t } = useTaal();
  const isSelectable = Boolean(onSelect);
  const bibliotheekHref =
    taal === "nl"
      ? `/bibliotheek/${stapBibliotheekSlug.nl[stap.nummer]}`
      : `/library/${stapBibliotheekSlug.en[stap.nummer]}`;
  const gesprekskaartenHref = taal === "nl" ? "/gesprekskaarten" : "/conversation-cards";

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

            if (CONVERSATION_TOOL_ANCHORS.has(tool)) {
              return (
                <Link
                  key={tool}
                  to={gesprekskaartenHref}
                  onClick={(event) => event.stopPropagation()}
                  className={`${pillClass} cursor-pointer transition-opacity hover:opacity-80`}
                  style={pillStyle}
                >
                  {tool}
                </Link>
              );
            }

            return (
              <Link
                key={tool}
                to={bibliotheekHref}
                onClick={(event) => event.stopPropagation()}
                className={`${pillClass} ${isComingSoon(tool) ? "" : "cursor-pointer transition-opacity hover:opacity-80"}`}
                style={pillStyle}
              >
                {tool}
              </Link>
            );
          })}
        </div>
      </div>

      {!compact && (
        <Link
          to={bibliotheekHref}
          className="mt-8 inline-flex text-sm font-semibold transition hover:opacity-80"
          style={{ color: stap.kleur }}
        >
          {taal === "nl" ? "Bekijk materialen in de bibliotheek →" : "View materials in the library →"}
        </Link>
      )}
    </motion.article>
  );
}
