import { useMemo, forwardRef } from "react";
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

const NIVEAU_TRAVEL = { kwetsbaar: 0.33, groeiend: 0.66, sterk: 1 };

const VIEWBOX_PARTS = wheelGeometry.viewBox.split(/\s+/).map(Number);
const [VB_X, VB_Y, VB_W, VB_H] = VIEWBOX_PARTS;

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

function hubEdgePoint(index, hubRadius, cx, cy) {
  const angleDeg = -90 + index * 60;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + hubRadius * Math.cos(angleRad),
    y: cy + hubRadius * Math.sin(angleRad),
  };
}

function rimPoint(index, rimRadius, cx, cy) {
  return nodePosition(index, rimRadius, cx, cy);
}

function knobTravelRadius(niveau, minRadius, maxRadius) {
  if (!niveau) return minRadius;
  const t = NIVEAU_TRAVEL[niveau];
  return minRadius + (maxRadius - minRadius) * t;
}

function toPercent(x, y) {
  return {
    left: `${((x - VB_X) / VB_W) * 100}%`,
    top: `${((y - VB_Y) / VB_H) * 100}%`,
  };
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

export default forwardRef(function TeamWheel({ scores = {}, variant = "dots", style }, ref) {
  const {
    viewBox,
    center,
    hubRadius,
    rimRadius,
    rimStrokeWidth,
    spokeWidth,
    knobRadius,
    knobTravelMinRadius,
    knobTravelMaxRadius,
    factorLabelRadius,
    resultLabelRadius,
  } = wheelGeometry;
  const { x: cx, y: cy } = center;

  const isPreview = variant === "preview";
  const showResults = !isPreview;
  const travelMin = knobTravelMinRadius;
  const travelMax = knobTravelMaxRadius;

  const knobPositions = useMemo(
    () =>
      factors.map((factor, i) => {
        if (isPreview) return nodePosition(i, travelMax, cx, cy);
        const radius = knobTravelRadius(scores[factor.key], travelMin, travelMax);
        return nodePosition(i, radius, cx, cy);
      }),
    [scores, isPreview, travelMin, travelMax, cx, cy]
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

  const knobSizePct = (knobRadius * 2 / VB_W) * 100;
  const knobOffsetPct = (knobRadius / VB_W) * 100;

  const knobStyle = (pct, background, opacity = 1, animate = true) => ({
    position: "absolute",
    left: pct.left,
    top: pct.top,
    width: `${knobSizePct}%`,
    aspectRatio: "1",
    marginLeft: `-${knobOffsetPct}%`,
    marginTop: `-${knobOffsetPct}%`,
    borderRadius: "50%",
    background,
    border: `2px solid ${colors.hubRing}`,
    opacity,
    boxSizing: "border-box",
    transition: animate
      ? "left 0.9s cubic-bezier(0.34, 1.2, 0.64, 1), top 0.9s cubic-bezier(0.34, 1.2, 0.64, 1), background 0.3s ease"
      : undefined,
  });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 600,
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
        {variant === "filled" && !isPreview && polygonPoints && (
          <polygon
            points={polygonPoints}
            fill={colors.dotsStrong}
            fillOpacity={0.15}
            stroke={colors.dotsStrong}
            strokeWidth={1}
            strokeOpacity={0.4}
          />
        )}

        <circle
          cx={cx}
          cy={cy}
          r={rimRadius}
          fill="none"
          stroke={colors.hubRing}
          strokeWidth={rimStrokeWidth}
        />

        {factors.map((_, i) => {
          const edge = hubEdgePoint(i, hubRadius, cx, cy);
          const rim = rimPoint(i, rimRadius, cx, cy);
          return (
            <line
              key={`spoke-${i}`}
              x1={edge.x}
              y1={edge.y}
              x2={rim.x}
              y2={rim.y}
              stroke={colors.hubRing}
              strokeWidth={spokeWidth}
              strokeLinecap="round"
            />
          );
        })}

        <circle
          cx={cx}
          cy={cy}
          r={hubRadius}
          fill={colors.hubFill}
          stroke={colors.hubRing}
          strokeWidth={3}
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={colors.surface}
          fontFamily={fonts.voice}
          fontSize={13}
          fontWeight={600}
        >
          {wrapText("Geïnspireerd samenwerken", 16).map((line, i, arr) => (
            <tspan key={line} x={cx} dy={i === 0 ? -(arr.length - 1) * 7 : 14}>
              {line}
            </tspan>
          ))}
        </text>

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
              y={pos.y + (li - (arr.length - 1) / 2) * 12}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill={colors.labelAccent}
              fontFamily={fonts.ui}
              fontSize={9}
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
                fontSize={9}
                opacity={0.85}
              >
                {result}
              </text>
            );
          })}
      </svg>

      {!isPreview && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {factors.map((factor, i) => {
            const pos = knobPositions[i];
            const pct = toPercent(pos.x, pos.y);
            const niveau = scores[factor.key];
            let background = colors.surface;

            if (niveau === "sterk") {
              background = colors.dotsStrong;
            } else if (niveau) {
              background = colors.dotsLight;
            }

            return (
              <div
                key={factor.key}
                style={knobStyle(pct, background, niveau ? 1 : 0.35)}
              />
            );
          })}
        </div>
      )}

      {isPreview &&
        factors.map((factor, i) => {
          const pos = knobPositions[i];
          const pct = toPercent(pos.x, pos.y);
          return (
            <div
              key={factor.key}
              aria-hidden
              style={knobStyle(pct, colors.dotsLight, 1, false)}
            />
          );
        })}
    </div>
  );
});
