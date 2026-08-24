import { useId, useMemo, forwardRef } from "react";
import { colors, fonts, wheelGeometry } from "../config";

const factors = [
  { key: "doelen", label: "Motiverende doelen" },
  { key: "initiatief", label: "Initiatief tonen" },
  { key: "flexibiliteit", label: "Flexibel aanpassen" },
  { key: "respect", label: "Respect voor verschillen" },
  { key: "communicatie", label: "Open communicatie" },
  { key: "verantwoordelijkheid", label: "Gedeelde verantwoordelijkheid" },
];

const results = ["Uitdaging", "Energie", "Ontwikkeling", "Vertrouwen", "Helderheid", "Verbinding"];

const NIVEAU_TRAVEL = { kwetsbaar: 0, groeiend: 0.5, sterk: 1 };

function nodePosition(index, radius, cx, cy) {
  const angleDeg = -90 + index * 60;
  const angleRad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angleRad), y: cy + radius * Math.sin(angleRad) };
}

function labelPosition(index, radius, cx, cy) {
  const angleDeg = -90 + 30 + index * 60;
  const angleRad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angleRad), y: cy + radius * Math.sin(angleRad) };
}

function knobRadiusVoorNiveau(niveau, minRadius, maxRadius) {
  if (!niveau) return minRadius;
  const t = NIVEAU_TRAVEL[niveau];
  return minRadius + t * (maxRadius - minRadius);
}

function wrapText(text, maxChars = 14) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function GlassKnob({ x, y, radius, opacity = 1, animate = true, fillId, shadowId }) {
  return (
    <g opacity={opacity}>
      <circle
        className={animate ? "wheel-knob" : "wheel-knob wheel-knob--static"}
        cx={x}
        cy={y}
        r={radius}
        fill={`url(#${fillId})`}
        filter={`url(#${shadowId})`}
      />
      <ellipse
        className={animate ? "wheel-knob-highlight" : "wheel-knob-highlight wheel-knob--static"}
        cx={x - radius * 0.3}
        cy={y - radius * 0.35}
        rx={radius * 0.28}
        ry={radius * 0.18}
        fill="#FFFFFF"
        opacity="0.55"
      />
    </g>
  );
}

