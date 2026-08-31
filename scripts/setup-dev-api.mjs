import { createServer } from "node:http";
import { upsertBlob, listBlobs, purgeTrajectory } from "../lib/setup-mailbox.js";

/**
 * Minimal local API for Setup Phase 1 development.
 * Mirrors /api/setup/{submit,fetch,purge} without Vercel.
 * Usage: node scripts/setup-dev-api.mjs
 */

const PORT = Number(process.env.SETUP_API_PORT || 3001);

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(payload);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

function pathOf(url) {
  return new URL(url, "http://localhost").pathname;
}

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const pathname = pathOf(req.url || "/");

  try {
    if (pathname === "/api/setup/submit" && req.method === "POST") {
      const body = await readBody(req);
      if (!body) {
        sendJson(res, 400, { ok: false, error: "invalid_json" });
        return;
      }
      const { trajectoryId, role, respondentId, ciphertext, iv } = body;
      if (!trajectoryId || !role || !respondentId || !ciphertext || !iv) {
        sendJson(res, 400, { ok: false, error: "invalid_body" });
        return;
      }
      if (role !== "team" && role !== "leader") {
        sendJson(res, 400, { ok: false, error: "invalid_role" });
        return;
      }
      await upsertBlob({ trajectoryId, role, respondentId, ciphertext, iv });
      sendJson(res, 200, { ok: true });
      return;
    }

    if (pathname === "/api/setup/fetch" && req.method === "GET") {
      const trajectoryId = new URL(req.url, "http://localhost").searchParams.get(
        "trajectoryId"
      );
      if (!trajectoryId) {
        sendJson(res, 400, { ok: false, error: "invalid_trajectory" });
        return;
      }
      const blobs = await listBlobs(trajectoryId);
      sendJson(res, 200, {
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
      return;
    }

    if (pathname === "/api/setup/purge" && req.method === "POST") {
      const body = await readBody(req);
      if (!body?.trajectoryId) {
        sendJson(res, 400, { ok: false, error: "invalid_trajectory" });
        return;
      }
      const result = await purgeTrajectory(body.trajectoryId);
      sendJson(res, 200, { ok: true, purged: result.purged });
      return;
    }

    sendJson(res, 404, { ok: false, error: "not_found" });
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { ok: false, error: "store_failed" });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[setup-dev-api] listening on http://127.0.0.1:${PORT}`);
});
