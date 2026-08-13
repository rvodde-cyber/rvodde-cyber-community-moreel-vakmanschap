// Geometrie van het klavertje.
//
// Bewust losgetrokken van de componenten: de levende weergave (Leaf.jsx), de
// niet-geanimeerde printweergave (CloverPrintView.jsx) en de PDF-export gebruiken
// allemaal exact dezelfde vormen. Zo kunnen scherm en papier niet uiteenlopen
// (briefing §8.3).

import { clamp, lerp } from "./colors";

export const CLOVER_VIEWBOX = { width: 320, height: 340 };
export const CLOVER_CENTER = { x: 160, y: 140 };

/** Positie van de vier bladeren rond het midden, met de klok mee vanaf linksboven. */
export const LEAF_ANGLES = [-45, 45, 135, -135];

/** Maximale hoek waarover een blad doorhangt bij volledig verwelkt (§8.1). */
const MAX_DROOP = 23;

// Twee vormvarianten; alles ertussenin wordt geïnterpoleerd op vitaliteit.
// Elk blad bestaat uit vier cubic-bezier-segmenten vanaf het hart van de klaver,
// met een inkeping in de punt zoals een echt klaverblad.
const OPEN_SHAPE = {
  start: [0, 0],
  segments: [
    [-52, -18, -80, -58, -58, -90],
    [-44, -108, -12, -106, 0, -76],
    [12, -106, 44, -108, 58, -90],
    [80, -58, 52, -18, 0, 0],
  ],
};

// Verwelkt: kleiner, smaller en licht asymmetrisch — dat leest als omkrullen.
const CURLED_SHAPE = {
  start: [0, 0],
  segments: [
    [-40, -14, -60, -46, -44, -70],
    [-34, -84, -6, -82, 2, -58],
    [16, -86, 40, -80, 48, -62],
    [64, -42, 44, -14, 0, 0],
  ],
};

/**
 * Het pad van één blad in lokale coördinaten (basis in de oorsprong, punt omhoog).
 * @param {number} v vitaliteit 0–1
 */
export function leafPath(v) {
  const t = clamp(v, 0, 1);
  const start = OPEN_SHAPE.start.map((value, i) => lerp(CURLED_SHAPE.start[i], value, t));
  const segments = OPEN_SHAPE.segments.map((segment, index) =>
    segment.map((value, i) => lerp(CURLED_SHAPE.segments[index][i], value, t))
  );

  const commands = segments.map((s) => `C ${fmt(s[0])} ${fmt(s[1])} ${fmt(s[2])} ${fmt(s[3])} ${fmt(s[4])} ${fmt(s[5])}`);
  return `M ${fmt(start[0])} ${fmt(start[1])} ${commands.join(" ")} Z`;
}

/**
 * Hoe ver dit blad doorhangt. Bladeren zakken van het hart af naar buiten/onder,
 * dus de richting volgt het teken van de plaatsingshoek.
 * @param {number} angle plaatsingshoek van het blad
 * @param {number} v vitaliteit 0–1
 */
export function droopFor(angle, v) {
  return Math.sign(angle) * MAX_DROOP * (1 - clamp(v, 0, 1));
}

/** Verwelkte bladeren trekken zich ook iets samen. */
export function scaleFor(v) {
  return lerp(0.88, 1, clamp(v, 0, 1));
}

/**
 * SVG-transform voor één blad, inclusief doorhangen en krimpen.
 * @param {number} angle
 * @param {number} v
 */
export function leafTransform(angle, v) {
  const rotation = angle + droopFor(angle, v);
  return `translate(${CLOVER_CENTER.x} ${CLOVER_CENTER.y}) rotate(${fmt(rotation)}) scale(${fmt(scaleFor(v))})`;
}

/** De glans-ellips: het 'glasachtige' accent onder ~20° dat vervaagt bij verwelking. */
export const HIGHLIGHT = { cx: -13, cy: -60, rx: 20, ry: 33, rotate: -20 };

/**
 * Punt van het blad in klavertje-coördinaten — gebruikt om het druppel-icoontje
 * en de tooltip-anker te plaatsen.
 * @param {number} angle
 * @param {number} v
 */
export function tipPoint(angle, v) {
  const rotation = ((angle + droopFor(angle, v)) * Math.PI) / 180;
  const distance = 96 * scaleFor(v);
  return {
    x: CLOVER_CENTER.x + Math.sin(rotation) * distance,
    y: CLOVER_CENTER.y - Math.cos(rotation) * distance,
  };
}

/**
 * De steel onder de klaver. Buigt verder door naarmate het geheel er slapper
 * bij staat, zodat het beeld als één plant leest.
 * @param {number} v gemiddelde vitaliteit van de vier bladeren
 */
export function stemPath(v) {
  const t = clamp(v, 0, 1);
  const bend = lerp(26, 6, t);
  const endX = CLOVER_CENTER.x + lerp(14, 2, t);
  const endY = CLOVER_CENTER.y + lerp(140, 158, t);
  return [
    `M ${CLOVER_CENTER.x} ${CLOVER_CENTER.y}`,
    `C ${fmt(CLOVER_CENTER.x + bend)} ${fmt(CLOVER_CENTER.y + 52)}`,
    `${fmt(CLOVER_CENTER.x - bend * 0.6)} ${fmt(CLOVER_CENTER.y + 104)}`,
    `${fmt(endX)} ${fmt(endY)}`,
  ].join(" ");
}

/** Gemiddelde vitaliteit, gebruikt voor de steel. */
export function averageVitality(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function fmt(value) {
  return Math.round(value * 100) / 100;
}
