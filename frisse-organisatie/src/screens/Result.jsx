import { useRef, useState } from "react";
import { Download, DoorOpen, Info, RotateCcw, Users } from "lucide-react";
import Clover from "../components/Clover";
import CloverPrintView from "../components/CloverPrintView";
import ShareCodePanel from "../components/ShareCodePanel";
import { CONTACT_INFO } from "../config/brand";
import { cta, result as resultCopy } from "../config/copy";

/**
 * Het resultaatscherm, in twee varianten (briefing §5.A stap 3 en §5.B stap 8).
 *
 * Individueel en team delen bewust dezelfde component: dezelfde weergave,
 * dezelfde drempellogica, dezelfde teksten. Alleen het label, de intro en de
 * deel-code verschillen — zo kan het teambeeld nooit stiekem anders uitpakken
 * dan het individuele beeld bij dezelfde scores.
 *
 * @param {object} props
 * @param {ReturnType<import("../lib/scoring").buildResult>} props.result
 * @param {"individual" | "team"} props.variant
 * @param {string} props.companyName
 * @param {number} [props.participantCount]
 * @param {string} [props.shareCode] alleen bij de individuele variant
 */
export default function Result({
  result,
  variant,
  companyName,
  participantCount = 1,
  shareCode = "",
  onRestart,
  onToCollector,
}) {
  const printSvgRef = useRef(null);
  const [pdfState, setPdfState] = useState("idle");

  const isTeam = variant === "team";
  const copy = isTeam ? resultCopy.team : resultCopy.individual;
  const highlighted = result.perLeaf.filter((leaf) => leaf.highlighted);

  const handleDownload = async () => {
    if (!printSvgRef.current) return;
    setPdfState("busy");
    try {
      // De PDF-generator is zwaar en alleen nodig als iemand hem echt opvraagt.
      const { generateSummaryPdf } = await import("../lib/pdf");
      await generateSummaryPdf({
        svgElement: printSvgRef.current,
        result,
        variant,
        companyName,
        participantCount,
      });
      setPdfState("idle");
    } catch {
      setPdfState("error");
    }
  };

  return (
    <div className="space-y-6">
      <section className="glass result-glow overflow-hidden p-6 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow">{copy.eyebrow}</p>
          <span className="rounded-full border border-hairline bg-white/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {copy.badge}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          {isTeam ? copy.intro(participantCount) : copy.intro}
        </p>

        <div className="mt-6">
          <Clover perLeaf={result.perLeaf} className="max-w-[30rem]" />
        </div>

        <p className="mt-4 text-center text-xs text-ink-muted">
          {resultCopy.legend} {resultCopy.tooltipHint}
        </p>

        <div className="mt-8 border-t border-hairline pt-7">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
            {result.conclusion.title}
          </h1>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{result.conclusion.body}</p>
        </div>

        {/* Disclaimer dicht bij de conclusie: dit is een indicatie, geen diagnose (§3). */}
        <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-white/55 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-ink-soft">{resultCopy.disclaimer}</p>
        </div>
      </section>

      <section className="glass-subtle p-6 sm:p-7">
        <h2 className="eyebrow">{resultCopy.perLeafTitle}</h2>
        <ul className="mt-4 space-y-4">
          {result.perLeaf.map((leaf) => (
            <li
              key={leaf.id}
              className={[
                "rounded-2xl border p-4 transition",
                leaf.highlighted ? "border-ink/15 bg-white/80 shadow-glass" : "border-transparent bg-white/40",
              ].join(" ")}
            >
              {/* Op smalle schermen zakt de duiding naar een eigen regel in
                  plaats van in een smalle kolom naast de naam te worden geperst. */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: leaf.color }}
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold text-ink">{leaf.label}</h3>
                </span>
                <span className="text-xs text-ink-muted">{leaf.qualitative}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{leaf.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {!isTeam && shareCode ? <ShareCodePanel code={shareCode} /> : null}

      <CallToAction highlighted={highlighted} />

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleDownload} disabled={pdfState === "busy"} className="btn-primary">
            <Download className="h-4 w-4" aria-hidden="true" />
            {pdfState === "busy" ? resultCopy.pdfBusyLabel : resultCopy.pdfLabel}
          </button>
          {!isTeam && onToCollector ? (
            <button type="button" onClick={onToCollector} className="btn-ghost">
              <Users className="h-4 w-4" aria-hidden="true" />
              {resultCopy.toCollectorLabel}
            </button>
          ) : null}
          <button type="button" onClick={onRestart} className="btn-ghost">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {isTeam ? resultCopy.backToStartLabel : resultCopy.restartLabel}
          </button>
        </div>
        {pdfState === "error" ? (
          <p className="text-xs text-ink-muted" role="status">
            {resultCopy.pdfErrorLabel}
          </p>
        ) : null}
      </section>

      {/* Buiten beeld, wél in de DOM: de bron voor de PDF-afbeelding. */}
      <div className="pointer-events-none absolute -left-[9999px] top-0" aria-hidden="true">
        <CloverPrintView perLeaf={result.perLeaf} svgRef={printSvgRef} />
      </div>
    </div>
  );
}

function CallToAction({ highlighted }) {
  const broad = highlighted.length === 0;

  return (
    <section className="glass relative overflow-hidden p-6 sm:p-7">
      {/* Placeholder voor asset 5 (§8.2): open deur met zacht licht. */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-white/80 to-transparent blur-2xl"
        aria-hidden="true"
      />
      <div className="flex items-start gap-3">
        <DoorOpen className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
        <div className="w-full">
          <h2 className="text-sm font-semibold text-ink">
            {broad ? cta.broadTitle : highlighted.length > 1 ? cta.multiTitle : cta.singleTitle}
          </h2>

          {broad ? (
            <>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{cta.broadBody}</p>
              <ContactAction />
            </>
          ) : (
            <ul className="mt-3 space-y-4">
              {highlighted.map((leaf) => (
                <li key={leaf.id}>
                  <p className="text-sm font-semibold text-ink">{leaf.instrument.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{leaf.instrument.promise}</p>
                  <InstrumentAction instrument={leaf.instrument} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function InstrumentAction({ instrument }) {
  if (instrument.href) {
    return (
      <a href={instrument.href} className="btn-ghost mt-3" target="_blank" rel="noreferrer">
        {cta.instrumentLabel(instrument.name)}
      </a>
    );
  }
  return <ContactAction />;
}

/**
 * Contactknop, of — zolang `CONTACT_INFO` nog niet is ingevuld — een zichtbare
 * placeholder in plaats van een knop die nergens heen gaat (§10).
 */
function ContactAction() {
  const href = CONTACT_INFO.email ? `mailto:${CONTACT_INFO.email}` : CONTACT_INFO.url;
  if (!href) {
    return <p className="mt-2 text-xs italic text-ink-muted">{cta.placeholder}</p>;
  }
  return (
    <a href={href} className="btn-ghost mt-3" target={CONTACT_INFO.email ? undefined : "_blank"} rel="noreferrer">
      {cta.contactLabel}
    </a>
  );
}
