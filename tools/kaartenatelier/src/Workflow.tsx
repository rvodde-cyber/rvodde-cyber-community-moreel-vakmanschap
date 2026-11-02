import { useCallback, useMemo, useState } from "react";
import {
  analyzeCard,
  composeFireflyPrompt,
  complexitySpread,
  parseKaartpakketJson,
  wordCountParagraphs,
} from "./lib/schema";
import { matchPhotoToCard } from "./lib/photoMatch";
import {
  blobToUint8Array,
  cropImageToJpeg,
  loadImageFromFile,
} from "./lib/imageCrop";
import { calculatePhotoLayoutAspect } from "./lib/layout";
import { buildExportZip, downloadBlob } from "./lib/exportZip";
import { collectExportFiles } from "./lib/exportBundle";
import {
  buildFireflyPromptsDocx,
  buildPromptlijstDocx,
  fireflyPromptsFilename,
  promptlijstFilename,
} from "./lib/buildPromptDocx";
import {
  blobToUint8,
  supportsDirectoryPicker,
  writeFilesToDirectoryHandle,
  type WriteLogEntry,
} from "./lib/directoryExport";
import type { KaartPakket } from "./lib/types";
import type { Locale } from "./strings";
import { strings } from "./strings";
import { CardPreview } from "./CardPreview";

type PhotoState = {
  file: File;
  focusX: number;
  focusY: number;
  previewUrl: string;
  jpeg?: Uint8Array;
  lowRes?: boolean;
  confirmed: boolean;
  viaPackage?: boolean;
};

