import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { stappen as stappenMeta } from "../data/stappen";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

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

      {/* ── SCHEIDINGSLIJN ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ height: "1px", backgroundColor: "var(--rand, #d3d1c7)" }} />
      </div>

      {/* ── OVER DE MAKER ── */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "760px", margin: "0 auto" }}>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontSize: "0.75rem",
            fontFamily: "DM Sans, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#534ab7",
            marginBottom: "0.75rem",
          }}
        >
          {t.maker.label}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 600,
            color: "var(--tekst-primair, #1a2744)",
            marginBottom: "1.75rem",
          }}
        >
          {t.maker.titel}
        </motion.h2>

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <motion.img
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            src="/images/Richard Voddé.jpeg"
            alt={t.maker.titel}
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            {t.maker.alineas.map((alinea, i) => (
              <motion.p
                key={alinea}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 3}
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "var(--tekst-secundair, #5f5e5a)",
                  marginBottom: "1.25rem",
                }}
              >
                {alinea}
              </motion.p>
            ))}

            <motion.a
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={5}
              href={`mailto:${t.maker.contact}`}
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                padding: "0.625rem 1.5rem",
                border: "1px solid #534ab7",
                color: "#534ab7",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.9rem",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#534ab7";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#534ab7";
              }}
            >
              {t.maker.contactLabel} →
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── SCHEIDINGSLIJN ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ height: "1px", backgroundColor: "var(--rand, #d3d1c7)" }} />
      </div>

      {/* ── ONDERWIJSVISIE ── */}
      <section
        style={{
          padding: "5rem 1.5rem 6rem",
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontSize: "0.75rem",
            fontFamily: "DM Sans, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#534ab7",
            marginBottom: "0.75rem",
          }}
        >
          {t.visie.label}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 600,
            color: "var(--tekst-primair, #1a2744)",
            marginBottom: "1.75rem",
          }}
        >
          {t.visie.titel}
        </motion.h2>

        {t.visie.alineas.map((alinea, i) => (
          <motion.p
            key={alinea}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i + 2}
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--tekst-secundair, #5f5e5a)",
              marginBottom: "1.25rem",
            }}
          >
            {alinea}
          </motion.p>
        ))}

        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={5}
          style={{
            margin: "2.5rem 0 0",
            padding: "1.5rem 2rem",
            borderLeft: "3px solid #534ab7",
            backgroundColor: "#f0eeea",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              lineHeight: 1.65,
              color: "var(--tekst-primair, #1a2744)",
              margin: 0,
            }}
          >
            {t.visie.citaat}
          </p>
        </motion.blockquote>
      </section>
    </main>
  );
}
