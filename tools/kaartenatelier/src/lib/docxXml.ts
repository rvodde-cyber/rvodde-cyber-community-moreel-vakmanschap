/** Parse OOXML document.xml for golden tests and structure checks. */

export type DocxLayoutSnapshot = {
  pageWidth: number | null;
  pageHeight: number | null;
  margins: { top: number; right: number; bottom: number; left: number; header: number; footer: number } | null;
  rowHeights: { value: number; rule: string }[];
  fonts: { name: string; size: number; color?: string }[];
  cellMargins: { top?: number; left?: number; bottom?: number; right?: number }[];
  hasAnchor: boolean;
  sectionCount: number;
  trailParagraphBeforeSectPr: boolean;
};

function allMatches(xml: string, re: RegExp): RegExpMatchArray[] {
  return [...xml.matchAll(re)];
}

export function parseDocumentXml(xml: string): DocxLayoutSnapshot {
  const pgSz = xml.match(/<w:pgSz[^>]*w:w="(\d+)"[^>]*w:h="(\d+)"/);
  const pgMar = xml.match(
    /<w:pgMar[^>]*w:top="(\d+)"[^>]*w:right="(\d+)"[^>]*w:bottom="(\d+)"[^>]*w:left="(\d+)"[^>]*w:header="(\d+)"[^>]*w:footer="(\d+)"/
  );

  const rowHeights = allMatches(xml, /<w:trHeight([^/>]*)\/?>/gi)
    .map((m) => {
      const attrs = m[1];
      const valM = attrs.match(/w:val="(\d+)"/i);
      const ruleM = attrs.match(/w:hRule="([^"]+)"/i);
      if (!valM) return null;
      return { value: Number(valM[1]), rule: ruleM?.[1] ?? "atLeast" };
    })
    .filter((r): r is { value: number; rule: string } => r != null);

  const fonts: DocxLayoutSnapshot["fonts"] = [];
  for (const m of allMatches(xml, /<w:rFonts[^>]*w:ascii="([^"]+)"/gi)) {
    const block = xml.slice(m.index ?? 0, (m.index ?? 0) + 400);
    const sizeM = block.match(/<w:sz[^>]*w:val="(\d+)"/);
    const colorM = block.match(/<w:color[^>]*w:val="([^"]+)"/);
    fonts.push({
      name: m[1],
      size: sizeM ? Number(sizeM[1]) : 0,
      color: colorM?.[1],
    });
  }

  const cellMargins: DocxLayoutSnapshot["cellMargins"] = [];
  for (const m of allMatches(xml, /<w:tcMar>([\s\S]*?)<\/w:tcMar>/gi)) {
    const block = m[1];
    const pick = (side: string) => {
      const sm = block.match(new RegExp(`<w:${side}[^>]*w:w="(\\d+)"`));
      return sm ? Number(sm[1]) : undefined;
    };
    cellMargins.push({
      top: pick("top"),
      left: pick("left"),
      bottom: pick("bottom"),
      right: pick("right"),
    });
  }

  const hasAnchor = /wp:anchor/i.test(xml);
  const sectionCount = (xml.match(/<w:sectPr/gi) ?? []).length;

  const bodyEnd = xml.lastIndexOf("</w:body>");
  const bodySlice = bodyEnd >= 0 ? xml.slice(0, bodyEnd) : xml;
  const lastSect = bodySlice.lastIndexOf("<w:sectPr");
  const beforeSect = lastSect >= 0 ? bodySlice.slice(0, lastSect) : bodySlice;
  const trailParagraphBeforeSectPr = /<w:p[^>]*>[\s\S]*<\/w:p>\s*$/.test(beforeSect.trim());

  return {
    pageWidth: pgSz ? Number(pgSz[1]) : null,
    pageHeight: pgSz ? Number(pgSz[2]) : null,
    margins: pgMar
      ? {
          top: Number(pgMar[1]),
          right: Number(pgMar[2]),
          bottom: Number(pgMar[3]),
          left: Number(pgMar[4]),
          header: Number(pgMar[5]),
          footer: Number(pgMar[6]),
        }
      : null,
    rowHeights,
    fonts,
    cellMargins,
    hasAnchor,
    sectionCount,
    trailParagraphBeforeSectPr,
  };
}

