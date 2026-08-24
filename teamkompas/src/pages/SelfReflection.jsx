import { useRef, useState } from "react";
import { ArrowLeft, Download, RotateCcw } from "lucide-react";
import { colors, tuckmanAdvies, gallupNotitie } from "../config";
import { axesSelf } from "../data/axesSelf";
import { bepaalBalans } from "../logic/balans";
import { bepaalFaseDirect } from "../logic/tuckman";
import { getRecommendation } from "../logic/recommendations";
import { faseLabels, faseUitleg, volgendeFaseLabels } from "../data/faseUitleg";
import AppShell, { ProgressBar } from "../components/AppShell";
import Startpagina from "../components/Startpagina";
import IntroScreen from "../components/IntroScreen";
import Fundament from "../components/Fundament";
import AxisSelector from "../components/AxisSelector";
import TeamWheel from "../components/TeamWheel";
import ImagePlaceholder from "../components/ImagePlaceholder";
import EthischLeiderschap from "../components/EthischLeiderschap";
import TuckmanCheck from "../components/TuckmanCheck";

function UitlegBlok({ titel, tekst }) {
  return (
    <div className="mt-3.5">
      <h3 className="mb-1.5 text-sm font-semibold text-ink">{titel}</h3>
      <p className="m-0 text-sm leading-relaxed text-ink-soft">{tekst}</p>
    </div>
  );
}

function downloadWheelAsImage(container) {
  if (!container) return;

  const svgElement = container.querySelector("svg");
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
    ctx.fillStyle = colors.surface2;
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

  function handleTuckmanVerder(waarden) {
    const { fase } = bepaalFaseDirect(waarden);
    setFaseKey(fase);
    setFaseTekst(faseLabels[fase] ?? fase);
    setPhase("result");
  }

  function handleRestart() {
    setPhase("start");
    setStep(0);
    setScores({});
    setFaseKey("");
    setFaseTekst("");
    setAanbevelingTekst("");
  }

  if (phase === "start") {
    return (
      <AppShell>
        <Startpagina onStart={() => setPhase("intro")} />
      </AppShell>
    );
  }

  if (phase === "intro") {
    return (
      <AppShell>
        <IntroScreen onStart={() => setPhase("fundament")} />
      </AppShell>
    );
  }

  if (phase === "fundament") {
    return (
      <AppShell>
        <Fundament onVerder={handleBeginReflection} />
      </AppShell>
    );
  }

  if (phase === "tuckman") {
    return (
      <AppShell>
        <TuckmanCheck onVerder={handleTuckmanVerder} />
      </AppShell>
    );
  }

  if (phase === "ethisch") {
    return (
      <AppShell>
        <EthischLeiderschap onBack={() => setPhase("result")} />
      </AppShell>
    );
  }

  if (phase === "result") {
    const balans = bepaalBalans(scores);
    const zwaksteAxis = axesSelf.find((a) => a.key === balans.zwaksteFactor);
    const faseInfo = faseUitleg[faseKey];
    const groeiAdvies = tuckmanAdvies[faseKey];
    const volgendeLabel = groeiAdvies?.volgendeFase
      ? volgendeFaseLabels[groeiAdvies.volgendeFase] ?? groeiAdvies.volgendeFase
      : faseInfo?.volgendeFase
        ? volgendeFaseLabels[faseInfo.volgendeFase] ?? faseInfo.volgendeFase
        : null;

    return (
      <AppShell>
        <div className="space-y-6">
          <section className="glass result-glow p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="eyebrow">Resultaat</p>
              <span className="rounded-full border border-hairline bg-white/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                Teamwiel
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
              Jullie teamwiel
            </h1>
            <div className="mt-6">
              <TeamWheel ref={wheelRef} scores={scores} variant="dots" />
            </div>
          </section>

          <section className="glass-subtle p-6 sm:p-7">
            <h2 className="text-sm font-semibold text-ink">Slag in het wiel</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Een teamwiel draait soepel als alle succesfactoren in balans zijn. De zwakste factor
              bepaalt waar het wiel het meest hapert — niet als oordeel, maar als aanknopingspunt
              voor gesprek.
            </p>
            <p className="mt-3 text-sm font-semibold text-ink">Zwakste factor: {zwaksteAxis?.label}</p>
          </section>

          <section className="glass p-6 sm:p-7">
            <h2 className="text-sm font-semibold text-ink">Fase-suggestie</h2>
            <textarea
              value={faseTekst}
              onChange={(e) => setFaseTekst(e.target.value)}
              rows={2}
              className="field mt-3 resize-y"
            />
            <p className="mt-2 text-xs italic leading-relaxed text-ink-muted">
              Dit is een suggestie op basis van het patroon — klopt dit voor jullie team?
            </p>

            {(faseInfo || groeiAdvies) && (
              <div className="mt-4 rounded-2xl border border-hairline bg-white/55 p-4">
                {faseInfo && <UitlegBlok titel="Wat betekent deze fase?" tekst={faseInfo.betekenis} />}
                <UitlegBlok
                  titel={
                    volgendeLabel && groeiAdvies?.volgendeFase !== faseKey
                      ? `Wat helpt richting ${volgendeLabel}?`
                      : "Hoe houden jullie het team in beweging?"
                  }
                  tekst={groeiAdvies?.advies ?? faseInfo?.naarVolgende}
                />
              </div>
            )}
          </section>

          <section className="glass p-6 sm:p-7">
            <h2 className="text-sm font-semibold text-ink">Aanbeveling</h2>
            <textarea
              value={aanbevelingTekst}
              onChange={(e) => setAanbevelingTekst(e.target.value)}
              rows={4}
              className="field mt-3 resize-y"
            />
            <p className="mt-3 text-xs italic leading-relaxed text-ink-muted">{gallupNotitie}</p>
          </section>

          <ImagePlaceholder
            label="Finish: loper gaat over de streep"
            description="Eén loper over de finishlijn — het teamresultaat, niet het individuele resultaat"
            aspectRatio="21 / 9"
          />

          <button
            type="button"
            onClick={() => setPhase("ethisch")}
            className="text-sm font-medium text-ink-soft underline decoration-ink-muted/40 underline-offset-4 transition hover:text-ink"
          >
            Reflecteer ook op je eigen leiderschap →
          </button>

          <section className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => downloadWheelAsImage(wheelRef.current)}
              className="btn-primary"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download wiel als afbeelding
            </button>
            <button type="button" onClick={handleRestart} className="btn-ghost">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Opnieuw beginnen
            </button>
          </section>
        </div>
      </AppShell>
    );
  }

  const showProgressPlaceholder = step === 2 || step === 4;
  const progress = (step + (scores[currentAxis.key] ? 1 : 0)) / axesSelf.length;

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="glass droplet-accent relative overflow-hidden p-6 sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">
              Stap {step + 1} van {axesSelf.length}
            </p>
            <ProgressBar value={progress} />
          </div>

          {showProgressPlaceholder && (
            <div className="mt-6">
              <ImagePlaceholder label="Loper onderweg, stokje in de hand" aspectRatio="16 / 9" />
            </div>
          )}

          <div className="mt-7">
            <AxisSelector
              axis={currentAxis}
              selected={scores[currentAxis.key]}
              onSelect={handleSelect}
              disabled={isAdvancing}
            />
          </div>

          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost mt-7">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Vorige stap
            </button>
          )}
        </section>

        <section className="glass-subtle p-4 sm:p-6">
          <TeamWheel scores={scores} variant="dots" />
        </section>
      </div>
    </AppShell>
  );
}
