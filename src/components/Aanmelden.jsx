import { motion } from "framer-motion";
import AanmeldFormulier from "./AanmeldFormulier";
import { useTaal } from "../context/TaalContext";

const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL?.trim() || "";

export default function Aanmelden() {
  const { t } = useTaal();
  const a = t.aanmelden;

  return (
    <section id="aanmelden" className="bg-surface-muted py-16 md:py-24">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="grid gap-10 rounded-[2.5rem] border border-rand bg-surface p-7 shadow-warm md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
              {a.titel}
            </h2>
            <p className="mt-4 text-lg leading-8 text-secundair">{a.subtitel}</p>
            {!GOOGLE_FORM_URL && (
              <p className="mt-4 text-sm leading-7 text-secundair">{a.hint}</p>
            )}
          </div>

          {GOOGLE_FORM_URL ? (
            <div className="overflow-hidden rounded-2xl border border-rand bg-surface">
              <iframe
                src={GOOGLE_FORM_URL}
                title={a.titel}
                width="100%"
                height="520"
                className="border-0"
              />
            </div>
          ) : (
            <AanmeldFormulier />
          )}
        </div>
      </motion.div>
    </section>
  );
}
