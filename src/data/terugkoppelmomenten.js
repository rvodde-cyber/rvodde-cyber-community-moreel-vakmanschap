/**
 * Reflectieve terugkoppelvragen bij het model.
 * Visuele pijlen + tooltips: zie `cyclusPijlen.js` / `ModelWheel.jsx`.
 */
export const terugkoppelmomenten = [
  {
    id: "voelen-zien",
    van: "voelen",
    naar: "zien",
    kleur: "#185fa5",
    vraagNL: "Heb ik het wel goed gezien, of kleurt mijn gevoel de waarneming al?",
    vraagEN: "Did I really see this clearly, or is my feeling already colouring the observation?",
    opacity: 0.4,
    boog: "kort",
  },
  {
    id: "wegen-voelen",
    van: "wegen",
    naar: "voelen",
    kleur: "#854f0b",
    vraagNL: "Klopt mijn gevoel wel — is dit morele onrust, of iets anders (irritatie, moeheid)?",
    vraagEN: "Is this feeling accurate — is this moral discomfort, or something else (irritation, fatigue)?",
    opacity: 0.4,
    boog: "kort",
  },
  {
    id: "wegen-zien",
    van: "wegen",
    naar: "zien",
    kleur: "#185fa5",
    vraagNL: "Heb ik wel alle feiten, of mis ik een perspectief in mijn afweging?",
    vraagEN: "Do I have all the facts, or am I missing a perspective in my judgment?",
    opacity: 0.3,
    boog: "ruim",
  },
  {
    id: "handelen-wegen",
    van: "handelen",
    naar: "wegen",
    kleur: "#993556",
    vraagNL: "Heb ik dit wel goed afgewogen, of concludeer ik te snel?",
    vraagEN: "Did I weigh this properly, or did I conclude too quickly?",
    opacity: 0.4,
    boog: "kort",
  },
  {
    id: "volhouden-handelen",
    van: "volhouden",
    naar: "handelen",
    kleur: "#0f6e56",
    vraagNL: "Was mijn handelen wel passend, nu het stof is neergedaald?",
    vraagEN: "Was my action actually fitting, now that the dust has settled?",
    opacity: 0.4,
    boog: "kort",
  },
  {
    id: "volhouden-zien",
    van: "volhouden",
    naar: "zien",
    kleur: "#185fa5",
    labelNL: "Integriteit & volharding",
    labelEN: "Integrity & persistence",
    vraagNL: "Zie ik het nu anders dan aan het begin?",
    vraagEN: "Do I see it differently now than at the start?",
    opacity: 0.3,
    boog: "ruim",
  },
];

export const feedbackMoments = terugkoppelmomenten;
