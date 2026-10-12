import cards from "./cards.json";
import {
  CATEGORIE_SLUGS,
  MOEILIJKHEID_MIN,
  MOEILIJKHEID_MAX,
  TAALNIVEAUS,
  TEASER_SET,
  getCategorieKleur,
  getCategorieKleurLicht,
  getComplexityKey,
  sortCardSets,
} from "./constants.js";
import { getGesprekskaartStrings } from "./i18n.js";
import { getCardContentLang } from "../vertalingen.js";

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

function resolveCardContent(card, contentLang) {
  const nl = card.nl ?? {};
  const en = card.en ?? {};
  if (contentLang === "en" && en.vertaling === false) {
    return {
      ...en,
      titel: nl.titel,
      verhaal: nl.verhaal,
      vraag1: nl.vraag1,
      vraag2: nl.vraag2,
      vraag3: nl.vraag3,
      vraag4: nl.vraag4,
    };
  }
  return card[contentLang] ?? nl ?? en;
}

export function localizeCard(card, taal) {
  const contentLang = getCardContentLang(taal);
  const content = resolveCardContent(card, contentLang);
  const gk = getGesprekskaartStrings(taal);
  const hideReflectieVragen = Boolean(card.meta?.hideReflectieVragen);
  const nlOnlyEn = card.en?.vertaling === false;

  const kleur = getCategorieKleur(card.categorie);

  return {
    id: card.id,
    set: card.set,
    categorieSlug: card.categorie,
    moeilijkheid: card.moeilijkheid,
    complexiteit:
      card.meta?.complexiteitOnbekend || card.complexiteit === null
        ? null
        : card.complexiteit ?? getComplexityKey(card.moeilijkheid),
    hideComplexity: Boolean(card.meta?.complexiteitOnbekend),
    imageLayout: card.assets?.layout ?? "default",
    afdeling: card.meta?.afdeling ?? null,
    taalniveau: card.taalniveau,
    status: card.status,
    stap: card.stap,
    titel: content.titel,
    verhaal: content.verhaal,
    hideReflectieVragen,
    vraag1: hideReflectieVragen ? null : content.vraag1 ?? gk.vraag1,
    vraag2: hideReflectieVragen ? null : content.vraag2 ?? gk.vraag2,
    vraag3: hideReflectieVragen ? null : content.vraag3 ?? null,
    vraag4: hideReflectieVragen ? null : content.vraag4 ?? null,
    complexiteitLabel: content.complexiteitLabel ?? null,
    rechtvaardiging: content.rechtvaardiging ?? null,
    vraag: content.titel,
    afbeelding: card.assets?.afbeelding ?? null,
    afbeeldingAlt:
      (nlOnlyEn || contentLang === "nl" ? card.assets?.altNl : card.assets?.altEn) ??
      card.assets?.altNl ??
      card.assets?.altEn ??
      null,
    fireflyPrompt: card.assets?.fireflyPrompt ?? null,
    pdfHref: card.assets?.[contentLang === "nl" ? "pdfNl" : "pdfEn"] ?? null,
    woorden: card.meta?.[contentLang === "nl" ? "woordenNl" : "woordenEn"] ?? null,
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
    sets: sortCardSets([...new Set(cardList.map((c) => c.set).filter(Boolean))]),
    categorieen: [...new Set(cardList.map((c) => c.categorie))].sort(),
    moeilijkheden: [...new Set(cardList.map((c) => c.moeilijkheid))].sort(),
    taalniveaus: [...new Set(cardList.map((c) => c.taalniveau))].sort(),
    stappen: [...new Set(cardList.map((c) => c.stap))].sort(),
  };
}
