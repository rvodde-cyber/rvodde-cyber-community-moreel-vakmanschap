import { useEffect, useRef, useState } from "react";
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
const ANIMATION_MS = 700;

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

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
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

function AnimatedKnob({ targetX, targetY, startX, startY, fill, stroke = colors.hubRing, r, visible }) {
  const posRef = useRef({ x: startX, y: startY });
  const [pos, setPos] = useState({ x: startX, y: startY });
  const frameRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      posRef.current = { x: startX, y: startY };
      setPos({ x: startX, y: startY });
      return undefined;
    }

    const from = { ...posRef.current };
    const to = { x: targetX, y: targetY };

    if (from.x === to.x && from.y === to.y) return undefined;

    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / ANIMATION_MS);
      const eased = easeOutCubic(t);
      const next = {
        x: from.x + (to.x - from.x) * eased,
        y: from.y + (to.y - from.y) * eased,
      };
      posRef.current = next;
      setPos(next);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        posRef.current = to;
        setPos(to);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [visible, targetX, targetY, startX, startY]);

  if (!visible) return null;

  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={2}
    />
  );
}

export default function TeamWheel({ scores = {}, variant = "dots", svgRef, style }) {
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
    factorLabelRadius,
    resultLabelRadius,
  } = wheelGeometry;
  const { x: cx, y: cy } = center;

  const isPreview = variant === "preview";
  const showResults = !isPreview;
  const travelMax = knobPositionRadius;
  const travelMin = knobTravelMinRadius;

  const scoredKnobPositions = factors.map((factor, i) => {
    const radius = knobTravelRadius(scores[factor.key], travelMin, travelMax);
    return nodePosition(i, radius, cx, cy);
  });

  const factorLabelPositions = factors.map((_, i) =>
    nodePosition(i, factorLabelRadius, cx, cy)
  );
  const resultLabelPositions = results.map((_, i) =>
    labelPosition(i, resultLabelRadius, cx, cy)
  );

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      width="100%"
      overflow="visible"
      style={{ maxWidth: 600, display: "block", margin: "0 auto", ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "filled" && (
        <polygon
          points={scoredKnobPositions.map((p) => `${p.x},${p.y}`).join(" ")}
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

      {variant === "preview"
        ? factors.map((factor, i) => {
            const pos = nodePosition(i, travelMax, cx, cy);
            return (
              <circle
                key={factor.key}
                cx={pos.x}
                cy={pos.y}
                r={knobRadius}
                fill={colors.dotsLight}
                stroke={colors.hubRing}
                strokeWidth={2}
              />
            );
          })
        : factors.map((factor, i) => {
            const pos = scoredKnobPositions[i];
            const niveau = scores[factor.key];
            let fill = colors.surface;

            if (niveau === "sterk") {
              fill = colors.dotsStrong;
            } else if (niveau) {
              fill = colors.dotsLight;
            }

            const startPos = nodePosition(i, travelMin, cx, cy);

            return (
              <AnimatedKnob
                key={factor.key}
                startX={startPos.x}
                startY={startPos.y}
                targetX={pos.x}
                targetY={pos.y}
                r={knobRadius}
                fill={fill}
                visible={Boolean(niveau)}
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
  );
}
