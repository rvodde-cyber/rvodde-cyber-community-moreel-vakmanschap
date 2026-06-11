import { useState } from "react";
import { motion } from "framer-motion";
import ConversationCard, { ConversationCardPreview } from "./ConversationCard";
import { useTaal } from "../context/TaalContext";

export default function ConversationCardSection({ stapNummer, kleur, kleurLicht, titelKey }) {
  const { t } = useTaal();
  const kaarten = t.bibliotheek[`stap${stapNummer}`].kaarten;
  const [openCardId, setOpenCardId] = useState(null);

  const enrichedKaarten = kaarten.map((kaart) => ({
    ...kaart,
    stapNummer,
    stapNaam: t.stappen[stapNummer - 1].naam,
    kleur,
    kleurLicht
  }));

  const openCard = enrichedKaarten.find((kaart) => kaart.id === openCardId) || null;

  return (
    <>
      <motion.section
        id="gesprekskaarten-sectie"
        className="mt-12 scroll-mt-24"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h3 className="mb-6 font-display text-2xl font-semibold text-primair md:text-3xl">
          {t.bibliotheek[`stap${stapNummer}`][titelKey]}
        </h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enrichedKaarten.map((kaart) => (
            <ConversationCardPreview
              key={kaart.id}
              card={kaart}
              onOpen={() => setOpenCardId(kaart.id)}
            />
          ))}
        </div>
      </motion.section>

      <ConversationCard card={openCard} isOpen={Boolean(openCard)} onClose={() => setOpenCardId(null)} />
    </>
  );
}
