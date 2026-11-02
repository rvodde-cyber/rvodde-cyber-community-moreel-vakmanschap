import JSZip from "jszip";
import { buildCardDocx } from "./buildCardDocx";
import { buildQualityReport, buildSiteJsonFragment } from "./siteJson";
import type { KaartPakket, KaartPakketKaart } from "./types";

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
  const imagePaths: Record<string, string> = {};
  const reportRows: {
    nummer: string;
    warnings: string[];
    fotoStatus: string;
    hasPhoto: boolean;
  }[] = [];

  for (const card of options.pakket.kaarten) {
    const photo = options.photos[card.nummer];
    const status = card.foto_status ?? "wacht";
    if (status === "aanpassen" && !options.allowAanpassen.has(card.nummer)) {
      reportRows.push({
        nummer: card.nummer,
        warnings: [...(options.cardWarnings[card.nummer] ?? []), "Overgeslagen (foto_status aanpassen)."],
        fotoStatus: status,
        hasPhoto: false,
      });
      continue;
    }
    const hasPhoto = Boolean(photo?.jpeg?.length && photo.confirmed);
    if (hasPhoto && photo) {
      imagePaths[card.nummer] = photo.fileName;
      zip.file(`afbeeldingen/${photo.fileName}`, photo.jpeg);
    }
    const docBlob = await buildCardDocx(
      options.pakket,
      card,
      hasPhoto ? photo!.jpeg : undefined
    );
    zip.file(card.bestandsnaam, docBlob);
    reportRows.push({
      nummer: card.nummer,
      warnings: options.cardWarnings[card.nummer] ?? [],
      fotoStatus: status,
      hasPhoto,
    });
  }

  const site = buildSiteJsonFragment(options.pakket, imagePaths);
  zip.file(site.fileName, JSON.stringify({ meta: site.meta, cards: site.cards }, null, 2));
  zip.file(
    `kwaliteitsrapport_${slugify(options.pakket.categorie.naam_nl)}.md`,
    buildQualityReport(options.pakket, reportRows)
  );

  return zip.generateAsync({ type: "blob" });
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

export async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
