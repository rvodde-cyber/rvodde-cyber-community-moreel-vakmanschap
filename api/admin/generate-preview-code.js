import { genereerCode, getEdgeConfigClient, haalActieveCodeOp, normaliseerCode } from "../../lib/preview-code.js";

function adminSecretOk(provided) {
  const expected = process.env.ADMIN_SECRET?.trim();
  if (!expected || !provided) return false;
  return provided === expected;
}

function getEdgeConfigId() {
  if (process.env.EDGE_CONFIG_ID?.trim()) return process.env.EDGE_CONFIG_ID.trim();
  const conn = process.env.EDGE_CONFIG || "";
  const match = conn.match(/edge-config\.vercel\.com\/([^?/]+)/);
  return match ? match[1] : "";
}

function edgeConfigWriteUrl(id) {
  const url = new URL(`https://api.vercel.com/v1/edge-config/${id}/items`);
  if (process.env.VERCEL_TEAM_ID?.trim()) {
    url.searchParams.set("teamId", process.env.VERCEL_TEAM_ID.trim());
  }
  return url.toString();
}

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const secret = req.headers["x-admin-secret"];
  if (!adminSecretOk(secret)) {
    res.status(401).json({ error: "Ongeldig admin-secret" });
    return;
  }

  if (req.method === "GET") {
    const client = getEdgeConfigClient();
    if (!client) {
      res.status(503).json({ error: "edge_config_niet_geconfigureerd" });
      return;
    }
    try {
      const huidige = await haalActieveCodeOp(client);
      res.status(200).json(huidige);
    } catch (err) {
      console.error(err);
      res.status(502).json({ error: "edge_config_lezen_mislukt" });
    }
    return;
  }

  const edgeConfigId = getEdgeConfigId();
  const vercelToken = process.env.VERCEL_API_TOKEN?.trim();
  if (!edgeConfigId || !vercelToken) {
    res.status(503).json({ error: "edge_config_niet_geconfigureerd" });
    return;
  }

  const body = req.body || {};
  const routes = Array.isArray(body.routes) && body.routes.length
    ? body.routes.map((r) => String(r))
    : ["/wisselwerking"];
  const geldigheidDagen = Number(body.geldigheidDagen) > 0 ? Number(body.geldigheidDagen) : 14;
  const nieuweCode = normaliseerCode(genereerCode());
  const verlooptOp = Date.now() + geldigheidDagen * 24 * 60 * 60 * 1000;

  try {
    const writeRes = await fetch(edgeConfigWriteUrl(edgeConfigId), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { operation: "upsert", key: "previewCode", value: nieuweCode },
          { operation: "upsert", key: "previewCodeVerlooptOp", value: verlooptOp },
          { operation: "upsert", key: "previewRoutes", value: routes },
        ],
      }),
    });

    if (!writeRes.ok) {
      const detail = await writeRes.text();
      console.error("Edge Config write failed", writeRes.status, detail);
      res.status(502).json({ error: "edge_config_schrijven_mislukt" });
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "edge_config_schrijven_mislukt" });
    return;
  }

  res.status(200).json({ code: nieuweCode, verlooptOp, routes });
}
