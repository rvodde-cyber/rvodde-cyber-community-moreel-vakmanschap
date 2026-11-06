import { INTERVENTIES_A3 } from '../interventies-a3';
import { kostenInPunten, budgetVoorRonde } from '../interventies/vertaaltabel';
import { episodeMeta } from './meta';
import type { RoundDefinition } from '../schemas/rounds.schema';
import { roundDefinitionSchema } from '../schemas/rounds.schema';

function interventieCard(i: (typeof INTERVENTIES_A3)[0]): RoundDefinition['cards'][0] {
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

function buildRound(ronde: 1 | 2): RoundDefinition {
  const meta = episodeMeta(3);
  const cards = INTERVENTIES_A3.filter((i) => i.ronde === ronde).map(interventieCard);
  if (cards.length !== 4) {
    throw new Error(`A3 ronde ${ronde}: verwacht 4 interventies, kreeg ${cards.length}`);
  }
  const shared = {
    label: String(meta.jaar),
    crisis: meta.greinerCrisis,
    budget: budgetVoorRonde(3, ronde),
    eurBase: 2100000,
    tech: 'excel-bi',
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
    acties: [
      { id: 'a1', t: 'Signalen tussen vestigingen', quote: '…', sig: 'Wie mist, wie dubbel loopt?' },
      { id: 'a2', t: 'Cijfers en targets', quote: '…', sig: 'Wat meet het dashboard wel en niet?' },
      { id: 'a3', t: 'Gesprek met Harrie', quote: '…', sig: 'Wie beslist echt?' },
    ],
    verm: [
      { id: 'v1', t: 'Mensen en vertrouwen', q: 1.1, o: 'verbondenheid' },
      { id: 'v2', t: 'Orde en cijfers', q: 1, o: 'structuur' },
      { id: 'v3', t: 'Groei en druk', q: 0.9, o: 'kas' },
    ],
    ticker: [
      ['i', '2009 — drie vestigingen, één Machinebouw B.V.'],
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

export const A3_ROUNDS: { 1: RoundDefinition; 2: RoundDefinition } = {
  1: buildRound(1),
  2: buildRound(2),
};
