import { isWorkshopHubEnabled } from "../../lib/workshop-flags.js";
import {
  getVoorproefPassword,
  getWorkshopPassword,
  loadWorkshopConfig,
} from "../../lib/workshop-config.js";
import {
  SESSION_HOURS,
  createSessionToken,
  sessionCookieHeader,
} from "../../lib/workshop-session.js";

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

  if (!isWorkshopHubEnabled()) {
    res.status(503).json({ ok: false, error: "hub_disabled" });
    return;
  }

  const { password, mode } = req.body || {};

  let config;
  let workshopPassword;
  let voorproefPassword;
  try {
    config = loadWorkshopConfig();
    workshopPassword = getWorkshopPassword();
    voorproefPassword = getVoorproefPassword();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ ok: false, error: "server_misconfigured" });
    return;
  }

  const voorproef = config.voorproef || {};

  if (mode === "voorproef" || (voorproef.ingeschakeld && password === voorproefPassword)) {
    if (!voorproef.ingeschakeld) {
      res.status(403).json({ ok: false, error: "preview_disabled" });
      return;
    }
    if (isDateExpired(voorproef.geldig_tot)) {
      res.status(403).json({ ok: false, error: "preview_expired" });
      return;
    }
    if (!password || password !== voorproefPassword) {
      res.status(401).json({ ok: false, error: "invalid" });
      return;
    }

    try {
      await sendSession(
        res,
        voorproef.label || "Voorvertoning",
        voorproef.geldig_tot,
        voorproef.duur_uren || 24,
        true
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ ok: false, error: "server_misconfigured" });
    }
    return;
  }

  if (isDateExpired(config.geldig_tot)) {
    res.status(403).json({ ok: false, error: "expired" });
    return;
  }

  if (!password || password !== workshopPassword) {
    res.status(401).json({ ok: false, error: "invalid" });
    return;
  }

  try {
    await sendSession(res, config.workshop_naam, config.geldig_tot, SESSION_HOURS, false);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ ok: false, error: "server_misconfigured" });
  }
}
