/**
 * Eenmalige migratie (legacy). Bronbestand verwijderd na migratie naar cards.json.
 * Nieuwe kaarten: bewerk src/data/gesprekskaarten/cards.json direct.
 * Zie docs/gesprekskaarten-import.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const legacyPath = path.join(root, "src/data/gesprekskaartenTeaserSource.json");
const outPath = path.join(root, "src/data/gesprekskaarten/cards.json");

const CATEGORY_FROM_LEGACY = {
  "Dagelijks leven": "dagelijks-leven",
  Werk: "werk",
  Duurzaamheid: "duurzaamheid",
  "Diversiteit & Inclusie": "diversiteit-inclusie",
  "Social Media": "social-media",
  Studentenleven: "studentenleven",
};

const MOEILIJKHEID = [2, 3, 1, 2, 2, 3, 3, 2, 3, 2, 2, 2, 1, 2, 2];
const VRAGEN = {
  nl: {
    vraag1: "Wat zou jij doen en waarom?",
    vraag2: "Welke waarden zijn hier in het spel?",
  },
  en: {
    vraag1: "What would you do, and why?",
    vraag2: "What values are at stake here?",
  },
};

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function buildLang(item, lang) {
  return {
    titel: item.title,
    verhaal: item.story.replace(/\s+/g, " ").trim(),
    ...VRAGEN[lang],
  };
}

const legacy = JSON.parse(fs.readFileSync(legacyPath, "utf8"));

const cards = legacy.nl.map((nlItem, index) => {
  const enItem = legacy.en[index];
  const id = `GK_MM_${String(index + 1).padStart(2, "0")}`;

  return {
    id,
    set: "morele-moed-teaser",
    stap: 4,
    categorie: CATEGORY_FROM_LEGACY[nlItem.category] || "algemeen",
    moeilijkheid: MOEILIJKHEID[index] ?? 2,
    taalniveau: "B2",
    status: "getest",
    nl: buildLang(nlItem, "nl"),
    en: buildLang(
      {
        title: enItem.title,
        story: enItem.story.replace(/\n/g, " "),
      },
      "en"
    ),
    assets: {
      afbeelding: null,
      fireflyPrompt: null,
      pdfNl: null,
      pdfEn: null,
    },
    meta: {
      woordenNl: wordCount(nlItem.story),
      woordenEn: wordCount(enItem.story.replace(/\n/g, " ")),
    },
  };
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(cards, null, 2), "utf8");
console.log(`Wrote ${cards.length} cards to ${outPath}`);