export function compareSnapshots(
  ref: DocxLayoutSnapshot,
  gen: DocxLayoutSnapshot,
  opts?: { allowRowHeightDelta?: boolean }
): string[] {
  const diffs: string[] = [];
  if (ref.pageWidth !== gen.pageWidth) diffs.push(`page width ${gen.pageWidth} vs ref ${ref.pageWidth}`);
  if (ref.pageHeight !== gen.pageHeight) diffs.push(`page height ${gen.pageHeight} vs ref ${ref.pageHeight}`);
  if (ref.margins && gen.margins) {
    for (const k of ["top", "right", "bottom", "left", "header", "footer"] as const) {
      if (ref.margins[k] !== gen.margins[k]) {
        diffs.push(`margin ${k} ${gen.margins[k]} vs ref ${ref.margins[k]}`);
      }
    }
  }
  if (ref.hasAnchor !== gen.hasAnchor) diffs.push(`wp:anchor present=${gen.hasAnchor}`);
  if (ref.trailParagraphBeforeSectPr !== gen.trailParagraphBeforeSectPr) {
    diffs.push(`trail w:p before sectPr=${gen.trailParagraphBeforeSectPr}`);
  }

  if (!opts?.allowRowHeightDelta) {
    if (ref.rowHeights.length !== gen.rowHeights.length) {
      diffs.push(`row count ${gen.rowHeights.length} vs ref ${ref.rowHeights.length}`);
    } else {
      ref.rowHeights.forEach((r, i) => {
        const g = gen.rowHeights[i];
        if (r.value !== g.value || r.rule !== g.rule) {
          diffs.push(`row ${i}: ${g.value}/${g.rule} vs ref ${r.value}/${r.rule}`);
        }
      });
    }
  }

  return diffs;
}

export async function readDocxDocumentXml(buffer: ArrayBuffer): Promise<string> {
  const { default: JSZip } = await import("jszip");
  const zip = await JSZip.loadAsync(buffer);
  const file = zip.file("word/document.xml");
  if (!file) throw new Error("word/document.xml ontbreekt");
  return file.async("string");
}

export function countSectionsInDocumentXml(xml: string): number {
  return (xml.match(/<w:sectPr/gi) ?? []).length;
}

export function extractCardContentFromReference(xml: string): {
  titel: string;
  verhaal: string[];
  complexiteit: "micro" | "meso" | "macro";
  sectorFill: string;
} {
  const texts: string[] = [];
  for (const m of xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)) {
    texts.push(m[1]);
  }
  const joined = texts.join("\n");
  const titelLine = texts.find(
    (t) => t.length > 5 && !/MACRO|MESO|MICRO|REFLECT/i.test(t) && texts.indexOf(t) > 3
  );
  const titel = titelLine ?? "Referentie titel";

  const level = /MACRO/i.test(joined) ? "macro" : /MESO/i.test(joined) ? "meso" : "micro";
  const shd = xml.match(/w:fill="([A-F0-9]{6})"/i);
  const sectorFill = shd ? `#${shd[1]}` : "#E0A01A";

  const verhaal = texts.filter(
    (t) =>
      t.length > 20 &&
      t !== titel &&
      !/REFLECT|MACRO|MESO|MICRO|Firefly/i.test(t) &&
      !/^\s*$/.test(t)
  );

  return {
    titel,
    verhaal: verhaal.length ? verhaal.slice(0, 6) : ["Referentie alinea."],
    complexiteit: level,
    sectorFill,
  };
}
