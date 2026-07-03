import { motion } from "framer-motion";

const STEP_LAYOUT = [
  { nummer: 1, cx: 180, cy: 68, solidWhenInactive: true },
  { nummer: 2, cx: 286.5, cy: 145.5, solidWhenInactive: false },
  { nummer: 3, cx: 243, cy: 270.5, solidWhenInactive: false },
  { nummer: 4, cx: 117, cy: 270.5, solidWhenInactive: false },
  { nummer: 5, cx: 73.5, cy: 145.5, solidWhenInactive: false },
];

const ARROWS = [
  "M 206 78 A 120 120 0 0 1 278 132",
  "M 298 168 A 120 120 0 0 1 260 258",
  "M 228 292 A 120 120 0 0 1 132 292",
  "M 62 258 A 120 120 0 0 1 82 132",
  "M 100 78 A 120 120 0 0 1 154 68",
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

export default function ModelWheel({
  stappen,
  activeStepNumber,
  onStepSelect,
  kern,
  kernSub,
  kernLine1,
  kernLine2,
  ariaLabel,
}) {
  return (
    <svg viewBox="0 0 360 360" role="img" aria-label={ariaLabel} className="h-auto w-full">
      <defs>
        <marker id="mv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#c4bdb2" />
        </marker>
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

      {ARROWS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="#c4bdb2"
          strokeWidth="3"
          markerEnd="url(#mv-arrow)"
        />
      ))}

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
            onClick={() => onStepSelect(layout.nummer)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
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
    </svg>
  );
}
