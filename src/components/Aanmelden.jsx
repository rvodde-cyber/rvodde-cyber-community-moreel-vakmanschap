import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

const GOOGLE_FORM_URL = "GOOGLE_FORM_URL_HIER";

export default function Aanmelden() {
  const { t } = useTaal();

  return (
    <section id="aanmelden" className="bg-white py-20 md:py-28">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="grid gap-10 rounded-[2.5rem] border border-rand bg-achtergrond p-7 shadow-warm md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
              {t.aanmelden.titel}
            </h2>
            <p className="mt-6 leading-8 text-secundair">{t.aanmelden.subtitel}</p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white">
            <iframe
              src={GOOGLE_FORM_URL}
              title={t.aanmelden.titel}
              width="100%"
              height="520"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
