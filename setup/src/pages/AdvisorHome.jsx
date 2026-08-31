import { Copy, KeyRound, Link2 } from "lucide-react";
import { useState } from "react";

function LinkRow({ label, value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="glass-subtle p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">{label}</p>
        <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={copy}>
          <Copy className="h-3.5 w-3.5" />
          {copied ? "Gekopieerd" : "Kopieer"}
        </button>
      </div>
      <p className="mt-2 break-all font-mono text-[0.7rem] leading-relaxed text-ink-muted">
        {value}
      </p>
    </div>
  );
}

export default function AdvisorHome({ created, busy, status, onCreate, onOpenAdvisor }) {
  return (
    <section className="space-y-6">
      <div className="glass p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-racing-mist p-2 text-racing">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Nieuw traject</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              De sleutel wordt lokaal gegenereerd (AES-GCM). U bewaart de links zelf. Kwijtraken
              betekent onherstelbaar verlies van toegang tot het rapport — dat is de bewuste prijs
              van echte end-to-end-versleuteling.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn-primary" disabled={busy} onClick={onCreate}>
            Traject aanmaken
          </button>
          {created ? (
            <button type="button" className="btn-ghost" onClick={onOpenAdvisor}>
              <Link2 className="h-4 w-4" />
              Open adviseurslink
            </button>
          ) : null}
        </div>

        {status ? <p className="mt-4 text-sm text-ink-soft">{status}</p> : null}
      </div>

      {created ? (
        <div className="space-y-3">
          <p className="eyebrow">Links voor dit traject</p>
          <LinkRow label="Adviseur (ophalen & ontsleutelen)" value={created.links.advisor} />
          <LinkRow label="Team (invullen)" value={created.links.team} />
          <LinkRow label="Leidinggevende (invullen)" value={created.links.leader} />
          <p className="text-xs leading-relaxed text-ink-muted">
            Traject-id: <span className="font-mono">{created.trajectoryId}</span>
          </p>
        </div>
      ) : null}
    </section>
  );
}
