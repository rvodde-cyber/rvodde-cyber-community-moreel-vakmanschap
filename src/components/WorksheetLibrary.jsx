import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { worksheets } from "../data/worksheets";

const STAP_KLEUR = "#185fa5";
const KERN_KLEUR = "#534ab7";

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
          <article
            key={sheet.id}
            className="flex flex-col rounded-xl border border-rand bg-[#fafaf8] p-5 shadow-warm transition-shadow hover:shadow-[0_20px_60px_rgba(26,39,68,0.12)]"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <span
                className="rounded-full px-2.5 py-1 text-xs font-bold tracking-wide text-white"
                style={{ backgroundColor: KERN_KLEUR }}
              >
                {sheet.id}
              </span>
              <span className="shrink-0 rounded-full border border-rand bg-white px-2.5 py-1 text-xs font-semibold text-secundair">
                ⭐ {t.worksheets_badge}
              </span>
            </div>

            <h4 className="font-display text-2xl font-semibold leading-snug text-primair">{sheet.title}</h4>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {sheet.themes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "#e6f1fb", color: STAP_KLEUR }}
                >
                  {theme}
                </span>
              ))}
            </div>

            <p className="mt-4 line-clamp-2 flex-1 text-sm leading-6 text-secundair">{sheet.intro}</p>

            <a
              href={`/downloads/zien/${sheet.filename}`}
              download={sheet.filename}
              className="mt-5 inline-flex items-center justify-center rounded-full border-2 border-[#185fa5] px-4 py-2.5 text-center text-sm font-semibold text-[#185fa5] transition-colors hover:bg-[#185fa5] hover:text-white"
            >
              {t.worksheets_download}
            </a>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
