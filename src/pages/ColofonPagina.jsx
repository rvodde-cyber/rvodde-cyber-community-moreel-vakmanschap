import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { getColofonContent } from "../data/colofon";
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

export default function ColofonPagina() {
  const { taal } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const content = getColofonContent(dataLang);

  return (
    <main style={{ background: "#fafaf8", minHeight: "100vh", paddingTop: "80px" }}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{ maxWidth: "760px", margin: "0 auto", padding: "3.5rem 1.5rem 1rem" }}
      >
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#534ab7",
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          {dataLang === "nl" ? "Community Moreel Vakmanschap" : "Community Moral Craftsmanship"}
        </p>
        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
            fontWeight: 700,
            color: "#1a2744",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {content.pageTitle}
        </h1>
      </motion.section>

      {content.secties.map((sectie, index) => (
        <motion.section
          key={sectie.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
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
              color: sectie.accent,
              marginBottom: "1.15rem",
              lineHeight: 1.25,
            }}
          >
            {sectie.titel}
          </h2>
          {sectie.alineaas.map((alinea) => (
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
      ))}

      <div style={{ height: "3rem" }} />
    </main>
  );
}
