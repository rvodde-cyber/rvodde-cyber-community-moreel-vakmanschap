import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  deriveWerkvormStatus,
  extractMwFromWerkbladCode,
  filterWerkvormKiezerItems,
  matchesGroupFilter,
  matchesTimeFilter,
  normalizeMwId,
  parseMwNumericId,
  sortWerkvormKiezerItems,
  EMPTY_KIEZER_FILTERS,
} from "./werkvormenKiezer.js";
import { filtersFromSearchParams, filtersToSearchParams } from "./werkvormenKiezerUrl.js";

describe("parseMwNumericId", () => {
  it("sorts MW100 after MW99", () => {
    assert.equal(parseMwNumericId("MW99"), 99);
    assert.equal(parseMwNumericId("MW100"), 100);
    const ids = ["MW100", "MW02", "MW99"].sort(
      (a, b) => parseMwNumericId(a) - parseMwNumericId(b),
    );
    assert.deepEqual(ids, ["MW02", "MW99", "MW100"]);
  });
});

describe("normalizeMwId", () => {
  it("pads low ids", () => {
    assert.equal(normalizeMwId("MW1"), "MW01");
    assert.equal(normalizeMwId("MW128"), "MW128");
  });
});

describe("extractMwFromWerkbladCode", () => {
  it("accepts 2 and 3 digit mw codes", () => {
    assert.equal(extractMwFromWerkbladCode("WB-MW01-HRM-NL"), "MW01");
    assert.equal(extractMwFromWerkbladCode("WB-MW100-ZORG-NL"), "MW100");
  });
});

describe("deriveWerkvormStatus", () => {
  it("label C is externe methode", () => {
    assert.equal(deriveWerkvormStatus({ label: "C" }, 0), "externe_methode");
    assert.equal(deriveWerkvormStatus({ label: "C" }, 2), "externe_methode");
  });
  it("linked werkblad is beschikbaar", () => {
    assert.equal(deriveWerkvormStatus({ label: "A" }, 1), "beschikbaar");
  });
  it("A/B without werkblad is in voorbereiding", () => {
    assert.equal(deriveWerkvormStatus({ label: "B" }, 0), "in_voorbereiding");
  });
});

describe("matchesTimeFilter", () => {
  it("overlap with duration range", () => {
    const duur = { min: 30, max: 60, type: "eenmalig" };
    assert.equal(matchesTimeFilter(duur, ["20_45"]), true);
    assert.equal(matchesTimeFilter(duur, ["tot_20"]), false);
  });
  it("variabel only without filter", () => {
    const duur = { min: null, max: null, type: "variabel" };
    assert.equal(matchesTimeFilter(duur, []), true);
    assert.equal(matchesTimeFilter(duur, ["20_45"]), false);
  });
  it("meerdere sessies maps to last block", () => {
    const duur = { type: "meerdere sessies", min: null, max: null };
    assert.equal(matchesTimeFilter(duur, ["meerdere_doorlopend"]), true);
    assert.equal(matchesTimeFilter(duur, ["tot_20"]), false);
  });
});

describe("matchesGroupFilter", () => {
  it("null groep only without filter", () => {
    assert.equal(matchesGroupFilter({ min: null, max: null }, []), true);
    assert.equal(matchesGroupFilter({ min: null, max: null }, ["1_5"]), false);
  });
});

describe("filterWerkvormKiezerItems", () => {
  const items = [
    {
      id: "MW01",
      status: "beschikbaar",
      fasen: ["zien"],
      duur: { min: 15, max: 15, type: "eenmalig" },
      groep: { min: 4, max: 8 },
      niveaus: ["HBO"],
      regio: "europa",
      contexten: ["HRM"],
      complexiteiten: ["micro"],
      titelNl: "Alpha",
      titelEn: "",
      herkomst: "NL",
      beschrijvingNl: "test",
      beschrijvingEn: "",
      titelDisplay: "Alpha",
    },
    {
      id: "MW02",
      status: "externe_methode",
      fasen: ["wegen"],
      duur: { type: "doorlopend" },
      groep: { min: 10, max: 20 },
      niveaus: ["WO"],
      regio: "azie",
      contexten: [],
      complexiteiten: [],
      titelNl: "Beta",
      titelEn: "",
      herkomst: "Japan",
      beschrijvingNl: "",
      beschrijvingEn: "",
      titelDisplay: "Beta",
    },
  ];

  it("filters by status and fase", () => {
    const f = { ...EMPTY_KIEZER_FILTERS, fasen: ["zien"] };
    assert.equal(filterWerkvormKiezerItems(items, f).length, 1);
  });

  it("context filter only beschikbaar", () => {
    const f = { ...EMPTY_KIEZER_FILTERS, context: ["HRM"] };
    assert.equal(filterWerkvormKiezerItems(items, f).length, 1);
    const f2 = { ...EMPTY_KIEZER_FILTERS, context: ["HRM"], status: ["externe_methode"] };
    assert.equal(filterWerkvormKiezerItems(items, f2).length, 0);
  });
});

describe("URL roundtrip", () => {
  it("preserves filter state", () => {
    const filters = {
      ...EMPTY_KIEZER_FILTERS,
      fasen: ["zien", "wegen"],
      tijd: ["20_45"],
      status: ["beschikbaar", "in_voorbereiding"],
      zoek: "loyal",
      sort: "titel",
    };
    const params = filtersToSearchParams(filters, ["europa", "azie"]);
    const back = filtersFromSearchParams(params, ["europa", "azie"]);
    assert.deepEqual(back.fasen.sort(), filters.fasen.sort());
    assert.deepEqual(back.tijd, filters.tijd);
    assert.deepEqual(back.status.sort(), filters.status.sort());
    assert.equal(back.zoek, filters.zoek);
    assert.equal(back.sort, filters.sort);
  });
});

describe("sortWerkvormKiezerItems", () => {
  it("sorts by numeric id", () => {
    const items = [{ id: "MW100", titelDisplay: "z", duur: {} }, { id: "MW02", titelDisplay: "a", duur: {} }];
    const sorted = sortWerkvormKiezerItems(items, "id");
    assert.equal(sorted[0].id, "MW02");
    assert.equal(sorted[1].id, "MW100");
  });
});
