/**
 * Voegt 52 Praktijkschok HRM-kaarten toe uit _import/Cursor_HRM_52.
 * Run: node scripts/import-hrm-52.mjs
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { normalizeCard, wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const PACK_DIR = path.join(root, "_import/Cursor_HRM_52");
const SOURCE_JSON = path.join(PACK_DIR, "cards_hrm_52.json");
const SOURCE_IMAGES = path.join(PACK_DIR, "images");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const destImages = path.join(root, "public/images/gesprekskaarten");
const metaPath = path.join(root, "src/data/gesprekskaarten/praktijkschok-hrm-meta.json");

const EXISTING_HRM_IDS = new Set([
  "hrm-ps01",
  "hrm-ps08",
  "hrm-ps12",
  "hrm-ps13",
  "hrm-ps14",
  "hrm-ps18",
  "hrm-ps31",
  "hrm-ps39",
  "hrm-ps43",
  "hrm-ps44",
  "hrm-ps53",
  "hrm-ps54",
  "hrm-ps58",
  "hrm-ps66",
  "hrm-ps69",
]);

function splitReflection(text) {
  const t = (text || "").trim();
  const q1Match = t.match(/^(.+?\?)\s*(.+)$/);
  if (q1Match) {
    return { vraag1: q1Match[1].trim(), vraag2: q1Match[2].trim() };
  }
  return { vraag1: t, vraag2: null };
}

function altFromImagePath(imageRel) {
  const base = path.basename(imageRel, ".jpg");
  const slug = base.replace(/^PS\d+-/i, "").replace(/-/g, " ");
  return {
    nl: `Anonieme werksituatie: ${slug}`,
    en: `Anonymous workplace scene: ${slug}`,
  };
}

function optimizeImage(srcFile, destFile) {
  const py = spawnSync(
    "python",
    [path.join(__dirname, "optimize-hrm-jpeg.py"), srcFile, destFile, "1400"],
    { encoding: "utf8" }
  );
  if (py.status !== 0) {
    console.error(py.stderr || py.stdout);
    throw new Error(`Optimalisatie mislukt: ${srcFile}`);
  }
}

function toCommunityCard(entry) {
  const verhaalNl = entry.story.nl.join("\n\n");
  const verhaalEn = entry.story.en.join("\n\n");
  const refNl = splitReflection(entry.reflection.nl);
  const refEn = splitReflection(entry.reflection.en);
  const imageName = path.basename(entry.image);
  const srcFile = path.join(SOURCE_IMAGES, imageName);
  const destFile = path.join(destImages, imageName);

  if (!fs.existsSync(srcFile)) {
    throw new Error(`Afbeelding ontbreekt: ${srcFile}`);
  }
  optimizeImage(srcFile, destFile);

  const alt = altFromImagePath(entry.image);

  return normalizeCard({
    id: entry.id,
    set: "praktijkschok-hrm",
    stap: 3,
    categorie: "hrm",
    complexiteit: entry.complexity.level,
    taalniveau: "B2",
    status: "aanbevolen",
    nl: {
      titel: entry.title.nl,
      verhaal: verhaalNl,
      vraag1: refNl.vraag1,
      vraag2: refNl.vraag2,
      complexiteitLabel: entry.complexity.label.nl,
      rechtvaardiging: entry.complexity.justification.nl,
    },
    en: {
      titel: entry.title.en,
      verhaal: verhaalEn,
      vraag1: refEn.vraag1,
      vraag2: refEn.vraag2,
      complexiteitLabel: entry.complexity.label.en,
      rechtvaardiging: entry.complexity.justification.en,
    },
    assets: {
      afbeelding: `/images/gesprekskaarten/${imageName}`,
      altNl: alt.nl,
      altEn: alt.en,
      fireflyPrompt: null,
      pdfNl: null,
      pdfEn: null,
    },
    meta: {
      woordenNl: wordCount(verhaalNl),
      woordenEn: wordCount(verhaalEn),
      bron: "Praktijkschok HRM — aanvulling website (52 kaarten)",
      kaartNummer: entry.number,
      sectorColor: entry.sector.sector_color,
      categorieEn: "HR",
      tekstVersie: "3.0",
      afbeeldingStatus: "v3",
      project: "Lectoraat Ethisch Werken",
    },
  });
}

function main() {
  if (!fs.existsSync(SOURCE_JSON)) {
    console.error(`Bron niet gevonden: ${SOURCE_JSON}`);
    process.exit(1);
  }

  const pack = JSON.parse(fs.readFileSync(SOURCE_JSON, "utf8"));
  const existing = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
  const existingIds = new Set(existing.map((c) => c.id));
  const existingTitles = new Set(existing.map((c) => (c.nl?.titel || "").toLowerCase()));

  const conflicts = [];
  for (const entry of pack.cards) {
    if (EXISTING_HRM_IDS.has(entry.id) || existingIds.has(entry.id)) {
      conflicts.push({ id: entry.id, reason: "id bestaat al" });
    }
    if (existingTitles.has((entry.title.nl || "").toLowerCase())) {
      conflicts.push({ id: entry.id, reason: "titel NL bestaat al" });
    }
  }
  if (conflicts.length) {
    console.error("Conflicten — import afgebroken:");
    for (const c of conflicts) console.error(`  ${c.id}: ${c.reason}`);
    process.exit(1);
  }

  const newCards = pack.cards.map(toCommunityCard);
  const merged = [...existing, ...newCards];
  fs.writeFileSync(cardsPath, JSON.stringify(merged, null, 2) + "\n", "utf8");

  const meta = {
    complexityNote: pack.meta.complexity_note,
    setDescription: pack.meta.set_description,
  };
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");

  const spread = merged
    .filter((c) => c.categorie === "hrm")
    .reduce((acc, c) => {
      acc[c.complexiteit] = (acc[c.complexiteit] || 0) + 1;
      return acc;
    }, {});

  console.log(`Toegevoegd: ${newCards.length} kaarten`);
  console.log(`Totaal cards.json: ${merged.length}`);
  console.log("HRM spreiding:", spread);
}

main();
