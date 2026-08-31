import { useState } from "react";
import { Send } from "lucide-react";

export default function RespondentProbe({ session, busy, status, onSubmit }) {
  const [note, setNote] = useState("");

  return (
    <section className="glass p-6 sm:p-8">
      <p className="eyebrow">
        {session.role === "leader" ? "Leidinggevende" : "Teamlid"} · probe
      </p>
      <h2 className="mt-2 font-display text-xl font-semibold text-ink">
        Versleuteld testantwoord
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Fase 1 heeft nog geen vragenlijst. Dit scherm versleutelt een klein testbericht in uw
        browser en stuurt alleen de cijferbrij naar de tijdelijke postbus.
      </p>
      <p className="mt-3 font-mono text-xs text-ink-muted">
        sessie · {session.sessionId}
      </p>

      <label className="mt-6 block text-sm font-medium text-ink" htmlFor="probe-note">
        Korte notitie (optioneel)
      </label>
      <textarea
        id="probe-note"
        className="mt-2 w-full rounded-2xl border border-hairline bg-white/80 px-4 py-3 text-sm text-ink outline-none transition focus:border-racing/40"
        rows={3}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Bijvoorbeeld: test vanaf laptop"
      />

      <div className="mt-5">
        <button
          type="button"
          className="btn-primary"
          disabled={busy}
          onClick={() => onSubmit(note.trim())}
        >
          <Send className="h-4 w-4" />
          Versleutelen &amp; versturen
        </button>
      </div>

      {status ? <p className="mt-4 text-sm text-ink-soft">{status}</p> : null}
    </section>
  );
}
