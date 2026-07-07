/**
 * Importeert gesprekskaarten uit Gesprekskaarten_Onderwijs_v3.docx
 * Run: node scripts/import-onderwijs-v3.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeCard, wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawPath = path.join(root, "_import/onderwijs-v3-raw.txt");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");

const COMPLEXITY_MAP = {
  MICRO: "micro",
  MESO: "meso",
  MACRO: "macro",
};

/** EN-vertalingen (NL bron: Gesprekskaarten_Onderwijs_v3.docx) */
const EN_TRANSLATIONS = {
  "De stille regel": {
    titel: "The unspoken rule",
    verhaal:
      "Mr Van Dijk sets down his coffee in the staff room when colleague Tessa takes him aside. \"Do you know that Smit and that boy from 5V have something going on?\" she whispers. Van Dijk feels the ground drop away beneath him. Ms Smit, Dutch teacher, respected, always the first to call others out on boundary-crossing behaviour. Now it turns out she herself has been in a relationship with a seventeen-year-old student for months. It violates every school rule, every power imbalance he has always tried to guard against. Does he report it to the principal, knowing this could cost her her job and put the student in the spotlight? Or does he wait, hoping she will end it herself? Van Dijk places his hand on the handle of the principal's door. Does he open it?",
  },
  "De lege stoel achterin": {
    titel: "The empty chair at the back",
    verhaal:
      "Ms Peters sees Ahmed leave the classroom last on Friday afternoon, head bowed, backpack zipped tight against his chest. For the third time this month she finds a crumpled note on his desk with a slur on it. She has already addressed the class twice, held a mentor meeting, called the parents. Nothing changes. Ahmed hardly speaks in class anymore, his grades are falling, and the class acts as if nothing is wrong. Today she saw two boys grin when he picked up his bag. Does she escalate to the care coordinator and the perpetrators' parents, with the risk that the bullying goes underground and gets worse? Or does she keep trying to resolve it herself while Ahmed continues to slip away? She looks at the empty chair at the back. How much longer can she wait?",
  },
  "Het lijstje in de kantine": {
    titel: "The list in the staff room",
    verhaal:
      "Mr Janssen sits in the staff room on Tuesday afternoon with class 4B's grade list open on his laptop. He compares colleague Vermeulen's marking with the rubrics: three of her favourite students consistently receive a point higher than their work justifies, while other, equally strong students stay at the average. A student commented recently: \"It's not fair, is it, sir?\" He knows: a report to the exam board could cost Vermeulen her assessment authority and seriously poison the team atmosphere. Staying silent means the inequality continues and students' trust in fair assessment erodes further. He closes his laptop and walks towards the corridor where Vermeulen's classroom is. Does he knock, or walk on?",
  },
  "Wat er blijft hangen": {
    titel: "What stays behind",
    verhaal:
      "Ms Van der Meer stands outside room 1.14 on Wednesday morning when she hears Mr Jansen's voice through the gap in the door: a joke about a student in a headscarf, followed by laughter from part of the class. It is not the first time; students have whispered about it in the corridor for weeks, and two parents have expressed their concerns through the mentor. Jansen is a valued colleague, fifteen years in the job, and nobody has ever confronted him directly. She knows an official report to school leadership will trigger an investigation that puts the team on edge and could cost Jansen his position. A private conversation feels safer, but will that actually change anything? She knocks at his classroom door. What does she say when he opens it?",
  },
  "De afwezige stoel": {
    titel: "The absent seat",
    verhaal:
      "Ms Visser records Kimberly's fourth absence this month in the attendance system on Thursday morning. She calls home; nobody answers. When Kimberly does appear the next day, pale-skinned with a broken gaze, Visser asks gently how she is doing. \"Just tired,\" Kimberly says, and she looks at the floor. Visser sees more and more signs — a neglected backpack, text messages she quickly dismisses — pointing to something at home that is not right. Kimberly has clearly asked her to \"just leave it.\" Does Visser report her suspicion to the care coordinator, with the risk of breaking Kimberly's trust? Or does she wait, hoping Kimberly will talk on her own initiative while the signs worsen? Visser puts the phone back on the desk. Does she call?",
  },
  "Tien minuten voor het assessment": {
    titel: "Ten minutes before the assessment",
    verhaal:
      "At 08:50 Lisa stands crying in the doorway of the exam room, ten minutes before her resit. Last night she heard that her study friend Fem has died. She could have stayed home, but wanted to come at all costs — a missed attempt means waiting half a year for a new one, and she is already behind in her studies. The examiner sees a student who can barely finish a sentence, let alone an assessment form. The protocol is clear: whoever does not start must wait until the next round. But what is a \"fair\" result worth, administered to someone collapsing with grief? Allowing deferral outside the regulations can create precedents for other students in distress. The examiner looks at the clock. Does she let the assessment begin, or send Lisa home?",
  },
  "5,3 op het scherm": {
    titel: "5.3 on the screen",
    verhaal:
      "Mr De Groot stares at the assessment system on Tuesday afternoon: 5.3, fail. It is student Youssef's third attempt for this subject. In the margin of his notes De Groot sees the progress the system does not capture — Youssef has not missed a single class this semester, participated actively, his presentation was noticeably better than last time. Yet the rubric strictly adds up the sub-scores, and half a point below means officially a fail and another half year of delay. De Groot can adjust the grade manually — the software allows it — but that means deviating from the system meant precisely to prevent arbitrariness. His finger hovers over the \"save\" button. Does he override the grade, or let the system decide?",
  },
  "Het rooster van meneer De Vries": {
    titel: "Mr De Vries's timetable",
    verhaal:
      "Ms Jansen hears it again in the corridors: students complaining that Mr De Vries's lessons are \"a chaos\" — no clear lesson plan, material he improvises on the spot, a class that no longer knows what is expected of them. She knows why: De Vries is going through a difficult divorce and barely has time to prepare. Last week she found him alone in the staff room early in the morning, red-eyed, with a half-empty cup of coffee. She wants to be there for him as a colleague, but student complaints are piling up and the team leader has asked about it twice already. Does she protect De Vries by staying silent about his situation, or go to the team leader to ask for help, even though it is not hers to share?",
  },
  "Buiten de kalibratie": {
    titel: "Outside calibration",
    verhaal:
      "In the staff room, Friday after school, Marieke sees colleague Ruud for the umpteenth time marking a pile of assignments without the rubric at hand. \"I just feel what a good piece of work is,\" he says when she asks. She knows calibration sessions have been held, protocols agreed — precisely to prevent arbitrariness between teachers — and that students in Ruud's classes consistently receive different grades than in colleagues' classes for comparable work. A student recently complained to the curriculum committee, without naming names. Does Marieke confront Ruud directly, with the risk of an awkward atmosphere in a small team? Or does she report it to the curriculum committee, knowing this could have far-reaching consequences for Ruud? She takes her coat from the rack. Does she wait until Monday, or speak to him now?",
  },
  "Twee opstellen naast elkaar": {
    titel: "Two essays side by side",
    verhaal:
      "Mr Bakker sits after school on Thursday with two essays side by side: Lisa's and her classmate Fenna's. In the third paragraph the exact same sentence appears, typo included. He knows that copying according to the exam regulations means a fail and a note in the file. But he also knows Lisa's situation: last week she told him, in tears, that her parents \"simply won't accept\" a fail and that there has been conflict at home for months over her grades. If he follows protocol, he risks the pressure at home escalating further. If he lets it go, he undermines the rule meant to prevent unfairness — and what does he say to Fenna, who did her own work? Bakker lays the two essays side by side on his desk. Does he call the parents, or Lisa first?",
  },
};

