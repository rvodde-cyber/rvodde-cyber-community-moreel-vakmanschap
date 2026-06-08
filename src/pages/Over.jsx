import { motion } from "framer-motion";

const secties = [
  {
    titel: "Waarom dit nodig is",
    tekst: `Ethiek verdwijnt in het HBO onder druk van toetsing en leerstofoverdracht. Gert Biesta noemt dit learnification: onderwijs gereduceerd tot meetbare leeruitkomsten. Het gevolg is dat professionals de arbeidsmarkt betreden met kennis óver ethiek, maar zonder het vermogen moreel te handelen wanneer er echt iets op het spel staat.

Docenten die hieraan willen werken, doen dat nu grotendeels alleen. Er is geen gedeelde taal, geen gedeelde gereedschapskist, geen gemeenschap.

Dat willen wij veranderen.`
  },
  {
    titel: "Het Model Moreel Vakmanschap",
    tekst: `Vanuit het Lectoraat Ethisch Werken van Fontys Hogescholen is het Model Moreel Vakmanschap ontwikkeld: een cyclisch model van vijf stappen dat beschrijft hoe professionals moreel handelen in de praktijk.`,
    stappen: [
      {
        nummer: "1",
        naam: "Zien",
        kleur: "#185fa5",
        vraag: "Wat gebeurt hier echt?",
        beschrijving: "Je herkent dat er iets moreel speelt. Zien is de eerste stap — en de meest onderschatte.",
        label: "Bewustwording"
      },
      {
        nummer: "2",
        naam: "Voelen",
        kleur: "#854f0b",
        vraag: "Waar krijg ik morele buikpijn van?",
        beschrijving: "Voordat je gaat redeneren, voel je al iets. Dat gevoel is geen ruis — het is morele informatie.",
        label: "Innerlijk kompas"
      },
      {
        nummer: "3",
        naam: "Wegen",
        kleur: "#993556",
        vraag: "Wat botst hier allemaal?",
        beschrijving: "Waarden, belangen, verantwoordelijkheden, context. Moreel wegen is geen berekening — het is een zorgvuldige afweging.",
        label: "Morele afweging"
      },
      {
        nummer: "4",
        naam: "Handelen",
        kleur: "#0f6e56",
        vraag: "Wat vraagt dit van mij?",
        beschrijving: "Je doet iets met je morele oordeel. Dat vraagt moed — de bereidheid om te staan voor wat juist is.",
        label: "Morele moed"
      },
      {
        nummer: "5",
        naam: "Volhouden",
        kleur: "#993c1d",
        vraag: "Welke koers wil ik blijven houden?",
        beschrijving: "Moreel vakmanschap is geen eenmalige prestatie. Het vraagt volharding — koers houden in tijd en tegenslag.",
        label: "Integriteit & volharding"
      }
    ],
    naStappen: `In het centrum staat de gesprekskaart: een morele situatie uit de praktijk die alle vijf stappen tegelijk activeert. Het model is gebaseerd op het werk van James Rest, Edgar Karssing en Aristoteles' concept van phronesis — praktische wijsheid die je ontwikkelt door te doen, te reflecteren en te volhouden.`
  },
  {
    titel: "De community als co-creatieplatform",
    tekst: `De Community Moreel Vakmanschap brengt docenten en onderzoekers van HBO en WO samen — nationaal en internationaal. Geen conferentie, geen kennisoverdracht van experts naar ontvangers, maar co-creatie: samen tools en werkvormen ontwikkelen, getagd per modelstap, gedeeld via een open platform.

Bijdragen hebben drie niveaus: 🌱 Concept — pas geprobeerd, ter inspiratie · ✅ Getest — minimaal één keer gebruikt in de onderwijspraktijk · ⭐ Aanbevolen — positief beoordeeld door meerdere leden.

Elke zes weken komen we online samen — 90 minuten, altijd geopend met een gesprekskaart, altijd afgesloten met een open vraag die je meeneemt.`
  },
  {
    titel: "Fundament: Biesta's zwakke pedagogiek",
    tekst: `Deze community is ontworpen tégen learnification. Geen scoreborden, geen gamification, geen kant-en-klare antwoorden.

Gert Biesta pleit voor zwakke pedagogiek: ruimte laten voor het onverwachte, het moeilijke, het echte. Elke sessie eindigt niet met conclusies maar met een vraag. De gesprekskaart heeft geen goed antwoord — alleen een echte ontmoeting.

Biesta noemt onderwijs een mooi risico: je weet niet wat er groeit als je mensen samenbrengt rond morele vorming. Dat is geen zwakte van deze community — dat is precies de bedoeling.`
  }
];

