// Kleurmanipulatie voor de bladeren.
//
// De drie visuele toestanden uit briefing §8.1 (vitaal → dorstig → verwelkt)
// worden niet als drie losse kleuren gedefinieerd maar continu geïnterpoleerd:
// hoe lager de vitaliteit, hoe minder verzadiging en hoe verder de tint richting
// bruin schuift.

const BROWN_HUE = 30;

/** @typedef {{h: number, s: number, l: number}} Hsl */

/** @param {string} hex @returns {Hsl} */
export function hexToHsl(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) return { h: 0, s: 0, l };

  const s = delta / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === r) h = 60 * (((g - b) / delta) % 6);
  else if (max === g) h = 60 * ((b - r) / delta + 2);
  else h = 60 * ((r - g) / delta + 4);

  return { h: (h + 360) % 360, s, l };
}

/** @param {Hsl} hsl @returns {string} hex */
export function hslToHex({ h, s, l }) {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s, 0, 1);
  const lig = clamp(l, 0, 1);

  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lig - c / 2;

  const [r, g, b] = hueSegment(hue, c, x);
  return `#${[r, g, b].map((v) => toHexByte(v + m)).join("")}`;
}

/** @param {string} hex @returns {{r: number, g: number, b: number}} 0–255 */
export function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/** Waargenomen helderheid 0–1 — gebruikt om zwart-witprints leesbaar te houden. */
export function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/**
 * De kleurenset van één blad bij een bepaalde vitaliteit.
 * @param {string} baseHex basiskleur van het blad
 * @param {number} v 0 (verwelkt) – 1 (vitaal)
 */
export function leafPalette(baseHex, v) {
  const t = clamp(v, 0, 1);
  const base = hexToHsl(baseHex);

  // Verzadiging: bij volledig verwelkt houden we ~40% over (§8.1: ~60% eraf).
  const s = base.s * (0.4 + 0.6 * t);
  // Tint schuift richting bruin naarmate het blad verwelkt.
  const h = lerpHue(base.h, BROWN_HUE, (1 - t) * 0.55);
  // Verwelkte bladeren worden iets doffer en donkerder.
  const l = base.l + (0.44 - base.l) * (1 - t) * 0.55;

  const mid = { h, s, l };
  return {
    highlight: hslToHex({ h, s: s * 0.7, l: Math.min(0.94, l + 0.26) }),
    base: hslToHex({ ...mid, s }),
    shade: hslToHex({ h, s: s * 1.02, l: Math.max(0.16, l - 0.14) }),
    outline: hslToHex({ h, s: s * 0.9, l: Math.max(0.12, l - 0.24) }),
  };
}

/**
 * Printvariant van een bladkleur: dezelfde tint, maar met een vaste
 * helderheidsladder zodat de vier bladeren ook in grijstinten uit elkaar te
 * houden zijn (briefing §8.3, printkwaliteit).
 *
 * @param {string} baseHex
 * @param {number} index positie van het blad (0–3)
 * @param {number} v vitaliteit 0–1
 */
export function printLeafColor(baseHex, index, v) {
  const ladder = [0.42, 0.54, 0.66, 0.78];
  const { base } = leafPalette(baseHex, v);
  const hsl = hexToHsl(base);
  const target = ladder[index % ladder.length];
  // Verwelkte bladeren mogen ook op papier iets valer zijn, maar blijven binnen
  // hun eigen sport van de ladder zodat de vier onderling verschillend blijven.
  return hslToHex({ h: hsl.h, s: hsl.s, l: target + (1 - v) * 0.06 });
}

export function withAlpha(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Interpoleert tinten via de kortste weg over de kleurencirkel. */
function lerpHue(from, to, t) {
  const diff = ((to - from + 540) % 360) - 180;
  return (from + diff * t + 360) % 360;
}

function hueSegment(hue, c, x) {
  if (hue < 60) return [c, x, 0];
  if (hue < 120) return [x, c, 0];
  if (hue < 180) return [0, c, x];
  if (hue < 240) return [0, x, c];
  if (hue < 300) return [x, 0, c];
  return [c, 0, x];
}

function toHexByte(value) {
  return Math.round(clamp(value, 0, 1) * 255)
    .toString(16)
    .padStart(2, "0");
}
