import { useEffect, useRef, useState } from "react";
import { Download, DoorOpen, Info, RotateCcw } from "lucide-react";
import Clover from "../components/Clover";
import CloverPrintView from "../components/CloverPrintView";
import { brand } from "../config/brand";
import { cta, result as resultCopy } from "../config/copy";
import { saveScanResult, storageConfigured } from "../lib/storage";

export default function Result({ result, sessionCode, onRestart }) {
  const printSvgRef = useRef(null);
  const savedRef = useRef(false);
  const [saveState, setSaveState] = useState(storageConfigured ? "saving" : "skipped");
  const [pdfState, setPdfState] = useState("idle");

  const highlighted = result.perLeaf.filter((leaf) => leaf.highlighted);

  useEffect(() => {
    // Ref-guard: in StrictMode draait dit effect twee keer, en één scan hoort
    // één rij in de database te zijn.
    if (savedRef.current || !storageConfigured) return;
    savedRef.current = true;

    saveScanResult({
      sessionCode,
      scores: result.scores,
      conclusionKind: result.conclusion.kind,
    }).then(({ status }) => setSaveState(status));
  }, [result, sessionCode]);

  const handleDownload = async () => {
    if (!printSvgRef.current) return;
    setPdfState("busy");
    try {
      // De PDF-generator is zwaar en alleen nodig als iemand hem echt opvraagt.
      const { generateSummaryPdf } = await import("../lib/pdf");
      await generateSummaryPdf({ svgElement: printSvgRef.current, result, sessionCode });
      setPdfState("idle");
    } catch {
      setPdfState("error");
    }
  };

  return (
    <div className="space-y-6">
      <section className="glass result-glow overflow-hidden p-6 sm:p-9">
        <p className="eyebrow">{resultCopy.eyebrow}</p>

        <div className="mt-6">
          <Clover perLeaf={result.perLeaf} className="max-w-[30rem]" />
        </div>

        <p className="mt-4 text-center text-xs text-ink-muted">{resultCopy.legend}</p>

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
              <div className="flex items-center gap-2.5">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: leaf.color }}
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-ink">{leaf.label}</h3>
                <span className="text-xs text-ink-muted">{leaf.qualitative}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{leaf.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <CallToAction highlighted={highlighted} />

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleDownload} disabled={pdfState === "busy"} className="btn-primary">
            <Download className="h-4 w-4" aria-hidden="true" />
            {pdfState === "busy" ? resultCopy.pdfBusyLabel : resultCopy.pdfLabel}
          </button>
          <button type="button" onClick={onRestart} className="btn-ghost">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {resultCopy.restartLabel}
          </button>
        </div>
        <p className="text-xs text-ink-muted" role="status">
          {pdfState === "error" ? resultCopy.pdfErrorLabel : saveStatusLabel(saveState)}
        </p>
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
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{cta.broadBody}</p>
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

          {broad ? <ContactAction /> : null}
        </div>
      </div>
    </section>
  );
}

function InstrumentAction({ instrument }) {
  if (instrument.href) {
    return (
      <a
        href={instrument.href}
        className="btn-ghost mt-3"
        target="_blank"
        rel="noreferrer"
      >
        {cta.instrumentLabel(instrument.name)}
      </a>
    );
  }
  if (brand.contactEmail) return <ContactAction />;
  return <p className="mt-2 text-xs italic text-ink-muted">{cta.placeholderNote}</p>;
}

function ContactAction() {
  if (!brand.contactEmail) {
    return <p className="mt-2 text-xs italic text-ink-muted">{cta.placeholderNote}</p>;
  }
  return (
    <a href={`mailto:${brand.contactEmail}`} className="btn-ghost mt-3">
      {cta.contactLabel}
    </a>
  );
}

function saveStatusLabel(state) {
  if (state === "saving") return resultCopy.savingLabel;
  if (state === "saved") return resultCopy.savedLabel;
  if (state === "error") return resultCopy.saveErrorLabel;
  return "";
}
