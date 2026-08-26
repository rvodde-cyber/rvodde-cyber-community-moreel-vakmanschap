import { LEAF_ANGLES, averageVitality, leafPath, leafTransform, stemPath, tipPoint } from "../lib/leafShape";
import { printLeafColor, withAlpha } from "../lib/colors";
import { palette } from "../config/brand";

// Ruimte om de klaver heen voor de bladnamen. Het midden van de viewBox valt
// samen met het hart van de klaver (x = 160), zodat het beeld gecentreerd blijft
// en de langste bladnaam er nog naast past zonder af te snijden.
const PRINT_VIEWBOX = "-110 -24 540 356";
const PRINT_SIZE = { width: 1080, height: 712 };

/**
 * De printvariant van het klavertje (briefing §8.3).
 *
 * Verschillen met de levende weergave, allemaal met opzet:
 * - geen animatie en geen ademende beweging: één vaste momentopname;
 * - geen `backdrop-filter`/blur — dat rendert onbetrouwbaar in PDF-generators;
 *   de glans is vervangen door een vlakke lichte gradient-overlay;
 * - kleuren via `printLeafColor`, met een helderheidsladder zodat de vier
 *   bladeren ook in grijstinten uit elkaar te houden zijn;
 * - uitsluitend presentation-attributes, geen CSS-klassen, zodat de SVG
 *   los geserialiseerd en naar een afbeelding omgezet kan worden.
 *
 * @param {object} props
 * @param {import("../lib/scoring").LeafResult[]} props.perLeaf
 * @param {boolean} [props.showLabels]
 */
export default function CloverPrintView({ perLeaf, showLabels = true, svgRef }) {
  const stemVitality = averageVitality(perLeaf.map((leaf) => leaf.vitality));

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={PRINT_VIEWBOX}
      width={PRINT_SIZE.width}
      height={PRINT_SIZE.height}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="print-gloss" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="-110" y="-24" width="540" height="356" fill="#FFFFFF" />

      <path
        d={stemPath(stemVitality)}
        fill="none"
        stroke={withAlpha(palette.stem, 0.55)}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {perLeaf.map((leaf, index) => {
        const fill = printLeafColor(leaf.color, index, leaf.vitality);
        return (
          <g key={leaf.id} transform={leafTransform(LEAF_ANGLES[index], leaf.vitality)}>
            {/* Witte rand onder het blad: houdt overlappende bladeren van
                elkaar te onderscheiden, ook in grijstinten. */}
            <path
              d={leafPath(leaf.vitality)}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d={leafPath(leaf.vitality)}
              fill={fill}
              stroke={withAlpha("#1C1917", 0.45)}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d={leafPath(leaf.vitality)} fill="url(#print-gloss)" />
            <path
              d="M 0 -4 C 2 -30 1 -52 0 -70"
              fill="none"
              stroke={withAlpha("#1C1917", 0.18)}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      <circle cx="160" cy="140" r="8" fill={withAlpha(palette.stem, 0.5)} />

      {showLabels
        ? perLeaf.map((leaf, index) => {
            const angle = LEAF_ANGLES[index];
            const tip = tipPoint(angle, leaf.vitality);
            const toTheRight = Math.sin((angle * Math.PI) / 180) > 0;
            const x = tip.x + (toTheRight ? 18 : -18);
            const y = tip.y + (Math.abs(angle) > 90 ? 18 : -8);
            return (
              <text
                key={leaf.id}
                x={x}
                y={y}
                textAnchor={toTheRight ? "start" : "end"}
                fontFamily="Helvetica, Arial, sans-serif"
                fontSize="15"
                fontWeight="600"
                fill="#1C1917"
              >
                {leaf.label}
                <tspan
                  x={x}
                  dy="17"
                  fontSize="13"
                  fontWeight="400"
                  fill="#57534E"
                >
                  {leaf.qualitative}
                </tspan>
              </text>
            );
          })
        : null}
    </svg>
  );
}
