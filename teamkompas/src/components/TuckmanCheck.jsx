import { useState } from "react";
import { colors, fonts, tuckmanTyperingen, tuckmanBron } from "../config";

const faseVolgorde = ["forming", "storming", "norming", "performing", "adjourning"];

export default function TuckmanCheck({ onVerder }) {
  const [stap, setStap] = useState(0);
  const [waarden, setWaarden] = useState({
    forming: 50,
    storming: 50,
    norming: 50,
    performing: 50,
    adjourning: 50,
  });

  const huidigeFase = faseVolgorde[stap];
  const typering = tuckmanTyperingen[huidigeFase];

  function volgende() {
    if (stap < faseVolgorde.length - 1) {
      setStap(stap + 1);
    } else {
      onVerder(waarden);
    }
  }

  function vorige() {
    if (stap > 0) setStap(stap - 1);
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 16px" }}>
      <p
        style={{
          fontFamily: fonts.ui,
          fontSize: "0.75em",
          color: colors.labelAccent,
          opacity: 0.6,
          margin: "0 0 8px",
        }}
      >
        Typering {stap + 1} van {faseVolgorde.length}
      </p>
      <h2
        style={{
          fontFamily: fonts.voice,
          color: colors.labelAccent,
          fontSize: "1.5rem",
          margin: "0 0 12px",
        }}
      >
        {typering.titel}
      </h2>
      <p
        style={{
          fontFamily: fonts.ui,
          color: colors.labelAccent,
          lineHeight: 1.6,
          margin: 0,
          opacity: 0.85,
        }}
      >
        {typering.tekst}
      </p>

      <div style={{ marginTop: 32 }}>
        <label
          style={{
            fontFamily: fonts.ui,
            fontWeight: 600,
            display: "block",
            marginBottom: 8,
            color: colors.labelAccent,
          }}
        >
          In welke mate herken je dit bij jullie team?
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={waarden[huidigeFase]}
          onChange={(e) =>
            setWaarden({ ...waarden, [huidigeFase]: Number(e.target.value) })
          }
          style={{ width: "100%", accentColor: colors.hubFill }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: fonts.ui,
            fontSize: "0.8em",
            color: colors.labelAccent,
            opacity: 0.7,
            marginTop: 4,
          }}
        >
          <span>Helemaal niet</span>
          <span>Helemaal wel</span>
        </div>
      </div>

      <p
        style={{
          marginTop: 24,
          fontFamily: fonts.ui,
          fontSize: "0.8em",
          color: colors.labelAccent,
          opacity: 0.6,
          lineHeight: 1.5,
        }}
      >
        {tuckmanBron}
      </p>

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        {stap > 0 && (
          <button
            type="button"
            onClick={vorige}
            style={{
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
            Vorige
          </button>
        )}
        <button
          type="button"
          onClick={volgende}
          style={{
            fontFamily: fonts.ui,
            background: colors.hubFill,
            color: colors.surface,
            border: "none",
            borderRadius: 8,
            padding: "12px 28px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {stap < faseVolgorde.length - 1 ? "Volgende" : "Verder naar het resultaat"}
        </button>
      </div>
    </div>
  );
}
