import { Link } from "react-router-dom";
import { getColofonPath, getGebruiksNotice } from "../data/colofon";
import { getBibliotheekDataLang } from "../data/vertalingen";
import { useTaal } from "../context/TaalContext";

/**
 * Ambient one-liner pointing to the colophon.
 * @param {'bibliotheek' | 'gesprekskaarten'} variant
 */
export default function GebruiksNotice({ variant = "bibliotheek", style = {} }) {
  const { taal } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const notice = getGebruiksNotice(dataLang);
  const href = getColofonPath(dataLang);

  const voor =
    variant === "gesprekskaarten" ? notice.gesprekskaartenVoor : notice.bibliotheekVoor;
  const linkLabel =
    variant === "gesprekskaarten" ? notice.gesprekskaartenLink : notice.bibliotheekLink;
  const na = variant === "gesprekskaarten" ? notice.gesprekskaartenNa : notice.bibliotheekNa;

  return (
    <p
      style={{
        fontFamily: "DM Sans, sans-serif",
        fontSize: "0.9rem",
        lineHeight: 1.75,
        color: "#5f5e5a",
        fontStyle: "italic",
        margin: 0,
        ...style,
      }}
    >
      {voor}
      <Link
        to={href}
        style={{
          color: "#534ab7",
          fontWeight: 600,
          fontStyle: "normal",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
        }}
      >
        {linkLabel}
      </Link>
      {na}
    </p>
  );
}
