import { describe, expect, it } from "vitest";
import { measureCardTextFit } from "./textFit";

describe("textFit", () => {
  it("detecteert overflow bij zeer lange tekst", () => {
    const long = "woord ".repeat(400);
    const r = measureCardTextFit("Korte titel", [long, long, long]);
    expect(r.overflow).toBe(true);
    expect(r.linesOver).toBeGreaterThan(0);
  });

  it("geen overflow bij korte kaart", () => {
    const r = measureCardTextFit("Titel", ["Korte alinea.", "Nog een.", "Derde."]);
    expect(r.overflow).toBe(false);
  });
});
