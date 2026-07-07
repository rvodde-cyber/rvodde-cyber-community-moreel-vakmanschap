import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTaal } from "../context/TaalContext";
import { bibliotheekData } from "../data/bibliotheekData";
import { getBibliotheekDataLang, getLocalizedPageContent, usesEnglishRoutes } from "../data/vertalingen";

const uiTekst = {
  nl: {
    label: "Materialen",
    titel: "Bibliotheek",
    subtitel:
      "Alle tools, werkbladen en gesprekskaarten — geordend per modelstap. Kies een stap om te beginnen.",
    bekijk: "Bekijk materialen →",
    stapLabel: "Stap",
    categorieLabel: "Categorie",
    disclaimerTitel: "Gebruik & bronvermelding",
    disclaimerTekst:
      "De werkbladen op dit platform zijn ontwikkeld door Richard Voddé (Lectoraat Ethisch Werken, Fontys Hogescholen) als onderdeel van het Comenius Senior Fellowship. De onderliggende theoretische modellen worden gebruikt met bronvermelding en zijn bedoeld voor niet-commercieel educatief gebruik. Vrij te gebruiken met vermelding van de bron.",
    materialenEn: "materiaal",
    materialenMeervoud: "materialen",
  },
  en: {    label: "Materials",
    titel: "Library",
    subtitel:
      "All tools, worksheets and conversation cards — organised by model step. Choose a step to get started.",
    bekijk: "View materials →",
    stapLabel: "Step",
    categorieLabel: "Category",
    disclaimerTitel: "Use & attribution",
    disclaimerTekst:
      "The worksheets on this platform were developed by Richard Voddé (Research Group Ethical Practice, Fontys University of Applied Sciences) as part of the Comenius Senior Fellowship. The underlying theoretical models are used with full attribution and are intended for non-commercial educational purposes. Free to use with source acknowledgement.",
    materialenEn: "material",
    materialenMeervoud: "materials",
  },
};
const stapSlug = {
  1: "zien",
  2: "voelen",
  3: "wegen",
  4: "handelen",
  5: "volhouden",
};

function getStapRouteSlug(stapItem, dataLang) {
  if (stapItem.stapSlug) {
    return dataLang === "nl" ? stapItem.stapSlug.nl : stapItem.stapSlug.en;
  }
  return stapSlug[stapItem.stap];
}

function getStapImageSlug(stapItem) {
  if (stapItem.stapSlug) return stapItem.stapSlug.nl;
  return stapSlug[stapItem.stap];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

function handleImageError(event, kleur) {
  event.currentTarget.style.display = "none";
  event.currentTarget.parentElement.style.backgroundColor = kleur;
}

export default function BiblioteekOverzicht() {
  const { taal } = useTaal();
  const ui = getLocalizedPageContent(uiTekst, taal, "bibliotheek");
  const dataLang = getBibliotheekDataLang(taal);
  const data = bibliotheekData[dataLang];
  const navigate = useNavigate();

  const handleStapKlik = (stapItem) => {
    const slug = getStapRouteSlug(stapItem, dataLang);
    const route = usesEnglishRoutes(taal) ? `/library/${slug}` : `/bibliotheek/${slug}`;
    navigate(route);
  };

  return (
    <main
      style={{
        backgroundColor: "var(--achtergrond, #fafaf8)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <section
        style={{ padding: "3rem 1.5rem 4rem", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "0.75rem",
            fontFamily: "DM Sans, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#534ab7",
            marginBottom: "0.75rem",
          }}
        >
          {ui.label}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 600,
            marginBottom: "1.25rem",
            color: "var(--tekst-primair, #1a2744)",
          }}
        >
          {ui.titel}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            color: "var(--tekst-secundair, #5f5e5a)",
          }}
        >
          {ui.subtitel}
        </motion.p>
      </section>

      <section style={{ padding: "0 1.5rem 6rem", maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1.75rem",
          }}
        >
          {data.map((stap, i) => (
            <motion.div
              key={stap.stap}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              onClick={() => handleStapKlik(stap)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleStapKlik(stap);
                }
              }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--rand, #d3d1c7)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            >
              <div style={{ position: "relative", height: "200px", overflow: "hidden", backgroundColor: stap.kleur }}>
                <img
                  src={`/images/bibliotheek/stap-${getStapImageSlug(stap)}.jpg`}
                  alt={stap.stapNaam}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(event) => handleImageError(event, stap.kleur)}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to bottom, ${stap.kleur}33, ${stap.kleur}99)`,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem" }}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "DM Sans, sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.8)",
                      display: "block",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {typeof stap.stap === "number" ? `${ui.stapLabel} ${stap.stap}` : ui.categorieLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {stap.stapNaam}
                  </span>
                </div>
              </div>

              <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "var(--tekst-secundair, #5f5e5a)",
                    marginBottom: "1.25rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {stap.intro}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontFamily: "DM Sans, sans-serif",
                      color: "var(--tekst-secundair)",
                    }}
                  >
                    {dataLang === "nl"
                      ? stap.materialen.length === 1
                        ? "1 materiaal"
                        : `${stap.materialen.length} materialen`
                      : stap.materialen.length === 1
                        ? `1 ${ui.materialenEn ?? "material"}`
                        : `${stap.materialen.length} ${ui.materialenMeervoud ?? "materials"}`}
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontFamily: "DM Sans, sans-serif",
                      color: stap.kleur,
                      fontWeight: 500,
                    }}
                  >
                    {ui.bekijk}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        style={{
          backgroundColor: "#f0eeea",
          borderTop: "1px solid var(--rand, #d3d1c7)",
          padding: "3rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1rem" }}>
            <Shield
              size={22}
              strokeWidth={1.8}
              style={{ flexShrink: 0, color: "#534ab7", marginTop: "0.15rem" }}
              aria-hidden="true"
            />
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                margin: 0,
                color: "var(--tekst-primair, #1a2744)",
              }}
            >
              {ui.disclaimerTitel}
            </h2>
          </div>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: "var(--tekst-secundair, #5f5e5a)",
              margin: 0,
            }}
          >
            {ui.disclaimerTekst}
          </p>
        </div>
      </section>
    </main>  );
}