function parseCards(raw) {
  const pattern =
    /ONDERWIJS\s*\n+\s*★[☆★]+\s+(MICRO|MESO|MACRO)[^\n]*\n+\s*(?:\d+\.\s*)?([^\n]+)\n+\n([\s\S]+?)\n+\s*Wat zou jij doen/gm;

  const cards = [];
  let match;
  let index = 0;

  while ((match = pattern.exec(raw)) !== null) {
    index += 1;
    const complexityKey = match[1];
    const titel = match[2].trim();
    const verhaal = match[3].replace(/\s+/g, " ").trim();
    const en = EN_TRANSLATIONS[titel];
    if (!en) throw new Error(`Geen EN-vertaling voor: ${titel}`);

    cards.push(
      normalizeCard({
        id: `GK_OW_${String(index).padStart(2, "0")}`,
        set: "onderwijs-v3",
        stap: 1,
        categorie: "onderwijs",
        complexiteit: COMPLEXITY_MAP[complexityKey],
        taalniveau: "B2",
        status: "getest",
        nl: {
          titel,
          verhaal,
          vraag1: "Wat zou jij doen en waarom?",
          vraag2: "Welke waarden zijn hier in het spel?",
        },
        en: {
          titel: en.titel,
          verhaal: en.verhaal,
          vraag1: "What would you do, and why?",
          vraag2: "What values are at stake here?",
        },
        assets: {
          afbeelding: null,
          fireflyPrompt: null,
          pdfNl: null,
          pdfEn: null,
        },
        meta: {
          woordenNl: wordCount(verhaal),
          woordenEn: wordCount(en.verhaal),
          bron: "Gesprekskaarten_Onderwijs_v3.docx",
          categorieEn: "EDUCATION",
        },
      })
    );
  }

  if (cards.length !== 10) {
    throw new Error(`Verwacht 10 kaarten, gevonden ${cards.length}`);
  }

  return cards;
}

const raw = fs.readFileSync(rawPath, "utf8");
const newCards = parseCards(raw);
const existing = JSON.parse(fs.readFileSync(cardsPath, "utf8"));
const ids = new Set(existing.map((c) => c.id));
const merged = [...existing];

for (const card of newCards) {
  if (ids.has(card.id)) {
    console.warn(`Vervang ${card.id}`);
    const i = merged.findIndex((c) => c.id === card.id);
    merged[i] = card;
  } else {
    merged.push(card);
    ids.add(card.id);
  }
}

fs.writeFileSync(cardsPath, JSON.stringify(merged, null, 2), "utf8");
fs.writeFileSync(
  path.join(root, "_import/onderwijs-v3-parsed.json"),
  JSON.stringify(newCards, null, 2)
);
console.log(`Toegevoegd: ${newCards.length} onderwijs kaarten (${merged.length} totaal)`);
newCards.forEach((c) =>
  console.log(
    `  ${c.id}  ${c.complexiteit.padEnd(5)}  ${c.categorie.padEnd(12)}  ${c.nl.titel}  (${c.meta.woordenNl}w)`
  )
);
