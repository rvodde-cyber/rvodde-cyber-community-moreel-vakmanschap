// Alle lopende teksten van de scan. Eén bestand, zodat redigeren geen
// zoektocht door componenten wordt (briefing §9: uitbreidbaar houden).

import { brand, CONTACT_INFO } from "./brand";
import { ShareCodeError } from "../lib/shareCode";

export const landing = {
  eyebrow: brand.tagline,
  title: brand.productName,
  intro:
    "Vier bladeren, twintig stellingen, ongeveer tien minuten. Deze scan maakt zichtbaar welk domein in uw organisatie op dit moment de meeste aandacht vraagt — en waar een verdiepend gesprek het meeste oplevert.",
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
      "Deze scan werkt het best wanneer meerdere mensen hem invullen: ieder op het eigen scherm, ieder voor zich. U ziet daarna uw eigen uitkomst. Wilt u ook een teambeeld, dan stuurt iedereen zijn deel-code naar één iemand die daar het teamresultaat van samenstelt — dat kan elk teamlid zijn, het hoeft niet de leidinggevende te zijn.",
    bullets: [
      "Vul in vanuit wat u hier ziet gebeuren, niet vanuit hoe het zou moeten zijn.",
      "Er zijn geen goede of foute antwoorden en er is geen totaalcijfer.",
      "Uw antwoorden blijven op dit apparaat. Er wordt niets opgeslagen en niets verstuurd.",
    ],
  },
  session: {
    title: "Bedrijfsnaam",
    // Briefing §10: bevestigd dat de bedrijfsnaam wordt ingevuld. Hij dient als
    // label op de PDF en als leesbaar voorvoegsel bij de deel-code.
    required: true,
    hint: "Komt op uw PDF te staan en vooraan uw deel-code, zodat de verzamelaar codes van hetzelfde bedrijf herkent.",
    placeholder: "Bijvoorbeeld: Van Dijk Techniek",
    label: "Bedrijfsnaam",
    missing: "Vul eerst de bedrijfsnaam in.",
  },
  privacyNote:
    "Geen inlog, geen account, geen opslag. De scan draait volledig in uw browser; er verlaat niets dit apparaat behalve wat u zelf doorstuurt.",
  startLabel: "Start de scan",
  durationLabel: "8–15 minuten",
  collectorLink: "Codes ontvangen? Stel hier het teamresultaat samen",
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
  individual: {
    eyebrow: "Uw klavertje",
    badge: "Individueel resultaat",
    intro: "Dit is uw eigen beeld. Niemand anders ziet het, tenzij u het zelf deelt.",
  },
  team: {
    eyebrow: "Het klavertje van het team",
    badge: "Teamresultaat",
    intro: (count) =>
      `Gemiddelde over ${count} ${count === 1 ? "invulling" : "invullingen"}. Individuele antwoorden zijn hierin niet terug te zien.`,
  },
  // Briefing §3: expliciete disclaimer bij zowel het individuele als het
  // teamresultaat. Formulering bewust plaatsonafhankelijk, want dezelfde zin
  // staat op het scherm en in de voettekst van de PDF.
  disclaimer:
    "Dit is een indicatie op basis van twintig stellingen, geen diagnose. Het beeld is een startpunt voor een gesprek — geen oordeel over uw organisatie.",
  legend: "Hoe slapper het blad, hoe meer aandacht dat domein nu vraagt.",
  tooltipHint: "Tik of beweeg over een blad voor de toelichting.",
  perLeafTitle: "Per blad",
  restartLabel: "Opnieuw invullen",
  pdfLabel: "Download samenvatting (PDF)",
  pdfBusyLabel: "Bezig met samenstellen…",
  pdfErrorLabel: "Het downloaden lukte niet. Probeer het opnieuw.",
  toCollectorLabel: "Teamresultaat samenstellen",
  backToStartLabel: "Terug naar het begin",
};

