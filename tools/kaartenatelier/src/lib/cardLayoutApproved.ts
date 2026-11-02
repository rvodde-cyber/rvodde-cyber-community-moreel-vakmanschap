/**
 * Goedgekeurde v3 A-kaartgeometrie (Richard, Word).
 *
 * Gemeten nov 2026 in word/document.xml op:
 * - DL15 De afgesloten stroom
 * - Management 01. Vijftien jaar trouw dienst
 * - PS01 Drie maanden stilte
 *
 * Rijhoogtes en paginaformaat zijn in alle drie identiek; alleen sectorbadge-kleur
 * en marginale afwijking in wp:extent cy (PS01 +13 twips) verschillen.
 *
 * Feitelijke reserve: PAGE_HEIGHT (11906) − som rijen (11406) = 500 twips (slotalinea).
 */
import { PAGE_HEIGHT_TWIPS, RESERVE_TWIPS } from "./constants";

/** Bruikbare hoogte boven slotalinea (U). */
export const APPROVED_U = PAGE_HEIGHT_TWIPS - RESERVE_TWIPS; // 11406

/** Witzone — w:trHeight atLeast. */
export const APPROVED_WHITE_ROW_AT_LEAST = 4953;

/** Fotovlak — w:trHeight exact. */
export const APPROVED_PHOTO_ROW_EXACT = 5363;

/** Reflectiebalk — w:trHeight exact. */
export const APPROVED_REFLECT_ROW_EXACT = 1090;

/** Fotocollectie (foto + balk). */
export const APPROVED_PHOTO_ZONE =
  APPROVED_PHOTO_ROW_EXACT + APPROVED_REFLECT_ROW_EXACT; // 6453

/** Afbeeldingshoogte uit DL15 wp:extent cy (≈ 97% van fotorij). */
export const APPROVED_IMAGE_HEIGHT_TWIPS = 5202;

/** Verhoudingen (ter controle / documentatie). */
export const APPROVED_RATIOS = {
  whiteOverU: APPROVED_WHITE_ROW_AT_LEAST / APPROVED_U,
  photoZoneOverU: APPROVED_PHOTO_ZONE / APPROVED_U,
  reflectOverPhotoZone: APPROVED_REFLECT_ROW_EXACT / APPROVED_PHOTO_ZONE,
  imageOverPhotoRow: APPROVED_IMAGE_HEIGHT_TWIPS / APPROVED_PHOTO_ROW_EXACT,
} as const;

/**
 * Oude formule (45% / 55% witzone·fotozone, 18% balk in fotozone, 97% beeld in fotorij).
 * Wijkt >1% per rij af t.o.v. goedgekeurde kaarten — alleen nog voor vergelijking in tests/README.
 */
export function legacyFormulaLayout(reserveTwips = RESERVE_TWIPS) {
  const u = PAGE_HEIGHT_TWIPS - reserveTwips;
  const whiteRow = Math.round(u * 0.45);
  const photoZone = Math.round(u * 0.55);
  const reflectRow = Math.round(photoZone * 0.18);
  const photoRow = photoZone - reflectRow;
  const imageHeight = Math.round(photoRow * 0.97);
  return { u, whiteRow, photoZone, reflectRow, photoRow, imageHeight };
}

export function percentDiff(formula: number, approved: number): number {
  return (Math.abs(formula - approved) / approved) * 100;
}
