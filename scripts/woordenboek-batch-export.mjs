#!/usr/bin/env node
/**
 * Exporteert de volgende batch termen zonder Engelse vertaling,
 * klaar om in Claude te plakken.
 *
 * Gebruik:
 *   npm run woordenboek:batch
 *   npm run woordenboek:batch -- --size 20
 *   npm run woordenboek:batch -- --size 40 --offset 0
 *   npm run woordenboek:batch -- --letter A
 *   npm run woordenboek:batch -- --cluster algemeen
 *   npm run woordenboek:batch -- --out tmp/batch-01.json
 *
 * Standaard: eerste 40 open termen, naar stdout (+ korte statusregel op stderr).
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const entriesPath = join(root, "src/data/woordenboek/entries.json");

function arg(naam, fallback = null) {
  const i = process.argv.indexOf(`--${naam}`);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

function heeftFlag(naam) {
  return process.argv.includes(`--${naam}`);
}

const size = Number(arg("size", "40"));
const offset = Number(arg("offset", "0"));
const letter = arg("letter");
const cluster = arg("cluster");
const outPad = arg("out");

if (!Number.isFinite(size) || size < 1) {
  console.error("Ongeldige --size");
  process.exit(1);
}

const lexicon = JSON.parse(readFileSync(entriesPath, "utf8"));
const alle = lexicon.entries;
const open = alle.filter((e) => !e.term_en || !e.definition_en);

let gefilterd = open;
if (letter) {
  const L = letter.toUpperCase();
  gefilterd = gefilterd.filter((e) => e.letter === L);
}
if (cluster) {
  gefilterd = gefilterd.filter((e) => (e.clusters || []).includes(cluster));
}

const batch = gefilterd.slice(offset, offset + size).map((e) => ({
  id: e.id,
  term_nl: e.term_nl,
  definition_nl: e.definition_nl,
  clusters: e.clusters || [],
}));

const status = {
  totaal: alle.length,
  al_vertaald: alle.length - open.length,
  nog_open: open.length,
  filter_letter: letter || null,
  filter_cluster: cluster || null,
  offset,
  size,
  in_deze_batch: batch.length,
  volgende_offset: offset + batch.length,
  klaar: open.length === 0 || batch.length === 0,
};

const header = [
  `Batch woordenboek-vertaling`,
  `Voortgang: ${status.al_vertaald}/${status.totaal} vertaald · ${status.nog_open} open`,
  `Deze batch: ${status.in_deze_batch} termen (offset ${offset})`,
  status.klaar
    ? `Geen open termen meer${letter || cluster ? " met dit filter" : ""}.`
    : `Volgende keer: npm run woordenboek:batch -- --offset ${status.volgende_offset} --size ${size}`,
  ``,
  `Plak alles hieronder (inclusief de JSON) in Claude, ná de vertaalprompt.`,
  ``,
].join("\n");

const lichaam = JSON.stringify(batch, null, 2);
const output = `${header}${lichaam}\n`;

if (outPad) {
  mkdirSync(dirname(join(root, outPad)), { recursive: true });
  const abs = join(root, outPad);
  writeFileSync(abs, output);
  console.error(`Geschreven: ${outPad}`);
} else {
  process.stdout.write(output);
}

console.error(JSON.stringify(status));
