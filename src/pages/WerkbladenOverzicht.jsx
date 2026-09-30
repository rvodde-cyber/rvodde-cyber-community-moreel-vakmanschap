import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import WerkbladKaart from "../components/WerkbladKaart.jsx";
import WerkbladFilters, {
  EMPTY_WERKBLAD_FILTERS,
  filterWerkbladen,
  collectFilterOptions,
} from "../components/WerkbladFilters.jsx";
import { getWerkbladen } from "../data/werkbladen.js";
import { getBibliotheekDataLang, usesEnglishRoutes } from "../data/vertalingen.js";

const uiTekst = {
  nl: {
    terug: "← Terug naar bibliotheek",
    titel: "Alle werkbladen",
    subtitel: "Student- en docentenversies, per modelstap en thema doorzoekbaar.",
  },
  en: {
    terug: "← Back to library",
    titel: "All worksheets",
    subtitel: "Student and teacher versions, searchable by model step and theme.",
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

  const allItems = useMemo(() => getWerkbladen(dataLang), [dataLang]);
  const options = useMemo(() => collectFilterOptions(allItems), [allItems]);
  const [filters, setFilters] = useState(EMPTY_WERKBLAD_FILTERS);

  const filtered = useMemo(() => filterWerkbladen(allItems, filters), [allItems, filters]);

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
            maxWidth: "640px",
          }}
        >
          {ui.subtitel}
        </motion.p>
      </section>

      <section style={{ padding: "1rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <WerkbladFilters
          filters={filters}
          onChange={setFilters}
          options={options}
          resultCount={filtered.length}
          totalCount={allItems.length}
          showFaseFilter
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
          className="werkbladen-grid"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <WerkbladKaart item={item} />
            </motion.div>
          ))}
        </div>
      </section>

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
