import { describe, expect, it } from "vitest";
import { calculatePhotoLayout, calculatePhotoLayoutAspect } from "./layout";
import { composeFireflyPrompt, validateKaartpakket } from "./schema";
import { matchPhotoToCard, nummerBoundaryFalsePositive } from "./photoMatch";

describe("layout", () => {
  it("RESERVE 500 controlewaarden", () => {
    const l = calculatePhotoLayout(500);
    expect(l.u).toBe(11406);
    expect(l.whiteRow).toBe(5133);
    expect(l.photoZone).toBe(6273);
    expect(l.reflectRow).toBe(1129);
    expect(l.photoRow).toBe(5144);
    expect(l.imageHeight).toBe(4990);
    expect(l.aspectRatio).toBeCloseTo(1.68, 2);
  });

  it("RESERVE 900 aspect ~1.74", () => {
    const ratio = calculatePhotoLayoutAspect(900);
    expect(ratio).toBeCloseTo(1.74, 2);
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
