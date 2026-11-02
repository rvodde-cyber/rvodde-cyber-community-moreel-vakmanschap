import { describe, expect, it } from "vitest";
import {
  APPROVED_PHOTO_ROW_EXACT,
  APPROVED_REFLECT_ROW_EXACT,
  APPROVED_U,
  APPROVED_WHITE_ROW_AT_LEAST,
  APPROVED_IMAGE_HEIGHT_TWIPS,
  legacyFormulaLayout,
  percentDiff,
} from "./cardLayoutApproved";
import { calculatePhotoLayout, calculatePhotoLayoutAspect } from "./layout";
import { composeFireflyPrompt, validateKaartpakket } from "./schema";
import { matchPhotoToCard, nummerBoundaryFalsePositive } from "./photoMatch";

describe("layout goedgekeurd (DL15)", () => {
  it("export gebruikt gemeten rijhoogtes", () => {
    const l = calculatePhotoLayout(500);
    expect(l.u).toBe(APPROVED_U);
    expect(l.whiteRow).toBe(APPROVED_WHITE_ROW_AT_LEAST);
    expect(l.photoRow).toBe(APPROVED_PHOTO_ROW_EXACT);
    expect(l.reflectRow).toBe(APPROVED_REFLECT_ROW_EXACT);
    expect(l.imageHeight).toBe(APPROVED_IMAGE_HEIGHT_TWIPS);
    expect(l.aspectRatio).toBeCloseTo(8391 / 5202, 2);
  });

  it("legacy formule wijkt >1% per rij af", () => {
    const legacy = legacyFormulaLayout(500);
    expect(percentDiff(legacy.whiteRow, APPROVED_WHITE_ROW_AT_LEAST)).toBeGreaterThan(1);
    expect(percentDiff(legacy.photoRow, APPROVED_PHOTO_ROW_EXACT)).toBeGreaterThan(1);
    expect(percentDiff(legacy.reflectRow, APPROVED_REFLECT_ROW_EXACT)).toBeGreaterThan(1);
  });

  it("aspect ratio fotocrop", () => {
    const ratio = calculatePhotoLayoutAspect(500);
    expect(ratio).toBeCloseTo(8391 / 5202, 2);
  });
});

describe("schema", () => {
  it("blokkeert dubbel nummer", () => {
    const { issues } = validateKaartpakket({
      schema: "kaartenatelier/1",
      categorie: { naam_nl: "Werk", sector_kleur: "#E05A1A" },
      kaarten: [
        {
          nummer: "DL7",
          bestandsnaam: "DL7.docx",
          titel_nl: "T",
          verhaal_nl: ["a", "b", "c?"],
          complexiteit: "meso",
          firefly_prompt_en: "A scene",
        },
        {
          nummer: "DL7",
          bestandsnaam: "DL7b.docx",
          titel_nl: "T2",
          verhaal_nl: ["a", "b", "c?"],
          complexiteit: "micro",
          firefly_prompt_en: "B scene",
        },
      ],
    });
    expect(issues.some((i) => i.blocking && i.message.includes("Dubbel"))).toBe(true);
  });
});

describe("firefly", () => {
  it("voegt suffix niet dubbel toe", () => {
    const suffix =
      "Photorealistic, editorial photography style, natural lighting with slight drama, shallow depth of field, real people in authentic settings, no text, no graphics, no illustrations, cinematic composition, suitable for A5 print, portrait orientation 3:4.";
    const once = composeFireflyPrompt(`Scene. ${suffix}`);
    expect(once.match(/portrait orientation 3:4/g)?.length).toBe(1);
  });
});

describe("photoMatch", () => {
  it("DL7 matcht niet DL70", () => {
    expect(nummerBoundaryFalsePositive()).toBe(false);
  });

  it("koppelt op nummer", () => {
    const file = new File([], "DL7-foto.jpg");
    const res = matchPhotoToCard(
      {
        nummer: "DL7",
        bestandsnaam: "DL7.docx",
        titel_nl: "t",
        verhaal_nl: ["a", "b", "c?"],
        complexiteit: "micro",
        firefly_prompt_en: "x",
      },
      [file],
      new Set()
    );
    expect(res.kind).toBe("nummer");
  });
});
