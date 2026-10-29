import type { RoundDefinition } from '../schemas/rounds.schema';
import type { EpisodeId } from '../episodes/meta';
import { episodeMeta } from '../episodes/meta';

type SkeletonEpisode = Exclude<EpisodeId, 4>;

function concept(
  id: string,
  t: string,
  d: string,
  e: RoundDefinition['cards'][0]['e'],
  fit: 0 | 1 = 0,
): RoundDefinition['cards'][0] {
  return { id, t, d, e, amo: 'M', fit, kosten: 3, vt: 0, er: 0, rep: 0, cap: 0, status: 'concept' };
}

function skeletonRound(ep: SkeletonEpisode): RoundDefinition {
  const crisis = episodeMeta(ep).greinerCrisis;
  const shared = {
    label: String(episodeMeta(ep).jaar),
    crisis,
    tech: ep === 1 ? 'handwerk' : ep === 2 ? 'band' : ep === 3 ? 'excel-bi' : 'holding-app',
    brake: 'D',
    pilotCard: 'B',
    pilotRec: 'Concept: PILOT-advies volgt in definitieve versie.',
    pilotPred: 'CONCEPT — GEEN PROGNOSE',
    q1: 'Wat is symptoom, en wat is oorzaak?',
    q2: 'Wie wint er bij dit besluit, en wie betaalt?',
    q3: 'Wat nemen jullie mee naar de volgende aflevering?',
    contra: [
      ['B', 'D'],
      ['A', 'E'],
    ] as [string, string][],
    BE: { mensen: { erkenning: 2, collegas: 1 } },
    acties: [
      { id: 'a1', t: 'Signalen op de vloer', quote: '…', sig: 'Verzuim, tempo of vertrouwen?' },
      { id: 'a2', t: 'Cijfers en kas', quote: '…', sig: 'Wat meet het dashboard wel en niet?' },
      { id: 'a3', t: 'Gesprek met ploeg', quote: '…', sig: 'Wie spreekt, wie zwijgt?' },
    ],
    verm: [
      { id: 'v1', t: 'Mensen en motivatie', q: 1.2, o: 'motivatie' },
      { id: 'v2', t: 'Proces en regels', q: 1, o: 'structuur' },
      { id: 'v3', t: 'Groei en druk', q: 0.8, o: 'groei' },
    ],
    ticker: [
      ['i', 'Conceptskelet — meters zijn indicatief'],
      ['!', 'Interventies nog niet inhoudelijk getoetst'],
    ] as RoundDefinition['ticker'],
  };

  const budgets: Record<SkeletonEpisode, { budget: number; eurBase: number; posten: RoundDefinition['posten'] }> = {
    1: {
      budget: 12000,
      eurBase: 48000,
      posten: [
        { id: 'mensen', t: 'Mensen', d: 'Buren, Lies, extra handen', marco: 4000 },
        { id: 'schuur', t: 'Schuur', d: 'Ruimte en materiaal', marco: 3000 },
        { id: 'levendigheid', t: 'Levendigheid', d: 'Feest, relaties, slager Gerrit', marco: 2000 },
        { id: 'reserve', t: 'Reserve', d: 'Buffer', marco: 3000 },
      ],
    },
    2: {
      budget: 180000,
      eurBase: 920000,
      posten: [
        { id: 'mensen', t: 'Mensen', d: 'Ploegen, opleiding, vervanging', marco: 60000 },
        { id: 'band', t: 'Band', d: 'Onderhoud en snelheid', marco: 50000 },
        { id: 'directie', t: 'Directie', d: 'Harrie en kantoor', marco: 40000 },
        { id: 'reserve', t: 'Reserve', d: 'Buffer', marco: 30000 },
      ],
    },
    3: {
      budget: 420000,
      eurBase: 2100000,
      posten: [
        { id: 'mensen', t: 'Mensen', d: 'Drie vestigingen', marco: 120000 },
        { id: 'it', t: 'IT & BI', d: 'Spreadsheets en rapportages', marco: 90000 },
        { id: 'directie', t: 'Directie', d: 'Reizen en kantoor', marco: 110000 },
        { id: 'reserve', t: 'Reserve', d: 'Buffer', marco: 100000 },
      ],
    },
    5: {
      budget: 2500000,
      eurBase: 18000000,
      posten: [
        { id: 'mensen', t: 'Mensen', d: 'Divisies en HR', marco: 800000 },
        { id: 'holding', t: 'Holding', d: 'Governance en juridisch', marco: 700000 },
        { id: 'invest', t: 'Investeerder', d: 'Due diligence en rapportage', marco: 500000 },
        { id: 'reserve', t: 'Reserve', d: 'Buffer', marco: 500000 },
      ],
    },
  };

  const cardsByEp: Record<SkeletonEpisode, RoundDefinition['cards']> = {
    1: [
      concept('A', 'Extra buren inschakelen', 'Korte shift in de schuur tot de order past', { erkenning: 5, collegas: 4 }),
      concept('B', 'Harrie op de vloer', 'Geen besluit zonder wie er mee werkt', { steunlg: 8, erkenning: 6 }, 1),
      concept('C', 'Lies formeel meebeslissen', 'Kas en klant op één lijn', { inspraak: 10, erkenning: 4 }),
      concept('D', 'Order uitstellen', 'Nee tot capaciteit helder is', { tempo: -5, betekenis: 6 }),
      concept('E', 'Gerucht over Frans', 'Iemand uit de ploeg halen zonder gesprek', { collegas: -10, erkenning: -8 }),
    ],
    2: [
      concept('A', 'Rotatie over handelingen', 'Iedereen maakt weer een heel product', { vaardigheden: 8, betekenis: 6 }, 1),
      concept('B', 'Sneller-bonus', 'Extra cent per minuut boven norm', { tempo: 8, controle: 6 }),
      concept('C', 'Gerrit van de vloer', 'Tijdelijk andere ploegleider', { steunlg: 5, rolonduid: -6 }),
      concept('D', 'Ploeg stelt tempo bij', 'Gezamenlijk plafond op de teller', { inspraak: 12, regelruimte: 8 }, 1),
      concept('E', 'Ab apart zetten', 'Zogenaamd beschermen, feitelijk uitsluiten', { collegas: -12, erkenning: -10 }),
    ],
    3: [
      concept('A', 'Centraal dashboard', 'Alle vestigingen in één ochtendrapport', { controle: 10, bureaucratie: 6 }),
      concept('B', 'Vestigingsbudgetten', 'Waalwijk en Dongen zelf laten sturen', { regelruimte: 10, inspraak: 8 }),
      concept('C', 'Sanne coördineert', 'Eén proceseigenaar over de lijnen', { steunlg: 6, erkenning: 4 }, 1),
      concept('D', 'Marco stelt KPI’s', 'Targets per vestiging vanuit Tilburg', { controle: 12, tempo: 4 }),
      concept('E', 'Karim expliciet in beeld', 'Beste vestiging krijgt formele stem', { erkenning: 8, betekenis: 6 }),
    ],
    5: [
      concept('A', 'Centrale HR-policy', 'Eén handboek voor alle divisies', { controle: 8, bureaucratie: 10 }),
      concept('B', 'Divisies autonoom', 'Minder holding, meer lokale regie', { regelruimte: 12, inspraak: 6 }, 1),
      concept('C', 'Externe CEO', 'Nieuwe directeur buiten de familie', { verantw: 8, rolonduid: -4 }),
      concept('D', 'Testament openbaar', 'De doorgestreepte zin op tafel', { betekenis: 10, moreel: 6 }),
      concept('E', 'Schuur bewaren', 'Symbolisch erfgoed, geen kostenpost', { betekenis: 8, erkenning: 5 }),
    ],
  };

  const b = budgets[ep];
  return {
    ...shared,
    budget: b.budget,
    eurBase: b.eurBase,
    posten: b.posten,
    cards: cardsByEp[ep],
  };
}

export const SKELETON_ROUNDS: Record<SkeletonEpisode, RoundDefinition> = {
  1: skeletonRound(1),
  2: skeletonRound(2),
  3: skeletonRound(3),
  5: skeletonRound(5),
};

export type SkeletonEpisodeId = keyof typeof SKELETON_ROUNDS;
