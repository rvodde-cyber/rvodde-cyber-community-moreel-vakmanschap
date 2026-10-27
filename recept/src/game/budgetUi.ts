import { ROUNDS } from '@data/rounds';
import { budgetOf, marcoBud } from '@engine/helpers';
import type { GameContext } from '@engine/types';
import { kostEur } from '../lib/format';
import type { GameUiState, RoundUiState } from './uiTypes';

export function engineContext(state: GameUiState): GameContext {
  return {
    results: state.results,
    rounds: {
      1: state.rounds[1] ? { cards: state.rounds[1].cards, bud: state.rounds[1].bud } : undefined,
      2: state.rounds[2] ? { cards: state.rounds[2].cards, bud: state.rounds[2].bud } : undefined,
    },
  };
}

export function bcalc(round: 1 | 2, r: RoundUiState, ctx: GameContext) {
  const D = ROUNDS[round];
  let iv = 0;
  let po = 0;
  for (const k of D.cards) {
    if (r.cards.includes(k.id)) iv += kostEur(k.kosten);
  }
  for (const p of D.posten) {
    po += r.bud[p.id] ?? 0;
  }
  const left = budgetOf(round, ctx) - iv - po;
  return { iv, po, left };
}

export function vermoedenQ(round: 1 | 2, vermId: string | null): number {
  if (!vermId) return 1;
  const v = ROUNDS[round].verm.find((x) => x.id === vermId);
  return v?.q ?? 1;
}

export function freshRoundUi(round: 1 | 2): RoundUiState {
  return {
    acties: [],
    verm: null,
    pilot: null,
    cards: [],
    spoken: [],
    w: ['', '', ''],
    mot: '',
    minOn: false,
    min: '',
    bud: marcoBud(round),
    coldSub: 0,
    trailerDone: false,
  };
}

export function freshGame(): GameUiState {
  return {
    v: 3,
    playerName: '',
    team: '',
    round: 1,
    phase: 'intro',
    rounds: { 1: freshRoundUi(1), 2: freshRoundUi(2) },
    results: {},
    tLeft: 600,
    timerOn: true,
  };
}
