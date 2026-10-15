/**
 * Import ETZ Passende Zorg (20 kaarten) uit data/etz-passende-zorg/.
 * Run: npm run cards:import-etz
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const DATA_DIR = path.join(root, "data", "etz-passende-zorg");
const SOURCE_JSON = path.join(DATA_DIR, "etz-selectie-20.json");
const SOURCE_IMAGES = path.join(DATA_DIR, "afbeeldingen");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const destImages = path.join(root, "public/images/gesprekskaarten");

const ETZ_VRAGEN = {
  vraag1: "Wat doet dit met jou?",
  vraag2: "Wat doet dit met het team?",
  vraag3: "Welke waarden zijn hier in het spel?",
  vraag4: "Wat vind jij hier Passende Zorg?",
};

function cleanKaarttekst(kaarttekst, titel, afdeling) {
  const lines = (kaarttekst ?? [])
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((line) => line !== afdeling)
    .filter((line) => !/^KAA\s*RT\s*\d+/i.test(line));

  return lines
    .map((line) => {
      if (line.startsWith(titel)) {
        return line.slice(titel.length).trimStart();
      }
      return line;
    })
    .join("\n\n")
    .trim();
}

function basenameFromPath(p) {
  return path.basename(p.replace(/^afbeeldingen\//, ""));
}

function sourceToCommunityCard(entry) {
  const filename = basenameFromPath(entry.afbeelding);
  const verhaal = cleanKaarttekst(entry.kaarttekst, entry.titel, entry.afdeling);

  return {
    id: entry.id,
    set: "passende-zorg",
    stap: 4,
    categorie: "passende-zorg",
    complexiteit: null,
    taalniveau: "B2",
    status: "aanbevolen",
    nl: {
      titel: entry.titel,
      verhaal,
      ...ETZ_VRAGEN,
    },
    en: {
      vertaling: false,
      titel: entry.titel,
      verhaal,
      ...ETZ_VRAGEN,
    },
    assets: {
      afbeelding: `/images/gesprekskaarten/${filename}`,
      altNl: entry.alt,
      altEn: entry.alt,
      layout: "a5-full",
      fireflyPrompt: null,
      pdfNl: null,
      pdfEn: null,
    },
    meta: {
      woordenNl: wordCount(verhaal),
      woordenEn: wordCount(verhaal),
      bron: "ETZ Passende Zorg — website selectie 20",
      kaartNummer: entry.kaartnummer,
      afdeling: entry.afdeling,
      sectorColor: "#005F73",
      tekstVersie: "ETZ A5",
      afbeeldingStatus: "a5-print",
      project: "Elisabeth-TweeSteden Ziekenhuis — Passende Zorg",
      complexiteitOnbekend: true,
      hideReflectieVragen: true,
    },
  };
}

function main() {
  if (!fs.existsSync(SOURCE_JSON)) {
    console.error(`Bron niet gevonden: ${SOURCE_JSON}`);
    process.exit(1);
  }
  if (!fs.existsSync(SOURCE_IMAGES)) {
    console.error(`Afbeeldingenmap niet gevonden: ${SOURCE_IMAGES}`);
    process.exit(1);
  }

  const source = JSON.parse(fs.readFileSync(SOURCE_JSON, "utf8"));
  const cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
  const existingIds = new Set(cards.map((c) => c.id));

  fs.mkdirSync(destImages, { recursive: true });

  const imported = [];
  for (const entry of source) {
    const filename = basenameFromPath(entry.afbeelding);
    const srcImg = path.join(SOURCE_IMAGES, filename);
    const destImg = path.join(destImages, filename);
    if (!fs.existsSync(srcImg)) {
      console.error(`Afbeelding ontbreekt: ${srcImg}`);
      process.exit(1);
    }
    fs.copyFileSync(srcImg, destImg);

    if (existingIds.has(entry.id)) {
      const idx = cards.findIndex((c) => c.id === entry.id);
      cards[idx] = sourceToCommunityCard(entry);
      console.log(`Vervangen: ${entry.id}`);
    } else {
      cards.push(sourceToCommunityCard(entry));
      console.log(`Toegevoegd: ${entry.id}`);
    }
    imported.push(entry.id);
  }

  fs.writeFileSync(cardsPath, JSON.stringify(cards, null, 2), "utf8");
  console.log(`\nKlaar: ${imported.length} ETZ-kaarten → ${destImages}`);
}

main();
