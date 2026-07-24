import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTaal } from "../context/TaalContext";
import { getLocalizedPageContent, usesEnglishRoutes } from "../data/vertalingen";

const content = {
  nl: {
    label: "Over dit platform",
    titel: "Welkom bij Community Moreel Vakmanschap",
    subtitel:
      "Een plek waar docenten en onderzoekers samen werken aan ethiekonderwijs dat werkelijk vormt.",
    blokken: [
      {
        titel: "Wat is dit platform?",
        tekst: "Dit platform is een Community of Practice voor iedereen die zich bezighoudt met ethiekonderwijs in het hoger beroepsonderwijs en wetenschappelijk onderwijs — in Nederland en internationaal. Het is geen kennisbank, geen cursus en geen scorebord. Het is een ontmoetingsplek voor mensen die geloven dat morele vorming meer vraagt dan kennisoverdracht.",
      },
      {
        titel: "Waar gaat het over?",
        tekst: "Ethiek verdwijnt in het hoger onderwijs onder druk van toetsing en leerstofoverdracht. Studenten leren wat goed is — maar worden onvoldoende voorbereid op de weerbarstige werkelijkheid waarbij echt iets op het spel staat. Dit platform is een antwoord op die spanning: een plek waar docenten materialen delen, ervaringen uitwisselen en samen bouwen aan onderwijs dat wél vormt.",
      },
      {
        titel: "Voor wie is dit?",
        tekst: "Voor docenten en onderzoekers bij hogescholen en universiteiten die werken aan ethiekonderwijs, morele vorming of beroepsethiek. Of je nu net begint of al jaren bezig bent — je bent welkom. De community is open, de materialen zijn vrij te gebruiken, en meedoen kost niets.",
      },
      {
        titel: "Hoe werkt het?",
        tekst: "Het platform is gebouwd rond het Model Moreel Vakmanschap — een cyclisch model van vijf stappen: Zien, Voelen, Wegen, Handelen en Volhouden. Per stap vind je tools, werkbladen en gesprekskaarten die je direct kunt gebruiken in je onderwijs. Leden delen wat werkt, reageren op elkaars materiaal en ontmoeten elkaar in online sessies elke zes weken.",
      },
    ],
    cta: "Meld je aan",
    ctaSecundair: "Bekijk het model",
    richtlijnenVoor: "Samenwerken in de community? Lees de ",
    richtlijnenLink: "communityrichtlijnen",
    richtlijnenNa: ".",
  },
  en: {
    label: "About this platform",
    titel: "Welcome to the Community of Moral Craftsmanship",
    subtitel:
      "A place where educators and researchers work together on ethics education that genuinely shapes people.",
    blokken: [
      {
        titel: "What is this platform?",
        tekst: "This platform is a Community of Practice for everyone involved in ethics education in higher professional and academic education — in the Netherlands and internationally. It is not a knowledge base, a course, or a leaderboard. It is a meeting place for people who believe that moral formation requires more than the transfer of knowledge.",
      },
      {
        titel: "What is it about?",
        tekst: "Ethics is disappearing from higher education under the pressure of assessment and content delivery. Students learn what is right — but are rarely prepared for the messy reality of situations where something is genuinely at stake. This platform is a response to that tension: a place where educators share materials, exchange experiences, and build together towards education that genuinely forms people.",
      },
      {
        titel: "Who is it for?",
        tekst: "For educators and researchers at universities of applied sciences and research universities who work on ethics education, moral formation, or professional ethics. Whether you are just starting out or have years of experience — you are welcome. The community is open, the materials are free to use, and participation costs nothing.",
      },
      {
        titel: "How does it work?",
        tekst: "The platform is built around the Model of Moral Craftsmanship — a cyclical model of five steps: Seeing, Feeling, Weighing, Acting, and Persisting. For each step you will find tools, worksheets and conversation cards that you can use directly in your teaching. Members share what works, respond to each other's materials, and meet in online sessions every six weeks.",
      },
    ],
    cta: "Join the community",
    ctaSecundair: "View the model",
    richtlijnenVoor: "Working together in the community? Read the ",
    richtlijnenLink: "community guidelines",
    richtlijnenNa: ".",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function WelkomPagina() {
  const { taal } = useTaal();
  const t = getLocalizedPageContent(content, taal, "welkom");
  const aanmeldenHref = usesEnglishRoutes(taal) ? "/join" : "/aanmelden";
  const richtlijnenHref = usesEnglishRoutes(taal) ? "/community-guidelines" : "/communityrichtlijnen";

  return (
    <main
      style={{
        backgroundColor: "var(--achtergrond, #fafaf8)",
        color: "var(--tekst-primair, #1a2744)",
        paddingTop: "80px",
      }}
    >
      <section
        style={{ padding: "5rem 1.5rem 4rem", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}
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
            marginBottom: "1rem",
          }}
        >
          {t.label}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 600,
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          {t.titel}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            fontStyle: "italic",
            color: "var(--tekst-secundair, #5f5e5a)",
            marginBottom: "2.5rem",
          }}
        >
          {t.subtitel}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href={aanmeldenHref}
            style={{
              padding: "0.875rem 2rem",
              backgroundColor: "#534ab7",
              color: "#ffffff",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            {t.cta}
          </a>
          <a
            href="/model"
            style={{
              padding: "0.875rem 2rem",
              backgroundColor: "transparent",
              color: "#534ab7",
              border: "1.5px solid #534ab7",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            {t.ctaSecundair}
          </a>
        </motion.div>
      </section>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ height: "1px", backgroundColor: "var(--rand, #d3d1c7)" }} />
      </div>

      <section style={{ padding: "3.5rem 1.5rem 5rem", maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "2rem",
          }}
        >
          {t.blokken.map((blok, i) => (
            <motion.div
              key={blok.titel}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              style={{
                padding: "2rem",
                backgroundColor: "var(--surface, #fdfcfa)",
                borderRadius: "12px",
                border: "1px solid var(--rand, #d8d3c9)",
                borderTop: "3px solid #534ab7",
              }}
            >
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#534ab7",
                  marginBottom: "0.75rem",
                }}
              >
                {blok.titel}
              </h2>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "var(--tekst-secundair, #5f5e5a)",
                }}
              >
                {blok.tekst}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            marginTop: "2.5rem",
            textAlign: "center",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: "var(--tekst-secundair, #5f5e5a)",
          }}
        >
          {t.richtlijnenVoor}
          <Link
            to={richtlijnenHref}
            style={{ color: "#993c1d", fontWeight: 600, textDecoration: "underline" }}
          >
            {t.richtlijnenLink}
          </Link>
          {t.richtlijnenNa}
        </motion.p>
      </section>
    </main>
  );
}
