import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ConversationCardSection from '../components/ConversationCardSection'
import GesprekskaartenFilters, { EMPTY_FILTERS } from '../components/GesprekskaartenFilters'
import { stappen as basisStappen } from '../data/stappen'
import {
  TEASER_DOWNLOADS,
  filterCards,
  getAllCards,
  getFilterOptions,
  localizeCards,
} from '../data/gesprekskaarten'
import { useTaal } from '../context/TaalContext'

// ── CONTENT DATA ────────────────────────────────────────────────

const pageContent = {
  nl: {
    hero: {
      label: 'De methode',
      titel: 'Gesprekskaarten',
      subtitel: 'Geen goed antwoord. Wel een echt gesprek.',
      intro: 'Een gesprekskaart beschrijft een herkenbare situatie uit de beroepspraktijk — met namen, een setting, spanning — die uitmondt in een moreel dilemma zonder eenvoudig antwoord. De kaart nodigt uit, stuurt niet.',
    },
    waarom: {
      titel: 'Waarom werken ze?',
      pijlers: [
        {
          titel: 'Geen goed antwoord',
          tekst: 'Studenten en professionals zijn gewend te zoeken naar wat verwacht wordt. De gesprekskaart ontneemt die vluchtroute. Je moet een keuze verdedigen, luisteren naar anderen die anders kiezen, en je eigen redenering aanscherpen.',
        },
        {
          titel: 'Praktijkgericht materiaal',
          tekst: 'De situaties komen uit de praktijk — aangeleverd door alumni en professionals. Dat maakt het verschil tussen een oefening en een echte voorbereiding op het werkzame leven.',
        },
        {
          titel: 'Gesprek als methode',
          tekst: 'Morele oordeelsvorming ontstaat in dialoog. De kaart dwingt dat gesprek af — op een laagdrempelige, niet-bedreigende manier.',
        },
      ],
    },
    hoe: {
      titel: 'Hoe worden ze gebruikt?',
      intro: 'De basisvorm is eenvoudig: lees de kaart, bekijk het beeld, en ga in gesprek aan de hand van de twee vragen. Geen model dat gevolgd moet worden.',
      vormen: [
        'Opener van een les of bijeenkomst',
        'Discussievorm in kleine groepen',
        'Reflectie-instrument na een stage-ervaring',
        'Basis voor een gestructureerd moreel beraad',
      ],
      niveaus: 'De kaarten zijn geordend in complexiteitsniveaus — van toegankelijke alledaagse dilemma\'s tot systemische situaties waarbij hiërarchie, wetgeving en ethiek tegelijk in het geding zijn.',
    },
    preview: {
      titel: 'Beschikbare kaarten',
      subtitel: 'Elke kaart sluit af met dezelfde twee vragen:',
      vraag1: 'Wat zou jij doen en waarom?',
      vraag2: 'Welke waarden zijn hier in het spel?',
    },
    introToggle: 'Over de methode — waarom en hoe?',
    cta: {
      titel: 'Wat is er beschikbaar?',
      tekst: 'Binnen de Community Moreel Vakmanschap zijn sets beschikbaar voor verschillende domeinen en contexten. Leden kunnen materiaal downloaden, gebruiken, en — als het werkt — terugdelen met de community. De ambitie: 250+ kaarten, ontwikkeld samen met studenten, alumni en professionals uit het veld.',
      knop: 'Doe mee aan de community',
    },
  },

  en: {
    hero: {
      label: 'The method',
      titel: 'Conversation Cards',
      subtitel: 'No right answer. Just a real conversation.',
      intro: 'A conversation card describes a recognisable situation from professional practice — with names, a setting, and tension — that leads to a moral dilemma with no easy answer. The card invites reflection; it does not steer.',
    },
    waarom: {
      titel: 'Why do they work?',
      pijlers: [
        {
          titel: 'No right answer',
          tekst: 'Students and professionals are used to looking for the expected response. The conversation card removes that escape route. You have to defend a choice, listen to others who choose differently, and sharpen your own reasoning.',
        },
        {
          titel: 'Practice-based material',
          tekst: 'The situations come from real life — contributed by alumni and professionals. That is the difference between an exercise and genuine preparation for working life.',
        },
        {
          titel: 'Dialogue as method',
          tekst: 'Moral judgement develops in conversation. The card creates that dialogue — in a low-threshold, non-threatening way.',
        },
      ],
    },
    hoe: {
      titel: 'How are they used?',
      intro: 'The basic form is simple: read the card, look at the image, and start a conversation using the two questions. No model required.',
      vormen: [
        'An opener for a class or meeting',
        'A discussion format in small groups',
        'A reflection tool after a work placement',
        'The basis for a structured moral deliberation',
      ],
      niveaus: 'The cards are organised by complexity — from accessible, everyday dilemmas to systemic situations where hierarchy, regulation, and ethics are all in tension at once.',
    },
    preview: {
      titel: 'Available cards',
      subtitel: 'Every card closes with the same two questions:',
      vraag1: 'What would you do, and why?',
      vraag2: 'What values are at stake here?',
    },
    introToggle: 'About the method — why and how?',
    cta: {
      titel: 'What is available?',
      tekst: 'Within the Community of Moral Craftsmanship, sets are available for different domains and contexts. Members can download materials, use them in practice, and — when they work — share them back with the community. The ambition: 250+ cards, developed together with students, alumni and professionals from the field.',
      knop: 'Join the community',
    },
  },
}

