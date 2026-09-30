import { niveauLabels } from "../data/bibliotheekData.js";
import DownloadKnop from "./DownloadKnop";
import { WerkbladHerkomstRegel, WerkbladLicentieRegel } from "./LicentieRegel";
import {
  downloadPad,
  sfeerbeeldPad,
  hoofdfaseKleur,
  getFaseNaam,
  FASE_KLEUREN,
} from "../data/werkbladen";
import { getBibliotheekDataLang } from "../data/vertalingen";
import { useTaal } from "../context/TaalContext";

const uiTekst = {
  nl: {
    studentNl: "Studentenversie",
    docentNl: "Docentenversie",
    studentEn: "Student version",
    docentEn: "Teacher version",
    bronnen: "Bronnen",
    gebaseerdOp: "Gebaseerd op:",
    binnenkort: "Binnenkort beschikbaar",
  },
  en: {
    studentNl: "Studentenversie",
    docentNl: "Docentenversie",
    studentEn: "Student version",
    docentEn: "Teacher version",
    bronnen: "Sources",
    gebaseerdOp: "Based on:",
    binnenkort: "Coming soon",
  },
};

function handleImageError(event, kleur) {
  event.currentTarget.style.display = "none";
  event.currentTarget.parentElement.style.backgroundColor = kleur;
}

export default function WerkbladKaart({ item }) {
  const { taal, t } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const ui = uiTekst[dataLang] ?? uiTekst.nl;
  const labels = niveauLabels[dataLang];
  const accent = hoofdfaseKleur(item);
  const complexLabels = t.gesprekskaart?.complexiteitLabels ?? {};
  const imgSrc = sfeerbeeldPad(item);

  const downloadRow = (studentKey, docentKey, studentLabel, docentLabel) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <DownloadKnop
        bestand={item.bestanden[studentKey]}
        href={
          item.bestanden[studentKey]
            ? downloadPad(item.id, item.bestanden[studentKey])
            : undefined
        }
        label={studentLabel}
        accentColor={accent}
        variant="filled"
        disabled={!item.bestanden[studentKey]}
        disabledTitle={ui.binnenkort}
      />
      <DownloadKnop
        bestand={item.bestanden[docentKey]}
        href={
          item.bestanden[docentKey]
            ? downloadPad(item.id, item.bestanden[docentKey])
            : undefined
        }
        label={docentLabel}
        accentColor={accent}
        variant="outline"
        disabled={!item.bestanden[docentKey]}
        disabledTitle={ui.binnenkort}
      />
    </div>
  );

  return (
    <article
      id={item.id}
      style={{
        scrollMarginTop: "6rem",
        backgroundColor: "var(--surface, #fdfcfa)",
        borderRadius: "12px",
        border: "1px solid var(--rand, #d8d3c9)",
        borderTop: `3px solid ${accent}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          aspectRatio: "16 / 9",
          backgroundColor: accent,
          overflow: "hidden",
        }}
      >
        <img
          src={imgSrc}
          alt={item.titel}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => handleImageError(e, accent)}
        />
      </div>

      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            fontFamily: "DM Sans, sans-serif",
            color: "var(--tekst-secundair)",
          }}
        >
          {labels[item.niveau]}
        </span>

        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            margin: 0,
            color: "var(--tekst-primair)",
          }}
        >
          {item.titel}
        </h3>

        {item.omschrijving && (
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.8rem",
              lineHeight: 1.6,
              color: "var(--tekst-secundair)",
              margin: 0,
            }}
          >
            {item.omschrijving}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", alignItems: "center" }}>
          {item.fasen.map((fase) => (
            <span
              key={fase}
              style={{
                fontSize: "0.7rem",
                fontFamily: "DM Sans, sans-serif",
                padding: "0.2rem 0.6rem",
                borderRadius: "99px",
                backgroundColor: FASE_KLEUREN[fase] ?? accent,
                color: "#ffffff",
              }}
            >
              {getFaseNaam(fase, dataLang)}
            </span>
          ))}
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "DM Sans, sans-serif",
              padding: "0.2rem 0.6rem",
              borderRadius: "99px",
              border: "1px solid var(--complexity-color, #993556)",
              color: "var(--complexity-color, #993556)",
            }}
          >
            {complexLabels[item.complexiteit] ?? item.complexiteit}
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "DM Sans, sans-serif",
              color: "var(--tekst-secundair)",
            }}
          >
            {item.duur} · {item.groep} · {item.opleidingsniveau} · {item.vakgebied}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {item.themas.map((thema) => (
            <span
              key={thema}
              style={{
                fontSize: "0.7rem",
                fontFamily: "DM Sans, sans-serif",
                padding: "0.2rem 0.6rem",
                borderRadius: "99px",
                backgroundColor: "#f0eeea",
                color: "var(--tekst-secundair)",
              }}
            >
              {thema}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "auto" }}>
          {downloadRow("student_nl", "docent_nl", ui.studentNl, ui.docentNl)}
          {downloadRow("student_en", "docent_en", ui.studentEn, ui.docentEn)}
        </div>

        <details style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem" }}>
          <summary style={{ cursor: "pointer", color: "var(--tekst-primair)", fontWeight: 500 }}>
            {ui.bronnen}
          </summary>
          <div style={{ marginTop: "0.5rem", color: "var(--tekst-secundair, #5f5e5a)" }}>
            <p style={{ margin: "0 0 0.5rem" }}>
              {ui.gebaseerdOp} {item.oorspronkelijke_werkvorm}
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {item.bronnen_apa.map((bron, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "0.75rem",
                    paddingLeft: "1.5em",
                    textIndent: "-1.5em",
                    marginBottom: "0.35rem",
                  }}
                >
                  {bron}
                </li>
              ))}
            </ul>
          </div>
        </details>

        <WerkbladHerkomstRegel oorspronkelijke_werkvorm={item.oorspronkelijke_werkvorm} dataLang={dataLang} />
        <WerkbladLicentieRegel item={item} dataLang={dataLang} />
      </div>
    </article>
  );
}
