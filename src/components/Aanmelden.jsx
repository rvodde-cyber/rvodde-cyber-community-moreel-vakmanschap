import { useState } from "react";
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
      <Link
        to="/privacy"
        className="font-semibold text-primair underline decoration-[#185fa5]/40 underline-offset-2 transition hover:text-[#185fa5]"
      >
        {a.privacyLink}
      </Link>
      {a.privacyNa}
    </p>
  );
}

export default function Aanmelden() {
  const { t } = useTaal();
  const a = t.aanmelden;
  const [submitted, setSubmitted] = useState(false);
  const [draftBody, setDraftBody] = useState("");
  const [copied, setCopied] = useState(false);

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

    setDraftBody(body);
    setSubmitted(true);
    setCopied(false);

    // Open mail client; fallback UI remains if mailto is unsupported.
    window.location.href = `mailto:${a.emailTo}?subject=${encodeURIComponent(a.emailSubject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopy = async () => {
    const text = `${a.emailSubject}\n\n${draftBody}\n\n→ ${a.emailTo}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
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
          ) : submitted ? (
            <div className="grid gap-4 rounded-2xl border border-rand bg-surface-muted/60 p-6">
              <p className="text-lg font-semibold text-primair">{a.fallbackTitel}</p>
              <p className="text-sm leading-7 text-secundair">{a.fallbackTekst}</p>
              <a
                className="font-semibold text-[#534ab7] underline underline-offset-2"
                href={`mailto:${a.emailTo}?subject=${encodeURIComponent(a.emailSubject)}&body=${encodeURIComponent(draftBody)}`}
              >
                {a.emailTo}
              </a>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full bg-[#534ab7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#433aa0]"
                >
                  {copied ? a.fallbackGekopieerd : a.fallbackKopieer}
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="rounded-full border border-rand px-5 py-2.5 text-sm font-semibold text-primair transition hover:border-[#534ab7]"
                >
                  {a.fallbackOpnieuw}
                </button>
              </div>
              <PrivacyAkkoord a={a} />
            </div>
          ) : (
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-semibold text-primair">
                {a.naamLabel}
                <input required name="naam" type="text" autoComplete="name" className={inputClassName} />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primair">
                {a.instellingLabel}
                <input required name="instelling" type="text" autoComplete="organization" className={inputClassName} />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primair">
                {a.emailLabel}
                <input required name="email" type="email" autoComplete="email" className={inputClassName} />
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
