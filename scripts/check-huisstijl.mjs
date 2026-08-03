#!/usr/bin/env node
/**
 * Huisstijl-consistentiecheck — lees-only, rapporteert bevindingen.
 *
 * Drie controlegebieden:
 *   1. MAPS / Lakmoesproef-scheiding
 *   2. Bordeaux badges (kleurcanon stap 3 = #993556)
 *   3. ETZ-uniformen (wit + blauwe accenten, besloten, gescheiden van algemene content)
 *
 * Gebruik:
 *   node scripts/check-huisstijl.mjs
 *   npm run huisstijl:check
 *
 * Afsluitcode: 0 = alles OK, 1 = één of meer bevindingen.
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// ── kleurcanon ────────────────────────────────────────────────────────────────
const KLEURCANON = {
  zien:      { stap: 1, kleur: "#185fa5", cssProp: "--kleur-zien" },
  voelen:    { stap: 2, kleur: "#854f0b", cssProp: "--kleur-voelen" },
  wegen:     { stap: 3, kleur: "#993556", cssProp: "--kleur-wegen" },
  handelen:  { stap: 4, kleur: "#0f6e56", cssProp: "--kleur-handelen" },
  volhouden: { stap: 5, kleur: "#993c1d", cssProp: "--kleur-volhouden" },
};
const BORDEAUX = "#993556"; // stap 3 Wegen — enige goedgekeurde use voor complexiteitsbadge

// ── helpers ───────────────────────────────────────────────────────────────────

function read(relPath) {
  try {
    return readFileSync(join(root, relPath), "utf8");
  } catch {
    return null;
  }
}

function readJson(relPath) {
  const text = read(relPath);
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    return { __parseError: e.message };
  }
}

/** Verwijder single-line comments zodat regex's niet door commentaar misleid worden. */
function stripLineComments(src) {
  return src.replace(/\/\/[^\n]*/g, "");
}

/**
 * Vind de regel waarop een `id: '<ID>'` in een JS-bronbestand staat.
 * Geeft het stapnummer terug dat in de omringende context wordt gevonden,
 * of null als het niet lukt.
 */
function findStapForId(src, id) {
  const lines = src.split("\n");
  const idLine = lines.findIndex((l) => l.includes(`id: '${id}'`) || l.includes(`id: "${id}"`));
  if (idLine === -1) return null;

  // Zoek terug naar de dichtstbijzijnde `stap:` definitie boven deze regel
  for (let i = idLine; i >= 0; i--) {
    const stapMatch = lines[i].match(/stap:\s*(\d+)/);
    if (stapMatch) return Number(stapMatch[1]);
  }
  return null;
}

// ── bevindingen ───────────────────────────────────────────────────────────────

const findings = [];

function ok(label) {
  console.log(`  ✅ ${label}`);
}

function warn(label, detail) {
  console.warn(`  ⚠️  ${label}${detail ? ` — ${detail}` : ""}`);
  findings.push({ level: "warn", label, detail });
}

