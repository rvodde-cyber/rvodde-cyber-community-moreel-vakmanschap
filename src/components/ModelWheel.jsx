import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { interactievePijlen, voorwaartsePijlen, STAP_KLEUREN } from "../data/cyclusPijlen";
import { getBibliotheekDataLang } from "../data/vertalingen";

const STEP_LAYOUT = [
  { nummer: 1, key: "zien", cx: 180, cy: 68, solidWhenInactive: true },
  { nummer: 2, key: "voelen", cx: 286.5, cy: 145.5, solidWhenInactive: false },
  { nummer: 3, key: "wegen", cx: 243, cy: 270.5, solidWhenInactive: false },
  { nummer: 4, key: "handelen", cx: 117, cy: 270.5, solidWhenInactive: false },
  { nummer: 5, key: "volhouden", cx: 73.5, cy: 145.5, solidWhenInactive: false },
];

const DASH_LINES = [
  [180, 180, 180, 68],
  [180, 180, 286.5, 145.5],
  [180, 180, 243, 270.5],
  [180, 180, 117, 270.5],
  [180, 180, 73.5, 145.5],
];

const STAR_TRIANGLES = [
  { points: "180,122 158,168 206,168", fill: "#993C1D" },
  { points: "238,146 198,178 218,218", fill: "#6B4C9A" },
  { points: "226,238 178,218 178,268", fill: "#0F6E56" },
  { points: "134,238 162,218 142,178", fill: "#993556" },
  { points: "122,146 162,178 142,138", fill: "#854F0B" },
];

function stepStyle(stap, layout, isActive) {
  const solid = isActive || layout.solidWhenInactive;
  return {
    fill: solid ? stap.kleur : stap.kleurLicht,
    stroke: solid && layout.solidWhenInactive && !isActive ? "none" : stap.kleur,
    strokeWidth: solid && layout.solidWhenInactive && !isActive ? 0 : isActive ? 2.8 : 2.5,
    text: solid && (isActive || layout.solidWhenInactive) ? "#ffffff" : stap.kleur,
  };
}

function midpointOnArc(pathD) {
  const nums = pathD.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  if (nums.length < 4) return { x: 180, y: 180 };
  const x1 = nums[0];
  const y1 = nums[1];
  const x2 = nums[nums.length - 2];
  const y2 = nums[nums.length - 1];
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
}

