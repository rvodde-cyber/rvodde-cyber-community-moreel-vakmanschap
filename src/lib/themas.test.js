import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildThemaHaystack,
  matchesThemas,
  matchesZoekInText,
  normalizeZoek,
  zoekTermen,
} from "./themas.js";

describe("normalizeZoek", () => {
  it("lowercases and strips accents", () => {
    assert.equal(normalizeZoek("Empathie"), "empathie");
    assert.equal(normalizeZoek("Beïnvloeding"), "beinvloeding");
    assert.equal(normalizeZoek("  Meerdere   spaties  "), "meerdere spaties");
  });
});

describe("zoekTermen", () => {
  it("requires every term to match", () => {
    const terms = zoekTermen("Morele Dialoog");
    assert.deepEqual(terms, ["morele", "dialoog"]);
    assert.equal(matchesZoekInText("een morele oefening in dialoog", "Morele Dialoog"), true);
    assert.equal(matchesZoekInText("morele oefening", "Morele Dialoog"), false);
  });
});

describe("matchesThemas", () => {
  it("empty selection passes", () => {
    assert.equal(matchesThemas(["dialoog"], []), true);
    assert.equal(matchesThemas([], []), true);
  });
  it("one or more selected", () => {
    assert.equal(matchesThemas(["dialoog", "empathie-perspectief"], ["dialoog"]), true);
    assert.equal(matchesThemas(["dialoog"], ["empathie-perspectief"]), false);
    assert.equal(
      matchesThemas(["dialoog", "empathie-perspectief"], ["dialoog", "waarden-integriteit"]),
      true,
    );
  });
});

describe("buildThemaHaystack", () => {
  it("includes synonyms for search", () => {
    const hay = buildThemaHaystack(["empathie-perspectief"]);
    assert.ok(hay.includes("perspectief nemen"));
    assert.equal(
      matchesZoekInText(`titel ${hay}`, "empathie"),
      true,
    );
    assert.equal(
      matchesZoekInText(`titel ${hay}`, "perspectief nemen"),
      true,
    );
  });
});