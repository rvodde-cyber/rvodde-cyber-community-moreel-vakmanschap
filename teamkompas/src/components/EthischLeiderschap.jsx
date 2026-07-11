import { useState } from "react";
import { ethischLeiderschap, colors, fonts } from "../config";

export default function EthischLeiderschap({ onBack }) {
  const [antwoorden, setAntwoorden] = useState(
    Array(ethischLeiderschap.vragen.length).fill("")
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
        {ethischLeiderschap.titel}
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
        {ethischLeiderschap.intro}
      </p>

      {ethischLeiderschap.vragen.map((vraag, i) => (
        <div key={vraag} style={{ marginTop: 24 }}>
          <label
            style={{
              fontFamily: fonts.voice,
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
              color: colors.labelAccent,
              lineHeight: 1.5,
            }}
          >
            {vraag}
          </label>
          <textarea
            value={antwoorden[i]}
            onChange={(e) => updateAntwoord(i, e.target.value)}
            placeholder="Alleen zichtbaar voor jou — wordt nergens opgeslagen"
            style={{
              width: "100%",
              minHeight: 72,
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
        {ethischLeiderschap.bron}
      </p>

      <button
        type="button"
        onClick={onBack}
        style={{
          marginTop: 24,
          fontFamily: fonts.ui,
          background: "transparent",
          color: colors.labelAccent,
          border: `1px solid ${colors.hubRing}`,
          borderRadius: 8,
          padding: "12px 20px",
          fontSize: "0.95rem",
          cursor: "pointer",
        }}
      >
        ← Terug naar het teamresultaat
      </button>
    </div>
  );
}
