import { useState } from "react";
import { motion } from "framer-motion";
import StapKaart from "./StapKaart";
import StepBibliotheek from "./StepBibliotheek";
import { useTaal } from "../context/TaalContext";
import { stappen as basisStappen } from "../data/stappen";

const nodeRadius = 10.5;

function offsetPoint(from, to, distance) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  return {
    x: from.x + (dx / length) * distance,
    y: from.y + (dy / length) * distance
  };
}

function arrowPath(fromStep, toStep) {
  const from = fromStep.positie;
  const to = toStep.positie;
  const start = offsetPoint(from, to, nodeRadius);
  const end = offsetPoint(to, from, nodeRadius + 1.5);

  return `M ${start.x} ${start.y} Q 50 50 ${end.x} ${end.y}`;
}

export default function CirkelModel() {
  const { t } = useTaal();
  const [activeStepNumber, setActiveStepNumber] = useState(1);
  const stappen = basisStappen.map((basisStap, index) => ({
    ...basisStap,
    ...t.stappen[index],
    kleur: basisStap.kleur,
    kleurLicht: basisStap.kleurLicht,
    positie: basisStap.positie
  }));
  const activeStep = stappen.find((stap) => stap.nummer === activeStepNumber) || stappen[0];
  const clockwiseArrows = stappen.slice(0, 4).map((stap, index) => [stap, stappen[index + 1]]);
  const returnPath = arrowPath(stappen[4], stappen[0]);

  return (
    <section id="model" className="bg-achtergrond py-20 md:py-28">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-secundair">
            {t.model.titel}
          </p>
          <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
            {t.model.subtitel}
          </h2>
        </div>

        <div className="hidden gap-10 md:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
          <div className="rounded-[2.5rem] border border-rand bg-white/70 p-4 shadow-warm md:p-8">
            <svg viewBox="0 0 100 100" role="img" aria-label={t.model.titel}>
              <defs>
                <marker
                  id="arrow-head"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#b8b4a6" />
                </marker>
              </defs>

              <circle cx="50" cy="50" r="23" fill="none" stroke="#d3d1c7" strokeWidth="0.6" />

              {clockwiseArrows.map(([from, to]) => (
                <path
                  key={`${from.nummer}-${to.nummer}`}
                  d={arrowPath(from, to)}
                  fill="none"
                  stroke="#b8b4a6"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head)"
                />
              ))}

              <path
                d={returnPath}
                fill="none"
                stroke="#b8b4a6"
                strokeDasharray="2.2 2.2"
                strokeWidth="1.1"
              />

              <g>
                <circle cx="50" cy="50" r="14.5" fill="#eeedfe" stroke="#534ab7" strokeWidth="1.7" />
                <text
                  x="50"
                  y="48.5"
                  textAnchor="middle"
                  fill="#534ab7"
                  fontSize="5.6"
                  fontWeight="700"
                  letterSpacing="0.7"
                >
                  {t.model.kern}
                </text>
                <text x="50" y="55" textAnchor="middle" fill="#534ab7" fontSize="3.4" fontWeight="600">
                  {t.model.kernSub}
                </text>
                <text x="50" y="60" textAnchor="middle" fill="#534ab7" fontSize="2.5" fontWeight="500">
                  {t.model.kernTekst}
                </text>
              </g>

              {stappen.map((stap) => {
                const isActive = activeStep.nummer === stap.nummer;
                const textColor = isActive ? "#ffffff" : stap.kleur;

                return (
                  <motion.g
                    key={stap.nummer}
                    role="button"
                    tabIndex="0"
                    aria-label={`${stap.nummer}. ${stap.naam}`}
                    onClick={() => setActiveStepNumber(stap.nummer)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveStepNumber(stap.nummer);
                      }
                    }}
                    className="cursor-pointer outline-none"
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    whileHover={{
                      scale: 1.06,
                      filter: `drop-shadow(0 0 10px ${stap.kleur}55)`
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <title>{`${stap.nummer}. ${stap.naam}`}</title>
                    <circle
                      cx={stap.positie.x}
                      cy={stap.positie.y}
                      r={nodeRadius}
                      fill={isActive ? stap.kleur : stap.kleurLicht}
                      stroke={stap.kleur}
                      strokeWidth={isActive ? 2.8 : 1.2}
                    />
                    <text
                      x={stap.positie.x}
                      y={stap.positie.y - 1.8}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="4.6"
                      fontWeight="800"
                    >
                      {stap.nummer}
                    </text>
                    <text
                      x={stap.positie.x}
                      y={stap.positie.y + 4.3}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="3.7"
                      fontWeight="700"
                    >
                      {stap.naam}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          <div className="lg:pl-2">
            <StapKaart stap={activeStep} />
          </div>
        </div>

        <div className="hidden md:block">
          <StepBibliotheek stapNummer={activeStepNumber} />
        </div>

        <div className="grid gap-5 md:hidden">
          {stappen.map((stap) => (
            <div key={stap.nummer}>
              <StapKaart
                stap={stap}
                compact
                isActive={activeStepNumber === stap.nummer}
                onSelect={() => setActiveStepNumber(stap.nummer)}
              />
              {activeStepNumber === stap.nummer && <StepBibliotheek stapNummer={stap.nummer} />}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
