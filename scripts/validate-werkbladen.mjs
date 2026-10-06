import { readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { COMPLEXITY_KEYS } from "../src/data/gesprekskaarten/constants.js";
import { LICENTIES } from "../src/data/licentie.js";

// Moet gelijk blijven aan sleutels in src/data/licentie.js
const TOEGESTANE_LICENTIES = Object.keys(LICENTIES);

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const FASEN = ["zien", "voelen", "wegen", "handelen", "volhouden"];
const NIVEAUS = ["concept", "getest", "aanbevolen"];
const DOCX_KEYS = ["student_nl", "docent_nl", "student_en", "docent_en"];
const PDF_KEYS = ["student_nl_pdf", "docent_nl_pdf", "student_en_pdf", "docent_en_pdf"];
const BESTAND_KEYS = [...DOCX_KEYS, ...PDF_KEYS];
const ID_PATTERN = /^MV_\d{2}$/;
const WERKBLAD_CODE_PATTERNS = [
  /^WB-MW\d{2}-[A-Z]+-(NL|EN)$/,
  /^WB-EX\d{2}-HRM-(NL|EN)$/,
  /^WB-GK\d{2}-(NL|EN)$/,
];
const SAFE_FILENAME = /^[A-Za-z0-9._-]+$/;

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function loadBibliotheekIds() {
  const text = readFileSync(join(root, "src/data/bibliotheekData.js"), "utf8");
  const ids = new Set();
  for (const m of text.matchAll(/id:\s*'(MV_\d+)'/g)) {
    ids.add(m[1]);
  }
  return ids;
}

function isStringOrNull(v) {
  return v === null || typeof v === "string";
}

function validateLocalizedObject(obj, path, requireNl = true) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    fail(`${path}: moet een object met nl/en zijn`);
    return;
  }
  if (requireNl && typeof obj.nl !== "string") {
    fail(`${path}.nl: moet een string zijn`);
  }
  if (obj.en !== undefined && typeof obj.en !== "string") {
    fail(`${path}.en: moet een string zijn`);
  }
}

function validateLocalizedThemas(obj, path) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    fail(`${path}: moet een object met nl/en arrays zijn`);
    return;
  }
  if (!Array.isArray(obj.nl)) {
    fail(`${path}.nl: moet een array zijn`);
  }
  if (obj.en !== undefined && !Array.isArray(obj.en)) {
    fail(`${path}.en: moet een array zijn`);
  }
}

function checkFile(id, filename, kind) {
  if (filename === null) return;
  if (typeof filename !== "string" || !filename) {
    fail(`${id}: ${kind} moet string of null zijn`);
    return;
  }
  if (!SAFE_FILENAME.test(filename)) {
    fail(`${id}: bestandsnaam "${filename}" bevat spaties of ongeldige tekens`);
    return;
  }
  const full = join(root, "public/downloads/werkbladen", id, filename);
  if (!existsSync(full)) {
    fail(`${id}: bestand ontbreekt op schijf: public/downloads/werkbladen/${id}/${filename}`);
    return;
  }
  const size = statSync(full).size;
  if (size > 20 * 1024 * 1024) {
    fail(`${id}: ${filename} is groter dan 20 MB`);
  } else if (size > 2 * 1024 * 1024) {
    warn(`${id}: ${filename} is groter dan 2 MB`);
  }
}

const bibliotheekIds = loadBibliotheekIds();
let raw;
try {
  raw = JSON.parse(readFileSync(join(root, "src/data/werkbladen.json"), "utf8"));
} catch (e) {
  fail(`werkbladen.json kan niet worden gelezen: ${e.message}`);
  raw = [];
}

if (!Array.isArray(raw)) {
  fail("werkbladen.json moet een array zijn");
  process.exit(1);
}

const seenIds = new Set();
const fileCounts = {
  student_nl: 0,
  docent_nl: 0,
  student_en: 0,
  docent_en: 0,
  student_nl_pdf: 0,
  docent_nl_pdf: 0,
  student_en_pdf: 0,
  docent_en_pdf: 0,
};

