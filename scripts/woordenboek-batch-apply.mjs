#!/usr/bin/env node
/**
 * Past een Claude-batch (JSON-array met id / term_en / definition_en) toe
 * op src/data/woordenboek/entries.json.
 *
 * Gebruik:
 *   npm run woordenboek:apply -- pad/naar/claude-antwoord.json
 *   npm run woordenboek:apply -- --dry-run pad/naar/claude-antwoord.json
 *
 * Het bestand mag pure JSON zijn, of tekst mét JSON erin (de eerste [ … ]
 * array wordt gebruikt). Items met onbekende id worden overgeslagen.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const entriesPath = join(root, "src/data/woordenboek/entries.json");

const dryRun = process.argv.includes("--dry-run");
const padArg = process.argv.filter((a) => a !== "--dry-run" && !a.startsWith("-")).at(-1);

if (!padArg || padArg.endsWith("woordenboek-batch-apply.mjs")) {
  console.error("Gebruik: npm run woordenboek:apply -- [--dry-run] pad/naar/antwoord.json");
  process.exit(1);
}

const ruw = readFileSync(resolve(padArg), "utf8");

function haalArray(tekst) {
  try {
    const parsed = JSON.parse(tekst);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // ga door: haal eerste array uit omringende tekst
  }
  const start = tekst.indexOf("[");
  const end = tekst.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Geen JSON-array gevonden in het bestand.");
  }
  return JSON.parse(tekst.slice(start, end + 1));
}

const batch = haalArray(ruw);
if (!Array.isArray(batch) || batch.length === 0) {
  console.error("Batch is leeg of geen array.");
  process.exit(1);
}

const lexicon = JSON.parse(readFileSync(entriesPath, "utf8"));
const index = new Map(lexicon.entries.map((e, i) => [e.id, i]));

let bijgewerkt = 0;
let overgeslagen = 0;
let onbekend = 0;
const notes = [];

for (const item of batch) {
  if (!item || typeof item !== "object" || !item.id) {
    overgeslagen += 1;
    continue;
  }
  const i = index.get(item.id);
  if (i === undefined) {
    onbekend += 1;
    console.error(`Onbekend id: ${item.id}`);
    continue;
  }
  const term = typeof item.term_en === "string" ? item.term_en.trim() : "";
  const def = typeof item.definition_en === "string" ? item.definition_en.trim() : "";
  if (!term || !def) {
    overgeslagen += 1;
    console.error(`Incomplete vertaling voor ${item.id}`);
    continue;
  }
  lexicon.entries[i].term_en = term;
  lexicon.entries[i].definition_en = def;
  bijgewerkt += 1;
  if (item.note) notes.push({ id: item.id, note: item.note });
}

const open = lexicon.entries.filter((e) => !e.term_en || !e.definition_en).length;

console.log(
  JSON.stringify(
    {
      dry_run: dryRun,
      in_batch: batch.length,
      bijgewerkt,
      overgeslagen,
      onbekend,
      notes: notes.length,
      nog_open_na_apply: dryRun ? undefined : open,
      note_items: notes,
    },
    null,
    2
  )
);

if (dryRun) {
  console.error("Dry-run: entries.json niet gewijzigd.");
  process.exit(0);
}

if (bijgewerkt === 0) {
  console.error("Niets bijgewerkt — bestand onaangeroerd.");
  process.exit(1);
}

lexicon.meta = {
  ...lexicon.meta,
  count: lexicon.entries.length,
  updated_en_at: new Date().toISOString().slice(0, 10),
};

writeFileSync(entriesPath, `${JSON.stringify(lexicon, null, 2)}\n`);
console.error(`Bijgewerkt: ${entriesPath} (${bijgewerkt} termen). Nog open: ${open}.`);