export default forwardRef(function TeamWheel({ scores = {}, variant = "dots", style }, ref) {
  const uid = useId().replace(/:/g, "");
  const ids = {
    rim: `rimGradient-${uid}`,
    spoke: `spokeGradient-${uid}`,
    knob: `knobGradient-${uid}`,
    hub: `hubGradient-${uid}`,
    softShadow: `softShadow-${uid}`,
    knobShadow: `knobShadow-${uid}`,
    spokeMask: `spokeMask-${uid}`,
  };

  const {
    viewBox,
    center,
    hubRadius,
    rimRadius,
    rimStrokeWidth,
    spokeWidth,
    knobRadius,
    knobPositionRadius,
    knobTravelMinRadius,
    knobTravelMaxRadius,
    factorLabelRadius,
    resultLabelRadius,
  } = wheelGeometry;
  const { x: cx, y: cy } = center;

  const isPreview = variant === "preview";
  const isFilled = variant === "filled";
  const showResults = !isPreview;
  const travelMin = knobTravelMinRadius;
  const travelMax = knobTravelMaxRadius;
  const fixedKnobRadius = knobPositionRadius;

  const knobPositions = useMemo(
    () =>
      factors.map((factor, i) => {
        if (isPreview || isFilled) {
          return nodePosition(i, fixedKnobRadius, cx, cy);
        }
        const radius = knobRadiusVoorNiveau(scores[factor.key], travelMin, travelMax);
        return nodePosition(i, radius, cx, cy);
      }),
    [scores, isPreview, isFilled, travelMin, travelMax, fixedKnobRadius, cx, cy]
  );

  const polygonPoints = knobPositions
    .filter((_, i) => scores[factors[i].key])
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  const factorLabelPositions = factors.map((_, i) =>
    nodePosition(i, factorLabelRadius, cx, cy)
  );
  const resultLabelPositions = results.map((_, i) =>
    labelPosition(i, resultLabelRadius, cx, cy)
  );

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
        ...style,
      }}
    >
      <svg
        viewBox={viewBox}
        width="100%"
        overflow="visible"
        style={{ display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={ids.rim}
            gradientUnits="userSpaceOnUse"
            x1={cx}
            y1={cy - rimRadius}
            x2={cx}
            y2={cy + rimRadius}
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="45%" stopColor={colors.hubRing} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.dotsStrong} stopOpacity="0.9" />
          </linearGradient>

          {factors.map((factor, i) => {
            const hubEdge = nodePosition(i, hubRadius, cx, cy);
            const knobPos = nodePosition(i, knobPositionRadius, cx, cy);
            return (
              <linearGradient
                key={`${ids.spoke}-${factor.key}`}
                id={`${ids.spoke}-${factor.key}`}
                gradientUnits="userSpaceOnUse"
                x1={hubEdge.x}
                y1={hubEdge.y}
                x2={knobPos.x}
                y2={knobPos.y}
              >
                <stop offset="0%" stopColor={colors.hubRing} stopOpacity="1" />
                <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="100%" stopColor={colors.dotsStrong} stopOpacity="1" />
              </linearGradient>
            );
          })}

          <radialGradient id={ids.knob} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor={colors.dotsLight} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.dotsStrong} stopOpacity="0.85" />
          </radialGradient>

          <radialGradient id={ids.hub} cx="35%" cy="25%" r="80%">
            <stop offset="0%" stopColor="#4A3420" stopOpacity="1" />
            <stop offset="60%" stopColor={colors.projectionBg} stopOpacity="1" />
            <stop offset="100%" stopColor="#151210" stopOpacity="1" />
          </radialGradient>

          <filter id={ids.softShadow} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={colors.labelAccent} floodOpacity="0.22" />
          </filter>

          <filter id={ids.knobShadow} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={colors.labelAccent} floodOpacity="0.28" />
          </filter>

          <mask id={ids.spokeMask} maskUnits="userSpaceOnUse">
            <rect x={-40} y={-40} width={680} height={680} fill="white" />
            <circle cx={cx} cy={cy} r={hubRadius + 1} fill="black" />
          </mask>
        </defs>

        {variant === "filled" && !isPreview && polygonPoints && (
          <polygon
            points={polygonPoints}
            fill={colors.dotsStrong}
            fillOpacity={0.12}
            stroke={colors.dotsStrong}
            strokeWidth={1}
            strokeOpacity={0.35}
          />
        )}

        <circle
          cx={cx}
          cy={cy}
          r={rimRadius}
          fill="none"
          stroke={`url(#${ids.rim})`}
          strokeWidth={rimStrokeWidth}
          filter={`url(#${ids.softShadow})`}
        />

        <circle
          cx={cx}
          cy={cy + 4}
          r={hubRadius}
          fill={colors.labelAccent}
          opacity="0.18"
        />
        <g mask={`url(#${ids.spokeMask})`}>
          {factors.map((factor, i) => {
            const hubEdge = nodePosition(i, hubRadius, cx, cy);
            const knobPos = nodePosition(i, knobPositionRadius, cx, cy);
            return (
              <line
                key={`spoke-${factor.key}`}
                x1={hubEdge.x}
                y1={hubEdge.y}
                x2={knobPos.x}
                y2={knobPos.y}
                stroke={`url(#${ids.spoke}-${factor.key})`}
                strokeWidth={spokeWidth}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        <circle cx={cx} cy={cy} r={hubRadius} fill={colors.projectionBg} />
        <circle
          cx={cx}
          cy={cy}
          r={hubRadius}
          fill={`url(#${ids.hub})`}
        />
        <ellipse
          cx={cx - hubRadius * 0.25}
          cy={cy - hubRadius * 0.4}
          rx={hubRadius * 0.55}
          ry={hubRadius * 0.3}
          fill="#FFFFFF"
          opacity="0.12"
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={colors.surface}
          fontFamily={fonts.voice}
          fontSize={16}
          fontWeight={600}
        >
          {wrapText("Geïnspireerd samenwerken", 16).map((line, i, arr) => (
            <tspan key={line} x={cx} dy={i === 0 ? -(arr.length - 1) * 9 : 18}>
              {line}
            </tspan>
          ))}
        </text>

        {factors.map((factor, i) => {
          const pos = knobPositions[i];
          const niveau = scores[factor.key];
          const opacity = isPreview || niveau ? 1 : 0.35;
          return (
            <GlassKnob
              key={factor.key}
              x={pos.x}
              y={pos.y}
              radius={knobRadius}
              opacity={opacity}
              animate={!isPreview}
              fillId={ids.knob}
              shadowId={ids.knobShadow}
            />
          );
        })}

        {factors.map((factor, i) => {
          const pos = factorLabelPositions[i];
          const angleDeg = -90 + i * 60;
          const anchor =
            Math.abs((((angleDeg % 360) + 360) % 360) - 90) < 1
              ? "middle"
              : angleDeg > -90 && angleDeg < 90
                ? "start"
                : "end";

          return wrapText(factor.label, 16).map((line, li, arr) => (
            <text
              key={`${factor.key}-${line}`}
              x={pos.x}
              y={pos.y + (li - (arr.length - 1) / 2) * 15}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill={colors.labelAccent}
              fontFamily={fonts.ui}
              fontSize={12}
              fontWeight={500}
            >
              {line}
            </text>
          ));
        })}

        {showResults &&
          results.map((result, i) => {
            const pos = resultLabelPositions[i];
            return (
              <text
                key={result}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={colors.labelAccent}
                fontFamily={fonts.ui}
                fontSize={12}
                opacity={0.85}
              >
                {result}
              </text>
            );
          })}
      </svg>
    </div>
  );
});
