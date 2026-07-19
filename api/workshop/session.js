import { isWorkshopHubEnabled } from "../../lib/workshop-flags.js";
import { loadWorkshopConfig } from "../../lib/workshop-config.js";
import { getSessionFromRequest } from "../../lib/workshop-session.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ authenticated: false });
    return;
  }

  if (!isWorkshopHubEnabled()) {
    res.status(200).json({
      authenticated: false,
      hub_enabled: false,
      voorproef_beschikbaar: false,
    });
    return;
  }

  let voorproef = {};
  try {
    const config = loadWorkshopConfig();
    voorproef = config.voorproef || {};
  } catch {
    voorproef = {};
  }

  const session = await getSessionFromRequest(req);

  if (!session) {
    res.status(200).json({
      authenticated: false,
      hub_enabled: true,
      voorproef_beschikbaar: Boolean(voorproef.ingeschakeld),
    });
    return;
  }

  res.status(200).json({
    authenticated: true,
    hub_enabled: true,
    workshop_naam: session.w,
    expires_at: session.exp,
    voorproef: Boolean(session.p),
    voorproef_beschikbaar: Boolean(voorproef.ingeschakeld),
  });
}
