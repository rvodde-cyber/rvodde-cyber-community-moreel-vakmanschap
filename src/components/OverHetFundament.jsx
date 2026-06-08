import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

export default function OverHetFundament() {
  const { t } = useTaal();

  return (
    <section id="over-ons" className="bg-achtergrond py-20 md:py-28">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="rounded-[2.5rem] border border-rand bg-white/75 p-7 shadow-warm md:p-10 lg:p-12">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
              {t.fundament.titel}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-[2rem] bg-achtergrond p-6 md:p-8">
              <h3 className="mb-4 font-display text-3xl font-semibold text-primair">{t.fundament.linksTitel}</h3>
              <p className="leading-8 text-secundair">{t.fundament.linksTekst}</p>
            </article>

            <article className="rounded-[2rem] bg-achtergrond p-6 md:p-8">
              <h3 className="mb-4 font-display text-3xl font-semibold text-primair">{t.fundament.rechtsTitel}</h3>
              <p className="leading-8 text-secundair">{t.fundament.rechtsTekst}</p>
            </article>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
