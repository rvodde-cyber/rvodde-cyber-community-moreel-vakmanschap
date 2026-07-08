import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadar,
  ResponsiveContainer,
} from "recharts";
import { DIMENSIONS } from "../data/dimensions";

const SHORT_LABELS = {
  systeemkritiek: "Systeem",
  balans: "Balans",
  doorvragen: "Doorvragen",
  actie: "Actie",
  tolerantie: "Ongemak",
  zelfverdenking: "Zelf",
};

export default function RadarChart({ scores, size = "normal", highlightId = null, dark = false }) {
  const isLarge = size === "large";
  const tickColor = dark ? "#F7F5F0" : "#1B2A4A";
  const gridColor = dark ? "#F7F5F0" : "#B8BCC2";

  const data = DIMENSIONS.map((d) => ({
    dimensie: SHORT_LABELS[d.id],
    volledig: d.naam,
    score: scores[d.id] ?? 0,
    highlight: highlightId === d.id ? scores[d.id] ?? 0 : 0,
    id: d.id,
  }));

  return (
    <div className={isLarge ? "h-[min(70vh,600px)] w-full" : "mx-auto h-72 w-full max-w-md"}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={data} cx="50%" cy="50%" outerRadius={isLarge ? "75%" : "70%"}>
          <PolarGrid stroke={gridColor} strokeOpacity={dark ? 0.25 : 0.5} />
          <PolarAngleAxis
            dataKey="dimensie"
            tick={{
              fill: tickColor,
              fontSize: isLarge ? 18 : 12,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: gridColor, fontSize: isLarge ? 14 : 10 }}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#D9A441"
            fill="#D9A441"
            fillOpacity={highlightId ? 0.15 : 0.35}
            strokeWidth={2}
          />
          {highlightId && (
            <Radar
              name="Highlight"
              dataKey="highlight"
              stroke="#D97757"
              fill="#D97757"
              fillOpacity={0.55}
              strokeWidth={3}
            />
          )}
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
