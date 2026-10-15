import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import WerkbladKaart from "../components/WerkbladKaart.jsx";
import WerkvormKiezerFilters from "../components/WerkvormKiezerFilters.jsx";
import WerkvormKiezerKaart, { werkbladHashHref } from "../components/WerkvormKiezerKaart.jsx";
import { getWerkbladen } from "../data/werkbladen.js";
import { getBibliotheekDataLang, usesEnglishRoutes } from "../data/vertalingen.js";
import { getKiezerItems, getWerkvormenCount } from "../data/werkvormen.js";
import {
  collectKiezerFilterOptions,
  filterWerkvormKiezerItems,
  sortWerkvormKiezerItems,
} from "../lib/werkvormenKiezer.js";
import { filtersFromSearchParams, filtersToSearchParams } from "../lib/werkvormenKiezerUrl.js";

const uiTekst = {
  nl: {
    terug: "← Terug naar bibliotheek",
    titel: "Alle werkbladen",
    subtitel:
      "Zoek uit 128 morele werkbladen uit de hele wereld — filter op fase, tijd, groep, niveau, regio en status.",
    werkbladSectie: "Gepubliceerde werkbladen op deze site",
  },
  en: {
    terug: "← Back to library",
    titel: "All worksheets",
    subtitel:
      "Search 128 moral worksheets from around the world — filter by phase, duration, group, level, region and status.",
    werkbladSectie: "Published worksheets on this site",
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const allKiezerItems = useMemo(() => getKiezerItems(dataLang), [dataLang]);
  const totalCount = getWerkvormenCount() || allKiezerItems.length;
  const regioSlugs = useMemo(
    () => [...new Set(allKiezerItems.map((i) => i.regio).filter(Boolean))],
    [allKiezerItems],
  );
  const options = useMemo(() => collectKiezerFilterOptions(allKiezerItems), [allKiezerItems]);

  const filters = useMemo(
    () => filtersFromSearchParams(searchParams, regioSlugs),
    [searchParams, regioSlugs],
  );

  const setFilters = useCallback(
    (next) => {
      const params = filtersToSearchParams(next, regioSlugs);
      setSearchParams(params, { replace: true });
    },
    [regioSlugs, setSearchParams],
  );

  const filtered = useMemo(() => {
    const list = filterWerkvormKiezerItems(allKiezerItems, filters);
    return sortWerkvormKiezerItems(list, filters.sort);
  }, [allKiezerItems, filters]);

  const [expandedId, setExpandedId] = useState(null);

  const werkbladenPublished = useMemo(() => getWerkbladen(dataLang), [dataLang]);

  const openWerkblad = useCallback(
    (werkbladId) => {
      navigate(werkbladHashHref(werkbladId, taal));
      requestAnimationFrame(() => {
        const el = document.getElementById(werkbladId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        el?.focus?.({ preventScroll: true });
      });
    },
    [navigate, taal],
  );

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [werkbladenPublished.length]);

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

      <section style={{ padding: "1rem 1.5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <WerkvormKiezerFilters
          filters={filters}
          onChange={setFilters}
          options={options}
          resultCount={filtered.length}
          totalCount={totalCount}
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
              <WerkvormKiezerKaart
                item={item}
                expanded={expandedId === item.id}
                onToggleExpand={(id) => setExpandedId((cur) => (cur === id ? null : id))}
                onOpenWerkblad={openWerkblad}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section
        style={{ padding: "2rem 1.5rem 4rem", maxWidth: "1100px", margin: "0 auto" }}
        aria-labelledby="werkbladen-gepubliceerd"
      >
        <h2
          id="werkbladen-gepubliceerd"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.5rem",
            marginBottom: "1.25rem",
            color: "var(--tekst-primair)",
          }}
        >
          {ui.werkbladSectie}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
          className="werkbladen-grid"
        >
          {werkbladenPublished.map((item, i) => (
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
