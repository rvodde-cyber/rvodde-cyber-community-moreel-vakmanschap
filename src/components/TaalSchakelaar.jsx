import { useTaal } from "../context/TaalContext";
import { SITE_TALEN } from "../data/vertalingen";

export default function TaalSchakelaar() {
  const { taal, setTaal } = useTaal();

  return (
    <div
      role="group"
      aria-label="Taal / Language"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
        padding: "3px",
        borderRadius: "20px",
        border: "1px solid #d3d1c7",
        background: "rgba(255,255,255,0.6)",
      }}
    >
      {SITE_TALEN.map(({ code, label }) => {
        const active = taal === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setTaal(code)}
            aria-pressed={active}
            aria-label={label}
            style={{
              padding: "5px 10px",
              borderRadius: "16px",
              border: "none",
              background: active ? "#534ab7" : "transparent",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: active ? "#ffffff" : "#1a2744",
              letterSpacing: "0.4px",
              transition: "all 0.2s ease",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
