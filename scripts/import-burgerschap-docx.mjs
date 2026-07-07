/**
 * Parseert geëxtraheerde tekst uit gesprekskaarten burgerschap.docx
 * Run: node scripts/import-burgerschap-docx.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeCard, wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawPath = path.join(root, "_import/gesprekskaarten-burgerschap-raw.txt");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");
const outDir = path.join(root, "public/downloads/gesprekskaarten/burgerschap");

const CATEGORY_MAP = {
  WORK: "werk",
  "DAILY LIFE": "dagelijks-leven",
  "SOCIAL MEDIA": "social-media",
  "STUDENT LIFE": "studentenleven",
  "DIVERSITY & INCLUSION": "diversiteit-inclusie",
  SUSTAINABILITY: "duurzaamheid",
  EDUCATION: "onderwijs",
};

const COMPLEXITY_MAP = {
  MICRO: { complexiteit: "micro", moeilijkheid: 1 },
  MESO: { complexiteit: "meso", moeilijkheid: 2 },
  MACRO: { complexiteit: "macro", moeilijkheid: 3 },
};

/** Handmatig geverifieerde EN-vertalingen (NL bron: burgerschap.docx) */
const EN_TRANSLATIONS = {
  "De weggenomen kantoorspullen": {
    titel: "The missing office supplies",
    verhaal:
      "Thomas sees his colleague Bas, at the end of the day, putting a pack of printer paper and a new mouse into his bag. Nobody else notices. Bas has worked in the department for twelve years and is considered indispensable; he always manages the rosters and covers when someone is sick. Thomas hesitates. Is this theft, or just a grey area everyone dabbles in? He thinks of the new colleague who was called out last month over a broken copy card — a small thing compared to this. If he reports it, he may ruin the team atmosphere for good. If he stays silent, he feels complicit every time he sees Bas laughing at the coffee machine. Does he tell his manager, speak to Bas directly, or do nothing?",
  },
  "De leugen voor de ouders": {
    titel: "The lie for the parents",
    verhaal:
      "Sanne has just stepped into the shower when her phone buzzes three times. Her best friend Iris texts: \"If my parents call, I was at yours last night, okay? Just say we watched a film.\" Sanne doesn't know where Iris really was, only that she came home at two in the morning and stayed quiet about it all morning. Iris's parents are strict; a lie might bring peace, but also hide something bigger than a night out. In ten minutes Iris's mother will probably call to ask if Sanne cycled home safely. Sanne types a reply, deletes it, types again. Does she tell the lie for her friend, ask first what really happened, or let Iris sort it out herself?",
  },
  "Voor de goede sfeer": {
    titel: "For the sake of team spirit",
    verhaal:
      "It's five o'clock on Friday afternoon and Youssef is grabbing his coat when team leader Marieke walks past. \"Could you stay another hour? The report really has to be done, and it helps so much if we finish it now instead of Monday.\" She smiles: \"Just for the good atmosphere, you know — we all do it sometimes.\" Youssef has already worked nine unpaid hours this quarter. His contract will be renewed or not in six weeks, and Marieke is part of that decision. His partner is already waiting with dinner. He feels the tension between his own boundaries and the impression he leaves with the person who decides his future. Does he refuse this time, or stay again so he doesn't put his job at risk?",
  },
  "De groepsapp": {
    titel: "The group chat",
    verhaal:
      "At 11:40 p.m. Femke's phone lights up. More and more messages appear in the class group chat about Julian — screenshots of his poor test score, an edited photo with a ridiculous caption, dozens of laughing emojis. Femke reads along but says nothing. She barely knows Julian, but sees how three classmates, including her best friend, are actively joining in. If she speaks up, the attention may turn on her. If she stays silent, the message stays up until tomorrow morning, when the whole class will have seen it. She scrolls back to the first message and sees that nobody — no teacher, no parent — can see this conversation. Does Femke intervene, even if she becomes a target herself, or put her phone away?",
  },
  "De gevonden portemonnee": {
    titel: "The found wallet",
    verhaal:
      "Between the bike rack and the supermarket Daan sees something brown on the ground. A wallet. He picks it up: two hundred-euro notes, some coins, and a card with no name or photo — only a gym membership number. No phone number, no address, nothing to reach the owner. Daan is alone; nobody is watching. Money has been tight for him this month after an unexpected bill. It would be so easy to keep the cash and leave the wallet somewhere as if he never found it. But somewhere someone is walking around who just lost their money, maybe even their rent. Daan looks around for a police station, a shop, a post box. What does he do with the wallet, and why?",
  },
  "De fout in het rapport": {
    titel: "The error in the report",
    verhaal:
      "Lotte is interning at a consultancy and has just reviewed the final report for a major client. She spots a calculation error in the cost forecast — one that makes the client's situation look hundreds of thousands of euros better than it is. Her supervisor Rick dismisses it: \"Nobody will notice, and if we change it now we'll miss tomorrow's deadline. We'll fix it quietly next quarter.\" Lotte's final assessment depends on Rick's satisfaction with her performance in the coming weeks. She thinks of the client who will make an investment decision tomorrow based on this report. Nobody else at the firm has seen the error, and Rick considers the conversation closed. Does Lotte go along with Rick's decision, or speak up anyway?",
  },
  "De foto die rondgaat": {
    titel: "The photo going around",
    verhaal:
      "In the friends' group chat a photo suddenly appears: a girl from school, clearly unaware she was being photographed, in a compromising situation at a party. Kevin, who shared it, writes: \"Don't forward this, it stays between us.\" Within a minute Sami, who also saw the photo, has already taken three screenshots. He doesn't know the girl personally, but sees how quickly this kind of thing normally spreads in the group. If he forwards it secretly, he becomes part of the problem. If he confronts Kevin, he risks the atmosphere in the group he has belonged to for years. If he reports it to school, everyone will soon know it was him. What does Sami do?",
  },
  "De klant aan de balie": {
    titel: "The customer at the desk",
    verhaal:
      "Aisha works at the library desk when a regular visitor refuses to be helped by her. \"I want someone who belongs here normally,\" he says loudly, pointing at her headscarf. Her colleague Ben is next to her and hears everything. The man comes weekly and donates regularly to the library's friends foundation — an important source of income. The manager is not present. Aisha feels her cheeks grow warm but keeps smiling, as she has learned to do. Ben knows a confrontation could anger the man, with possible consequences for the donation and the atmosphere on the floor. Does Ben step in, even if it leads to conflict, or leave Aisha to handle it alone?",
  },
  "De goedbetaalde bijbaan": {
    titel: "The well-paid side job",
    verhaal:
      "Mila receives a message: a fashion brand she once applied to offers her a part-time job at twice what she earns at the supermarket. From a documentary she watched last year she knows this brand has clothes made in factories with poor working conditions and a huge environmental impact. Her student debt is rising and her parents can't help. Friends say: \"Everyone buys there anyway — what difference does your job make?\" The contract is ready to sign; the start date is in two weeks. Mila scrolls through her documentary notes again, then to her bank account. Does she take the job, or keep looking for something that better matches what she values?",
  },
  "Het antwoordblaadje": {
    titel: "The answer sheet",
    verhaal:
      "During the midterm maths exam Noor sees, two rows ahead, how her friend Elif pulls a cheat sheet from her sleeve. They have known each other since the first year of secondary school; Elif helped her this year when Noor was struggling. The invigilator has just walked the other way. If Noor says nothing, it goes unnoticed and Elif may just pass. If she reports it, Elif may lose the entire exam and their trust. If she speaks to Elif afterwards, she still has to act on what she saw. Noor looks at her own answer sheet, where she left two questions unfinished while the clock keeps ticking. Does she report the cheating, even though it's her friend?",
  },
  "De review voor geld": {
    titel: "The review for money",
    verhaal:
      "Sven receives a private message from a web shop where he once bought headphones: a fifty-euro gift voucher in exchange for an \"honest, positive five-star review.\" The headphones fell apart after three weeks and customer service never replied to his email. Fifty euros is exactly what he needs for his energy bill this month. Nobody checks whether the review matches his experience; the system relies purely on his word. He opens the review page and sees hundreds of five-star reviews that now, on closer look, seem suspiciously similar. The voucher code is already waiting in his inbox. Does Sven write the positive review that doesn't match his experience, or leave the money?",
  },
  "Maar het zijn maar grapjes": {
    titel: "But they're just jokes",
    verhaal:
      "At the student house kitchen table housemate Ruben makes another joke — this time about Moroccan neighbours and \"what you come across there.\" The other housemates laugh along, as always. Yara, the only one who stays quiet, has shared this house with Ruben for two years and still has six months left on the same lease. Last week it was about women on bikes, the week before about a colleague with a disability. Each time someone says: \"Come on, they're just jokes, don't be so serious.\" Yara wonders if she is the only one who feels uncomfortable. Does she call Ruben out on what he says, or let it go like the others?",
  },
  "De goedkope trui": {
    titel: "The cheap jumper",
    verhaal:
      "In the shop a jumper hangs for six euros, even cheaper in the sale. Emma knows, from a school project on the clothing industry, that clothes in this price range are often made in factories where children work too — she looked up the figures herself for her assignment. Her own budget is tight; she is saving for a school trip and every euro counts. The jumper in her hands is exactly what she wanted, the right size and colour, nowhere else at this price. The cashier waits; the queue behind her grows longer. She thinks of the project she wrote herself and of the school trip she is saving for. Does Emma put the jumper back, or pay for it anyway?",
  },
  "De vraag van de leidinggevende": {
    titel: "The manager's request",
    verhaal:
      "Team leader Iris asks Bram to present the project results in the client meeting \"a bit more positively than they actually are\" — not lying, just \"shifting the emphasis.\" What she asks is not illegal and happens everywhere in the sector, she says. Bram collected the figures himself and knows the client is considering a follow-up contract based on exactly this outcome. Iris will hold his performance review next month and decide whether his temporary contract is made permanent. She is not waiting for a long answer; the presentation must be ready tomorrow morning. Bram opens the file and stares at the chart he made honestly. Does he do what Iris asks, or say that this goes against his own values?",
  },
  "De dakloze op straat": {
    titel: "The homeless man on the street",
    verhaal:
      "In front of the supermarket a man sits with a cardboard sign: \"Every euro helps, thank you.\" Julia has just worked out her whole weekly budget for the shopping she needs to do — exactly enough, not a euro to spare. She doesn't know the man's story: how long he has been here, what he does with the money, or whether he seeks help. Last week she read an article warning against giving money instead of food. She has no leftover bread, no extra pass for a warm meal, only her wallet with exactly enough for her own list. The queue at the checkout is visible from here. She can walk on, give something and cut a product from her own list, or go inside and buy something for him. What does Julia do, and why?",
  },
};

