import { useId } from "react";
import { LIKERT_LABELS } from "../config/chassisPlaceholders";

const MIN = 1;
const MAX = 5;
const VALUES = [1, 2, 3, 4, 5];

/** Map Likert 1–5 to needle angle (degrees). Arc spans ~240° from -120 to +120. */
function valueToAngle(value) {
  const t = (value - MIN) / (MAX - MIN);
  return -120 + t * 240;
}

function polar(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/**
 * Draaiknop — Likert 1–5.
 * Tikken op vijf vaste posities (geen slepen). Toetsenbord: pijltjes / Home / End.
 * Spec hfdst. 11 intent: aria-valuetext met woordelijke schaal.
 */
export default function DialKnob({ value, onChange, labelledBy, disabled = false }) {
  const labelId = useId();
  const numeric = typeof value === "number" ? value : null;
  const angle = numeric == null ? -120 : valueToAngle(numeric);
  const valueText =
    numeric == null ? "Nog geen keuze" : `${numeric}, ${LIKERT_LABELS[numeric]}`;

  const select = (next) => {
    if (disabled) return;
    const clamped = Math.min(MAX, Math.max(MIN, next));
    onChange(clamped);
  };

  const onKeyDown = (event) => {
    if (disabled) return;
    const current = numeric ?? 3;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      select(current + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      select(current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(MIN);
    } else if (event.key === "End") {
      event.preventDefault();
      select(MAX);
    }
  };

  const cx = 100;
  const cy = 100;
  const rTrack = 72;
  const rTick = 84;
  const needle = polar(cx, cy, 52, angle);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 200 200"
        className="h-56 w-56 touch-manipulation sm:h-64 sm:w-64"
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={numeric ?? undefined}
        aria-valuetext={valueText}
        aria-labelledby={labelledBy || labelId}
        aria-disabled={disabled || undefined}
        onKeyDown={onKeyDown}
      >
        <defs>
          <linearGradient id="dialFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7F8F6" />
            <stop offset="100%" stopColor="#E4EBE6" />
          </linearGradient>
        </defs>

        {/* Face */}
        <circle cx={cx} cy={cy} r="88" fill="url(#dialFace)" stroke="rgba(20,32,26,0.08)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="64" fill="rgba(255,255,255,0.72)" stroke="rgba(11,61,46,0.12)" strokeWidth="1" />

        {/* Track arc */}
        <path
          d={describeArc(cx, cy, rTrack, -120, 120)}
          fill="none"
          stroke="rgba(11,61,46,0.18)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Five tap targets — no drag */}
        {VALUES.map((v) => {
          const a = valueToAngle(v);
          const tick = polar(cx, cy, rTick, a);
          const hit = polar(cx, cy, rTrack, a);
          const selected = numeric === v;
          return (
            <g key={v}>
              <circle
                cx={hit.x}
                cy={hit.y}
                r="18"
                fill="transparent"
                className={disabled ? "" : "cursor-pointer"}
                onClick={() => select(v)}
              >
                <title>{`${v} — ${LIKERT_LABELS[v]}`}</title>
              </circle>
              <circle
                cx={tick.x}
                cy={tick.y}
                r={selected ? 5 : 3.5}
                fill={selected ? "#0B3D2E" : "rgba(11,61,46,0.35)"}
                className={disabled ? "" : "cursor-pointer"}
                onClick={() => select(v)}
                aria-hidden="true"
              />
              <text
                x={polar(cx, cy, 96, a).x}
                y={polar(cx, cy, 96, a).y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="select-none"
                fill={selected ? "#0B3D2E" : "#6B7871"}
                fontSize="11"
                fontWeight={selected ? 600 : 500}
                onClick={() => select(v)}
                style={{ cursor: disabled ? "default" : "pointer" }}
              >
                {v}
              </text>
            </g>
          );
        })}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needle.x}
          y2={needle.y}
          stroke="#0B3D2E"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            transition: "x2 280ms cubic-bezier(0.22,1,0.36,1), y2 280ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <circle cx={cx} cy={cy} r="7" fill="#0B3D2E" />
        <circle cx={cx} cy={cy} r="3" fill="#F7F8F6" />
      </svg>

      <p id={labelId} className="text-sm font-medium text-ink-soft">
        {valueText}
      </p>
    </div>
  );
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polar(cx, cy, r, endAngle);
  const end = polar(cx, cy, r, startAngle);
  const large = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}
