import { motion } from "framer-motion";
import { Sprout, Upload, Users } from "lucide-react";
import { useTaal } from "../context/TaalContext";

const iconMap = { Upload, Users, Sprout };

export default function WatBieden() {
  const { t } = useTaal();

  return (
    <section id="aanbod" className="bg-white py-20 md:py-28">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-12 max-w-3xl">
          <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
            {t.bieden.titel}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.bieden.items.map((item) => {
            const Icon = iconMap[item.icon];

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
