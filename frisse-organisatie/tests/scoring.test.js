import { describe, expect, it } from "vitest";
import { statements } from "../src/config/statements";
import { leaves } from "../src/config/leaves";
import {
  bandFor,
  buildResult,
  buildResultFromScores,
  computeTeamScores,
  deriveConclusion,
  toScore,
} from "../src/lib/scoring";

/**
 * Bouwt een antwoordenset waarbij elk blad exact de opgegeven scores krijgt.
 * Negatief geformuleerde stellingen worden teruggerekend, zodat de test in
 * scores denkt en niet in kliks.
 *
 * @param {Record<string, number[]>} perLeaf blad-id → vijf scores (1–5)
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

const uniform = (value) =>
  Object.fromEntries(leaves.map((leaf) => [leaf.id, Array(5).fill(value)]));

describe("vragenlijst", () => {
  it("heeft vijf stellingen per blad", () => {
    for (const leaf of leaves) {
      expect(statements.filter((s) => s.leafId === leaf.id)).toHaveLength(5);
    }
    expect(statements).toHaveLength(20);
  });

  it("heeft precies één omgekeerd gescoorde stelling per blad", () => {
    for (const leaf of leaves) {
      expect(statements.filter((s) => s.leafId === leaf.id && s.reverse)).toHaveLength(1);
    }
  });

  it("gebruikt unieke ids", () => {
    expect(new Set(statements.map((s) => s.id)).size).toBe(statements.length);
  });

  it("zet nooit twee stellingen van hetzelfde blad achter elkaar", () => {
    for (let i = 1; i < statements.length; i += 1) {
      expect(statements[i].leafId).not.toBe(statements[i - 1].leafId);
    }
  });

  it("draait instemming om bij een omgekeerde stelling", () => {
    expect(toScore({ reverse: true }, 5)).toBe(1);
    expect(toScore({ reverse: true }, 2)).toBe(4);
    expect(toScore({ reverse: false }, 5)).toBe(5);
  });
});

describe("hoofdconclusie", () => {
  it("licht één blad uit als dat duidelijk het laagst scoort", () => {
    const result = buildResult(answersFor({ ...uniform(5), team: [2, 2, 2, 2, 2] }));
    expect(result.conclusion.kind).toBe("single");
    expect(result.conclusion.highlightedIds).toEqual(["team"]);
  });

  it("licht bij gelijke stand beide bladen uit", () => {
    const result = buildResult(
      answersFor({ ...uniform(5), team: [2, 2, 2, 2, 2], leiderschap: [2, 2, 2, 2, 2] })
    );
    expect(result.conclusion.kind).toBe("tie");
    expect(result.conclusion.highlightedIds.sort()).toEqual(["leiderschap", "team"]);
  });

  it("meldt 'geen uitschieter' bij vier hoge scores dicht bij elkaar", () => {
    const result = buildResult(answersFor({ ...uniform(4), organisatie: [4, 4, 4, 4, 5] }));
    expect(result.conclusion.kind).toBe("balancedStrong");
    expect(result.conclusion.highlightedIds).toEqual([]);
  });

  it("meldt 'meerdere domeinen' bij vier lage scores dicht bij elkaar", () => {
    const result = buildResult(answersFor({ ...uniform(3), organisatie: [3, 3, 3, 3, 2] }));
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

describe("teamgemiddelde", () => {
  it("middelt de bladgemiddelden van de invullers", () => {
    const optimist = answersFor(uniform(5));
    const pessimist = answersFor(uniform(1));
    const scores = computeTeamScores([optimist, pessimist]);
    for (const leaf of leaves) {
      expect(scores[leaf.id]).toBeCloseTo(3, 10);
    }
  });

  it("laat één invuller met extreme antwoorden niet zwaarder wegen", () => {
    // Beide invullers hebben hetzelfde bladgemiddelde (3), maar de tweede komt
    // daar via extremen. Het team hoort precies daartussenin uit te komen.
    const gemiddeld = answersFor(uniform(3));
    const extreem = answersFor(
      Object.fromEntries(leaves.map((leaf) => [leaf.id, [1, 5, 1, 5, 3]]))
    );
    const scores = computeTeamScores([gemiddeld, extreem]);
    for (const leaf of leaves) {
      expect(scores[leaf.id]).toBeCloseTo(3, 10);
    }
  });

  it("geeft dezelfde duiding als een individu met dezelfde scores", () => {
    const answerSets = [
      answersFor({ ...uniform(5), leiderschap: [1, 1, 1, 1, 1] }),
      answersFor({ ...uniform(5), leiderschap: [3, 3, 3, 3, 3] }),
    ];
    const team = buildResultFromScores(computeTeamScores(answerSets));
    const individueel = buildResult(answersFor({ ...uniform(5), leiderschap: [2, 2, 2, 2, 2] }));
    expect(team.conclusion.kind).toBe(individueel.conclusion.kind);
    expect(team.conclusion.title).toBe(individueel.conclusion.title);
  });

  it("levert nulscores bij een lege lijst in plaats van te crashen", () => {
    const scores = computeTeamScores([]);
    expect(Object.values(scores)).toEqual([0, 0, 0, 0]);
  });
});

describe("kwalitatieve weergave", () => {
  it("vertaalt scores naar drie niveaus", () => {
    expect(bandFor(1.5)).toBe("urgent");
    expect(bandFor(3)).toBe("aandacht");
    expect(bandFor(4.5)).toBe("vitaal");
  });

  it("levert per blad een toelichting zonder cijfers", () => {
    const result = buildResult(answersFor({ ...uniform(4), team: [1, 2, 2, 1, 2] }));
    for (const leaf of result.perLeaf) {
      expect(leaf.qualitative).toBeTruthy();
      expect(leaf.note).toBeTruthy();
      expect(`${leaf.qualitative} ${leaf.note}`).not.toMatch(/\d/);
    }
  });

  it("geeft een vitaliteit tussen 0 en 1", () => {
    const result = buildResult(answersFor({ ...uniform(1), team: [5, 5, 5, 5, 5] }));
    for (const leaf of result.perLeaf) {
      expect(leaf.vitality).toBeGreaterThanOrEqual(0);
      expect(leaf.vitality).toBeLessThanOrEqual(1);
    }
  });
});
