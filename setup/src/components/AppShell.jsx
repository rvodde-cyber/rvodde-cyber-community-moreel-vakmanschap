export default function AppShell({ children }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-10">
        <p className="eyebrow text-racing">Setup</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Diagnose-instrument
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
          Fase 1 — skelet en versleutelingslaag. Antwoorden verlaten de browser alleen als
          cijferbrij; de sleutel zit in het URL-fragment.
        </p>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-12 border-t border-hairline pt-6 text-xs text-ink-muted">
        Privacy: end-to-end versleuteling · tijdelijke blinde postbus · geen leesbare persoonsdata
        op de server
      </footer>
    </div>
  );
}
