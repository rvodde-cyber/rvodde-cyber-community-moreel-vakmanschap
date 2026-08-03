#!/usr/bin/env node
/**
 * Wekelijkse health-check — lees-only, rapporteert bevindingen.
 *
 * Vier controlegebieden:
 *   1. Liveness — HTTP-statuscheck op alle live Vercel-URL's
 *   2. Vercel-deploys — laatste GitHub-deployment per gekoppeld repo
 *   3. Afhankelijkheden — npm audit (alleen high + critical)
 *   4. Moral Maps keep-alive — laatste workflow-run ≤ 4 dagen geleden
 *
 * Vereiste env-variabelen:
 *   GITHUB_TOKEN        — standaard beschikbaar in GitHub Actions
 *   GH_ORG_PAT          — (optioneel) PAT voor cross-repo deploys/workflows
 *   STALE_DEPLOY_DAYS   — (optioneel, default 30) drempel voor "stale" deploy
 *
 * Gebruik:
 *   node scripts/health-check.mjs
 *   npm run health:check
 *
 * Afsluitcode: altijd 0 — het rapport wordt opgebouwd en afgedrukt,
 * de CI-stap beslist daarna wat er mee gedaan wordt.
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const GITHUB_TOKEN  = process.env.GITHUB_TOKEN  ?? "";
const GH_ORG_PAT    = process.env.GH_ORG_PAT   ?? GITHUB_TOKEN;
const STALE_DAYS    = Number(process.env.STALE_DEPLOY_DAYS ?? 30);
const NOW_MS        = Date.now();

// ── helpers ───────────────────────────────────────────────────────────────────

function readJson(relPath) {
  const full = join(root, relPath);
  if (!existsSync(full)) return null;
  try { return JSON.parse(readFileSync(full, "utf8")); } catch { return null; }
}

async function httpGet(url, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
    return { ok: res.ok, status: res.status, body: null };
  } catch (e) {
    return { ok: false, status: 0, error: e.message };
  }
}

async function ghApi(path, token) {
  const res = await httpGet(`https://api.github.com${path}`, token);
  if (res.status === 0) return null;
  try {
    const full = await fetch(`https://api.github.com${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!full.ok) return null;
    return await full.json();
  } catch { return null; }
}

function daysAgo(isoDate) {
  return Math.floor((NOW_MS - new Date(isoDate).getTime()) / 86_400_000);
}

function statusEmoji(s) {
  if (s === "OK")      return "✅";
  if (s === "WARN")    return "⚠️";
  if (s === "KRITIEK") return "🔴";
  return "❓";
}

// ── data laden ────────────────────────────────────────────────────────────────

const hubData = readJson("moralcraftsmanship-platform/hub-apps.json");
const allApps = hubData?.apps ?? [];

// Alle apps met een live URL
const liveApps = allApps.filter((a) => a.status === "live" && a.url?.startsWith("http"));

// Unieke GitHub-repo's met een live URL (dedupliceer multi-app-repo's)
const repoMap = new Map(); // "owner/repo" → { naam, url }
for (const app of liveApps) {
  const rawRepo = app.githubRepo;
  if (!rawRepo) continue;
  // Normaliseer: "rvodde-cyber/moral-maps" uit bijv. "rvodde-cyber/moral-maps (Vercel-project, ...)"
  const repoMatch = rawRepo.match(/^([a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+)/);
  if (!repoMatch) continue;
  const repo = repoMatch[1];
  if (!repoMap.has(repo)) {
    repoMap.set(repo, { naam: app.naam, url: app.url });
  }
}

// ── rapport-structuur ─────────────────────────────────────────────────────────

const lines = [];
const summaryRows = [];

function header(text) { lines.push(`\n## ${text}\n`); }
function row(text)    { lines.push(text); }

function addSummary(repo, status, bevinding, vervolgstap) {
  summaryRows.push({ repo, status, bevinding, vervolgstap });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. LIVENESS — HTTP-statuscheck
// ═══════════════════════════════════════════════════════════════════════════════

header("1. Liveness (HTTP-statuscheck)");
row("| App | URL | HTTP-status | Beoordeling |");
row("|-----|-----|-------------|-------------|");

for (const app of liveApps) {
  const { naam, url } = app;
  const result = await httpGet(url);
  let status, label;

  if (result.ok) {
    status = "OK";
    label  = `${result.status} OK`;
  } else if (result.status > 0) {
    status = result.status >= 500 ? "KRITIEK" : "WARN";
    label  = `${result.status}`;
  } else {
    status = "KRITIEK";
    label  = `Onbereikbaar (${result.error ?? "timeout"})`;
  }

  row(`| ${naam} | ${url} | ${label} | ${statusEmoji(status)} ${status} |`);
  if (status !== "OK") {
    addSummary(naam, status, `HTTP ${label}`, "Controleer Vercel-deploy en DNS-configuratie");
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. VERCEL-DEPLOYS — laatste GitHub-deployment per repo
// ═══════════════════════════════════════════════════════════════════════════════

header("2. Vercel-deploys (laatste GitHub-deployment)");
row(`_Drempel 'stale': > ${STALE_DAYS} dagen geleden._\n`);
row("| Repo | Omgeving | Deploy-datum | Dagen geleden | Status | Beoordeling |");
row("|------|----------|--------------|---------------|--------|-------------|");

for (const [repo, { naam }] of repoMap) {
  const token = repo.startsWith("rvodde-cyber/rvodde-cyber") ? GITHUB_TOKEN : GH_ORG_PAT;
  const deploys = await ghApi(`/repos/${repo}/deployments?environment=Production&per_page=1`, token);

  if (!deploys || deploys.length === 0) {
    // Fallback: probeer Preview-deploys
    const previews = await ghApi(`/repos/${repo}/deployments?per_page=1`, token);
    if (!previews || previews.length === 0) {
      row(`| \`${repo}\` | — | — | — | — | ⚠️ Geen deploy-data (token ontbreekt?) |`);
      addSummary(naam, "WARN", "Geen deploy-data beschikbaar", "Controleer GH_ORG_PAT-rechten voor dit repo");
      continue;
    }
    // gebruik preview
    deploys?.push(...previews);
  }

  const deploy = deploys[0];
  const statusData = await ghApi(
    `/repos/${repo}/deployments/${deploy.id}/statuses?per_page=1`,
    token
  );

  const deployState  = statusData?.[0]?.state ?? "unknown";
  const deployDate   = deploy.created_at;
  const age          = daysAgo(deployDate);
  const env          = deploy.environment ?? "—";

  let beoordeling;
  if (deployState === "success" && age <= STALE_DAYS) {
    beoordeling = "✅ OK";
  } else if (deployState === "success" && age > STALE_DAYS) {
    beoordeling = `⚠️ Stale (${age} d)`;
    addSummary(naam, "WARN", `Laatste deploy ${age} dagen geleden`, "Overweeg een deployment-refresh of een dependency-update te pushen");
  } else if (deployState === "failure") {
    beoordeling = "🔴 KRITIEK";
    addSummary(naam, "KRITIEK", `Laatste deploy mislukt (${deployDate})`, "Bekijk de Vercel-deploy-log en herstel de fout");
  } else {
    beoordeling = `⚠️ ${deployState}`;
    addSummary(naam, "WARN", `Deploy-status: ${deployState}`, "Controleer de Vercel-dashboard");
  }

  row(`| \`${repo}\` | ${env} | ${deployDate.slice(0, 10)} | ${age} | ${deployState} | ${beoordeling} |`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. AFHANKELIJKHEDEN — npm audit (high + critical)
// ═══════════════════════════════════════════════════════════════════════════════

header("3. Afhankelijkheden (npm audit)");

let auditData = null;
try {
  const raw = execSync("npm audit --json 2>/dev/null", { cwd: root, encoding: "utf8", timeout: 60_000 });
  auditData = JSON.parse(raw);
} catch (e) {
  // npm audit geeft exit code 1 bij kwetsbaarheden — parse de output toch
  const out = e.stdout ?? "";
  if (out.trim()) {
    try { auditData = JSON.parse(out); } catch { /* ignore */ }
  }
}

