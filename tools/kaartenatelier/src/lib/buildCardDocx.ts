import {
  AlignmentType,
  BorderStyle,
  Document,
  HeightRule,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import {
  BORdeaux,
  COMPLEXITY_LABEL_NL,
  COMPLEXITY_STARS,
  PAGE_WIDTH_TWIPS,
  REFLECT_BAR_FILL,
  REFLECTIE_TEKST,
  STORY_COLOR,
  TITLE_COLOR,
  WHITE_CELL_MAR,
  REFLECT_CELL_MAR,
  STATUS_D,
  FIREFLY_SUFFIX,
} from "./constants";
import { calculatePhotoLayout } from "./layout";
import { composeFireflyPrompt } from "./schema";
import type { KaartPakket, KaartPakketKaart } from "./types";

function sectorFill(hex: string): string {
  return hex.replace("#", "").toUpperCase();
}

function storyParagraphs(paragraphs: string[]): Paragraph[] {
  return paragraphs.map(
    (text) =>
      new Paragraph({
        spacing: { after: 100, line: 300, lineRule: "atLeast" },
        children: [
          new TextRun({
            text,
            font: "Calibri",
            size: 21,
            color: STORY_COLOR,
          }),
        ],
      })
  );
}

function sectorBadge(sectorName: string, color: string): Paragraph {
  return new Paragraph({
    spacing: { after: 90 },
    children: [
      new TextRun({
        text: `  ${sectorName.toUpperCase()}  `,
        bold: true,
        font: "Calibri",
        size: 16,
        color: "FFFFFF",
        shading: { fill: sectorFill(color), type: ShadingType.CLEAR },
      }),
    ],
  });
}

function complexityBadge(level: KaartPakketKaart["complexiteit"]): Paragraph {
  const stars = COMPLEXITY_STARS[level];
  const label = COMPLEXITY_LABEL_NL[level];
  return new Paragraph({
    spacing: { after: 150 },
    indent: { left: 100 },
    border: {
      left: { color: BORdeaux, size: 18, space: 6, style: BorderStyle.SINGLE },
    },
    children: [
      new TextRun({
        text: `${stars}  `,
        font: "Calibri",
        size: 18,
        color: BORdeaux,
      }),
      new TextRun({
        text: label,
        bold: true,
        font: "Calibri",
        size: 16,
        color: BORdeaux,
      }),
    ],
  });
}

function titleParagraph(title: string): Paragraph {
  return new Paragraph({
    spacing: { after: 140 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: "Calibri",
        size: 32,
        color: TITLE_COLOR,
      }),
    ],
  });
}

function reflectBarParagraph(): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: REFLECTIE_TEKST,
        bold: true,
        font: "Calibri",
        size: 22,
        color: "FFFFFF",
      }),
    ],
  });
}

function trailParagraph(): Paragraph {
  return new Paragraph({
    spacing: { before: 0, after: 0, line: 100, lineRule: "exact" },
    children: [new TextRun({ text: "", size: 2 })],
  });
}

function margins(m: { top?: number; left?: number; bottom?: number; right?: number }) {
  return {
    top: m.top ?? 0,
    left: m.left ?? 0,
    bottom: m.bottom ?? 0,
    right: m.right ?? 0,
  };
}

