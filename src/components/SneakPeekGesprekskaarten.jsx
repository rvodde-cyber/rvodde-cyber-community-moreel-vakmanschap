import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ConversationCard, { ConversationCardPreview } from "./ConversationCard";
import { useTaal } from "../context/TaalContext";
import { getCardById, localizeCard } from "../data/gesprekskaarten";
import { stappen } from "../data/stappen";
import { usesEnglishRoutes } from "../data/vertalingen";

const SNEAK_PEEK_IDS = ["GK_BG_05", "GK_OW_02", "GK_MM_01"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function SneakPeekGesprekskaarten() {
  const { taal, t } = useTaal();
  const copy = t.sneakPeek;
  const [openCardId, setOpenCardId] = useState(null);

  const kaarten = useMemo(
    () =>
      SNEAK_PEEK_IDS.map((id) => {
        const raw = getCardById(id);
        if (!raw) return null;
        const localized = localizeCard(raw, taal);
        const stapMeta = stappen.find((s) => s.nummer === raw.stap) ?? stappen[0];
        return {
          ...localized,
          stapNummer: raw.stap,
          stapNaam: t.stappen[raw.stap - 1]?.naam ?? stapMeta.naam,
          kleur: stapMeta.kleur,
          kleurLicht: stapMeta.kleurLicht,
          excerpt: copy?.kaarten?.[id],
        };
      }).filter(Boolean),
    [taal, t.stappen, copy]
  );

  const openCard = kaarten.find((kaart) => kaart.id === openCardId) || null;
  const href = usesEnglishRoutes(taal) ? "/conversation-cards" : "/gesprekskaarten";

  if (!copy || kaarten.length === 0) return null;

  return (
    <>
      <section className="bg-achtergrond py-12 md:py-16">
        <motion.div
          className="section-shell"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeUp}
            className="mb-8 text-center font-display text-3xl font-semibold text-primair md:text-4xl"
          >
            {copy.titel}
          </motion.h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kaarten.map((kaart, i) => (
              <motion.div key={kaart.id} variants={fadeUp} custom={i}>
                <ConversationCardPreview
                  card={kaart}
                  excerpt={kaart.excerpt}
                  onOpen={() => setOpenCardId(kaart.id)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={3} className="mt-8 text-center">
            <a
              href={href}
              className="inline-flex items-center justify-center rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white"
              style={{ borderColor: "var(--kleur-kern)", color: "var(--kleur-kern)" }}
            >
              {copy.cta}
            </a>
          </motion.div>
        </motion.div>
      </section>

      <ConversationCard card={openCard} isOpen={Boolean(openCard)} onClose={() => setOpenCardId(null)} />
    </>
  );
}
