import { readFileSync } from "fs";
import { join } from "path";
import { getSessionFromRequest } from "../../lib/workshop-session.js";

function loadConfig() {
  const configPath = join(process.cwd(), "moralcraftsmanship-platform/workshop-config.json");
  return JSON.parse(readFileSync(configPath, "utf8"));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ authenticated: false });
    return;
  }

  const session = await getSessionFromRequest(req);
  const config = loadConfig();
  const voorproef = config.voorproef || {};

  if (!session) {
    res.status(200).json({
      authenticated: false,
      voorproef_beschikbaar: Boolean(voorproef.ingeschakeld),
    });
    return;
  }

  res.status(200).json({
    authenticated: true,
    workshop_naam: session.w,
    expires_at: session.exp,
    voorproef: Boolean(session.p),
    voorproef_beschikbaar: Boolean(voorproef.ingeschakeld),
  });
}
