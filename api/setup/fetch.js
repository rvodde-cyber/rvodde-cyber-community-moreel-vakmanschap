import { listBlobs } from "../../lib/setup-mailbox.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const trajectoryId =
    typeof req.query?.trajectoryId === "string" ? req.query.trajectoryId : "";

  if (!trajectoryId || trajectoryId.length > 128) {
    res.status(400).json({ ok: false, error: "invalid_trajectory" });
    return;
  }

  try {
    const blobs = await listBlobs(trajectoryId);
    // Still ciphertext only — decryption happens in the advisor browser.
    res.status(200).json({
      ok: true,
      trajectoryId,
      count: blobs.length,
      blobs: blobs.map((blob) => ({
        role: blob.role,
        respondentId: blob.respondentId,
        ciphertext: blob.ciphertext,
        iv: blob.iv,
        updatedAt: blob.updatedAt,
      })),
    });
  } catch (err) {
    if (err.message === "mailbox_not_configured") {
      res.status(503).json({ ok: false, error: "mailbox_not_configured" });
      return;
    }
    console.error("[setup/fetch]", err.message);
    res.status(500).json({ ok: false, error: "store_failed" });
  }
}
