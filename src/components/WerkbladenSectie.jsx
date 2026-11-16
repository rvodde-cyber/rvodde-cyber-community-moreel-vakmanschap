import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { getBibliotheekDataLang, usesEnglishRoutes } from "../data/vertalingen";
import { landingWerkbladenUi } from "../data/landingWerkbladenUi";
import { loadKiezerBundle } from "../data/loadWerkvormenKiezer";
import { FASE_KLEUREN, getFaseNaam, sfeerbeeldPad, hoofdfaseKleur } from "../data/werkbladen";
import { FASE_SLUGS } from "../lib/werkvormenKiezer";
import {
  telStatussen,
  telPerFase,
  kiesUitgelicht,
  kiezerLinkVoorFase,
} from "../lib/landingWerkbladen";
import { UITGELICHTE_WERKBLADEN } from "../config/landingWerkbladen";
import { werkbladHashHref } from "./WerkvormKiezerKaart";

const COMPLEX_RANK = { micro: 0, meso: 1, macro: 2 };
const COMPLEX_COLOR = "#993556";

const linkFocus = {
  outline: "none",
};
const linkFocusVisible =
  "2px solid #534ab7";

function handleImageError(event, kleur) {
  event.currentTarget.style.display = "none";
  event.currentTarget.parentElement.style.backgroundColor = kleur;
}