function parseCards(raw) {
  const categoryPattern =
    /^(WORK|DAILY LIFE|SOCIAL MEDIA|STUDENT LIFE|DIVERSITY & INCLUSION|SUSTAINABILITY|EDUCATION)\n\n(★.+)\n\n(.+?)\n\n([\s\S]+?)\n\nWat zou jij doen/gm;

  const cards = [];
  let match;
  let index = 0;

  while ((match = categoryPattern.exec(raw)) !== null) {
    index += 1;
    const [, categoryEn, , titel, body] = match;
    const complexityKey = match[2].includes("MACRO")
      ? "MACRO"
      : match[2].includes("MESO")
        ? "MESO"
        : "MICRO";
    const verhaal = body.replace(/\s+/g, " ").trim();
    const en = EN_TRANSLATIONS[titel.trim()];
    if (!en) throw new Error(`Geen EN-vertaling voor: ${titel.trim()}`);

    const { complexiteit, moeilijkheid } = COMPLEXITY_MAP[complexityKey];

    cards.push(
      normalizeCard({
        id: `GK_BG_${String(index).padStart(2, "0")}`,
        set: "burgerschap",
        stap: 1,
        categorie: CATEGORY_MAP[categoryEn],
        moeilijkheid,
        complexiteit,
        taalniveau: "B2",
        status: "getest",
        nl: {
          titel: titel.trim(),
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
          bron: "gesprekskaarten-burgerschap.docx",
          categorieEn: categoryEn,
        },
      })
    );
  }

  if (cards.length !== 15) {
    throw new Error(`Verwacht 15 kaarten, gevonden ${cards.length}`);
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
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(root, "_import/burgerschap-parsed.json"), JSON.stringify(newCards, null, 2));
console.log(`Toegevoegd: ${newCards.length} burgerschapskaarten (${merged.length} totaal)`);
newCards.forEach((c) =>
  console.log(`  ${c.id}  ${c.complexiteit.padEnd(5)}  ${c.categorie.padEnd(20)}  ${c.nl.titel}  (${c.meta.woordenNl}w)`)
);
