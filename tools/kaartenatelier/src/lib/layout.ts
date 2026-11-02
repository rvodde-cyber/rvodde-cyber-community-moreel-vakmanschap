import {
  PAGE_HEIGHT_TWIPS,
  RESERVE_TWIPS,
  STATUS_D,
} from "./constants";

export type PhotoLayout = {
  u: number;
  whiteRow: number;
  photoZone: number;
  reflectRow: number;
  photoRow: number;
  imageHeight: number;
  aspectRatio: number;
};

export function calculatePhotoLayout(
  reserveTwips = RESERVE_TWIPS
): PhotoLayout {
  const u = PAGE_HEIGHT_TWIPS - reserveTwips;
  const whiteRow = Math.round(u * 0.45);
  const photoZone = Math.round(u * 0.55);
  const reflectRow = Math.round(photoZone * 0.18);
  const photoRow = photoZone - reflectRow;
  const imageHeight = Math.round(photoRow * 0.97);
  const aspectRatio = imageHeight > 0 ? 8391 / imageHeight : 0;
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

export function calculatePhotoLayoutAspect(reserveTwips: number): number {
  const { photoRow } = calculatePhotoLayout(reserveTwips);
  const imageHeight = Math.round(photoRow * 0.97);
  return 8391 / imageHeight;
}

export function statusDLayout() {
  return { ...STATUS_D };
}
