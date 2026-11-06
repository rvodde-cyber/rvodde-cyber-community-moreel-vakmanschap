import { INTERVENTIES_A5 } from '../interventies-a5';
import { kostenInPunten, budgetVoorRonde } from '../interventies/vertaaltabel';
import { episodeMeta } from './meta';
import type { RoundDefinition } from '../schemas/rounds.schema';
import { roundDefinitionSchema } from '../schemas/rounds.schema';

function interventieCard(i: (typeof INTERVENTIES_A5)[0]): RoundDefinition['cards'][0] {
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

const ONDERZOEKEN_A5_R1: RoundDefinition['acties'] = [
  {
    id: 'a1',
    t: 'Opvolging en bestuur',
    quote:
      'In de bestuursnotulen van het afgelopen jaar staat vijf keer ‘opvolging’ als agendapunt. Er is nooit een besluit genomen.',
    sig: '▲ ONDUIDELIJKHEID',
  },
  {
    id: 'a2',
    t: 'Wat op papier staat',
    quote:
      'In het archief liggen drie testamenten en een stapel handgeschreven afspraken. Niemand heeft alles gelezen.',
    sig: '▼ INFORMATIE  ▲ RISICO',
  },
  {
    id: 'a3',
    t: 'Gesprek met Anne-Fleur',
    quote: '‘De cijfers ken ik goed,’ zegt Anne-Fleur. ‘Het verhaal erachter niet. Wie kent dat wel?’',
    sig: '▼ INFORMATIE  ▲ ONZEKERHEID',
  },
  {
    id: 'a4',
    t: 'Gesprek met Piotr',
    quote:
      '‘Ik werk hier achttien jaar,’ zegt Piotr. ‘Niemand vraagt wat ik zie, behalve als er iets stuk gaat.’',
    sig: '▼ INSPRAAK',
  },
  {
    id: 'a5',
    t: 'Het dashboard',
    quote:
      'Het dashboard toont een stabiele omzet en een dalende betrokkenheid. De score ‘ik zie de zin van mijn werk’ staat op 5,8 van de 10.',
    sig: '▲ OMZET  ▼ BETROKKENHEID',
  },
];

const ONDERZOEKEN_A5_R2: RoundDefinition['acties'] = [
  {
    id: 'a1',
    t: 'Het voorstel van Optivora',
    quote:
      'Optivora biedt een prijs van twee keer de jaaromzet. In het voorstel staat de schuur als ‘overige activa’ en de merknaam als ‘overdraagbaar’.',
    sig: '▲ KAS  ▼ ZEGGENSCHAP',
  },
  {
    id: 'a2',
    t: 'Waarden en doel',
    quote:
      'In het jaarverslag staat een missie van drie regels. In een steekproef kan één op de drie medewerkers zeggen wat die regels betekenen.',
    sig: '▼ BETROKKENHEID',
  },
  {
    id: 'a3',
    t: 'Bureaucratie',
    quote:
      'Een gemiddelde afdeling besteedt twee dagen per week aan rapportages. Een derde van de rapporten wordt niet gelezen.',
    sig: '▲ CONTROLE  ▼ TEMPO',
  },
  {
    id: 'a4',
    t: 'Gesprek met Sanne',
    quote: '‘Ik teken pas als ik weet wat er in dat schrift staat,’ zegt Sanne.',
    sig: '▲ ONZEKERHEID  ▼ VERTROUWEN',
  },
  {
    id: 'a5',
    t: 'De schuur',
    quote:
      'In de schuur staat een kist die al jaren dichtzit. Piotr zegt dat er nog papier uit de beginjaren in ligt, maar hij weet niet wat.',
    sig: '▼ INFORMATIE  ▲ ONZEKERHEID',
  },
];

function buildRound(ronde: 1 | 2): RoundDefinition {
  const meta = episodeMeta(5);
  const cards = INTERVENTIES_A5.filter((i) => i.ronde === ronde).map(interventieCard);
  if (cards.length !== 4) {
    throw new Error(`A5 ronde ${ronde}: verwacht 4 interventies, kreeg ${cards.length}`);
  }
  const acties = ronde === 1 ? ONDERZOEKEN_A5_R1 : ONDERZOEKEN_A5_R2;
  const shared = {
    label: String(meta.jaar),
    crisis: meta.greinerCrisis,
    budget: budgetVoorRonde(5, ronde),
    eurBase: 2100000,
    tech: 'holding-app',
    brake: '',
    pilotCard: '',
    pilotRec: '',
    pilotPred: '',
    q1: 'Wat is symptoom, en wat is oorzaak?',
    q2: 'Welke twee interventies passen bij jullie kas en jullie mensen?',
    q3: 'Wat zien jullie terug op de vloer — en wat niet in de rapporten?',
    contra: [] as [string, string][],
    posten: [] as RoundDefinition['posten'],
    BE: {},
    acties,
    verm: [
      { id: 'v1', t: 'Mensen en vertrouwen', q: 1.1, o: 'verbondenheid' },
      { id: 'v2', t: 'Strategie en cijfers', q: 1, o: 'structuur' },
      { id: 'v3', t: 'Groep en nalatenschap', q: 0.9, o: 'kas' },
    ],
    ticker: [
      ['i', '2036 — Van Gorp Groep; bericht van Optivora op de achtergrond'],
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

export const A5_ROUNDS: { 1: RoundDefinition; 2: RoundDefinition } = {
  1: buildRound(1),
  2: buildRound(2),
};
