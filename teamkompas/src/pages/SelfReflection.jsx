import { useRef, useState } from "react";
import { colors, fonts, wheelGeometry, tuckmanAdvies } from "../config";
import { axesSelf } from "../data/axesSelf";
import { bepaalBalans } from "../logic/balans";
import { bepaalFaseDirect } from "../logic/tuckman";
import { getRecommendation } from "../logic/recommendations";
import { faseLabels, volgendeFaseLabels } from "../data/faseUitleg";
import Startpagina from "../components/Startpagina";
import IntroScreen from "../components/IntroScreen";
import Fundament from "../components/Fundament";
import AxisSelector from "../components/AxisSelector";
import TeamWheel from "../components/TeamWheel";
import ImagePlaceholder from "../components/ImagePlaceholder";
import EthischLeiderschap from "../components/EthischLeiderschap";
import TuckmanCheck from "../components/TuckmanCheck";

function downloadWheelAsImage(container, scores) {
  if (!container) return;

  const svgElement = container.querySelector("svg");
  if (!svgElement) return;

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgElement);

  const factorKeys = [
    "doelen",
    "initiatief",
    "flexibiliteit",
    "respect",
    "communicatie",
    "verantwoordelijkheid",
  ];
  const { center, knobRadius, knobTravelMinRadius, knobTravelMaxRadius } = wheelGeometry;
  const travelMin = knobTravelMinRadius;
  const travelMax = knobTravelMaxRadius;
  const niveauTravel = { kwetsbaar: 0.33, groeiend: 0.66, sterk: 1 };

  const knobMarkup = factorKeys
    .map((key, i) => {
      const niveau = scores[key];
      if (!niveau) return "";
      const t = niveauTravel[niveau];
      const radius = travelMin + (travelMax - travelMin) * t;
      const angleDeg = -90 + i * 60;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = center.x + radius * Math.cos(angleRad);
      const y = center.y + radius * Math.sin(angleRad);
      const fill = niveau === "sterk" ? colors.dotsStrong : colors.dotsLight;
      return `<circle cx="${x}" cy="${y}" r="${knobRadius}" fill="${fill}" stroke="${colors.hubRing}" stroke-width="2" />`;
    })
    .join("");

  if (knobMarkup) {
    svgString = svgString.replace("</svg>", `${knobMarkup}</svg>`);
  }

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
    link.download = "wisselwerking-wiel.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  img.src = url;
}

export default function SelfReflection() {
  const [phase, setPhase] = useState("start");
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [faseKey, setFaseKey] = useState("");
  const [faseTekst, setFaseTekst] = useState("");
  const [aanbevelingTekst, setAanbevelingTekst] = useState("");
  const [isAdvancing, setIsAdvancing] = useState(false);
  const wheelRef = useRef(null);

  const currentAxis = axesSelf[step];

  function handleSelect(niveau) {
    if (isAdvancing) return;

    const key = currentAxis.key;
    const updated = { ...scores, [key]: niveau };
    setScores(updated);
    setIsAdvancing(true);

    window.setTimeout(() => {
      if (step < axesSelf.length - 1) {
        setStep(step + 1);
      } else {
        const balans = bepaalBalans(updated);
        const niveauZwak = updated[balans.zwaksteFactor];
        setAanbevelingTekst(getRecommendation(balans.zwaksteFactor, niveauZwak));
        setPhase("tuckman");
      }
      setIsAdvancing(false);
    }, 950);
  }

  function handleBeginReflection() {
    setPhase("questions");
    setStep(0);
    setScores({});
  }

  function handleTuckmanVerder(antwoorden) {
    const { fase } = bepaalFaseDirect(antwoorden);
    setFaseKey(fase);
    setFaseTekst(faseLabels[fase] ?? fase);
    setPhase("result");
  }

  if (phase === "start") {
    return (
      <div style={{ padding: "32px 20px", background: colors.surface2, minHeight: "100vh" }}>
        <Startpagina onStart={() => setPhase("intro")} />
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div style={{ padding: "32px 20px", background: colors.surface2, minHeight: "100vh" }}>
        <IntroScreen onStart={() => setPhase("fundament")} />
      </div>
    );
  }

  if (phase === "fundament") {
    return (
      <div style={{ padding: "32px 20px", background: colors.surface2, minHeight: "100vh" }}>
        <Fundament onVerder={handleBeginReflection} />
      </div>
    );
  }

  if (phase === "tuckman") {
    return (
      <div style={{ padding: "32px 20px", background: colors.surface2, minHeight: "100vh" }}>
        <TuckmanCheck onVerder={handleTuckmanVerder} />
      </div>
    );
  }

  if (phase === "ethisch") {
    return (
      <div style={{ padding: "32px 20px", background: colors.surface2, minHeight: "100vh" }}>
        <EthischLeiderschap onBack={() => setPhase("result")} />
      </div>
    );
  }

  if (phase === "result") {
    const balans = bepaalBalans(scores);
    const zwaksteAxis = axesSelf.find((a) => a.key === balans.zwaksteFactor);
    const groeiAdvies = tuckmanAdvies[faseKey];
    const volgendeLabel = groeiAdvies?.volgendeFase
      ? volgendeFaseLabels[groeiAdvies.volgendeFase] ?? groeiAdvies.volgendeFase
      : null;

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

          <TeamWheel ref={wheelRef} scores={scores} variant="dots" />

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
              Ontwikkelfase
            </h2>
            <p
              style={{
                fontFamily: fonts.ui,
                color: colors.labelAccent,
                fontWeight: 600,
                fontSize: "1.05rem",
                margin: "0 0 12px",
              }}
            >
              {faseTekst}
            </p>
            {groeiAdvies && (
              <div
                style={{
                  padding: "16px",
                  background: colors.surface,
                  border: `1px solid ${colors.hubRing}`,
                  borderRadius: 8,
                }}
              >
                <h3
                  style={{
                    fontFamily: fonts.ui,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: colors.labelAccent,
                    margin: "0 0 6px",
                  }}
                >
                  {volgendeLabel && groeiAdvies.volgendeFase !== faseKey
                    ? `Wat helpt richting ${volgendeLabel}?`
                    : "Wat helpt jullie verder?"}
                </h3>
                <p
                  style={{
                    fontFamily: fonts.ui,
                    fontSize: "0.9rem",
                    color: colors.labelAccent,
                    lineHeight: 1.6,
                    margin: 0,
                    opacity: 0.85,
                  }}
                >
                  {groeiAdvies.advies}
                </p>
              </div>
            )}
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
              Dit is een suggestie op basis van jullie antwoorden — klopt dit voor jullie team?
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
            onClick={() => setPhase("ethisch")}
            style={{
              fontFamily: fonts.ui,
              background: "none",
              border: "none",
              color: colors.labelAccent,
              fontSize: "0.9rem",
              opacity: 0.75,
              cursor: "pointer",
              marginTop: 20,
              padding: 0,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Reflecteer ook op je eigen leiderschap →
          </button>

          <button
            type="button"
            onClick={() => downloadWheelAsImage(wheelRef.current, scores)}
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
              setPhase("start");
              setStep(0);
              setScores({});
              setFaseKey("");
              setFaseTekst("");
              setAanbevelingTekst("");
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
          disabled={isAdvancing}
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
