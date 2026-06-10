import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

export default function Hero() {
  const { t } = useTaal();

  const scrollToAanmelden = () => {
    document.getElementById("aanmelden")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-achtergrond pb-20 pt-32 md:pb-28 md:pt-40">
      <motion.div
        className="section-shell text-center"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="mx-auto mb-5 max-w-fit rounded-full border border-rand bg-white/70 px-4 py-2 text-sm font-medium text-secundair shadow-sm">
          {t.hero.label} {t.hero.titel}
        </p>
        <h1 className="font-display text-6xl font-semibold leading-none tracking-tight text-primair md:text-8xl">
          {t.hero.titel}
        </h1>
        <p className="mt-6 text-xl font-medium text-secundair md:text-2xl">
          {t.hero.subtitel}
        </p>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-secundair">
          {t.hero.intro}
        </p>
        <button
          type="button"
          onClick={scrollToAanmelden}
          className="mt-10 rounded-full bg-primair px-8 py-4 text-base font-semibold text-white shadow-warm transition hover:-translate-y-0.5 hover:bg-[#233657] focus:outline-none focus:ring-4 focus:ring-[#534ab7]/20"
        >
          {t.hero.cta}
        </button>
      </motion.div>
    </section>
  );
}