if (!auditData) {
  row("_npm audit kon niet worden uitgevoerd._");
  addSummary("npm audit", "WARN", "npm audit mislukt of geen package-lock.json", "Voer `npm install` uit en probeer opnieuw");
} else {
  const meta   = auditData.metadata ?? {};
  const vulns  = auditData.vulnerabilities ?? {};
  const counts = meta.vulnerabilities ?? {};
  const total  = counts.total ?? Object.keys(vulns).length;

  const highCrit = Object.values(vulns).filter((v) =>
    ["high", "critical"].includes(v.severity)
  );

  if (highCrit.length === 0) {
    row(`✅ Geen high/critical kwetsbaarheden. Totaal gevonden: **${total}** (${counts.moderate ?? 0} moderate, ${counts.low ?? 0} low).`);
  } else {
    row(`🔴 **${highCrit.length}** high/critical kwetsbaarhe${highCrit.length === 1 ? "id" : "den"} gevonden (totaal: ${total}):\n`);
    row("| Pakket | Severity | CVE/Advisory | CVSS | Titel |");
    row("|--------|----------|--------------|------|-------|");

    for (const v of highCrit) {
      const sources = Array.isArray(v.via) ? v.via.filter((x) => typeof x === "object") : [];
      const advisory = sources[0] ?? {};
      const url   = advisory.url ?? "—";
      const cvss  = advisory.cvss?.score ?? "—";
      const titel = advisory.title ?? v.name;
      const urlMd = url !== "—" ? `[Advisory](${url})` : "—";
      row(`| \`${v.name}\` | **${v.severity}** | ${urlMd} | ${cvss} | ${titel.slice(0, 70)} |`);
    }

    addSummary(
      "npm audit",
      highCrit.some((v) => v.severity === "critical") ? "KRITIEK" : "WARN",
      `${highCrit.length} high/critical kwetsbaarheden in productie-afhankelijkheden`,
      "Voer `npm audit fix` uit, test lokaal en push een security-patch PR"
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. MORAL MAPS KEEP-ALIVE — laatste workflow-run ≤ 4 dagen geleden
// ═══════════════════════════════════════════════════════════════════════════════

header("4. Moral Maps — Supabase keep-alive");

const KEEPALIVE_THRESHOLD_DAYS = 4; // loopt elke 3 dagen, tolereer 1 dag uitloop
const moralMapsRepo = "rvodde-cyber/moral-maps";

const workflows = await ghApi(`/repos/${moralMapsRepo}/actions/workflows`, GH_ORG_PAT);

if (!workflows) {
  row(`⚠️ Kan workflow-data voor \`${moralMapsRepo}\` niet ophalen — \`GH_ORG_PAT\` ontbreekt of heeft onvoldoende rechten.`);
  addSummary("moral-maps keep-alive", "WARN", "Geen toegang tot workflow-data", "Voeg GH_ORG_PAT toe als repo-secret met `actions:read`-rechten");
} else {
  const keepAliveWf = (workflows.workflows ?? []).find((wf) =>
    /keep.?alive|supabase|ping/i.test(wf.name + " " + wf.path)
  );

  if (!keepAliveWf) {
    row(`⚠️ Geen keep-alive workflow gevonden in \`${moralMapsRepo}\`.`);
    addSummary("moral-maps keep-alive", "WARN", "Keep-alive workflow niet gevonden", "Controleer of de workflow nog bestaat of hernoemd is");
  } else {
    const runs = await ghApi(
      `/repos/${moralMapsRepo}/actions/workflows/${keepAliveWf.id}/runs?per_page=1`,
      GH_ORG_PAT
    );
    const lastRun = runs?.workflow_runs?.[0];

    if (!lastRun) {
      row(`⚠️ Geen workflow-runs gevonden voor **${keepAliveWf.name}**.`);
      addSummary("moral-maps keep-alive", "WARN", "Geen workflow-runs beschikbaar", "Activeer de keep-alive workflow handmatig en controleer de cron-expressie");
    } else {
      const age    = daysAgo(lastRun.created_at);
      const runUrl = lastRun.html_url;
      const concl  = lastRun.conclusion ?? lastRun.status;

      if (concl !== "success") {
        row(`🔴 Laatste keep-alive run **mislukt**: \`${concl}\` — ${lastRun.created_at.slice(0, 10)} — [run bekijken](${runUrl})`);
        addSummary("moral-maps keep-alive", "KRITIEK", `Keep-alive run mislukt (${concl})`, "Bekijk de run-log en herstel de fout; database kan in slaapstand staan");
      } else if (age > KEEPALIVE_THRESHOLD_DAYS) {
        row(`⚠️ Laatste keep-alive run is **${age} dagen geleden** — drempel is ${KEEPALIVE_THRESHOLD_DAYS} d — [run bekijken](${runUrl})`);
        addSummary("moral-maps keep-alive", "KRITIEK", `Keep-alive niet gevuurd in ${age} dagen`, "Controleer de cron-expressie; Supabase-database kan in slaapstand staan");
      } else {
        row(`✅ Laatste keep-alive run: **${lastRun.created_at.slice(0, 10)}** (${age} dag${age === 1 ? "" : "en"} geleden, status: \`${concl}\`) — [run bekijken](${runUrl})`);
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SAMENVATTING
// ═══════════════════════════════════════════════════════════════════════════════

header("Samenvatting");

const datum = new Date().toLocaleDateString("nl-NL", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
const kritiek = summaryRows.filter((r) => r.status === "KRITIEK");
const warn    = summaryRows.filter((r) => r.status === "WARN");

if (kritiek.length === 0 && warn.length === 0) {
  row(`✅ **Alles in orde** per ${datum}. Geen bevindingen.\n`);
} else {
  row(`Rapport gegenereerd op: **${datum}**\n`);

  if (kritiek.length > 0) {
    row(`### 🔴 Kritiek (${kritiek.length})\n`);
    row("| Onderdeel | Bevinding | Vervolgstap |");
    row("|-----------|-----------|-------------|");
    for (const r of kritiek) row(`| ${r.repo} | ${r.bevinding} | ${r.vervolgstap} |`);
  }

  if (warn.length > 0) {
    row(`\n### ⚠️ Aandacht nodig (${warn.length})\n`);
    row("| Onderdeel | Bevinding | Vervolgstap |");
    row("|-----------|-----------|-------------|");
    for (const r of warn) row(`| ${r.repo} | ${r.bevinding} | ${r.vervolgstap} |`);
  }
}

// ── uitvoer ───────────────────────────────────────────────────────────────────

const reportTitle = `🩺 Health-check — ${new Date().toISOString().slice(0, 10)}`;
const reportBody  = lines.join("\n").trim();

// Schrijf naar stdout (voor GitHub Actions :: set-output of als issue-comment)
console.log(`## ${reportTitle}\n`);
console.log(reportBody);

// Stel GitHub Actions-outputs in als we draaien in CI
if (process.env.GITHUB_OUTPUT) {
  const { writeFileSync, appendFileSync } = await import("fs");
  const outputFile = process.env.GITHUB_OUTPUT;
  const escaped    = reportBody.replace(/\n/g, "%0A").replace(/"/g, "%22");
  appendFileSync(outputFile, `report_title=${reportTitle}\n`);
  appendFileSync(outputFile, `has_issues=${kritiek.length + warn.length > 0}\n`);
  appendFileSync(outputFile, `kritiek_count=${kritiek.length}\n`);
  appendFileSync(outputFile, `warn_count=${warn.length}\n`);
}

// Schrijf het volledige rapport naar een bestand voor de workflow-stap die het post
if (process.env.HEALTH_REPORT_FILE) {
  const { writeFileSync } = await import("fs");
  writeFileSync(
    process.env.HEALTH_REPORT_FILE,
    `## ${reportTitle}\n\n${reportBody}\n`
  );
}

process.exit(0);
