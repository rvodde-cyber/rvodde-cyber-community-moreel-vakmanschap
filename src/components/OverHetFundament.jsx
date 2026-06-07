import { motion } from "framer-motion";

export default function OverHetFundament() {
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-secundair">
              Over het fundament
            </p>
            <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
              Praktische wijsheid ontstaat in gesprek.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-[2rem] bg-achtergrond p-6 md:p-8">
              <h3 className="mb-4 font-display text-3xl font-semibold text-primair">Het model</h3>
              <p className="leading-8 text-secundair">
                Het Model Moreel Vakmanschap is ontwikkeld vanuit het Lectoraat Ethisch Werken van
                Fontys Hogescholen. Het is gebaseerd op het werk van Karssing, Rest, Biesta en
                Aristoteles&apos; concept van phronesis — praktische wijsheid die je ontwikkelt door te
                doen, te reflecteren en te volhouden.
              </p>
            </article>

            <article className="rounded-[2rem] bg-achtergrond p-6 md:p-8">
              <h3 className="mb-4 font-display text-3xl font-semibold text-primair">Biesta</h3>
              <p className="leading-8 text-secundair">
                Gert Biesta waarschuwt voor learnification — het reduceren van onderwijs tot meetbare
                leeruitkomsten. Deze community gelooft dat morele vorming niet uit een handboek komt.
                Ze biedt geen oplossingen. Ze biedt ruimte — voor de vragen die blijven, voor de
                ontmoeting die vormt.
              </p>
            </article>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
