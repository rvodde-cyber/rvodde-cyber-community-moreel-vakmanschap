import JSZip from "jszip";
import { collectExportFiles } from "./exportBundle";
import type { KaartPakket } from "./types";

export type ExportPhoto = {
  jpeg: Uint8Array;
  fileName: string;
  confirmed: boolean;
};

export type ExportOptions = {
  pakket: KaartPakket;
  photos: Record<string, ExportPhoto | undefined>;
  cardWarnings: Record<string, string[]>;
  allowAanpassen: Set<string>;
};

export async function buildExportZip(options: ExportOptions): Promise<Blob> {
  const zip = new JSZip();
  const { files } = await collectExportFiles(options);
  for (const f of files) {
    zip.file(f.relativePath, f.data);
  }
  return zip.generateAsync({ type: "blob" });
}

export async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
