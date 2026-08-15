import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Result from "../src/screens/Result";
import { statements } from "../src/config/statements";
import { buildResult } from "../src/lib/scoring";
import { encodeShareCode } from "../src/lib/shareCode";

const answers = Object.fromEntries(statements.map((statement, i) => [statement.id, (i % 5) + 1]));
const result = buildResult(answers);
const shareCode = encodeShareCode(answers, "Acme Bouw");

function render(props) {
  return renderToStaticMarkup(<Result result={result} companyName="Acme Bouw" {...props} />);
}

describe("individueel resultaat", () => {
  const html = render({ variant: "individual", shareCode });

  it("is als individueel gelabeld", () => {
    expect(html).toContain("Individueel resultaat");
    expect(html).not.toContain("Teamresultaat —");
  });

  it("toont de deel-code", () => {
    expect(html).toContain("Uw deel-code");
    expect(html).toContain(shareCode);
  });
});

describe("teamresultaat", () => {
  const html = render({ variant: "team", participantCount: 6 });

  it("is als teamresultaat gelabeld en noemt het aantal invullers", () => {
    expect(html).toContain("Teamresultaat");
    expect(html).toContain("Gemiddelde over 6 invullingen");
  });

  it("toont geen deel-code — die hoort alleen bij een eigen invulling", () => {
    expect(html).not.toContain("Uw deel-code");
  });

  it("gebruikt enkelvoud bij één invuller", () => {
    expect(render({ variant: "team", participantCount: 1 })).toContain("Gemiddelde over 1 invulling.");
  });
});

describe("beide varianten", () => {
  it("tonen dezelfde conclusie en dezelfde disclaimer", () => {
    const individueel = render({ variant: "individual", shareCode });
    const team = render({ variant: "team", participantCount: 4 });
    for (const html of [individueel, team]) {
      expect(textOf(html)).toContain(result.conclusion.title);
      expect(textOf(html)).toContain("geen diagnose");
    }
  });

  it("noemen nergens een score, alleen een kwalitatieve duiding", () => {
    const text = textOf(render({ variant: "team", participantCount: 4 }));
    for (const leaf of result.perLeaf) {
      expect(text).toContain(leaf.qualitative);
    }
    // Een score als "3,2" of "3.2" mag nergens opduiken; het aantal invullers
    // is het enige getal dat op de pagina hoort te staan.
    expect(text).not.toMatch(/\d[.,]\d/);
  });
});

/** Zichtbare tekst van de gerenderde pagina, zonder markup. */
function textOf(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
}
