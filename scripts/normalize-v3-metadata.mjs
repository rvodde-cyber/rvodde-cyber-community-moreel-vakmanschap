/**
 * Normaliseert afbeeldingStatus en vult meta.sectorColor (v3) waar toegestaan.
 * Run: node scripts/normalize-v3-metadata.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CATEGORIE_KLEUREN } from "../src/data/gesprekskaarten/constants.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const pub = path.join(root, "public");

/** Vaste tabel opdracht (hex uppercase voor vergelijking). */
const V3_SECTOR_BY_CATEGORIE = {
  onderwijs: "#1A9080",
  werk: "#E05A1A",
  "dagelijks-leven": "#E0A01A",
  duurzaamheid: "#C0392B",
  "diversiteit-inclusie": "#27AE60",
  "social-media": "#E8820A",
  studentenleven: "#8E44AD",
  bestuurskunde: "#1F3F66",
  "nucleaire-geneeskunde": "#0D5C63",
  onderzoeksintegriteit: "#6E5773",
};

function normHex(hex) {
  return String(hex || "").trim().toUpperCase();
}

function imagePathOnDisk(card) {
  const img = card.assets?.afbeelding;
  if (!img) return null;
  const fsPath = path.join(pub, img.replace(/^\//, ""));
  return fs.existsSync(fsPath) ? img : null;
}

function isJpgPath(imgPath) {
  if (!imgPath) return false;
  const ext = path.extname(imgPath).toLowerCase();
  return ext === ".jpg" || ext === ".jpeg";
}

function mapAfbeeldingStatus(card) {
  const meta = card.meta ?? {};
  const old = meta.afbeeldingStatus ?? null;
  const img = imagePathOnDisk(card);
  const tekstV3 = meta.tekstVersie === "3.0";

  if (!img) {
    return { newStatus: "ontbreekt", old };
  }

  if (old === "v3" || old === "oud" || old === "ontbreekt") {
    return { newStatus: old, old };
  }

  if (old === "oud (tijdelijk)") {
    return { newStatus: "oud", old };
  }

  if (old === "definitief" || old === "a5-print") {
    if (tekstV3 && isJpgPath(img)) {
      return { newStatus: "v3", old };
    }
    return { newStatus: "oud", old };
  }

  if (old === "firefly (nieuw)") {
    return { newStatus: "oud", old };
  }

  if (tekstV3 && isJpgPath(img) && meta.afbeeldingStatus === undefined) {
    return { newStatus: "v3", old };
  }

  return { newStatus: "oud", old: old ?? "(afwezig)" };
}

const statusChanges = [];
const sectorFilled = [];
const sectorSkipped = [];
const sectorMismatches = [];

const cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));

const updated = cards.map((card) => {
  const out = { ...card, meta: { ...(card.meta ?? {}) } };
  const { newStatus, old } = mapAfbeeldingStatus(out);
  if (old !== newStatus) {
    statusChanges.push({ id: out.id, old: old ?? "(afwezig)", new: newStatus });
  }
  out.meta.afbeeldingStatus = newStatus;

  if (out.meta.tekstVersie === "3.0" && !out.meta.sectorColor) {
    const cat = out.categorie;
    const official = V3_SECTOR_BY_CATEGORIE[cat];
    if (!official) {
      sectorSkipped.push({ id: out.id, categorie: cat, reason: "geen v3-sectortabel voor deze categorie-slug" });
    } else {
      const site = CATEGORIE_KLEUREN[cat];
      if (!site) {
        sectorSkipped.push({ id: out.id, categorie: cat, reason: "categorie niet in CATEGORIE_KLEUREN" });
      } else if (normHex(site) !== normHex(official)) {
        sectorMismatches.push({
          id: out.id,
          categorie: cat,
          siteColor: site,
          officialColor: official,
        });
      } else {
        out.meta.sectorColor = official;
        sectorFilled.push({ id: out.id, categorie: cat, sectorColor: official });
      }
    }
  }

  return out;
});

fs.writeFileSync(cardsPath, JSON.stringify(updated, null, 2) + "\n", "utf8");

console.log(`Bijgewerkt: ${updated.length} kaarten → ${cardsPath}\n`);
console.log("=== afbeeldingStatus omzettingen ===");
for (const row of statusChanges) {
  console.log(`${row.id}\t${row.old}\t→\t${row.new}`);
}
console.log(`\nTotaal omzettingen: ${statusChanges.length}`);
console.log(`\nsectorColor ingevuld: ${sectorFilled.length}`);
if (sectorMismatches.length) {
  console.log("\n=== sectorColor NIET ingevuld (kleur wijkt af) ===");
  for (const m of sectorMismatches) {
    console.log(`${m.id}\t${m.categorie}\tsite=${m.siteColor}\tofficieel=${m.officialColor}`);
  }
}
if (sectorSkipped.length) {
  console.log(`\nsectorColor overgeslagen (geen tabel-match): ${sectorSkipped.length} kaarten`);
}
