/**
 * Voegt complexiteit toe en synchroniseert moeilijkheid ↔ micro/meso/macro.
 * Run: npm run cards:normalize
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeCard } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cardsPath = path.join(__dirname, "../src/data/gesprekskaarten/cards.json");

const cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
const normalized = cards.map(normalizeCard);

fs.writeFileSync(cardsPath, JSON.stringify(normalized, null, 2), "utf8");
console.log(`Genormaliseerd: ${normalized.length} kaarten → ${cardsPath}`);

const counts = normalized.reduce((acc, c) => {
  acc[c.complexiteit] = (acc[c.complexiteit] || 0) + 1;
  return acc;
}, {});
console.log("Complexiteit:", counts);
