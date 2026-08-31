import { purgeTrajectory } from "../../lib/setup-mailbox.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const trajectoryId =
    typeof req.body?.trajectoryId === "string" ? req.body.trajectoryId : "";

  if (!trajectoryId || trajectoryId.length > 128) {
    res.status(400).json({ ok: false, error: "invalid_trajectory" });
    return;
  }

  try {
    const result = await purgeTrajectory(trajectoryId);
    res.status(200).json({ ok: true, purged: result.purged });
  } catch (err) {
    if (err.message === "mailbox_not_configured") {
      res.status(503).json({ ok: false, error: "mailbox_not_configured" });
      return;
    }
    console.error("[setup/purge]", err.message);
    res.status(500).json({ ok: false, error: "store_failed" });
  }
}
