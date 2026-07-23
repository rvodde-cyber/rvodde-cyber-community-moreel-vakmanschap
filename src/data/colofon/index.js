import colofonNl from "./nl.js";
import colofonEn from "./en.js";

export const colofonByLang = {
  nl: colofonNl,
  en: colofonEn,
};

export const colofonMetaByPath = {
  "/colofon": colofonNl.meta,
  "/colophon": colofonEn.meta,
};

/** Korte ambient-vermeldingen (footer, bibliotheek, gesprekskaarten) */
export const gebruiksNotices = {
  nl: {
    footerVoor: "Vrij te gebruiken voor onderwijs — geen commercieel gebruik. Afbeeldingen gegenereerd met Adobe Firefly. Lees meer in het ",
    footerLink: "colofon",
    footerNa: ".",
    bibliotheekVoor: "Alle werkbladen zijn vrij te gebruiken voor onderwijs — geen commercieel gebruik. Zie het ",
    bibliotheekLink: "colofon",
    bibliotheekNa: " voor de volledige voorwaarden.",
    gesprekskaartenVoor:
      "Alle werkbladen zijn vrij te gebruiken voor onderwijs — geen commercieel gebruik. Zie het ",
    gesprekskaartenLink: "colofon",
    gesprekskaartenNa: " voor de volledige voorwaarden.",
    overLinkLabel: "Colofon — gebruik & beeldverantwoording",
  },
  en: {
    footerVoor: "Free to use for education — no commercial use. Images generated with Adobe Firefly. Read more in the ",
    footerLink: "colophon",
    footerNa: ".",
    bibliotheekVoor: "All worksheets are free to use for education — no commercial use. See the ",
    bibliotheekLink: "colophon",
    bibliotheekNa: " for full terms.",
    gesprekskaartenVoor:
      "All worksheets are free to use for education — no commercial use. See the ",
    gesprekskaartenLink: "colophon",
    gesprekskaartenNa: " for full terms.",
    overLinkLabel: "Colophon — use & image credit",
  },
};

export function getColofonPath(taal) {
  return taal === "nl" ? "/colofon" : "/colophon";
}

export function getColofonContent(taal) {
  return taal === "nl" ? colofonNl : colofonEn;
}

export function getGebruiksNotice(taal) {
  return taal === "nl" ? gebruiksNotices.nl : gebruiksNotices.en;
}
