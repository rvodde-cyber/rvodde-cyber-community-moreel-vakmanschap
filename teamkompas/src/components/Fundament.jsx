import { useState } from "react";
import { fundament, colors, fonts } from "../config";

export default function Fundament({ onVerder }) {
  const [antwoorden, setAntwoorden] = useState(
    Array(fundament.vragen.length).fill("")
  );

  function updateAntwoord(index, waarde) {
    const nieuw = [...antwoorden];
    nieuw[index] = waarde;
    setAntwoorden(nieuw);
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 16px" }}>
      <h2
        style={{
          fontFamily: fonts.voice,
          color: colors.labelAccent,
          fontSize: "1.5rem",
          margin: "0 0 12px",
        }}
      >
        {fundament.titel}
      </h2>
      <p
        style={{
          fontFamily: fonts.ui,
          color: colors.labelAccent,
          lineHeight: 1.6,
          opacity: 0.85,
          margin: 0,
        }}
      >
        {fundament.intro}
      </p>

      {fundament.vragen.map((item, i) => (
        <div key={item.dimensie} style={{ marginTop: 24 }}>
          <span
            style={{
              fontSize: "0.75em",
              fontFamily: fonts.ui,
              color: colors.labelAccent,
              opacity: 0.6,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {item.dimensie}
          </span>
          <label
            style={{
              fontFamily: fonts.voice,
              fontWeight: 600,
              display: "block",
              marginTop: 4,
              marginBottom: 8,
              color: colors.labelAccent,
              lineHeight: 1.5,
            }}
          >
            {item.vraag}
          </label>
          <textarea
            value={antwoorden[i]}
            onChange={(e) => updateAntwoord(i, e.target.value)}
            placeholder="Alleen zichtbaar voor jou — wordt nergens opgeslagen"
            style={{
              width: "100%",
              minHeight: 64,
              padding: 12,
              fontFamily: fonts.ui,
              fontSize: "0.95rem",
              color: colors.labelAccent,
              border: `1px solid ${colors.hubRing}`,
              borderRadius: 8,
              background: colors.surface,
              lineHeight: 1.5,
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>
      ))}

      <p
        style={{
          marginTop: 24,
          fontSize: "0.8em",
          fontFamily: fonts.ui,
          color: colors.labelAccent,
          opacity: 0.6,
          lineHeight: 1.5,
        }}
      >
        {fundament.bron}
      </p>

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={onVerder}
          style={{
            fontFamily: fonts.ui,
            background: colors.hubFill,
            color: colors.surface,
            border: "none",
            borderRadius: 8,
            padding: "12px 20px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Verder naar het teamwiel
        </button>
        <button
          type="button"
          onClick={onVerder}
          style={{
            fontFamily: fonts.ui,
            background: "none",
            color: colors.labelAccent,
            border: "none",
            borderRadius: 8,
            padding: "12px 20px",
            fontSize: "0.95rem",
            opacity: 0.7,
            cursor: "pointer",
          }}
        >
          Sla over
        </button>
      </div>
    </div>
  );
}
