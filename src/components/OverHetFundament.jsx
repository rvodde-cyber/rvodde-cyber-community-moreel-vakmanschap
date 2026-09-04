import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

export default function OverHetFundament() {
  const { t } = useTaal();
  const f = t.fundament;

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
              {f.titel}
            </h2>
            <p className="mt-6 font-display text-xl italic leading-8 text-primair md:text-2xl">
              {f.kernzin}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-[2rem] bg-achtergrond p-6 md:p-8">
              <h3 className="mb-4 font-display text-3xl font-semibold text-primair">
                {f.linksTitel}
              </h3>
              <p className="leading-8 text-secundair">{f.linksTekst}</p>
            </article>

            <article className="rounded-[2rem] bg-achtergrond p-6 md:p-8">
              <h3 className="mb-4 font-display text-3xl font-semibold text-primair">
                {f.rechtsTitel}
              </h3>
              <p className="leading-8 text-secundair">{f.rechtsTekst}</p>
            </article>
          </div>

          {f.tgoAlineas?.length ? (
            <div className="mt-10 space-y-6">
              {f.tgoAlineas.map((alinea) => (
                <p key={alinea.slice(0, 48)} className="leading-8 text-secundair">
                  {alinea}
                </p>
              ))}
            </div>
          ) : null}

          {f.tgoQuote ? (
            <blockquote className="mt-10 rounded-r-lg border-l-[3px] border-[var(--kleur-kern)] bg-surface-muted px-6 py-6 md:px-8">
              <p className="font-display text-xl italic leading-8 text-primair md:text-2xl">
                {f.tgoQuote}
              </p>
              {f.tgoQuoteBron ? (
                <footer className="mt-4 text-sm text-secundair">— {f.tgoQuoteBron}</footer>
              ) : null}
            </blockquote>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