function fail(label, detail) {
  console.error(`  ❌ ${label}${detail ? ` — ${detail}` : ""}`);
  findings.push({ level: "fail", label, detail });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. MAPS / LAKMOESPROEF-SCHEIDING
// ═══════════════════════════════════════════════════════════════════════════════

console.log("\n── 1. MAPS / Lakmoesproef-scheiding ──────────────────────────────────────");

// 1a. bibliotheekData.js: ID's in correct stap-blok
const bibliotheekSrc = read("src/data/bibliotheekData.js");
if (!bibliotheekSrc) {
  fail("src/data/bibliotheekData.js niet gevonden");
} else {
  const stapLM   = findStapForId(bibliotheekSrc, "LM_01");
  const stapMAPS = findStapForId(bibliotheekSrc, "MAPS_01");

  if (stapLM === 3) {
    ok(`LM_01 (Lakmoesproef) staat in stap 3 (Wegen)`);
  } else if (stapLM === null) {
    warn("LM_01 niet gevonden in bibliotheekData.js");
  } else {
    fail(`LM_01 staat in stap ${stapLM}, verwacht stap 3 (Wegen)`);
  }

  if (stapMAPS === 4) {
    ok(`MAPS_01 staat in stap 4 (Handelen)`);
  } else if (stapMAPS === null) {
    warn("MAPS_01 niet gevonden in bibliotheekData.js");
  } else {
    fail(`MAPS_01 staat in stap ${stapMAPS}, verwacht stap 4 (Handelen)`);
  }

  // Cross-contamination: LM mag niet in stap 4, MAPS niet in stap 3
  if (stapLM === 4) fail("LM_01 staat in stap 4 (Handelen) — zelfde stap als MAPS, dit vermengt de concepten");
  if (stapMAPS === 3) fail("MAPS_01 staat in stap 3 (Wegen) — zelfde stap als Lakmoesproef, dit vermengt de concepten");
}

// 1b. stappen.js: tools-arrays per stap
const stappenSrc = read("src/data/stappen.js");
if (!stappenSrc) {
  warn("src/data/stappen.js niet gevonden");
} else {
  const lines = stappenSrc.split("\n");

  // Zoek stap-blokken en hun tools
  let currentStap = null;
  const stapTools = {};
  for (const line of lines) {
    const stapMatch = line.match(/nummer:\s*(\d+)/);
    if (stapMatch) {
      currentStap = Number(stapMatch[1]);
      stapTools[currentStap] = [];
    }
    if (currentStap !== null) {
      const toolsMatch = line.match(/tools:\s*\[([^\]]*)\]/);
      if (toolsMatch) {
        // Match both single- and double-quoted strings
        const toolNames =
          toolsMatch[1].match(/["']([^"']+)["']/g)?.map((s) => s.replace(/["']/g, "")) ?? [];
        stapTools[currentStap] = toolNames;
      }
    }
  }

  // Lakmoesproef ↔ stap 3
  const lmInStap3 = (stapTools[3] ?? []).some((t) => t.toLowerCase().includes("lakmoesproef") || t.toLowerCase().includes("litmus"));
  const mapsInStap4 = (stapTools[4] ?? []).some((t) => t.toLowerCase().includes("maps"));
  const lmInStap4 = (stapTools[4] ?? []).some((t) => t.toLowerCase().includes("lakmoesproef") || t.toLowerCase().includes("litmus"));
  const mapsInStap3 = (stapTools[3] ?? []).some((t) => t.toLowerCase().includes("maps"));

  if (lmInStap3) ok("Lakmoesproef-tool staat in tools-array van stap 3");
  else warn("Lakmoesproef-tool ontbreekt in tools-array van stap 3 (stappen.js)");

  if (mapsInStap4) ok("MAPS-tool staat in tools-array van stap 4");
  else warn("MAPS-tool ontbreekt in tools-array van stap 4 (stappen.js)");

  if (lmInStap4) fail("Lakmoesproef-tool staat ook in tools-array van stap 4 — vermenging met MAPS");
  if (mapsInStap3) fail("MAPS-tool staat ook in tools-array van stap 3 — vermenging met Lakmoesproef");
}

// 1c. hub-apps.json: beschrijvingen bewaken de scheiding
const hubApps = readJson("moralcraftsmanship-platform/hub-apps.json");
if (!hubApps || hubApps.__parseError) {
  warn("moralcraftsmanship-platform/hub-apps.json niet leesbaar", hubApps?.__parseError);
} else {
  const apps = hubApps.apps ?? [];
  const mapsApp = apps.find((a) => a.id === "maps-trilogie");
  const lmApp   = apps.find((a) => a.id === "lakmoesproef");

  if (!mapsApp) {
    warn("App 'maps-trilogie' niet gevonden in hub-apps.json");
  } else {
    const desc = mapsApp.omschrijving ?? "";
    if (/neutraal|nooit zorg/i.test(desc)) {
      ok(`MAPS-app beschrijving benadrukt neutrale positionering`);
    } else {
      warn(
        "MAPS-app beschrijving mist 'Neutraal' of 'nooit zorg-specifiek'",
        `huidig: "${desc}"`
      );
    }
  }

  if (!lmApp) {
    warn("App 'lakmoesproef' niet gevonden in hub-apps.json");
  } else {
    const desc = lmApp.omschrijving ?? "";
    if (/gescheiden van maps/i.test(desc)) {
      ok(`Lakmoesproef-app beschrijving vermeldt scheiding van MAPS`);
    } else {
      warn(
        "Lakmoesproef-app beschrijving mist 'strikt gescheiden van MAPS'",
        `huidig: "${desc}"`
      );
    }

    // MAPS mag niet in beschrijving van Lakmoesproef én vice versa (inhoudelijke contaminatie)
    if (/\bMAPS\b/i.test(desc) && !/gescheiden/i.test(desc)) {
      fail("Lakmoesproef-app beschrijving noemt 'MAPS' zonder scheidingsmarkering");
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. BORDEAUX BADGES (kleurcanon stap 3 = #993556)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("\n── 2. Bordeaux badges (#993556 kleurcanon) ───────────────────────────────");

// 2a. CSS custom property
const cssText = read("src/index.css");
if (!cssText) {
  warn("src/index.css niet gevonden");
} else {
  const cssMatch = cssText.match(/--kleur-wegen\s*:\s*([^;]+);/);
  if (cssMatch) {
    const cssVal = cssMatch[1].trim().toLowerCase();
    if (cssVal === BORDEAUX) {
      ok(`--kleur-wegen in index.css = ${cssVal}`);
    } else {
      fail(`--kleur-wegen in index.css = "${cssVal}", verwacht "${BORDEAUX}"`);
    }
  } else {
    warn("--kleur-wegen CSS-variabele niet gevonden in index.css");
  }
}

// 2b. stappen.js: stap 3 kleur — zoek het object-blok voor nummer:3 en lees zijn kleur
if (stappenSrc) {
  // Vind het stap-3-blok als tekst-segment tussen nummer: 3 en nummer: 4
  const stap3Match = stappenSrc.match(/nummer:\s*3[\s\S]*?nummer:\s*4/);
  const foundKleur = stap3Match
    ? (stap3Match[0].match(/\bkleur:\s*["']([^"']+)["']/) ?? [])[1]?.toLowerCase() ?? null
    : null;
  if (foundKleur === BORDEAUX) {
    ok(`stappen.js stap 3 kleur = ${foundKleur}`);
  } else if (foundKleur) {
    fail(`stappen.js stap 3 kleur = "${foundKleur}", verwacht "${BORDEAUX}"`);
  } else {
    warn("Kleur van stap 3 niet gevonden in stappen.js");
  }
}

// 2c. bibliotheekData.js: NL + EN stap 3 kleur
if (bibliotheekSrc) {
  const stripped = stripLineComments(bibliotheekSrc);
  const stapBlokken = stripped.split(/(?=stap:\s*3[^0-9])/);
  const stap3Blokken = stapBlokken.filter((b) => /stap:\s*3[^0-9]/.test(b.slice(0, 80)));

  const kleuren = stap3Blokken.map((b) => {
    const m = b.match(/kleur:\s*['"]([^'"]+)['"]/);
    return m ? m[1].toLowerCase() : null;
  }).filter(Boolean);

  if (kleuren.length === 0) {
    warn("Stap-3-kleur niet gevonden in bibliotheekData.js");
  } else {
    kleuren.forEach((k, i) => {
      if (k === BORDEAUX) {
        ok(`bibliotheekData.js stap 3 blok ${i + 1} kleur = ${k}`);
      } else {
        fail(`bibliotheekData.js stap 3 blok ${i + 1} kleur = "${k}", verwacht "${BORDEAUX}"`);
      }
    });
  }
}

// 2d. constants.js: COMPLEXITY_COLOR
const constantsSrc = read("src/data/gesprekskaarten/constants.js");
if (!constantsSrc) {
  warn("src/data/gesprekskaarten/constants.js niet gevonden");
} else {
  const m = constantsSrc.match(/COMPLEXITY_COLOR\s*=\s*["']([^"']+)["']/);
  if (m) {
    const val = m[1].toLowerCase();
    if (val === BORDEAUX) {
      ok(`COMPLEXITY_COLOR in constants.js = ${val}`);
    } else {
      fail(`COMPLEXITY_COLOR in constants.js = "${val}", verwacht "${BORDEAUX}"`);
    }
  } else {
    warn("COMPLEXITY_COLOR niet gevonden in constants.js");
  }
}

// 2e. ModelWheel.jsx: stap-3-segment gebruikt bordeaux
const modelWheelSrc = read("src/components/ModelWheel.jsx");
if (!modelWheelSrc) {
  warn("src/components/ModelWheel.jsx niet gevonden");
} else {
  // Het bordeaux-segment moet aanwezig zijn in de SVG-data
  const hasBorauxSegment = new RegExp(BORDEAUX.replace("#", "#?"), "i").test(modelWheelSrc) ||
    /"#993556"/i.test(modelWheelSrc);
  if (hasBorauxSegment) {
    ok(`ModelWheel.jsx bevat bordeaux segment (stap 3)`);
  } else {
    warn(`ModelWheel.jsx heeft geen bordeaux-kleur (${BORDEAUX}) voor stap-3-segment`);
  }
}

// 2f. hubBadge-definities: BADGE_LABELS in WorkshopHub.jsx moet beide badgetypes kennen
const hubJsx = read("src/pages/workshop/WorkshopHub.jsx");
if (!hubJsx) {
  warn("src/pages/workshop/WorkshopHub.jsx niet gevonden");
} else {
  const hasWorkshopBadge = /workshop/.test(hubJsx);
  const hasAltijdBadge  = /altijd/.test(hubJsx);
  if (hasWorkshopBadge && hasAltijdBadge) {
    ok(`WorkshopHub.jsx definieert badge-labels voor 'workshop' en 'altijd'`);
  } else {
    if (!hasWorkshopBadge) warn("WorkshopHub.jsx mist badge-definitie voor type 'workshop'");
    if (!hasAltijdBadge)  warn("WorkshopHub.jsx mist badge-definitie voor type 'altijd'");
  }

  // Verifieer dat BADGE_LABELS ook daadwerkelijk een object heeft
  if (!/BADGE_LABELS\s*=\s*\{/.test(hubJsx)) {
    warn("WorkshopHub.jsx heeft geen BADGE_LABELS-object (badges worden niet vertaald naar labels)");
  } else {
    ok("WorkshopHub.jsx heeft BADGE_LABELS-object");
  }
}

// 2g. Zorg dat bordeaux NIET onbedoeld in ETZ-specifiek materiaal sluipt
// (ETZ = wit + blauw; bordeaux is het wegen-stap-domein)
if (hubApps && !hubApps.__parseError) {
  const etzApp = (hubApps.apps ?? []).find((a) => a.id === "etz-gesprekskaarten");
  if (etzApp) {
    const desc = etzApp.omschrijving ?? "";
    if (/993556|bordeaux/i.test(desc)) {
      fail("ETZ-app beschrijving verwijst naar bordeaux (#993556) — ETZ-huisstijl is wit+blauw");
    } else {
      ok("ETZ-app beschrijving bevat geen bordeaux-referentie");
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. ETZ-UNIFORMEN
// ═══════════════════════════════════════════════════════════════════════════════

console.log("\n── 3. ETZ-uniformen (wit + blauwe accenten, besloten, gescheiden) ─────────");

if (!hubApps || hubApps.__parseError) {
  warn("hub-apps.json niet beschikbaar voor ETZ-check");
} else {
  const apps = hubApps.apps ?? [];
  const etzApp = apps.find((a) => a.id === "etz-gesprekskaarten");

  if (!etzApp) {
    warn("ETZ-app ('etz-gesprekskaarten') niet gevonden in hub-apps.json");
  } else {
    // 3a. Categorie moet 'besloten' zijn
    if (etzApp.categorie === "besloten") {
      ok(`ETZ-app categorie = "besloten"`);
    } else {
      fail(`ETZ-app categorie = "${etzApp.categorie}", verwacht "besloten"`);
    }

    // 3b. Status moet 'live' of ten minste geen 'publiek' zijn
    if (etzApp.status === "live") {
      ok(`ETZ-app status = "live"`);
    } else {
      warn(`ETZ-app status = "${etzApp.status}" (verwacht "live")`);
    }

    // 3c. hubBadge: ETZ is workshop-specifiek, mag niet 'altijd' zijn
    if (etzApp.hubBadge === "workshop") {
      ok(`ETZ-app hubBadge = "workshop" (correct: niet altijd-zichtbaar)`);
    } else if (etzApp.hubBadge === "altijd") {
      warn("ETZ-app hubBadge = 'altijd' — ETZ is workshop-specifiek materiaal, niet permanent zichtbaar");
    } else if (!etzApp.hubBadge) {
      warn("ETZ-app heeft geen hubBadge — wordt niet getoond in de WorkshopHub");
    } else {
      warn(`ETZ-app hubBadge = "${etzApp.hubBadge}" — onbekend badge-type`);
    }

    // 3d. Beschrijving moet ETZ-huisstijl aangeven
    const desc = etzApp.omschrijving ?? "";
    if (/wit met blauwe accenten/i.test(desc)) {
      ok(`ETZ-app beschrijving vermeldt huisstijl "wit met blauwe accenten"`);
    } else {
      warn(
        "ETZ-app beschrijving vermeldt de huisstijl 'wit met blauwe accenten' niet",
        `huidig: "${desc}"`
      );
    }

    // 3e. Beschrijving moet scheiding van algemene content vermelden
    if (/gescheiden van algemene content/i.test(desc)) {
      ok(`ETZ-app beschrijving vermeldt scheiding van algemene content`);
    } else {
      warn(
        "ETZ-app beschrijving mist 'gescheiden van algemene content'",
        `huidig: "${desc}"`
      );
    }

    // 3f. ETZ mag geen URL met /moral-maps of /lakmoesproef bevatten
    const allUrls = [etzApp.url, ...(etzApp.url_extra ?? [])].filter(Boolean);
    for (const url of allUrls) {
      if (/moral-maps|lakmoesproef|maps-trilogie/i.test(url)) {
        fail(`ETZ-app URL "${url}" verwijst naar MAPS- of Lakmoesproef-omgeving`);
      }
    }
    if (allUrls.length > 0) ok(`ETZ-app URL's bevatten geen MAPS/Lakmoesproef-verwijzingen`);

    // 3g. GitHub-repo: ETZ mag het MAPS-repo niet hergebruiken
    if (etzApp.githubRepo && /moral-maps/i.test(etzApp.githubRepo)) {
      fail(`ETZ-app githubRepo "${etzApp.githubRepo}" verwijst naar moral-maps-repo`);
    } else {
      ok(`ETZ-app githubRepo is geen MAPS-repo`);
    }
  }

  // 3h. Publieke hub mag ETZ-app NIET tonen (is besloten)
  const publicHub = readJson("public/data/workshop/hub-apps.json");
  if (publicHub && !publicHub.__parseError) {
    const publicApps = publicHub.apps ?? [];
    const etzInPublic = publicApps.find((a) => a.id === "etz-gesprekskaarten");
    if (etzInPublic) {
      // De sync-workshop-hub.mjs filtert alleen 'besloten' + 'live' + url — dat is OK
      // maar controleer of de categorie correct doorkomt
      if (etzInPublic.categorie === "besloten") {
        ok(`ETZ-app in publieke hub-cache heeft categorie "besloten"`);
      } else {
        fail(`ETZ-app in publieke hub-cache (public/data/workshop/hub-apps.json) heeft categorie "${etzInPublic.categorie}"`);
      }
    } else {
      // ETZ niet in publieke cache — dat is prima als sync correct is uitgevoerd
      ok(`ETZ-app staat niet onterecht in publieke hub-cache`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SAMENVATTING
// ═══════════════════════════════════════════════════════════════════════════════

console.log("\n── Samenvatting ──────────────────────────────────────────────────────────");

const fails = findings.filter((f) => f.level === "fail");
const warns = findings.filter((f) => f.level === "warn");

if (fails.length === 0 && warns.length === 0) {
  console.log("  ✅ Alle huisstijl-checks geslaagd — geen bevindingen.\n");
  process.exit(0);
}

if (warns.length > 0) {
  console.log(`  ⚠️  ${warns.length} waarschuwing(en):`);
  warns.forEach((w) => console.log(`     • ${w.label}${w.detail ? ` — ${w.detail}` : ""}`));
}

if (fails.length > 0) {
  console.log(`  ❌ ${fails.length} fout(en):`);
  fails.forEach((f) => console.error(`     • ${f.label}${f.detail ? ` — ${f.detail}` : ""}`));
  console.log();
  process.exit(1);
}

console.log(`\n  Rapport klaar — ${warns.length} waarschuwing(en), 0 fouten.\n`);
process.exit(0);
