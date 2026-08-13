import { useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Users } from "lucide-react";
import { collector } from "../config/copy";
import { parseShareCodes } from "../lib/shareCode";

/**
 * Teamresultaat samenstellen (briefing §5.B).
 *
 * De verzamelaar plakt de ontvangen deel-codes; alles wordt hier in de browser
 * gedecodeerd en gemiddeld. Er gaat niets naar een server en er wordt niets
 * bewaard. Fouten worden per regel getoond, zodat in één oogopslag duidelijk is
 * welke code opnieuw gestuurd moet worden.
 */
export default function Collector({ onBack, onSubmit }) {
  const [text, setText] = useState("");

  const entries = useMemo(() => parseShareCodes(text), [text]);
  const valid = entries.filter((entry) => entry.ok);
  const invalid = entries.filter((entry) => !entry.ok);

  const prefixes = new Set(valid.map((entry) => entry.prefix).filter(Boolean));
  const duplicates = new Set();
  const seen = new Set();
  for (const entry of valid) {
    const key = entry.raw.replace(/\s+/g, "").toUpperCase();
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  }

  return (
    <div className="space-y-6">
      <section className="glass droplet-accent relative overflow-hidden p-6 sm:p-9">
        <p className="eyebrow">{collector.eyebrow}</p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
          {collector.title}
        </h1>
        <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">{collector.intro}</p>

        <label htmlFor="share-codes" className="mt-7 block text-sm font-semibold text-ink">
          {collector.label}
        </label>
        <textarea
          id="share-codes"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={7}
          spellCheck={false}
          autoCapitalize="characters"
          placeholder={collector.placeholder}
          className="mt-2.5 w-full rounded-2xl border border-hairline bg-white/80 px-4 py-3 font-mono text-sm
            leading-relaxed tracking-wide text-ink placeholder:font-sans placeholder:tracking-normal
            placeholder:text-ink-muted/70 transition focus:border-ink/25 focus:outline-none focus:ring-2 focus:ring-ink/10"
        />

        <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted" role="status">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          {entries.length === 0 ? collector.emptyHint : collector.countLabel(valid.length, entries.length)}
        </div>

        {invalid.length > 0 ? (
          <div className="mt-5 rounded-2xl border border-hairline bg-white/70 p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-ink">{collector.errorHeading}</h2>
            </div>
            <ul className="mt-2.5 space-y-1.5">
              {invalid.map((entry) => (
                <li key={entry.line} className="text-sm text-ink-soft">
                  <span className="font-medium text-ink">{collector.lineLabel(entry.line)}</span>{" "}
                  {collector.errors[entry.error]}
                  <span className="ml-1 break-all font-mono text-xs text-ink-muted">{truncate(entry.raw)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">{collector.errorHint}</p>
          </div>
        ) : null}

        <Notices
          single={valid.length === 1}
          mixedPrefixes={prefixes.size > 1}
          duplicates={duplicates.size > 0}
        />

        <div className="mt-7 flex items-center justify-between gap-3">
          <button type="button" onClick={onBack} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {collector.backLabel}
          </button>
          <button
            type="button"
            onClick={() => onSubmit(valid.map((entry) => entry.answers))}
            disabled={valid.length === 0}
            className="btn-primary"
          >
            {collector.submitLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

function Notices({ single, mixedPrefixes, duplicates }) {
  const notices = [
    single ? collector.singleWarning : null,
    mixedPrefixes ? collector.mixedPrefixWarning : null,
    duplicates ? collector.duplicateWarning : null,
  ].filter(Boolean);

  if (!notices.length) return null;

  return (
    <ul className="mt-4 space-y-2">
      {notices.map((notice) => (
        <li key={notice} className="text-xs leading-relaxed text-ink-muted">
          {notice}
        </li>
      ))}
    </ul>
  );
}

function truncate(value, max = 24) {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}
