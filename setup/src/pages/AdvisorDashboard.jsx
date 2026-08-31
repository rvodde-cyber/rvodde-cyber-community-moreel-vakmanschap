import { Inbox, Trash2 } from "lucide-react";

export default function AdvisorDashboard({ session, busy, status, inbox, onFetch, onPurge }) {
  return (
    <section className="space-y-6">
      <div className="glass p-6 sm:p-8">
        <p className="eyebrow">Adviseursconsole</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">Blinde postbus</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Haal versleutelde blobs op en ontsleutel ze hier. De server levert alleen cijferbrij;
          aggregaten volgen in latere fases.
        </p>
        <p className="mt-3 font-mono text-xs text-ink-muted">
          traject · {session.trajectoryId}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn-primary" disabled={busy} onClick={onFetch}>
            <Inbox className="h-4 w-4" />
            Ophalen &amp; ontsleutelen
          </button>
          <button type="button" className="btn-ghost" disabled={busy} onClick={onPurge}>
            <Trash2 className="h-4 w-4" />
            Postbus wissen
          </button>
        </div>

        {status ? <p className="mt-4 text-sm text-ink-soft">{status}</p> : null}
      </div>

      {inbox ? (
        <div className="space-y-3">
          <p className="eyebrow">Ontsleutelde inhoud ({inbox.count})</p>
          {inbox.items.length === 0 ? (
            <div className="glass-subtle p-5 text-sm text-ink-muted">Geen blobs.</div>
          ) : (
            inbox.items.map((item) => (
              <article
                key={`${item.role}-${item.respondentId}-${item.updatedAt}`}
                className="glass-subtle p-5"
              >
                <p className="text-sm font-medium text-ink">
                  {item.role} · <span className="font-mono text-xs">{item.respondentId}</span>
                </p>
                <p className="mt-1 text-xs text-ink-muted">{item.updatedAt}</p>
                {item.error ? (
                  <p className="mt-3 text-sm text-red-700">{item.error}</p>
                ) : (
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-racing-mist/40 p-3 text-xs text-ink-soft">
                    {JSON.stringify(item.payload, null, 2)}
                  </pre>
                )}
              </article>
            ))
          )}
        </div>
      ) : null}
    </section>
  );
}
