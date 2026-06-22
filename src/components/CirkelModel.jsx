import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StapKaart from "./StapKaart";
import { useTaal } from "../context/TaalContext";
import { stappen as basisStappen } from "../data/stappen";
import { terugkoppelmomenten } from "../data/terugkoppelmomenten";

const nodeRadius = 10.5;

const stapBibliotheekSlug = {
  nl: { 1: "zien", 2: "voelen", 3: "wegen", 4: "handelen", 5: "volhouden" },
  en: { 1: "seeing", 2: "feeling", 3: "weighing", 4: "acting", 5: "persisting" },
};

const stapSlugByNummer = {
  1: "zien",
  2: "voelen",
  3: "wegen",
  4: "handelen",
  5: "volhouden",
};

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

function innerPoint(pos, factor) {
  return {
    x: 50 + (pos.x - 50) * factor,
    y: 50 + (pos.y - 50) * factor
  };
}

function feedbackArcPath(vanPos, naarPos, boog) {
  const radiusFactor = boog === "ruim" ? 0.42 : 0.5;
  const start = innerPoint(vanPos, radiusFactor);
  const end = innerPoint(naarPos, radiusFactor);

  let cx;
  let cy;

  if (boog === "ruim") {
    cx = 50;
    cy = 50;
  } else {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    cx = 50 + (midX - 50) * 0.4;
    cy = 50 + (midY - 50) * 0.4;
  }

  const d = `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
  const mid = {
    x: (start.x + end.x + cx * 2) / 4,
    y: (start.y + end.y + cy * 2) / 4
  };

  return { d, mid };
}

function FeedbackTooltip({ moment, taal, position }) {
  const vraag = taal === "nl" ? moment.vraagNL : moment.vraagEN;

  return (
    <motion.div
      className="pointer-events-none absolute z-20 max-w-[220px] -translate-x-1/2 -translate-y-full px-3 py-2 text-left"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0.92, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div
        className="relative rounded-lg px-3 py-2 text-[11px] leading-snug text-white shadow-lg"
        style={{ backgroundColor: "#1a2744", fontFamily: '"DM Sans", sans-serif' }}
      >
        {vraag}
        <span
          className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent"
          style={{ borderTopColor: "#1a2744" }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

export default function CirkelModel() {
  const { t, taal } = useTaal();
  const [activeStepNumber, setActiveStepNumber] = useState(1);
  const [activeMoment, setActiveMoment] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 50, y: 50 });

  const stappen = basisStappen.map((basisStap, index) => ({
    ...basisStap,
    ...t.stappen[index],
    kleur: basisStap.kleur,
    kleurLicht: basisStap.kleurLicht,
    positie: basisStap.positie
  }));

  const stapBySlug = Object.fromEntries(
    stappen.map((stap) => [stapSlugByNummer[stap.nummer], stap])
  );

  const activeStep = stappen.find((stap) => stap.nummer === activeStepNumber) || stappen[0];
  const clockwiseArrows = stappen.slice(0, 4).map((stap, index) => [stap, stappen[index + 1]]);
  const returnPath = arrowPath(stappen[4], stappen[0]);

  const feedbackArcs = terugkoppelmomenten.map((moment) => {
    const vanStap = stapBySlug[moment.van];
    const naarStap = stapBySlug[moment.naar];
    const arc = feedbackArcPath(vanStap.positie, naarStap.positie, moment.boog);
    return { moment, ...arc };
  });

  const activeMomentData = terugkoppelmomenten.find((m) => m.id === activeMoment);

  function activateMoment(momentId, mid) {
    setTooltipPosition(mid);
    setActiveMoment((current) => (current === momentId ? null : momentId));
  }

  function hoverMoment(momentId, mid) {
    setTooltipPosition(mid);
    setActiveMoment(momentId);
  }

  function leaveMoment() {
    setActiveMoment(null);
  }

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
          <div className="relative rounded-[2.5rem] border border-rand bg-white/70 p-4 shadow-warm md:p-8">
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
                {terugkoppelmomenten.map((moment) => (
                  <marker
                    key={`marker-${moment.id}`}
                    id={`feedback-arrow-${moment.id}`}
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M 0 0 L 6 3 L 0 6 z" fill={moment.kleur} />
                  </marker>
                ))}
              </defs>

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

              <circle cx="50" cy="50" r="23" fill="none" stroke="#d3d1c7" strokeWidth="0.6" />

              {feedbackArcs.map(({ moment, d, mid }) => {
                const isActive = activeMoment === moment.id;

                return (
                  <g key={moment.id}>
                    <path
                      d={d}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="4"
                      className="cursor-pointer"
                      onPointerEnter={(event) => {
                        if (event.pointerType === "mouse") hoverMoment(moment.id, mid);
                      }}
                      onPointerLeave={(event) => {
                        if (event.pointerType === "mouse") leaveMoment();
                      }}
                      onPointerDown={(event) => {
                        if (event.pointerType === "touch") {
                          event.preventDefault();
                          activateMoment(moment.id, mid);
                        }
                      }}
                    />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={moment.kleur}
                      strokeWidth={isActive ? 2 : 1.5}
                      strokeDasharray="1.5 1.5"
                      strokeOpacity={isActive ? Math.min(moment.opacity + 0.35, 1) : moment.opacity}
                      markerEnd={`url(#feedback-arrow-${moment.id})`}
                      pointerEvents="none"
                      animate={{
                        strokeOpacity: isActive ? Math.min(moment.opacity + 0.35, 1) : moment.opacity,
                        scale: isActive ? 1.02 : 1
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    />
                  </g>
                );
              })}

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

            <AnimatePresence>
              {activeMomentData && (
                <FeedbackTooltip
                  moment={activeMomentData}
                  taal={taal}
                  position={tooltipPosition}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="lg:pl-2">
            <StapKaart stap={activeStep} />
          </div>
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
              {activeStepNumber === stap.nummer && (
                <Link
                  to={
                    taal === "nl"
                      ? `/bibliotheek/${stapBibliotheekSlug.nl[stap.nummer]}`
                      : `/library/${stapBibliotheekSlug.en[stap.nummer]}`
                  }
                  className="mt-4 inline-flex px-2 text-sm font-semibold"
                  style={{ color: stap.kleur }}
                >
                  {taal === "nl" ? "Bekijk materialen in de bibliotheek →" : "View materials in the library →"}
                </Link>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
