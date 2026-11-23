/**
 * Genereert thema_ids voor werkbladen, werkvormen en bibliotheekmaterialen.
 * Run: node scripts/stel-thema-indeling-voor.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { extractMwFromWerkbladCode, normalizeMwId } from "../src/lib/werkvormenKiezer.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const THEME_ORDER = [
  "identiteit-achtergrond",
  "zelfkennis-reflectie",
  "waarden-integriteit",
  "afweging-besluitvorming",
  "denkfouten-valkuilen",
  "dialoog",
  "empathie-perspectief",
  "moed-handelen",
  "vertrouwen-relaties",
  "leiderschap-organisatiecultuur",
  "koers-houden",
];

const IGNORE_TAGS = new Set(
  [
    "tp",
    "hrm",
    "hbo",
    "docenten",
    "onderzoekers",
    "community",
    "gesprekskaarten",
    "zien",
    "voelen",
    "wegen",
    "handelen",
    ", ",
    "morele scenario",
  ].map((s) => s.toLowerCase()),
);

const TAG_TO_THEMA = {
  identiteit: "identiteit-achtergrond",
  cultuur: "identiteit-achtergrond",
  socialisatie: "identiteit-achtergrond",
  achtergrond: "identiteit-achtergrond",
  familie: "identiteit-achtergrond",
  herkomst: "identiteit-achtergrond",
  levensgeschiedenis: "identiteit-achtergrond",
  diversiteit: "identiteit-achtergrond",
  intersectionaliteit: "identiteit-achtergrond",
  privilege: "identiteit-achtergrond",
  competenties: "identiteit-achtergrond",
  zelfbewustzijn: "zelfkennis-reflectie",
  zelfonderzoek: "zelfkennis-reflectie",
  reflectie: "zelfkennis-reflectie",
  "blinde vlekken": "zelfkennis-reflectie",
  feedback: "zelfkennis-reflectie",
  keerpunten: "zelfkennis-reflectie",
  authenticiteit: "zelfkennis-reflectie",
  "transactionele analyse": "zelfkennis-reflectie",
  grondposities: "zelfkennis-reflectie",
  waarden: "waarden-integriteit",
  integriteit: "waarden-integriteit",
  plicht: "waarden-integriteit",
  gevolgen: "waarden-integriteit",
  deugd: "waarden-integriteit",
  overtuigingen: "waarden-integriteit",
  "theory-in-use": "waarden-integriteit",
  "espoused theory": "waarden-integriteit",
  "morele bronnen": "waarden-integriteit",
  besluitvorming: "afweging-besluitvorming",
  "ethische afweging": "afweging-besluitvorming",
  redeneren: "afweging-besluitvorming",
  argumentatie: "afweging-besluitvorming",
  "morele toets": "afweging-besluitvorming",
  "morele scenario's": "afweging-besluitvorming",
  valkuilen: "denkfouten-valkuilen",
  denkfouten: "denkfouten-valkuilen",
  "morele blinde vlekken": "denkfouten-valkuilen",
  "interculturele dialoog": "dialoog",
  "socratische dialoog": "dialoog",
  "socratisch gesprek": "dialoog",
  gespreksvoering: "dialoog",
  "gezamenlijke reflectie": "dialoog",
  "onderzoekend leren": "dialoog",
  "morele taal": "dialoog",
  interactie: "dialoog",
  dialoog: "dialoog",
  gesprek: "dialoog",
  empathie: "empathie-perspectief",
  "perspectief nemen": "empathie-perspectief",
  "morele verbeelding": "empathie-perspectief",
  moed: "moed-handelen",
  "standpunt innemen": "moed-handelen",
  "moreel handelen": "moed-handelen",
  twijfel: "moed-handelen",
  gedrag: "moed-handelen",
  vertrouwen: "vertrouwen-relaties",
  "morele relaties": "vertrouwen-relaties",
  relaties: "vertrouwen-relaties",
  gedragspatronen: "vertrouwen-relaties",
  beïnvloeding: "vertrouwen-relaties",
  beinvloeding: "vertrouwen-relaties",
  leiderschap: "leiderschap-organisatiecultuur",
  organisatiecultuur: "leiderschap-organisatiecultuur",
  "morele cultuur": "leiderschap-organisatiecultuur",
  beleid: "leiderschap-organisatiecultuur",
  professionaliteit: "leiderschap-organisatiecultuur",
  organisatie: "leiderschap-organisatiecultuur",
  koers: "koers-houden",
  terugkeren: "koers-houden",
  "innerlijk kompas": "koers-houden",
  volhouden: "koers-houden",
};

function normalizeTag(tag) {
  return String(tag ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim();
}

function tagToThemaId(tag) {
  const n = normalizeTag(tag);
  if (!n || IGNORE_TAGS.has(n)) return null;
  return TAG_TO_THEMA[n] ?? null;
}

function pickTopThree(scores) {
  const ranked = THEME_ORDER.filter((id) => (scores[id] ?? 0) > 0).sort((a, b) => {
    const diff = (scores[b] ?? 0) - (scores[a] ?? 0);
    if (diff !== 0) return diff;
    return THEME_ORDER.indexOf(a) - THEME_ORDER.indexOf(b);
  });
  return ranked.slice(0, 3);
}

function themaIdsFromTags(tags, reasons, prefix) {
  const scores = {};
  const reasonList = [];
  for (const tag of tags) {
    const id = tagToThemaId(tag);
    if (!id) continue;
    scores[id] = (scores[id] ?? 0) + 1;
    reasonList.push(`${prefix}tag "${tag}" → ${id}`);
  }
  const ids = pickTopThree(scores);
  return { ids, scores, reasonList };
}

const themasJson = JSON.parse(readFileSync(join(root, "src/data/themas.json"), "utf8"));

function buildKeywordList() {
  const byThema = {};
  for (const id of THEME_ORDER) byThema[id] = new Set();
  for (const t of themasJson.themas) {
    const set = byThema[t.id];
    if (!set) continue;
    for (const w of [...(t.synoniemen_nl ?? []), ...(t.synoniemen_en ?? [])]) {
      if (w) set.add(normalizeTag(w));
    }
    set.add(normalizeTag(t.nl));
    set.add(normalizeTag(t.en));
  }
  for (const [tag, id] of Object.entries(TAG_TO_THEMA)) {
    byThema[id]?.add(normalizeTag(tag));
  }
  return byThema;
}

const KEYWORDS_BY_THEMA = buildKeywordList();

function scoreTextForThemas(text) {
  const norm = normalizeTag(text).replace(/-/g, " ");
  const scores = {};
  for (const id of THEME_ORDER) {
    let hits = 0;
    for (const kw of KEYWORDS_BY_THEMA[id]) {
      if (kw.length < 3) continue;
      if (norm.includes(kw)) hits++;
    }
    if (hits > 0) scores[id] = hits;
  }
  return scores;
}

function mergeScores(...parts) {
  const out = {};
  for (const p of parts) {
    for (const [id, n] of Object.entries(p)) {
      out[id] = (out[id] ?? 0) + n;
    }
  }
  return out;
}

// ─── Inventaris ─────────────────────────────────────────────────────────────
const inventory = new Map();

function addInventory(tag, file) {
  const key = String(tag ?? "").trim();
  if (!key) return;
  if (!inventory.has(key)) inventory.set(key, { tag: key, count: 0, files: new Set() });
  const e = inventory.get(key);
  e.count++;
  e.files.add(file);
}

const werkbladen = JSON.parse(readFileSync(join(root, "src/data/werkbladen.json"), "utf8"));
const werkvormenData = JSON.parse(readFileSync(join(root, "src/data/werkvormen.json"), "utf8"));
const { bibliotheekData } = await import(pathToFileURL(join(root, "src/data/bibliotheekData.js")).href);

for (const wb of werkbladen) {
  for (const t of [...(wb.themas?.nl ?? []), ...(wb.themas?.en ?? [])]) {
    addInventory(t, "werkbladen.json");
  }
}
for (const lang of ["nl", "en"]) {
  for (const stap of bibliotheekData[lang]) {
    for (const m of stap.materialen) {
      for (const t of m.themas ?? []) addInventory(t, "bibliotheekData.js");
    }
  }
}

const invLines = [
  "# Thema-inventaris (vrije tags)",
  "",
  `Gegenereerd: ${new Date().toISOString().slice(0, 10)}`,
  "",
  "| Tag | Aantal | Bestand(en) |",
  "|-----|--------|-------------|",
  ...[...inventory.values()]
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .map((e) => `| ${e.tag.replace(/\|/g, "\\|")} | ${e.count} | ${[...e.files].join(", ")} |`),
];
writeFileSync(join(root, "docs/thema-inventaris.md"), invLines.join("\n"), "utf8");

// ─── Werkbladen ─────────────────────────────────────────────────────────────
const rapport = [];
const werkbladThemaMap = new Map();
const wbByMw = new Map();

for (const wb of werkbladen) {
  const tags = [...new Set([...(wb.themas?.nl ?? []), ...(wb.themas?.en ?? [])])];
  const { ids, reasonList } = themaIdsFromTags(tags, [], wb.id);
  wb.thema_ids = ids;
  werkbladThemaMap.set(wb.id, { ids, reasons: reasonList, titel: wb.titel?.nl ?? wb.id });
  const mw = extractMwFromWerkbladCode(wb.werkblad_code);
  if (mw) {
    const key = normalizeMwId(mw);
    if (!wbByMw.has(key)) wbByMw.set(key, []);
    wbByMw.get(key).push(ids);
  }
  rapport.push({
    id: wb.id,
    titel: wb.titel?.nl ?? wb.id,
    ids,
    reasons: reasonList.length ? reasonList : ids.length ? [] : ["geen tag- of trefwoordtreffer"],
    soort: "werkblad",
  });
}

writeFileSync(join(root, "src/data/werkbladen.json"), JSON.stringify(werkbladen, null, 2) + "\n", "utf8");

// ─── Bibliotheek materialen ─────────────────────────────────────────────────
const bibThemaById = new Map();

for (const lang of ["nl", "en"]) {
  for (const stap of bibliotheekData[lang]) {
    for (const m of stap.materialen) {
      if (lang === "nl") {
        const { ids, reasonList } = themaIdsFromTags(m.themas ?? [], [], m.id);
        bibThemaById.set(m.id, { ids, reasons: reasonList, titel: m.titel });
        m.thema_ids = ids;
        if (ids.length === 0) {
          rapport.push({
            id: m.id,
            titel: m.titel,
            ids,
            reasons: ["geen tag- of trefwoordtreffer"],
            soort: "bibliotheek",
          });
        } else {
          rapport.push({
            id: m.id,
            titel: m.titel,
            ids,
            reasons: reasonList,
            soort: "bibliotheek",
          });
        }
      } else {
        m.thema_ids = bibThemaById.get(m.id)?.ids ?? [];
      }
    }
  }
}

let bibContent = readFileSync(join(root, "src/data/bibliotheekData.js"), "utf8");
for (const [id, { ids }] of bibThemaById) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const line = `thema_ids: ${JSON.stringify(ids)},`;
  const re = new RegExp(
    `(id:\\s*'${escaped}'[\\s\\S]*?themas:\\s*\\[[^\\]]*\\],)\\s*(?:thema_ids:\\s*\\[[^\\]]*\\],\\s*)?`,
    "g",
  );
  bibContent = bibContent.replace(re, `$1 ${line}`);
}
writeFileSync(join(root, "src/data/bibliotheekData.js"), bibContent, "utf8");

// ─── Werkvormen ─────────────────────────────────────────────────────────────
let werkvormenContent = readFileSync(join(root, "src/data/werkvormen.json"), "utf8");
werkvormenContent = werkvormenContent.replace(/\r\n/g, "\n");

for (const wv of werkvormenData.werkvormen) {
  const text = [wv.categorie, wv.titel?.nl, wv.beschrijving?.nl].filter(Boolean).join(" ");
  const kwScores = scoreTextForThemas(text);
  const linkedLists = wbByMw.get(normalizeMwId(wv.id)) ?? [];
  const linkedScores = {};
  for (const list of linkedLists) {
    for (const id of list) linkedScores[id] = (linkedScores[id] ?? 0) + 2;
  }
  const scores = mergeScores(kwScores, linkedScores);
  const ids = pickTopThree(scores);
  wv.thema_ids = ids;

  const reasons = [];
  if (Object.keys(kwScores).length) {
    reasons.push(`trefwoorden in categorie/titel/beschrijving: ${Object.keys(kwScores).join(", ")}`);
  }
  if (linkedLists.length) {
    reasons.push(`werkbladen MW: ${[...new Set(linkedLists.flat())].join(", ")}`);
  }
  if (!ids.length) {
    reasons.push("geen tag- of trefwoordtreffer");
  }

  rapport.push({
    id: wv.id,
    titel: wv.titel?.nl ?? wv.id,
    ids,
    reasons,
    soort: "werkvorm",
  });

  const escaped = wv.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const themaLine = `   "thema_ids": ${JSON.stringify(ids)},\n`;
  const idRe = new RegExp(`   "id": "${escaped}",\\n(?:   "thema_ids": \\[[^\\]]*\\],\\n)?`);
  werkvormenContent = werkvormenContent.replace(idRe, `   "id": "${escaped}",\n${themaLine}`);
}

writeFileSync(join(root, "src/data/werkvormen.json"), werkvormenContent.replace(/\n/g, "\r\n"), "utf8");

// ─── Rapport ────────────────────────────────────────────────────────────────
const zonder = rapport.filter((r) => !r.ids.length);
const met = rapport.filter((r) => r.ids.length);

const conceptLines = [
  "# Thema-indeling concept",
  "",
  "**Concept, nog niet goedgekeurd door Richard.**",
  "",
  `Gegenereerd: ${new Date().toISOString().slice(0, 10)}`,
  "",
  "## Items zonder thema",
  "",
  ...(zonder.length
    ? zonder.map((r) => `- **${r.id}** — ${r.titel} (${r.soort})`)
    : ["Geen."]),
  "",
  "## Volledige indeling",
  "",
  "| id | titel | thema's | reden |",
  "|----|-------|---------|-------|",
  ...met
    .sort((a, b) => THEME_ORDER.indexOf(a.ids[0]) - THEME_ORDER.indexOf(b.ids[0]))
    .map((r) => {
      const labels = r.ids.join(", ");
      const reden = r.reasons.join("; ").replace(/\|/g, "\\|");
      return `| ${r.id} | ${String(r.titel).replace(/\|/g, "\\|")} | ${labels} | ${reden} |`;
    }),
  "",
  ...(zonder.length
    ? [
        "## Zonder thema (detail)",
        "",
        "| id | titel | reden |",
        "|----|-------|-------|",
        ...zonder.map(
          (r) =>
            `| ${r.id} | ${String(r.titel).replace(/\|/g, "\\|")} | ${r.reasons.join("; ").replace(/\|/g, "\\|")} |`,
        ),
      ]
    : []),
];
writeFileSync(join(root, "docs/thema-indeling-concept.md"), conceptLines.join("\n"), "utf8");

console.log(`✓ thema-indeling: ${met.length} met thema, ${zonder.length} zonder`);
console.log("  docs/thema-inventaris.md");
console.log("  docs/thema-indeling-concept.md");