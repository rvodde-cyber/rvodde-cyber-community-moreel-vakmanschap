import { isFullEpisode } from '@data/episodes/meta';
import type { EpisodeId } from '@data/episodes/meta';
import { budgetOf, budgetOfDef, marcoBud, marcoBudFromPosten } from '@engine/helpers';
import type { GameContext } from '@engine/types';
import { kostEur } from '../lib/format';
import type { GameUiState, RoundUiState } from './uiTypes';
import { roundDefEpisode, roundDefFor } from './roundSource';

export function engineContext(state: GameUiState): GameContext {
  return {
    results: state.results,
    rounds: {
      1: state.rounds[1] ? { cards: state.rounds[1].cards, bud: state.rounds[1].bud } : undefined,
      2: state.rounds[2] ? { cards: state.rounds[2].cards, bud: state.rounds[2].bud } : undefined,
    },
  };
}

export function bcalc(state: GameUiState, r: RoundUiState, ctx: GameContext) {
  const D = roundDefFor(state);
  let iv = 0;
  let po = 0;
  for (const k of D.cards) {
    if (r.cards.includes(k.id)) iv += kostEur(k.kosten);
  }
  for (const p of D.posten) {
    po += r.bud[p.id] ?? 0;
  }
  const left = (isFullEpisode(state.episode) ? budgetOf(state.round, ctx) : budgetOfDef(D, state.round, ctx)) - iv - po;
  return { iv, po, left };
}

export function vermoedenQ(state: GameUiState, vermId: string | null): number {
  if (!vermId) return 1;
  const v = roundDefFor(state).verm.find((x) => x.id === vermId);
  return v?.q ?? 1;
}

export function freshRoundUi(episode: EpisodeId, round: 1 | 2): RoundUiState {
  const def = roundDefEpisode(episode, round);
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
    bud: isFullEpisode(episode) ? marcoBud(round) : marcoBudFromPosten(def.posten),
    coldSub: 0,
    trailerDone: false,
    reacted: false,
  };
}

export function freshHidden() {
  return {
    menselijkeMaat: 50,
    eerlijkheid: 50,
    logMm: [] as string[],
    logEer: [] as string[],
  };
}

export function freshGame(): GameUiState {
  return freshEpisode(4);
}

export function freshEpisode(episode: EpisodeId): GameUiState {
  return {
    v: 4,
    episode,
    opvolging: null,
    conceptLog: [],
    playerName: '',
    team: '',
    round: 1,
    phase: 'intro',
    rounds: { 1: freshRoundUi(episode, 1), 2: freshRoundUi(episode, 2) },
    results: {},
    tLeft: 600,
    timerOn: true,
    chatTab: 'g',
    inbox: [],
    msgText: {},
    msgTimes: {},
    read: {},
    typingId: null,
    dynamicBerichten: {},
    deliveredPhases: {},
    pendingReacties: false,
    dilemma: { choice: null, text: '', done: false },
    hidden: freshHidden(),
    filmKind: null,
    gok: null,
  };
}
