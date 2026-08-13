import { describe, expect, it } from "vitest";
import { statements } from "../src/config/statements";
import { leaves } from "../src/config/leaves";
import { bandFor, buildResult, deriveConclusion, toScore } from "../src/lib/scoring";

/**
 * Bouwt een antwoordenset waarbij elk blad exact de opgegeven scores krijgt.
 * Negatief geformuleerde stellingen worden teruggerekend, zodat de test in
 * scores denkt en niet in kliks.
 *
 * @param {Record<string, number[]>} perLeaf blad-id → drie scores (1–5)
 */
function answersFor(perLeaf) {
  const cursor = {};
  const answers = {};
  for (const statement of statements) {
    const index = cursor[statement.leafId] ?? 0;
    cursor[statement.leafId] = index + 1;
    const score = perLeaf[statement.leafId][index];
    answers[statement.id] = statement.reverse ? 6 - score : score;
  }
  return answers;
}

const uniform = (value) => Object.fromEntries(leaves.map((leaf) => [leaf.id, [value, value, value]]));

describe("omgekeerd gescoorde stellingen", () => {
  it("draait instemming om", () => {
    expect(toScore({ reverse: true }, 5)).toBe(1);
    expect(toScore({ reverse: true }, 2)).toBe(4);
    expect(toScore({ reverse: false }, 5)).toBe(5);
  });

  it("staat precies één keer per blad in de vragenlijst", () => {
    for (const leaf of leaves) {
      const reversed = statements.filter((s) => s.leafId === leaf.id && s.reverse);
      expect(reversed).toHaveLength(1);
    }
  });

  it("geeft elk blad drie stellingen", () => {
    for (const leaf of leaves) {
      expect(statements.filter((s) => s.leafId === leaf.id)).toHaveLength(3);
    }
  });
});

describe("hoofdconclusie", () => {
  it("licht één blad uit als dat duidelijk het laagst scoort", () => {
    const result = buildResult(
      answersFor({ ...uniform(5), team: [2, 2, 2] })
    );
    expect(result.conclusion.kind).toBe("single");
    expect(result.conclusion.highlightedIds).toEqual(["team"]);
  });

  it("licht bij gelijke stand beide bladen uit", () => {
    const result = buildResult(
      answersFor({ ...uniform(5), team: [2, 2, 2], leiderschap: [2, 2, 2] })
    );
    expect(result.conclusion.kind).toBe("tie");
    expect(result.conclusion.highlightedIds.sort()).toEqual(["leiderschap", "team"]);
  });

  it("meldt 'geen uitschieter' bij vier hoge scores dicht bij elkaar", () => {
    const result = buildResult(
      answersFor({ ...uniform(4), organisatie: [4, 4, 5] })
    );
    expect(result.conclusion.kind).toBe("balancedStrong");
    expect(result.conclusion.highlightedIds).toEqual([]);
  });

  it("meldt 'meerdere domeinen' bij vier lage scores dicht bij elkaar", () => {
    const result = buildResult(
      answersFor({ ...uniform(3), organisatie: [3, 3, 2] })
    );
    expect(result.conclusion.kind).toBe("balancedLow");
    expect(result.conclusion.highlightedIds).toEqual([]);
  });

  it("gebruikt de spreiding, niet alleen het gemiddelde, om te kiezen", () => {
    // Spreiding precies op de grens van 0,5 telt nog als 'dicht bij elkaar'.
    const onBoundary = deriveConclusion({
      integriteit: 3,
      team: 3.5,
      organisatie: 3.2,
      leiderschap: 3.1,
    });
    expect(onBoundary.kind).toBe("balancedLow");

    const justOver = deriveConclusion({
      integriteit: 3,
      team: 3.6,
      organisatie: 3.2,
      leiderschap: 3.1,
    });
    expect(justOver.kind).toBe("single");
    expect(justOver.highlightedIds).toEqual(["integriteit"]);
  });
});

describe("kwalitatieve weergave", () => {
  it("vertaalt scores naar drie niveaus", () => {
    expect(bandFor(1.5)).toBe("urgent");
    expect(bandFor(3)).toBe("aandacht");
    expect(bandFor(4.5)).toBe("vitaal");
  });

  it("levert per blad een toelichting zonder cijfers", () => {
    const result = buildResult(answersFor({ ...uniform(4), team: [1, 2, 2] }));
    for (const leaf of result.perLeaf) {
      expect(leaf.qualitative).toBeTruthy();
      expect(leaf.note).toBeTruthy();
      expect(`${leaf.qualitative} ${leaf.note}`).not.toMatch(/\d/);
    }
  });

  it("geeft een vitaliteit tussen 0 en 1", () => {
    const result = buildResult(answersFor({ ...uniform(1), team: [5, 5, 5] }));
    for (const leaf of result.perLeaf) {
      expect(leaf.vitality).toBeGreaterThanOrEqual(0);
      expect(leaf.vitality).toBeLessThanOrEqual(1);
    }
  });
});
