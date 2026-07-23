import { useState } from "react";
import { colors, fonts, tuckmanVragen, tuckmanBron } from "../config";

const faseVolgorde = ["forming", "storming", "norming", "performing"];

export default function TuckmanCheck({ onVerder }) {
  const [antwoorden, setAntwoorden] = useState(Array(tuckmanVragen.length).fill(null));

  function kies(vraagIndex, fase) {
    const nieuw = [...antwoorden];
    nieuw[vraagIndex] = fase;
    setAntwoorden(nieuw);
  }

  const compleet = antwoorden.every((a) => a !== null);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2
        style={{
          fontFamily: fonts.voice,
          color: colors.labelAccent,
          fontSize: "1.75rem",
          margin: "0 0 8px",
        }}
      >
        Waar staat jullie team nu?
      </h2>
      <p
        style={{
          fontFamily: fonts.ui,
          color: colors.labelAccent,
          lineHeight: 1.6,
          margin: "0 0 8px",
          opacity: 0.85,
        }}
      >
        Vijf korte vragen om te bepalen in welke ontwikkelfase het team zich waarschijnlijk
        bevindt.
      </p>

      {tuckmanVragen.map((vraag, i) => (
        <div key={vraag.thema} style={{ marginTop: 24 }}>
          <label
            style={{
              fontFamily: fonts.ui,
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
              color: colors.labelAccent,
            }}
          >
            {vraag.thema}
          </label>
          {faseVolgorde.map((fase) => (
            <button
              key={fase}
              type="button"
              onClick={() => kies(i, fase)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: 12,
                marginBottom: 6,
                fontFamily: fonts.ui,
                fontSize: "0.95rem",
                color: colors.labelAccent,
                lineHeight: 1.45,
                background: antwoorden[i] === fase ? colors.dotsLight : colors.surface,
                border: `1px solid ${colors.hubRing}`,
                borderRadius: 6,
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              {vraag.opties[fase]}
            </button>
          ))}
        </div>
      ))}

      <p
        style={{
          marginTop: 24,
          fontFamily: fonts.ui,
          fontSize: "0.8rem",
          color: colors.labelAccent,
          opacity: 0.6,
          lineHeight: 1.5,
        }}
      >
        {tuckmanBron}
      </p>

      <button
        type="button"
        onClick={() => onVerder(antwoorden)}
        disabled={!compleet}
        style={{
          fontFamily: fonts.ui,
          background: compleet ? colors.hubFill : "#D9C9B4",
          color: colors.surface,
          border: "none",
          borderRadius: 8,
          padding: "12px 28px",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: compleet ? "pointer" : "not-allowed",
          marginTop: 24,
          opacity: compleet ? 1 : 0.7,
        }}
      >
        Verder naar het resultaat
      </button>
    </div>
  );
}