function dominantComplexiteit(levels) {
  if (!levels?.length) return null;
  return [...levels].sort((a, b) => (COMPLEX_RANK[b] ?? 0) - (COMPLEX_RANK[a] ?? 0))[0];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function WerkbladenSectie() {
  const { taal } = useTaal();
  const dataLang = getBibliotheekDataLang(taal);
  const ui = landingWerkbladenUi[dataLang] ?? landingWerkbladenUi.nl;
  const reduceMotion = useReducedMotion();
  const alleWerkbladenRoute = usesEnglishRoutes(taal)
    ? "/library/worksheets"
    : "/bibliotheek/werkbladen";

  const [state, setState] = useState({ loading: true, items: [], failed: false });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, items: [], failed: false });
    loadKiezerBundle(dataLang)
      .then((bundle) => {
        if (!cancelled) {
          setState({ loading: false, items: bundle.items, failed: false });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, items: [], failed: true });
      });
    return () => {
      cancelled = true;
    };
  }, [dataLang]);

  const statussen = useMemo(
    () => (state.items.length ? telStatussen(state.items) : null),
    [state.items],
  );
  const perFase = useMemo(
    () => (state.items.length ? telPerFase(state.items) : null),
    [state.items],
  );
  const uitgelicht = useMemo(() => {
    if (!state.items.length || state.failed) return [];
    return kiesUitgelicht(state.items, { aantal: 5, vast: UITGELICHTE_WERKBLADEN });
  }, [state.items, state.failed]);

  const MotionWrap = reduceMotion ? "div" : motion.div;

  if (state.loading) {
    return (
      <section
        aria-labelledby="werkbladen-kop"
        style={{
          padding: "4rem 1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
          minHeight: 480,
        }}
      >
        <h2 id="werkbladen-kop" className="sr-only">
          {ui.kop}
        </h2>
        <p
          role="status"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.95rem",
            color: "var(--tekst-secundair, #5f5e5a)",
          }}
        >
          {ui.laden}
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="werkbladen-kop"
      style={{ padding: "4rem 1.5rem 3.5rem", maxWidth: "1100px", margin: "0 auto" }}
    >
      <p
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
      </p>
      <h2
        id="werkbladen-kop"
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 600,
          marginBottom: "1rem",
          color: "var(--tekst-primair, #1a2744)",
        }}
      >
        {ui.kop}
      </h2>
      <p
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "var(--tekst-secundair, #5f5e5a)",
          maxWidth: "720px",
          marginBottom: "1.25rem",
        }}
      >
        {ui.intro}
      </p>

      {statussen && (
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.9rem",
            color: "var(--tekst-primair, #1a2744)",
            marginBottom: "2.5rem",
          }}
        >
          {ui.stand({
            b: statussen.beschikbaar,
            v: statussen.in_voorbereiding,
            e: statussen.externe_methode,
          })}
        </p>
      )}

      <h3
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "1.35rem",
          fontWeight: 600,
          marginBottom: "1rem",
          color: "var(--tekst-primair, #1a2744)",
        }}
      >
        {ui.faseKop}
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.65rem",
          marginBottom: uitgelicht.length ? "2.75rem" : "2rem",
        }}
      >
        {FASE_SLUGS.map((slug) => {
          const kleur = FASE_KLEUREN[slug];
          const aantal = perFase?.[slug] ?? 0;
          const faseNaam = getFaseNaam(slug, dataLang);
          const telLabel =
            state.failed || perFase == null
              ? faseNaam
              : aantal > 0
                ? `${faseNaam} · ${aantal}`
                : `${faseNaam} · ${ui.geenInFase}`;
          return (
            <Link
              key={slug}
              to={kiezerLinkVoorFase(slug, taal, state.failed ? 0 : aantal)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1rem",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                color: "var(--tekst-primair, #1a2744)",
                backgroundColor: "var(--surface, #fdfcfa)",
                border: "1px solid var(--rand, #d8d3c9)",
                borderRadius: "999px",
                borderLeft: `4px solid ${kleur}`,
                ...linkFocus,
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = linkFocusVisible;
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  borderRadius: "50%",
                  backgroundColor: kleur,
                  flexShrink: 0,
                }}
              />
              {telLabel}
            </Link>
          );
        })}
      </div>

      {uitgelicht.length > 0 && (
        <>
          <h3
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.35rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              color: "var(--tekst-primair, #1a2744)",
            }}
          >
            {ui.tegelsKop}
          </h3>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem",
              color: "var(--tekst-secundair, #5f5e5a)",
              marginBottom: "1.25rem",
            }}
          >
            {ui.tegelsNoot}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "1.25rem",
              marginBottom: "2rem",
            }}
          >
            {uitgelicht.map((item, index) => {
              const fase = item.hoofdfase;
              const faseKleur = FASE_KLEUREN[fase] ?? hoofdfaseKleur(item);
              const wb = item.linkedWerkbladen?.[0];
              const imgSrc = wb ? sfeerbeeldPad(wb) : null;
              const context = item.contexten?.[0] ?? "";
              const complex = dominantComplexiteit(item.complexiteiten);
              const complexLabel = complex ? ui.complexiteit[complex] : null;

              return (
                <MotionWrap
                  key={item.id}
                  {...(reduceMotion
                    ? {}
                    : {
                        variants: fadeUp,
                        initial: "hidden",
                        whileInView: "visible",
                        viewport: { once: true },
                        custom: index,
                      })}
                >
                  <Link
                    to={werkbladHashHref(item.primaryWerkbladId, taal)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      textDecoration: "none",
                      color: "inherit",
                      backgroundColor: "var(--surface, #fdfcfa)",
                      border: "1px solid var(--rand, #d8d3c9)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      borderTop: `3px solid ${faseKleur}`,
                      ...linkFocus,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = linkFocusVisible;
                      e.currentTarget.style.outlineOffset = "2px";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = "none";
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "16 / 9",
                        width: "100%",
                        backgroundColor: faseKleur,
                        overflow: "hidden",
                      }}
                    >
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt=""
                          width={1600}
                          height={900}
                          loading="lazy"
                          decoding="async"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => handleImageError(e, faseKleur)}
                        />
                      )}
                    </div>
                    <div style={{ padding: "1.1rem 1.15rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.45rem",
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "0.8rem",
                          color: "var(--tekst-secundair, #5f5e5a)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            width: "0.5rem",
                            height: "0.5rem",
                            borderRadius: "50%",
                            backgroundColor: faseKleur,
                          }}
                        />
                        {getFaseNaam(fase, dataLang)}
                      </div>
                      <h4
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "1.15rem",
                          fontWeight: 600,
                          margin: 0,
                          color: "var(--tekst-primair, #1a2744)",
                          lineHeight: 1.25,
                        }}
                      >
                        {item.titelDisplay}
                      </h4>
                      {context && (
                        <p
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "0.85rem",
                            margin: 0,
                            color: "var(--tekst-secundair, #5f5e5a)",
                          }}
                        >
                          {context}
                        </p>
                      )}
                      {item.regioNaam && (
                        <p
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "0.8rem",
                            margin: 0,
                            color: "var(--tekst-secundair, #5f5e5a)",
                          }}
                        >
                          {item.regioNaam}
                        </p>
                      )}
                      {complexLabel && (
                        <span
                          style={{
                            alignSelf: "flex-start",
                            marginTop: "auto",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "999px",
                            border: `1px solid ${COMPLEX_COLOR}`,
                            color: COMPLEX_COLOR,
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        >
                          {complexLabel}
                        </span>
                      )}
                    </div>
                  </Link>
                </MotionWrap>
              );
            })}
          </div>
        </>
      )}

      <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
        <Link
          to={alleWerkbladenRoute}
          style={{
            display: "inline-block",
            padding: "0.875rem 2rem",
            backgroundColor: "#534ab7",
            color: "#ffffff",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "8px",
            textDecoration: "none",
            ...linkFocus,
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid #1a2744";
            e.currentTarget.style.outlineOffset = "2px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = "none";
          }}
        >
          {ui.hoofdKnop}
        </Link>
      </div>
    </section>
  );
}