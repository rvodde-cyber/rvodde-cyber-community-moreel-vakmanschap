/**
 * Import v3-pakket (Burgerschap, Bestuurskunde, Onderwijs) + optionele opruiming oude kaarten.
 * Usage: node scripts/import-sector-v3.mjs burgerschap|bestuurskunde|onderwijs [--skip-cleanup] [--cleanup-only]
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { normalizeCard, wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const destImages = path.join(root, "public/images/gesprekskaarten");
const pubRoot = path.join(root, "public");

const PACK_CONFIG = {
  burgerschap: {
    packDir: "Cursor_Burgerschap",
    jsonFile: "cards_bg.json",
    categorie: "burgerschap",
    set: "burgerschap",
    metaPath: path.join(root, "src/data/gesprekskaarten/burgerschap-meta.json"),
    bron: "Burgerschap — v3 website (15 kaarten)",
    cleanupIds: (id) => /^GK_BG_\d+$/.test(id),
  },
  bestuurskunde: {
    packDir: "Cursor_Bestuurskunde",
    jsonFile: "cards_bk.json",
    categorie: "bestuurskunde",
    set: "bestuurskunde",
    metaPath: path.join(root, "src/data/gesprekskaarten/bestuurskunde-meta.json"),
    bron: "Bestuurskunde — v3 website (15 kaarten)",
    cleanupIds: () => false,
  },
  onderwijs: {
    packDir: "Cursor_Onderwijs",
    jsonFile: "cards_ow.json",
    categorie: "onderwijs",
    set: "onderwijs-v3",
    stap: 1,
    status: "getest",
    categorieEn: "EDUCATION",
    metaPath: path.join(root, "src/data/gesprekskaarten/onderwijs-meta.json"),
    bron: "Onderwijs — v3 website (12 kaarten)",
    cleanupIds: (id) => /^GK_OW_\d{2}$/.test(id),
  },
};

function splitReflection(text) {
  const t = (text || "").trim();
  const q1Match = t.match(/^(.+?\?)\s*(.+)$/);
  if (q1Match) {
    return { vraag1: q1Match[1].trim(), vraag2: q1Match[2].trim() };
  }
  return { vraag1: t, vraag2: null };
}

function altFromImagePath(imageRel) {
  const base = path.basename(imageRel, path.extname(imageRel));
  const slug = base
    .replace(/^(bg|bk|ow)-\d+-/i, "")
    .replace(/^(bg|bk|ow)-\d+$/i, "scene")
    .replace(/-/g, " ");
  const label = slug === "scene" ? base.replace(/-/g, " ") : slug;
  return {
    nl: `Anonieme situatie: ${label}`,
    en: `Anonymous scene: ${label}`,
  };
}

function altFromTitle(entry) {
  return {
    nl: `Onderwijssituatie: ${entry.title.nl}`,
    en: `Education scene: ${entry.title.en}`,
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

function toCommunityCard(entry, config) {
  const verhaalNl = entry.story.nl.join("\n\n");
  const verhaalEn = entry.story.en.join("\n\n");
  const refNl = splitReflection(entry.reflection.nl);
  const refEn = splitReflection(entry.reflection.en);
  const imageName = path.basename(entry.image);
  const srcFile = path.join(
    root,
    "_import",
    config.packDir,
    path.dirname(entry.image) === "." ? "" : path.dirname(entry.image),
    imageName
  );
  const srcFileAlt = path.join(root, "_import", config.packDir, "images", imageName);
  const resolvedSrc = fs.existsSync(srcFile) ? srcFile : srcFileAlt;
  const destFile = path.join(destImages, imageName);

  if (!fs.existsSync(resolvedSrc)) {
    throw new Error(`Afbeelding ontbreekt: ${resolvedSrc}`);
  }
  optimizeImage(resolvedSrc, destFile);

  const alt =
    config.categorie === "onderwijs" ? altFromTitle(entry) : altFromImagePath(entry.image);

  return normalizeCard({
    id: entry.id,
    set: config.set,
    stap: config.stap ?? 3,
    categorie: config.categorie,
    complexiteit: entry.complexity.level,
    taalniveau: "B2",
    status: config.status ?? "aanbevolen",
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
      bron: config.bron,
      kaartNummer: entry.number,
      sectorColor: entry.sector.sector_color,
      categorieEn: config.categorieEn ?? entry.sector.en,
      tekstVersie: "3.0",
      afbeeldingStatus: "v3",
      project: "Lectoraat Ethisch Werken",
    },
  });
}

function removeOrphanImages(removedCards, remainingCards) {
  const stillUsed = new Set(
    remainingCards.map((c) => c.assets?.afbeelding).filter(Boolean)
  );
  for (const card of removedCards) {
    const img = card.assets?.afbeelding;
    if (!img || stillUsed.has(img)) continue;
    const filePath = path.join(pubRoot, img.replace(/^\//, ""));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`  verwijderd beeld: ${path.basename(filePath)}`);
    }
  }
}

function runCleanup(cards, config) {
  const removed = [];
  if (!config.cleanupIds) return { cards, removed };
  const keep = [];
  for (const card of cards) {
    if (config.cleanupIds(card.id)) {
      removed.push(card);
    } else {
      keep.push(card);
    }
  }
  removeOrphanImages(removed, keep);
  console.log(`Opruiming: ${removed.length} oude kaarten verwijderd`);
  for (const r of removed) {
    console.log(`  - ${r.id}: ${r.nl?.titel}`);
  }
  return { cards: keep, removed };
}

function main() {
  const args = process.argv.slice(2);
  const skipCleanup = args.includes("--skip-cleanup");
  const cleanupOnly = args.includes("--cleanup-only");
  const sector = args.find((a) => !a.startsWith("--"));
  const config = PACK_CONFIG[sector];
  if (!config) {
    console.error(
      "Gebruik: node scripts/import-sector-v3.mjs burgerschap|bestuurskunde|onderwijs [--skip-cleanup] [--cleanup-only]"
    );
    process.exit(1);
  }

  const sourceJson = path.join(root, "_import", config.packDir, config.jsonFile);
  if (!fs.existsSync(sourceJson)) {
    console.error(`Bron niet gevonden: ${sourceJson}`);
    process.exit(1);
  }

  const pack = JSON.parse(fs.readFileSync(sourceJson, "utf8"));
  let cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));

  let addedCount = 0;
  if (cleanupOnly) {
    const result = runCleanup(cards, config);
    cards = result.cards;
  } else {
    const existingIds = new Set(cards.map((c) => c.id));

    for (const entry of pack.cards) {
      if (existingIds.has(entry.id)) {
        console.error(`Id bestaat al: ${entry.id}`);
        process.exit(1);
      }
    }

    const newCards = pack.cards.map((e) => toCommunityCard(e, config));
    addedCount = newCards.length;
    cards = [...cards, ...newCards];

    if (!skipCleanup && config.cleanupIds) {
      const result = runCleanup(cards, config);
      cards = result.cards;
    }
  }

  fs.writeFileSync(cardsPath, JSON.stringify(cards, null, 2) + "\n", "utf8");

  if (!cleanupOnly) {
    const meta = {
      complexityNote: pack.meta.complexity_note,
      setDescription: pack.meta.set_description,
    };
    fs.writeFileSync(config.metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");
  }

  const spread = cards
    .filter((c) => c.categorie === config.categorie)
    .reduce((acc, c) => {
      acc[c.complexiteit] = (acc[c.complexiteit] || 0) + 1;
      return acc;
    }, {});

  if (!cleanupOnly) {
    console.log(`Sector ${sector}: +${addedCount} kaarten`);
  }
  console.log(`Totaal cards.json: ${cards.length}`);
  console.log(`${config.categorie} spreiding:`, spread);
}

main();
