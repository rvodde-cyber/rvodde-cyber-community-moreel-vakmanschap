import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useTaal } from "../context/TaalContext";

const inputClassName =
  "w-full rounded-2xl border border-rand bg-surface px-4 py-3 text-base font-normal text-primair outline-none transition focus:border-[#534ab7] focus:ring-4 focus:ring-[#534ab7]/10 disabled:opacity-60";

const foutInputClassName = "border-[#b3261e] focus:border-[#b3261e] focus:ring-[#b3261e]/10";

const LEEG_FORMULIER = {
  naam: "",
  functie: "",
  organisatie: "",
  email: "",
  aantekening: "",
  consent: false,
};

/** Bouwt de mailto-fallback voor als de registratie (nog) niet bereikbaar is. */
function mailtoLink(a, waarden) {
  const regels = [
    `${a.naamLabel}: ${waarden.naam}`,
    `${a.functieLabel}: ${waarden.functie}`,
    `${a.organisatieLabel}: ${waarden.organisatie || a.nietIngevuld}`,
    `${a.emailLabel}: ${waarden.email}`,
    "",
    a.emailVraag,
    waarden.aantekening || a.nietIngevuld,
  ].join("\n");

  const query = new URLSearchParams({ subject: a.emailSubject, body: regels });
  return `mailto:${a.emailTo}?${query.toString()}`;
}

export default function AanmeldFormulier() {
  const { t, taal } = useTaal();
  const a = t.aanmelden;

  const [waarden, setWaarden] = useState(LEEG_FORMULIER);
  const [veldFouten, setVeldFouten] = useState({});
  const [status, setStatus] = useState("idle");
  const [resultaat, setResultaat] = useState(null);
  const honeypot = useRef(null);

  const bezig = status === "verzenden";

  const wijzig = (veld) => (event) => {
    const waarde = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setWaarden((vorige) => ({ ...vorige, [veld]: waarde }));
    setVeldFouten((vorige) => (vorige[veld] ? { ...vorige, [veld]: undefined } : vorige));
  };

  const verstuur = async (event) => {
    event.preventDefault();
    if (bezig) return;

    setStatus("verzenden");
    setVeldFouten({});

    try {
      const response = await fetch("/api/deelnemers/aanmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...waarden, taal, website: honeypot.current?.value ?? "" }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setResultaat(data.status === "bijgewerkt" ? "bijgewerkt" : "nieuw");
        setStatus("gelukt");
        return;
      }

      if (data.error === "validatie") {
        setVeldFouten(data.velden || {});
        setStatus("idle");
        return;
      }

      setStatus(data.error === "opslag_niet_geconfigureerd" ? "fallback" : "fout");
    } catch {
      setStatus("fout");
    }
  };

  if (status === "gelukt") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-start gap-4 rounded-2xl border border-[#0f6e56]/20 bg-[#e6f4ef] p-7"
        role="status"
      >
        <CheckCircle2 className="h-7 w-7 text-[#0f6e56]" aria-hidden="true" />
        <div>
          <h3 className="font-display text-2xl font-semibold text-primair">{a.succesTitel}</h3>
          <p className="mt-2 text-base leading-7 text-secundair">
            {resultaat === "bijgewerkt" ? a.succesBijgewerkt : a.succesNieuw}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setWaarden(LEEG_FORMULIER);
            setResultaat(null);
            setStatus("idle");
          }}
          className="rounded-full border border-[#0f6e56]/30 px-5 py-2 text-sm font-semibold text-[#0f6e56] transition hover:bg-white"
        >
          {a.nogIemand}
        </button>
      </motion.div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={verstuur} noValidate>
      <Veld label={a.naamLabel} fout={veldFouten.naam} foutTeksten={a.veldFout}>
        <input
          name="naam"
          type="text"
          autoComplete="name"
          value={waarden.naam}
          onChange={wijzig("naam")}
          disabled={bezig}
          className={`${inputClassName} ${veldFouten.naam ? foutInputClassName : ""}`}
        />
      </Veld>

      <Veld label={a.functieLabel} fout={veldFouten.functie} foutTeksten={a.veldFout}>
        <input
          name="functie"
          type="text"
          autoComplete="organization-title"
          placeholder={a.functiePlaceholder}
          value={waarden.functie}
          onChange={wijzig("functie")}
          disabled={bezig}
          className={`${inputClassName} ${veldFouten.functie ? foutInputClassName : ""}`}
        />
      </Veld>

      <Veld label={a.organisatieLabel} fout={veldFouten.organisatie} foutTeksten={a.veldFout}>
        <input
          name="organisatie"
          type="text"
          autoComplete="organization"
          value={waarden.organisatie}
          onChange={wijzig("organisatie")}
          disabled={bezig}
          className={`${inputClassName} ${veldFouten.organisatie ? foutInputClassName : ""}`}
        />
      </Veld>

      <Veld label={a.emailLabel} fout={veldFouten.email} foutTeksten={a.veldFout}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={waarden.email}
          onChange={wijzig("email")}
          disabled={bezig}
          className={`${inputClassName} ${veldFouten.email ? foutInputClassName : ""}`}
        />
      </Veld>

      <Veld label={a.vraagLabel} fout={veldFouten.aantekening} foutTeksten={a.veldFout}>
        <textarea
          name="aantekening"
          rows={4}
          value={waarden.aantekening}
          onChange={wijzig("aantekening")}
          disabled={bezig}
          className={`${inputClassName} resize-none ${veldFouten.aantekening ? foutInputClassName : ""}`}
        />
      </Veld>

      {/* Spamval: onzichtbaar voor mensen, ingevuld door bots. */}
      <input
        ref={honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex items-start gap-3 text-sm leading-6 text-secundair">
        <input
          type="checkbox"
          name="consent"
          checked={waarden.consent}
          onChange={wijzig("consent")}
          disabled={bezig}
          className="mt-1 h-5 w-5 shrink-0 rounded border-rand text-[#534ab7] focus:ring-[#534ab7]/20"
        />
        <span>
          {a.consentLabel}
          {veldFouten.consent && (
            <span className="mt-1 block font-semibold text-[#b3261e]">{a.veldFout.consent}</span>
          )}
        </span>
      </label>

      <AnimatePresence>
        {(status === "fout" || status === "fallback") && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-3 rounded-2xl border border-[#b3261e]/20 bg-[#fdecea] p-4 text-sm leading-6 text-primair"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#b3261e]" aria-hidden="true" />
            <div>
              <p>{status === "fallback" ? a.fallbackTekst : a.foutAlgemeen}</p>
              <a
                href={mailtoLink(a, waarden)}
                className="mt-2 inline-block font-semibold text-[#534ab7] underline underline-offset-4"
              >
                {a.fallbackKnop}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={bezig}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#534ab7] px-8 py-4 text-base font-semibold text-white shadow-warm transition hover:-translate-y-0.5 hover:bg-[#433aa0] focus:outline-none focus:ring-4 focus:ring-[#534ab7]/20 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {bezig ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-5 w-5" aria-hidden="true" />
        )}
        {bezig ? a.knopBezig : a.knop}
      </button>

      <p className="text-xs leading-6 text-secundair">{a.privacyNotitie}</p>
    </form>
  );
}

function Veld({ label, fout, foutTeksten, children }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-primair">
      {label}
      {children}
      {fout && <span className="font-normal text-[#b3261e]">{foutTeksten[fout] ?? foutTeksten.ongeldig}</span>}
    </label>
  );
}
