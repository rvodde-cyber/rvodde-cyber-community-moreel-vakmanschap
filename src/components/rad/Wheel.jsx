import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const SEGMENTEN = [
  { label: "Loyaliteit",      kleur: "#7c3aed", tekstKleur: "#fff" },
  { label: "Rechtvaardig-\nheid", kleur: "#854f0b", tekstKleur: "#fff" },
  { label: "Moed",            kleur: "#185fa5", tekstKleur: "#fff" },
  { label: "Publiek belang",  kleur: "#0f6e56", tekstKleur: "#fff" },
  { label: "Geheimhouding",   kleur: "#993556", tekstKleur: "#fff" },
  { label: "Empathie",        kleur: "#c87d2e", tekstKleur: "#fff" },
  { label: "Macht",           kleur: "#374151", tekstKleur: "#fff" },
  { label: "Veiligheid",      kleur: "#1a9080", tekstKleur: "#fff" },
];

const N = SEGMENTEN.length;
const SEGMENT_ANGLE = 360 / N;

function polarToXY(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildPath(cx, cy, r, startAngle, endAngle) {
  const p1 = polarToXY(cx, cy, r, startAngle);
  const p2 = polarToXY(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;
}

function WheelSVG({ rotation }) {
  const cx = 200;
  const cy = 200;
  const r = 190;
  const textR = 130;

  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="100%"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        <filter id="wheel-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>

      {/* Outer glow ring */}
      <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

      {/* Segments */}
      {SEGMENTEN.map((seg, i) => {
        const start = i * SEGMENT_ANGLE;
        const end = (i + 1) * SEGMENT_ANGLE;
        const mid = start + SEGMENT_ANGLE / 2;
        const textPos = polarToXY(cx, cy, textR, mid);
        const lines = seg.label.split("\n");

        return (
          <g key={i} filter="url(#wheel-shadow)">
            <path
              d={buildPath(cx, cy, r, start, end)}
              fill={seg.kleur}
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
            />
            {/* Inner lighter arc for shimmer */}
            <path
              d={buildPath(cx, cy, r * 0.45, start + 1, end - 1)}
              fill="rgba(255,255,255,0.04)"
            />
            <text
              x={textPos.x}
              y={textPos.y}
              textAnchor="middle"
              fill={seg.tekstKleur}
              fontSize="12"
              fontWeight="600"
              fontFamily="DM Sans, sans-serif"
              transform={`rotate(${mid}, ${textPos.x}, ${textPos.y})`}
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {lines.map((line, li) => (
                <tspan key={li} x={textPos.x} dy={li === 0 ? (lines.length > 1 ? "-7" : "4") : "15"}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      {/* Center circle */}
      <circle cx={cx} cy={cy} r="32" fill="#0f0d0a" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="24" fill="#c87d2e" opacity="0.9" />
    </svg>
  );
}

export default function Wheel({ onSpinComplete }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winnaar, setWinnaar] = useState(null);
  const [displayRotation, setDisplayRotation] = useState(0);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const startRotRef = useRef(0);
  const targetRotRef = useRef(0);
  const durationRef = useRef(0);

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function spin() {
    if (spinning) return;

    const extraSpins = 5 + Math.floor(Math.random() * 4); // 5-8 full rotations
    const targetSegment = Math.floor(Math.random() * N);
    // We want the pointer (at top = 0°) to land in the middle of targetSegment
    // The wheel is rotated, so segment i occupies [i*SEGMENT_ANGLE, (i+1)*SEGMENT_ANGLE]
    // Middle of target segment: (targetSegment + 0.5) * SEGMENT_ANGLE
    // We want that angle to be at top (pointer = 0°)
    // So rotation needed = 360 - (targetSegment + 0.5) * SEGMENT_ANGLE
    const segMid = (targetSegment + 0.5) * SEGMENT_ANGLE;
    const finalAngle = (360 - segMid) % 360;
    const totalRotation = rotation + extraSpins * 360 + finalAngle - (rotation % 360);

    const duration = 3500 + Math.random() * 1000;
    startTimeRef.current = null;
    startRotRef.current = rotation;
    targetRotRef.current = totalRotation;
    durationRef.current = duration;

    setSpinning(true);

    function animate(timestamp) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationRef.current, 1);
      const eased = easeOut(progress);
      const current = startRotRef.current + (targetRotRef.current - startRotRef.current) * eased;
      setDisplayRotation(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setRotation(totalRotation);
        setDisplayRotation(totalRotation);
        setSpinning(false);
        setWinnaar(SEGMENTEN[targetSegment]);
        setTimeout(() => {
          onSpinComplete(SEGMENTEN[targetSegment]);
        }, 900);
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0d0a] flex flex-col items-center justify-center px-6 py-12">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c87d2e]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#854f0b]"
        >
          Draai het rad
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-semibold text-white mb-8 text-center"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Welke waarde staat centraal?
        </motion.h2>

        {/* Wheel container with pointer */}
        <div className="relative w-full max-w-[340px]">
          {/* Pointer — top */}
          <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#c87d2e] drop-shadow-lg" />
          </div>

          {/* Wheel SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <WheelSVG rotation={displayRotation} />
          </motion.div>
        </div>

        {/* Spin button / result */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {winnaar && !spinning ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-xs text-white/40 mb-1 uppercase tracking-widest">Waarde</p>
              <p
                className="text-2xl font-bold mb-4"
                style={{ color: winnaar.kleur }}
              >
                {winnaar.label.replace("\n", "")}
              </p>
              <p className="text-sm text-white/40">Het dilemma laadt...</p>
            </motion.div>
          ) : (
            <button
              onClick={spin}
              disabled={spinning}
              className="relative group rounded-2xl bg-[#c87d2e] px-10 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#d98c3e] hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Draaien...
                </span>
              ) : (
                "Draai het rad"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
