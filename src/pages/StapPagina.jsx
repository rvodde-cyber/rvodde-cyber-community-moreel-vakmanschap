import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { bibliotheekData, niveauLabels, statusLabels } from "../data/bibliotheekData";

const stapSlugNaarNummer = {
  zien: 1,
  seeing: 1,
  voelen: 2,
  feeling: 2,
  wegen: 3,
  weighing: 3,
  handelen: 4,
  acting: 4,
  volhouden: 5,
  persisting: 5,
  verhaal: "verhaal",
  "story-reflection": "verhaal",
};

const slugNaarAfbeelding = {
  zien: "zien",
  seeing: "zien",
  voelen: "voelen",
  feeling: "voelen",
  wegen: "wegen",
  weighing: "wegen",
  handelen: "handelen",
  acting: "handelen",
  volhouden: "volhouden",
  persisting: "volhouden",
  verhaal: "verhaal",
  "story-reflection": "verhaal",
};

const combineerKoppelingen = {
  1: {
    volgendeNl: "voelen",
    volgendeEn: "feeling",
    nlLabel: "Combineer Zien met Voelen →",
    enLabel: "Combine Seeing with Feeling →",
  },
  2: {
    volgendeNl: "wegen",
    volgendeEn: "weighing",
    nlLabel: "Combineer Voelen met Wegen →",
    enLabel: "Combine Feeling with Weighing →",
  },
  3: {
    volgendeNl: "handelen",
    volgendeEn: "acting",
    nlLabel: "Combineer Wegen met Handelen →",
    enLabel: "Combine Weighing with Acting →",
  },
  4: {
    volgendeNl: "volhouden",
    volgendeEn: "persisting",
    nlLabel: "Combineer Handelen met Volhouden →",
    enLabel: "Combine Acting with Persisting →",
  },
  5: {
    volgendeNl: "zien",
    volgendeEn: "seeing",
    nlLabel: "Combineer Volhouden met Zien →",
    enLabel: "Combine Persisting with Seeing →",
  },
};

