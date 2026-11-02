import JSZip from "jszip";
import { describe, expect, it } from "vitest";
import { buildCardDocx } from "./buildCardDocx";
import { parseDocumentXml } from "./docxXml";
import { MIN_JPEG } from "./testFixtures";
import type { KaartPakket } from "./types";

const sample: KaartPakket = {
  schema: "kaartenatelier/1",
  categorie: { naam_nl: "Dagelijks leven", sector_kleur: "#E0A01A" },
  kaarten: [],
};

const card = {
  nummer: "DL7",
  bestandsnaam: "DL7.docx",
  titel_nl: "Test",
  verhaal_nl: ["Eerste alinea.", "Tweede alinea.", "Derde met slot?"],
  complexiteit: "meso" as const,
  firefly_prompt_en: "Office scene",
};

describe("docx structure", () => {
  it("bevat slotalinea en geen floating anchor", async () => {
    const blob = await buildCardDocx(sample, card);
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const xml = await zip.file("word/document.xml")!.async("string");
    expect(xml).toContain('w:lineRule="exact"');
    expect(xml).toContain('w:val="2"');
    expect(xml).not.toContain("wp:anchor");
    const snap = parseDocumentXml(xml);
    expect(snap.trailParagraphBeforeSectPr).toBe(true);
    expect(snap.margins?.header).toBe(0);
  });

  it("status-A heeft drie trHeight waarden (4953/5363/1090)", async () => {
    const blob = await buildCardDocx(sample, card, MIN_JPEG);
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const xml = await zip.file("word/document.xml")!.async("string");
    const snap = parseDocumentXml(xml);
    expect(snap.rowHeights.length).toBe(3);
    expect(snap.rowHeights[0].value).toBe(4953);
    expect(snap.rowHeights[1].value).toBe(5363);
    expect(snap.rowHeights[2].value).toBe(1090);
  });
});
