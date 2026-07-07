/**
 * Gedeelde logica voor import-/normaliseerscripts (Node).
 * Houd in sync met src/data/gesprekskaarten/constants.js
 */

export const MOEILIJKHEID_TO_COMPLEXITY = {
  1: "micro",
  2: "meso",
  3: "macro",
};

export const COMPLEXITY_TO_MOEILIJKHEID = {
  micro: 1,
  meso: 2,
  macro: 3,
};

export const FIREFLY_STYLE_SUFFIX =
  "Photorealistic, editorial photography style, natural lighting with slight drama, shallow depth of field, real people in authentic settings, no text, no graphics, no illustrations, cinematic composition, suitable for A5 print, portrait orientation 3:4, bottom 20% slightly dark or uncluttered for text overlay.";

export function normalizeComplexity(value) {
  const v = String(value || "micro").toLowerCase();
  return ["micro", "meso", "macro"].includes(v) ? v : "micro";
}

export function getComplexityKey(moeilijkheid) {
  return MOEILIJKHEID_TO_COMPLEXITY[Number(moeilijkheid)] ?? "micro";
}

export function getMoeilijkheidFromComplexity(complexity) {
  return COMPLEXITY_TO_MOEILIJKHEID[normalizeComplexity(complexity)] ?? 1;
}

export function buildFireflyPrompt(imagePrompt) {
  if (!imagePrompt?.trim()) return null;
  return `${imagePrompt.trim()}. ${FIREFLY_STYLE_SUFFIX}`;
}

export function wordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Zorg dat elke kaart moeilijkheid én complexiteit heeft (consistent) */
export function normalizeCard(card) {
  const out = { ...card };

  if (out.complexiteit) {
    out.complexiteit = normalizeComplexity(out.complexiteit);
    out.moeilijkheid = getMoeilijkheidFromComplexity(out.complexiteit);
  } else if (out.moeilijkheid != null) {
    out.moeilijkheid = Math.max(1, Math.min(3, Number(out.moeilijkheid) || 2));
    out.complexiteit = getComplexityKey(out.moeilijkheid);
  } else {
    out.moeilijkheid = 2;
    out.complexiteit = "meso";
  }

  if (out.assets?.fireflyPrompt) {
    out.assets = {
      ...out.assets,
      fireflyPrompt: buildFireflyPrompt(out.assets.fireflyPrompt) ?? out.assets.fireflyPrompt,
    };
  }

  return out;
}

/** Ethos Studio JSON → cards.json entry */
export function ethosCardToCommunityCard(ethos, meta = {}) {
  const {
    id,
    set = "ethos-import",
    categorie = "algemeen",
    stap = 4,
    taalniveau = "B2",
    status = "concept",
    lang = "nl",
  } = meta;

  if (!id) throw new Error("id is verplicht (--id GK_XXX)");

  const complexity = normalizeComplexity(ethos.complexity);
  const moeilijkheid = getMoeilijkheidFromComplexity(complexity);
  const firefly = buildFireflyPrompt(ethos.image_prompt);

  const content = {
    titel: ethos.title ?? "",
    verhaal: (ethos.story ?? "").replace(/\s+/g, " ").trim(),
    vraag1: null,
    vraag2: null,
  };

  const card = {
    id,
    set,
    stap: Number(stap),
    categorie,
    moeilijkheid,
    complexiteit: complexity,
    taalniveau,
    status,
    nl: lang === "nl" ? content : { titel: "", verhaal: "" },
    en: lang === "en" ? content : { titel: "", verhaal: "" },
    assets: {
      afbeelding: null,
      fireflyPrompt: firefly,
      pdfNl: null,
      pdfEn: null,
    },
    meta: {
      woordenNl: lang === "nl" ? wordCount(content.verhaal) : 0,
      woordenEn: lang === "en" ? wordCount(content.verhaal) : 0,
      bron: "ethos-studio",
      facilitatorTip: ethos.facilitator_tip ?? null,
      waarden: Array.isArray(ethos.values) ? ethos.values : [],
      closingQuestion: ethos.closing_question ?? null,
    },
  };

  return normalizeCard(card);
}