// ── ANIMATIE ─────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

// ── COMPONENT ────────────────────────────────────────────────────

export default function GespreksKaartenPagina() {
  const { taal, t } = useTaal()
  const copy = pageContent[taal]
  const stap4 = basisStappen[3]
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const allCards = getAllCards()
  const filterOptions = useMemo(() => getFilterOptions(allCards), [allCards])
  const filteredCards = useMemo(
    () => filterCards(allCards, { ...filters, taal }),
    [allCards, filters, taal]
  )
  const displayCards = useMemo(() => {
    const labels = t.gesprekskaart.filters.categorieLabels ?? {}
    return localizeCards(taal, filteredCards).map((card) => ({
      ...card,
      categorie: labels[card.categorieSlug] ?? card.categorieSlug,
    }))
  }, [filteredCards, taal, t.gesprekskaart.filters.categorieLabels])
  const aanmeldenHref = taal === 'nl' ? '/aanmelden' : '/join'
  const teaserDownload = {
    href: TEASER_DOWNLOADS[taal].href,
    filename: TEASER_DOWNLOADS[taal].filename,
    label: t.gesprekskaart.downloadTeaserSet,
  }

  return (
    <main style={{ backgroundColor: 'var(--achtergrond, #fafaf8)', color: 'var(--tekst-primair, #1a2744)', paddingTop: '80px' }}>

      {/* ── HERO ── */}
      <section style={{ padding: '3.5rem 1.5rem 2.5rem', maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          style={{
            fontSize: '0.75rem',
            fontFamily: 'DM Sans, sans-serif',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#534ab7',
            marginBottom: '1rem',
          }}
        >
          {copy.hero.label}
        </motion.p>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            color: '#534ab7',
            marginBottom: '1.25rem',
          }}
        >
          {copy.hero.titel}
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: 'var(--tekst-secundair, #5f5e5a)',
            marginBottom: '1.75rem',
          }}
        >
          {copy.hero.subtitel}
        </motion.p>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: 'var(--tekst-secundair, #5f5e5a)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {copy.hero.intro}
        </motion.p>
      </section>

      {/* ── SCHEIDINGSLIJN ── */}
      <div style={{ maxWidth: '760px', margin: '0 auto 0', padding: '0 1.5rem' }}>
        <div style={{ height: '1px', backgroundColor: 'var(--rand, #d3d1c7)' }} />
      </div>

      {/* ── INLEIDING (inklapbaar) ── */}
      <details
        style={{
          maxWidth: '900px',
          margin: '0 auto 1rem',
          padding: '0 1.5rem',
        }}
      >
        <summary
          style={{
            cursor: 'pointer',
            listStyle: 'none',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 500,
            color: '#534ab7',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            border: '1px solid var(--rand, #d8d3c9)',
            backgroundColor: 'var(--surface-muted, #f0ebe3)',
          }}
        >
          {copy.introToggle}
        </summary>

      {/* ── WAAROM WERKEN ZE ── */}
      <section style={{ padding: '2rem 0 1rem', maxWidth: '900px', margin: '0 auto' }}>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          {copy.waarom.titel}
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {copy.waarom.pijlers.map((pijler, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--surface, #fdfcfa)',
                borderRadius: '12px',
                border: '1px solid var(--rand, #d8d3c9)',
                borderTop: '3px solid #534ab7',
              }}
            >
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                color: '#534ab7',
              }}>
                {pijler.titel}
              </h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--tekst-secundair, #5f5e5a)',
              }}>
                {pijler.tekst}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOE WORDEN ZE GEBRUIKT ── */}
      <section style={{
        padding: '2rem 0 2.5rem',
        backgroundColor: 'var(--surface-muted, #f0ebe3)',
        borderTop: '1px solid var(--rand, #d8d3c9)',
        borderBottom: '1px solid var(--rand, #d8d3c9)',
        borderRadius: '12px',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 0.5rem' }}>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            {copy.hoe.titel}
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem', color: 'var(--tekst-secundair, #5f5e5a)' }}
          >
            {copy.hoe.intro}
          </motion.p>

          <motion.ul
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem' }}
          >
            {copy.hoe.vormen.map((vorm, i) => (
              <li key={i} style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                padding: '0.5rem 0 0.5rem 1.5rem',
                borderBottom: i < copy.hoe.vormen.length - 1 ? '1px solid var(--rand, #d3d1c7)' : 'none',
                color: 'var(--tekst-primair, #1a2744)',
                position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, color: '#534ab7' }}>→</span>
                {vorm}
              </li>
            ))}
          </motion.ul>

          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--tekst-secundair, #5f5e5a)', fontStyle: 'italic' }}
          >
            {copy.hoe.niveaus}
          </motion.p>
        </div>
      </section>
      </details>

      {/* ── BESCHIKBARE KAARTEN ── */}
      <section style={{ padding: '3rem 1.5rem 4rem', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '0.5rem',
          }}
        >
          {copy.preview.titel}
        </motion.h2>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.9rem',
            textAlign: 'center',
            color: 'var(--tekst-secundair, #5f5e5a)',
            marginBottom: '1.5rem',
          }}
        >
          {copy.preview.subtitel}{' '}
          <em style={{ color: '#534ab7' }}>{copy.preview.vraag1}</em>{' '}
          {taal === 'nl' ? 'en' : 'and'}{' '}
          <em style={{ color: '#534ab7' }}>{copy.preview.vraag2}</em>
        </motion.p>

        <GesprekskaartenFilters
          filters={filters}
          onChange={setFilters}
          options={filterOptions}
          resultCount={displayCards.length}
          totalCount={allCards.length}
        />

        <ConversationCardSection
          stapNummer={4}
          kleur={stap4.kleur}
          kleurLicht={stap4.kleurLicht}
          titelKey="gesprekskaarten_titel"
          kaarten={displayCards}
          downloadLinks={teaserDownload}
        />
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '3.5rem 1.5rem',
        backgroundColor: '#1a2744',
        textAlign: 'center',
      }}>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: '1.25rem',
          }}
        >
          {copy.cta.titel}
        </motion.h2>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}
        >
          {copy.cta.tekst}
        </motion.p>

        <motion.a
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
          href={aanmeldenHref}
          style={{
            display: 'inline-block',
            padding: '0.875rem 2.5rem',
            backgroundColor: '#534ab7',
            color: '#ffffff',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: '8px',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3f38a0'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#534ab7'}
        >
          {copy.cta.knop}
        </motion.a>
      </section>

    </main>
  )
}
