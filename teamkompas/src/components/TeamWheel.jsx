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

const DOT_SCALE = { kwetsbaar: 0.33, groeiend: 0.66, sterk: 1 };

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

export default function TeamWheel({ scores = {}, variant = "dots", svgRef }) {
  const { viewBox, center, hubRadius, nodeRadius, nodeCircleRadius, labelRadius } = wheelGeometry;
  const { x: cx, y: cy } = center;

  const nodePositions = factors.map((_, i) =>
    nodePosition(i, nodeRadius, cx, cy)
  );
  const labelPositions = results.map((_, i) =>
    labelPosition(i, labelRadius, cx, cy)
  );

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      width="100%"
      style={{ maxWidth: 600, display: "block", margin: "0 auto" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <polygon points="0 0, 8 4, 0 8" fill={colors.dotsStrong} />
        </marker>
      </defs>

      {variant === "filled" && (
        <polygon
          points={nodePositions.map((p) => `${p.x},${p.y}`).join(" ")}
          fill={colors.dotsStrong}
          fillOpacity={0.15}
          stroke={colors.dotsStrong}
          strokeWidth={1}
          strokeOpacity={0.4}
        />
      )}

      {factors.map((_, i) => {
        const next = (i + 1) % 6;
        const p1 = nodePositions[i];
        const p2 = nodePositions[next];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const ctrlX = cx + (midX - cx) * 0.6;
        const ctrlY = cy + (midY - cy) * 0.6;
        return (
          <path
            key={`ring-${i}`}
            d={`M ${p1.x} ${p1.y} Q ${ctrlX} ${ctrlY} ${p2.x} ${p2.y}`}
            fill="none"
            stroke={colors.hubRing}
            strokeWidth={2}
            markerStart="url(#arrowhead)"
            markerEnd="url(#arrowhead)"
          />
        );
      })}

      {factors.map((_, i) => {
        const edge = hubEdgePoint(i, hubRadius, cx, cy);
        const node = nodePositions[i];
        return (
          <line
            key={`spoke-${i}`}
            x1={edge.x}
            y1={edge.y}
            x2={node.x}
            y2={node.y}
            stroke={colors.hubRing}
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
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
        const pos = nodePositions[i];
        const niveau = scores[factor.key];
        const dotScale = niveau ? DOT_SCALE[niveau] : 0;
        const dotR = (nodeCircleRadius * dotScale) / 2;

        return (
          <g key={factor.key}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeCircleRadius}
              fill={colors.surface}
              stroke={colors.hubRing}
              strokeWidth={2}
            />
            {variant === "dots" && niveau && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={dotR}
                fill={niveau === "sterk" ? colors.dotsStrong : colors.dotsLight}
              />
            )}
            {wrapText(factor.label, 12).map((line, li, arr) => (
              <text
                key={line}
                x={pos.x}
                y={pos.y + nodeCircleRadius + 14 + li * 13}
                textAnchor="middle"
                fill={colors.labelAccent}
                fontFamily={fonts.ui}
                fontSize={11}
                fontWeight={500}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {results.map((result, i) => {
        const pos = labelPositions[i];
        return (
          <text
            key={result}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colors.labelAccent}
            fontFamily={fonts.ui}
            fontSize={10}
            opacity={0.75}
          >
            {result}
          </text>
        );
      })}
    </svg>
  );
}
