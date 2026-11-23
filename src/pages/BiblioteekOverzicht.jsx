import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTaal } from "../context/TaalContext";
import ThemaFilter from "../components/ThemaFilter";
import { bibliotheekData } from "../data/bibliotheekData";
import { loadKiezerBundle } from "../data/loadWerkvormenKiezer";
import { getWerkbladenCount } from "../data/werkbladen";
import { getBibliotheekDataLang, getLocalizedPageContent, usesEnglishRoutes } from "../data/vertalingen";
import {
  bibliotheekZoekActief,
  buildKiezerUrl,
  countKiezerForBibliotheekZoek,
  filterBibliotheekMaterialen,
  flattenBibliotheekMaterialen,
  parseThemasParam,
} from "../lib/bibliotheekZoek";
import { themaLabel, THEMA_IDS } from "../lib/themas";

const uiTekst = {
  nl: {
    label: "Materialen",
    titel: "Bibliotheek",
    subtitel:
      "Alle tools, werkbladen en gesprekskaarten — geordend per modelstap. Kies een stap om te beginnen.",
    bekijk: "Bekijk materialen →",
    stapLabel: "Stap",
    categorieLabel: "Categorie",
    disclaimerTitel: "Gebruik & bronvermelding",
    alleWerkbladen: "Alle werkbladen",
    materialenEn: "materiaal",
    materialenMeervoud: "materialen",
    zoekSectie: "Zoek in de bibliotheek",
    zoekLabel: "Zoekterm",
    zoekPlaceholder: "Zoek op titel, thema of herkomst…",
    resultaten: "{n} resultaten",
    stappenbib: "Stappenbibliotheek",
    kiezerKnop: "Bekijk {n} werkbladen in de Werkbladenkiezer",
    kiezerGeen: "Geen werkbladen in de Werkbladenkiezer gevonden.",
    kiezerLaden: "Aantal wordt berekend…",
    geenResultaten:
      "Geen resultaten. Probeer een ander woord of laat een thema los.",
    stapLabelResult: "Stap",
  },
  en: {
    label: "Materials",
    titel: "Library",
    subtitel:
      "All tools, worksheets and conversation cards — organised by model step. Choose a step to get started.",
    bekijk: "View materials →",
    stapLabel: "Step",
    categorieLabel: "Category",
    disclaimerTitel: "Use & attribution",
    alleWerkbladen: "All worksheets",
    materialenEn: "material",
    materialenMeervoud: "materials",
    zoekSectie: "Search the library",
    zoekLabel: "Search term",
    zoekPlaceholder: "Search by title, theme or origin…",
    resultaten: "{n} results",
    stappenbib: "Step library",
    kiezerKnop: "View {n} worksheets in the Worksheet Chooser",
    kiezerGeen: "No worksheets found in the Worksheet Chooser.",
    kiezerLaden: "Calculating count…",
    geenResultaten: "No results. Try another word or remove a theme.",
    stapLabelResult: "Step",
  },
};
const stapSlug = {
  1: "zien",
  2: "voelen",
  3: "wegen",
  4: "handelen",
  5: "volhouden",
};

function getStapRouteSlug(stapItem, dataLang) {
  if (stapItem.stapSlug) {
    return dataLang === "nl" ? stapItem.stapSlug.nl : stapItem.stapSlug.en;
  }
  return stapSlug[stapItem.stap];
}

function getStapImageSlug(stapItem) {
  if (stapItem.stapSlug) return stapItem.stapSlug.nl;
  return stapSlug[stapItem.stap];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

function handleImageError(event, kleur) {
  event.currentTarget.style.display = "none";
  event.currentTarget.parentElement.style.backgroundColor = kleur;
}

const disclaimerParaStyle = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.9rem",
  lineHeight: 1.75,
  color: "var(--tekst-secundair, #5f5e5a)",
  margin: "0 0 1rem",
};

