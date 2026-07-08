import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RadarChart from "../components/RadarChart";
import MistBackground from "../components/MistBackground";
import { DIMENSIONS } from "../data/dimensions";
import { aggregeerScores } from "../lib/scoring";
import { fetchAggregatedScores, subscribeToSubmissions, supabaseConfigured } from "../lib/supabase";

export default function LiveResultsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [highlightId, setHighlightId] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await fetchAggregatedScores();
    setSubmissions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const unsubscribe = subscribeToSubmissions(refresh);
    const interval = setInterval(refresh, 10000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [refresh]);

  const scores = aggregeerScores(submissions);
  const count = submissions.length;
  const highlighted = DIMENSIONS.find((d) => d.id === highlightId);

  return (
    <div className="relative min-h-dvh bg-nachtblauw text-verdenk-wit">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-30">
        <MistBackground progress={6} variant="test" />
      </div>

      <main className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-16">
        <header className="mb-6 text-center lg:mb-8">
          <p className="text-lg font-medium uppercase tracking-[0.2em] text-amber sm:text-xl">
            De Verdenk-test · Live
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
            Hoe verdenkt de zaal?
          </h1>
          <p className="mt-3 text-xl text-verdenk-wit/60 sm:text-2xl">
            {loading ? "Laden…" : `${count} ${count === 1 ? "deelnemer" : "deelnemers"}`}
            {!supabaseConfigured && " · Demo-modus (geen Supabase)"}
          </p>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
          <div
            className="w-full flex-1 cursor-pointer"
            onClick={() => setHighlightId(null)}
            role="presentation"
          >
            <RadarChart scores={scores} size="large" highlightId={highlightId} dark />
          </div>

          <AnimatePresence mode="wait">
            {highlighted ? (
              <motion.div
                key={highlighted.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md rounded-3xl border border-amber/30 bg-white/5 p-8 text-center backdrop-blur-sm lg:max-w-lg"
              >
                <p className="text-lg uppercase tracking-widest text-amber">{highlighted.naam}</p>
                <p className="mt-4 font-display text-7xl font-semibold text-amber sm:text-8xl">
                  {scores[highlighted.id]?.toFixed(1) ?? "—"}
                </p>
                <p className="mt-4 text-xl text-verdenk-wit/70">van 5</p>
                <button
                  type="button"
                  onClick={() => setHighlightId(null)}
                  className="mt-6 text-verdenk-wit/50 underline transition hover:text-verdenk-wit"
                >
                  Toon alle dimensies
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4 lg:max-w-lg"
              >
                {DIMENSIONS.map((dim) => {
                  const score = scores[dim.id] ?? 0;
                  const intensity = score / 5;
                  return (
                    <button
                      key={dim.id}
                      type="button"
                      onClick={() => setHighlightId(dim.id)}
                      className="rounded-2xl border border-white/10 p-4 text-left transition hover:border-amber/50 sm:p-5"
                      style={{
                        background: `rgba(217, 164, 65, ${intensity * 0.25})`,
                      }}
                    >
                      <p className="text-sm text-verdenk-wit/60 sm:text-base">{dim.naam}</p>
                      <p className="mt-1 font-display text-3xl font-semibold text-amber sm:text-4xl">
                        {score > 0 ? score.toFixed(1) : "—"}
                      </p>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-sm text-verdenk-wit/30">
          Tik op een dimensie om in te zoomen · Updates elke 10 seconden
        </p>
      </main>
    </div>
  );
}
