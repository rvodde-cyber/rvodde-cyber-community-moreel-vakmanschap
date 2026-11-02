export type Locale = "nl" | "en";

export const TAAL_STORAGE_KEY = "cmv-taal";

export const strings = {
  nl: {
    pageTitle: "Kaartenatelier",
    intro:
      "Bouw v3-gesprekskaarten uit een kaartpakket en Firefly-foto's. Alles blijft in je browser.",
    comingSoon: "Volledige versie volgt",
    langSwitchNl: "NL",
    langSwitchEn: "EN",
    langSwitchAria: "Taal wisselen",
    sourcesHeading: "Over en bronnen",
    sourceMeijer:
      "Meijer, K. M. T. (2023). Impossible and inevitable: Reconstructing the critique of business ethics [Proefschrift, Tilburg University]. Ridderprint. https://research.tilburguniversity.edu/en/publications/impossible-and-inevitable-reconstructing-the-critique-of-business/",
    sourceLectoraat:
      "Lectoraat Ethisch Werken. (2026). Centrale begrippenlijst Moreel Vakmanschap: Kwaliteitsstandaard v3.0 [Intern document]. Fontys Hogescholen.",
  },
  en: {
    pageTitle: "Card Atelier",
    intro:
      "Build v3 conversation cards from a card package and Firefly photos. Everything stays in your browser.",
    comingSoon: "Full version coming soon",
    langSwitchNl: "NL",
    langSwitchEn: "EN",
    langSwitchAria: "Switch language",
    sourcesHeading: "About and sources",
    sourceMeijer:
      "Meijer, K. M. T. (2023). Impossible and inevitable: Reconstructing the critique of business ethics [Doctoral dissertation, Tilburg University]. Ridderprint. https://research.tilburguniversity.edu/en/publications/impossible-and-inevitable-reconstructing-the-critique-of-business/",
    sourceLectoraat:
      "Lectoraat Ethisch Werken. (2026). Centrale begrippenlijst Moreel Vakmanschap: Kwaliteitsstandaard v3.0 [Internal document]. Fontys University of Applied Sciences.",
  },
} as const;

export function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(TAAL_STORAGE_KEY);
    if (stored === "en" || stored === "nl") return stored;
  } catch {
    /* privacy mode */
  }
  return "nl";
}

export function storeLocale(locale: Locale): void {
  try {
    localStorage.setItem(TAAL_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}
