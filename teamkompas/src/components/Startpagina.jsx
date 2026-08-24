import { ArrowRight, BookOpen, Clock, ListChecks, ShieldCheck } from "lucide-react";
import TeamWheel from "./TeamWheel";
import { welkom, bronvermelding } from "../config";

export default function Startpagina({ onStart }) {
  return (
    <div className="space-y-6">
      <section className="glass droplet-accent relative p-7 sm:p-10">
        <p className="eyebrow">Teamreflectie</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {welkom.titel}
        </h1>
        <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">{welkom.tekst}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Pill icon={Clock} label="Een paar minuten" />
          <Pill icon={ListChecks} label="Zes succesfactoren" />
          <Pill icon={ShieldCheck} label="Geen inlog, geen opslag" />
        </div>

        <div className="mt-8 w-full">
          <TeamWheel variant="preview" />
        </div>

        <button type="button" onClick={onStart} className="btn-primary mt-8 w-full sm:w-auto">
          Start
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>

      <section className="glass-subtle p-6 sm:p-7">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
          <div>
            <h2 className="text-sm font-semibold text-ink">Bronnen</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{bronvermelding}</p>
          </div>
        </div>
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
