import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { worksheetWegen } from "../data/worksheetsWegen";
import WorksheetCard from "./WorksheetCard";

const STAP_KLEUR = "#993556";
const STAP_KLEUR_LICHT = "#fbeaf0";

export default function WorksheetWegen() {
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
          {t.worksheets_wegen_supertitle}
        </p>
        <h3 className="font-display text-3xl font-semibold leading-tight text-primair md:text-4xl">
          {t.worksheets_wegen_title}
        </h3>
        <p className="mt-3 text-lg text-secundair">{t.worksheets_wegen_subtitle}</p>
      </div>

      <div className="max-w-md">
        <WorksheetCard
          sheet={worksheetWegen}
          accentColor={STAP_KLEUR}
          accentBg={STAP_KLEUR_LICHT}
          downloadBasePath="/downloads/wegen"
          downloadLabel={t.worksheets_download}
          badgeLabel={t.worksheets_badge}
        />
      </div>
    </motion.div>
  );
}
