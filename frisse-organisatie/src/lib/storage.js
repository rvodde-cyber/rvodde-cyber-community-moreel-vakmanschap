// Opslag van scanresultaten (briefing §3 en §7).
//
// Wat er wél wordt opgeslagen: de sessiecode/bedrijfsnaam, het gemiddelde per
// blad en welke conclusie eruit volgde.
// Wat er níét wordt opgeslagen: antwoorden per stelling, en niets dat naar een
// persoon te herleiden is. Er is geen inlog en geen gebruikersidentificatie.
//
// De opslag is optioneel: zonder Supabase-configuratie werkt de scan volledig,
// alleen zonder bewaren. Dat is bewust — het instrument moet ook lokaal of in
// een demo bruikbaar zijn.

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const tableName = import.meta.env.VITE_SUPABASE_TABLE || "scan_results";

/**
 * Bewaartermijn in maanden (briefing §7: vóór livegang expliciet vastleggen).
 * De waarde wordt meegestuurd als `expires_at`, zodat opruimen in de database
 * niet afhankelijk is van een instelling die alleen in de frontend bekend is.
 */
export const RETENTION_MONTHS = Number(import.meta.env.VITE_RETENTION_MONTHS ?? 12);

export const storageConfigured = Boolean(url && anonKey);

/**
 * Slaat één ingevulde scan geaggregeerd op.
 *
 * @param {object} params
 * @param {string} params.sessionCode
 * @param {Record<string, number>} params.scores blad-id → gemiddelde
 * @param {string} params.conclusionKind
 * @returns {Promise<{status: "saved" | "skipped" | "error", error?: Error}>}
 */
export async function saveScanResult({ sessionCode, scores, conclusionKind }) {
  if (!storageConfigured) return { status: "skipped" };

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await client.from(tableName).insert({
      session_code: sessionCode.trim() || null,
      scores,
      conclusion: conclusionKind,
      expires_at: expiryDate().toISOString(),
    });

    if (error) throw error;
    return { status: "saved" };
  } catch (error) {
    // Een mislukte opslag mag de gebruiker nooit zijn resultaat kosten.
    return { status: "error", error };
  }
}

function expiryDate(from = new Date()) {
  const expiry = new Date(from);
  expiry.setMonth(expiry.getMonth() + RETENTION_MONTHS);
  return expiry;
}
