import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";

const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL?.trim() || "";

const inputClassName =
  "rounded-2xl border border-rand bg-surface px-4 py-3 text-base font-normal text-primair outline-none transition focus:border-[#534ab7] focus:ring-4 focus:ring-[#534ab7]/10";

function PrivacyAkkoord({ a }) {
  return (
    <p className="text-sm leading-7 text-secundair">
      {a.privacyVoor}
      <Link to="/privacy" className="font-semibold text-primair underline decoration-[#185fa5]/40 underline-offset-2 transition hover:text-[#185fa5]">
        {a.privacyLink}
      </Link>
      {a.privacyNa}
    </p>
  );
}

export default function Aanmelden() {
  const { t } = useTaal();
  const a = t.aanmelden;

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const naam = formData.get("naam") || "";
    const instelling = formData.get("instelling") || "";
    const email = formData.get("email") || "";
    const ethiekonderwijs = formData.get("ethiekonderwijs") || "";

    const body = [
      `${a.naamLabel}: ${naam}`,
      `${a.instellingLabel}: ${instelling}`,
      `${a.emailLabel}: ${email}`,
      "",
      a.emailVraag,
      ethiekonderwijs || a.nietIngevuld,
    ].join("\n");

    window.location.href = `mailto:${a.emailTo}?subject=${encodeURIComponent(a.emailSubject)}&body=${encodeURIComponent(body)}`;
  };

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
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-2xl border border-rand bg-surface">
                <iframe
                  src={GOOGLE_FORM_URL}
                  title={a.titel}
                  width="100%"
                  height="520"
                  className="border-0"
                />
              </div>
              <PrivacyAkkoord a={a} />
            </div>
          ) : (
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-semibold text-primair">
                {a.naamLabel}
                <input required name="naam" type="text" className={inputClassName} />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primair">
                {a.instellingLabel}
                <input required name="instelling" type="text" className={inputClassName} />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primair">
                {a.emailLabel}
                <input required name="email" type="email" className={inputClassName} />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primair">
                {a.vraagLabel}
                <textarea name="ethiekonderwijs" rows={5} className={`${inputClassName} resize-none`} />
              </label>

              <PrivacyAkkoord a={a} />

              <button
                type="submit"
                className="mt-2 rounded-full bg-[#534ab7] px-8 py-4 text-base font-semibold text-white shadow-warm transition hover:-translate-y-0.5 hover:bg-[#433aa0] focus:outline-none focus:ring-4 focus:ring-[#534ab7]/20"
              >
                {a.knop}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
