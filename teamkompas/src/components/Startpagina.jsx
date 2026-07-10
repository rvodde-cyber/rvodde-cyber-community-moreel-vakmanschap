import TeamWheel from "./TeamWheel";
import { welkom, bronvermelding, colors, fonts } from "../config";

export default function Startpagina({ onStart }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px", maxWidth: 480, margin: "0 auto" }}>
      <TeamWheel
        variant="preview"
        style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}
      />
      <h1
        style={{
          marginTop: 24,
          fontFamily: fonts.voice,
          color: colors.labelAccent,
          fontSize: "1.75rem",
          fontWeight: 600,
        }}
      >
        {welkom.titel}
      </h1>
      <p
        style={{
          marginTop: 8,
          opacity: 0.85,
          fontFamily: fonts.ui,
          color: colors.labelAccent,
          lineHeight: 1.5,
        }}
      >
        {welkom.tekst}
      </p>
      <button
        type="button"
        onClick={onStart}
        style={{
          marginTop: 24,
          padding: "12px 28px",
          fontFamily: fonts.ui,
          background: colors.hubFill,
          color: colors.surface,
          border: "none",
          borderRadius: 8,
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Start
      </button>
      <p
        style={{
          marginTop: 32,
          fontSize: "0.75em",
          opacity: 0.6,
          fontFamily: fonts.ui,
          color: colors.labelAccent,
          lineHeight: 1.5,
        }}
      >
        {bronvermelding}
      </p>
    </div>
  );
}
