/**
 * Vult lege rechtvaardiging-velden in cards.json vanuit een JSON-map.
 * Invoer: { "GK_DL_01": { "nl": "…", "en": "…" }, … }
 *
 * Run: npm run cards:import-rechtvaardigingen -- path/to/map.json
 *      npm run cards:import-rechtvaardigingen -- --dry-run path/to/map.json
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");

const MAX_LEN = 220;

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const fileArg = argv.filter((a) => a !== "--dry-run")[0];

if (!fileArg) {
  console.error("Gebruik: npm run cards:import-rechtvaardigingen -- [--dry-run] <pad-naar-json>");
  process.exit(1);
}

const inputPath = path.isAbsolute(fileArg) ? fileArg : path.join(process.cwd(), fileArg);
if (!fs.existsSync(inputPath)) {
  console.error(`Bestand niet gevonden: ${inputPath}`);
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(fs.readFileSync(inputPath, "utf8"));
} catch (e) {
  console.error(`Ongeldige JSON: ${e.message}`);
  process.exit(1);
}

if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
  console.error("Invoer moet een object zijn met kaart-id’s als sleutels.");
  process.exit(1);
}

const cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
const byId = new Map(cards.map((c) => [c.id, c]));

const report = [];

function validateText(text, lang) {
  const t = (text ?? "").trim();
  if (!t) return { ok: false, reason: `lege tekst (${lang})` };
  if (t.length > MAX_LEN) return { ok: false, reason: `tekst > ${MAX_LEN} tekens (${lang}, ${t.length})` };
  return { ok: true, value: t };
}

let changed = false;

for (const [id, entry] of Object.entries(payload)) {
  if (id.startsWith("_")) continue;

  const card = byId.get(id);
  if (!card) {
    report.push({ id, status: "fout", detail: "onbekend id" });
    continue;
  }

  const nlIn = validateText(entry?.nl, "nl");
  const enIn = validateText(entry?.en, "en");
  if (!nlIn.ok) {
    report.push({ id, status: "fout", detail: nlIn.reason });
    continue;
  }
  if (!enIn.ok) {
    report.push({ id, status: "fout", detail: enIn.reason });
    continue;
  }

  const hadNl = Boolean((card.nl?.rechtvaardiging || "").trim());
  const hadEn = Boolean((card.en?.rechtvaardiging || "").trim());

  if (hadNl && hadEn) {
    report.push({ id, status: "overgeslagen", detail: "al gevuld (NL en EN)" });
    continue;
  }

  const willNl = !hadNl;
  const willEn = !hadEn;

  if (!willNl && !willEn) {
    report.push({ id, status: "overgeslagen", detail: "al gevuld" });
    continue;
  }

  if (!dryRun) {
    if (!card.nl) card.nl = {};
    if (!card.en) card.en = {};
    if (willNl) card.nl.rechtvaardiging = nlIn.value;
    if (willEn) card.en.rechtvaardiging = enIn.value;
    changed = true;
  }

  const parts = [];
  if (willNl) parts.push("NL");
  if (willEn) parts.push("EN");
  report.push({ id, status: "ingevuld", detail: dryRun ? `zou invullen: ${parts.join(", ")}` : parts.join(", ") });
}

console.log(dryRun ? "Dry-run — geen schrijfactie\n" : "Import rechtvaardigingen\n");

for (const row of report) {
  console.log(`${row.id}: ${row.status}${row.detail ? ` — ${row.detail}` : ""}`);
}

if (!dryRun && changed) {
  fs.writeFileSync(cardsPath, JSON.stringify(cards, null, 2) + "\n", "utf8");
  console.log("\n→ cards.json bijgewerkt");

  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  for (const script of ["cards:catalog", "cards:validate-v3"]) {
    console.log(`→ ${script}`);
    const r = spawnSync(npmCmd, ["run", script], { cwd: root, stdio: "inherit", shell: true });
    if (r.status !== 0) {
      console.error(`${script} mislukt (exit ${r.status})`);
      process.exit(r.status ?? 1);
    }
  }
} else if (!dryRun && !changed) {
  console.log("\nGeen wijzigingen in cards.json.");
}
