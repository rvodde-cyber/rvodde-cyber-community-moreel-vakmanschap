import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

export default function BibliotheekComingSoon({ stapNummer, kleur, kleurLicht }) {
  const { t } = useTaal();
  const stap = t.bibliotheek[`stap${stapNummer}`];

  return (
    <motion.section
      className="mt-10 scroll-mt-24"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <h3 className="font-display text-2xl font-semibold text-primair md:text-3xl">{stap.titel}</h3>

      <div
        className="mt-6 rounded-xl border border-rand p-8 md:p-10"
        style={{ backgroundColor: kleurLicht, borderLeftWidth: 4, borderLeftColor: kleur }}
      >
        <p className="font-display text-xl italic leading-relaxed text-primair md:text-2xl">
          {stap.comingSoon}
        </p>
        <a
          href="/#aanmelden"
          className="mt-6 inline-flex rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:text-white"
          style={{ borderColor: kleur, color: kleur }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = kleur;
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = kleur;
          }}
        >
          {t.hero.cta}
        </a>
      </div>
    </motion.section>
  );
}
