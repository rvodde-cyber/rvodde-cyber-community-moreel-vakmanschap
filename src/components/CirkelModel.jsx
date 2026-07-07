import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import ModelWheel from "./ModelWheel";
import StapKaart from "./StapKaart";
import { useTaal } from "../context/TaalContext";
import { stappen as basisStappen } from "../data/stappen";
import { getPageContentLang, usesEnglishRoutes } from "../data/vertalingen";

const stapBibliotheekSlug = {
  nl: { 1: "zien", 2: "voelen", 3: "wegen", 4: "handelen", 5: "volhouden" },
  en: { 1: "seeing", 2: "feeling", 3: "weighing", 4: "acting", 5: "persisting" },
};

const kernLines = {
  nl: { line1: "Morele situaties", line2: "uit de praktijk" },
  en: { line1: "Moral situations", line2: "from practice" },
};

export default function CirkelModel() {
  const { t, taal } = useTaal();
  const [activeStepNumber, setActiveStepNumber] = useState(1);

  const stappen = basisStappen.map((basisStap, index) => ({
    ...basisStap,
    ...t.stappen[index],
    kleur: basisStap.kleur,
    kleurLicht: basisStap.kleurLicht,
  }));

  const activeStep = stappen.find((stap) => stap.nummer === activeStepNumber) || stappen[0];
  const pageLang = getPageContentLang(taal);
  const enRoutes = usesEnglishRoutes(taal);
  const kern = kernLines[pageLang];

  return (
    <section id="model" className="bg-achtergrond py-20 md:py-28">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-secundair">
            {t.model.titel}
          </p>
          <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
            {t.model.subtitel}
          </h2>
        </div>

        <div className="hidden gap-10 md:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
          <div className="relative max-w-md rounded-[2rem] border border-rand bg-white/70 p-4 shadow-warm md:p-6 lg:max-w-none">
            <ModelWheel
              stappen={stappen}
              activeStepNumber={activeStepNumber}
              onStepSelect={setActiveStepNumber}
              kern={t.model.kern}
              kernSub={t.model.kernSub}
              kernLine1={kern.line1}
              kernLine2={kern.line2}
              ariaLabel={t.model.titel}
            />
          </div>

          <div className="lg:pl-2">
            <StapKaart stap={activeStep} />
          </div>
        </div>

        <div className="grid gap-5 md:hidden">
          <div className="mx-auto max-w-sm rounded-[2rem] border border-rand bg-white/70 p-4 shadow-warm">
            <ModelWheel
              stappen={stappen}
              activeStepNumber={activeStepNumber}
              onStepSelect={setActiveStepNumber}
              kern={t.model.kern}
              kernSub={t.model.kernSub}
              kernLine1={kern.line1}
              kernLine2={kern.line2}
              ariaLabel={t.model.titel}
            />
          </div>

          {stappen.map((stap) => (
            <div key={stap.nummer}>
              <StapKaart
                stap={stap}
                compact
                isActive={activeStepNumber === stap.nummer}
                onSelect={() => setActiveStepNumber(stap.nummer)}
              />
              {activeStepNumber === stap.nummer && (
                <Link
                  to={
                    enRoutes
                      ? `/library/${stapBibliotheekSlug.en[stap.nummer]}`
                      : `/bibliotheek/${stapBibliotheekSlug.nl[stap.nummer]}`
                  }
                  className="mt-4 inline-flex px-2 text-sm font-semibold"
                  style={{ color: stap.kleur }}
                >
                  {pageLang === "nl" ? "Bekijk materialen in de bibliotheek →" : "View materials in the library →"}
                </Link>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