function BibliotheekDisclaimer({ dataLang }) {
  if (dataLang === "en") {
    return (
      <>
        <p style={disclaimerParaStyle}>
          The worksheets on this platform were compiled by Richard Voddé (Research Group Ethical Practice, Fontys
          University of Applied Sciences) as part of the Comenius Senior Fellowship. Some are original work; others are
          adaptations of, or inspired by, existing methods and theories. The original source is always stated with the
          worksheet and in the document itself.
        </p>
        <p style={disclaimerParaStyle}>
          Each worksheet states the Creative Commons licence under which you may use it (CC BY-SA 4.0 or CC BY-NC-SA
          4.0). Use is always free, with attribution and under the same licence.
        </p>
        <p style={{ ...disclaimerParaStyle, marginBottom: 0 }}>
          Rights to the original methods, models and texts remain with their respective authors. When reusing, please
          credit both this platform and the original source.
        </p>
      </>
    );
  }
  return (
    <>
      <p style={disclaimerParaStyle}>
        De werkbladen op dit platform zijn samengesteld door Richard Voddé (Lectoraat Ethisch Werken, Fontys
        Hogescholen) binnen het Comenius Senior Fellowship. Een deel is eigen ontwikkeling; andere zijn bewerkingen
        van, of geïnspireerd op, bestaande werkvormen en theorieën. De oorspronkelijke bron staat steeds vermeld bij
        het werkblad en in het document zelf.
      </p>
      <p style={disclaimerParaStyle}>
        Bij elk werkblad staat onder welke Creative Commons-licentie je het mag gebruiken (CC BY-SA 4.0 of CC
        BY-NC-SA 4.0). Het gebruik is altijd gratis, met naamsvermelding en onder dezelfde licentie.
      </p>
      <p style={{ ...disclaimerParaStyle, marginBottom: 0 }}>
        De rechten op de oorspronkelijke werkvormen, modellen en teksten blijven bij de betreffende auteurs. Vermeld bij
        hergebruik dus zowel dit platform als de oorspronkelijke bron.
      </p>
    </>
  );
}

function geenResultatenInBeide(materialen, kiezer) {
  if (kiezer.loading) return false;
  return materialen.length === 0 && (kiezer.count ?? 0) === 0;
}

function countThemasMaterialen(materialen, filters) {
  const base = { ...filters, themas: [] };
  const counts = Object.fromEntries(THEMA_IDS.map((id) => [id, 0]));
  for (const id of THEMA_IDS) {
    counts[id] = filterBibliotheekMaterialen(materialen, { ...base, themas: [id] }).length;
  }
  return counts;
}

