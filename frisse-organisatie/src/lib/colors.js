// Kleurmanipulatie voor de bladeren.
//
// De drie visuele toestanden uit briefing §8.1 (vitaal → dorstig → verwelkt)
// worden niet als drie losse kleuren gedefinieerd maar continu geïnterpoleerd:
// hoe lager de vitaliteit, hoe minder verzadiging en hoe verder de tint richting
// bruin schuift.

// De tint waar een blad naartoe verkleurt als het verwelkt: een warm grijsbruin.
// Bewust mengen in RGB en niet de tint over de kleurencirkel draaien — bij die
// laatste aanpak schuift indigo via violet en oogt een dorstig blad juist
// kleuriger dan een gezond blad.
const WITHERED = "#8A7360";

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
  // Bij t = 1 blijft de bladkleur volledig zichzelf; bij t = 0 is hij grotendeels
  // opgegaan in het grijsbruin.
  const base = mixHex(baseHex, WITHERED, (1 - t) * 0.82);
  const { h, s, l } = hexToHsl(base);

  return {
    highlight: hslToHex({ h, s: s * 0.8, l: Math.min(0.9, l + 0.17) }),
    base,
    shade: hslToHex({ h, s: s * 1.02, l: Math.max(0.16, l - 0.14) }),
    outline: hslToHex({ h, s: s * 0.9, l: Math.max(0.12, l - 0.24) }),
  };
}

/** Mengt twee kleuren in RGB. */
export function mixHex(from, to, amount) {
  const t = clamp(amount, 0, 1);
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const channel = (x, y) => Math.round(lerp(x, y, t)).toString(16).padStart(2, "0");
  return `#${channel(a.r, b.r)}${channel(a.g, b.g)}${channel(a.b, b.b)}`;
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
  // Vaste sporten in helderheid; de vier bladeren blijven daardoor ook in
  // grijstinten uit elkaar te houden.
  const ladder = [0.37, 0.5, 0.61, 0.72];
  const { base } = leafPalette(baseHex, v);
  const hsl = hexToHsl(base);
  const target = ladder[index % ladder.length];
  return hslToHex({
    // Op papier is minder verzadiging prettiger, en het houdt de bladeren
    // onderling in dezelfde toonzetting.
    h: hsl.h,
    // Verzadiging volgt de vitaliteit stevig, zodat een blad dat aandacht
    // vraagt op papier nooit kleuriger oogt dan een blad dat er goed bij staat.
    s: Math.min(hsl.s, 0.5) * (0.55 + 0.45 * clamp(v, 0, 1)),
    // Verwelkte bladeren worden iets donkerder, niet lichter: anders verdwijnt
    // juist het blad dat de aandacht moet trekken.
    l: target - (1 - clamp(v, 0, 1)) * 0.05,
  });
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
