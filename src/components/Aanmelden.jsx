import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

const FORM_EMBED_URL = "https://forms.cloud.microsoft/e/7eyGYBJ5Sf?embed=true";

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
        <div className="rounded-[2.5rem] border border-rand bg-surface p-7 shadow-warm md:p-10 lg:p-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
              {a.titel}
            </h2>
            <p className="mt-4 text-lg leading-8 text-secundair">{a.subtitel}</p>

            <iframe
              src={FORM_EMBED_URL}
              title={a.titel}
              width="100%"
              height="600"
              frameBorder="0"
              marginWidth="0"
              marginHeight="0"
              allowFullScreen
              className="mt-8 block min-h-[600px] w-full rounded-2xl"
              style={{ border: "none", maxWidth: "100%", maxHeight: "100vh", minHeight: 600 }}
            />

            <p className="mt-4 text-sm leading-7 text-secundair">{a.privacy}</p>

            <p className="mt-3 text-xs leading-6 text-secundair">
              {a.mailAlternatief}{" "}
              <a
                href={`mailto:${a.emailTo}`}
                className="transition hover:text-primair"
              >
                {a.emailTo}
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
