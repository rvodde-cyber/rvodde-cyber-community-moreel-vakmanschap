/**
 * Importeer één of meer Ethos Studio kaarten (JSON) naar cards.json.
 *
 * Voorbeeld:
 *   npm run cards:import-ethos -- --input ./ethos-export.json --id GK_042 --categorie werk --stap 4
 *   npm run cards:import-ethos -- --input ./batch.json --append --lang nl
 *
 * Ethos JSON-velden: title, story, closing_question, complexity, values, facilitator_tip, image_prompt
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ethosCardToCommunityCard, normalizeCard } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cardsPath = path.join(__dirname, "../src/data/gesprekskaarten/cards.json");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));

if (!args.input) {
  console.error(`Gebruik:
  node scripts/import-from-ethos.mjs --input <ethos.json> --id GK_XXX [--categorie werk] [--stap 4] [--set naam] [--lang nl|en] [--append]

  batch.json = array van Ethos-objecten; bij batch: --id-prefix GK_MM_ en --append`);
  process.exit(1);
}

const inputPath = path.resolve(args.input);
const raw = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const items = Array.isArray(raw) ? raw : [raw];

let cards = [];
if (fs.existsSync(cardsPath)) {
  cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
}

const imported = items.map((item, index) => {
  const id =
    item.id ||
    args.id ||
    (args["id-prefix"]
      ? `${args["id-prefix"]}${String(cards.length + index + 1).padStart(2, "0")}`
      : null);

  return normalizeCard(
    ethosCardToCommunityCard(item, {
      id,
      set: args.set ?? item.set ?? "ethos-import",
      categorie: args.categorie ?? item.categorie ?? "dagelijks-leven",
      stap: args.stap ?? item.stap ?? 4,
      taalniveau: args.taalniveau ?? item.taalniveau ?? "B2",
      status: args.status ?? item.status ?? "concept",
      lang: args.lang ?? "nl",
    })
  );
});

if (!args.append) {
  console.log(JSON.stringify(imported.length === 1 ? imported[0] : imported, null, 2));
  console.log("\nGebruik --append om toe te voegen aan cards.json");
  process.exit(0);
}

if (!fs.existsSync(cardsPath)) {
  cards = [];
}

const ids = new Set(cards.map((c) => c.id));
for (const card of imported) {
  if (ids.has(card.id)) {
    if (args.replace) {
      cards = cards.map((c) => (c.id === card.id ? card : c));
      console.log(`Vervangen: ${card.id}`);
    } else {
      console.warn(`Overslaan (id bestaat al): ${card.id}`);
    }
    continue;
  }
  cards.push(card);
  ids.add(card.id);
}

fs.mkdirSync(path.dirname(cardsPath), { recursive: true });
fs.writeFileSync(cardsPath, JSON.stringify(cards, null, 2), "utf8");
console.log(`Import: ${imported.length} kaart(en) → ${cardsPath} (${cards.length} totaal)`);
