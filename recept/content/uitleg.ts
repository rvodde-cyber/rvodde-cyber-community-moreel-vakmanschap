import { EPISODES, type EpisodeId } from '@data/episodes/meta';

export type UitlegSectionId =
  | 'rol'
  | 'stappen'
  | 'onderzoek'
  | 'beslissingen'
  | 'budget'
  | 'meters'
  | 'tafel'
  | 'jaren'
  | 'tips'
  | 'praktisch'
  | 'bronnen';

export const UITLEG_KICKER = 'EEN HR-DRAMA IN VIJF AFLEVERINGEN';
export const UITLEG_H1 = 'Zo speel je Recept';
export const UITLEG_LEAD =
  'Jullie beslissen als team over een bedrijf dat in veertig jaar uitgroeit van een schuur tot een concern. Lees dit in drie minuten. Daarna weten jullie wat er van jullie wordt gevraagd.';

export const UITLEG_NAV: { id: UitlegSectionId; label: string }[] = [
  { id: 'rol', label: 'Jullie rol en de context' },
  { id: 'stappen', label: 'Zo loopt een deel' },
  { id: 'onderzoek', label: 'Het onderzoek' },
  { id: 'beslissingen', label: 'De beslissingen' },
  { id: 'budget', label: 'Budget en kosten' },
  { id: 'meters', label: 'De meters' },
  { id: 'tafel', label: 'De tafelgesprekken' },
  { id: 'jaren', label: 'Door de jaren' },
  { id: 'tips', label: 'Waar let je op' },
  { id: 'praktisch', label: 'Praktisch' },
  { id: 'bronnen', label: 'Waar is dit op gebaseerd' },
];

export const UITLEG_STAPPEN = [
  {
    nr: 1,
    titel: 'Kijk',
    tekst:
      'Een korte openingsscène start vanzelf. Lees mee wat er hardop wordt gezegd en wat er onder tafel wordt geschreven of geappt.',
  },
  {
    nr: 2,
    titel: 'Onderzoek',
    tekst: 'Jullie krijgen vijf onderzoeken. Kies er maximaal drie.',
  },
  {
    nr: 3,
    titel: 'Beslis',
    tekst:
      'Jullie krijgen vier interventies. Kies er twee, binnen het budget. Iedereen in het team heeft een stem.',
  },
  {
    nr: 4,
    titel: 'Leg uit',
    tekst:
      'Schrijf waarom jullie deze twee kiezen en wat het sterkste argument is om het juist niet te doen.',
  },
  {
    nr: 5,
    titel: 'Praat',
    tekst: 'In ronde 1 komt er een gesprekskaart. Jullie praten twee minuten en leggen één zin vast.',
  },
  {
    nr: 6,
    titel: 'Kijk terug',
    tekst: 'Jullie lezen wat er gebeurde en zien wat er met de meters is gebeurd.',
  },
] as const;

export const UITLEG_METERS = [
  { meter: 'Productiviteit', uitleg: 'Hoeveel het bedrijf produceert per mens', goed: 'Omhoog' },
  { meter: 'Betrokkenheid', uitleg: 'Hoe verbonden mensen zich voelen', goed: 'Omhoog' },
  { meter: 'Verzuim', uitleg: 'Het percentage mensen dat ziek of afwezig is', goed: 'Omlaag' },
  { meter: 'Verloop', uitleg: 'Het percentage mensen dat vertrekt', goed: 'Omlaag' },
  { meter: 'Budgetrest', uitleg: 'Wat er over is van het budget', goed: 'Omhoog' },
] as const;

/** Korte beschrijving per deel (zonder herhaling van meta.titel). */
const UITLEG_SPEELT: Record<EpisodeId, string> = {
  1: 'Een bestelling van tien keer zoveel; alles nog met de hand.',
  2: 'De band loopt; mensen willen meepraten.',
  3: 'Drie vestigingen en steeds meer cijfers.',
  4: 'Werk wordt gemeten, en de bureaucratie groeit.',
  5: 'Een investeerder wil antwoord.',
};

const UITLEG_BEDRIJF: Record<EpisodeId, string> = {
  1: 'De schuur in Berkel-Enschot',
  2: 'Een werkplaats in Loven, Tilburg',
  3: 'Van Gorp Machinebouw B.V.',
  4: 'Van Gorp Drones, Vossenberg',
  5: 'Van Gorp Groep',
};

/** Rijen: titels uit aflevering-meta; beschrijving in kolom “Wat speelt er”. */
export const UITLEG_TIJDLIJN = EPISODES.map((e) => ({
  deel: e.id,
  jaar: e.jaar,
  titel: e.titel,
  speelt: UITLEG_SPEELT[e.id],
  bedrijf: UITLEG_BEDRIJF[e.id],
}));

export const UITLEG_BRONNEN_INTRO =
  'De meters en keuzes in Recept zijn gebaseerd op onderzoek naar werkdruk en hulpbronnen, high-performance werksystemen, betrokkenheid en organisatiegroei. De ethische vragen komen uit onderzoek naar morele besluitvorming.';