export async function buildCardDocx(
  pakket: KaartPakket,
  card: KaartPakketKaart,
  imageJpeg?: Uint8Array
): Promise<Blob> {
  const sectorColor = pakket.categorie.sector_kleur;
  const sectorName = pakket.categorie.naam_nl;
  const hasImage = Boolean(imageJpeg?.length);
  const layout = hasImage ? calculatePhotoLayout() : null;

  const whiteChildren: Paragraph[] = [
    sectorBadge(sectorName, sectorColor),
    complexityBadge(card.complexiteit),
    titleParagraph(card.titel_nl),
    ...storyParagraphs(card.verhaal_nl),
  ];

  let photoCellChildren: Paragraph[] = [];
  if (hasImage && imageJpeg && layout) {
    photoCellChildren = [
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          new ImageRun({
            data: imageJpeg,
            transformation: {
              width: 532,
              height: Math.round(532 / (8391 / layout.imageHeight)),
            },
            type: "jpg",
          }),
        ],
      }),
    ];
  } else if (!hasImage) {
    photoCellChildren = [
      new Paragraph({
        children: [
          new TextRun({
            text: "[ Firefly-afbeelding ]",
            italics: true,
            color: "999999",
            size: 20,
          }),
        ],
      }),
    ];
  }

  const reflectCell = new TableCell({
    width: { size: PAGE_WIDTH_TWIPS, type: WidthType.DXA },
    shading: { fill: REFLECT_BAR_FILL, type: ShadingType.CLEAR },
    margins: margins({ left: REFLECT_CELL_MAR.left, right: REFLECT_CELL_MAR.right }),
    verticalAlign: VerticalAlign.CENTER,
    children: [reflectBarParagraph()],
  });

  const rows: TableRow[] = [];

  if (hasImage && layout) {
    rows.push(
      new TableRow({
        height: { value: layout.whiteRow, rule: HeightRule.AT_LEAST },
        children: [
          new TableCell({
            width: { size: PAGE_WIDTH_TWIPS, type: WidthType.DXA },
            margins: margins(WHITE_CELL_MAR),
            children: whiteChildren,
          }),
        ],
      }),
      new TableRow({
        height: { value: layout.photoRow, rule: HeightRule.EXACT },
        children: [
          new TableCell({
            width: { size: PAGE_WIDTH_TWIPS, type: WidthType.DXA },
            margins: margins({ top: 0, left: 0, bottom: 0, right: 0 }),
            verticalAlign: VerticalAlign.BOTTOM,
            children: photoCellChildren,
          }),
        ],
      }),
      new TableRow({
        height: { value: layout.reflectRow, rule: HeightRule.EXACT },
        children: [reflectCell],
      })
    );
  } else {
    rows.push(
      new TableRow({
        height: { value: STATUS_D.whiteAtLeast, rule: HeightRule.AT_LEAST },
        children: [
          new TableCell({
            width: { size: PAGE_WIDTH_TWIPS, type: WidthType.DXA },
            margins: margins(WHITE_CELL_MAR),
            children: whiteChildren,
          }),
        ],
      }),
      new TableRow({
        height: { value: STATUS_D.photoExact, rule: HeightRule.EXACT },
        children: [
          new TableCell({
            width: { size: PAGE_WIDTH_TWIPS, type: WidthType.DXA },
            margins: margins({ top: 0, left: 0, bottom: 0, right: 0 }),
            children: photoCellChildren,
          }),
        ],
      }),
      new TableRow({
        height: { value: STATUS_D.reflectExact, rule: HeightRule.EXACT },
        children: [reflectCell],
      })
    );
  }

  const table = new Table({
    width: { size: PAGE_WIDTH_TWIPS, type: WidthType.DXA },
    columnWidths: [PAGE_WIDTH_TWIPS],
    rows,
  });

  const sections: { properties: object; children: (Table | Paragraph)[] }[] = [
    {
      properties: {
        page: {
          size: { width: PAGE_WIDTH_TWIPS, height: 11906, orientation: "portrait" },
          margin: { top: 0, right: 0, bottom: 0, left: 0, header: 0, footer: 0, gutter: 0 },
        },
      },
      children: [table, trailParagraph()],
    },
  ];

  if (!hasImage) {
    const prompt = composeFireflyPrompt(card.firefly_prompt_en);
    sections.push({
      properties: {
        page: {
          size: { width: PAGE_WIDTH_TWIPS, height: 11906, orientation: "portrait" },
          margin: { top: 720, right: 720, bottom: 720, left: 720 },
        },
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "Firefly-prompt",
              bold: true,
              color: BORdeaux,
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: prompt,
              italics: true,
              color: "5F5E5A",
              size: 18,
            }),
          ],
        }),
      ],
    });
  }

  const doc = new Document({ sections: sections as never });
  const buffer = await Packer.toBlob(doc);
  return buffer;
}

export async function buildCardDocxBuffer(
  pakket: KaartPakket,
  card: KaartPakketKaart,
  imageJpeg?: Uint8Array
): Promise<ArrayBuffer> {
  const blob = await buildCardDocx(pakket, card, imageJpeg);
  return blob.arrayBuffer();
}

export { FIREFLY_SUFFIX };
