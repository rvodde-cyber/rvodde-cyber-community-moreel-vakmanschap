import {
  STANDAARD_SLOTVRAAG,
  gesprekskaartSchema,
  type Gesprekskaart,
} from './schemas/gesprekskaart.schema';

export type { Gesprekskaart };
import type { EpisodeId } from './episodes/meta';

const A1: Gesprekskaart = {
  id: 'gk-a1-klusje-harrie',
  episode: 1,
  titel: 'Het klusje voor Harrie',
  niveau: 'micro',
  sterren: 1,
  slotvraag: STANDAARD_SLOTVRAAG,
  alineas: [
    'Zaterdagmiddag vraagt Harrie aan Gerrit of hij even iets wil bezorgen: een paar extra kratten worstenbroodjes voor een café in Tilburg. "Een gunstje, Gerrit. Jij kent die man." Gerrit doet het graag; Harrie heeft hem de laatste maanden ook veel werk bezorgd.',
    'Bij het café blijken het veel meer kratten dan afgesproken, en de eigenaar telt zeshonderd gulden in contanten uit. Geen bon, geen briefje. "Geef maar aan Harrie." Harrie stopt het geld in zijn jaszak. "Dat schrijven we later wel in het kasboek."',
    'Zondag ziet Gerrit hoe Lies het kasboek bijhoudt, regel voor regel. Dit bedrag staat er niet in. Het is niet de eerste keer. Volgende zaterdag vraagt Harrie hem hetzelfde nog eens. Doet Gerrit het weer, spreekt hij Harrie erop aan, of vertelt hij het aan Lies?',
  ],
};

const A2: Gesprekskaart = {
  id: 'gk-a2-loongebouw',
  episode: 2,
  titel: 'Het gat in het loongebouw',
  niveau: 'meso',
  sterren: 2,
  slotvraag: STANDAARD_SLOTVRAAG,
  alineas: [
    'Ingrid heeft haar eerste baan bij personeelszaken van Van Gorp. Het bedrijf groeit snel en ze brengt in kaart wie wat doet en wat iedereen verdient. Het is een rommeltje: dezelfde functies, verschillende lonen.',
    'Dan belt Gerrit, ploegbaas bij de band. "Ik heb dringend een planner nodig en ik heb al iemand. Ze wil vijfhonderd gulden meer dan onze andere planners. Regel het maar, anders gaat ze naar Waalwijk."',
    'Ingrid denkt aan Truus, al acht jaar planner, die nooit om meer geld heeft gevraagd. Zegt ze ja, dan is de vacature morgen vervuld en wordt het loongebouw nog schever. Zegt ze nee, dan staat de planning straks stil. Wat is eerlijker: de nieuwe goed betalen, of de oude niet passeren?',
  ],
};

const A3: Gesprekskaart = {
  id: 'gk-a3-topresultaten',
  episode: 3,
  titel: 'Topresultaten',
  niveau: 'meso',
  sterren: 2,
  slotvraag: STANDAARD_SLOTVRAAG,
  alineas: [
    'Saskia werkt in Dongen. Voor de derde keer in korte tijd meldt ze zich ziek. In het verzuimgesprek met Mark, HR-adviseur op het hoofdkantoor in Tilburg, komt het eruit: te veel werk, voortdurend spanning en een leidinggevende die iedereen opjaagt. "Ik trek het even niet meer. En ik ben echt niet de enige."',
    'Mark kent die leidinggevende. De vestiging in Dongen haalt al drie jaar op rij de targets, en Marco noemt hem "onze motor". Waalwijk zit al maanden onder target.',
    'Als Mark dit meldt, kan dat Saskia en haar collega\'s helpen. Maar het kan ook de leidinggevende schaden, en Marks eigen positie. Zwijgt hij, dan blijven de cijfers goed, en blijven mensen ziek. Wat doet Mark?',
  ],
};

const A4: Gesprekskaart = {
  id: 'gk-a4-it-pilot',
  episode: 4,
  titel: 'Het voorstel van IT',
  niveau: 'meso',
  sterren: 2,
  slotvraag: STANDAARD_SLOTVRAAG,
  alineas: [
    'IT wil PILOT uitbreiden naar de staf: software die toetsaanslagen en actieve vensters bijhoudt, om onderpresteerders vroeg te signaleren. Yasmin, HR-manager, moet vrijdag adviseren. Twee medewerkers presteren al maanden onder, zonder duidelijke reden.',
    'De software zou dat sneller laten zien dan haar eigen gesprekken. Maar gisteren hoorde ze twee collega\'s fluisteren: "Als dit doorgaat, ben ik weg. Ik laat me niet elke minuut natrekken." Sinds de reorganisatie is het vertrouwen al broos.',
    'De directie wil een advies: voor, tegen of een tussenvorm. Yasmin opent het conceptdocument van IT, de cursor knippert. Wat typt ze?',
  ],
};

const A5: Gesprekskaart = {
  id: 'gk-a5-kantlijn',
  episode: 5,
  titel: 'De kantlijn',
  niveau: 'meso',
  sterren: 2,
  slotvraag: STANDAARD_SLOTVRAAG,
  alineas: [
    'Ria is tweeënzestig en beheert al eenendertig jaar het archief met de oorspronkelijke recepten en werkinstructies van het bedrijf, op papier en volgens haar eigen systeem. Alles is inmiddels gedigitaliseerd en het AI-systeem vindt in een seconde wat zij in een minuut vindt.',
    'De directie vraagt Sanaa, HR-adviseur, hoe er "op korte termijn afscheid van haar kan worden genomen". Een vaststellingsovereenkomst is snel en voor iedereen overzichtelijk.',
    'Sanaa weet dat de digitale versie de aantekeningen in de kantlijn niet heeft. Alleen Ria kan ze lezen en weet waarom ze er staan. Een omscholingstraject is duur en onzeker. Wat is een organisatie verschuldigd aan iemand die zij zelf heeft laten verouderen, en wie bewaart wat alleen in haar hoofd zit?',
  ],
};

export const GESPREKSKAARTEN: Record<EpisodeId, Gesprekskaart> = {
  1: gesprekskaartSchema.parse(A1),
  2: gesprekskaartSchema.parse(A2),
  3: gesprekskaartSchema.parse(A3),
  4: gesprekskaartSchema.parse(A4),
  5: gesprekskaartSchema.parse(A5),
};

export function gesprekskaartVoor(episode: EpisodeId): Gesprekskaart {
  return GESPREKSKAARTEN[episode];
}
