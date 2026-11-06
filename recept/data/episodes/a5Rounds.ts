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

function buildRound(ronde: 1 | 2): RoundDefinition {
  const meta = episodeMeta(5);
  const cards = INTERVENTIES_A5.filter((i) => i.ronde === ronde).map(interventieCard);
  if (cards.length !== 4) {
    throw new Error(`A5 ronde ${ronde}: verwacht 4 interventies, kreeg ${cards.length}`);
  }
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
    acties: [
      { id: 'a1', t: 'Opvolging en bestuur', quote: '…', sig: 'Wie krijgt zicht op het geheel?' },
      { id: 'a2', t: 'Waarden en transactie', quote: '…', sig: 'Wat is te koop en wat niet?' },
      { id: 'a3', t: 'Het verhaal van de schuur', quote: '…', sig: 'Wie bewaart wat alleen op papier staat?' },
    ],
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
