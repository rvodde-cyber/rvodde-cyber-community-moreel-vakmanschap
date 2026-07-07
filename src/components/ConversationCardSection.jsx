import { useState } from "react";
import { motion } from "framer-motion";
import ConversationCard, { ConversationCardPreview } from "./ConversationCard";
import { useTaal } from "../context/TaalContext";

export default function ConversationCardSection({
  stapNummer,
  kleur,
  kleurLicht,
  titelKey,
  kaarten: kaartenOverride,
  sectionId = `gesprekskaarten-stap-${stapNummer}`,
  downloadLinks = null,
  emptyMessage = null,
}) {
  const { t } = useTaal();
  const stapData = t.bibliotheek[`stap${stapNummer}`];
  const kaarten = kaartenOverride ?? stapData?.kaarten ?? [];
  const [openCardId, setOpenCardId] = useState(null);

  const enrichedKaarten = kaarten.map((kaart) => {
    const step = kaart.stap ?? stapNummer;
    return {
      ...kaart,
      stapNummer: step,
      stapNaam: t.stappen[step - 1].naam,
      kleur: kaart.kleur ?? kleur,
      kleurLicht: kaart.kleurLicht ?? kleurLicht,
    };
  });

  const openCard = enrichedKaarten.find((kaart) => kaart.id === openCardId) || null;

  return (
    <>
      <motion.section
        id={sectionId}
        className="mt-12 scroll-mt-24"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h3 className="font-display text-2xl font-semibold text-primair md:text-3xl">
            {stapData?.[titelKey]}
          </h3>
          {downloadLinks && (
            <a
              href={downloadLinks.href}
              download={downloadLinks.filename}
              className="inline-flex items-center justify-center rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors"
              style={{ borderColor: kleur, color: kleur }}
            >
              {downloadLinks.label}
            </a>
          )}
        </div>

        {kaarten.length === 0 ? (
          <p className="rounded-xl border border-dashed border-rand bg-surface-muted/80 px-4 py-8 text-center text-sm text-secundair">
            {emptyMessage ?? t.gesprekskaart.filters.empty}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {enrichedKaarten.map((kaart) => (
              <ConversationCardPreview
                key={kaart.id}
                card={kaart}
                onOpen={() => setOpenCardId(kaart.id)}
              />
            ))}
          </div>
        )}
      </motion.section>

      <ConversationCard card={openCard} isOpen={Boolean(openCard)} onClose={() => setOpenCardId(null)} />
    </>
  );
}
