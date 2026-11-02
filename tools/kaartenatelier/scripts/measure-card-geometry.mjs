/**
 * Meet v3 A-kaart geometrie uit word/document.xml (alleen lezen).
 * Usage: node scripts/measure-card-geometry.mjs <file.docx> ...
 */
import { readFileSync } from "node:fs";
import JSZip from "jszip";

const EMU_PER_TWIP = 635;

function parseXml(path, xml) {
  const pgSz = xml.match(/<w:pgSz[^>]*w:w="(\d+)"[^>]*w:h="(\d+)"/);
  const pgMar = xml.match(
    /<w:pgMar[^>]*w:top="(\d+)"[^>]*w:right="(\d+)"[^>]*w:bottom="(\d+)"[^>]*w:left="(\d+)"[^>]*w:header="(\d+)"[^>]*w:footer="(\d+)"/
  );

  const rows = [...xml.matchAll(/<w:trHeight[^>]*w:val="(\d+)"[^>]*w:hRule="([^"]+)"/gi)].map(
    (m) => ({ val: Number(m[1]), rule: m[2] })
  );

  const trail = xml.match(
    /<w:pPr>[\s\S]*?<w:spacing[^>]*w:line="(\d+)"[^>]*w:lineRule="([^"]+)"[\s\S]*?<\/w:pPr>[\s\S]*?<w:sz[^>]*w:val="(\d+)"/
  );
  const trailSimple = [...xml.matchAll(/<w:spacing[^>]*w:line="(\d+)"[^>]*w:lineRule="([^"]+)"/gi)];
  const lastTrail = trailSimple.at(-1);

  const extent = xml.match(/<wp:extent[^>]*cx="(\d+)"[^>]*cy="(\d+)"/);
  const srcRect = xml.match(/<a:srcRect[^>]*l="(\d+)"[^>]*t="(\d+)"[^>]*r="(\d+)"[^>]*b="(\d+)"/);

  const tcMarBlocks = [...xml.matchAll(/<w:tcMar>([\s\S]*?)<\/w:tcMar>/gi)];
  const pickMar = (block) => {
    const side = (s) => {
      const m = block.match(new RegExp(`<w:${s}[^>]*w:w="(\\d+)"`));
      return m ? Number(m[1]) : null;
    };
    return { top: side("top"), left: side("left"), bottom: side("bottom"), right: side("right") };
  };
  const cellMargins = tcMarBlocks.map((m) => pickMar(m[1]));

  const reflectShd = [...xml.matchAll(/w:fill="([A-F0-9]{6})"/gi)].map((m) => m[1]);
  const reflectRun = xml.match(/Wat zou jij doen[\s\S]*?<w:sz[^>]*w:val="(\d+)"/);
  const reflectColor = xml.match(/Wat zou jij doen[\s\S]*?<w:color[^>]*w:val="([^"]+)"/);

  const sumExact = rows.filter((r) => r.rule === "exact").reduce((s, r) => s + r.val, 0);
  const sumAtLeast = rows.filter((r) => r.rule === "atLeast").reduce((s, r) => s + r.val, 0);
  const sumAllListed = rows.reduce((s, r) => s + r.val, 0);

  const pageH = pgSz ? Number(pgSz[2]) : null;
  const reserveListed = pageH != null ? pageH - sumAllListed : null;

  const white = rows[0]?.val ?? null;
  const photo = rows[1]?.val ?? null;
  const reflect = rows[2]?.val ?? null;
  const photoZone = photo != null && reflect != null ? photo + reflect : null;

  let imageCyTwips = null;
  let imageCxTwips = null;
  if (extent) {
    imageCxTwips = Math.round(Number(extent[1]) / EMU_PER_TWIP);
    imageCyTwips = Math.round(Number(extent[2]) / EMU_PER_TWIP);
  }

  return {
    path,
    page: pgSz ? { w: Number(pgSz[1]), h: Number(pgSz[2]) } : null,
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
    rows,
    trail: lastTrail
      ? { line: Number(lastTrail[1]), lineRule: lastTrail[2], sizeHint: trail?.[3] ? Number(trail[3]) : 2 }
      : null,
    image: extent
      ? {
          cxEmu: Number(extent[1]),
          cyEmu: Number(extent[2]),
          cxTwips: imageCxTwips,
          cyTwips: imageCyTwips,
          cyOverPhotoRowPct: photo ? ((imageCyTwips / photo) * 100).toFixed(2) : null,
        }
      : null,
    srcRect: srcRect
      ? { l: Number(srcRect[1]), t: Number(srcRect[2]), r: Number(srcRect[3]), b: Number(srcRect[4]) }
      : null,
    cellMargins,
    reflectBar: {
      fills: [...new Set(reflectShd)],
      textSize: reflectRun ? Number(reflectRun[1]) : null,
      textColor: reflectColor?.[1] ?? null,
    },
    derived: {
      sumRowHeights: sumAllListed,
      reserveIfRowsFillPage: reserveListed,
      whiteRow: white,
      photoRow: photo,
      reflectRow: reflect,
      photoZone,
      whiteOverU: white && pageH ? ((white / (pageH - (reserveListed ?? 0))) * 100).toFixed(2) : null,
      photoZoneOverU:
        photoZone && pageH && reserveListed != null
          ? ((photoZone / (pageH - reserveListed)) * 100).toFixed(2)
          : null,
      reflectOverPhotoZone: photoZone ? ((reflect / photoZone) * 100).toFixed(2) : null,
      uEstimate: reserveListed != null ? pageH - reserveListed : null,
    },
  };
}

async function measureFile(filePath) {
  const buf = readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  const xml = await zip.file("word/document.xml")?.async("string");
  if (!xml) throw new Error(`No document.xml in ${filePath}`);
  return parseXml(filePath, xml);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Geef minstens één .docx pad.");
  process.exit(1);
}

for (const f of files) {
  const r = await measureFile(f);
  console.log(JSON.stringify(r, null, 2));
  console.log("---");
}
