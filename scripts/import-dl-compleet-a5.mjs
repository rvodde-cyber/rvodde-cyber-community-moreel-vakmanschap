/**
 * Importeert gesprekskaarten uit DL COMPLEET A5.docx (categorie Dagelijks leven).
 * Run: node scripts/import-dl-compleet-a5.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeCard, wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawPath = path.join(root, "_import/dl-compleet-a5-raw.txt");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const outDir = path.join(root, "public/downloads/gesprekskaarten/dl-compleet-a5");

/** Volgorde en metadata (complexiteit handmatig bepaald — bron heeft geen ★-badges) */
const CARD_META = [
  {
    titel: "Hulp",
    complexiteit: "micro",
    en: {
      titel: "Help",
      verhaal:
        "The train jolts — a dull thud. A girl, barely eighteen, lies stretched out on the cold floor. Shivering, teeth chattering. The conductor calls for help, but her head keeps knocking against the icy steel. Your eyes fall on the soft, cherished scarf in your bag. Hesitation. Deep down you know what you should do. Your fingers reach for the soft fabric. But then — those shivers. Those chattering teeth. The dilemma cuts through you: give it away, or hold on to it?",
    },
  },
  {
    titel: "Vriend rijdt onder invloed van alcohol",
    complexiteit: "meso",
    en: {
      titel: "Friend drives under the influence of alcohol",
      verhaal:
        "Sophie watches with dismay as Tom, her friend, climbs behind the wheel after an evening of drinking — as he always does. Fear gnaws at her: the risks are enormous. Tom, but also others, are in danger. She wants to shake him awake, but fears his reaction. Sophie struggles with the trade-off: Tom's safety versus their relationship.",
    },
  },
  {
    titel: "Buurman dumpt afval in het park",
    complexiteit: "meso",
    en: {
      titel: "Neighbour dumps rubbish in the park",
      verhaal:
        "David watches with growing irritation as Mr Bakker, his neighbour, uses the park as a dump. The once green park turns into an unsightly place, full of stinking rubbish and pests. The neighbourhood grumbles; children avoid the spot. David's conscience gnaws at him. He wants to act, but fear of a confrontation with Mr Bakker holds him back.",
    },
  },
  {
    titel: "Vriend pleegt winkeldiefstal",
    complexiteit: "micro",
    en: {
      titel: "Friend shoplifts",
      verhaal:
        "Delano sees how Mark, his friend, systematically robs shops. Fear grips him: arrest, a criminal record — the consequences are enormous. But the friendship... that weighs heavily too. Loyalty versus conscience, a painful conflict. How can he reach Mark without losing him? Delano desperately searches for a way to save Mark from self-destruction without destroying their friendship.",
    },
  },
  {
    titel: "Buurvrouw laat kinderen vaak alleen thuis",
    complexiteit: "meso",
    en: {
      titel: "Neighbour often leaves children home alone",
      verhaal:
        "Emma's heart pounds in her throat. Mrs Jansen has left her young children home alone again; the door slams shut. Small voices cry, calling for mum. Emma's concern grows by the minute. These children are vulnerable, unprotected. She wants to intervene, but fear of Mrs Jansen's reaction paralyses her. A dilemma that chafes, a decision that weighs heavily.",
    },
  },
  {
    titel: "Vriend rijdt te hard en overtreedt verkeersregels",
    complexiteit: "meso",
    en: {
      titel: "Friend drives too fast and breaks traffic rules",
      verhaal:
        "Lisa worries about Mark, her friend, who regularly drives too fast. She sees how he ignores traffic rules and fears accidents. Lisa feels responsible, but does not dare to confront Mark directly for fear of his reaction. Lisa wants Mark to see how dangerous his driving is, without damaging their relationship.",
    },
  },
  {
    titel: "De gevonden portemonnee",
    complexiteit: "micro",
    en: {
      titel: "The found wallet",
      verhaal:
        "On a deserted bench lies a heavy leather wallet. Money and an ID card stare back at you. Nobody nearby — only you. Temptations shoot through your head: new shoes, unpaid bills. But then you think of the possible owner: a student, a mother, a stranger searching desperately.",
    },
  },
  {
    titel: "De roddelende vriend",
    complexiteit: "meso",
    en: {
      titel: "The gossiping friend",
      verhaal:
        "The music blares, lights flash, and then you hear it: your best friend is spreading lies about your mutual friend. Pure gossip, reputation-destroying. Your blood boils; you want to stop him. But he is your best friend, for years. Call him out in front of the whole group? The tension is enormous. What do you do?",
    },
  },
  {
    titel: "Het geleende geld",
    complexiteit: "micro",
    en: {
      titel: "The borrowed money",
      verhaal:
        "You were almost there, but unexpected bills threw a spanner in the works. Now you are in trouble. Your friend, who helped you with a smile, needs the money back himself. Every time his name appears on your screen, you feel shame. How do you explain that you cannot keep your promise? The tension between friendship and financial problems is palpable.",
    },
  },
  {
    titel: "De gemanipuleerde online beoordeling",
    complexiteit: "macro",
    en: {
      titel: "The manipulated online review",
      verhaal:
        "The new coffee shop displays suspiciously perfect reviews. Five stars, cheering reactions — all within a few days. Many reviewers have written only one review: that of the coffee shop. It is clearly fake, an unfair practice. Should you raise it? It is not your business, but it harms fair competition and misleads consumers. Do you let it go, or take action? What is the right choice?",
    },
  },
  {
    titel: "Buurman mishandelt zijn vrouw",
    complexiteit: "macro",
    en: {
      titel: "Neighbour abuses his wife",
      verhaal:
        "Emma witnesses domestic violence at her neighbour Mrs Janssen's home. Mr Janssen regularly abuses her, which deeply worries Emma. She hears shouting and sees bruises. Emma struggles with her conscience: she wants to help Mrs Janssen, but is afraid of Mr Janssen's reaction. Emma searches for a safe way to help Mrs Janssen.",
    },
  },
];

