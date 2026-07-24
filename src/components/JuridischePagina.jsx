import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { getBibliotheekDataLang } from "../data/vertalingen";

const EMAIL = "lectoraatethischwerken@fontys.nl";

function linkifyEmail(text) {
  if (!text.includes(EMAIL)) return text;
  const parts = text.split(EMAIL);
  return parts.flatMap((part, index) =>
    index < parts.length - 1
      ? [
          part,
          <a
            key={`mail-${index}`}
            href={`mailto:${EMAIL}`}
            style={{ color: "inherit", fontWeight: 600, textDecoration: "underline" }}
          >
            {EMAIL}
          </a>,
        ]
      : [part]
  );
}

function Sectie({ sectie, accent }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "2.25rem 1.5rem",
        borderTop: "1px solid #d3d1c7",
      }}
    >
      <h2
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(1.5rem, 3vw, 1.85rem)",
          fontWeight: 700,
          color: "#1a2744",
          marginBottom: "1.1rem",
          lineHeight: 1.25,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "0.55rem",
            height: "0.55rem",
            borderRadius: "999px",
            backgroundColor: accent,
            marginRight: "0.65rem",
            transform: "translateY(-0.1em)",
          }}
          aria-hidden="true"
        />
        {sectie.titel}
      </h2>

      {(sectie.alineaas || []).map((alinea) => (
        <p
          key={alinea}
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "1rem",
            color: "#5f5e5a",
            lineHeight: 1.8,
            marginBottom: "1rem",
          }}
        >
          {linkifyEmail(alinea)}
        </p>
      ))}

      {sectie.bullets?.length > 0 && (
        <ul
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "1rem",
            color: "#5f5e5a",
            lineHeight: 1.8,
            margin: "0 0 1rem",
            paddingLeft: "1.25rem",
          }}
        >
          {sectie.bullets.map((item) => (
            <li key={item} style={{ marginBottom: "0.4rem" }}>
              {linkifyEmail(item)}
            </li>
          ))}
        </ul>
      )}

      {(sectie.alineaasNa || []).map((alinea) => (
        <p
          key={alinea}
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "1rem",
            color: "#5f5e5a",
            lineHeight: 1.8,
            marginBottom: "1rem",
          }}
        >
          {linkifyEmail(alinea)}
        </p>
      ))}
    </motion.section>
  );
}

export default function JuridischePagina({ content }) {
  const { taal } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const accent = content.accent;
  const showNl = dataLang === "nl";
  const page = showNl ? content.nl : content.en;

  return (
    <main style={{ background: "#fafaf8", minHeight: "100vh", paddingTop: "80px" }}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{ maxWidth: "760px", margin: "0 auto", padding: "3.5rem 1.5rem 1.5rem" }}
      >
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accent,
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          {showNl ? "Community Moreel Vakmanschap" : "Community Moral Craftsmanship"}
        </p>
        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
            fontWeight: 700,
            color: "#1a2744",
            lineHeight: 1.15,
            marginBottom: showNl && page.intro ? "1.25rem" : "0.5rem",
          }}
        >
          {page.titel}
        </h1>
        {showNl && page.intro && (
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1.05rem",
              color: "#5f5e5a",
              lineHeight: 1.8,
              marginTop: "0.5rem",
            }}
          >
            {page.intro}
          </p>
        )}
      </motion.section>

      {showNl ? (
        page.secties.map((sectie) => <Sectie key={sectie.titel} sectie={sectie} accent={accent} />)
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "2rem 1.5rem 4rem",
            borderTop: "1px solid #d3d1c7",
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1rem",
              color: "#5f5e5a",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            {page.comingSoon}
          </p>
          <p
            style={{
              display: "inline-block",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: accent,
              border: `1px solid ${accent}`,
              borderRadius: "999px",
              padding: "0.45rem 1rem",
            }}
            title="Coming soon"
          >
            Coming soon
          </p>
        </motion.section>
      )}

      {showNl && <div style={{ height: "3rem" }} />}
    </main>
  );
}
