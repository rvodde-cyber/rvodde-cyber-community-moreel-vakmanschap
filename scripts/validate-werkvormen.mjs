import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const FASEN = ["zien", "voelen", "wegen", "handelen", "volhouden"];
const LABELS = new Set(["A", "B", "C"]);
const DUUR_TYPES = new Set([
  "eenmalig",
  "meerdere sessies",
  "doorlopend",
  "variabel",
  "n.v.t.",
]);
const EXPECTED_COUNT = 128;

const errors = [];

function fail(msg) {
  errors.push(msg);
}

let raw;
try {
  raw = JSON.parse(readFileSync(join(root, "src/data/werkvormen.json"), "utf8"));
} catch (e) {
  fail(`werkvormen.json kan niet worden gelezen: ${e.message}`);
  console.error("❌ Werkvormen-validatie mislukt:\n");
  for (const err of errors) console.error(`  • ${err}`);
  process.exit(1);
}

if (!raw || typeof raw !== "object") {
  fail("werkvormen.json moet een object zijn");
}

const regioSlugs = new Set();
if (!Array.isArray(raw.regio_lijst)) {
  fail("regio_lijst moet een array zijn");
} else {
  for (const r of raw.regio_lijst) {
    if (!r?.slug || typeof r.slug !== "string") fail("regio_lijst: slug ontbreekt");
    if (typeof r.nl !== "string" || typeof r.en !== "string") {
      fail(`regio ${r?.slug}: nl/en ontbreken`);
    }
    if (regioSlugs.has(r.slug)) fail(`dubbele regio slug ${r.slug}`);
    regioSlugs.add(r.slug);
  }
}

if (!Array.isArray(raw.werkvormen)) {
  fail("werkvormen[] ontbreekt");
  process.exit(1);
}

if (raw.werkvormen.length !== EXPECTED_COUNT) {
  fail(`verwacht ${EXPECTED_COUNT} werkvormen, gevonden ${raw.werkvormen.length}`);
}

const seenIds = new Set();

for (const wv of raw.werkvormen) {
  const id = wv?.id;
  if (typeof id !== "string" || !/^MW\d{2,3}$/.test(id)) {
    fail(`ongeldig id: ${JSON.stringify(id)}`);
    continue;
  }
  if (seenIds.has(id)) fail(`${id}: dubbel id`);
  seenIds.add(id);

  if (!wv.titel?.nl || typeof wv.titel.nl !== "string") fail(`${id}: titel.nl ontbreekt`);
  if (wv.titel.en !== undefined && typeof wv.titel.en !== "string") fail(`${id}: titel.en ongeldig`);

  if (!regioSlugs.has(wv.regio)) fail(`${id}: regio "${wv.regio}" niet in regio_lijst`);

  if (!LABELS.has(wv.label)) fail(`${id}: label moet A, B of C zijn`);

  if (!Array.isArray(wv.fasen) || wv.fasen.length < 1) {
    fail(`${id}: fasen moet minstens 1 fase bevatten`);
  } else {
    for (const f of wv.fasen) {
      if (!FASEN.includes(f)) fail(`${id}: ongeldige fase ${f}`);
    }
  }

  if (!Array.isArray(wv.niveaus) || wv.niveaus.length < 1) {
    fail(`${id}: niveaus ontbreekt`);
  }

  const duur = wv.duur;
  if (!duur || typeof duur !== "object") fail(`${id}: duur ontbreekt`);
  else if (!DUUR_TYPES.has(duur.type)) fail(`${id}: ongeldig duur.type ${duur.type}`);
  else if (duur.min != null && duur.max != null && duur.min > duur.max) {
    fail(`${id}: duur.min > duur.max`);
  }

  const groep = wv.groep;
  if (!groep || typeof groep !== "object") fail(`${id}: groep ontbreekt`);
  else if (groep.min != null && groep.max != null && groep.min > groep.max) {
    fail(`${id}: groep.min > groep.max`);
  }

  if (!wv.beschrijving?.nl) fail(`${id}: beschrijving.nl ontbreekt`);

  if (wv.coordinaten !== null) {
    const c = wv.coordinaten;
    if (!c || typeof c.lat !== "number" || typeof c.lng !== "number") {
      fail(`${id}: coordinaten ongeldig`);
    } else {
      if (c.lat < -90 || c.lat > 90) fail(`${id}: lat buiten bereik`);
      if (c.lng < -180 || c.lng > 180) fail(`${id}: lng buiten bereik`);
    }
  }
}

if (errors.length > 0) {
  console.error("❌ Werkvormen-validatie mislukt:\n");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

console.log("✅ Werkvormen-validatie geslaagd");
console.log(`   Werkvormen: ${raw.werkvormen.length}`);
console.log(`   Regio's: ${raw.regio_lijst.length}`);
