import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTaal } from "../../context/TaalContext";
import WerkbladKaart from "../../components/WerkbladKaart.jsx";
import WerkvormKiezerFilters from "../../components/WerkvormKiezerFilters.jsx";
import WerkvormKiezerKaart, { werkbladHashHref } from "../../components/WerkvormKiezerKaart.jsx";
import { loadKiezerBundle } from "../../data/loadWerkvormenKiezer.js";
import { getWerkbladen } from "../../data/werkbladen.js";
import { getBibliotheekDataLang } from "../../data/vertalingen.js";
import {
  collectKiezerFilterOptions,
  filterWerkvormKiezerItems,
  sortWerkvormKiezerItems,
} from "../../lib/werkvormenKiezer.js";
import { filtersFromSearchParams, filtersToSearchParams } from "../../lib/werkvormenKiezerUrl.js";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" },
  }),
};

export default function WerkbladenKiezerContent({ ui }) {
  const { taal } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [kiezerState, setKiezerState] = useState({
    loading: true,
    items: [],
    totalCount: 0,
    regioLijst: [],
  });

  useEffect(() => {
    let cancelled = false;
    setKiezerState((s) => ({ ...s, loading: true }));
    loadKiezerBundle(dataLang).then((bundle) => {
      if (!cancelled) {
        setKiezerState({
          loading: false,
          items: bundle.items,
          totalCount: bundle.totalCount,
          regioLijst: bundle.regioLijst,
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [dataLang]);

  const { items: allKiezerItems, totalCount, regioLijst, loading } = kiezerState;

  const regioSlugs = useMemo(
    () => regioLijst.map((r) => r.slug),
    [regioLijst],
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

  if (loading) {
    return (
      <p className="px-6 py-8 text-sm text-secundair" role="status">
        {dataLang === "en" ? "Loading worksheets…" : "Werkbladen laden…"}
      </p>
    );
  }

  return (
    <>
      <section style={{ padding: "1rem 1.5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <WerkvormKiezerFilters
          filters={filters}
          onChange={setFilters}
          options={options}
          resultCount={filtered.length}
          totalCount={totalCount}
          regioLijst={regioLijst}
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
    </>
  );
}
