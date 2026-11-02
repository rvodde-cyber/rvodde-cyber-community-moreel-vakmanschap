import { buildCardDocx } from "./buildCardDocx";
import {
  buildFireflyPromptsDocx,
  buildPromptlijstDocx,
  fireflyPromptsFilename,
  promptlijstFilename,
} from "./buildPromptDocx";
import { buildQualityReport, buildSiteJsonFragment } from "./siteJson";
import type { KaartPakket } from "./types";
import type { ExportOptions } from "./exportZip";

export type ExportFile = {
  /** Path relative to export root, use / for subdirs */
  relativePath: string;
  data: Blob;
};

export type CardExportPlan = {
  nummer: string;
  skipped: boolean;
  skipReason?: string;
  hasPhoto: boolean;
  statusA: boolean;
};

export async function collectExportFiles(
  options: ExportOptions
): Promise<{ files: ExportFile[]; reportRows: Parameters<typeof buildQualityReport>[1]; plans: CardExportPlan[] }> {
  const { pakket } = options;
  const files: ExportFile[] = [];
  const imagePaths: Record<string, string> = {};
  const reportRows: Parameters<typeof buildQualityReport>[1] = [];
  const plans: CardExportPlan[] = [];

  for (const card of pakket.kaarten) {
    const photo = options.photos[card.nummer];
    const status = card.foto_status ?? "wacht";
    if (status === "aanpassen" && !options.allowAanpassen.has(card.nummer)) {
      plans.push({ nummer: card.nummer, skipped: true, skipReason: "aanpassen", hasPhoto: false, statusA: false });
      reportRows.push({
        nummer: card.nummer,
        warnings: [...(options.cardWarnings[card.nummer] ?? []), "Overgeslagen (foto_status aanpassen)."],
        fotoStatus: status,
        hasPhoto: false,
      });
      continue;
    }
    const hasPhoto = Boolean(photo?.jpeg?.length && photo.confirmed);
    const statusA = hasPhoto;
    plans.push({ nummer: card.nummer, skipped: false, hasPhoto, statusA });
    if (hasPhoto && photo) {
      imagePaths[card.nummer] = photo.fileName;
      files.push({
        relativePath: `afbeeldingen/${photo.fileName}`,
        data: new Blob([new Uint8Array(photo.jpeg)]),
      });
    }
    const docBlob = await buildCardDocx(pakket, card, hasPhoto ? photo!.jpeg : undefined);
    files.push({ relativePath: card.bestandsnaam, data: docBlob });
    reportRows.push({
      nummer: card.nummer,
      warnings: options.cardWarnings[card.nummer] ?? [],
      fotoStatus: status,
      hasPhoto,
    });
  }

  const site = buildSiteJsonFragment(pakket, imagePaths);
  files.push({
    relativePath: site.fileName,
    data: new Blob([JSON.stringify({ meta: site.meta, cards: site.cards }, null, 2)], {
      type: "application/json",
    }),
  });

  const slug = pakket.categorie.naam_nl.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
  files.push({
    relativePath: `kwaliteitsrapport_${slug}.md`,
    data: new Blob([buildQualityReport(pakket, reportRows)], { type: "text/markdown" }),
  });

  files.push({
    relativePath: fireflyPromptsFilename(pakket),
    data: await buildFireflyPromptsDocx(pakket),
  });
  files.push({
    relativePath: promptlijstFilename(pakket),
    data: await buildPromptlijstDocx(pakket),
  });

  return { files, reportRows, plans };
}
