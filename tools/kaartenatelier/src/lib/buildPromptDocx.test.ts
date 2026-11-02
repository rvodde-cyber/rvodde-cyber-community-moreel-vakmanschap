import { describe, expect, it } from "vitest";
import { buildFireflyPromptsDocx, buildPromptlijstDocx, fireflyPromptsFilename } from "./buildPromptDocx";
import { composeFireflyPrompt } from "./schema";
import { FIREFLY_SUFFIX } from "./constants";
import type { KaartPakket } from "./types";
import JSZip from "jszip";

const pakket: KaartPakket = {
  schema: "kaartenatelier/1",
  categorie: { naam_nl: "Dagelijks leven", sector_kleur: "#E0A01A" },
  batch: { id: "2026-01", beeldmaker: "Alex" },
  uitzonderingen: [{ nummer: "DL1", reden: "Geen prompt" }],
  kaarten: [
    {
      nummer: "DL1",
      bestandsnaam: "DL1.docx",
      titel_nl: "Eerste",
      verhaal_nl: ["a", "b", "c"],
      complexiteit: "micro",
      firefly_prompt_en: "Rain on window",
    },
    {
      nummer: "DL2",
      bestandsnaam: "DL2.docx",
      titel_nl: "Tweede",
      verhaal_nl: ["a", "b", "c"],
      complexiteit: "meso",
      firefly_prompt_en: "Kitchen table",
    },
  ],
};

describe("prompt docx", () => {
  it("samengestelde prompt max 1024 en suffix eenmalig", () => {
    for (const c of pakket.kaarten) {
      const full = composeFireflyPrompt(c.firefly_prompt_en);
      expect(full.length).toBeLessThanOrEqual(1024);
      expect(full.split(FIREFLY_SUFFIX.trim()).length - 1).toBe(1);
    }
  });

  it("Firefly_prompts bevat uitzonderingen", async () => {
    const blob = await buildFireflyPromptsDocx(pakket);
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const xml = await zip.file("word/document.xml")!.async("string");
    expect(fireflyPromptsFilename(pakket)).toBe("Firefly_prompts_DAGELIJKS_LEVEN.docx");
    expect(xml).toContain("Uitzonderingen");
    expect(xml).toContain("DL1");
  });

  it("Promptlijst bevat werkwijze en beeldmaker", async () => {
    const blob = await buildPromptlijstDocx(pakket);
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const xml = await zip.file("word/document.xml")!.async("string");
    expect(xml).toContain("Alex");
    expect(xml).toContain("Gekozen bestand");
    expect(xml).toContain("☐");
  });
});
