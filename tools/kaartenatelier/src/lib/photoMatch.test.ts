import { describe, expect, it } from "vitest";
import { matchPhotoToCard } from "./photoMatch";
import type { KaartPakketKaart } from "./types";

function file(name: string): File {
  return new File(["x"], name, { type: "image/jpeg" });
}

describe("foto_bestand prioriteit", () => {
  it("koppelt package-bestand boven nummer-match", () => {
    const card: KaartPakketKaart = {
      nummer: "DL7",
      bestandsnaam: "x.docx",
      titel_nl: "t",
      verhaal_nl: ["a", "b", "c"],
      complexiteit: "micro",
      firefly_prompt_en: "prompt",
      foto_bestand: "exact-from-pakket.jpg",
    };
    const files = [file("DL7-other.jpg"), file("exact-from-pakket.jpg")];
    const r = matchPhotoToCard(card, files, new Set());
    expect(r.kind).toBe("package");
    if (r.kind === "package") expect(r.file.name).toBe("exact-from-pakket.jpg");
  });
});
