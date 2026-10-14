/**
 * Valideert zichtbare kaarten tegen v3-websitecriteria.
 * Run: npm run cards:validate-v3
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { filterVisibleCards } from "../src/data/gesprekskaarten/visibility.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const pub = path.join(root, "public");

const cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
const visible = filterVisibleCards(cards);

function imageExists(card) {
  const img = card.assets?.afbeelding;
  if (!img) return false;
  return fs.existsSync(path.join(pub, img.replace(/^\//, "")));
}

function complexityOk(card) {
  if (card.meta?.complexiteitOnbekend) return false;
  const c = card.complexiteit;
  if (c === "micro" || c === "meso" || c === "macro") return true;
  const m = card.moeilijkheid;
  return m === 1 || m === 2 || m === 3;
}

function checks(card) {
  const fails = [];
  if (!imageExists(card)) fails.push("afbeelding ontbreekt op schijf");
  if (card.meta?.afbeeldingStatus !== "v3") fails.push(`afbeeldingStatus≠v3 (${card.meta?.afbeeldingStatus ?? "—"})`);
  const rNl = (card.nl?.rechtvaardiging || "").trim();
  const rEn = (card.en?.rechtvaardiging || "").trim();
  if (!rNl || !rEn) fails.push("rechtvaardiging NL/EN");
  if (!card.meta?.sectorColor) fails.push("meta.sectorColor");
  if (!complexityOk(card)) fails.push("complexiteit");
  if (card.meta?.tekstVersie !== "3.0") fails.push("tekstVersie≠3.0");
  return fails;
}

const byCat = new Map();
for (const card of visible) {
  const cat = card.categorie || "(geen)";
  if (!byCat.has(cat)) {
    byCat.set(cat, { total: 0, ok: 0, fail: [] });
  }
  const row = byCat.get(cat);
  row.total += 1;
  const fails = checks(card);
  if (fails.length === 0) {
    row.ok += 1;
  } else {
    row.fail.push({ id: card.id, titel: card.nl?.titel, fails });
  }
}

console.log("Validatie v3 — alleen zichtbare kaarten\n");
console.log(
  "Categorie".padEnd(28) +
    "Totaal".padStart(7) +
    "OK".padStart(7) +
    "Fout".padStart(7)
);
console.log("-".repeat(49));

let grandTotal = 0;
let grandOk = 0;

for (const [cat, row] of [...byCat.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const fout = row.total - row.ok;
  console.log(
    cat.padEnd(28) + String(row.total).padStart(7) + String(row.ok).padStart(7) + String(fout).padStart(7)
  );
  grandTotal += row.total;
  grandOk += row.ok;
}

console.log("-".repeat(49));
console.log(
  "TOTAAL".padEnd(28) + String(grandTotal).padStart(7) + String(grandOk).padStart(7) + String(grandTotal - grandOk).padStart(7)
);

console.log("\nDetails per categorie (alleen afwijkingen):\n");
for (const [cat, row] of [...byCat.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  if (row.fail.length === 0) continue;
  console.log(`## ${cat}`);
  for (const f of row.fail) {
    console.log(`  - ${f.id} (${f.titel}): ${f.fails.join("; ")}`);
  }
  console.log("");
}

process.exit(0);
