export type Locale = "nl" | "en";

export const TAAL_STORAGE_KEY = "cmv-taal";

export const strings = {
  nl: {
    pageTitle: "Kaartenatelier",
    intro:
      "Bouw v3-gesprekskaarten uit een kaartpakket en Firefly-foto's. Alles blijft in je browser.",
    langSwitchNl: "NL",
    langSwitchEn: "EN",
    langSwitchAria: "Taal wisselen",
    step1: "1. Pakket laden",
    step2: "2. Controleren",
    step3: "3. Firefly-prompts",
    step4: "4. Foto's",
    step5: "5. Exporteren",
    loadFile: "Kies kaartpakket (.json)",
    loadPaste: "Of plak JSON",
    loadApply: "Valideer pakket",
    blockingErrors: "Blokkerende fouten",
    exceptions: "Uitzonderingen",
    cardsCount: "kaarten",
    spread: "Spreiding micro · meso · macro",
    mesoWarn: "Meso is meer dan 60% — controleer de set.",
    previewLabel: "Voorbeeld; het Word-bestand is leidend.",
    copyPrompt: "Kopiëren",
    promptCount: "van",
    promptsHavePrompt: "kaarten hebben een prompt",
    fireflyHint:
      "Laat afkomst, leeftijd en gender variëren (Nederland is divers), zonder stereotypen, herkenbare personen, logo's of tekst in beeld.",
    dropPhotos: "Sleep foto's (JPG, PNG, WEBP)",
    exportZip: "Download export-ZIP",
    exportNote:
      "Casussen zijn fictief; afbeeldingen zijn met AI gemaakt (Adobe Firefly) — overnemen in eigen publicaties.",
    exportDisclaimer:
      "Definitief na bevestiging in Microsoft Word (1 pagina, bewerkbaar). LibreOffice is niet leidend.",
    subjectInFrame: "Onderwerp in beeld bevestigd",
    sourcesHeading: "Over en bronnen",
    privacyNote:
      "Deze app roept geen AI-diensten aan. Bestanden blijven in je browser; geen tracking. Een mens keurt elke kaart goed vóór export.",
    sourceMeijer:
      "Meijer, K. M. T. (2023). Impossible and inevitable: Reconstructing the critique of business ethics [Proefschrift, Tilburg University]. Ridderprint. https://research.tilburguniversity.edu/en/publications/impossible-and-inevitable-reconstructing-the-critique-of-business/",
    sourceLectoraat:
      "Lectoraat Ethisch Werken. (2026). Centrale begrippenlijst Moreel Vakmanschap: Kwaliteitsstandaard v3.0 [Intern document]. Fontys Hogescholen.",
  },
  en: {
    pageTitle: "Card Atelier",
    intro:
      "Build v3 conversation cards from a card package and Firefly photos. Everything stays in your browser.",
    langSwitchNl: "NL",
    langSwitchEn: "EN",
    langSwitchAria: "Switch language",
    step1: "1. Load package",
    step2: "2. Review",
    step3: "3. Firefly prompts",
    step4: "4. Photos",
    step5: "5. Export",
    loadFile: "Choose card package (.json)",
    loadPaste: "Or paste JSON",
    loadApply: "Validate package",
    blockingErrors: "Blocking errors",
    exceptions: "Exceptions",
    cardsCount: "cards",
    spread: "Spread micro · meso · macro",
    mesoWarn: "Meso is over 60% — review the set.",
    previewLabel: "Preview; the Word file is authoritative.",
    copyPrompt: "Copy",
    promptCount: "of",
    promptsHavePrompt: "cards have a prompt",
    fireflyHint:
      "Vary origin, age and gender in images (the Netherlands is diverse), without stereotypes, recognisable people, logos or text in frame.",
    dropPhotos: "Drop photos (JPG, PNG, WEBP)",
    exportZip: "Download export ZIP",
    exportNote:
      "Cases are fictional; images are AI-made (Adobe Firefly) — reuse in your own publications.",
    exportDisclaimer:
      "Final after confirmation in Microsoft Word (1 page, editable). LibreOffice is not authoritative.",
    subjectInFrame: "Subject in frame confirmed",
    sourcesHeading: "About and sources",
    privacyNote:
      "This app does not call AI services. Files stay in your browser; no tracking. A human approves each card before export.",
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
