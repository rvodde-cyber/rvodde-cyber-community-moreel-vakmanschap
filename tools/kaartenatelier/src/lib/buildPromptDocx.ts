import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType } from "docx";
import { composeFireflyPrompt } from "./schema";
import type { KaartPakket } from "./types";

const FIREFLY_SETTINGS =
  "Adobe Firefly: 3:4, Photo, Editorial/Documentary. Geen tekst, logo's of herkenbare personen in beeld.";

const BEELD_RICHTLIJNEN =
  "Varieer afkomst, leeftijd en gender (Nederland is divers), zonder stereotypen. Geen tekst, logo's of herkenbare echte personen.";

const WERKWIJZE =
  "Kies per kaart het beste van de varianten. Bewaar met de bestandsnaam van Firefly of hernoem naar het kaartnummer.";

function heading(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text, bold: true, font: "Calibri", size: 28, color: "0F6E56" })],
  });
}

function body(text: string, opts?: { italic?: boolean; size?: number }): Paragraph {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text,
        font: "Calibri",
        size: opts?.size ?? 22,
        italics: opts?.italic,
        color: "262626",
      }),
    ],
  });
}

function categorieSlug(naam: string): string {
  return naam.toUpperCase().replace(/\s+/g, "_");
}

export async function buildFireflyPromptsDocx(pakket: KaartPakket): Promise<Blob> {
  const date = pakket.batch?.aangemaakt ?? new Date().toISOString().slice(0, 10);
  const children: Paragraph[] = [
    heading(`Firefly-prompts — ${pakket.categorie.naam_nl}`),
    body(`Datum: ${date}`),
    body(FIREFLY_SETTINGS),
    body(""),
  ];

  for (const card of pakket.kaarten) {
    const prompt = composeFireflyPrompt(card.firefly_prompt_en);
    children.push(
      body(`${card.nummer} — ${card.titel_nl}`, { size: 24 }),
      body(prompt, { italic: true, size: 20 })
    );
  }

  if (pakket.uitzonderingen?.length) {
    children.push(body("Uitzonderingen", { size: 24 }));
    for (const u of pakket.uitzonderingen) {
      children.push(body(`${u.nummer}: ${u.reden}`));
    }
  }

  return packA4(children);
}

export async function buildPromptlijstDocx(pakket: KaartPakket): Promise<Blob> {
  const batchId = pakket.batch?.id ?? "batch";
  const beeldmaker = pakket.batch?.beeldmaker ?? "—";
  const date = pakket.batch?.aangemaakt ?? new Date().toISOString().slice(0, 10);

  const intro: Paragraph[] = [
    heading(`Promptlijst — ${pakket.categorie.naam_nl}`),
    body(`Batch: ${batchId} · Datum: ${date} · Beeldmaker: ${beeldmaker}`),
    body(FIREFLY_SETTINGS),
    body(`Aantal beelden: ${pakket.kaarten.length}`),
    body(WERKWIJZE),
    body(BEELD_RICHTLIJNEN),
  ];

  const rows: TableRow[] = [
    new TableRow({
      children: ["", "Nr", "Titel", "Prompt (samengesteld)", "Gekozen bestand"].map(
        (h) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: h, bold: true, font: "Calibri", size: 20 })],
              }),
            ],
          })
      ),
    }),
  ];

  for (const card of pakket.kaarten) {
    const prompt = composeFireflyPrompt(card.firefly_prompt_en);
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "☐", font: "Calibri", size: 22 })],
              }),
            ],
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: card.nummer, font: "Calibri" })] })],
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [new TextRun({ text: card.titel_nl, font: "Calibri" })] }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: prompt, font: "Calibri", size: 18 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: card.foto_bestand?.trim() || "________________",
                    font: "Calibri",
                    color: "5F5E5A",
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838, orientation: "portrait" },
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: [...intro, new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } })],
      },
    ],
  });
  return Packer.toBlob(doc);
}

async function packA4(paragraphs: Paragraph[]): Promise<Blob> {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838, orientation: "portrait" },
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: paragraphs,
      },
    ],
  });
  return Packer.toBlob(doc);
}

export function fireflyPromptsFilename(pakket: KaartPakket): string {
  return `Firefly_prompts_${categorieSlug(pakket.categorie.naam_nl)}.docx`;
}

export function promptlijstFilename(pakket: KaartPakket): string {
  const batchId = (pakket.batch?.id ?? "batch").replace(/[^\w-]+/g, "_");
  return `Promptlijst_${categorieSlug(pakket.categorie.naam_nl)}_${batchId}.docx`;
}

export function buildPlainPromptListText(pakket: KaartPakket): string {
  return pakket.kaarten
    .map((c, i) => {
      const prompt = composeFireflyPrompt(c.firefly_prompt_en);
      return `${i + 1}. ${c.nummer} — ${c.titel_nl}\n${prompt}\n`;
    })
    .join("\n");
}
