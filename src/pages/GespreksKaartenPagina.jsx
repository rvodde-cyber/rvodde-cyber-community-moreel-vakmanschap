import { motion } from 'framer-motion'
import { useTaal } from '../context/TaalContext'

// ── CONTENT DATA ────────────────────────────────────────────────

const content = {
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
      titel: 'Drie voorbeelden',
      subtitel: 'Elke kaart sluit af met dezelfde twee vragen:',
      vraag1: 'Wat zou jij doen en waarom?',
      vraag2: 'Welke waarden zijn hier in het spel?',
    },
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
      titel: 'Three examples',
      subtitel: 'Every card closes with the same two questions:',
      vraag1: 'What would you do, and why?',
      vraag2: 'What values are at stake here?',
    },
    cta: {
      titel: 'What is available?',
      tekst: 'Within the Community of Moral Craftsmanship, sets are available for different domains and contexts. Members can download materials, use them in practice, and — when they work — share them back with the community. The ambition: 250+ cards, developed together with students, alumni and professionals from the field.',
      knop: 'Join the community',
    },
  },
}

// ── DRIE VOORBEELDKAARTEN ────────────────────────────────────────
// Vervang image-paden door echte Firefly-afbeeldingen zodra beschikbaar.
// Tijdelijk: gekleurde placeholder met icon.

