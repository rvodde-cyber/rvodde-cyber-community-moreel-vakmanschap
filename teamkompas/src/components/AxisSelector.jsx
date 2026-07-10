import { colors, fonts } from "../config";
import { niveauUitleg } from "../data/niveauUitleg";

const NIVEAU_VOLGORDE = ["kwetsbaar", "groeiend", "sterk"];

export default function AxisSelector({ axis, selected, onSelect, disabled = false }) {
  return (
    <div>
      <h2
        style={{
          fontFamily: fonts.voice,
          color: colors.labelAccent,
          fontSize: "1.35rem",
          margin: "0 0 8px",
        }}
      >
        {axis.label}
      </h2>
      <p
        style={{
          fontFamily: fonts.ui,
          fontSize: "0.85rem",
          color: colors.labelAccent,
          opacity: 0.65,
          margin: "0 0 20px",
        }}
      >
        Resultaat: {axis.resultaat}
      </p>

      <div
        style={{
          background: colors.surface,
          border: `1px solid ${colors.hubRing}`,
          borderRadius: 8,
          padding: "16px",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontFamily: fonts.ui,
            fontSize: "0.9rem",
            color: colors.labelAccent,
            lineHeight: 1.6,
            margin: "0 0 14px",
            opacity: 0.85,
          }}
        >
          {niveauUitleg.intro}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {NIVEAU_VOLGORDE.map((niveau) => (
            <div key={niveau}>
              <span
                style={{
                  fontFamily: fonts.ui,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: colors.labelAccent,
                }}
              >
                {niveauUitleg[niveau].label}
              </span>
              <span
                style={{
                  fontFamily: fonts.ui,
                  fontSize: "0.85rem",
                  color: colors.labelAccent,
                  opacity: 0.75,
                  lineHeight: 1.5,
                }}
              >
                {" — "}
                {niveauUitleg[niveau].tekst}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p
        style={{
          fontFamily: fonts.ui,
          fontSize: "0.9rem",
          color: colors.labelAccent,
          fontWeight: 500,
          margin: "0 0 12px",
        }}
      >
        Welke stelling past het beste?
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {NIVEAU_VOLGORDE.map((niveau) => {
          const isSelected = selected === niveau;
          return (
            <button
              key={niveau}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(niveau)}
              style={{
                fontFamily: fonts.ui,
                textAlign: "left",
                padding: "14px 16px",
                borderRadius: 8,
                border: isSelected
                  ? `2px solid ${colors.dotsStrong}`
                  : `1px solid ${colors.hubRing}`,
                background: isSelected ? colors.surface2 : colors.surface,
                cursor: disabled ? "wait" : "pointer",
                opacity: disabled && !isSelected ? 0.55 : 1,
                lineHeight: 1.5,
                color: colors.labelAccent,
              }}
            >
              <span style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
                {niveauUitleg[niveau].label}
              </span>
              <span style={{ fontSize: "0.95rem", opacity: 0.85 }}>
                {axis.niveaus[niveau]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
