import { useState } from "react";
import Leaf from "./Leaf";
import { revealTiming, palette } from "../config/brand";
import { useStaggeredReveal } from "../hooks/useReveal";
import {
  CLOVER_VIEWBOX,
  LEAF_ANGLES,
  averageVitality,
  stemPath,
  tipPoint,
} from "../lib/leafShape";
import { vitality } from "../lib/scoring";
import { withAlpha } from "../lib/colors";
import { result as resultCopy } from "../config/copy";

/**
 * Het levende klavertje: vier bladeren die vanuit een neutrale stand naar hun
 * eindtoestand animeren, met een tooltip per blad.
 *
 * @param {object} props
 * @param {import("../lib/scoring").LeafResult[]} props.perLeaf
 * @param {boolean} [props.animate] onthullingsanimatie vanuit een neutrale stand
 * @param {boolean} [props.interactive] tooltips per blad
 * @param {string} [props.className] breedte van het beeld
 */
export default function Clover({ perLeaf, animate = true, interactive = true, className = "max-w-[26rem]" }) {
  const [activeId, setActiveId] = useState(null);

  const revealed = useStaggeredReveal(
    perLeaf.map((leaf) => leaf.score),
    {
      from: revealTiming.neutralScore,
      durationMs: revealTiming.durationMs,
      staggerMs: revealTiming.staggerMs,
      enabled: animate,
    }
  );

  const stemVitality = averageVitality(revealed.map((score) => vitality(score)));
  const activeLeaf = perLeaf.find((leaf) => leaf.id === activeId) ?? null;
  const activeIndex = perLeaf.findIndex((leaf) => leaf.id === activeId);
  const anchor =
    activeIndex >= 0
      ? tipPoint(LEAF_ANGLES[activeIndex], vitality(revealed[activeIndex] ?? 3))
      : null;

  return (
    <div className={`relative mx-auto w-full ${className}`}>
      <svg
        viewBox={`0 0 ${CLOVER_VIEWBOX.width} ${CLOVER_VIEWBOX.height}`}
        className="w-full overflow-visible"
        role="group"
        aria-label="Klavertje vier met de stand van de vier domeinen"
      >
        <path
          d={stemPath(stemVitality)}
          fill="none"
          stroke={withAlpha(palette.stem, 0.35 + 0.35 * stemVitality)}
          strokeWidth={7 - 1.5 * (1 - stemVitality)}
          strokeLinecap="round"
        />
        {perLeaf.map((leaf, index) => (
          <Leaf
            key={leaf.id}
            color={leaf.color}
            score={revealed[index] ?? revealTiming.neutralScore}
            label={leaf.label}
            qualitative={leaf.qualitative}
            angle={LEAF_ANGLES[index]}
            interactive={interactive}
            active={activeId === leaf.id}
            // Alleen dimmen tijdens het bekijken van één blad. Het uitgelichte
            // blad structureel benadrukken door de andere te vervagen zou de
            // metafoor omdraaien: dan ogen juist de gezonde bladeren slap.
            dimmed={activeId !== null && activeId !== leaf.id}
            onActivate={() => setActiveId(leaf.id)}
            onDeactivate={() => setActiveId((current) => (current === leaf.id ? null : current))}
          />
        ))}
        {/* Het hart van de klaver dekt de vier bladbases netjes af. */}
        <circle
          cx={CLOVER_VIEWBOX.width / 2}
          cy={140}
          r="9"
          fill={withAlpha(palette.stem, 0.22 + 0.2 * stemVitality)}
        />
      </svg>

      {activeLeaf && anchor ? (
        <div
          className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-full rounded-2xl border border-hairline bg-white/85 p-3 text-left shadow-glass backdrop-blur-md"
          style={{
            left: `${(anchor.x / CLOVER_VIEWBOX.width) * 100}%`,
            top: `${(anchor.y / CLOVER_VIEWBOX.height) * 100}%`,
          }}
          role="status"
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {activeLeaf.qualitative}
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">{activeLeaf.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">{activeLeaf.note}</p>
        </div>
      ) : null}

      {interactive ? (
        <p className="mt-2 text-center text-xs text-ink-muted">{resultCopy.tooltipHint}</p>
      ) : null}
    </div>
  );
}