// Het deel-codeblok op het individuele resultaatscherm (briefing §5.A, stap 5).
export const share = {
  title: "Uw deel-code",
  body:
    "Wilt u dat uw invulling meetelt in een teambeeld? Stuur deze code naar wie het teamresultaat samenstelt — via WhatsApp, mail of Slack. De code bevat alleen uw antwoorden: geen naam, geen apparaatgegevens.",
  copyLabel: "Kopieer code",
  copiedLabel: "Gekopieerd",
  copyFailed: "Kopiëren lukte niet — selecteer de code en kopieer hem handmatig.",
  skipNote: "Liever niet delen? Dan slaat u dit gewoon over; uw eigen resultaat blijft gewoon staan.",
};

// Het scherm waar de verzamelaar de codes samenvoegt (briefing §5.B).
export const collector = {
  eyebrow: "Teamresultaat",
  title: "Teamresultaat samenstellen",
  intro:
    "Plak hieronder de ontvangen deel-codes, één per regel. De berekening gebeurt in uw eigen browser: er wordt niets verstuurd en niets opgeslagen.",
  label: "Deel-codes",
  placeholder: "ACME-A7X2K9M4P1Z3\nACME-A3B8L2N6Q4R7",
  countLabel: (valid, total) =>
    `${valid} van ${total} ${total === 1 ? "code" : "codes"} gelezen`,
  singleWarning:
    "Met één code is dit nog geen teambeeld: het toont dan simpelweg de invulling van die ene persoon.",
  mixedPrefixWarning:
    "Er zitten codes van verschillende bedrijfsnamen tussen. Controleer of ze echt bij dezelfde scan horen.",
  duplicateWarning:
    "Sommige codes zijn identiek. Dat kan kloppen, maar controleer of iemand zijn code niet dubbel heeft gestuurd.",
  emptyHint: "Nog geen codes geplakt.",
  submitLabel: "Bekijk het teamresultaat",
  backLabel: "Terug",
  errorHeading: "Deze regels konden niet gelezen worden",
  errorHint: "Vraag de betreffende invuller om de code opnieuw te sturen, of plak hem nog eens volledig.",
  lineLabel: (line) => `Regel ${line}`,
  errors: {
    [ShareCodeError.EMPTY]: "Lege regel.",
    [ShareCodeError.MALFORMED]: "Onbekende tekens in de code.",
    [ShareCodeError.WRONG_LENGTH]: "De code is te kort of te lang — waarschijnlijk niet volledig gekopieerd.",
    [ShareCodeError.UNKNOWN_VERSION]: "Deze code komt uit een andere versie van de scan.",
    [ShareCodeError.CHECKSUM]: "Er zit een typefout in de code.",
    [ShareCodeError.OUT_OF_RANGE]: "De code bevat een ongeldig antwoord.",
  },
};

// De vier mogelijke hoofdconclusies (briefing §5 stap 9 en §6).
export const conclusions = {
  single: {
    title: (names) => `${names[0]} vraagt nu de meeste aandacht`,
    body: (names) =>
      `Van de vier bladeren hangt ${names[0].toLowerCase()} er het slapst bij. Dat maakt dit het meest kansrijke startpunt: hier is de kans het grootst dat een gesprek meteen iets losmaakt.`,
  },
  tie: {
    title: (names) => `${joinNames(names)} vragen even veel aandacht`,
    body: () =>
      "Deze bladeren scoren gelijk als laagste. Ze zijn even urgent; welke u als eerste oppakt, hangt af van wat op dit moment praktisch haalbaar is — en van waar u de meeste beweging verwacht.",
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
  // Zolang CONTACT_INFO leeg is, staat hier een zichtbare placeholder in plaats
  // van een dode knop (briefing §10).
  placeholder: CONTACT_INFO.placeholder,
};

export const pdf = {
  title: brand.productName,
  individualSubtitle: "Individueel resultaat",
  teamSubtitle: (count) => `Teamresultaat — gebaseerd op ${count} individuele ${count === 1 ? "invulling" : "invullingen"}`,
  conclusionHeading: "Hoofdconclusie",
  leavesHeading: "De vier bladeren",
  nextStepHeading: "Volgende stap",
  disclaimer: result.disclaimer,
};

export const sources = {
  title: "Waar de stellingen op gebaseerd zijn",
  intro:
    "Per blad zijn de stellingen geïnspireerd op een gevalideerd instrument uit de organisatiepsychologie of bedrijfsethiek. Ze zijn hertaald naar de praktijk van een MKB-organisatie, niet letterlijk overgenomen.",
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
