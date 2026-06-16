// VEROUDERD — gebruik src/data/bibliotheekData.js als enige bron.
// Dit script schreef naar worksheets.js (verwijderd).
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mammoth from "mammoth";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const zienDir = path.join(root, "public", "downloads", "zien");

const nlFilenames = {
  MV_01: "MV_01_IkBenOK.docx",
  MV_02: "MV_02_Socialisatieverslag.docx",
  MV_03: "MV_03_Genogram.docx",
  MV_04: "MV_04_Levenslijn.docx",
  MV_05: "MV_05_DeVreemdeAnder.docx",
  MV_06: "MV_06_IntercultureleCompetenties.docx",
  MV_07: "MV_07_IntersectionaliteitsAudit.docx",
  MV_08: "MV_08_WareKoers.docx",
  MV_09: "MV_09_JohariVenster.docx",
  MV_10: "MV_10_LogischeNiveausBateson.docx",
  MV_11: "MV_11_RoosVanLeary.docx"
};

const filenames = [
  "MV_01_ImOKYoureOK_EN.docx",
  "MV_02_SocialisationReport_EN.docx",
  "MV_03_TransculturalGenogram_EN.docx",
  "MV_04_LifeLine_EN.docx",
  "MV_05_TheStrangerTheOther_EN.docx",
  "MV_06_InterculturalCompetences_EN.docx",
  "MV_07_IntersectionalityAudit_EN.docx",
  "MV_08_TrueNorth_EN.docx",
  "MV_09_JohariWindow_EN.docx",
  "MV_10_LogicalLevelsBateson_EN.docx",
  "MV_11_LearysRose_EN.docx"
];

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function firstSentence(text) {
  const match = text.match(/[^.!?]+[.!?]/);
  return match ? match[0].trim() : text.trim();
}

function extractTitle(html) {
  const firstRow = html.match(/<table><tr><td>[\s\S]*?<\/td><td>([\s\S]*?)<\/td><\/tr><\/table>/);
  if (!firstRow) return null;

  const titleMatch = firstRow[1].match(/<strong>([\s\S]*?)<\/strong>/);
  if (!titleMatch) return null;

  return decodeEntities(titleMatch[1].replace(/<[^>]+>/g, " "));
}

function extractThemes(html) {
  const themesMatch = html.match(/<strong>([^<]*·[^<]*)<\/strong>/);
  if (!themesMatch) return [];

  return themesMatch[1]
    .split("·")
    .map((theme) => decodeEntities(theme))
    .filter(Boolean);
}

function extractIntro(html) {
  const whatIsMatch = html.match(/<strong>What is[\s\S]*?<\/strong>[\s\S]*?<p>([^<]+)<\/p>/i);
  if (whatIsMatch) {
    return firstSentence(decodeEntities(whatIsMatch[1]));
  }

  const introductionMatch = html.match(/<strong>Introduction[\s\S]*?<\/strong>[\s\S]*?<p>([^<]+)<\/p>/i);
  if (introductionMatch) {
    return firstSentence(decodeEntities(introductionMatch[1]));
  }

  const themesEnd = html.search(/<strong>[^<]*·[^<]*<\/strong><\/p><\/td><\/tr><\/table>/);
  if (themesEnd === -1) return null;

  let rest = html.slice(themesEnd);
  rest = rest.replace(
    /<table><tr><td><p><strong>\d+\s*<\/strong><\/p><p><strong>[^<]*<\/strong><\/p><\/td><\/tr><\/table>/g,
    ""
  );
  rest = rest.replace(/<table><tr><td><p><strong>[A-Z]\s*<\/strong><\/p><p><strong>[^<]*<\/strong><\/p><\/td><\/tr><\/table>/g, "");
  rest = rest.replace(/<p><strong>[^<]{3,120}<\/strong><\/p>/g, "");

  const paragraphMatch = rest.match(/<p>([^<]{20,})<\/p>/);
  if (!paragraphMatch) return null;

  return firstSentence(decodeEntities(paragraphMatch[1]));
}

async function extractWorksheet(filename) {
  const filePath = path.join(zienDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filename}`);
  }

  const { value: html } = await mammoth.convertToHtml({ path: filePath });
  const id = filename.match(/^(MV_\d+)/)[1];
  const title = extractTitle(html);
  const themes = extractThemes(html);
  const intro = extractIntro(html);

  if (!title) throw new Error(`Could not extract title from ${filename}`);
  if (!themes.length) throw new Error(`Could not extract themes from ${filename}`);
  if (!intro) throw new Error(`Could not extract intro from ${filename}`);

  const filenameNl = nlFilenames[id];
  if (!filenameNl) throw new Error(`No NL filename mapped for ${id}`);

  const nlPath = path.join(zienDir, filenameNl);
  if (!fs.existsSync(nlPath)) {
    throw new Error(`Missing NL file: ${filenameNl}`);
  }

  return { id, filenameEn: filename, filenameNl, title, themes, intro };
}

const worksheets = [];
for (const filename of filenames) {
  worksheets.push(await extractWorksheet(filename));
}

const outputPath = path.join(root, "src", "data", "worksheets.js");
const content = `export const worksheets = ${JSON.stringify(worksheets, null, 2)};\n`;
fs.writeFileSync(outputPath, content, "utf8");

console.log(`Wrote ${worksheets.length} worksheets to ${outputPath}`);
