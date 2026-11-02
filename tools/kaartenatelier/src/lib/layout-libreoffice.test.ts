import { execSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildCardDocx } from "./buildCardDocx";
import { MIN_JPEG } from "./testFixtures";

function pdfPageCount(pdfPath: string): number {
  const raw = readFileSync(pdfPath, "latin1");
  const matches = raw.match(/\/Type\s*\/Page[^s]/g);
  return matches?.length ?? 0;
}

function hasSoffice(): boolean {
  try {
    execSync("soffice --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

describe("LibreOffice paginacheck (optioneel)", () => {
  it("status-A met lange titel en kort verhaal blijven 1 pagina", async () => {
    if (!hasSoffice()) {
      console.warn("[libreoffice] Overgeslagen: soffice niet in PATH.");
      return;
    }

    const pakket = {
      schema: "kaartenatelier/1" as const,
      categorie: { naam_nl: "Test", sector_kleur: "#E0A01A" },
      kaarten: [],
    };

    const cases = [
      {
        nummer: "T1",
        bestandsnaam: "T1.docx",
        titel_nl: "Eerste regel van een bewust lange titel voor twee regels",
        verhaal_nl: ["Korte alinea.", "Tweede.", "Derde met vraag?"],
        complexiteit: "meso" as const,
        firefly_prompt_en: "Office",
      },
      {
        nummer: "T2",
        bestandsnaam: "T2.docx",
        titel_nl: "Korte titel",
        verhaal_nl: ["Eén zin.", "Twee.", "Drie?"],
        complexiteit: "micro" as const,
        firefly_prompt_en: "Desk",
      },
    ];

    const dir = mkdtempSync(join(tmpdir(), "kaartenatelier-lo-"));
    try {
      for (const card of cases) {
        const blob = await buildCardDocx(pakket, card, MIN_JPEG);
        const docxPath = join(dir, card.bestandsnaam);
        writeFileSync(docxPath, new Uint8Array(await blob.arrayBuffer()));
        execSync(`soffice --headless --convert-to pdf --outdir "${dir}" "${docxPath}"`, {
          stdio: "ignore",
        });
        const pdfPath = join(dir, card.bestandsnaam.replace(/\.docx$/i, ".pdf"));
        const pages = pdfPageCount(pdfPath);
        expect(pages).toBe(1);
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 180_000);
});
