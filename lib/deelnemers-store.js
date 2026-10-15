/**
 * Opslag van deelnemers in Supabase via de REST-API.
 * Bewust zonder SDK: één fetch-call per actie houdt de serverless functie klein.
 */

const TABEL = "deelnemers";

function config() {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return { url, key };
}

export function isDeelnemersOpslagGeconfigureerd() {
  const { url, key } = config();
  return Boolean(url && key);
}

function headers(extra = {}) {
  const { key } = config();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function verstuur(pad, opties) {
  const { url } = config();
  const response = await fetch(`${url}/rest/v1/${pad}`, opties);

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase ${response.status}: ${detail.slice(0, 300)}`);
  }

  return response;
}

async function zoekOpEmail(email) {
  const query = `${TABEL}?email=eq.${encodeURIComponent(email)}&select=id`;
  const response = await verstuur(query, { method: "GET", headers: headers() });
  const rijen = await response.json();
  return rijen[0] ?? null;
}

/**
 * Slaat een aanmelding op. Een bestaand e-mailadres wordt bijgewerkt in plaats van
 * geweigerd, zodat iemand die zich twee keer aanmeldt geen foutmelding krijgt.
 *
 * @returns {Promise<"nieuw" | "bijgewerkt">}
 */
export async function bewaarDeelnemer(deelnemer) {
  const bestaand = await zoekOpEmail(deelnemer.email);

  if (bestaand) {
    await verstuur(`${TABEL}?id=eq.${bestaand.id}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify({
        ...deelnemer,
        bijgewerkt_op: new Date().toISOString(),
        afgemeld_op: null,
      }),
    });
    return "bijgewerkt";
  }

  await verstuur(TABEL, {
    method: "POST",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify(deelnemer),
  });
  return "nieuw";
}

/** Alle actieve deelnemers, oudste aanmelding eerst. */
export async function haalDeelnemers() {
  const kolommen = "naam,functie,organisatie,email,aantekening,taal,aangemeld_op";
  const query = `${TABEL}?afgemeld_op=is.null&select=${kolommen}&order=aangemeld_op.asc`;
  const response = await verstuur(query, { method: "GET", headers: headers() });
  return response.json();
}