for (const item of raw) {
  const id = item?.id;

  if (typeof id !== "string" || !ID_PATTERN.test(id)) {
    fail(`Ongeldig id: ${JSON.stringify(id)} (verwacht ^MV_\\d{2}$)`);
    continue;
  }

  if (seenIds.has(id)) {
    fail(`${id}: dubbel id in werkbladen.json`);
  }
  seenIds.add(id);

  if (bibliotheekIds.has(id)) {
    fail(`${id}: id staat al in bibliotheekData.js`);
  }

  validateLocalizedObject(item.titel, `${id}.titel`);
  validateLocalizedObject(item.omschrijving, `${id}.omschrijving`);
  validateLocalizedThemas(item.themas, `${id}.themas`);

  if (!Array.isArray(item.fasen) || item.fasen.length < 1 || item.fasen.length > 5) {
    fail(`${id}: fasen moet 1–5 waarden bevatten`);
  } else {
    for (const f of item.fasen) {
      if (!FASEN.includes(f)) {
        fail(`${id}: ongeldige fase "${f}"`);
      }
    }
  }

  if (typeof item.opleidingsniveau !== "string") fail(`${id}: opleidingsniveau ontbreekt`);
  if (typeof item.vakgebied !== "string") fail(`${id}: vakgebied ontbreekt`);
  if (item.complexiteit !== null && item.complexiteit !== undefined) {
    if (!COMPLEXITY_KEYS.includes(item.complexiteit)) {
      fail(`${id}: ongeldige complexiteit "${item.complexiteit}"`);
    }
  }
  if (typeof item.duur !== "string") fail(`${id}: duur ontbreekt`);
  if (typeof item.groep !== "string") fail(`${id}: groep ontbreekt`);
  if (typeof item.oorspronkelijke_werkvorm !== "string") {
    fail(`${id}: oorspronkelijke_werkvorm ontbreekt`);
  }
  if (!Array.isArray(item.bronnen_apa)) {
    fail(`${id}: bronnen_apa moet een array zijn`);
  } else if (item.bronnen_apa.length === 0) {
    warn(`${id}: lege bronnen_apa`);
  }
  if (!TOEGESTANE_LICENTIES.includes(item.licentie)) {
    fail(`${id}: ongeldige licentie "${item.licentie}" (toegestaan: ${TOEGESTANE_LICENTIES.join(", ")})`);
  }
  if (item.werkblad_code !== undefined && typeof item.werkblad_code !== "string") {
    fail(`${id}: werkblad_code moet een string zijn`);
  } else if (typeof item.werkblad_code === "string" && item.werkblad_code) {
    if (!WERKBLAD_CODE_PATTERNS.some((re) => re.test(item.werkblad_code))) {
      fail(`${id}: werkblad_code "${item.werkblad_code}" past niet bij het registerpatroon`);
    }
  }
  if (item.zieOok !== undefined) {
    if (!Array.isArray(item.zieOok) || item.zieOok.length > 3) {
      fail(`${id}: zieOok moet een array zijn met max. 3 id's`);
    } else {
      for (const ref of item.zieOok) {
        if (typeof ref !== "string" || !ID_PATTERN.test(ref)) {
          fail(`${id}: ongeldige zieOok-referentie "${ref}"`);
        }
      }
    }
  }
  if (item.naamsvermelding_bron !== undefined && typeof item.naamsvermelding_bron !== "string") {
    fail(`${id}: naamsvermelding_bron moet een string zijn`);
  }
  if (typeof item.naamsvermelding !== "string") fail(`${id}: naamsvermelding ontbreekt`);
  if (!NIVEAUS.includes(item.niveau)) {
    fail(`${id}: ongeldig niveau "${item.niveau}"`);
  }

  if (!item.bestanden || typeof item.bestanden !== "object") {
    fail(`${id}: bestanden ontbreekt`);
  } else {
    for (const key of DOCX_KEYS) {
      if (!(key in item.bestanden)) {
        fail(`${id}: bestanden.${key} ontbreekt`);
      } else if (!isStringOrNull(item.bestanden[key])) {
        fail(`${id}: bestanden.${key} moet string of null zijn`);
      } else if (item.bestanden[key]) {
        fileCounts[key]++;
        checkFile(id, item.bestanden[key], key);
      }
    }
    for (const key of PDF_KEYS) {
      if (key in item.bestanden) {
        if (!isStringOrNull(item.bestanden[key])) {
          fail(`${id}: bestanden.${key} moet string of null zijn`);
        } else if (item.bestanden[key]) {
          fileCounts[key]++;
          checkFile(id, item.bestanden[key], key);
        }
      }
    }
  }

  if (!("sfeerbeeld" in item)) {
    fail(`${id}: sfeerbeeld veld ontbreekt`);
  } else if (!isStringOrNull(item.sfeerbeeld)) {
    fail(`${id}: sfeerbeeld moet string of null zijn`);
  } else if (item.sfeerbeeld) {
    if (!SAFE_FILENAME.test(item.sfeerbeeld)) {
      fail(`${id}: sfeerbeeld bestandsnaam ongeldig`);
    } else {
      const imgPath = join(root, "public/images/werkbladen", item.sfeerbeeld);
      if (!existsSync(imgPath)) {
        warn(`${id}: sfeerbeeld ontbreekt: public/images/werkbladen/${item.sfeerbeeld}`);
      } else {
        const size = statSync(imgPath).size;
        if (size > 300 * 1024) {
          warn(`${id}: sfeerbeeld groter dan 300 KB`);
        }
      }
    }
  } else {
    warn(`${id}: geen sfeerbeeld ingesteld`);
  }

  if (item.titel?.en !== undefined && !String(item.titel.en || "").trim()) {
    warn(`${id}: ontbrekende EN-titel`);
  }
}

if (errors.length > 0) {
  console.error("❌ Werkbladen-validatie mislukt:\n");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

console.log("✅ Werkbladen-validatie geslaagd");
console.log(`   Werkbladen: ${raw.length}`);
console.log(
  `   Bestanden: student_nl=${fileCounts.student_nl}, docent_nl=${fileCounts.docent_nl}, student_en=${fileCounts.student_en}, docent_en=${fileCounts.docent_en}`,
);
console.log(`   Waarschuwingen: ${warnings.length}`);
for (const w of warnings) console.warn(`   ⚠ ${w}`);
