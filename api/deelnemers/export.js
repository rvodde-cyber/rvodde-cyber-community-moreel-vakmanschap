import { timingSafeEqual } from "crypto";
import { haalDeelnemers, isDeelnemersOpslagGeconfigureerd } from "../../lib/deelnemers-store.js";

const KOLOMMEN = ["naam", "functie", "organisatie", "email", "taal", "aangemeld_op", "aantekening"];

function isTokenGeldig(req) {
  const verwacht = process.env.DEELNEMERS_EXPORT_TOKEN?.trim();
  if (!verwacht) return false;

  const header = req.headers.authorization || "";
  const gegeven = (header.startsWith("Bearer ") ? header.slice(7) : req.query?.token || "").trim();
  if (!gegeven) return false;

  const a = Buffer.from(gegeven);
  const b = Buffer.from(verwacht);
  return a.length === b.length && timingSafeEqual(a, b);
}

function csvVeld(waarde) {
  const tekst = waarde === null || waarde === undefined ? "" : String(waarde);
  return /[",\n;]/.test(tekst) ? `"${tekst.replace(/"/g, '""')}"` : tekst;
}

function naarCsv(deelnemers) {
  const regels = [KOLOMMEN.join(";")];
  for (const deelnemer of deelnemers) {
    regels.push(KOLOMMEN.map((kolom) => csvVeld(deelnemer[kolom])).join(";"));
  }
  // BOM zodat Excel de accenten goed toont.
  return `\uFEFF${regels.join("\r\n")}\r\n`;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  if (!isTokenGeldig(req)) {
    res.status(401).json({ ok: false, error: "niet_geautoriseerd" });
    return;
  }

  if (!isDeelnemersOpslagGeconfigureerd()) {
    res.status(503).json({ ok: false, error: "opslag_niet_geconfigureerd" });
    return;
  }

  let deelnemers;
  try {
    deelnemers = await haalDeelnemers();
  } catch (err) {
    console.error("Deelnemers ophalen mislukt:", err.message);
    res.status(500).json({ ok: false, error: "opslag_fout" });
    return;
  }

  res.setHeader("Cache-Control", "no-store");

  const format = String(req.query?.format || "csv").toLowerCase();

  if (format === "json") {
    res.status(200).json({ ok: true, aantal: deelnemers.length, deelnemers });
    return;
  }

  // Kant-en-klare BCC-regel om de hele groep in één keer te mailen.
  if (format === "emails") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(deelnemers.map((deelnemer) => deelnemer.email).join("; "));
    return;
  }

  const datum = new Date().toISOString().slice(0, 10);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="deelnemers-${datum}.csv"`);
  res.status(200).send(naarCsv(deelnemers));
}
