import { Link } from "react-router-dom";
import { getZieOokItems } from "../data/werkbladZieOok";
import { getBibliotheekDataLang, usesEnglishRoutes } from "../data/vertalingen";
import { useTaal } from "../context/TaalContext";

const uiTekst = {
  nl: { heading: "Zie ook" },
  en: { heading: "See also" },
};

export default function WerkbladZieOok({ ids, accentColor = "var(--tekst-primair)" }) {
  const { taal } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const enRoutes = usesEnglishRoutes(taal);
  const ui = uiTekst[dataLang] ?? uiTekst.nl;
  const items = getZieOokItems(ids, dataLang, enRoutes);
  if (items.length === 0) return null;

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem" }}>
      <p
        style={{
          margin: "0 0 0.35rem",
          fontWeight: 600,
          color: "var(--tekst-primair)",
        }}
      >
        {ui.heading}
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              style={{ color: accentColor, textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              {item.titel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
