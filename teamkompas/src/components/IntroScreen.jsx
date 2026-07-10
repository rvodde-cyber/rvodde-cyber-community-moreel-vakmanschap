import { colors, fonts, wheelGeometry, bronvermelding, metafoor, framing, activeFraming } from "../config";
import ImagePlaceholder from "./ImagePlaceholder";

const { appTitle, introText } = framing[activeFraming];

const theoreticalBasis =
  "Geïnspireerd op het Teamwiel van Vroemen (Vroemen & Vroemen, 2009, Team op vleugels, Amsterdam University Press) — 6 succesfactoren die in balans leiden tot geïnspireerd samenwerken — gecombineerd met het fasemodel van teamontwikkeling van Bruce Tuckman (1965, forming–storming–norming–performing) voor de tijdsdimensie. Het onderscheid tussen een groep en een team volgt Katzenbach & Smith (1993, The Wisdom of Teams): een werkgroep telt op wat individuen los presteren, een team deelt één gezamenlijk resultaat waarvoor de leden zich onderling verantwoordelijk houden.";

export default function IntroScreen({ onStart }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <ImagePlaceholder
        label="Hero: het stokje doorgeven"
        description="Twee lopers naast elkaar, stokje wordt overgedragen"
        aspectRatio="21 / 9"
      />

      <div style={{ marginTop: 24 }}>
        <h2
          style={{
            fontFamily: fonts.voice,
            color: colors.labelAccent,
            fontSize: "1.25rem",
            margin: "0 0 8px",
          }}
        >
          {metafoor.titel}
        </h2>
        <p
          style={{
            fontFamily: fonts.voice,
            color: colors.labelAccent,
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}
        >
          {metafoor.tekst}
        </p>
      </div>

      <h1
        style={{
          fontFamily: fonts.voice,
          color: colors.labelAccent,
          fontSize: "2rem",
          margin: "0 0 12px",
        }}
      >
        {appTitle}
      </h1>

      <p
        style={{
          fontFamily: fonts.ui,
          color: colors.labelAccent,
          lineHeight: 1.6,
          margin: "0 0 24px",
          opacity: 0.85,
        }}
      >
        {introText}
      </p>

      <p
        style={{
          fontFamily: fonts.ui,
          fontSize: "0.9rem",
          color: colors.labelAccent,
          lineHeight: 1.6,
          margin: "0 0 24px",
          opacity: 0.75,
        }}
      >
        {theoreticalBasis}
      </p>

      <p
        style={{
          fontFamily: fonts.ui,
          fontSize: "0.8rem",
          color: colors.labelAccent,
          lineHeight: 1.5,
          margin: "0 0 32px",
          opacity: 0.6,
          fontStyle: "italic",
        }}
      >
        {bronvermelding}
      </p>

      <button
        type="button"
        onClick={onStart}
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
        Start reflectie
      </button>
    </div>
  );
}
