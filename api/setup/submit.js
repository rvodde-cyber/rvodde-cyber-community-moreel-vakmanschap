import { upsertBlob } from "../../lib/setup-mailbox.js";

const ROLE_SET = new Set(["team", "leader"]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.length > 0 && value.length < 4096;
}

function isBase64Url(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]+$/.test(value) && value.length < 200_000;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const body = req.body || {};
  const { trajectoryId, role, respondentId, ciphertext, iv } = body;

  if (!isNonEmptyString(trajectoryId) || trajectoryId.length > 128) {
    res.status(400).json({ ok: false, error: "invalid_trajectory" });
    return;
  }
  if (!ROLE_SET.has(role)) {
    res.status(400).json({ ok: false, error: "invalid_role" });
    return;
  }
  if (!isNonEmptyString(respondentId) || respondentId.length > 128) {
    res.status(400).json({ ok: false, error: "invalid_respondent" });
    return;
  }
  if (!isBase64Url(ciphertext) || !isBase64Url(iv)) {
    res.status(400).json({ ok: false, error: "invalid_ciphertext" });
    return;
  }

  try {
    await upsertBlob({ trajectoryId, role, respondentId, ciphertext, iv });
    res.status(200).json({ ok: true });
  } catch (err) {
    if (err.message === "mailbox_not_configured") {
      res.status(503).json({ ok: false, error: "mailbox_not_configured" });
      return;
    }
    console.error("[setup/submit]", err.message);
    res.status(500).json({ ok: false, error: "store_failed" });
  }
}
