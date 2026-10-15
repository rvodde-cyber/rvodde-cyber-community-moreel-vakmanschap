/**
 * Zichtbaarheid gesprekskaarten (één bron voor UI, catalogus en sitemap-hulp).
 * Verborgen kaarten blijven in cards.json; `hidden: true` sluit ze uit van de site.
 */

export function isCardHidden(card) {
  return card?.hidden === true;
}

export function filterVisibleCards(cardList) {
  return cardList.filter((card) => !isCardHidden(card));
}

/**
 * Publieke lookup (o.a. toekomstige per-kaart-URL).
 * @returns {{ kind: 'ok'|'redirect'|'not_found', card?: object, redirectTo?: string }}
 */
export function resolvePublicCardById(id, cardList) {
  const card = cardList.find((c) => c.id === id);
  if (!card) {
    return { kind: "not_found" };
  }
  if (!isCardHidden(card)) {
    return { kind: "ok", card };
  }
  const replaceId = card.meta?.vervangtDoor;
  if (replaceId) {
    const replacement = cardList.find((c) => c.id === replaceId && !isCardHidden(c));
    if (replacement) {
      return { kind: "redirect", card: replacement, redirectTo: replaceId };
    }
  }
  return { kind: "not_found" };
}

import { CARD_SET_ALIASES } from "./constants.js";

/** Set-URLs voor sitemap (geen per-kaart-routes op de site). */
export function getGesprekskaartenSitemapPaths(visibleCards) {
  const paths = ["/gesprekskaarten", "/conversation-cards"];
  const sets = new Set(visibleCards.map((c) => c.set).filter(Boolean));
  for (const set of sets) {
    paths.push(`/gesprekskaarten?set=${encodeURIComponent(set)}`);
    paths.push(`/conversation-cards?set=${encodeURIComponent(set)}`);
  }
  for (const legacySet of Object.keys(CARD_SET_ALIASES)) {
    paths.push(`/gesprekskaarten?set=${encodeURIComponent(legacySet)}`);
    paths.push(`/conversation-cards?set=${encodeURIComponent(legacySet)}`);
  }
  return paths;
}
