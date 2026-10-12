/**
 * Import 15 Praktijkschok HRM-kaarten uit cards_hrm_15.json → cards.json + public/images.
 * Run: node scripts/import-hrm-praktijkschok.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeCard, wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SOURCE_JSON = path.join(
  root,
  "..",
  "..",
  "Gesprekskaarten",
  "Praktijkschok HRM",
  "Cursor_HRM_15",
  "cards_hrm_15.json"
);
const SOURCE_IMAGES = path.join(path.dirname(SOURCE_JSON), "images");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const destImages = path.join(root, "public/images/gesprekskaarten");

/** Korte scènebeschrijving, geen namen of herkenbare gezichten */
const ALT = {
  "hrm-ps12": {
    nl: "HR-adviseur en medewerker in een kantoorruimte, gesprek achter gesloten deur",
    en: "HR advisor and employee in an office, conversation behind a closed door",
  },
  "hrm-ps13": {
    nl: "Bemiddelingsgesprek aan een vergadertafel op kantoor, gespannen sfeer",
    en: "Mediation meeting at a conference table in an office, tense atmosphere",
  },
  "hrm-ps31": {
    nl: "Medewerker bij HR-bureau met salarisdocumenten op tafel",
    en: "Employee at an HR desk with pay documents on the table",
  },
  "hrm-ps44": {
    nl: "Werknemer die onregelmatig op kantoor aanwezig is, collega's op de achtergrond",
    en: "Employee with irregular attendance at the office, colleagues in the background",
  },
  "hrm-ps01": {
    nl: "Nieuwe medewerker op eerste werkdag bij de receptie van een organisatie",
    en: "New employee on their first day at an organisation's reception",
  },
  "hrm-ps08": {
    nl: "Kantoor in verbouwing, medewerkers tussen stellingen en verhuisdozen",
    en: "Office under renovation, staff among scaffolding and moving boxes",
  },
  "hrm-ps18": {
    nl: "Informeel gesprek tussen twee collega's bij de koffieautomaat",
    en: "Informal conversation between two colleagues at the coffee machine",
  },
  "hrm-ps39": {
    nl: "Leeg kantoor met onbeantwoorde telefoon, werkdruk en afwezigheid",
    en: "Empty office with an unanswered phone, workload and absence",
  },
  "hrm-ps53": {
    nl: "HR-medewerker die een dossier bekijkt na een incident op de werkvloer",
    en: "HR staff member reviewing a file after an incident on the work floor",
  },
  "hrm-ps58": {
    nl: "Beoordelingsformulier en laptop op een bureau, functioneringsgesprek",
    en: "Appraisal form and laptop on a desk, performance review setting",
  },
  "hrm-ps66": {
    nl: "Medewerker die ziek thuis meldt via telefoon, HR aan de lijn",
    en: "Employee reporting sick leave by phone, HR on the line",
  },
  "hrm-ps69": {
    nl: "Scheidingsgesprek in een vergaderruimte, emotionele spanning",
    en: "Separation meeting in a conference room, emotional tension",
  },
  "hrm-ps54": {
    nl: "Formeel hoorzitting in een vergaderruimte, HR en medewerker tegenover elkaar",
    en: "Formal hearing in a meeting room, HR and employee facing each other",
  },
  "hrm-ps14": {
    nl: "Jobcoach en cliënt in gesprek in een informele ruimte",
    en: "Job coach and client in conversation in an informal setting",
  },
  "hrm-ps43": {
    nl: "HR-adviseur achter laptop met e-mail over reorganisatie op het scherm",
    en: "HR advisor at a laptop with reorganisation email on the screen",
  },
};

function splitReflection(text) {
  const t = (text || "").trim();
  const q1Match = t.match(/^(.+?\?)\s*(.+)$/);
  if (q1Match) {
    return { vraag1: q1Match[1].trim(), vraag2: q1Match[2].trim() };
  }
  return { vraag1: t, vraag2: null };
}

function toCommunityCard(entry) {
  const verhaalNl = entry.story.nl.join("\n\n");
  const verhaalEn = entry.story.en.join("\n\n");
  const refNl = splitReflection(entry.reflection.nl);
  const refEn = splitReflection(entry.reflection.en);
  const imageName = path.basename(entry.image);
  const destFile = path.join(destImages, imageName);
  const srcFile = path.join(SOURCE_IMAGES, imageName);

  if (!fs.existsSync(srcFile)) {
    throw new Error(`Afbeelding ontbreekt: ${srcFile}`);
  }
  fs.mkdirSync(destImages, { recursive: true });
  fs.copyFileSync(srcFile, destFile);

  const alt = ALT[entry.id] ?? {
    nl: `Sfeerbeeld bij casus ${entry.number}`,
    en: `Scene for case ${entry.number}`,
  };

  return normalizeCard({
    id: entry.id,
    set: "praktijkschok-hrm",
    stap: 3,
    categorie: "hrm",
    complexiteit: entry.complexity.level,
    taalniveau: "B2",
    status: "aanbevolen",
    nl: {
      titel: entry.title.nl,
      verhaal: verhaalNl,
      vraag1: refNl.vraag1,
      vraag2: refNl.vraag2,
      complexiteitLabel: entry.complexity.label.nl,
      rechtvaardiging: entry.complexity.justification.nl,
    },
    en: {
      titel: entry.title.en,
      verhaal: verhaalEn,
      vraag1: refEn.vraag1,
      vraag2: refEn.vraag2,
      complexiteitLabel: entry.complexity.label.en,
      rechtvaardiging: entry.complexity.justification.en,
    },
    assets: {
      afbeelding: `/images/gesprekskaarten/${imageName}`,
      altNl: alt.nl,
      altEn: alt.en,
      fireflyPrompt: null,
      pdfNl: null,
      pdfEn: null,
    },
    meta: {
      woordenNl: wordCount(verhaalNl),
      woordenEn: wordCount(verhaalEn),
      bron: "Praktijkschok HRM — selectie website (15 kaarten)",
      kaartNummer: entry.number,
      sectorColor: entry.sector.sector_color,
      categorieEn: "HR",
      tekstVersie: "3.0",
      afbeeldingStatus: "definitief",
      project: "Lectoraat Ethisch Werken",
    },
  });
}

function main() {
  if (!fs.existsSync(SOURCE_JSON)) {
    console.error(`Bron niet gevonden: ${SOURCE_JSON}`);
    process.exit(1);
  }

  const pack = JSON.parse(fs.readFileSync(SOURCE_JSON, "utf8"));
  const newCards = pack.cards.map(toCommunityCard);
  const existing = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
  const withoutHrm = existing.filter((c) => c.set !== "praktijkschok-hrm" && !String(c.id).startsWith("hrm-ps"));
  const merged = [...withoutHrm, ...newCards];

  fs.writeFileSync(cardsPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  fs.writeFileSync(
    path.join(root, "src/data/gesprekskaarten/praktijkschok-hrm-meta.json"),
    JSON.stringify({ complexityNote: pack.meta.complexity_note }, null, 2) + "\n",
    "utf8"
  );

  const spread = newCards.reduce((acc, c) => {
    acc[c.complexiteit] = (acc[c.complexiteit] || 0) + 1;
    return acc;
  }, {});
  console.log(`Geïmporteerd: ${newCards.length} kaarten`, spread);
}

main();
