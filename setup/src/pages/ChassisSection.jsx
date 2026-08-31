import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DialKnob from "../components/DialKnob";
import SectionProgress from "../components/SectionProgress";
import { chassisItems } from "../config/chassisPlaceholders";

/**
 * Fase 2 — Chassis-sjabloonpagina.
 * Wordt het sjabloon voor Rijlijn/Vermogen/Chauffeur/Pitcrew.
 * Vraagteksten zijn placeholders tot de instrument-spec in de repo staat.
 */
export default function ChassisSection() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const item = chassisItems[index];
  const answeredCount = useMemo(
    () => chassisItems.filter((entry) => typeof answers[entry.id] === "number").length,
    [answers]
  );
  const isLast = index === chassisItems.length - 1;
  const currentValue = answers[item.id];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow text-racing">Setup · Chassis</p>
          <Link to="/" className="btn-ghost !px-3 !py-1.5 text-xs">
            Terug naar start
          </Link>
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Organisatiediagnose
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
          ESH-variabelen, één stelling tegelijk. Antwoord met de draaiknop (tik op een stand).
          Spreiding tussen respondenten is later het signaal — niet het gemiddelde.
        </p>
      </header>

      <SectionProgress
        activeId="chassis"
        completedIds={[]}
        answeredInActive={answeredCount}
        totalInActive={chassisItems.length}
      />

      {/* Placeholder-illustratie: gradient in palet (Firefly later) */}
      <div
        className="mt-8 h-28 overflow-hidden rounded-panel border border-hairline sm:h-36"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(42rem 18rem at 18% 40%, rgba(11,61,46,0.28), transparent 55%), radial-gradient(36rem 16rem at 82% 30%, rgba(58,79,99,0.22), transparent 58%), linear-gradient(135deg, #0B3D2E 0%, #1A5C45 42%, #3A4F63 100%)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.section
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="glass mt-6 p-6 sm:p-9"
        >
          <p className="eyebrow">{item.dimension}</p>
          <h2
            id={`chassis-item-${item.id}`}
            className="mt-2 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl"
          >
            {item.text}
          </h2>
          <p className="mt-2 text-xs text-ink-muted">
            Placeholder-tekst — vervangen zodra de instrument-spec binnen is.
          </p>

          <div className="mt-8 flex justify-center">
            <DialKnob
              value={currentValue}
              onChange={(next) => setAnswers((prev) => ({ ...prev, [item.id]: next }))}
              labelledBy={`chassis-item-${item.id}`}
            />
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              Vorige
            </button>
            <button
              type="button"
              className="btn-primary"
              disabled={typeof currentValue !== "number"}
              onClick={() => {
                if (isLast) return;
                setIndex((i) => Math.min(chassisItems.length - 1, i + 1));
              }}
            >
              {isLast ? "Sectie rond" : "Volgende"}
              {!isLast ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </div>
        </motion.section>
      </AnimatePresence>

      <footer className="mt-12 border-t border-hairline pt-6 text-xs text-ink-muted">
        Fase 2-sjabloon · accent racing green · rood blijft gereserveerd voor isolatierisico
      </footer>
    </div>
  );
}