function wrapLabel(label, maxChars = 32) {
  const words = label.split(/\s+/);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function ArrowTooltip({ pijl, label, anchor }) {
  const kleur = STAP_KLEUREN[pijl.naar];
  const lines = wrapLabel(label, pijl.isHoofdTerugkoppeling ? 28 : 34);
  const width = Math.min(200, Math.max(100, Math.max(...lines.map((l) => l.length)) * 6.4 + 20));
  const height = 12 + lines.length * 14;
  const x = Math.max(6, Math.min(360 - width - 6, anchor.x - width / 2));
  const y = Math.max(6, Math.min(360 - height - 6, anchor.y - height - 10));

  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ pointerEvents: "none" }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="8"
        fill="#ffffff"
        stroke={kleur}
        strokeWidth="1.5"
        filter="url(#mv-tooltip-shadow)"
      />
      <rect x={x} y={y} width="4" height={height} rx="2" fill={kleur} />
      <text
        textAnchor="middle"
        fill={kleur}
        fontFamily="DM Sans, Arial, sans-serif"
        fontSize="10"
        fontWeight="600"
      >
        {lines.map((line, index) => (
          <tspan key={line} x={x + width / 2 + 2} y={y + 16 + index * 14}>
            {line}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}

export default function ModelWheel({
  stappen,
  activeStepNumber,
  onStepSelect,
  kern,
  kernSub,
  kernLine1,
  kernLine2,
  ariaLabel,
  taal = "nl",
}) {
  const uid = useId().replace(/:/g, "");
  const dataLang = getBibliotheekDataLang(taal);
  const [activePijlId, setActivePijlId] = useState(null);

  useEffect(() => {
    if (!activePijlId) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setActivePijlId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePijlId]);

  const activePijl = interactievePijlen.find((p) => p.id === activePijlId) ?? null;
  const activeLabel = activePijl
    ? dataLang === "nl"
      ? activePijl.labelNL
      : activePijl.labelEN
    : "";

  return (
    <svg
      viewBox="0 0 360 360"
      role="img"
      aria-label={ariaLabel}
      className="h-auto w-full"
      onClick={(event) => {
        if (event.target === event.currentTarget) setActivePijlId(null);
      }}
    >
      <defs>
        <marker id={`mv-arrow-fwd-${uid}`} markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#c4bdb2" />
        </marker>
        {interactievePijlen.map((pijl) => (
          <marker
            key={`marker-${pijl.id}`}
            id={`mv-arrow-${uid}-${pijl.id}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill={STAP_KLEUREN[pijl.naar]} />
          </marker>
        ))}
        <filter id="mv-tooltip-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1a2744" floodOpacity="0.12" />
        </filter>
      </defs>

      <rect width="360" height="360" fill="#fdfcfa" rx="12" />
      <circle cx="180" cy="180" r="126" fill="none" stroke="#e0dbd2" strokeWidth="1" />

      {STAR_TRIANGLES.map((tri) => (
        <polygon key={tri.points} points={tri.points} fill={tri.fill} opacity="0.85" />
      ))}

      {DASH_LINES.map(([x1, y1, x2, y2]) => (
        <line
          key={`${x1}-${x2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#d5cfc6"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {/* Structurele voorwaartse cycluspijlen */}
      {voorwaartsePijlen.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="#c4bdb2"
          strokeWidth="2.5"
          strokeOpacity="0.85"
          markerEnd={`url(#mv-arrow-fwd-${uid})`}
        />
      ))}

      {/* Zes interactieve terugkoppel-pijlen */}
      {interactievePijlen.map((pijl) => {
        const kleur = STAP_KLEUREN[pijl.naar];
        const isActive = activePijlId === pijl.id;
        const label = dataLang === "nl" ? pijl.labelNL : pijl.labelEN;
        const dashArray = pijl.isHoofdTerugkoppeling ? "8 5" : "3.5 3.5";

        return (
          <g key={pijl.id}>
            <path
              d={pijl.path}
              fill="none"
              stroke="transparent"
              strokeWidth="18"
              className="cursor-pointer"
              onMouseEnter={() => {
                if (canHover()) setActivePijlId(pijl.id);
              }}
              onMouseLeave={() => {
                if (canHover()) setActivePijlId((prev) => (prev === pijl.id ? null : prev));
              }}
              onClick={(event) => {
                event.stopPropagation();
                setActivePijlId((prev) => (prev === pijl.id ? null : pijl.id));
              }}
            >
              <title>{label}</title>
            </path>
            <motion.path
              d={pijl.path}
              fill="none"
              stroke={kleur}
              strokeWidth={isActive ? pijl.strokeWidth + 0.8 : pijl.strokeWidth}
              strokeOpacity={isActive ? 1 : pijl.opacity}
              strokeDasharray={dashArray}
              strokeLinecap="round"
              markerEnd={`url(#mv-arrow-${uid}-${pijl.id})`}
              className="pointer-events-none"
              animate={{ strokeOpacity: isActive ? 1 : pijl.opacity }}
              transition={{ duration: 0.2 }}
            />
          </g>
        );
      })}

      <g aria-hidden="true">
        <circle cx="180" cy="180" r="46" fill="#F3EEFC" stroke="#6B4C9A" strokeWidth="3" />
        <text textAnchor="middle" fill="#185FA5" fontFamily="DM Sans, Arial, sans-serif">
          <tspan x="180" y="168" fontSize="15" fontWeight="700">
            {kern}
          </tspan>
          <tspan x="180" dy="14" fontSize="9.5" fontWeight="500">
            {kernSub}
          </tspan>
          <tspan x="180" dy="11" fontSize="7.5" fontWeight="400">
            {kernLine1}
          </tspan>
          <tspan x="180" dy="10" fontSize="7.5" fontWeight="400">
            {kernLine2}
          </tspan>
        </text>
      </g>

      {STEP_LAYOUT.map((layout) => {
        const stap = stappen.find((s) => s.nummer === layout.nummer);
        if (!stap) return null;

        const isActive = activeStepNumber === layout.nummer;
        const style = stepStyle(stap, layout, isActive);

        return (
          <motion.g
            key={layout.nummer}
            role="button"
            tabIndex={0}
            aria-label={`${layout.nummer}. ${stap.naam}`}
            aria-pressed={isActive}
            onClick={() => {
              setActivePijlId(null);
              onStepSelect(layout.nummer);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActivePijlId(null);
                onStepSelect(layout.nummer);
              }
            }}
            className="cursor-pointer outline-none"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <circle
              cx={layout.cx}
              cy={layout.cy}
              r="32"
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
            />
            <text textAnchor="middle" fill={style.text} fontFamily="DM Sans, Arial, sans-serif" pointerEvents="none">
              <tspan x={layout.cx} y={layout.cy - 4} fontSize="13" fontWeight="600">
                {layout.nummer}
              </tspan>
              <tspan x={layout.cx} dy="14" fontSize="11" fontWeight="500">
                {stap.naam}
              </tspan>
            </text>
          </motion.g>
        );
      })}

      <AnimatePresence>
        {activePijl && (
          <ArrowTooltip pijl={activePijl} label={activeLabel} anchor={midpointOnArc(activePijl.path)} />
        )}
      </AnimatePresence>
    </svg>
  );
}
