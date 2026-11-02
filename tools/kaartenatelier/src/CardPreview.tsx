import { COMPLEXITY_LABEL_NL, COMPLEXITY_STARS, REFLECTIE_TEKST } from "./lib/constants";
import { calculatePhotoLayout } from "./lib/layout";
import { measureCardTextFit } from "./lib/textFit";
import type { KaartPakket, KaartPakketKaart } from "./lib/types";

export function CardPreview({
  pakket,
  card,
  label,
  overflowLabel,
}: {
  pakket: KaartPakket;
  card: KaartPakketKaart;
  label: string;
  overflowLabel?: string;
}) {
  const layout = calculatePhotoLayout();
  const total = layout.u;
  const fit = measureCardTextFit(card.titel_nl, card.verhaal_nl);
  return (
    <div className="card-preview-wrap">
      <p className="preview-disclaimer">{label}</p>
      {fit.overflow && overflowLabel && <p className="warn">{overflowLabel}</p>}
      <div
        className="card-preview"
        style={{
          height: `${total / 20}pt`,
          width: `${8391 / 20}pt`,
          maxWidth: "100%",
        }}
      >
        <div
          className="cp-white"
          style={{ minHeight: `${layout.whiteRow / 20}pt` }}
        >
          <span
            className="cp-sector"
            style={{ background: pakket.categorie.sector_kleur }}
          >
            {pakket.categorie.naam_nl.toUpperCase()}
          </span>
          <p className="cp-complex">
            {COMPLEXITY_STARS[card.complexiteit]}{" "}
            {COMPLEXITY_LABEL_NL[card.complexiteit]}
          </p>
          <h3>{card.titel_nl}</h3>
          {card.verhaal_nl.map((p) => (
            <p key={p.slice(0, 12)}>{p}</p>
          ))}
        </div>
        <div className="cp-photo" style={{ height: `${layout.photoRow / 20}pt` }} />
        <div className="cp-bar" style={{ height: `${layout.reflectRow / 20}pt` }}>
          {REFLECTIE_TEKST}
        </div>
      </div>
    </div>
  );
}