const voorbeeldKaarten = [
  {
    id: 1,
    stap: 'zien',
    kleur: '#185fa5',
    complexiteit: '★★☆☆☆',
    nl: {
      domein: 'HRM',
      titel: 'De stille collega',
      casus: 'Yara werkt al drie jaar samen met Daan. Ze merkt dat hij de laatste maanden anders is — stiller, afwezig, een keer te laat op een belangrijke vergadering. Haar leidinggevende vraagt haar of ze "iets weet". Yara twijfelt. Daan heeft haar niets verteld. Maar ze maakt zich zorgen.',
    },
    en: {
      domein: 'HRM',
      titel: 'The quiet colleague',
      casus: 'Yara has worked with Daan for three years. She notices he has changed in recent months — quieter, distracted, once late for an important meeting. Her manager asks her whether she "knows anything." Yara hesitates. Daan has told her nothing. But she is worried.',
    },
  },
  {
    id: 2,
    stap: 'wegen',
    kleur: '#993556',
    complexiteit: '★★★☆☆',
    nl: {
      domein: 'Zorg',
      titel: 'Het dossier',
      casus: 'Verpleegkundige Fatima ziet dat een collega in het dossier van een patiënt iets heeft ingevuld wat niet klopt met wat zij zelf heeft waargenomen. Ze weet niet of het een vergissing is of iets anders. De collega is ervaren en goed aangeschreven. Melden voelt zwaar. Niet melden ook.',
    },
    en: {
      domein: 'Healthcare',
      titel: 'The patient record',
      casus: 'Nurse Fatima notices that a colleague has recorded something in a patient\'s file that does not match what she herself observed. She does not know whether it is a mistake or something else. The colleague is experienced and well-regarded. Reporting feels serious. So does staying silent.',
    },
  },
  {
    id: 3,
    stap: 'volhouden',
    kleur: '#993c1d',
    complexiteit: '★★★★☆',
    nl: {
      domein: 'Onderwijs',
      titel: 'De cijferdruk',
      casus: 'Docent Marcus krijgt van zijn teamleider de opdracht de slagingspercentages van zijn vak te verhogen. De druk is duidelijk: te veel studenten halen het niet. Marcus gelooft in zijn aanpak en in zijn studenten — maar hij ziet ook dat collega\'s hun normen stiller en stiller bijstellen. Hij vraagt zich af hoe lang hij dit vol kan houden.',
    },
    en: {
      domein: 'Education',
      titel: 'The grade pressure',
      casus: 'Teacher Marcus is instructed by his team leader to raise the pass rates for his course. The pressure is clear: too many students are failing. Marcus believes in his approach and in his students — but he also sees colleagues quietly adjusting their standards. He wonders how long he can hold his ground.',
    },
  },
]

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
  const { taal } = useTaal()
  const t = content[taal]

  return (
    <main style={{ backgroundColor: 'var(--achtergrond, #fafaf8)', color: 'var(--tekst-primair, #1a2744)' }}>

      {/* ── HERO ── */}
      <section style={{ padding: '5rem 1.5rem 4rem', maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
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
          {t.hero.label}
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
          {t.hero.titel}
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
          {t.hero.subtitel}
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
          {t.hero.intro}
        </motion.p>
      </section>

      {/* ── SCHEIDINGSLIJN ── */}
      <div style={{ maxWidth: '760px', margin: '0 auto 0', padding: '0 1.5rem' }}>
        <div style={{ height: '1px', backgroundColor: 'var(--rand, #d3d1c7)' }} />
      </div>

      {/* ── WAAROM WERKEN ZE ── */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            marginBottom: '3rem',
            textAlign: 'center',
          }}
        >
          {t.waarom.titel}
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {t.waarom.pijlers.map((pijler, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              style={{
                padding: '2rem',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid var(--rand, #d3d1c7)',
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
        padding: '4rem 1.5rem',
        backgroundColor: '#f0eeea',
        borderTop: '1px solid var(--rand, #d3d1c7)',
        borderBottom: '1px solid var(--rand, #d3d1c7)',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            {t.hoe.titel}
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem', color: 'var(--tekst-secundair, #5f5e5a)' }}
          >
            {t.hoe.intro}
          </motion.p>

          <motion.ul
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem' }}
          >
            {t.hoe.vormen.map((vorm, i) => (
              <li key={i} style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                padding: '0.5rem 0 0.5rem 1.5rem',
                borderBottom: i < t.hoe.vormen.length - 1 ? '1px solid var(--rand, #d3d1c7)' : 'none',
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
            {t.hoe.niveaus}
          </motion.p>
        </div>
      </section>

      {/* ── PREVIEW KAARTEN ── */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
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
          {t.preview.titel}
        </motion.h2>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.9rem',
            textAlign: 'center',
            color: 'var(--tekst-secundair, #5f5e5a)',
            marginBottom: '3rem',
          }}
        >
          {t.preview.subtitel}{' '}
          <em style={{ color: '#534ab7' }}>{t.preview.vraag1}</em>{' '}
          {taal === 'nl' ? 'en' : 'and'}{' '}
          <em style={{ color: '#534ab7' }}>{t.preview.vraag2}</em>
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {voorbeeldKaarten.map((kaart, i) => {
            const k = kaart[taal]
            return (
              <motion.div
                key={kaart.id}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--rand, #d3d1c7)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Kleurblok als placeholder voor Firefly-afbeelding */}
                {/* TODO: vervang dit blok door een <img> zodra Firefly-afbeeldingen beschikbaar zijn */}
                <div style={{
                  height: '180px',
                  backgroundColor: kaart.kleur,
                  opacity: 0.85,
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1rem 1.25rem',
                }}>
                  <div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontFamily: 'DM Sans, sans-serif',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.75)',
                      display: 'block',
                      marginBottom: '0.25rem',
                    }}>
                      {k.domein} · {kaart.complexiteit}
                    </span>
                    <span style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}>
                      {k.titel}
                    </span>
                  </div>
                </div>

                {/* Casustekst */}
                <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.9rem',
                    lineHeight: 1.75,
                    color: 'var(--tekst-secundair, #5f5e5a)',
                    marginBottom: '1.25rem',
                  }}>
                    {k.casus}
                  </p>

                  {/* Twee vragen */}
                  <div style={{
                    borderTop: '1px solid var(--rand, #d3d1c7)',
                    paddingTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}>
                    {[t.preview.vraag1, t.preview.vraag2].map((vraag, vi) => (
                      <p key={vi} style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '0.95rem',
                        fontStyle: 'italic',
                        color: '#534ab7',
                        margin: 0,
                      }}>
                        {vraag}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '5rem 1.5rem',
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
          {t.cta.titel}
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
          {t.cta.tekst}
        </motion.p>

        <motion.a
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
          href="/#aanmelden"
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
          {t.cta.knop}
        </motion.a>
      </section>

    </main>
  )
}
