export const LICENTIES = {
  "CC BY-NC-SA 4.0": {
    url: {
      nl: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.nl",
      en: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en",
    },
    kort: {
      nl: "Gratis te gebruiken voor niet-commercieel onderwijs, met naamsvermelding en onder dezelfde licentie.",
      en: "Free to use for non-commercial education, with attribution and under the same licence.",
    },
  },
  "CC BY-SA 4.0": {
    url: {
      nl: "https://creativecommons.org/licenses/by-sa/4.0/deed.nl",
      en: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    },
    kort: {
      nl: "Gratis te gebruiken en te bewerken, met naamsvermelding en onder dezelfde licentie.",
      en: "Free to use and adapt, with attribution and under the same licence.",
    },
  },
};

export const STANDAARD_LICENTIE = "CC BY-NC-SA 4.0";

export const LICENTIE = {
  code: STANDAARD_LICENTIE,
  ...LICENTIES[STANDAARD_LICENTIE],
};

export const STANDAARD_NAAMSVERMELDING =
  "Richard Voddé, Lectoraat Ethisch Werken, Fontys Hogescholen";

export function getLicentie(code) {
  return LICENTIES[code] ?? LICENTIES[STANDAARD_LICENTIE];
}
