import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RadarChart from "../components/RadarChart";
import MistBackground from "../components/MistBackground";
import { useTest } from "../context/TestContext";
import { DIMENSIONS } from "../data/dimensions";
import { aanmoediging, bepaalArchetype, berekenAlleScores, isCompleet } from "../lib/scoring";
import { getSessionId } from "../lib/session";
import { submitResultaat } from "../lib/supabase";

export default function ResultsPage() {
  const { antwoorden } = useTest();
  const [submitted, setSubmitted] = useState(false);
  const scores = berekenAlleScores(antwoorden);
  const archetype = bepaalArchetype(scores);
  const compleet = isCompleet(antwoorden);

  useEffect(() => {
    if (!compleet || submitted) return;

    const sessionId = getSessionId();
    submitResultaat({ sessionId, scores, archetype }).then((res) => {
      if (res.ok || res.offline) setSubmitted(true);
    });
  }, [compleet, submitted, scores, archetype]);

  if (!compleet) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg text-nachtblauw/70">Je hebt de test nog niet afgerond.</p>
          <Link to="/verdenk/test/1" className="mt-4 inline-block text-koraal underline">
            Ga verder met de test
          </Link>
        </div>
      </div>
    );
  }

  async function deelResultaat() {
    const tekst = `${archetype.naam}\n\n${DIMENSIONS.map(
      (d) => `${d.naam}: ${scores[d.id]?.toFixed(1)}`,
    ).join("\n")}\n\nScherpstellen · Congres 2027`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Mijn Scherpstellen-resultaat", text: tekst });
        return;
      } catch {
        /* user cancelled */
      }
    }

    await navigator.clipboard.writeText(tekst);
    alert("Resultaat gekopieerd naar klembord.");
  }

  return (
    <div className="relative min-h-dvh">
      <MistBackground progress={6} variant="test" />

      <main className="relative mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-amber">Jouw typering</p>
          <h1
            className="mt-2 font-display text-4xl font-semibold sm:text-5xl"
            style={{ color: archetype.kleur }}
          >
            {archetype.naam}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-nachtblauw/75">
            {archetype.beschrijving}
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl bg-white/60 p-6 shadow-warm backdrop-blur-sm">
          <RadarChart scores={scores} />

          <div className="mt-8 space-y-6">
            {DIMENSIONS.map((dim) => (
              <section key={dim.id} className="border-t border-mistgrijs/30 pt-5 first:border-0 first:pt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-xl font-semibold text-nachtblauw">{dim.naam}</h2>
                  <span className="text-2xl font-semibold text-amber">
                    {scores[dim.id]?.toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 text-base leading-relaxed text-nachtblauw/70">
                  {aanmoediging(dim.id, scores[dim.id])}
                </p>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={deelResultaat}
            className="rounded-2xl border-2 border-nachtblauw/20 px-6 py-3 font-semibold text-nachtblauw transition hover:border-amber hover:text-amber"
          >
            Deel resultaat
          </button>
          <Link
            to="/verdenk"
            className="rounded-2xl bg-koraal px-6 py-3 text-center font-semibold text-white transition hover:bg-koraal/90"
          >
            Terug naar start
          </Link>
        </div>

        {!submitted && (
          <p className="mt-4 text-center text-sm text-nachtblauw/40">Resultaat wordt gedeeld…</p>
        )}
      </main>
    </div>
  );
}