export default function BiblioteekOverzicht() {
  const { taal } = useTaal();
  const ui = getLocalizedPageContent(uiTekst, taal, "bibliotheek");
  const dataLang = getBibliotheekDataLang(taal);
  const data = bibliotheekData[dataLang];
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const werkbladenCount = getWerkbladenCount();
  const werkbladenHref = usesEnglishRoutes(taal) ? "/library/worksheets" : "/bibliotheek/werkbladen";
  const enRoutes = usesEnglishRoutes(taal);

  const filters = useMemo(
    () => ({
      zoek: searchParams.get("zoek") ?? "",
      themas: parseThemasParam(searchParams.get("themas")).filter((id) => THEMA_IDS.includes(id)),
    }),
    [searchParams],
  );

  const [zoekDraft, setZoekDraft] = useState(filters.zoek);
  useEffect(() => {
    setZoekDraft(filters.zoek);
  }, [filters.zoek]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (zoekDraft === filters.zoek) return;
      const next = new URLSearchParams(searchParams);
      if (zoekDraft.trim()) next.set("zoek", zoekDraft.trim());
      else next.delete("zoek");
      setSearchParams(next, { replace: true });
    }, 200);
    return () => clearTimeout(handle);
  }, [zoekDraft, filters.zoek, searchParams, setSearchParams]);

  const alleMaterialen = useMemo(() => flattenBibliotheekMaterialen(data, dataLang), [data, dataLang]);
  const themaCounts = useMemo(
    () => countThemasMaterialen(alleMaterialen, filters),
    [alleMaterialen, filters],
  );

  const zoekActief = bibliotheekZoekActief(filters);
  const gevondenMaterialen = useMemo(
    () => (zoekActief ? filterBibliotheekMaterialen(alleMaterialen, filters) : []),
    [alleMaterialen, filters, zoekActief],
  );

  const [kiezerTelling, setKiezerTelling] = useState({ loading: false, count: null });
  useEffect(() => {
    if (!zoekActief) {
      setKiezerTelling({ loading: false, count: null });
      return;
    }
    let cancelled = false;
    setKiezerTelling({ loading: true, count: null });
    loadKiezerBundle(dataLang).then((bundle) => {
      if (cancelled) return;
      const n = countKiezerForBibliotheekZoek(bundle.items, filters);
      setKiezerTelling({ loading: false, count: n });
    });
    return () => {
      cancelled = true;
    };
  }, [zoekActief, filters, dataLang]);

  const setThemaFilters = useCallback(
    (themas) => {
      const next = new URLSearchParams(searchParams);
      if (themas.length) next.set("themas", themas.join(","));
      else next.delete("themas");
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const kiezerLink = buildKiezerUrl(werkbladenHref, filters);

  const handleStapKlik = (stapItem) => {
    const slug = getStapRouteSlug(stapItem, dataLang);
    const route = usesEnglishRoutes(taal) ? `/library/${slug}` : `/bibliotheek/${slug}`;
    navigate(route);
  };

  return (
    <main
      style={{
        backgroundColor: "var(--achtergrond, #fafaf8)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <section
        style={{ padding: "3rem 1.5rem 4rem", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "0.75rem",
            fontFamily: "DM Sans, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#534ab7",
            marginBottom: "0.75rem",
          }}
        >
          {ui.label}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 600,
            marginBottom: "1.25rem",
            color: "var(--tekst-primair, #1a2744)",
          }}
        >
          {ui.titel}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            color: "var(--tekst-secundair, #5f5e5a)",
          }}
        >
          {ui.subtitel}
        </motion.p>
        {werkbladenCount > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            style={{ marginTop: "1.75rem" }}
          >
            <Link
              to={werkbladenHref}
              style={{
                display: "inline-block",
                padding: "0.65rem 1.25rem",
                borderRadius: "8px",
                backgroundColor: "#534ab7",
                color: "#ffffff",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              {ui.alleWerkbladen} ({werkbladenCount})
            </Link>
          </motion.div>
        )}
      </section>

      <section style={{ padding: "0 1.5rem 2rem", maxWidth: "760px", margin: "0 auto" }}>
        <div
          className="rounded-xl border border-rand bg-white p-4 shadow-warm md:p-5"
          style={{ borderColor: "var(--rand, #d3d1c7)" }}
        >
          <h2
            className="mb-4 text-lg font-semibold text-primair"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.35rem" }}
          >
            {ui.zoekSectie}
          </h2>
          <label className="mb-3 flex flex-col gap-1.5 text-sm">
            <span className="font-semibold text-primair">{ui.zoekLabel}</span>
            <input
              type="search"
              value={zoekDraft}
              onChange={(e) => setZoekDraft(e.target.value)}
              placeholder={ui.zoekPlaceholder}
              className="min-w-0 rounded-lg border border-rand bg-[#fafaf8] px-3 py-2 text-primair focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#534ab7]"
            />
          </label>
          <ThemaFilter
            selected={filters.themas}
            onChange={setThemaFilters}
            counts={themaCounts}
            dataLang={dataLang}
          />
        </div>
      </section>

      {zoekActief && (
        <section
          aria-live="polite"
          style={{ padding: "0 1.5rem 2rem", maxWidth: "900px", margin: "0 auto" }}
        >
          <p
            className="mb-4 text-sm text-secundair"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {ui.resultaten.replace("{n}", String(gevondenMaterialen.length + (kiezerTelling.count ?? 0)))}
          </p>

          {geenResultatenInBeide(gevondenMaterialen, kiezerTelling) ? (
            <p className="text-sm text-secundair" style={{ fontFamily: "DM Sans, sans-serif" }}>
              {ui.geenResultaten}
            </p>
          ) : (
            <>
              {gevondenMaterialen.length > 0 && (
                <div className="mb-6">
                  <h3
                    className="mb-3 text-base font-semibold text-primair"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {ui.stappenbib}
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {gevondenMaterialen.map((mat) => {
                      const stapHref = enRoutes
                        ? `/library/${mat.stapSlug}`
                        : `/bibliotheek/${mat.stapSlug}`;
                      return (
                        <Link
                          key={mat.id}
                          to={stapHref}
                          style={{
                            textDecoration: "none",
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            border: "1px solid var(--rand, #d3d1c7)",
                            borderTop: `3px solid ${mat.stapKleur}`,
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.65rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: mat.stapKleur,
                              fontFamily: "DM Sans, sans-serif",
                            }}
                          >
                            {typeof mat.stap === "number"
                              ? `${ui.stapLabelResult} ${mat.stap}`
                              : mat.stapNaam}
                          </span>
                          <span
                            style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontSize: "1.05rem",
                              fontWeight: 600,
                              color: "var(--tekst-primair)",
                            }}
                          >
                            {mat.titel}
                          </span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                            {(mat.thema_ids ?? []).slice(0, 3).map((id) => (
                              <span
                                key={id}
                                style={{
                                  fontSize: "0.65rem",
                                  padding: "0.15rem 0.5rem",
                                  borderRadius: "99px",
                                  backgroundColor: "#eeecf9",
                                  color: "#534ab7",
                                  fontFamily: "DM Sans, sans-serif",
                                }}
                              >
                                {themaLabel(id, dataLang)}
                              </span>
                            ))}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                {kiezerTelling.loading ? (
                  <p className="text-sm text-secundair" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {ui.kiezerLaden}
                  </p>
                ) : kiezerTelling.count === 0 ? (
                  <p className="text-sm text-secundair" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {ui.kiezerGeen}
                  </p>
                ) : kiezerTelling.count > 0 ? (
                  <Link
                    to={kiezerLink}
                    style={{
                      display: "inline-block",
                      padding: "0.65rem 1.25rem",
                      borderRadius: "8px",
                      backgroundColor: "#534ab7",
                      color: "#ffffff",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    {ui.kiezerKnop.replace("{n}", String(kiezerTelling.count))}
                  </Link>
                ) : null}
              </div>
            </>
          )}
        </section>
      )}

      <section style={{ padding: "0 1.5rem 6rem", maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1.75rem",
          }}
        >
          {data.map((stap, i) => (
            <motion.div
              key={stap.stap}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              onClick={() => handleStapKlik(stap)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleStapKlik(stap);
                }
              }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--rand, #d3d1c7)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            >
              <div style={{ position: "relative", height: "200px", overflow: "hidden", backgroundColor: stap.kleur }}>
                <img
                  src={`/images/bibliotheek/stap-${getStapImageSlug(stap)}.jpg`}
                  alt={stap.stapNaam}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(event) => handleImageError(event, stap.kleur)}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to bottom, ${stap.kleur}33, ${stap.kleur}99)`,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem" }}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "DM Sans, sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.8)",
                      display: "block",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {typeof stap.stap === "number" ? `${ui.stapLabel} ${stap.stap}` : ui.categorieLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {stap.stapNaam}
                  </span>
                </div>
              </div>

              <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "var(--tekst-secundair, #5f5e5a)",
                    marginBottom: "1.25rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {stap.intro}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontFamily: "DM Sans, sans-serif",
                      color: "var(--tekst-secundair)",
                    }}
                  >
                    {dataLang === "nl"
                      ? stap.materialen.length === 1
                        ? "1 materiaal"
                        : `${stap.materialen.length} materialen`
                      : stap.materialen.length === 1
                        ? `1 ${ui.materialenEn ?? "material"}`
                        : `${stap.materialen.length} ${ui.materialenMeervoud ?? "materials"}`}
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontFamily: "DM Sans, sans-serif",
                      color: stap.kleur,
                      fontWeight: 500,
                    }}
                  >
                    {ui.bekijk}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        style={{
          backgroundColor: "#f0eeea",
          borderTop: "1px solid var(--rand, #d3d1c7)",
          padding: "3rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1rem" }}>
            <Shield
              size={22}
              strokeWidth={1.8}
              style={{ flexShrink: 0, color: "#534ab7", marginTop: "0.15rem" }}
              aria-hidden="true"
            />
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                margin: 0,
                color: "var(--tekst-primair, #1a2744)",
              }}
            >
              {ui.disclaimerTitel}
            </h2>
          </div>
          <div>
            <BibliotheekDisclaimer dataLang={dataLang} />
          </div>
        </div>
      </section>
    </main>  );
}
