import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { worksheets } from "../data/worksheets";
import WorksheetCard from "./WorksheetCard";

const STAP_KLEUR = "#185fa5";
const STAP_KLEUR_LICHT = "#e6f1fb";

export default function WorksheetLibrary() {
  const { t } = useTaal();

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secundair">
          {t.worksheets_supertitle}
        </p>
        <h3 className="font-display text-3xl font-semibold leading-tight text-primair md:text-4xl">
          {t.worksheets_title}
        </h3>
        <p className="mt-3 text-lg text-secundair">{t.worksheets_subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {worksheets.map((sheet) => (
          <WorksheetCard
            key={sheet.id}
            sheet={sheet}
            accentColor={STAP_KLEUR}
            accentBg={STAP_KLEUR_LICHT}
            downloadBasePath="/downloads/zien"
            badgeLabel={t.worksheets_badge}
          />
        ))}
      </div>
    </motion.div>
  );
}
