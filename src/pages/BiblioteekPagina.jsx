import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTaal } from '../context/TaalContext'
import { bibliotheekData, niveauLabels } from '../data/bibliotheekData'

const uiTekst = {
  nl: {
    label: 'Materialen',
    titel: 'Bibliotheek',
    subtitel: 'Alle tools, werkbladen en gesprekskaarten — geordend per modelstap.',
    filterLabel: 'Filter op stap:',
    alleStappen: 'Alle stappen',
    downloadNL: 'Download NL',
    downloadEN: 'Download EN',
    binnenkort: 'Binnenkort beschikbaar',
    stapLabel: 'Stap',
  },
  en: {
    label: 'Materials',
    titel: 'Library',
    subtitel: 'All tools, worksheets and conversation cards — organised by model step.',
    filterLabel: 'Filter by step:',
    alleStappen: 'All steps',
    downloadNL: 'Download NL',
    downloadEN: 'Download EN',
    binnenkort: 'Coming soon',
    stapLabel: 'Step',
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export default function BiblioteekPagina() {
  const { taal } = useTaal()
  const ui = uiTekst[taal]
  const data = bibliotheekData[taal]
  const labels = niveauLabels[taal]

  const [actieveStap, setActieveStap] = useState(0)

  const gefilterdeStappen = actieveStap === 0
    ? data
    : data.filter(s => s.stap === actieveStap)

  return (
    <main style={{ backgroundColor: 'var(--achtergrond, #fafaf8)', color: 'var(--tekst-primair, #1a2744)', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ padding: '5rem 1.5rem 3rem', maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <motion.p variants={fadeUp} initial="hidden" animate="visible"
          style={{ fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#534ab7', marginBottom: '0.75rem' }}>
          {ui.label}
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, marginBottom: '1rem', color: 'var(--tekst-primair, #1a2744)' }}>
          {ui.titel}
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--tekst-secundair, #5f5e5a)' }}>
          {ui.subtitel}
        </motion.p>
      </section>

      {/* ── FILTER ── */}
      <section style={{ padding: '0 1.5rem 3rem', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--tekst-secundair)', marginBottom: '0.75rem' }}>
          {ui.filterLabel}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            onClick={() => setActieveStap(0)}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '99px',
              border: `1.5px solid ${actieveStap === 0 ? '#534ab7' : 'var(--rand, #d3d1c7)'}`,
              backgroundColor: actieveStap === 0 ? '#534ab7' : 'transparent',
              color: actieveStap === 0 ? '#ffffff' : 'var(--tekst-secundair)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {ui.alleStappen}
          </button>

          {data.map(stap => (
            <button
              key={stap.stap}
              onClick={() => setActieveStap(stap.stap)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '99px',
                border: `1.5px solid ${actieveStap === stap.stap ? stap.kleur : 'var(--rand, #d3d1c7)'}`,
                backgroundColor: actieveStap === stap.stap ? stap.kleur : 'transparent',
                color: actieveStap === stap.stap ? '#ffffff' : 'var(--tekst-secundair)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {ui.stapLabel} {stap.stap} — {stap.stapNaam}
            </button>
          ))}
        </div>
      </section>

      {/* ── STAPPEN MET MATERIALEN ── */}
      <section style={{ padding: '0 1.5rem 6rem', maxWidth: '900px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {gefilterdeStappen.map((stap, si) => (
            <motion.div
              key={stap.stap}
              variants={fadeUp} initial="hidden" animate="visible" exit="exit" custom={si}
              style={{ marginBottom: '4rem' }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: `2px solid ${stap.kleur}`,
              }}>
                <span style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: stap.kleur,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.1rem', fontWeight: 600, flexShrink: 0,
                }}>
                  {stap.stap}
                </span>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600, margin: 0, color: stap.kleur,
                }}>
                  {stap.stapNaam}
                </h2>
              </div>

              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
                lineHeight: 1.75, color: 'var(--tekst-secundair)', marginBottom: '2rem',
                fontStyle: 'italic',
              }}>
                {stap.intro}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {stap.materialen.map((mat, mi) => (
                  <motion.div
                    key={mat.id}
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={mi}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid var(--rand, #d3d1c7)',
                      borderTop: `3px solid ${mat.binnenkort ? 'var(--rand, #d3d1c7)' : stap.kleur}`,
                      padding: '1.25rem',
                      opacity: mat.binnenkort ? 0.65 : 1,
                      display: 'flex', flexDirection: 'column', gap: '0.75rem',
                    }}
                  >
                    <span style={{
                      fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif',
                      color: 'var(--tekst-secundair)',
                    }}>
                      {labels[mat.niveau]}
                    </span>

                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.1rem', fontWeight: 600, margin: 0,
                      color: mat.binnenkort ? 'var(--tekst-secundair)' : 'var(--tekst-primair)',
                    }}>
                      {mat.titel}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {mat.themas.map((thema, ti) => (
                        <span key={ti} style={{
                          fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif',
                          padding: '0.2rem 0.6rem', borderRadius: '99px',
                          backgroundColor: '#f0eeea', color: 'var(--tekst-secundair)',
                        }}>
                          {thema}
                        </span>
                      ))}
                    </div>

                    {mat.binnenkort ? (
                      <span style={{
                        fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif',
                        color: 'var(--tekst-secundair)', fontStyle: 'italic', marginTop: 'auto',
                      }}>
                        {ui.binnenkort}
                      </span>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                        {mat.bestand_nl && (
                          <a
                            href={`/downloads/${mat.map}/${mat.bestand_nl}`}
                            download
                            style={{
                              padding: '0.45rem 0.9rem',
                              backgroundColor: stap.kleur,
                              color: '#ffffff',
                              fontFamily: 'DM Sans, sans-serif',
                              fontSize: '0.8rem',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontWeight: 500,
                            }}
                          >
                            {ui.downloadNL}
                          </a>
                        )}
                        {mat.bestand_en && (
                          <a
                            href={`/downloads/${mat.map}/${mat.bestand_en}`}
                            download
                            style={{
                              padding: '0.45rem 0.9rem',
                              backgroundColor: 'transparent',
                              color: stap.kleur,
                              border: `1px solid ${stap.kleur}`,
                              fontFamily: 'DM Sans, sans-serif',
                              fontSize: '0.8rem',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontWeight: 500,
                            }}
                          >
                            {ui.downloadEN}
                          </a>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

    </main>
  )
}
