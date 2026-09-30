import { useEffect, useRef, useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { share } from "../config/copy";

/**
 * De deel-code op het individuele resultaatscherm (briefing §5.A, stap 5).
 *
 * Bewust een bewuste handeling: de code staat er, maar er gebeurt niets tenzij
 * de invuller hem zelf kopieert en doorstuurt.
 */
export default function ShareCodePanel({ code }) {
  const [state, setState] = useState("idle");
  const timerRef = useRef(0);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopy = async () => {
    clearTimeout(timerRef.current);
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
      timerRef.current = setTimeout(() => setState("idle"), 2500);
    } catch {
      // Zonder clipboard-toegang (oudere browser, geen https) blijft de code
      // gewoon selecteerbaar in beeld staan.
      setState("failed");
    }
  };

  return (
    <section className="glass-subtle p-6 sm:p-7">
      <div className="flex items-start gap-3">
        <Send className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
        <div className="w-full">
          <h2 className="text-sm font-semibold text-ink">{share.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{share.body}</p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <code className="flex-1 select-all break-all rounded-2xl border border-hairline bg-white/80 px-4 py-3 font-mono text-sm tracking-wide text-ink">
              {code}
            </code>
            <button type="button" onClick={handleCopy} className="btn-ghost shrink-0">
              {state === "copied" ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              {state === "copied" ? share.copiedLabel : share.copyLabel}
            </button>
          </div>

          <p className="mt-2 text-xs text-ink-muted" role="status">
            {state === "failed" ? share.copyFailed : share.skipNote}
          </p>
        </div>
      </div>
    </section>
  );
}
