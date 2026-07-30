import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 150;
const LABEL_RADIUS = RADIUS * 0.64;

/** Punt op de cirkel, hoek in graden met de klok mee vanaf bovenaan (12 uur). */
function pointOnCircle(angleDeg, radius = RADIUS) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.sin(rad),
    y: CENTER - radius * Math.cos(rad),
  };
}

function slicePath(startAngle, endAngle) {
  const start = pointOnCircle(startAngle);
  const end = pointOnCircle(endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

/**
 * Geanimeerd draaiend rad. Kiest willekeurig een segment en landt daar
 * exact onder de wijzer. Roept `onResult(segment)` aan na de spin.
 */
export default function Wheel({ segments, ui, onResult, disabled }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const rotationRef = useRef(0);
  const pendingWinner = useRef(null);
  const sliceAngle = 360 / segments.length;

  const slices = useMemo(
    () =>
      segments.map((seg, i) => {
        const start = i * sliceAngle;
        const end = start + sliceAngle;
        const mid = start + sliceAngle / 2;
        let labelRot = mid - 90;
        if (mid > 180) labelRot += 180;
        const labelPos = pointOnCircle(mid, LABEL_RADIUS);
        return { seg, path: slicePath(start, end), mid, labelRot, labelPos };
      }),
    [segments, sliceAngle]
  );

  function handleSpin() {
    if (spinning || disabled) return;
    setSpinning(true);

    const winnerIndex = Math.floor(Math.random() * segments.length);
    const centerAngle = winnerIndex * sliceAngle + sliceAngle / 2;
    const current = rotationRef.current;
    const base = current + 5 * 360;
    const target = base + (((-centerAngle - base) % 360) + 360) % 360;

    rotationRef.current = target;
    setRotation(target);

    // Fallback voor het geval onAnimationComplete niet vuurt.
    window.setTimeout(() => {
      setSpinning((s) => {
        if (s) onResult?.(segments[winnerIndex]);
        return false;
      });
    }, 4400);

    // Winnaar onthullen gebeurt in onAnimationComplete hieronder.
    pendingWinner.current = segments[winnerIndex];
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Wijzer bovenaan */}
        <div
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1"
          aria-hidden="true"
        >
          <svg width="34" height="30" viewBox="0 0 34 30">
            <path
              d="M17 30 L2 2 Q17 -3 32 2 Z"
              fill="#1a2744"
              stroke="#fdfcfa"
              strokeWidth="2"
            />
          </svg>
        </div>

        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => {
            if (spinning && pendingWinner.current) {
              setSpinning(false);
              onResult?.(pendingWinner.current);
              pendingWinner.current = null;
            }
          }}
          style={{ width: SIZE, height: SIZE, transformOrigin: "center" }}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            role="img"
            aria-label={ui.titel}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS + 6}
              fill="#fdfcfa"
              stroke="#d8d3c9"
              strokeWidth="2"
            />
            {slices.map(({ seg, path, labelRot, labelPos }, i) => (
              <g key={seg.id}>
                <path d={path} fill={seg.color} stroke="#fdfcfa" strokeWidth="2" />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="DM Sans, sans-serif"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${labelRot} ${labelPos.x} ${labelPos.y})`}
                >
                  {ui.segmentLabel(seg)}
                </text>
              </g>
            ))}
            {/* Naaf */}
            <circle cx={CENTER} cy={CENTER} r="26" fill="#fdfcfa" stroke="#d8d3c9" strokeWidth="2" />
            <circle cx={CENTER} cy={CENTER} r="8" fill="#1a2744" />
          </svg>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={handleSpin}
        disabled={spinning || disabled}
        className="rounded-full bg-[#1a2744] px-10 py-3.5 text-base font-semibold text-white shadow-warm transition hover:bg-[#26365c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {spinning ? ui.spinning : ui.spin}
      </button>
    </div>
  );
}
