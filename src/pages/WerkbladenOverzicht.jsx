import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { getBibliotheekDataLang, usesEnglishRoutes } from "../data/vertalingen.js";

const WerkbladenKiezerContent = lazy(() => import("./werkbladen/WerkbladenKiezerContent.jsx"));

const uiTekst = {
  nl: {
    terug: "← Terug naar bibliotheek",
    titel: "Alle werkbladen",
    subtitel:
      "Zoek uit morele werkbladen uit de hele wereld — filter op fase, tijd, groep, niveau, regio en status.",
    werkbladSectie: "Gepubliceerde werkbladen op deze site",
    laden: "Werkbladen laden…",
  },
  en: {
    terug: "← Back to library",
    titel: "All worksheets",
    subtitel:
      "Search moral worksheets from around the world — filter by phase, duration, group, level, region and status.",
    werkbladSectie: "Published worksheets on this site",
    laden: "Loading worksheets…",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" },
  }),
};

export default function WerkbladenOverzicht() {
  const { taal } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const ui = uiTekst[dataLang] ?? uiTekst.nl;
  const enRoutes = usesEnglishRoutes(taal);
  const terugRoute = enRoutes ? "/library" : "/bibliotheek";

  return (
    <main
      style={{
        backgroundColor: "var(--achtergrond, #fafaf8)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <section style={{ padding: "2rem 1.5rem 1rem", maxWidth: "1100px", margin: "0 auto" }}>
        <Link
          to={terugRoute}
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.85rem",
            color: "#534ab7",
            textDecoration: "none",
          }}
        >
          {ui.terug}
        </Link>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 600,
            margin: "1rem 0 0.5rem",
            color: "var(--tekst-primair)",
          }}
        >
          {ui.titel}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "1rem",
            color: "var(--tekst-secundair)",
            maxWidth: "720px",
          }}
        >
          {ui.subtitel}
        </motion.p>
      </section>

      <Suspense
        fallback={
          <p className="px-6 py-8 text-sm text-secundair" role="status">{ui.laden}</p>
        }
      >
        <WerkbladenKiezerContent ui={ui} />
      </Suspense>

      <style>{`
        @media (min-width: 640px) {
          .werkbladen-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .werkbladen-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </main>
  );
}
