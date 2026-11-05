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

function buildRound(ronde: 1 | 2): RoundDefinition {
  const meta = episodeMeta(1);
  const cards = INTERVENTIES_A1.filter((i) => i.ronde === ronde).map(interventieCard);
  if (cards.length !== 4) {
    throw new Error(`A1 ronde ${ronde}: verwacht 4 interventies, kreeg ${cards.length}`);
  }
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
    acties: [
      { id: 'a1', t: 'Signalen in de schuur', quote: '…', sig: 'Wie mist, wie dubbel loopt?' },
      { id: 'a2', t: 'Kasboek en order', quote: '…', sig: 'Wat past er nog in deze maand?' },
      { id: 'a3', t: 'Gesprek met Harrie', quote: '…', sig: 'Wie beslist echt?' },
    ],
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
