import JSZip from "jszip";
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildCardDocx } from "./buildCardDocx";
import {
  compareSnapshots,
  extractCardContentFromReference,
  parseDocumentXml,
  readDocxDocumentXml,
} from "./docxXml";
import type { KaartPakket, KaartPakketKaart } from "./types";

const refPath = process.env.KAARTENATELIER_REF_DL15;

async function jpegFromDocx(buffer: ArrayBuffer): Promise<Uint8Array | undefined> {
  const zip = await JSZip.loadAsync(buffer);
  const mediaPath = Object.keys(zip.files).find((k) => /^word\/media\/.+\.(jpe?g|png)$/i.test(k));
  if (!mediaPath) return undefined;
  return zip.file(mediaPath)!.async("uint8array");
}

describe("golden DL15", () => {
  it("vergelijkt app-uitvoer met referentie document.xml", async () => {
    if (!refPath || !existsSync(refPath)) {
      console.warn(
        `[golden] Overgeslagen: stel KAARTENATELIER_REF_DL15 in op het pad naar DL15.docx (huidige waarde: ${refPath ?? "—"})`
      );
      return;
    }

    const refBuf = readFileSync(refPath);
    const refAb = refBuf.buffer.slice(refBuf.byteOffset, refBuf.byteOffset + refBuf.byteLength);
    const refXml = await readDocxDocumentXml(refAb);
    const refSnap = parseDocumentXml(refXml);
    const extracted = extractCardContentFromReference(refXml);
    const refJpeg = await jpegFromDocx(refAb);

    const pakket: KaartPakket = {
      schema: "kaartenatelier/1",
      categorie: { naam_nl: "Dagelijks leven", sector_kleur: extracted.sectorFill },
      kaarten: [],
    };

    const card: KaartPakketKaart = {
      nummer: "DL15",
      bestandsnaam: "DL15.docx",
      titel_nl: extracted.titel,
      verhaal_nl: extracted.verhaal,
      complexiteit: extracted.complexiteit,
      firefly_prompt_en: "Reference rebuild",
    };

    const genBlob = await buildCardDocx(pakket, card, refJpeg);
    const genXml = await readDocxDocumentXml(await genBlob.arrayBuffer());
    const genSnap = parseDocumentXml(genXml);

    const structural = compareSnapshots(refSnap, genSnap, { allowRowHeightDelta: true }).filter(
      (d) => !d.startsWith("page height")
    );
    const rowDiffs = compareSnapshots(refSnap, genSnap, { allowRowHeightDelta: false }).filter((d) =>
      d.startsWith("row ")
    );

    if (structural.length) {
      console.warn("[golden] Structurele verschillen:", structural);
    }
    if (rowDiffs.length) {
      console.warn(
        "[golden] Rijhoogtes wijken af (formule §5.2 vs goedgekeurde DL15-splitsing):",
        rowDiffs
      );
    }

    expect(refSnap.hasAnchor).toBe(false);
    expect(genSnap.hasAnchor).toBe(false);
    expect(genSnap.trailParagraphBeforeSectPr).toBe(true);
    expect(genSnap.margins?.header).toBe(0);
    expect(genSnap.margins?.footer).toBe(0);
    expect(structural.length).toBe(0);

    try {
      execSync("soffice --version", { stdio: "ignore" });
      const tmpOut = process.env.TEMP ?? process.env.TMP ?? "/tmp";
      execSync(`soffice --headless --convert-to pdf --outdir "${tmpOut}" "${refPath}"`, {
        stdio: "ignore",
      });
      console.warn("[golden] soffice aanwezig; handmatige PDF-paginacheck op referentie aanbevolen.");
    } catch {
      console.warn("[golden] PDF-paginacheck overgeslagen: soffice niet beschikbaar.");
    }
  }, 120_000);
});
