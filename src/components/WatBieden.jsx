import { motion } from "framer-motion";
import { Sprout, Upload, Users } from "lucide-react";

const aanbod = [
  {
    titel: "Jouw materialen",
    tekst: "Deel werkvormen, casuïstiek en tools. Getagd op modelstap. Drie niveaus: Concept, Getest, Aanbevolen.",
    icoon: Upload
  },
  {
    titel: "Online sessies",
    tekst: "Elke zes weken een gezamenlijke sessie. Altijd opening met een gesprekskaart. Altijd een open vraag die je meeneemt.",
    icoon: Users
  },
  {
    titel: "Dilemma van de week",
    tekst: "Elke week een nieuwe morele situatie, gekoppeld aan een stap van het model. Reageer, reflecteer, deel.",
    icoon: Sprout
  }
];

export default function WatBieden() {
  return (
    <section id="wat-bieden" className="bg-white py-20 md:py-28">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-secundair">
            Wat de community biedt
          </p>
          <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
            Delen, ontmoeten en groeien in morele praktijk.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aanbod.map((item) => {
            const Icon = item.icoon;

            return (
              <article
                key={item.titel}
                className="rounded-[2rem] border border-rand bg-achtergrond p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-warm"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#eeedfe] text-[#534ab7]">
                  <Icon aria-hidden="true" size={28} strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-3xl font-semibold text-primair">{item.titel}</h3>
                <p className="mt-4 leading-7 text-secundair">{item.tekst}</p>
              </article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
