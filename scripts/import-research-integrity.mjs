/**
 * Importeert gesprekskaarten uit gesprekskaarten_research_integrity_1.docx (HEROES).
 * Run: node scripts/import-research-integrity.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeCard, wordCount } from "./gesprekskaarten-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawPath = path.join(root, "_import/research-integrity-raw.txt");
const cardsPath = path.join(root, "src/data/gesprekskaarten/cards.json");

const COMPLEXITY_MAP = {
  MICRO: "micro",
  MESO: "meso",
  MACRO: "macro",
};

/** NL-vertalingen (bron: EN in docx) */
const NL_TRANSLATIONS = {
  "The Order of Names": {
    titel: "De volgorde van de namen",
    verhaal:
      'Lotte heeft veertien maanden aan dit artikel gewerkt — elk experiment, elke tabel, elke late avond waarin ze de discussiesectie herschreef. Haar promotor, professor Dekker, leest de definitieve versie in stilte en schuift het dan over het bureau terug. "Zet mijn naam eerst," zegt hij, zonder op te kijken. "Zo werkt het hier." Ze kent de normen: senior authorship betekent prestige, haalt de volgende subsidie binnen, houdt haar contractverlenging op zijn bureau in plaats van op dat van iemand anders. Haar naam zou nog wel verschijnen — derde, misschien vierde, begraven waar sollicitatiecommissies zelden kijken. Ze denkt aan de data die ze alleen in het weekend verzamelde, aan resultaten die onmiskenbaar van haar zijn. Weigeren kan haar de postdoc kosten die ze nodig heeft. Tekenen kan haar het enige kosten dat ze echt bezit. Ze opent de auteurslijst en zweeft boven de eerste regel. Wat doet ze?',
  },
  "The Extra Name on the List": {
    titel: "De extra naam op de lijst",
    verhaal:
      'Het manuscript is klaar, gereviewd, geaccepteerd — tot er een e-mail binnenkomt van de uitgever. Een senior editor bij een partnerinstelling wil graag worden toegevoegd aan de redactieraad voor dit speciale nummer. Hij heeft geen enkel manuscript beoordeeld, geen enkele vergadering bijgewoond, geen enkel artikel gelezen. Maar zijn universiteit betaalt de open-accesskosten voor het hele nummer, en de contractverlenging is volgende maand aan de beurt. "Het is maar een naam op een pagina," zegt de managing editor, niet helemaal iemand in de ogen kijkend. De echte editors, die maandenlang manuscripten lazen en reviewers achteraan jaagden, zeggen eerst niets. Weigeren kan betekenen dat de financiering verdwijnt waarmee het tijdschrift gratis blijft voor auteurs. Instemmen betekent stilletjes herschrijven wie het werk deed. De deadline voor de definitieve redactielijst is morgen twaalf uur. Iemand moet antwoorden op de e-mail.',
  },
  "The Same Result, Twice": {
    titel: "Hetzelfde resultaat, twee keer",
    verhaal:
      "Dr. Willemsens dataset van drie jaar geleden is solide — peer-reviewed, gepubliceerd, af. Maar de financieringscyclus sluit nooit echt. Ze past een variabele aan, herformuleert de onderzoeksvraag een beetje, dient het in als een nieuw voorstel. De commissie, die niet weet dat het bijna volledig overlapt met haar vorige gefinancierde project, keurt het goed. Ze presenteert de \"nieuwe\" bevindingen op een conferentie in Lissabon, en daarna, anders geformuleerd, in Porto. Niemand die haar aanvraag beoordeelt, ziet de eerdere versie; niemand die aan het podium applaudisseert, weet het ook. Elke subsidie financiert echt werk — reizen, een onderzoeksassistent, een paar maanden ademruimte. Niets aan de cijfers is verzonnen. Alleen het kader blijft verschuiven, net genoeg om nieuw te lijken. Ze is al bezig met de volgende herindiening wanneer de nieuwsbrief van het financieringsorgaan meldt dat dubbele indieningen strakker worden gecontroleerd. Wat gebeurt er als iemand de versies eindelijk naast elkaar legt?",
  },
};

function parseCards(raw) {
  const pattern =
    /EDUCATION\s+★[☆★]+\s+(MICRO|MESO|MACRO)[^\n]*\n\n([^\n]+)\n\n([\s\S]+?)\n+\s*What would you do/gm;

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
        id: `GK_RI_${String(index).padStart(2, "0")}`,
        set: "onderzoeksintegriteit",
        stap: 1,
        categorie: "onderzoeksintegriteit",
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
          bron: "gesprekskaarten_research_integrity_1.docx",
          categorieEn: "RESEARCH INTEGRITY",
          project: "HEROES",
        },
      })
    );
  }

  if (cards.length !== 3) {
    throw new Error(`Verwacht 3 kaarten, gevonden ${cards.length}`);
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
  path.join(root, "_import/research-integrity-parsed.json"),
  JSON.stringify(newCards, null, 2)
);
console.log(`Toegevoegd: ${newCards.length} onderzoeksintegriteit kaarten (${merged.length} totaal)`);
newCards.forEach((c) =>
  console.log(
    `  ${c.id}  ${c.complexiteit.padEnd(5)}  ${c.categorie.padEnd(22)}  ${c.nl.titel}  (${c.meta.woordenNl}w)`
  )
);
