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

function isConfigExpired(config) {
  const deadline = new Date(`${config.geldig_tot}T23:59:59.999`);
  return Number.isNaN(deadline.getTime()) || deadline < new Date();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const { password } = req.body || {};
  const config = loadConfig();

  if (isConfigExpired(config)) {
    res.status(403).json({ ok: false, error: "expired" });
    return;
  }

  if (!password || password !== config.password) {
    res.status(401).json({ ok: false, error: "invalid" });
    return;
  }

  const deadline = new Date(`${config.geldig_tot}T23:59:59.999`).getTime();
  const sessionExp = Math.min(Date.now() + SESSION_HOURS * 60 * 60 * 1000, deadline);
  const token = await createSessionToken(config.workshop_naam, sessionExp);
  const maxAgeSeconds = Math.max(1, Math.floor((sessionExp - Date.now()) / 1000));

  res.setHeader("Set-Cookie", sessionCookieHeader(token, maxAgeSeconds));
  res.status(200).json({ ok: true, workshop_naam: config.workshop_naam });
}
