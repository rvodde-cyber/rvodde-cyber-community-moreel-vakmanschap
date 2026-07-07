/** Gesprekskaart-strings — NL, EN, DE, SV, CS, DA (Conversation Card Generator v3) */

export const GESPREKSKAART_TALEN = ["nl", "en", "de", "sv", "cs", "da"];

export const gesprekskaartI18n = {
  nl: {
    moeilijkheidLabel: "Complexiteit",
    complexiteitLabels: {
      micro: "★☆☆ Micro — persoonlijke keuze",
      meso: "★★☆ Meso — organisatorisch dilemma",
      macro: "★★★ Macro — systemisch dilemma",
    },
    complexiteitTooltips: {
      micro: "Conflict tussen twee waarden op individueel niveau, gevolgen direct zichtbaar.",
      meso: "Spanning tussen persoonlijke waarden en de regels, cultuur of belangen van een organisatie. Meerdere stakeholders.",
      macro: "Wetgeving, politiek, cultuur en mensenrechten kruisen elkaar. Geen eenduidig antwoord, gevolgen onzeker of onomkeerbaar.",
    },
    complexiteitAttributie:
      'Complexiteitsmodel: Kim Meijer, "Impossible and Inevitable" (Tilburg University)',
    vraag1: "Wat zou jij doen en waarom?",
    vraag2: "Welke waarden zijn hier in het spel?",
  },
  en: {
    moeilijkheidLabel: "Complexity",
    complexiteitLabels: {
      micro: "★☆☆ Micro — direct, personal choice",
      meso: "★★☆ Meso — organisational dilemma",
      macro: "★★★ Macro — systemic dilemma",
    },
    complexiteitTooltips: {
      micro: "Conflict between two values at individual level, consequences immediately visible.",
      meso: "Tension between personal values and the rules, culture or interests of an organisation. Multiple stakeholders.",
      macro: "Legislation, politics, culture and human rights intersect. No clear answer, consequences uncertain or irreversible.",
    },
    complexiteitAttributie:
      'Complexity model: Kim Meijer, "Impossible and Inevitable" (Tilburg University)',
    vraag1: "What would you do, and why?",
    vraag2: "What values are at stake here?",
  },
  de: {
    moeilijkheidLabel: "Komplexität",
    complexiteitLabels: {
      micro: "★☆☆ Micro — persönliche Entscheidung",
      meso: "★★☆ Meso — organisationales Dilemma",
      macro: "★★★ Macro — systemisches Dilemma",
    },
    complexiteitTooltips: {
      micro: "Konflikt zwischen zwei Werten auf individueller Ebene, Folgen unmittelbar sichtbar.",
      meso: "Spannung zwischen persönlichen Werten und den Regeln, der Kultur oder den Interessen einer Organisation. Mehrere Stakeholder.",
      macro: "Gesetzgebung, Politik, Kultur und Menschenrechte überschneiden sich. Keine eindeutige Antwort, Folgen unsicher oder irreversibel.",
    },
    complexiteitAttributie:
      'Komplexitätsmodell: Kim Meijer, „Impossible and Inevitable“ (Tilburg University)',
    vraag1: "Was würdest du tun und warum?",
    vraag2: "Welche Werte stehen hier auf dem Spiel?",
  },
  sv: {
    moeilijkheidLabel: "Komplexitet",
    complexiteitLabels: {
      micro: "★☆☆ Mikro — personligt val",
      meso: "★★☆ Meso — organisatoriskt dilemma",
      macro: "★★★ Makro — systemiskt dilemma",
    },
    complexiteitTooltips: {
      micro: "Konflikt mellan två värden på individnivå, konsekvenser direkt synliga.",
      meso: "Spänning mellan personliga värderingar och organisationens regler, kultur eller intressen. Flera intressenter.",
      macro: "Lagstiftning, politik, kultur och mänskliga rättigheter korsar varandra. Inget entydigt svar, konsekvenser osäkra eller oåterkalleliga.",
    },
    complexiteitAttributie:
      'Komplexitetsmodell: Kim Meijer, ”Impossible and Inevitable” (Tilburg University)',
    vraag1: "Vad skulle du göra och varför?",
    vraag2: "Vilka värderingar är i spel här?",
  },
  cs: {
    moeilijkheidLabel: "Složitost",
    complexiteitLabels: {
      micro: "★☆☆ Mikro — osobní volba",
      meso: "★★☆ Meso — organizační dilema",
      macro: "★★★ Makro — systémové dilema",
    },
    complexiteitTooltips: {
      micro: "Konflikt mezi dvěma hodnotami na individuální úrovni, důsledky okamžitě viditelné.",
      meso: "Napětí mezi osobními hodnotami a pravidly, kulturou nebo zájmy organizace. Více zúčastněných stran.",
      macro: "Právní předpisy, politika, kultura a lidská práva se prolínají. Žádná jednoznačná odpověď, důsledky nejisté nebo nevratné.",
    },
    complexiteitAttributie:
      'Model složitosti: Kim Meijer, „Impossible and Inevitable“ (Tilburg University)',
    vraag1: "Co byste udělali a proč?",
    vraag2: "Jaké hodnoty jsou zde v sázce?",
  },
  da: {
    moeilijkheidLabel: "Kompleksitet",
    complexiteitLabels: {
      micro: "★☆☆ Mikro — personlig valg",
      meso: "★★☆ Meso — organisatorisk dilemma",
      macro: "★★★ Makro — systemisk dilemma",
    },
    complexiteitTooltips: {
      micro: "Konflikt mellem to værdier på individniveau, konsekvenser umiddelbart synlige.",
      meso: "Spænding mellem personlige værdier og organisationens regler, kultur eller interesser. Flere interessenter.",
      macro: "Lovgivning, politik, kultur og menneskerettigheder krydser hinanden. Intet entydigt svar, konsekvenser usikre eller irreversible.",
    },
    complexiteitAttributie:
      'Kompleksitetsmodel: Kim Meijer, "Impossible and Inevitable" (Tilburg University)',
    vraag1: "Hvad ville du gøre, og hvorfor?",
    vraag2: "Hvilke værdier er på spil her?",
  },
};

const FALLBACK_CHAIN = ["en", "nl"];

/** Strings voor complexiteit, tooltips, bronvermelding en vaste vragen */
export function getGesprekskaartStrings(taal) {
  if (gesprekskaartI18n[taal]) return gesprekskaartI18n[taal];
  for (const fb of FALLBACK_CHAIN) {
    if (gesprekskaartI18n[fb]) return gesprekskaartI18n[fb];
  }
  return gesprekskaartI18n.nl;
}
