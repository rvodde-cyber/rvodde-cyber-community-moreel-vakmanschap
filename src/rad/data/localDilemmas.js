import cards from "../../data/gesprekskaarten/cards.json";
import { CATEGORY_VALUE_HINTS } from "../radConstants.js";

/**
 * Lokale fallback-dataset. De bestaande gesprekskaarten worden gemapt naar
 * de `DilemmaCard`-vorm, zodat het spel volledig speelbaar is zonder backend.
 *
 * DilemmaCard = {
 *   id, titel, categorie, scenario, vraag, moeilijkheid, waarden, opties
 * }
 */
function toDilemma(card, index) {
  const nl = card.nl ?? {};
  const en = card.en ?? {};
  const waarden = CATEGORY_VALUE_HINTS[card.categorie] ?? [];

  return {
    id: index + 1,
    sourceId: card.id,
    categorie: card.categorie,
    moeilijkheid: card.moeilijkheid,
    waarden,
    opties: [],
    // Content per taal, zodat de UI kan wisselen zonder herladen.
    nl: {
      titel: nl.titel ?? "",
      scenario: nl.verhaal ?? "",
      vraag: nl.vraag1 ?? "Wat zou jij doen en waarom?",
    },
    en: {
      titel: en.titel ?? nl.titel ?? "",
      scenario: en.verhaal ?? nl.verhaal ?? "",
      vraag: en.vraag1 ?? "What would you do, and why?",
    },
    // Platte velden op basis van NL (voldoen aan de DilemmaCard-interface).
    titel: nl.titel ?? "",
    scenario: nl.verhaal ?? "",
    vraag: nl.vraag1 ?? "Wat zou jij doen en waarom?",
  };
}

export const LOCAL_DILEMMAS = cards.map(toDilemma);

export function getLocalDilemmas() {
  return LOCAL_DILEMMAS;
}