const uiTekst = {
  nl: {
    terug: "← Terug naar bibliotheek",
    stap: "Stap",
    categorie: "Categorie",
    downloadNL: "Download NL",
    downloadEN: "Download EN",
    binnenkort: "Binnenkort beschikbaar",
    nietGevonden: "Pagina niet gevonden.",
    bronLabel: "Bron:",
    ctaTitel: "Gebruik je dit in je onderwijs?",
    ctaTekst:
      "Deel je ervaringen, leer van collega's en draag bij aan een community die ethiekonderwijs versterkt.",
    ctaKnop: "Doe mee →",
  },
  en: {
    terug: "← Back to library",
    stap: "Step",
    categorie: "Category",
    downloadNL: "Download NL",
    downloadEN: "Download EN",
    binnenkort: "Coming soon",
    nietGevonden: "Page not found.",
    bronLabel: "Source:",
    ctaTitel: "Using this in your teaching?",
    ctaTekst:
      "Share your experiences, learn from colleagues and contribute to a community that strengthens ethics education.",
    ctaKnop: "Join us →",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
};

function handleImageError(event, kleur) {
  event.currentTarget.style.display = "none";
  event.currentTarget.parentElement.style.backgroundColor = kleur;
}

function bronTekst(bron, taal) {
  if (!bron) return null;
  if (typeof bron === "string") return bron;
  return bron[taal];
}

export default function StapPagina() {
  const { stap } = useParams();
  const { taal } = useTaal();
  const navigate = useNavigate();
  const ui = uiTekst[taal];
  const labels = niveauLabels[taal];
  const status = statusLabels[taal];

  const stapNummer = stapSlugNaarNummer[stap];
  const data = bibliotheekData[taal];
  const stapData = data.find((item) => item.stap === stapNummer);
  const afbeeldingSlug = slugNaarAfbeelding[stap] || stap;
  const combineer = typeof stapNummer === "number" ? combineerKoppelingen[stapNummer] : null;
  const combineerHref =
    taal === "nl"
      ? `/bibliotheek/${combineer?.volgendeNl}`
      : `/library/${combineer?.volgendeEn}`;
  const aanmeldenHref = taal === "nl" ? "/aanmelden" : "/join";

  if (!stapData) {
    return (
      <main style={{ padding: "6rem 1.5rem", textAlign: "center", minHeight: "100vh" }}>
        <p style={{ fontFamily: "DM Sans, sans-serif" }}>{ui.nietGevonden}</p>
      </main>
    );
  }

  const terugRoute = taal === "nl" ? "/bibliotheek" : "/library";

  return (
    <main style={{ backgroundColor: "var(--achtergrond, #fafaf8)", minHeight: "100vh" }}>
      <section style={{ position: "relative", height: "360px", overflow: "hidden", backgroundColor: stapData.kleur }}>
        <img
          src={`/images/bibliotheek/stap-${afbeeldingSlug}.jpg`}
          alt={stapData.stapNaam}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(event) => handleImageError(event, stapData.kleur)}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, ${stapData.kleur}44, ${stapData.kleur}dd)`,
            pointerEvents: "none",
          }}
        />

        <button
          type="button"
          onClick={() => navigate(terugRoute)}
          style={{
            position: "absolute",
            top: "5.5rem",
            left: "1.5rem",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#ffffff",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.85rem",
            padding: "0.5rem 1rem",
            borderRadius: "99px",
            cursor: "pointer",
          }}
        >
          {ui.terug}
        </button>

        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "0.5rem",
            }}
          >
            {typeof stapData.stap === "number" ? `${ui.stap} ${stapData.stap}` : ui.categorie}
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 600,
              color: "#ffffff",
              margin: 0,
            }}
          >
            {stapData.stapNaam}
          </h1>
        </div>
      </section>

      <section style={{ padding: "3rem 1.5rem 1.5rem", maxWidth: "760px", margin: "0 auto" }}>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
            lineHeight: 1.75,
            color: "var(--tekst-secundair, #5f5e5a)",
            borderLeft: `3px solid ${stapData.kleur}`,
            paddingLeft: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {stapData.intro}
        </motion.p>

        {combineer && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <Link
              to={combineerHref}
              style={{
                display: "inline-block",
                padding: "0.5rem 1.1rem",
                borderRadius: "99px",
                border: `1.5px solid ${stapData.kleur}`,
                color: stapData.kleur,
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = stapData.kleur;
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = stapData.kleur;
              }}
            >
              {taal === "nl" ? combineer.nlLabel : combineer.enLabel}
            </Link>
          </motion.div>
        )}
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ height: "1px", backgroundColor: "var(--rand, #d3d1c7)" }} />
      </div>

      <section style={{ padding: "3rem 1.5rem 4rem", maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {stapData.materialen.map((mat, i) => (
            <motion.div
              key={mat.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid var(--rand, #d3d1c7)",
                borderTop: `3px solid ${mat.binnenkort ? "var(--rand, #d3d1c7)" : stapData.kleur}`,
                padding: "1.25rem",
                opacity: mat.binnenkort ? 0.65 : 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {mat.status ? (
                <span
                  style={{
                    alignSelf: "flex-start",
                    fontSize: "0.7rem",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "99px",
                    color: status[mat.status].color,
                    backgroundColor: status[mat.status].background,
                  }}
                >
                  {status[mat.status].label}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "DM Sans, sans-serif",
                    color: "var(--tekst-secundair)",
                  }}
                >
                  {labels[mat.niveau]}
                </span>
              )}

              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  margin: 0,
                  color: mat.binnenkort ? "var(--tekst-secundair)" : "var(--tekst-primair)",
                }}
              >
                {mat.titel}
              </h3>

              {mat.omschrijving && (
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    color: "var(--tekst-secundair)",
                    margin: 0,
                  }}
                >
                  {mat.omschrijving}
                </p>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {mat.themas.map((thema) => (
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

              {mat.binnenkort ? (
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontFamily: "DM Sans, sans-serif",
                    color: "var(--tekst-secundair)",
                    fontStyle: "italic",
                    marginTop: "auto",
                  }}
                >
                  {ui.binnenkort}
                </span>
              ) : mat.bestand_nl || mat.bestand_en ? (
                <>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto", flexWrap: "wrap" }}>
                    {mat.bestand_nl && (
                      <a
                        href={`/downloads/${mat.map}/${mat.bestand_nl}`}
                        download
                        style={{
                          padding: "0.45rem 0.9rem",
                          backgroundColor: stapData.kleur,
                          color: "#ffffff",
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "0.8rem",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {ui.downloadNL}
                      </a>
                    )}
                    {mat.bestand_en && (
                      <a
                        href={`/downloads/${mat.map}/${mat.bestand_en}`}
                        download
                        style={{
                          padding: "0.45rem 0.9rem",
                          backgroundColor: "transparent",
                          color: stapData.kleur,
                          border: `1px solid ${stapData.kleur}`,
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "0.8rem",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {ui.downloadEN}
                      </a>
                    )}
                  </div>
                  {bronTekst(mat.bron, taal) && (
                    <p
                      style={{
                        fontSize: "0.75rem",
                        fontFamily: "DM Sans, sans-serif",
                        color: "var(--tekst-secundair, #5f5e5a)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {ui.bronLabel} {bronTekst(mat.bron, taal)}
                    </p>
                  )}
                </>
              ) : null}
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#1a2744", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            {ui.ctaTitel}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.75)",
              marginBottom: "2rem",
            }}
          >
            {ui.ctaTekst}
          </motion.p>
          <motion.a
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            href={aanmeldenHref}
            style={{
              display: "inline-block",
              padding: "0.875rem 2rem",
              backgroundColor: "#534ab7",
              color: "#ffffff",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            {ui.ctaKnop}
          </motion.a>
        </div>
      </section>
    </main>
  );
}
