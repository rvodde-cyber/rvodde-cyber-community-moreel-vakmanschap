import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { getLocalDilemmas } from "../data/localDilemmas.js";

/**
 * Haalt dilemmakaarten op. Probeert eerst Supabase; bij ontbrekende config
 * of een fout valt de service netjes terug op de lokale dataset.
 *
 * Retourneert: { dilemmas: DilemmaCard[], source: "supabase" | "local", error?: string }
 */
export async function fetchDilemmas() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("dilemmas")
        .select("id, titel, categorie, scenario, vraag, moeilijkheid, waarden, opties");

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        return { dilemmas: data.map(normalizeRemote), source: "supabase" };
      }
      // Lege tabel → val terug op lokaal, maar zonder foutmelding.
      return { dilemmas: getLocalDilemmas(), source: "local" };
    } catch (error) {
      return {
        dilemmas: getLocalDilemmas(),
        source: "local",
        error: error?.message ?? "Onbekende fout bij ophalen van Supabase.",
      };
    }
  }

  return { dilemmas: getLocalDilemmas(), source: "local" };
}

/** Normaliseert een Supabase-rij naar een bruikbare DilemmaCard. */
function normalizeRemote(row) {
  const titel = row.titel ?? "";
  const scenario = row.scenario ?? "";
  const vraag = row.vraag ?? "";
  return {
    id: row.id,
    categorie: row.categorie ?? "",
    moeilijkheid: Number(row.moeilijkheid) || 1,
    waarden: Array.isArray(row.waarden) ? row.waarden : [],
    opties: Array.isArray(row.opties) ? row.opties : [],
    titel,
    scenario,
    vraag,
    // Supabase levert (nu) één taal; spiegel naar beide zodat de UI werkt.
    nl: { titel, scenario, vraag },
    en: { titel, scenario, vraag },
  };
}

/** Kiest willekeurig één dilemma uit een (gefilterde) lijst. */
export function pickRandom(list) {
  if (!list || list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}

/** Filtert dilemma's op categorie en moeilijkheid (beide optioneel). */
export function filterDilemmas(list, { categorie, moeilijkheid } = {}) {
  return (list ?? []).filter((d) => {
    if (categorie && d.categorie !== categorie) return false;
    if (moeilijkheid && Number(d.moeilijkheid) !== Number(moeilijkheid)) return false;
    return true;
  });
}
