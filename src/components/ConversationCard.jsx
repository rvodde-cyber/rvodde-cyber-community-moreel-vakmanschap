import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTaal } from "../context/TaalContext";
import { downloadGesprekskaartPdf } from "../utils/generateGesprekskaartPdf";

function CardButton({ children, accentColor, variant = "outline", onClick, href, download }) {
  const className =
    "inline-flex flex-1 items-center justify-center rounded-full border-2 px-3 py-2.5 text-center text-sm font-semibold transition-colors";

  const style = { borderColor: accentColor, color: accentColor };

  const hoverHandlers = {
    onMouseEnter: (e) => {
      e.currentTarget.style.backgroundColor = accentColor;
      e.currentTarget.style.color = "#ffffff";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.backgroundColor = variant === "filled" ? accentColor : "transparent";
      e.currentTarget.style.color = variant === "filled" ? "#ffffff" : accentColor;
    }
  };

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={className}
        style={variant === "filled" ? { backgroundColor: accentColor, color: "#ffffff", borderColor: accentColor } : style}
        {...hoverHandlers}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} style={style} {...hoverHandlers}>
      {children}
    </button>
  );
}

export function ConversationCardPreview({ card, onOpen }) {
  const { t } = useTaal();
  const handleDownload = () => downloadGesprekskaartPdf(card, t);

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-rand bg-[#fafaf8] shadow-warm transition-shadow hover:shadow-[0_20px_60px_rgba(26,39,68,0.12)]"
      style={{ borderTopWidth: 4, borderTopColor: card.kleur }}
    >
      <div className="relative h-36" style={{ backgroundColor: card.kleurLicht }}>
        <div className="absolute inset-0" style={{ backgroundColor: card.kleur, opacity: 0.35 }} />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primair">
          {card.categorie}
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-rand bg-white px-2.5 py-1 text-xs font-semibold text-secundair">
          ⭐ {t.worksheets_badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-xl italic leading-snug text-primair md:text-2xl">
          &ldquo;{card.vraag}&rdquo;
        </p>

        <div className="mt-5 flex gap-2">
          <CardButton accentColor={card.kleur} onClick={onOpen}>
            {t.gesprekskaart.bekijk}
          </CardButton>
          <CardButton accentColor={card.kleur} variant="filled" onClick={handleDownload}>
            {t.gesprekskaart.downloadPdf}
          </CardButton>
        </div>
      </div>
    </article>
  );
}

function formatStapVerbinding(template, card, kernvraag) {
  return template
    .replace("{nummer}", card.stapNummer)
    .replace("{naam}", card.stapNaam)
    .replace("{kernvraag}", kernvraag);
}

export default function ConversationCardModal({ card, isOpen, onClose }) {
  const { t } = useTaal();
  const kernvraag = card ? t.stappen[card.stapNummer - 1].kernvraag : "";
  const handleDownload = () => downloadGesprekskaartPdf(card, t);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && card && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gesprekskaart-titel"
        >
          <button
            type="button"
            className="absolute inset-0 bg-primair/50 backdrop-blur-sm"
            onClick={onClose}
            aria-label={t.gesprekskaart.sluit}
          />

          <motion.div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-warm"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="relative h-48" style={{ backgroundColor: card.kleurLicht }}>
              <div className="absolute inset-0" style={{ backgroundColor: card.kleur, opacity: 0.4 }} />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-primair shadow-sm transition hover:bg-white"
                aria-label={t.gesprekskaart.sluit}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:p-8" style={{ backgroundColor: `${card.kleurLicht}88` }}>
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: card.kleur }}
              >
                {t.gesprekskaart.stapLabel} {card.stapNummer} — {card.stapNaam}
              </p>
              <p className="mb-1 text-sm font-semibold text-secundair">{card.categorie}</p>
              <h2
                id="gesprekskaart-titel"
                className="font-display text-3xl italic leading-snug text-primair md:text-4xl"
              >
                &ldquo;{card.vraag}&rdquo;
              </h2>

              <p className="mt-5 leading-7 text-secundair">{t.gesprekskaart.instructie}</p>

              <p className="mt-4 text-sm font-semibold leading-6" style={{ color: card.kleur }}>
                {formatStapVerbinding(t.gesprekskaart.stapVerbinding, card, kernvraag)}
              </p>

              <div className="mt-8">
                <CardButton accentColor={card.kleur} variant="filled" onClick={handleDownload}>
                  {t.gesprekskaart.downloadPdf}
                </CardButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
