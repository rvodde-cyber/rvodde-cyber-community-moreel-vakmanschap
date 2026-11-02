import JSZip from "jszip";
import { describe, expect, it } from "vitest";
import { buildCardDocx } from "./buildCardDocx";
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
  });
});
