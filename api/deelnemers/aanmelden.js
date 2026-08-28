import { isHoneypotGevuld, valideerAanmelding } from "../../lib/deelnemers-validatie.js";
import { bewaarDeelnemer, isDeelnemersOpslagGeconfigureerd } from "../../lib/deelnemers-store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const body = typeof req.body === "string" ? veiligeJson(req.body) : req.body || {};

  // Stilzwijgend accepteren: een bot mag niet leren dat de val is opgemerkt.
  if (isHoneypotGevuld(body)) {
    res.status(201).json({ ok: true, status: "nieuw" });
    return;
  }

  const resultaat = valideerAanmelding(body);
  if (!resultaat.ok) {
    res.status(400).json({ ok: false, error: "validatie", velden: resultaat.velden });
    return;
  }

  if (!isDeelnemersOpslagGeconfigureerd()) {
    res.status(503).json({ ok: false, error: "opslag_niet_geconfigureerd" });
    return;
  }

  try {
    const status = await bewaarDeelnemer(resultaat.deelnemer);
    res.status(201).json({ ok: true, status });
  } catch (err) {
    console.error("Aanmelding opslaan mislukt:", err.message);
    res.status(500).json({ ok: false, error: "opslag_fout" });
  }
}

function veiligeJson(waarde) {
  try {
    return JSON.parse(waarde);
  } catch {
    return {};
  }
}
