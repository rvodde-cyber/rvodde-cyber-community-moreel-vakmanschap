import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  telStatussen,
  telPerFase,
  kiesUitgelicht,
  kiezerLinkVoorFase,
} from "./landingWerkbladen.js";
import {
  EMPTY_KIEZER_FILTERS,
  FASE_SLUGS,
  filterWerkvormKiezerItems,
} from "./werkvormenKiezer.js";

const baseItem = {
  filterableFase: true,
  filterableTijd: true,
  filterableGroep: true,
  filterableRegio: true,
  contexten: ["HRM"],
  complexiteiten: ["micro"],
  primaryWerkbladId: "MV_01",
  linkedWerkbladen: [{}],
  hoofdfase: "zien",
  fasen: ["zien"],
  kind: "werkvorm",
};

function item(id, overrides = {}) {
  return { ...baseItem, id, titelDisplay: id, status: "beschikbaar", ...overrides };
}

describe("telStatussen", () => {
  it("matches hand count on a small set", () => {
    const items = [
      { status: "beschikbaar" },
      { status: "beschikbaar" },
      { status: "in_voorbereiding" },
      { status: "externe_methode" },
    ];
    assert.deepEqual(telStatussen(items), {
      beschikbaar: 2,
      in_voorbereiding: 1,
      externe_methode: 1,
    });
  });
});

describe("telPerFase", () => {
  it("matches filterWerkvormKiezerItems per fase", () => {
    const items = [
      item("MW01", { fasen: ["zien", "voelen"], hoofdfase: "zien" }),
      item("MW02", { fasen: ["voelen"], hoofdfase: "voelen", status: "in_voorbereiding" }),
      item("MW03", { fasen: ["zien"], hoofdfase: "zien" }),
    ];
    const perFase = telPerFase(items);
    for (const slug of FASE_SLUGS) {
      const filters = {
        ...EMPTY_KIEZER_FILTERS,
        fasen: [slug],
        status: ["beschikbaar"],
      };
      const expected = filterWerkvormKiezerItems(items, filters).length;
      assert.equal(perFase[slug], expected, slug);
    }
  });
});

describe("kiesUitgelicht", () => {
  const pool = [
    item("MW10", { hoofdfase: "zien", fasen: ["zien"], contexten: ["A"] }),
    item("MW11", { hoofdfase: "zien", fasen: ["zien"], contexten: ["B"] }),
    item("MW20", { hoofdfase: "voelen", fasen: ["voelen"], contexten: ["C"] }),
    item("MW30", { hoofdfase: "wegen", fasen: ["wegen"], contexten: ["D"] }),
    item("MW40", { hoofdfase: "handelen", fasen: ["handelen"], contexten: ["E"] }),
    item("MW50", { hoofdfase: "volhouden", fasen: ["volhouden"], contexten: ["F"] }),
    item("EX01", {
      id: "EX01",
      kind: "standalone_werkblad",
      hoofdfase: "zien",
      fasen: ["zien"],
    }),
    item("MW99", { status: "in_voorbereiding", hoofdfase: "zien", fasen: ["zien"] }),
  ];

  it("is deterministic", () => {
    const a = kiesUitgelicht(pool, { aantal: 5 });
    const b = kiesUitgelicht(pool, { aantal: 5 });
    assert.deepEqual(
      a.map((i) => i.id),
      b.map((i) => i.id),
    );
  });

  it("never returns standalone or unavailable", () => {
    const chosen = kiesUitgelicht(pool, { aantal: 5 });
    for (const i of chosen) {
      assert.equal(i.status, "beschikbaar");
      assert.notEqual(i.kind, "standalone_werkblad");
    }
  });

  it("respects vast and caps at 5 with at most one per phase", () => {
    const chosen = kiesUitgelicht(pool, { aantal: 5, vast: ["MW50", "MW99"] });
    assert.ok(chosen.some((i) => i.id === "MW50"));
    assert.equal(chosen.length, 5);
    const fases = chosen.map((i) => i.hoofdfase);
    assert.equal(new Set(fases).size, fases.length);
  });

  it("returns at most five items", () => {
    assert.ok(kiesUitgelicht(pool, { aantal: 5 }).length <= 5);
  });
});

describe("kiezerLinkVoorFase", () => {
  it("NL with beschikbare items", () => {
    assert.equal(
      kiezerLinkVoorFase("zien", "nl", 3),
      "/bibliotheek/werkbladen?fasen=zien&status=beschikbaar",
    );
  });

  it("EN with beschikbare items", () => {
    assert.equal(
      kiezerLinkVoorFase("wegen", "en", 10),
      "/library/worksheets?fasen=wegen&status=beschikbaar",
    );
  });

  it("omits status when count is zero", () => {
    assert.equal(
      kiezerLinkVoorFase("zien", "nl", 0),
      "/bibliotheek/werkbladen?fasen=zien",
    );
  });
});