import { motion } from "framer-motion";
import JuristenzelftestTegel from "./JuristenzelftestTegel";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ZelftestsSectie({ sectieTitel = "Zelftests" }) {
  return (
    <section style={{ padding: "0 1.5rem 4rem", maxWidth: "1000px", margin: "0 auto" }}>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          fontWeight: 600,
          color: "var(--tekst-primair, #1a2744)",
          marginBottom: "1.75rem",
          textAlign: "center",
        }}
      >
        {sectieTitel}
      </motion.h2>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <JuristenzelftestTegel />
      </motion.div>
    </section>
  );
}
