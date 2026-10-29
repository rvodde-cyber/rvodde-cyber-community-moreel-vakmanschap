import type { ComputeResult } from '@engine/types';
import type { BerichtDef } from '@data/berichten';
import type { GameUiState } from './uiTypes';

function has(cards: string[], id: string) {
  return cards.includes(id);
}

/** Reacties na besluit — referentie demo v6 reacties(). */
export function reactiesVoorRonde(state: GameUiState, res: ComputeResult): BerichtDef[] {
  const round = state.round;
  const R = state.rounds[round];
  const list: BerichtDef[] = [];

  if (round === 1) {
    const bud = R.bud;
    if ((bud.directie ?? 0) < 280000) {
      list.push({
        id: 'r1-marco',
        round: 1,
        at: 'besluit',
        channel: 'g',
        van: 'Marco',
        delay: 0,
        tekst: 'Wie heeft mijn auto geschrapt? Daar praten we nog over.',
      });
    }
    if ((bud.dividend ?? 0) < 300000) {
      list.push({
        id: 'r1-harrie',
        round: 1,
        at: 'besluit',
        channel: 'g',
        van: 'Harrie',
        delay: 0,
        tekst: 'Het dividend is lager dan Marco beloofde. Sanne belde me al.',
      });
    }
    if ((bud.directie ?? 0) >= 280000 && (bud.mensen ?? 0) <= 200000) {
      list.push({
        id: 'r1-gerucht',
        round: 1,
        at: 'besluit',
        channel: 'g',
        van: 'Dennis',
        fwd: true,
        delay: 0,
        tekst: 'Nieuwe leaseauto’s voor de directie. En wij krijgen niet eens een opleiding. (Rondgestuurd in de nachtploeg.)',
      });
    }
    if ((bud.optivora ?? 0) < 400000) {
      list.push({
        id: 'r1-erik',
        round: 1,
        at: 'besluit',
        channel: 'p',
        van: 'Erik Verhoeven',
        delay: 0,
        tekst: 'Ik zie dat de upgrade uit de begroting is. Ik bel Marco wel even.',
      });
    }
    if (has(R.cards, 'D')) {
      list.push({
        id: 'r1-ans',
        round: 1,
        at: 'besluit',
        channel: 'p',
        van: 'Ans Willems',
        delay: 0,
        tekst: 'We mogen meebeslissen over de norm? Dat heeft nog nooit iemand gevraagd.',
      });
    }
  } else {
    if (has(R.cards, 'F')) {
      list.push({
        id: 'r2-joost',
        round: 2,
        at: 'besluit',
        channel: 'p',
        van: 'Joost Hendriks',
        delay: 0,
        tekst: 'De gewetensclausule maakt veel los. Twee mensen zijn vandaag gewoon weer komen werken.',
      });
    }
    if (has(R.cards, 'G')) {
      list.push({
        id: 'r2-dennis',
        round: 2,
        at: 'besluit',
        channel: 'g',
        van: 'Dennis',
        fwd: true,
        delay: 0,
        tekst: 'TEMPO heeft de hele nachtploeg op hal 3 ingeroosterd. Niemand is iets gevraagd. (Rondgestuurd.)',
      });
    }
    if (has(R.cards, 'H')) {
      list.push({
        id: 'r2-ans',
        round: 2,
        at: 'besluit',
        channel: 'p',
        van: 'Ans Willems',
        delay: 0,
        tekst: 'Het weekoverleg is geschrapt. Ik heb vandaag gewoon op de vloer gestaan.',
      });
    }
    if ((res.bud.directie ?? 0) < 300000) {
      list.push({
        id: 'r2-marco',
        round: 2,
        at: 'besluit',
        channel: 'g',
        van: 'Marco',
        delay: 0,
        tekst: 'Geen Spoorzone dus. Ik hoop dat jullie weten wat jullie doen.',
      });
    }
  }

  return list;
}
