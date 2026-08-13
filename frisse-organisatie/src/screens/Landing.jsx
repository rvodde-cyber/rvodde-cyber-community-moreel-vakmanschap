import { ArrowRight, Clock, ListChecks, ShieldCheck, Users } from "lucide-react";
import Clover from "../components/Clover";
import { landing } from "../config/copy";
import { leaves } from "../config/leaves";
import { statements } from "../config/statements";
import { vitality } from "../lib/scoring";

// Een rustig, vitaal klavertje als introbeeld — hetzelfde component als op het
// resultaatscherm, zodat de metafoor meteen herkenbaar is.
const PREVIEW_SCORE = 4.6;
const previewLeaves = leaves.map((leaf) => ({
  id: leaf.id,
  label: leaf.label,
  color: leaf.color,
  score: PREVIEW_SCORE,
  vitality: vitality(PREVIEW_SCORE),
  qualitative: leaf.summary,
  note: leaf.summary,
  highlighted: false,
}));

export default function Landing({ sessionCode, onSessionCodeChange, onStart }) {
  const { session } = landing;
  const canStart = !session.required || sessionCode.trim().length > 0;

  return (
    <div className="space-y-6">
      <section className="glass droplet-accent relative overflow-hidden p-7 sm:p-10">
        <p className="eyebrow">{landing.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {landing.title}
        </h1>
        <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">{landing.intro}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Pill icon={Clock} label={landing.durationLabel} />
          <Pill icon={ListChecks} label={`${statements.length} stellingen`} />
          <Pill icon={ShieldCheck} label="Geen inlog" />
        </div>

        <div className="mt-8">
          <Clover perLeaf={previewLeaves} animate={false} interactive={false} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-ink">{landing.metaphor.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{landing.metaphor.body}</p>
          </div>
          <ul className="space-y-2">
            {leaves.map((leaf) => (
              <li key={leaf.id} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: leaf.color }}
                  aria-hidden="true"
                />
                <span>
                  <span className="font-medium text-ink">{leaf.label}</span> — {leaf.summary}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Invulinstructie: prominent, niet weggestopt in de kleine lettertjes (§3). */}
      <section className="glass-subtle p-6 sm:p-7">
        <div className="flex items-start gap-3">
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
          <div>
            <h2 className="text-sm font-semibold text-ink">{landing.instruction.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{landing.instruction.body}</p>
            <ul className="mt-3 space-y-1.5">
              {landing.instruction.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="glass p-6 sm:p-7">
        <label htmlFor="session-code" className="text-sm font-semibold text-ink">
          {session.label}
          {!session.required ? (
            <span className="ml-2 text-xs font-normal text-ink-muted">optioneel</span>
          ) : null}
        </label>
        <input
          id="session-code"
          type="text"
          value={sessionCode}
          onChange={(event) => onSessionCodeChange(event.target.value)}
          placeholder={session.placeholder}
          maxLength={120}
          autoComplete="organization"
          className="mt-2.5 w-full rounded-2xl border border-hairline bg-white/80 px-4 py-3 text-base
            text-ink placeholder:text-ink-muted/70 transition focus:border-ink/25 focus:outline-none
            focus:ring-2 focus:ring-ink/10"
        />
        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
          {session.required ? session.requiredHint : session.optionalHint}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-ink-muted">{landing.privacyNote}</p>

        <button type="button" onClick={onStart} disabled={!canStart} className="btn-primary mt-6 w-full sm:w-auto">
          {landing.startLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}

function Pill({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white/60 px-3 py-1.5 text-xs font-medium text-ink-soft">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