export const UITLEG_BRONNEN = [
  'Appelbaum, E., Bailey, T., Berg, P., & Kalleberg, A. L. (2000). Manufacturing advantage: Why high-performance work systems pay off. Cornell University Press.',
  'Bakker, A. B., & Demerouti, E. (2017). Job demands–resources theory: Taking stock and looking forward. Journal of Occupational Health Psychology, 22(3), 273–285. https://doi.org/10.1037/ocp0000056',
  'Greiner, L. E. (1972). Evolution and revolution as organizations grow. Harvard Business Review, 50(4), 37–46.',
  'Harter, J. K., Schmidt, F. L., & Hayes, T. L. (2002). Business-unit-level relationship between employee satisfaction, employee engagement, and business outcomes: A meta-analysis. Journal of Applied Psychology, 87(2), 268–279. https://doi.org/10.1037/0021-9010.87.2.268',
  'Tenbrunsel, A. E., & Messick, D. M. (2004). Ethical fading: The role of self-deception in unethical behavior. Social Justice Research, 17(2), 223–236. https://doi.org/10.1023/B:SORE.0000027411.35832.53',
] as const;

export type UitlegBody = {
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  numbered?: readonly string[];
  overrideA4?: readonly string[];
};

export const UITLEG_BODY: Record<UitlegSectionId, UitlegBody> = {
  rol: {
    paragraphs: [
      "Jullie spelen de jongere zus van Harrie van Gorp. Harrie begon in de schuur in Berkel-Enschot met worstenbroodjes. Jullie hebben veel zeggenschap, maar werken op de achtergrond. Jullie zijn er niet bij op feestjes, niet op de foto's en niet bij het gekibbel. Elk team kiest zelf haar naam.",
      'Van Gorp groeit mee met de tijd: eerst een schuur met een handvol mensen, dan een werkplaats, een bv met drie vestigingen, een dronefabriek en uiteindelijk een groep met een investeerder. Elk deel speelt in een ander jaar. Het bedrijf verandert, de mensen veranderen, en de vragen worden groter.',
      'Het MT vergadert. Jullie beslissen. Harrie, Lies, Gerrit en de anderen geven advies, werken tegen of zwijgen. Bij de notaris is vastgelegd dat jullie het laatste woord hebben over het budget: 8 punten per ronde. Verder reikt jullie macht niet. Er is geen eindcijfer waar jullie naar jagen. Het gaat erom dat jullie merken wat jullie keuzes met mensen en met het bedrijf doen.',
    ],
  },
  stappen: {
    paragraphs: [
      'Een deel (aflevering) heeft twee rondes. In elke ronde doen jullie dezelfde zes stappen.',
      'In ronde 2 komt er vóór de uitkomst een privébericht aan jullie. Dat is een persoonlijk dilemma dat los staat van de rest. Daarover beslist ieder voor zich, met een korte reden.',
      'Als jullie op "Einde van dit deel" drukken, volgt een slotscène. Daarna komt een pauzekaart met tafelvragen en een voorspelling. Neem daar even de tijd voor.',
    ],
    overrideA4: [
      'In deel 4 komen vijf kaarten in plaats van vier; jullie kiezen er nog steeds twee. De gesprekskaart in ronde 1 staat in de demo uit.',
    ],
  },
  onderzoek: {
    paragraphs: [
      'Voordat jullie beslissen, kunnen jullie onderzoek doen. Elk onderzoek geeft een bevinding en een regel met pijlen, bijvoorbeeld ▲ TEMPO ▼ KWALITEIT. Een pijl omhoog betekent dat dit onderwerp sterk of gunstig is, een pijl omlaag betekent dat het onder druk staat. Kies maximaal drie. Het onderzoek zelf telt niet mee voor de score. Het helpt jullie kiezen, en jullie moeten het dus ook niet alleen als oplossing lezen.',
    ],
    overrideA4: [
      'In deel 4 kiezen jullie maximaal drie onderzoeken uit de tegels; het vermoeden koppelt jullie aan een van de opties op het scherm.',
    ],
  },
  beslissingen: {
    paragraphs: [
      'Elke interventie is een maatregel die jullie kunnen opdragen. Op elke kaart staan: een naam en een korte omschrijving; de kosten (€, €€ of €€€); de verwachte effecten op de meters; soms een effect dat pas in de volgende ronde doorwerkt.',
      'Lees eerst alle kaarten en praat erover voordat jullie kiezen. Er is geen juiste combinatie. Elke keuze heeft een prijs, ook als die niet in geld staat.',
    ],
    overrideA4: [
      "In deel 4 kiezen jullie twee maatregelen uit vijf kaarten. Naast die kaarten verdelen jullie ook een begroting over vaste posten in euro's.",
    ],
  },
  budget: {
    paragraphs: [
      "Jullie hebben per ronde een budget in punten. Elke kaart kost iets: € kost 3 punten, €€ kost 5 punten en €€€ kost 6 punten. Jullie hebben 8 punten per ronde. Dus € en €€ samen mag (8), maar twee keer €€ (10) niet. Het budget wordt getoond in de munt van de tijd: guldens in 1984 en 1996, euro's vanaf 2009. De punten blijven overal hetzelfde. Wat jullie overhouden, telt mee als budgetrest.",
    ],
    overrideA4: [
      "In deel 4 werkt het anders: jullie verdelen een begroting in euro's over vaste posten én kiezen twee maatregelen uit vijf kaarten. Er is geen puntensysteem van acht punten; het dashboard toont wat er overblijft in euro's.",
    ],
  },
  meters: {
    paragraphs: [
      'Op het dashboard zien jullie vijf dingen.',
      'Daaronder: Niet alles wat telt, staat op het dashboard. Aan het eind kijken jullie terug op wat jullie keuzes met mensen hebben gedaan. Daar gaat de nabespreking over.',
      'Daaronder: Effecten die "later" werken, tellen in de volgende ronde voor de helft mee. Ze gaan niet als cijfer mee naar het volgende deel, wel als verhaal.',
    ],
  },
  tafel: {
    paragraphs: [
      'Het spel bestaat voor een groot deel uit praten. Er zijn vier momenten.',
      'Het argument (elke ronde). Na jullie keuze schrijven jullie waarom jullie deze twee kiezen (maximaal 280 tekens) en wat het sterkste argument is om het juist niet te doen (maximaal 140 tekens). Denk ook aan mensen die erop achteruitgaan.',
      'De gesprekskaart (ronde 1). Een figuur uit het deel zit met een dilemma. Jullie krijgen twee minuten. Leg één zin vast (maximaal 280 tekens) en kies maximaal drie van zeven waarden: eerlijkheid, loyaliteit, rechtvaardigheid, zorg, vertrouwen, veiligheid en transparantie. Het gesprek heeft geen effect op de meters.',
      'Het privébericht (ronde 2). Dit bericht is alleen voor jullie bedoeld. Kies nadenkend en leg kort uit waarom. Schrijf een reden van minstens tien tekens.',
      'De pauzekaart (na elk deel). Twee vragen voor aan tafel en een voorspelling voor het volgende deel.',
      'Een goed gesprek begint met luisteren. Laat iedereen eerst zeggen wat hij ziet, en bespreek daarna wat jullie willen doen.',
    ],
    overrideA4: [
      'In deel 4 is er geen gesprekskaart in ronde 1; wel het argument na jullie keuze en het privédilemma in ronde 2.',
    ],
  },
  jaren: {
    paragraphs: [
      'Elk deel begint met nieuwe startwaarden. Wat jullie in een deel deden, komt terug in het verhaal van het volgende deel. De taal verandert mee: warm en Brabants in 1984, vol vakwoorden in 2026, afstandelijk en met cijfers in 2036.',
    ],
  },
  tips: {
    numbered: [
      'Kijk naar mensen. Wie wordt bij naam genoemd en wie niet?',
      'Let op wat er onder tafel gebeurt. Wat mensen hardop zeggen en wat ze elkaar toefluisteren, kan flink verschillen.',
      'Lees de pijlen als richting. Een onderzoek geeft geen antwoord. Het laat zien waar het schuurt.',
      'Er is geen goed of fout. Het spel oordeelt niet over personen. Het gaat om jullie afwegingen.',
      'Beslis samen. Laat iedereen aan het woord komen voordat jullie klikken.',
      'Bewaar tijd voor het gesprek. De timer loopt, maar de pauzekaart en de nabespreking zijn minstens zo belangrijk als de meters.',
    ],
  },
  praktisch: {
    bullets: [
      'Jullie spelen in teams van vier.',
      'De speeltijd is nog een schatting. We meten die tijdens de eerste speelsessies. Na deel 3 is er een langere pauze.',
      'Zet het geluid aan als dat kan. Het kan ook uit.',
      'Het spel bewaart jullie voortgang. Met "Doorgaan waar je was" op de startpagina gaan jullie verder waar je was.',
      'Is de tekst lastig te lezen? Zet "Leesbaar lettertype" aan.',
      'Niet duidelijk wie iemand is? Open "Wie is wie en begrippen".',
    ],
  },
  bronnen: {
    paragraphs: [UITLEG_BRONNEN_INTRO],
    bullets: UITLEG_BRONNEN,
  },
};

/** Optionele extra alinea's als de speler uitleg opent vanuit een bepaald deel. */
export function uitlegSectionParagraphs(id: UitlegSectionId, episode?: number): string[] {
  const body = UITLEG_BODY[id];
  if (id === 'budget' && episode === 4 && body.overrideA4?.length) {
    return [...body.overrideA4];
  }
  const base = [...(body.paragraphs ?? [])];
  if (episode === 4 && body.overrideA4?.length) {
    return [...base, ...body.overrideA4];
  }
  return base;
}

export function uitlegEpisodeLabel(episode: number): string {
  const meta = EPISODES.find((e) => e.id === episode);
  return meta ? `deel ${meta.id} (${meta.jaar})` : '';
}
