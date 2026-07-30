import { createClient } from "@supabase/supabase-js";

/**
 * Supabase-client voor "Rad van Moreel Fortuin".
 *
 * De client wordt alleen aangemaakt wanneer beide environment-variabelen
 * aanwezig zijn. Ontbreken ze (bijv. lokaal draaien zonder backend), dan
 * blijft de client `null` en valt de app terug op de lokale dataset.
 *
 * Vite leest env-variabelen met de `VITE_`-prefix via `import.meta.env`.
 * De `NEXT_PUBLIC_`-varianten worden meegenomen zodat een gedeelde
 * `.env` met de kaartenbeheer-app blijft werken.
 */
const env = import.meta.env ?? {};

const SUPABASE_URL = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let client = null;

if (isSupabaseConfigured) {
  try {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.warn("[Rad] Supabase-client kon niet worden aangemaakt:", error);
    }
    client = null;
  }
}

export const supabase = client;
