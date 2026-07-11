import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && key);

export const supabase = supabaseConfigured
  ? createClient(url, key)
  : null;

export async function submitResultaat({ sessionId, scores, archetype }) {
  if (!supabase) {
    console.warn("Supabase niet geconfigureerd — resultaat niet opgeslagen.");
    return { ok: false, offline: true };
  }

  const { error } = await supabase.from("verdenk_submissions").insert({
    session_id: sessionId,
    scores,
    archetype: archetype.id,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { ok: false, error };
  }

  return { ok: true };
}

export async function fetchAggregatedScores() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("verdenk_submissions")
    .select("scores, archetype, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }

  return data ?? [];
}

export function subscribeToSubmissions(callback) {
  if (!supabase) return () => {};

  const channel = supabase
    .channel("verdenk-live")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "verdenk_submissions" },
      () => callback(),
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