export default function Over() {
  return (
    <main style={{ background: "#fafaf8", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 2rem 2rem" }}
      >
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "13px",
            letterSpacing: "2px",
            color: "#534ab7",
            textTransform: "uppercase",
            marginBottom: "1rem"
          }}
        >
          Over het project
        </p>
        <h1
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "3rem",
            fontWeight: 700,
            color: "#1a2744",
            lineHeight: 1.15,
            marginBottom: "1.5rem"
          }}
        >
          Community Moreel Vakmanschap
        </h1>
        <p
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "1.4rem",
            color: "#5f5e5a",
            fontStyle: "italic",
            lineHeight: 1.6
          }}
        >
          Een co-creatieplatform voor ethiekonderwijs in het HBO en WO
        </p>
      </motion.section>

      {/* Secties */}
      {secties.map((sectie, i) => (
        <motion.section
          key={sectie.titel}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "2.5rem 2rem",
            borderTop: "1px solid #d3d1c7"
          }}
        >
          <h2
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#1a2744",
              marginBottom: "1.5rem"
            }}
          >
            {sectie.titel}
          </h2>
          {sectie.tekst &&
            sectie.tekst.split("\n\n").map((alinea) => (
              <p
                key={alinea}
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "1rem",
                  color: "#5f5e5a",
                  lineHeight: 1.8,
                  marginBottom: "1rem"
                }}
              >
                {alinea}
              </p>
            ))}
          {sectie.stappen && (
            <div style={{ margin: "2rem 0" }}>
              {sectie.stappen.map((stap) => (
                <div
                  key={stap.nummer}
                  style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      minWidth: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: stap.kleur,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Cormorant Garamond",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "white"
                    }}
                  >
                    {stap.nummer}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        color: stap.kleur,
                        fontSize: "0.95rem",
                        marginBottom: "0.25rem"
                      }}
                    >
                      {stap.naam} —{" "}
                      <span style={{ fontStyle: "italic", fontWeight: 400 }}>{stap.vraag}</span>
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.9rem",
                        color: "#5f5e5a",
                        lineHeight: 1.6
                      }}
                    >
                      {stap.beschrijving}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.8rem",
                        color: "#888780",
                        marginTop: "0.25rem"
                      }}
                    >
                      {stap.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {sectie.naStappen && (
            <p style={{ fontFamily: "DM Sans", fontSize: "1rem", color: "#5f5e5a", lineHeight: 1.8 }}>
              {sectie.naStappen}
            </p>
          )}
        </motion.section>
      ))}

      {/* Kernzin */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "760px",
          margin: "0 auto 4rem",
          padding: "2.5rem 2rem",
          borderTop: "1px solid #d3d1c7"
        }}
      >
        <blockquote
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "1.35rem",
            fontStyle: "italic",
            color: "#534ab7",
            lineHeight: 1.7,
            borderLeft: "3px solid #534ab7",
            paddingLeft: "1.5rem",
            margin: 0
          }}
        >
          Moreel vakmanschap betekent: blijven kijken, blijven voelen, blijven wegen, blijven handelen en koers
          houden — ook wanneer iets op het spel staat.
        </blockquote>
        <p style={{ fontFamily: "DM Sans", fontSize: "0.9rem", color: "#888780", marginTop: "2rem" }}>
          Lectoraat Ethisch Werken — Fontys Hogescholen · ethisch.werken@fontys.nl
        </p>
      </motion.section>
    </main>
  );
}
