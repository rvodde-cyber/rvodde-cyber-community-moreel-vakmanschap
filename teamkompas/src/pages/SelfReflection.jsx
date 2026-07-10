import { useRef, useState } from "react";
import { colors, fonts } from "../config";
import { axesSelf } from "../data/axesSelf";
import { bepaalBalans } from "../logic/balans";
import { suggereerFase } from "../logic/tuckman";
import { getRecommendation } from "../logic/recommendations";
import IntroScreen from "../components/IntroScreen";
import AxisSelector from "../components/AxisSelector";
import TeamWheel from "../components/TeamWheel";
import ImagePlaceholder from "../components/ImagePlaceholder";

const FASE_LABELS = {
  storming: "Storming — oriëntatie en spanning",
  norming: "Norming — afspraken en ritme",
  performing: "Performing — soepel samenwerken",
  "gemengd beeld": "Gemengd beeld — geen eenduidige fase",
};

function downloadWheelAsImage(svgElement) {
  if (!svgElement) return;

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = colors.surface;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);

    const link = document.createElement("a");
    link.download = "teamkompas-wiel.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  img.src = url;
}

export default function SelfReflection() {
  const [phase, setPhase] = useState("intro");
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [faseTekst, setFaseTekst] = useState("");
  const [aanbevelingTekst, setAanbevelingTekst] = useState("");
  const wheelRef = useRef(null);

  const currentAxis = axesSelf[step];

  function handleSelect(niveau) {
    const key = currentAxis.key;
    const updated = { ...scores, [key]: niveau };
    setScores(updated);

    if (step < axesSelf.length - 1) {
      setStep(step + 1);
    } else {
      const balans = bepaalBalans(updated);
      const fase = suggereerFase(updated);
      const niveau = updated[balans.zwaksteFactor];
      setFaseTekst(FASE_LABELS[fase] ?? fase);
      setAanbevelingTekst(getRecommendation(balans.zwaksteFactor, niveau));
      setPhase("result");
    }
  }

  function handleStart() {
    setPhase("questions");
    setStep(0);
    setScores({});
  }

  if (phase === "intro") {
    return (
      <div style={{ padding: "32px 20px", background: colors.surface2, minHeight: "100vh" }}>
        <IntroScreen onStart={handleStart} />
      </div>
    );
  }

  if (phase === "result") {
    const balans = bepaalBalans(scores);
    const zwaksteAxis = axesSelf.find((a) => a.key === balans.zwaksteFactor);

    return (
      <div style={{ padding: "32px 20px", background: colors.surface2, minHeight: "100vh" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: fonts.voice,
              color: colors.labelAccent,
              fontSize: "1.75rem",
              margin: "0 0 24px",
            }}
          >
            Jullie teamwiel
          </h1>

          <TeamWheel scores={scores} variant="dots" svgRef={wheelRef} />

          <section style={{ marginTop: 32 }}>
            <h2
              style={{
                fontFamily: fonts.voice,
                color: colors.labelAccent,
                fontSize: "1.25rem",
                margin: "0 0 8px",
              }}
            >
              Slag in het wiel
            </h2>
            <p
              style={{
                fontFamily: fonts.ui,
                color: colors.labelAccent,
                lineHeight: 1.6,
                margin: "0 0 12px",
                opacity: 0.85,
              }}
            >
              Een teamwiel draait soepel als alle succesfactoren in balans zijn. De zwakste
              factor bepaalt waar het wiel het meest hapert — niet als oordeel, maar als
              aanknopingspunt voor gesprek.
            </p>
            <p
              style={{
                fontFamily: fonts.ui,
                color: colors.labelAccent,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Zwakste factor: {zwaksteAxis?.label}
            </p>
          </section>

          <section style={{ marginTop: 28 }}>
            <h2
              style={{
                fontFamily: fonts.voice,
                color: colors.labelAccent,
                fontSize: "1.25rem",
                margin: "0 0 8px",
              }}
            >
              Fase-suggestie
            </h2>
            <textarea
              value={faseTekst}
              onChange={(e) => setFaseTekst(e.target.value)}
              rows={2}
              style={{
                width: "100%",
                fontFamily: fonts.ui,
                fontSize: "0.95rem",
                color: colors.labelAccent,
                border: `1px solid ${colors.hubRing}`,
                borderRadius: 8,
                padding: 12,
                background: colors.surface,
                lineHeight: 1.5,
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
            <p
              style={{
                fontFamily: fonts.ui,
                fontSize: "0.85rem",
                color: colors.labelAccent,
                opacity: 0.65,
                fontStyle: "italic",
                margin: "8px 0 0",
              }}
            >
              Dit is een suggestie op basis van het patroon — klopt dit voor jullie team?
            </p>
          </section>

          <section style={{ marginTop: 28 }}>
            <h2
              style={{
                fontFamily: fonts.voice,
                color: colors.labelAccent,
                fontSize: "1.25rem",
                margin: "0 0 8px",
              }}
            >
              Aanbeveling
            </h2>
            <textarea
              value={aanbevelingTekst}
              onChange={(e) => setAanbevelingTekst(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                fontFamily: fonts.ui,
                fontSize: "0.95rem",
                color: colors.labelAccent,
                border: `1px solid ${colors.hubRing}`,
                borderRadius: 8,
                padding: 12,
                background: colors.surface,
                lineHeight: 1.5,
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </section>

          <div style={{ marginTop: 32 }}>
            <ImagePlaceholder
              label="Finish: loper gaat over de streep"
              description="Eén loper over de finishlijn — het teamresultaat, niet het individuele resultaat"
              aspectRatio="21 / 9"
            />
          </div>

          <button
            type="button"
            onClick={() => downloadWheelAsImage(wheelRef.current)}
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
              marginTop: 32,
            }}
          >
            Download wiel als afbeelding
          </button>

          <button
            type="button"
            onClick={() => {
              setPhase("intro");
              setStep(0);
              setScores({});
            }}
            style={{
              fontFamily: fonts.ui,
              background: "transparent",
              color: colors.labelAccent,
              border: `1px solid ${colors.hubRing}`,
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: 12,
              marginLeft: 12,
            }}
          >
            Opnieuw beginnen
          </button>
        </div>
      </div>
    );
  }

  const showProgressPlaceholder = step === 2 || step === 4;

  return (
    <div style={{ padding: "32px 20px", background: colors.surface2, minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: fonts.ui,
            fontSize: "0.85rem",
            color: colors.labelAccent,
            opacity: 0.65,
            margin: "0 0 16px",
          }}
        >
          Stap {step + 1} van {axesSelf.length}
        </p>

        {showProgressPlaceholder && (
          <div style={{ marginBottom: 24 }}>
            <ImagePlaceholder
              label="Loper onderweg, stokje in de hand"
              aspectRatio="16 / 9"
            />
          </div>
        )}

        <AxisSelector
          axis={currentAxis}
          selected={scores[currentAxis.key]}
          onSelect={handleSelect}
        />

        <div style={{ marginTop: 32 }}>
          <TeamWheel scores={scores} variant="dots" />
        </div>

        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            style={{
              fontFamily: fonts.ui,
              background: "transparent",
              color: colors.labelAccent,
              border: `1px solid ${colors.hubRing}`,
              borderRadius: 8,
              padding: "10px 20px",
              fontSize: "0.9rem",
              cursor: "pointer",
              marginTop: 24,
            }}
          >
            Vorige stap
          </button>
        )}
      </div>
    </div>
  );
}
