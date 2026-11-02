import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

const MS_FORMS_EMBED_URL = "https://forms.cloud.microsoft/e/7eyGYBJ5Sf?embed=true";

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
          </div>

          <div className="overflow-hidden rounded-2xl border border-rand bg-surface">
            <iframe
              src={MS_FORMS_EMBED_URL}
              title={a.titel}
              width="640"
              height="480"
              frameBorder="0"
              marginWidth={0}
              marginHeight={0}
              style={{ border: "none", maxWidth: "100%", maxHeight: "100vh" }}
              allowFullScreen
            />
            <div className="space-y-2 border-t border-rand px-4 py-4 md:px-5">
              <p className="text-sm text-secundair">{a.privacy}</p>
              <p className="text-xs text-secundair">
                {a.mailAlternatief}{" "}
                <a
                  href={`mailto:${a.emailTo}`}
                  className="underline underline-offset-2 transition hover:text-primair"
                >
                  {a.emailTo}
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
