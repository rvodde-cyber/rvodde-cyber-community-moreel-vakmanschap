import {
  APPROVED_IMAGE_HEIGHT_TWIPS,
  APPROVED_PHOTO_ROW_EXACT,
  APPROVED_PHOTO_ZONE,
  APPROVED_REFLECT_ROW_EXACT,
  APPROVED_U,
  APPROVED_WHITE_ROW_AT_LEAST,
} from "./cardLayoutApproved";
import { PAGE_WIDTH_TWIPS, RESERVE_TWIPS, STATUS_D } from "./constants";

export type PhotoLayout = {
  u: number;
  whiteRow: number;
  photoZone: number;
  reflectRow: number;
  photoRow: number;
  imageHeight: number;
  aspectRatio: number;
};

/** Layout voor status-A (met foto): goedgekeurde DL15-waarden, geen 45/55-formule. */
export function calculatePhotoLayout(_reserveTwips = RESERVE_TWIPS): PhotoLayout {
  const u = APPROVED_U;
  const whiteRow = APPROVED_WHITE_ROW_AT_LEAST;
  const photoRow = APPROVED_PHOTO_ROW_EXACT;
  const reflectRow = APPROVED_REFLECT_ROW_EXACT;
  const photoZone = APPROVED_PHOTO_ZONE;
  const imageHeight = APPROVED_IMAGE_HEIGHT_TWIPS;
  const aspectRatio = imageHeight > 0 ? PAGE_WIDTH_TWIPS / imageHeight : 0;
  return {
    u,
    whiteRow,
    photoZone,
    reflectRow,
    photoRow,
    imageHeight,
    aspectRatio: Math.round(aspectRatio * 100) / 100,
  };
}

export function calculatePhotoLayoutAspect(_reserveTwips: number): number {
  const { imageHeight } = calculatePhotoLayout();
  return PAGE_WIDTH_TWIPS / imageHeight;
}

export function statusDLayout() {
  return { ...STATUS_D };
}
