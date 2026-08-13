import { describe, expect, it } from "vitest";
import { statements } from "../src/config/statements";
import {
  ShareCodeError,
  decodeShareCode,
  encodeShareCode,
  parseShareCodes,
  toPrefix,
} from "../src/lib/shareCode";

/** Antwoorden die er "willekeurig" uitzien maar reproduceerbaar zijn. */
function sampleAnswers(seed = 1) {
  return Object.fromEntries(
    statements.map((statement, index) => [statement.id, ((index * seed + index) % 5) + 1])
  );
}

describe("deel-code", () => {
  it("codeert en decodeert alle antwoorden ongewijzigd", () => {
    const answers = sampleAnswers(3);
    const decoded = decodeShareCode(encodeShareCode(answers, "Van Dijk Techniek"));
    expect(decoded.ok).toBe(true);
    expect(decoded.answers).toEqual(answers);
  });

  it("houdt de code kort genoeg om door te sturen", () => {
    const code = encodeShareCode(sampleAnswers(2), "Acme");
    expect(code.length).toBeLessThanOrEqual(30);
  });

  it("zet de bedrijfsnaam als leesbaar voorvoegsel vooraan", () => {
    const code = encodeShareCode(sampleAnswers(), "Van Dijk Techniek");
    expect(code.startsWith("VANDIJKTECHN-")).toBe(true);
    expect(decodeShareCode(code).prefix).toBe("VANDIJKTECHN");
  });

  it("werkt ook zonder bedrijfsnaam", () => {
    const code = encodeShareCode(sampleAnswers(), "");
    expect(code).not.toContain("-");
    expect(decodeShareCode(code).ok).toBe(true);
  });

  it("bevat geen andere informatie dan de antwoorden", () => {
    // Twee invullers met dezelfde antwoorden en hetzelfde bedrijf leveren een
    // identieke code op: er zit dus niets persoons- of tijdgebondens in.
    const answers = sampleAnswers(4);
    expect(encodeShareCode(answers, "Acme")).toBe(encodeShareCode(answers, "Acme"));
  });

  it("accepteert kleine letters en spaties bij het plakken", () => {
    const code = encodeShareCode(sampleAnswers(2), "Acme");
    const decoded = decodeShareCode(`  ${code.toLowerCase()} `);
    expect(decoded.ok).toBe(true);
    expect(decoded.answers).toEqual(sampleAnswers(2));
  });

  it("accepteert een bedrijfsnaam met een koppelteken", () => {
    const code = encodeShareCode(sampleAnswers(), "Jansen-Pietersen");
    expect(decodeShareCode(code).ok).toBe(true);
  });

  it("weigert een onvolledige scan", () => {
    const partial = { ...sampleAnswers() };
    delete partial[statements[7].id];
    expect(() => encodeShareCode(partial, "Acme")).toThrow();
  });
});

describe("deel-code — foutmeldingen", () => {
  const code = encodeShareCode(sampleAnswers(2), "ACME");

  it("merkt een verkeerde checksum op", () => {
    const body = code.split("-")[1];
    const tampered = `${body.slice(0, -1)}${body.at(-1) === "Z" ? "Y" : "Z"}`;
    expect(decodeShareCode(`ACME-${tampered}`).error).toBe(ShareCodeError.CHECKSUM);
  });

  it("wijst elke aangetaste code af, waar de fout ook zit", () => {
    const body = code.split("-")[1];
    for (let index = 1; index < body.length; index += 1) {
      const replacement = body[index] === "Q" ? "R" : "Q";
      const tampered = `${body.slice(0, index)}${replacement}${body.slice(index + 1)}`;
      expect(decodeShareCode(`ACME-${tampered}`).ok).toBe(false);
    }
  });

  it("merkt een half gekopieerde code op", () => {
    expect(decodeShareCode(code.slice(0, -3)).error).toBe(ShareCodeError.WRONG_LENGTH);
  });

  it("merkt een code uit een andere versie op", () => {
    const body = code.split("-")[1];
    expect(decodeShareCode(`ACME-Z${body.slice(1)}`).error).toBe(ShareCodeError.UNKNOWN_VERSION);
  });

  it("merkt vreemde tekens op", () => {
    expect(decodeShareCode("ACME-A!!!!!!!!!!!!").error).toBe(ShareCodeError.MALFORMED);
  });

  it("meldt een lege regel", () => {
    expect(decodeShareCode("   ").error).toBe(ShareCodeError.EMPTY);
  });
});

describe("plakveld", () => {
  it("leest meerdere codes en houdt het regelnummer vast", () => {
    const first = encodeShareCode(sampleAnswers(1), "Acme");
    const second = encodeShareCode(sampleAnswers(2), "Acme");
    const entries = parseShareCodes(`${first}\n\n${second}\nACME-KAPOT`);

    expect(entries).toHaveLength(3);
    expect(entries[0]).toMatchObject({ line: 1, ok: true });
    expect(entries[1]).toMatchObject({ line: 3, ok: true });
    expect(entries[2]).toMatchObject({ line: 4, ok: false });
  });

  it("laat één foute code de rest niet blokkeren", () => {
    const good = encodeShareCode(sampleAnswers(1), "Acme");
    const entries = parseShareCodes(`onzin\n${good}`);
    expect(entries.filter((entry) => entry.ok)).toHaveLength(1);
  });
});

describe("voorvoegsel", () => {
  it("strip diakrieten, spaties en leestekens", () => {
    expect(toPrefix("Café Zuid & Co")).toBe("CAFEZUIDCO");
  });

  it("blijft kort", () => {
    expect(toPrefix("Een Hele Lange Bedrijfsnaam BV").length).toBeLessThanOrEqual(12);
  });
});
