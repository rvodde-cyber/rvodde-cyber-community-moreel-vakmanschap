const LINK_URL = "https://juristenzelftest.moreelvakmanschap.nl";
const BADGE_SRC = "/images/juristenzelftest/juristenzelftest-titelbadge.webp";
const PATROON_SRC = "/images/juristenzelftest/juristenzelftest-patroon-tegel.webp";

const tegelLinkStyle = {
  display: "block",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid var(--rand, #d8d3c9)",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
  textDecoration: "none",
  color: "inherit",
  backgroundColor: "#ffffff",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
};

export default function JuristenzelftestTegel() {
  return (
    <a
      href={LINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Start de Juristenzelftest (opent in nieuw tabblad)"
      className="juristenzelftest-tegel-link"
      style={tegelLinkStyle}
    >
      <div
        style={{
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${PATROON_SRC})`,
          backgroundRepeat: "repeat",
          backgroundSize: "210px",
        }}
      >
        <img
          src={BADGE_SRC}
          alt="Juristenzelftest – Wat voor jurist ben jij?"
          width={1233}
          height={330}
          loading="lazy"
          decoding="async"
          style={{
            width: "min(80%, 360px)",
            height: "auto",
            display: "block",
          }}
        />
      </div>
      <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--tekst-primair, #1a2744)",
            margin: "0 0 0.75rem",
          }}
        >
          Juristenzelftest
        </h3>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            color: "var(--tekst-secundair, #5f5e5a)",
            margin: "0 0 1.25rem",
          }}
        >
          Wat voor jurist ben jij? Een kaartspel van mr. dr. A.G. Mein (Hogeschool van Amsterdam), digitaal
          gemaakt met zijn toestemming. Reflectie-instrument, niet bedoeld voor selectie of beoordeling.
        </p>
        <span
          style={{
            display: "inline-block",
            padding: "0.65rem 1.25rem",
            borderRadius: "8px",
            backgroundColor: "#534ab7",
            color: "#ffffff",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          Start de zelftest
        </span>
      </div>
    </a>
  );
}
