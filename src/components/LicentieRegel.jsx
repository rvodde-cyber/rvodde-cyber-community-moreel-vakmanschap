import { LICENTIES, STANDAARD_LICENTIE, getLicentie } from "../data/licentie";
import {
  heeftWerkvorm,
  werkbladHerkomstTekst,
  bronIsEigenOntwikkeling,
  materiaalHerkomstTekst,
} from "../data/attributie";

const herkomstStyle = {
  fontSize: "0.75rem",
  fontFamily: "DM Sans, sans-serif",
  fontStyle: "italic",
  color: "var(--tekst-secundair, #5f5e5a)",
  margin: 0,
  lineHeight: 1.5,
};

export function HerkomstRegel({ children }) {
  return <p style={herkomstStyle}>{children}</p>;
}

export function WerkbladHerkomstRegel({ oorspronkelijke_werkvorm, dataLang }) {
  return (
    <HerkomstRegel>{werkbladHerkomstTekst(oorspronkelijke_werkvorm, dataLang)}</HerkomstRegel>
  );
}

export function MateriaalHerkomstRegel({ bronTekst, dataLang }) {
  if (bronIsEigenOntwikkeling(bronTekst)) return null;
  return <HerkomstRegel>{materiaalHerkomstTekst(dataLang)}</HerkomstRegel>;
}

export default function LicentieRegel({
  naamsvermelding,
  dataLang,
  isAdaptation,
  licentie = STANDAARD_LICENTIE,
}) {
  const lang = dataLang === "en" ? "en" : "nl";
  const adaptationSuffix =
    isAdaptation ? (lang === "en" ? " (adaptation)" : " (bewerking)") : "";
  const code = LICENTIES[licentie] ? licentie : STANDAARD_LICENTIE;
  const lic = getLicentie(code);

  return (
    <p
      style={{
        fontSize: "0.7rem",
        fontFamily: "DM Sans, sans-serif",
        color: "var(--attribution-color, #5f5e5a)",
        margin: 0,
        lineHeight: 1.5,
      }}
    >
      © {naamsvermelding}
      {adaptationSuffix} ·{" "}
      <a
        href={lic.url[lang]}
        rel="license"
        style={{ color: "inherit", textDecoration: "underline" }}
      >
        {code}
      </a>
      {" — "}
      {lic.kort[lang]}
    </p>
  );
}

export function WerkbladLicentieRegel({ item, dataLang }) {
  return (
    <LicentieRegel
      naamsvermelding={item.naamsvermelding}
      dataLang={dataLang}
      isAdaptation={heeftWerkvorm(item.oorspronkelijke_werkvorm)}
      licentie={item.licentie}
    />
  );
}