export function Workflow({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [step, setStep] = useState(1);
  const [paste, setPaste] = useState("");
  const [issues, setIssues] = useState<{ path: string; message: string; blocking: boolean }[]>([]);
  const [pakket, setPakket] = useState<KaartPakket | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Record<string, PhotoState>>({});
  const [exporting, setExporting] = useState(false);
  const [allowAanpassen, setAllowAanpassen] = useState<Set<string>>(() => new Set());
  const [exportLog, setExportLog] = useState<WriteLogEntry[] | null>(null);

  const cardWarnings = useMemo(() => {
    if (!pakket) return {};
    const map: Record<string, string[]> = {};
    for (const c of pakket.kaarten) {
      const hasPhoto = Boolean(photos[c.nummer]?.jpeg);
      map[c.nummer] = [
        ...analyzeCard(c, hasPhoto).warnings,
        ...analyzeCard(c, hasPhoto).blocking,
      ];
    }
    return map;
  }, [pakket, photos]);

  const spread = pakket ? complexitySpread(pakket.kaarten) : null;
  const dirPickerOk = supportsDirectoryPicker();

  function exportPhotoMap() {
    return Object.fromEntries(
      Object.entries(photos).map(([k, v]) => [
        k,
        v.jpeg
          ? {
              jpeg: v.jpeg,
              fileName: v.file.name.replace(/\.[^.]+$/, ".jpg"),
              confirmed: v.confirmed,
            }
          : undefined,
      ])
    );
  }

  function ingest(raw: string) {
    const result = parseKaartpakketJson(raw);
    setIssues(result.issues);
    if (result.data) {
      setPakket(result.data);
      setPhotos({});
      setAllowAanpassen(new Set());
      setExportLog(null);
      setStep(2);
    } else {
      setPakket(null);
    }
  }

  async function onFiles(files: FileList | null) {
    if (!files?.length || !pakket) return;
    const list = [...files];
    const assigned = new Set<string>();
    const next = { ...photos };
    for (const card of pakket.kaarten) {
      const match = matchPhotoToCard(card, list, assigned);
      if (match.kind === "package" || match.kind === "nummer" || match.kind === "prompt") {
        assigned.add(match.file.name);
        await attachPhoto(card.nummer, match.file, next, match.kind === "package");
      }
    }
    setPhotos(next);
  }

  async function attachPhoto(
    nummer: string,
    file: File,
    target: Record<string, PhotoState>,
    viaPackage = false
  ) {
    const img = await loadImageFromFile(file);
    const aspect = calculatePhotoLayoutAspect(500);
    const { blob, lowRes } = cropImageToJpeg(img, aspect);
    const jpeg = await blobToUint8Array(blob);
    target[nummer] = {
      file,
      focusX: 0.5,
      focusY: 0.5,
      previewUrl: URL.createObjectURL(blob),
      jpeg,
      lowRes,
      confirmed: false,
      viaPackage,
    };
  }

  const refreshCrop = useCallback(
    async (nummer: string, fx: number, fy: number) => {
      const p = photos[nummer];
      if (!p) return;
      const img = await loadImageFromFile(p.file);
      const aspect = calculatePhotoLayoutAspect(500);
      const { blob, lowRes } = cropImageToJpeg(img, aspect, { x: fx, y: fy });
      const jpeg = await blobToUint8Array(blob);
      setPhotos((prev) => ({
        ...prev,
        [nummer]: {
          ...prev[nummer],
          focusX: fx,
          focusY: fy,
          previewUrl: URL.createObjectURL(blob),
          jpeg,
          lowRes,
          confirmed: false,
        },
      }));
    },
    [photos]
  );

  async function doExportZip() {
    if (!pakket) return;
    setExporting(true);
    setExportLog(null);
    try {
      const zip = await buildExportZip({
        pakket,
        photos: exportPhotoMap(),
        cardWarnings,
        allowAanpassen,
      });
      await downloadBlob(zip, `kaartenatelier_${pakket.categorie.naam_nl}.zip`);
    } finally {
      setExporting(false);
    }
  }

  async function doExportFolder() {
    if (!pakket || !dirPickerOk) return;
    setExporting(true);
    try {
      // @ts-expect-error File System Access API
      const dir = await window.showDirectoryPicker({ mode: "readwrite" });
      const { files } = await collectExportFiles({
        pakket,
        photos: exportPhotoMap(),
        cardWarnings,
        allowAanpassen,
      });
      const entries = await Promise.all(
        files.map(async (f) => ({
          relativePath: f.relativePath,
          data: await blobToUint8(f.data),
        }))
      );
      const logs = await writeFilesToDirectoryHandle(dir, entries);
      setExportLog(logs);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setExportLog([{ path: "—", outcome: "cancelled", detail: "Geannuleerd door gebruiker" }]);
      } else {
        setExportLog([{ path: "—", outcome: "error", detail: String(e) }]);
      }
    } finally {
      setExporting(false);
    }
  }

  async function downloadPromptDocs(which: "firefly" | "lijst") {
    if (!pakket) return;
    if (which === "firefly") {
      const blob = await buildFireflyPromptsDocx(pakket);
      await downloadBlob(blob, fireflyPromptsFilename(pakket));
    } else {
      const blob = await buildPromptlijstDocx(pakket);
      await downloadBlob(blob, promptlijstFilename(pakket));
    }
  }

  const previewCard = pakket?.kaarten.find((c) => c.nummer === previewId);
  const aanpassenCards = pakket?.kaarten.filter((c) => c.foto_status === "aanpassen") ?? [];

  return (
    <div className="workflow">
      <nav className="steps" aria-label="Stappen">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={step === n ? "step active" : "step"}
            disabled={!pakket && n > 1}
            onClick={() => setStep(n)}
          >
            {t[`step${n}` as keyof typeof t]}
          </button>
        ))}
      </nav>

      {step === 1 && (
        <section className="panel">
          <label className="file-label">
            {t.loadFile}
            <input
              type="file"
              accept="application/json,.json"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                f.text().then(ingest);
              }}
            />
          </label>
          <label>{t.loadPaste}</label>
          <textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={8} />
          <button type="button" className="primary" onClick={() => ingest(paste)}>
            {t.loadApply}
          </button>
          {issues.filter((i) => i.blocking).length > 0 && (
            <ul className="errors">
              {issues
                .filter((i) => i.blocking)
                .map((i) => (
                  <li key={i.path + i.message}>
                    <strong>{i.path || "—"}</strong>: {i.message}
                  </li>
                ))}
            </ul>
          )}
        </section>
      )}

      {step === 2 && pakket && (
        <section className="panel">
          <p>
            {pakket.kaarten.length} {t.cardsCount} · {pakket.categorie.naam_nl} ·{" "}
            {pakket.categorie.sector_kleur}
          </p>
          {spread && (
            <p>
              {t.spread}: micro {spread.counts.micro}, meso {spread.counts.meso}, macro{" "}
              {spread.counts.macro}
              {spread.mesoPct > 0.6 && <strong className="warn"> — {t.mesoWarn}</strong>}
            </p>
          )}
          {pakket.uitzonderingen?.length ? (
            <>
              <h3>{t.exceptions}</h3>
              <ul>
                {pakket.uitzonderingen.map((u) => (
                  <li key={u.nummer}>
                    {u.nummer}: {u.reden}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <table className="card-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Titel</th>
                <th>Niveau</th>
                <th>Woorden</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pakket.kaarten.map((c) => (
                <tr key={c.nummer}>
                  <td>{c.nummer}</td>
                  <td>{c.titel_nl}</td>
                  <td>{c.complexiteit}</td>
                  <td>{wordCountParagraphs(c.verhaal_nl)}</td>
                  <td>
                    <button type="button" onClick={() => setPreviewId(c.nummer)}>
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {previewCard && pakket && (
        <div className="modal" role="dialog">
          <CardPreview
            pakket={pakket}
            card={previewCard}
            label={t.previewLabel}
            overflowLabel={t.textOverflowWarn}
          />
          <button type="button" onClick={() => setPreviewId(null)}>
            Sluiten
          </button>
        </div>
      )}

      {step === 3 && pakket && (
        <section className="panel">
          <p className="hint">{t.fireflyHint}</p>
          <p>
            {pakket.kaarten.length} {t.promptCount} {pakket.kaarten.length}{" "}
            {t.promptsHavePrompt}
          </p>
          <div className="button-row">
            <button type="button" onClick={() => downloadPromptDocs("firefly")}>
              {t.downloadFireflyDoc}
            </button>
            <button type="button" onClick={() => downloadPromptDocs("lijst")}>
              {t.downloadPromptlijst}
            </button>
          </div>
          <ul className="prompt-list">
            {pakket.kaarten.map((c) => {
              const full = composeFireflyPrompt(c.firefly_prompt_en);
              return (
                <li key={c.nummer}>
                  <strong>{c.nummer}</strong> ({full.length}/1024)
                  <pre>{full}</pre>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(full)}
                  >
                    {t.copyPrompt}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 4 && pakket && (
        <section className="panel">
          <p>{t.dropPhotos}</p>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => onFiles(e.target.files)}
          />
          {pakket.kaarten.map((c) => {
            const ph = photos[c.nummer];
            return (
              <div key={c.nummer} className="photo-row">
                <span>{c.nummer}</span>
                {c.foto_bestand?.trim() && (
                  <span className="hint">foto_bestand: {c.foto_bestand}</span>
                )}
                {ph ? (
                  <>
                    <img src={ph.previewUrl} alt="" className="thumb" />
                    {ph.lowRes && <span className="warn"> &lt;1200px</span>}
                    {ph.viaPackage && (
                      <p className="hint package-confirm">{t.packagePhotoConfirm}</p>
                    )}
                    <label>
                      Focus X
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={ph.focusX * 100}
                        onChange={(e) =>
                          refreshCrop(c.nummer, Number(e.target.value) / 100, ph.focusY)
                        }
                      />
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={ph.confirmed}
                        onChange={(e) =>
                          setPhotos((prev) => ({
                            ...prev,
                            [c.nummer]: { ...prev[c.nummer], confirmed: e.target.checked },
                          }))
                        }
                      />
                      {t.subjectInFrame}
                    </label>
                  </>
                ) : (
                  <span>— geen foto</span>
                )}
              </div>
            );
          })}
        </section>
      )}

      {step === 5 && pakket && (
        <section className="panel">
          <p>{t.exportNote}</p>
          <p className="hint">{t.exportDisclaimer}</p>
          {aanpassenCards.length > 0 && (
            <ul>
              {aanpassenCards.map((c) => (
                <li key={c.nummer}>
                  <label>
                    <input
                      type="checkbox"
                      checked={allowAanpassen.has(c.nummer)}
                      onChange={(e) => {
                        setAllowAanpassen((prev) => {
                          const next = new Set(prev);
                          if (e.target.checked) next.add(c.nummer);
                          else next.delete(c.nummer);
                          return next;
                        });
                      }}
                    />
                    {c.nummer}: {t.allowAanpassen}
                  </label>
                </li>
              ))}
            </ul>
          )}
          <div className="button-row">
            <button type="button" className="primary" disabled={exporting} onClick={doExportZip}>
              {t.exportZip}
            </button>
            {dirPickerOk ? (
              <button type="button" disabled={exporting} onClick={doExportFolder}>
                {t.exportFolder}
              </button>
            ) : (
              <p className="hint">{t.exportFolderUnavailable}</p>
            )}
          </div>
          {exportLog && (
            <>
              <h3>{t.exportLogHeading}</h3>
              <ul>
                {exportLog.map((l) => (
                  <li key={l.path + l.outcome}>
                    {l.path}: {l.outcome}
                    {l.detail ? ` (${l.detail})` : ""}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </div>
  );
}
