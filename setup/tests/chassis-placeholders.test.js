import { describe, expect, it } from "vitest";
import { LIKERT_LABELS, chassisItems, SETUP_SECTIONS } from "../src/config/chassisPlaceholders.js";

describe("chassis placeholders", () => {
  it("covers seven ESH dimensions", () => {
    expect(chassisItems).toHaveLength(7);
    expect(new Set(chassisItems.map((i) => i.dimension)).size).toBe(7);
  });

  it("has Likert labels 1–5", () => {
    expect(Object.keys(LIKERT_LABELS).map(Number)).toEqual([1, 2, 3, 4, 5]);
  });

  it("lists five Setup sections with Chassis first", () => {
    expect(SETUP_SECTIONS).toHaveLength(5);
    expect(SETUP_SECTIONS[0].id).toBe("chassis");
  });
});
