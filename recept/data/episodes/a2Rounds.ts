import { INTERVENTIES_A2 } from '../interventies-a2';
import { kostenInPunten, budgetVoorRonde } from '../interventies/vertaaltabel';
import { episodeMeta } from './meta';
import type { RoundDefinition } from '../schemas/rounds.schema';
import { roundDefinitionSchema } from '../schemas/rounds.schema';

function interventieCard(i: (typeof INTERVENTIES_A2)[0]): RoundDefinition['cards'][0] {
  return {
    id: i.id,
    t: i.naam,
    d: i.omschrijving,
    e: {},
    amo: '-',
    fit: 0,
    kosten: kostenInPunten(i.kostenCategorie),
    vt: 0,
    er: 0,
    rep: 0,
    cap: 0,
    status: i.status === 'definitief' ? 'goedgekeurd' : 'concept',
  };
}

const ONDERZOEKEN_A2_R1: RoundDefinition['acties'] = [
  {
    id: 'a1',
    t: 'Signalen op de band',
    quote:
      'Bij de verpakking staat een jongen die niemand bij naam kent. Drie mensen doen hetzelfde werk onder drie verschillende functienamen.',
    sig: '▲ ONDUIDELIJKHEID  ▼ OVERZICHT',
  },
  {
    id: 'a2',
    t: 'Roosters en lijn',
    quote:
      'Het rooster hangt per ploeg op het prikbord, vol doorgestreepte namen. Ploegleiders ruilen onderling; Harrie hoort het pas als het al gebeurd is.',
    sig: '▼ INFORMATIE  ▲ REGELRUIMTE',
  },
  {
    id: 'a3',
    t: 'Gesprek met Harrie',
    quote: '‘Ik ken ze allemaal,’ zegt Harrie. Hij noemt vier namen. Bij twee corrigeert Lies hem zacht.',
    sig: '▼ OVERZICHT  ▼ CONTACT',
  },
  {
    id: 'a4',
    t: 'Het verloop',
    quote:
      'Van de laatste twintig mensen die via een bureau binnenkwamen, is de helft binnen drie maanden vertrokken.',
    sig: '▲ VERLOOP',
  },
  {
    id: 'a5',
    t: 'De loonlijst',
    quote:
      'Lies laat zien dat twee collega’s met hetzelfde werk ruim tien procent in loon schelen. Niemand heeft het ooit uitgelegd.',
    sig: '▼ EERLIJKHEID',
  },
];

const ONDERZOEKEN_A2_R2: RoundDefinition['acties'] = [
  {
    id: 'a1',
    t: 'De handtekeningenlijst',
    quote: 'Veertig mensen tekenden de lijst over het rooster. Joost zegt: ‘We willen geen ruzie, we willen aan tafel.’',
    sig: '▼ INSPRAAK  ▲ SPANNING',
  },
  {
    id: 'a2',
    t: 'Het verzuim',
    quote:
      'Het verzuim is gestegen van 4 naar ongeveer 7 procent, vooral in de late ploeg en bij mensen die net terug zijn van ziekte.',
    sig: '▲ VERZUIM',
  },
  {
    id: 'a3',
    t: 'De volumeprikkel',
    quote:
      'Op de ploegen met een volumeprikkel ligt de productie hoger, maar de keuring keurt meer partijen af. Een ploegleider: ‘We halen het, maar niet altijd netjes.’',
    sig: '▲ TEMPO  ▼ KWALITEIT',
  },
  {
    id: 'a4',
    t: 'Opleiding',
    quote:
      'De meeste mensen hebben nog nooit een cursus gehad. Wie het meest aan de band staat, vraagt er het vaakst om.',
    sig: '▼ DOORGROEI  ▼ BETROKKENHEID',
  },
  {
    id: 'a5',
    t: 'Gesprek met Gerrit',
    quote:
      '‘Ik houd de ploeg draaiend,’ zegt Gerrit. ‘Maar als ik iets wil veranderen, moet ik eerst naar Harrie. En die is er nooit.’',
    sig: '▼ REGELRUIMTE',
  },
];

function buildRound(ronde: 1 | 2): RoundDefinition {
  const meta = episodeMeta(2);
  const cards = INTERVENTIES_A2.filter((i) => i.ronde === ronde).map(interventieCard);
  if (cards.length !== 4) {
    throw new Error(`A2 ronde ${ronde}: verwacht 4 interventies, kreeg ${cards.length}`);
  }
  const acties = ronde === 1 ? ONDERZOEKEN_A2_R1 : ONDERZOEKEN_A2_R2;
  const shared = {
    label: String(meta.jaar),
    crisis: meta.greinerCrisis,
    budget: budgetVoorRonde(2, ronde),
    eurBase: 920000,
    tech: 'band',
    brake: '',
    pilotCard: '',
    pilotRec: '',
    pilotPred: '',
    q1: 'Wat is symptoom, en wat is oorzaak?',
    q2: 'Welke twee interventies passen bij jullie kas en jullie mensen?',
    q3: 'Wat zien jullie terug op de vloer — en wat niet in het kasboek?',
    contra: [] as [string, string][],
    posten: [] as RoundDefinition['posten'],
    BE: {},
    acties,
    verm: [
      { id: 'v1', t: 'Mensen en vertrouwen', q: 1.1, o: 'verbondenheid' },
      { id: 'v2', t: 'Orde en tempo', q: 1, o: 'structuur' },
      { id: 'v3', t: 'Geld en groei', q: 0.9, o: 'kas' },
    ],
    ticker: [
      ['i', '1996 — band en roosters in Loven'],
      [
        '!',
        ronde === 1
          ? 'Kies twee interventies binnen acht punten'
          : 'Kies twee interventies binnen negen punten',
      ],
    ] as RoundDefinition['ticker'],
  };
  const def = { ...shared, cards };
  roundDefinitionSchema.parse(def);
  return def;
}

export const A2_ROUNDS: { 1: RoundDefinition; 2: RoundDefinition } = {
  1: buildRound(1),
  2: buildRound(2),
};
