/**
 * Importeert gesprekskaarten uit gesprekskaarten_nuclear_medicine.docx (HEROES).
 * Run: node scripts/import-nuclear-medicine.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeCard, wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawPath = path.join(root, "_import/nuclear-medicine-raw.txt");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");

const COMPLEXITY_MAP = {
  MICRO: "micro",
  MESO: "meso",
  MACRO: "macro",
};

/** NL-vertalingen (bron: EN in docx) */
const NL_TRANSLATIONS = {
  "Thirty Minutes Ago": {
    titel: "Dertig minuten geleden",
    verhaal:
      "Sanne werpt een blik op het rooster voordat de deur opengaat. Kamer 3, volgende patiënt — longkanker, vanmorgen vastgesteld. Dertig minuten geleden, misschien minder. De scan moet vandaag nog; de chirurgen hebben hem nodig om de resectie te plannen, en elk uur dat het tracer afbreekt is een verloren uur. Na deze patiënt heeft ze er nog vier en een technoloog is ziek thuis. De vrouw die binnenkomt ziet er uitgehold uit, haar handen trillen terwijl ze een informed-consentformulier tekent dat ze waarschijnlijk niet heeft gelezen. Sanne wil even bij haar zitten, de stilte laten ademen voordat de camera start. Maar de gang buiten vult zich al met de volgende afspraak. Ze legt de vrouw op de tafel, houdt haar stem zacht en zet de timer in haar hoofd. Hoeveel van zichzelf kan ze deze patiënt geven in twaalf minuten?",
  },
  "The First Person Who Asks": {
    titel: "De eerste die het vraagt",
    verhaal:
      'Meneer Verhoeven is achtentachtig en vandaag is het zijn eerste PET/CT sinds de diagnose. Erik roept hem binnen, legt de injectie uit, het uur wachten, de scanner. Halverwege schudt de oudere man zijn hoofd. "Ik wil dit niet," zegt hij zacht. "Niemand heeft me gevraagd wat ik wil. Ze vertellen me alleen wat de volgende stap is." Erik is, feitelijk, de eerste persoon met wie hij sinds het begin van de behandeling spreekt die hem niet naar de volgende stap duwt. Hij zou nu de tijd kunnen nemen — echt luisteren, vragen wat "dit niet willen" betekent. Maar het tracer breekt al af in het flacon boven, en drie patiënten wachten, waaronder een wiens afspraak volledig verdwijnt als dit tijdslot uitloopt. Erik schuift toch een stoel aan. Ergens verderop in de gang gaat een telefoon. Gaat hij zitten, of roept hij het af?',
  },
  "What She Would Trade For": {
    titel: "Waar zij het voor ruilde",
    verhaal:
      "Eva is elf en heeft weken over, geen maanden. De bloedmonsters zijn nog steeds nodig — om de cijfers te volgen die het team vertellen hoeveel pijnbestrijding haar lichaam nog aankan. Ze vocht vroeger tegen de naald met alles wat ze had, kronkelde weg van iedereen die bij haar katheter kwam. Ergens onderweg ontstond een onuitgesproken afspraak: iets meer morfine, iets meer comfort, in ruil voor stil blijven liggen. Mira weet hoe dit er van buitenaf uitziet. Ze weet ook hoe onbehandelde pijn eruitziet bij een kind dat het niet meer kan beschrijven. Niemand schreef dit in een protocol; het groeide uit twee mensen die keer op keer dezelfde onmogelijke middag doorkwamen. Toen Eva stierf, stond de helft van het team achterin een kleine begrafenis, onzeker of ze er hoorde, zeker dat ze niet weg konden blijven. Hoe noem je wat er in die kamer gebeurde?",
  },
  "Between Compressions": {
    titel: "Tussen de compressies",
    verhaal:
      'De compressies stoppen voor niemand, zelfs niet voor een bloedafname. Tomas knielt naast de brancard en wacht op het halve seconde venster tussen borst omlaag en borst omhoog. Hij heeft een kaliumwaarde nodig — schoon, niet verontreinigd, geen hemolyse — omdat dat getal kan beslissen of het team doorgaat of stopt. Te langzaam prikken, te veel stasis, en het resultaat liegt: het zegt dat het hart niet gered kan worden terwijl dat misschien nog wel kan. Snel en slordig prikken om maar een getal te hebben, en dezelfde fout gebeurt andersom. Iemand achter hem zegt "we hebben dat kalium nodig", alsof het een formaliteit is. Tomas weet dat het dat niet is. Hij heeft één kans, één ader, en een zaal vol mensen die handelen naar wat het lab straks zegt. Hoe zeker moet hij zijn voordat hij hen laat stoppen?',
  },
};

function parseCards(raw) {
  const pattern =
    /WORK\s+★[☆★]+\s+(MICRO|MESO|MACRO)[^\n]*\n\n([^\n]+)\n\n([\s\S]+?)\n+\s*What would you do/gm;

  const cards = [];
  let match;
  let index = 0;

  while ((match = pattern.exec(raw)) !== null) {
    index += 1;
    const complexityKey = match[1];
    const titelEn = match[2].trim();
    const verhaalEn = match[3].replace(/\s+/g, " ").trim();
    const nl = NL_TRANSLATIONS[titelEn];
    if (!nl) throw new Error(`Geen NL-vertaling voor: ${titelEn}`);

    cards.push(
      normalizeCard({
        id: `GK_NM_${String(index).padStart(2, "0")}`,
        set: "nucleaire-geneeskunde",
        stap: 1,
        categorie: "nucleaire-geneeskunde",
        complexiteit: COMPLEXITY_MAP[complexityKey],
        taalniveau: "C1",
        status: "getest",
        nl: {
          titel: nl.titel,
          verhaal: nl.verhaal,
          vraag1: "Wat zou jij doen en waarom?",
          vraag2: "Welke waarden zijn hier in het spel?",
        },
        en: {
          titel: titelEn,
          verhaal: verhaalEn,
          vraag1: "What would you do, and why?",
          vraag2: "Which values are at play?",
        },
        assets: {
          afbeelding: null,
          fireflyPrompt: null,
          pdfNl: null,
          pdfEn: null,
        },
        meta: {
          woordenNl: wordCount(nl.verhaal),
          woordenEn: wordCount(verhaalEn),
          bron: "gesprekskaarten_nuclear_medicine.docx",
          categorieEn: "NUCLEAR MEDICINE",
          project: "HEROES",
        },
      })
    );
  }

  if (cards.length !== 4) {
    throw new Error(`Verwacht 4 kaarten, gevonden ${cards.length}`);
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
  path.join(root, "_import/nuclear-medicine-parsed.json"),
  JSON.stringify(newCards, null, 2)
);
console.log(`Toegevoegd: ${newCards.length} nucleaire-geneeskunde kaarten (${merged.length} totaal)`);
newCards.forEach((c) =>
  console.log(
    `  ${c.id}  ${c.complexiteit.padEnd(5)}  ${c.categorie.padEnd(22)}  ${c.nl.titel}  (${c.meta.woordenNl}w)`
  )
);
