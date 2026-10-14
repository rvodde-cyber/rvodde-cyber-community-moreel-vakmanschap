/**
 * Genereert docs/ontbrekende-rechtvaardigingen.json (geen teksten invullen).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { filterVisibleCards } from "../src/data/gesprekskaarten/visibility.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const outPath = path.join(root, "docs/ontbrekende-rechtvaardigingen.json");

const cards = filterVisibleCards(JSON.parse(fs.readFileSync(cardsPath, "utf8")));

const missing = cards
  .filter((c) => c.meta?.tekstVersie === "3.0")
  .map((c) => {
    const ontbreekt = [];
    if (!(c.nl?.rechtvaardiging || "").trim()) ontbreekt.push("nl");
    if (!(c.en?.rechtvaardiging || "").trim()) ontbreekt.push("en");
    if (ontbreekt.length === 0) return null;
    return {
      id: c.id,
      titel: c.nl?.titel ?? "",
      categorie: c.categorie,
      complexiteit: c.complexiteit ?? null,
      ontbreekt,
    };
  })
  .filter(Boolean);

fs.writeFileSync(outPath, JSON.stringify(missing, null, 2) + "\n", "utf8");
console.log(`${missing.length} kaarten → ${outPath}`);
