import { readFileSync } from "fs";
import { join } from "path";
import {
  SESSION_HOURS,
  createSessionToken,
  sessionCookieHeader,
} from "../../lib/workshop-session.js";

function loadConfig() {
  const configPath = join(process.cwd(), "moralcraftsmanship-platform/workshop-config.json");
  return JSON.parse(readFileSync(configPath, "utf8"));
}

function isDateExpired(dateStr) {
  if (!dateStr) return true;
  const deadline = new Date(`${dateStr}T23:59:59.999`);
  return Number.isNaN(deadline.getTime()) || deadline < new Date();
}

async function sendSession(res, workshopNaam, deadlineDateStr, hours, preview) {
  const deadline = new Date(`${deadlineDateStr}T23:59:59.999`).getTime();
  const sessionExp = Math.min(Date.now() + hours * 60 * 60 * 1000, deadline);
  const token = await createSessionToken(workshopNaam, sessionExp, { preview });
  const maxAgeSeconds = Math.max(1, Math.floor((sessionExp - Date.now()) / 1000));

  res.setHeader("Set-Cookie", sessionCookieHeader(token, maxAgeSeconds));
  res.status(200).json({
    ok: true,
    workshop_naam: workshopNaam,
    voorproef: preview,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const { password, mode } = req.body || {};
  const config = loadConfig();

  if (mode === "voorproef" || (config.voorproef?.ingeschakeld && password === config.voorproef.wachtwoord)) {
    const voorproef = config.voorproef || {};
    if (!voorproef.ingeschakeld) {
      res.status(403).json({ ok: false, error: "preview_disabled" });
      return;
    }
    if (isDateExpired(voorproef.geldig_tot)) {
      res.status(403).json({ ok: false, error: "preview_expired" });
      return;
    }
    if (!password || password !== voorproef.wachtwoord) {
      res.status(401).json({ ok: false, error: "invalid" });
      return;
    }

    await sendSession(
      res,
      voorproef.label || "Voorvertoning",
      voorproef.geldig_tot,
      voorproef.duur_uren || 24,
      true
    );
    return;
  }

  if (isDateExpired(config.geldig_tot)) {
    res.status(403).json({ ok: false, error: "expired" });
    return;
  }

  if (!password || password !== config.password) {
    res.status(401).json({ ok: false, error: "invalid" });
    return;
  }

  await sendSession(res, config.workshop_naam, config.geldig_tot, SESSION_HOURS, false);
}
