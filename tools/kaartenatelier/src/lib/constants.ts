export const SCHEMA_ID = "kaartenatelier/1";

export const PAGE_WIDTH_TWIPS = 8391;
export const PAGE_HEIGHT_TWIPS = 11906;
/** Configureerbaar; onder ~450 ontstaat spookpagina (begrippenlijst noemde 900, praktijk 500). */
export const RESERVE_TWIPS = 500;

export const REFLECTIE_TEKST =
  "Wat zou jij doen en waarom? Welke waarden zijn hier in het spel?";

export const FIREFLY_SUFFIX =
  "Photorealistic, editorial photography style, natural lighting with slight drama, shallow depth of field, real people in authentic settings, no text, no graphics, no illustrations, cinematic composition, suitable for A5 print, portrait orientation 3:4.";

export const FIREFLY_MAX_TOTAL = 1024;
export const FIREFLY_MAX_BODY = 772;

export const BORdeaux = "993556";
export const REFLECT_BAR_FILL = "1F1F1F";
export const STORY_COLOR = "262626";
export const TITLE_COLOR = "1A1A1A";

export const STATUS_D = {
  whiteAtLeast: 6741,
  photoExact: 3200,
  reflectExact: 1964,
} as const;

export const COMPLEXITY_STARS = {
  micro: "★☆☆",
  meso: "★★☆",
  macro: "★★★",
} as const;

export const COMPLEXITY_LABEL_NL = {
  micro: "MICRO — persoonlijk",
  meso: "MESO — organisatorisch",
  macro: "MACRO — systemisch",
} as const;

export const WHITE_CELL_MAR = { top: 260, left: 620, bottom: 60, right: 620 };
export const REFLECT_CELL_MAR = { left: 620, right: 620 };
