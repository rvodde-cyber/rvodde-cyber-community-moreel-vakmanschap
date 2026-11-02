export type CropFocus = { x: number; y: number };

const MAX_WIDTH = 2131;

export async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Afbeelding laden mislukt"));
      img.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function cropImageToJpeg(
  img: HTMLImageElement,
  aspect: number,
  focus: CropFocus = { x: 0.5, y: 0.5 },
  quality = 0.9
): { blob: Blob; width: number; height: number; lowRes: boolean } {
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;
  const srcRatio = srcW / srcH;
  let cropW = srcW;
  let cropH = srcH;
  if (srcRatio > aspect) {
    cropW = Math.round(srcH * aspect);
  } else {
    cropH = Math.round(srcW / aspect);
  }
  const maxX = srcW - cropW;
  const maxY = srcH - cropH;
  const sx = Math.round(maxX * focus.x);
  const sy = Math.round(maxY * focus.y);
  let outW = cropW;
  let outH = cropH;
  if (outW > MAX_WIDTH) {
    outH = Math.round((MAX_WIDTH / outW) * outH);
    outW = MAX_WIDTH;
  }
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas niet beschikbaar");
  ctx.drawImage(img, sx, sy, cropW, cropH, 0, 0, outW, outH);
  const lowRes = srcW < 1200;
  const blob = dataUrlToBlob(canvas.toDataURL("image/jpeg", quality));
  return { blob, width: outW, height: outH, lowRes };
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [head, body] = dataUrl.split(",");
  const mime = head.match(/:(.*?);/)?.[1] ?? "image/jpeg";
  const bin = atob(body);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

export async function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
  const buf = await blob.arrayBuffer();
  return new Uint8Array(buf);
}
