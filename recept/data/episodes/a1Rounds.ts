import { INTERVENTIES_A1 } from '../interventies-a1';
import { kostenInPunten, budgetVoorRonde } from '../interventies/vertaaltabel';
import { episodeMeta } from './meta';
import type { RoundDefinition } from '../schemas/rounds.schema';
import { roundDefinitionSchema } from '../schemas/rounds.schema';

function interventieCard(i: (typeof INTERVENTIES_A1)[0]): RoundDefinition['cards'][0] {
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

const ONDERZOEKEN_A1_R1: RoundDefinition['acties'] = [
  {
    id: 'a1',
    t: 'Signalen in de schuur',
    quote:
      'Je loopt een ochtend mee. Dezelfde kratten worden twee keer ingepakt en andere blijven staan. Op de vraag wie wat doet, hoor je drie keer: ‘Dat doet Harrie wel.’',
    sig: '▲ ONDUIDELIJKHEID  ▼ OVERZICHT',
  },
  {
    id: 'a2',
    t: 'Kasboek en order',
    quote:
      'Lies laat het kasboek zien. De order is binnen, maar het meel is nog niet besteld. Er is deze maand geld voor één grote uitgave, niet voor twee.',
    sig: '▼ KAS',
  },
  {
    id: 'a3',
    t: 'Gesprek met Harrie',
    quote:
      '‘Ik weet precies wat er moet gebeuren,’ zegt Harrie. Als je doorvraagt, noemt hij zes dingen die vandaag nog door hem beslist moeten worden.',
    sig: '▲ CONTROLE  ▼ ZEGGENSCHAP',
  },
  {
    id: 'a4',
    t: 'Praatje bij de koffie',
    quote:
      'In de pauze zitten ze op kratten. Twee jongens praten zacht: ‘Als je vraagt of je eerder weg mag, kijkt hij alsof je hem in de steek laat.’',
    sig: '▼ INSPRAAK  ▼ VERTROUWEN',
  },
  {
    id: 'a5',
    t: 'Uren en overwerk',
    quote:
      'In het urenschrift staan in zes weken twee keer zoveel overuren als vorig jaar. Twee mensen waren een dag ziek; niemand vroeg waarom.',
    sig: '▲ TEMPO  ▼ AANDACHT',
  },
];

const ONDERZOEKEN_A1_R2: RoundDefinition['acties'] = [
  {
    id: 'a1',
    t: 'De productie',
    quote:
      'Er gaan per dag ruim een vijfde meer worstenbroodjes de oven uit dan een maand geleden. In de keuring komen kleine foutjes terug in de vulling.',
    sig: '▲ TEMPO  ▼ KWALITEIT',
  },
  {
    id: 'a2',
    t: 'De machine',
    quote:
      'De monteur klopt op de oven: ‘Die doet het nog, maar hij loopt op zijn tandvlees.’ Een tweede machine kost meer dan alles wat er nu in kas zit.',
    sig: '▼ KAS  ▲ RISICO',
  },
  {
    id: 'a3',
    t: 'Gesprek met de jongens',
    quote:
      'Twee van de jongens vroegen vrij. Ze zeggen: ‘We willen best meedenken, maar niemand vraagt ons iets.’',
    sig: '▼ INSPRAAK',
  },
  {
    id: 'a4',
    t: 'Vertrek en ziekmelding',
    quote:
      'Sinds de drukte zijn er drie mensen weggegaan en één ziek. Eén van hen zegt bij het weggaan: ‘Het werk is goed, maar ik zie Harrie nooit zonder haast.’',
    sig: '▲ VERLOOP  ▼ BETROKKENHEID',
  },
  {
    id: 'a5',
    t: 'Het kasboek',
    quote:
      'De maand komt uit, maar alleen omdat er geen loon is verhoogd en de leverancier later wordt betaald.',
    sig: '▼ KAS  ▲ UITSTEL',
  },
];

function buildRound(ronde: 1 | 2): RoundDefinition {
  const meta = episodeMeta(1);
  const cards = INTERVENTIES_A1.filter((i) => i.ronde === ronde).map(interventieCard);
  if (cards.length !== 4) {
    throw new Error(`A1 ronde ${ronde}: verwacht 4 interventies, kreeg ${cards.length}`);
  }
  const acties = ronde === 1 ? ONDERZOEKEN_A1_R1 : ONDERZOEKEN_A1_R2;
  const shared = {
    label: String(meta.jaar),
    crisis: meta.greinerCrisis,
    budget: budgetVoorRonde(1, ronde),
    eurBase: 48000,
    tech: 'handwerk',
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
      { id: 'v2', t: 'Orde en groei', q: 1, o: 'structuur' },
      { id: 'v3', t: 'Geld en tempo', q: 0.9, o: 'kas' },
    ],
    ticker: [
      ['i', '1984 — kasboek op de keukentafel'],
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

export const A1_ROUNDS: { 1: RoundDefinition; 2: RoundDefinition } = {
  1: buildRound(1),
  2: buildRound(2),
};
