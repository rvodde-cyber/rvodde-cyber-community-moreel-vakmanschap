import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { stappen as stappenMeta } from "../data/stappen";

export default function ProjectInfo() {
  const { t } = useTaal();
  const { overPagina } = t;

  return (
    <main style={{ background: "#fafaf8", minHeight: "100vh", paddingTop: "80px" }}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 2rem 2rem" }}
      >
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "13px",
            letterSpacing: "2px",
            color: "#534ab7",
            textTransform: "uppercase",
            marginBottom: "1rem"
          }}
        >
          {overPagina.label}
        </p>
        <h1
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "3rem",
            fontWeight: 700,
            color: "#1a2744",
            lineHeight: 1.15,
            marginBottom: "1.5rem"
          }}
        >
          {overPagina.titel}
        </h1>
        <p
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "1.4rem",
            color: "#5f5e5a",
            fontStyle: "italic",
            lineHeight: 1.6
          }}
        >
          {overPagina.subtitel}
        </p>
      </motion.section>

      {overPagina.secties.map((sectie, i) => (
        <motion.section
          key={sectie.titel}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "2.5rem 2rem",
            borderTop: "1px solid #d3d1c7"
          }}
        >
          <h2
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#1a2744",
              marginBottom: "1.5rem"
            }}
          >
            {sectie.titel}
          </h2>

          {sectie.alineaas.map((alinea) => (
            <p
              key={alinea}
              style={{
                fontFamily: "DM Sans",
                fontSize: "1rem",
                color: "#5f5e5a",
                lineHeight: 1.8,
                marginBottom: "1rem"
              }}
            >
              {alinea}
            </p>
          ))}

          {sectie.stappen && (
            <div style={{ margin: "2rem 0" }}>
              {sectie.stappen.map((stap, index) => {
                const kleur = stappenMeta[index].kleur;

                return (
                  <div
                    key={stap.naam}
                    style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "flex-start" }}
                  >
                    <div
                      style={{
                        minWidth: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: kleur,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Cormorant Garamond",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "white"
                      }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontWeight: 700,
                          color: kleur,
                          fontSize: "0.95rem",
                          marginBottom: "0.25rem"
                        }}
                      >
                        {stap.naam} —{" "}
                        <span style={{ fontStyle: "italic", fontWeight: 400 }}>{stap.vraag}</span>
                      </p>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.9rem",
                          color: "#5f5e5a",
                          lineHeight: 1.6
                        }}
                      >
                        {stap.beschrijving}
                      </p>
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.8rem",
                          color: "#888780",
                          marginTop: "0.25rem"
                        }}
                      >
                        {stap.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {sectie.naStappen && (
            <p style={{ fontFamily: "DM Sans", fontSize: "1rem", color: "#5f5e5a", lineHeight: 1.8 }}>
              {sectie.naStappen}
            </p>
          )}
        </motion.section>
      ))}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "760px",
          margin: "0 auto 4rem",
          padding: "2.5rem 2rem",
          borderTop: "1px solid #d3d1c7"
        }}
      >
        <blockquote
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "1.35rem",
            fontStyle: "italic",
            color: "#534ab7",
            lineHeight: 1.7,
            borderLeft: "3px solid #534ab7",
            paddingLeft: "1.5rem",
            margin: 0
          }}
        >
          {t.footer.kernzin}
        </blockquote>
        <p style={{ fontFamily: "DM Sans", fontSize: "0.9rem", color: "#888780", marginTop: "2rem" }}>
          {t.footer.lectoraat} · {t.footer.contact}
        </p>
      </motion.section>
    </main>
  );
}
