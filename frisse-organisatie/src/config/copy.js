// Alle lopende teksten van de scan. Eén bestand, zodat redigeren geen
// zoektocht door componenten wordt (briefing §9: uitbreidbaar houden).

import { brand } from "./brand";

export const landing = {
  eyebrow: brand.tagline,
  title: brand.productName,
  intro:
    "Vier bladeren, twaalf stellingen, ongeveer tien minuten. Deze scan maakt zichtbaar welk domein in uw organisatie op dit moment de meeste aandacht vraagt — en waar een verdiepend gesprek het meeste oplevert.",
  metaphor: {
    title: "Waarom een klavertje vier",
    body:
      "Elk blad staat voor één domein: integriteit, samenwerking, structuur en leiderschap. Ze horen bij elkaar, maar ze staan er zelden even goed bij. Het blad dat er het slapst bij hangt, vraagt nu het eerst om water.",
  },
  // Briefing §3: expliciete invulinstructie, want een scan die alleen door de
  // leidinggevende wordt ingevuld meet de perceptie van één persoon.
  instruction: {
    title: "Vul dit niet alleen in",
    body:
      "Deze scan werkt het best wanneer meerdere mensen hem invullen: samen als team, of ieder afzonderlijk met dezelfde sessiecode. Wordt hij alleen door de leidinggevende ingevuld, dan meet u het beeld van één persoon en niet dat van de organisatie.",
    bullets: [
      "Vul in vanuit wat u hier ziet gebeuren, niet vanuit hoe het zou moeten zijn.",
      "Er zijn geen goede of foute antwoorden en er is geen totaalcijfer.",
      "Uw antwoorden worden niet per persoon bewaard.",
    ],
  },
  session: {
    title: "Sessiecode of bedrijfsnaam",
    // Wel/geen verplichting is een open beslissing (briefing §10); daarom hier
    // als vlag, niet verspreid in de formulierlogica.
    required: false,
    optionalHint: "Optioneel. Handig als meerdere mensen dezelfde scan invullen, of voor het vervolggesprek.",
    requiredHint: "Nodig om de resultaten van meerdere invullers bij elkaar te houden.",
    placeholder: "Bijvoorbeeld: Van Dijk Techniek, mei-sessie",
    label: "Sessiecode of bedrijfsnaam",
  },
  privacyNote:
    "Er is geen inlog. Er worden geen antwoorden opgeslagen die naar een persoon te herleiden zijn — alleen de sessiecode en de gemiddelden per blad.",
  startLabel: "Start de scan",
  durationLabel: "8–15 minuten",
};

export const scan = {
  progressLabel: (current, total) => `Stelling ${current} van ${total}`,
  backLabel: "Vorige",
  nextLabel: "Volgende",
  finishLabel: "Bekijk het resultaat",
  skipHint: "Kies de optie die er het dichtst bij komt.",
  unansweredHint: "Kies eerst een antwoord.",
};

export const result = {
  eyebrow: "Uw klavertje",
  // Briefing §3: expliciete disclaimer bij het resultaat.
  // Formulering bewust plaatsonafhankelijk: dezelfde zin staat op het scherm
  // onder het klavertje en in de voettekst van de PDF.
  disclaimer:
    "Dit is een indicatie op basis van twaalf stellingen, geen diagnose. Het beeld is een startpunt voor een gesprek — geen oordeel over uw organisatie.",
  legend: "Hoe slapper het blad, hoe meer aandacht dat domein nu vraagt.",
  tooltipHint: "Tik of beweeg over een blad voor de toelichting.",
  perLeafTitle: "Per blad",
  restartLabel: "Opnieuw invullen",
  pdfLabel: "Download samenvatting (PDF)",
  pdfBusyLabel: "Bezig met samenstellen…",
  pdfErrorLabel: "Het downloaden lukte niet. Probeer het opnieuw.",
  savingLabel: "Resultaat opslaan…",
  savedLabel: "Resultaat opgeslagen bij deze sessiecode.",
  saveErrorLabel: "Het resultaat kon niet worden opgeslagen. Uw scan blijft gewoon zichtbaar.",
};

// De vier mogelijke hoofdconclusies (briefing §5 stap 4 en §6).
export const conclusions = {
  single: {
    title: (names) => `${names[0]} vraagt nu de meeste aandacht`,
    body: (names) =>
      `Van de vier bladeren hangt ${names[0].toLowerCase()} er het slapst bij. Dat maakt dit het meest kansrijke startpunt: hier is de kans het grootst dat een gesprek meteen iets losmaakt.`,
  },
  tie: {
    title: (names) => `${joinNames(names)} vragen even veel aandacht`,
    body: (names) =>
      `Deze bladeren scoren gelijk als laagste. Ze zijn even urgent; welke u als eerste oppakt, hangt af van wat op dit moment praktisch haalbaar is — en van waar u de meeste beweging verwacht.`,
  },
  balancedStrong: {
    title: () => "Geen van de vier springt eruit",
    body: () =>
      "De vier bladeren staan er ongeveer even goed bij. Dat is een gunstig beeld — en tegelijk zelf ook een signaal: waar alles gemiddeld goed scoort, is het de moeite waard om te controleren of de scan door genoeg verschillende mensen is ingevuld.",
  },
  balancedLow: {
    title: () => "Meerdere domeinen vragen tegelijk aandacht",
    body: () =>
      "De vier bladeren liggen dicht bij elkaar, maar staan er geen van alle sterk bij. Eén blad uitlichten zou hier misleidend zijn. Dit vraagt eerder om een gesprek over het geheel dan om één verdiepend instrument.",
  },
};

export const cta = {
  singleTitle: "Een logische volgende stap",
  multiTitle: "Logische volgende stappen",
  broadTitle: "Een logische volgende stap",
  broadBody:
    "Omdat er geen enkel blad uitspringt, is een breed verkennend gesprek zinvoller dan één verdiepend instrument. Neem het resultaat mee en bespreek waar u zelf de meeste urgentie voelt.",
  contactLabel: "Neem contact op",
  instrumentLabel: (name) => `Meer over ${name}`,
  // Zonder ingevulde href of contactgegevens toont de app deze regel in plaats
  // van een dode knop. Exacte vorm van de doorverwijzing is nog open (§10).
  placeholderNote:
    "De doorverwijzing naar dit instrument wordt vóór livegang ingesteld (link, contactformulier of e-mail).",
};

export const pdf = {
  title: brand.productName,
  subtitle: brand.tagline,
  conclusionHeading: "Hoofdconclusie",
  leavesHeading: "De vier bladeren",
  nextStepHeading: "Volgende stap",
  disclaimer: result.disclaimer,
};

export const qualitativeLabels = {
  vitaal: "staat er goed bij",
  aandacht: "vraagt aandacht",
  urgent: "vraagt met voorrang aandacht",
};

function joinNames(names) {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} en ${names[names.length - 1]}`;
}

export { joinNames };
