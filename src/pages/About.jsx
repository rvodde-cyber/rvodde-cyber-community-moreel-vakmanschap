import { motion } from "framer-motion";

const sections = [
  {
    title: "Why this matters",
    text: `Ethics is disappearing in higher education under the pressure of assessment and content delivery. Gert Biesta calls this learnification: education reduced to measurable learning outcomes. The result is that professionals enter the labour market with knowledge about ethics, but without the ability to act morally when something is truly at stake.

Teachers who want to work on this are currently doing so largely alone. There is no shared language, no shared toolkit, no community.

We want to change that.`
  },
  {
    title: "The Model of Moral Craftsmanship",
    text: `The Research Group on Ethical Practice at Fontys University of Applied Sciences developed the Model of Moral Craftsmanship: a cyclical model of five steps that describes how professionals act morally in practice.`,
    steps: [
      {
        number: "1",
        name: "Seeing",
        color: "#185fa5",
        question: "What is really happening?",
        description: "You recognise that something moral is at play. Seeing is the first step — and the most underestimated.",
        label: "Awareness"
      },
      {
        number: "2",
        name: "Feeling",
        color: "#854f0b",
        question: "Where do I feel moral discomfort?",
        description: "Before you start reasoning, you already feel something. That feeling is not noise — it is moral information.",
        label: "Inner compass"
      },
      {
        number: "3",
        name: "Weighing",
        color: "#993556",
        question: "What is in conflict here?",
        description: "Values, interests, responsibilities, context. Moral weighing is not a calculation — it is a careful consideration.",
        label: "Moral deliberation"
      },
      {
        number: "4",
        name: "Acting",
        color: "#0f6e56",
        question: "What does this ask of me?",
        description: "You act on your moral judgement. That requires courage — the willingness to stand for what is right.",
        label: "Moral courage"
      },
      {
        number: "5",
        name: "Persisting",
        color: "#993c1d",
        question: "Which course do I want to hold?",
        description: "Moral craftsmanship is not a one-time achievement. It requires perseverance — holding the course in adversity.",
        label: "Integrity & perseverance"
      }
    ],
    afterSteps: `At the centre is the conversation card: a moral situation from practice that activates all five steps at once. The model is based on the work of James Rest, Edgar Karssing and Aristotle's concept of phronesis — practical wisdom that develops through doing, reflecting and persisting.`
  },
  {
    title: "The community as a co-creation platform",
    text: `The Community of Moral Craftsmanship brings together teachers and researchers from universities of applied sciences and research universities — nationally and internationally. Not a conference, not knowledge transfer from experts to recipients, but co-creation: developing tools and educational formats together, tagged by model step, and shared through an open platform.

Contributions have three levels: 🌱 Concept — newly tried, for inspiration · ✅ Tested — used at least once in educational practice · ⭐ Recommended — positively reviewed by several members.

Every six weeks we meet online — 90 minutes, always opened with a conversation card, always closed with an open question to take with you.`
  },
  {
    title: "Foundation: Biesta's weak pedagogy",
    text: `This community is designed against learnification. No scoreboards, no gamification, no ready-made answers.

Gert Biesta argues for weak pedagogy: leaving room for the unexpected, the difficult, the real. Each session ends not with conclusions but with a question. The conversation card has no right answer — only a genuine encounter.

Biesta calls education a beautiful risk: you do not know what will grow when you bring people together around moral formation. That is not a weakness of this community — it is exactly the point.`
  }
];

export default function About() {
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
          About the project
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
          A co-creation platform for ethics education in higher education
        </p>
      </motion.section>

      {/* Sections */}
      {sections.map((section, i) => (
        <motion.section
          key={section.title}
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
            {section.title}
          </h2>
          {section.text &&
            section.text.split("\n\n").map((paragraph) => (
              <p
                key={paragraph}
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "1rem",
                  color: "#5f5e5a",
                  lineHeight: 1.8,
                  marginBottom: "1rem"
                }}
              >
                {paragraph}
              </p>
            ))}
          {section.steps && (
            <div style={{ margin: "2rem 0" }}>
              {section.steps.map((step) => (
                <div
                  key={step.number}
                  style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      minWidth: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Cormorant Garamond",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "white"
                    }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        color: step.color,
                        fontSize: "0.95rem",
                        marginBottom: "0.25rem"
                      }}
                    >
                      {step.name} —{" "}
                      <span style={{ fontStyle: "italic", fontWeight: 400 }}>{step.question}</span>
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.9rem",
                        color: "#5f5e5a",
                        lineHeight: 1.6
                      }}
                    >
                      {step.description}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.8rem",
                        color: "#888780",
                        marginTop: "0.25rem"
                      }}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {section.afterSteps && (
            <p style={{ fontFamily: "DM Sans", fontSize: "1rem", color: "#5f5e5a", lineHeight: 1.8 }}>
              {section.afterSteps}
            </p>
          )}
        </motion.section>
      ))}

      {/* Core sentence */}
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
          Moral craftsmanship means: keep seeing, keep feeling, keep weighing, keep acting and hold the course —
          even when something is at stake.
        </blockquote>
        <p style={{ fontFamily: "DM Sans", fontSize: "0.9rem", color: "#888780", marginTop: "2rem" }}>
          Research Group on Ethical Practice — Fontys University of Applied Sciences · ethisch.werken@fontys.nl
        </p>
      </motion.section>
    </main>
  );
}
