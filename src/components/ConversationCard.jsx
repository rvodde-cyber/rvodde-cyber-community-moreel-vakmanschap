import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTaal } from "../context/TaalContext";
import { downloadGesprekskaartPdf } from "../utils/generateGesprekskaartPdf";
import { getComplexityKey } from "../data/gesprekskaarten/constants";
import { getGesprekskaartStrings } from "../data/gesprekskaarten/i18n";

function ComplexityBadge({ card, taal, className = "" }) {
  const gk = getGesprekskaartStrings(taal);
  const key = card.complexiteit ?? getComplexityKey(card.moeilijkheid);
  const label = gk.complexiteitLabels?.[key] ?? key;
  const tooltip = gk.complexiteitTooltips?.[key] ?? "";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-rand bg-white/95 py-1 pl-2 pr-2.5 text-xs font-semibold text-complexiteit ${className}`}
      style={{ borderLeftWidth: 3, borderLeftColor: "var(--complexity-color)" }}
      title={tooltip}
    >
      {label}
    </span>
  );
}

function CardMedia({ card }) {
  if (card.afbeelding) {
    return (
      <>
        <img src={card.afbeelding} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </>
    );
  }

  return <div className="absolute inset-0" style={{ backgroundColor: card.kleur, opacity: 0.35 }} />;
}

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
    },
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
  const { taal, t } = useTaal();
  const handleDownload = () => downloadGesprekskaartPdf(card, t, taal);

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-rand bg-surface shadow-warm transition-shadow hover:shadow-[0_20px_60px_rgba(26,39,68,0.12)]"
      style={{ borderTopWidth: 4, borderTopColor: card.kleur }}
    >
      <div className="relative h-36" style={{ backgroundColor: card.kleurLicht }}>
        <CardMedia card={card} />
        <span
          className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{ color: card.kleur }}
        >
          {card.categorie}
        </span>
        <span className="absolute right-3 top-3">
          <ComplexityBadge card={card} taal={taal} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-secundair">
          <span className="font-semibold uppercase tracking-wide" style={{ color: card.kleur }}>
            {card.categorie}
          </span>
          {card.taalniveau && (
            <>
              <span aria-hidden="true">·</span>
              <span>{card.taalniveau}</span>
            </>
          )}
          {card.woorden != null && (
            <>
              <span aria-hidden="true">·</span>
              <span>{t.gesprekskaart.woordenLabel.replace("{count}", String(card.woorden))}</span>
            </>
          )}
        </div>
        <p className="mt-2 font-display text-xl font-semibold leading-snug text-primair md:text-2xl">
          {card.titel || card.vraag}
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
  const { taal, t } = useTaal();
  const kernvraag = card ? t.stappen[card.stapNummer - 1].kernvraag : "";
  const handleDownload = () => downloadGesprekskaartPdf(card, t, taal);

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
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface shadow-warm"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="relative h-48 overflow-hidden" style={{ backgroundColor: card.kleurLicht }}>
              <CardMedia card={card} />
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
              <p className="mb-2 text-sm font-semibold" style={{ color: card.kleur }}>
                {card.categorie}
              </p>
              <div className="mb-3 flex flex-wrap gap-3 text-xs text-secundair">
                <ComplexityBadge card={card} taal={taal} />
                {card.taalniveau && (
                  <span>
                    {t.gesprekskaart.taalniveauLabel}: {card.taalniveau}
                  </span>
                )}
              </div>
              <h2
                id="gesprekskaart-titel"
                className="font-display text-3xl font-semibold leading-snug text-primair md:text-4xl"
              >
                {card.titel || card.vraag}
              </h2>

              {card.verhaal ? (
                <p className="mt-5 leading-7 text-secundair">{card.verhaal}</p>
              ) : (
                <p className="mt-5 font-display text-2xl italic leading-snug text-primair">
                  &ldquo;{card.vraag}&rdquo;
                </p>
              )}

              {(card.vraag1 || card.vraag2) && (
                <div className="mt-6 space-y-3 rounded-xl border border-rand bg-white/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: card.kleur }}>
                    {t.gesprekskaart.reflectieLabel}
                  </p>
                  {card.vraag1 && (
                    <p className="text-sm leading-6 text-primair">
                      <span className="font-semibold">1.</span> {card.vraag1}
                    </p>
                  )}
                  {card.vraag2 && (
                    <p className="text-sm leading-6 text-primair">
                      <span className="font-semibold">2.</span> {card.vraag2}
                    </p>
                  )}
                </div>
              )}

              {!card.verhaal && (
                <p className="mt-5 leading-7 text-secundair">{t.gesprekskaart.instructie}</p>
              )}

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