function parseCards(raw) {
  const pattern =
    /Dagelijks leven\s*\n+\s*(?:\d+\.\s*)?([^\n]+)\s*\n+\s*([\s\S]+?)\s*\n+\s*Wat zou jij doen/gm;

  const parsed = [];
  let match;
  while ((match = pattern.exec(raw)) !== null) {
    parsed.push({
      titel: match[1].trim(),
      verhaal: match[2].replace(/\s+/g, " ").trim(),
    });
  }

  if (parsed.length !== CARD_META.length) {
    throw new Error(`Verwacht ${CARD_META.length} kaarten, gevonden ${parsed.length}`);
  }

  return parsed.map((item, index) => {
    const meta = CARD_META[index];
    if (item.titel !== meta.titel) {
      throw new Error(
        `Titel mismatch op kaart ${index + 1}: "${item.titel}" vs "${meta.titel}"`
      );
    }

    return normalizeCard({
      id: `GK_DL_${String(index + 1).padStart(2, "0")}`,
      set: "dl-compleet-a5",
      stap: 1,
      categorie: "dagelijks-leven",
      complexiteit: meta.complexiteit,
      taalniveau: "B2",
      status: "getest",
      nl: {
        titel: item.titel,
        verhaal: item.verhaal,
        vraag1: "Wat zou jij doen en waarom?",
        vraag2: "Welke waarden zijn hier in het spel?",
      },
      en: {
        titel: meta.en.titel,
        verhaal: meta.en.verhaal,
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
        woordenNl: wordCount(item.verhaal),
        woordenEn: wordCount(meta.en.verhaal),
        bron: "DL COMPLEET A5.docx",
        categorieEn: "DAILY LIFE",
      },
    });
  });
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
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(root, "_import/dl-compleet-a5-parsed.json"),
  JSON.stringify(newCards, null, 2)
);
console.log(`Toegevoegd: ${newCards.length} dagelijks-leven kaarten (${merged.length} totaal)`);
newCards.forEach((c) =>
  console.log(
    `  ${c.id}  ${c.complexiteit.padEnd(5)}  ${c.categorie.padEnd(20)}  ${c.nl.titel}  (${c.meta.woordenNl}w)`
  )
);
