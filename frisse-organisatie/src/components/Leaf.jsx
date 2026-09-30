import { useId } from "react";
import { leafPalette, withAlpha } from "../lib/colors";
import { HIGHLIGHT, LEAF_ANGLES, droopFor, leafPath, leafTransform } from "../lib/leafShape";
import { vitality } from "../lib/scoring";

/**
 * Eén blad van het klavertje.
 *
 * Volledig gestuurd door `score`: kleur, verzadiging, doorhangen, omkrullen en
 * de glans-highlight zijn continu geïnterpoleerd (briefing §8.1). De component
 * kent de scan niet en is daarom los herbruikbaar — ook in een latere
 * workshopmodus.
 *
 * @param {object} props
 * @param {string} props.color basiskleur van dit blad
 * @param {number} props.score 1–5
 * @param {string} props.label naam van het domein
 * @param {number} [props.angle] plaatsingshoek rond het hart van de klaver
 * @param {string} [props.qualitative] kwalitatieve duiding voor de aria-label
 * @param {boolean} [props.animated] ademende beweging bij een vitaal blad
 * @param {boolean} [props.dimmed] naar achteren gezet omdat een ander blad is uitgelicht
 * @param {boolean} [props.active] tooltip staat open
 */
export default function Leaf({
  color,
  score,
  label,
  angle = LEAF_ANGLES[0],
  qualitative,
  animated = true,
  dimmed = false,
  active = false,
  interactive = false,
  onActivate,
  onDeactivate,
}) {
  const uid = useId().replace(/[:]/g, "");
  const v = vitality(score);
  const palette = leafPalette(color, v);
  const path = leafPath(v);

  const gradientId = `leaf-fill-${uid}`;
  const glossId = `leaf-gloss-${uid}`;

  // Alleen een vitaal blad ademt; een dorstig of verwelkt blad hoort stil te staan.
  const breathing = animated && v > 0.8;
  const thirsty = v > 0.3 && v <= 0.65;

  const handlers = interactive
    ? {
        onMouseEnter: onActivate,
        onMouseLeave: onDeactivate,
        onFocus: onActivate,
        onBlur: onDeactivate,
        onClick: onActivate,
        tabIndex: 0,
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onActivate?.();
          }
        },
      }
    : {};

  return (
    <g
      className={[
        "leaf",
        breathing ? "leaf--breathing" : "",
        interactive ? "leaf--interactive" : "",
        dimmed ? "leaf--dimmed" : "",
        active ? "leaf--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="img"
      // Kwalitatief, nooit het cijfer — dat past bij de "geen rapportcijfer"-lijn (§6, §8.2).
      aria-label={qualitative ? `${label}: ${qualitative}` : label}
      {...handlers}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={palette.highlight} />
          <stop offset="38%" stopColor={palette.base} />
          <stop offset="100%" stopColor={palette.shade} />
        </linearGradient>
        <radialGradient id={glossId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Twee geneste groepen met opzet: de buitenste plaatst het blad, de
          binnenste ademt. Eén element voor allebei zou betekenen dat de
          CSS-transform-origin ook de plaatsing verschuift. */}
      <g transform={leafTransform(angle, v)}>
        <g className="leaf__breathe">
          {/* Witte rand onder het blad: houdt overlappende bladeren van elkaar
              te onderscheiden zonder een harde contourlijn. */}
          <path d={path} fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" opacity="0.75" />
          <path
            d={path}
            fill={`url(#${gradientId})`}
            stroke={withAlpha(palette.outline, 0.35)}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Nerf: verdwijnt grotendeels mee met de glans als het blad verwelkt. */}
          <path
            d="M 0 -4 C 2 -30 1 -52 0 -70"
            fill="none"
            stroke={withAlpha(palette.outline, 0.18 + 0.16 * v)}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <ellipse
            cx={HIGHLIGHT.cx}
            cy={HIGHLIGHT.cy}
            rx={HIGHLIGHT.rx}
            ry={HIGHLIGHT.ry}
            transform={`rotate(${HIGHLIGHT.rotate} ${HIGHLIGHT.cx} ${HIGHLIGHT.cy})`}
            fill={`url(#${glossId})`}
            opacity={0.08 + 0.62 * v}
          />
          {thirsty ? <Droplet color={palette.outline} rotation={-(angle + droopFor(angle, v))} /> : null}
        </g>
      </g>
    </g>
  );
}

/**
 * Klein druppel-icoontje bij een dorstig blad; knippert zacht (§8.1).
 * Draait tegen de plaatsing in, zodat de druppel altijd rechtop staat en niet
 * met het blad meekantelt.
 */
function Droplet({ color, rotation }) {
  return (
    <g className="leaf-droplet" transform={`translate(0 -114) rotate(${rotation})`} aria-hidden="true">
      <path
        d="M 0 -8 C 4.5 -2.5 7 0.5 7 3.5 A 7 7 0 0 1 -7 3.5 C -7 0.5 -4.5 -2.5 0 -8 Z"
        fill={withAlpha(color, 0.3)}
        stroke={withAlpha(color, 0.5)}
        strokeWidth="1"
      />
    </g>
  );
}
