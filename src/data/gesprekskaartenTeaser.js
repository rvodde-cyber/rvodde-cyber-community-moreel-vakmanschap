import source from "./gesprekskaartenTeaserSource.json";

const VRAGEN = {
  nl: {
    vraag1: "Wat zou jij doen en waarom?",
    vraag2: "Welke waarden zijn hier in het spel?",
  },
  en: {
    vraag1: "What would you do, and why?",
    vraag2: "What values are at stake here?",
  },
};

export const TEASER_DOWNLOADS = {
  nl: {
    href: "/downloads/gesprekskaarten/GK_MM_Teaser_NL.docx",
    filename: "GK_MM_Teaser_NL.docx",
  },
  en: {
    href: "/downloads/gesprekskaarten/GK_MM_Teaser_EN.pdf",
    filename: "GK_MM_Teaser_EN.pdf",
  },
};

function toCards(items, lang) {
  const vragen = VRAGEN[lang];

  return items.map((item, index) => ({
    id: `GK_MM_${String(index + 1).padStart(2, "0")}`,
    categorie: item.category,
    titel: item.title,
    verhaal: item.story,
    vraag1: vragen.vraag1,
    vraag2: vragen.vraag2,
    vraag: item.title,
  }));
}

export const gesprekskaartenTeaser = {
  nl: toCards(source.nl, "nl"),
  en: toCards(source.en, "en"),
};
