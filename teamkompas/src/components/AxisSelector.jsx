import { colors, fonts } from "../config";

const NIVEAU_LABELS = {
  kwetsbaar: "Kwetsbaar",
  groeiend: "Groeiend",
  sterk: "Sterk",
};

export default function AxisSelector({ axis, selected, onSelect }) {
  const niveaus = ["kwetsbaar", "groeiend", "sterk"];

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

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {niveaus.map((niveau) => {
          const isSelected = selected === niveau;
          return (
            <button
              key={niveau}
              type="button"
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
                cursor: "pointer",
                lineHeight: 1.5,
                color: colors.labelAccent,
              }}
            >
              <span style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
                {NIVEAU_LABELS[niveau]}
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
