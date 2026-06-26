/**
 * Genereert lichte catalogus voor filters / toekomstige lazy loading.
 * Run automatisch vóór build: npm run build
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const outDir = path.join(root, "public/data/gesprekskaarten");
const outPath = path.join(outDir, "catalog.json");

const cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));

const catalog = cards.map((card) => ({
  id: card.id,
  set: card.set,
  stap: card.stap,
  categorie: card.categorie,
  moeilijkheid: card.moeilijkheid,
  taalniveau: card.taalniveau,
  status: card.status,
  titelNl: card.nl.titel,
  titelEn: card.en.titel,
  woordenNl: card.meta?.woordenNl ?? null,
  woordenEn: card.meta?.woordenEn ?? null,
  heeftAfbeelding: Boolean(card.assets?.afbeelding),
}));

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  outPath,
  JSON.stringify({ generatedAt: new Date().toISOString(), count: catalog.length, cards: catalog }, null, 2),
  "utf8"
);
console.log(`Catalog: ${catalog.length} cards → ${outPath}`);
