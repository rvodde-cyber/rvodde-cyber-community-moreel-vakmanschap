/**
 * Interactieve terugkoppel-pijlen voor het Model Moreel Vakmanschap.
 * Gebaseerd op `terugkoppelmomenten.js` (zes feedback-arcs).
 * Volhouden → Zien is de hoofd-terugkoppeling (extra duidelijke stippellijn).
 */

import { terugkoppelmomenten } from "./terugkoppelmomenten";

export const STAP_KLEUREN = {
  zien: "#185fa5",
  voelen: "#854f0b",
  wegen: "#993556",
  handelen: "#0f6e56",
  volhouden: "#993c1d",
};

/** Voorwaartse cycluspijlen (structureel, niet interactief). Volhouden→Zien zit bij feedback. */
export const voorwaartsePijlen = [
  "M 206 78 A 120 120 0 0 1 278 132",
  "M 298 168 A 120 120 0 0 1 260 258",
  "M 228 292 A 120 120 0 0 1 132 292",
  "M 62 258 A 120 120 0 0 1 82 132",
];

/**
 * SVG-paden voor de zes feedback-arcs (binnenring / terugkoppelrichting).
 * Keys matchen `terugkoppelmomenten[].id`.
 */
const FEEDBACK_PATHS = {
  "voelen-zien": "M 255 138 A 92 92 0 0 0 198 92",
  "wegen-voelen": "M 252 248 A 92 92 0 0 0 278 168",
  "wegen-zien": "M 228 248 A 105 105 0 0 0 195 95",
  "handelen-wegen": "M 140 278 A 88 88 0 0 1 218 278",
  "volhouden-handelen": "M 82 168 A 92 92 0 0 1 108 252",
  "volhouden-zien": "M 95 115 A 128 128 0 0 1 162 70",
};

/**
 * @typedef {Object} InteractievePijl
 * @property {string} id
 * @property {string} van
 * @property {string} naar
 * @property {string} labelNL
 * @property {string} labelEN
 * @property {string} path
 * @property {boolean} dashed
 * @property {number} strokeWidth
 * @property {number} opacity
 * @property {boolean} [isHoofdTerugkoppeling]
 */

/** @type {InteractievePijl[]} */
export const interactievePijlen = terugkoppelmomenten.map((moment) => {
  const isHoofd = moment.id === "volhouden-zien";
  const labelNL = moment.labelNL ?? moment.vraagNL;
  const labelEN = moment.labelEN ?? moment.vraagEN;

  return {
    id: moment.id,
    van: moment.van,
    naar: moment.naar,
    labelNL,
    labelEN,
    path: FEEDBACK_PATHS[moment.id],
    dashed: true,
    strokeWidth: isHoofd ? 3.5 : moment.boog === "ruim" ? 2.6 : 2.4,
    // Iets sterker dan de datawaarden zodat alle zes arcs zichtbaar blijven
    opacity: isHoofd ? 0.95 : moment.boog === "ruim" ? 0.55 : 0.65,
    isHoofdTerugkoppeling: isHoofd,
  };
});
