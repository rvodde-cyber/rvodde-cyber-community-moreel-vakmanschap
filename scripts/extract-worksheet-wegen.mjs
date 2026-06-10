import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mammoth from "mammoth";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const filename = "MV_12_MoralDeliberation_EN.docx";
const filePath = path.join(root, "public", "downloads", "wegen", filename);

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
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
  const aboutMatch = html.match(
    /<strong>1\s+About Moral Deliberation[\s\S]*?<\/table>\s*<p>([^<]+)<\/p>/i
  );
  if (!aboutMatch) return null;

  return firstSentence(decodeEntities(aboutMatch[1]));
}

if (!fs.existsSync(filePath)) {
  throw new Error(`Missing file: ${filename}`);
}

const { value: html } = await mammoth.convertToHtml({ path: filePath });
const worksheet = {
  id: "MV_12",
  filename,
  title: extractTitle(html),
  themes: extractThemes(html),
  intro: extractIntro(html)
};

if (!worksheet.title) throw new Error("Could not extract title");
if (!worksheet.themes.length) throw new Error("Could not extract themes");
if (!worksheet.intro) throw new Error("Could not extract intro");

const outputPath = path.join(root, "src", "data", "worksheetsWegen.js");
fs.writeFileSync(
  outputPath,
  `export const worksheetWegen = ${JSON.stringify(worksheet, null, 2)};\n`,
  "utf8"
);

console.log("Wrote worksheet to", outputPath);
console.log(worksheet);
