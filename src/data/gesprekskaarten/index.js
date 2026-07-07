import cards from "./cards.json";
import {
  CATEGORIE_SLUGS,
  MOEILIJKHEID_MIN,
  MOEILIJKHEID_MAX,
  TAALNIVEAUS,
  TEASER_SET,
  STANDARD_VRAGEN,
  getCategorieKleur,
  getCategorieKleurLicht,
  getComplexityKey,
} from "./constants.js";

export { CATEGORIE_SLUGS, MOEILIJKHEID_MIN, MOEILIJKHEID_MAX, TAALNIVEAUS, TEASER_SET };

export const TEASER_DOWNLOADS = TEASER_SET.downloads;

export function getAllCards() {
  return cards;
}

export function getCardById(id) {
  return cards.find((card) => card.id === id) ?? null;
}

/** Later: fetch(`/data/gesprekskaarten/${id}.json`) */
export async function loadCardById(id) {
  return getCardById(id);
}

export function localizeCard(card, taal) {
  const content = card[taal] ?? card.nl;
  const vragen = STANDARD_VRAGEN[taal] ?? STANDARD_VRAGEN.nl;

  const kleur = getCategorieKleur(card.categorie);

  return {
    id: card.id,
    set: card.set,
    categorieSlug: card.categorie,
    moeilijkheid: card.moeilijkheid,
    complexiteit: card.complexiteit ?? getComplexityKey(card.moeilijkheid),
    taalniveau: card.taalniveau,
    status: card.status,
    stap: card.stap,
    titel: content.titel,
    verhaal: content.verhaal,
    vraag1: content.vraag1 ?? vragen.vraag1,
    vraag2: content.vraag2 ?? vragen.vraag2,
    vraag: content.titel,
    afbeelding: card.assets?.afbeelding ?? null,
    fireflyPrompt: card.assets?.fireflyPrompt ?? null,
    pdfHref: card.assets?.[taal === "nl" ? "pdfNl" : "pdfEn"] ?? null,
    woorden: card.meta?.[taal === "nl" ? "woordenNl" : "woordenEn"] ?? null,
    kleur,
    kleurLicht: getCategorieKleurLicht(kleur),
  };
}

export function localizeCards(taal, cardList = cards) {
  return cardList.map((card) => localizeCard(card, taal));
}

export function filterCards(cardList, filters = {}) {
  const { categorie, moeilijkheid, taalniveau, stap, set, zoek, taal = "nl" } = filters;
  const q = zoek?.trim().toLowerCase();

  return cardList.filter((card) => {
    if (set && card.set !== set) return false;
    if (stap && card.stap !== Number(stap)) return false;
    if (categorie && card.categorie !== categorie) return false;
    if (moeilijkheid && card.moeilijkheid !== Number(moeilijkheid)) return false;
    if (taalniveau && card.taalniveau !== taalniveau) return false;

    if (q) {
      const localized = localizeCard(card, taal);
      const haystack = [localized.titel, localized.verhaal, card.categorie].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function getFilterOptions(cardList = cards) {
  return {
    categorieen: [...new Set(cardList.map((c) => c.categorie))].sort(),
    moeilijkheden: [...new Set(cardList.map((c) => c.moeilijkheid))].sort(),
    taalniveaus: [...new Set(cardList.map((c) => c.taalniveau))].sort(),
    stappen: [...new Set(cardList.map((c) => c.stap))].sort(),
  };
}
