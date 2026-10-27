import { compute } from '@engine/compute';
import { ROUNDS } from '@data/rounds';
import { freshGame, freshRoundUi, vermoedenQ } from './budgetUi';
import { pilotLockedCards } from './besluitRules';
import type { GameUiState, Phase } from './uiTypes';

export type GameAction =
  | { type: 'RESET' }
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_TEAM'; team: string }
  | { type: 'SET_PHASE'; phase: Phase }
  | { type: 'COLD_NEXT' }
  | { type: 'TRAILER_DONE' }
  | { type: 'TOGGLE_ACTIE'; id: string }
  | { type: 'SET_VERM'; id: string }
  | { type: 'SET_PILOT'; mode: 'pilot' | 'zelf' }
  | { type: 'TOGGLE_CARD'; id: string }
  | { type: 'TOGGLE_ROLE'; id: string }
  | { type: 'SET_FIELD'; field: 'mot' | 'min' | 'w0' | 'w1' | 'w2'; value: string }
  | { type: 'TOGGLE_MIN' }
  | { type: 'SET_BUD'; id: string; value: number }
  | { type: 'CONFIRM_BESLUIT' }
  | { type: 'FINISH_SCAN' }
  | { type: 'TRY_AGAIN' };

function roundState(state: GameUiState) {
  return state.rounds[state.round];
}

export function gameReducer(state: GameUiState, action: GameAction): GameUiState {
  switch (action.type) {
    case 'RESET':
      return freshGame();
    case 'SET_NAME':
      return { ...state, playerName: action.name.slice(0, 12) };
    case 'SET_TEAM':
      return { ...state, team: action.team.slice(0, 40) };
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'TRAILER_DONE':
      return {
        ...state,
        rounds: {
          ...state.rounds,
          [state.round]: { ...roundState(state), trailerDone: true },
        },
      };
    case 'COLD_NEXT': {
      const r = roundState(state);
      const max = 4;
      if (r.coldSub >= max) return state;
      return {
        ...state,
        rounds: {
          ...state.rounds,
          [state.round]: { ...r, coldSub: r.coldSub + 1 },
        },
      };
    }
    case 'TOGGLE_ACTIE': {
      const r = roundState(state);
      const has = r.acties.includes(action.id);
      let acties = r.acties;
      if (has) acties = acties.filter((x) => x !== action.id);
      else if (acties.length < 3) acties = [...acties, action.id];
      return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, acties } } };
    }
    case 'SET_VERM':
      return {
        ...state,
        rounds: {
          ...state.rounds,
          [state.round]: { ...roundState(state), verm: action.id },
        },
      };
    case 'SET_PILOT': {
      const r = roundState(state);
      const pc = ROUNDS[state.round].pilotCard;
      let cards = r.cards;
      if (action.mode === 'pilot' && !cards.includes(pc)) {
        cards = [pc, ...cards].slice(0, 2);
      }
      return {
        ...state,
        rounds: {
          ...state.rounds,
          [state.round]: { ...r, pilot: action.mode, cards },
        },
      };
    }
    case 'TOGGLE_CARD': {
      const r = roundState(state);
      if (r.pilot === 'pilot' && action.id === ROUNDS[state.round].pilotCard) return state;
      const has = r.cards.includes(action.id);
      let cards = r.cards;
      if (has) cards = cards.filter((x) => x !== action.id);
      else if (cards.length < 2) cards = [...cards, action.id];
      return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, cards } } };
    }
    case 'TOGGLE_ROLE': {
      const r = roundState(state);
      const has = r.spoken.includes(action.id);
      const spoken = has ? r.spoken.filter((x) => x !== action.id) : [...r.spoken, action.id];
      return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, spoken } } };
    }
    case 'SET_FIELD': {
      const r = roundState(state);
      if (action.field === 'mot') return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, mot: action.value } } };
      if (action.field === 'min') return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, min: action.value } } };
      const w = [...r.w] as [string, string, string];
      if (action.field === 'w0') w[0] = action.value;
      if (action.field === 'w1') w[1] = action.value;
      if (action.field === 'w2') w[2] = action.value;
      return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, w } } };
    }
    case 'TOGGLE_MIN': {
      const r = roundState(state);
      return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, minOn: !r.minOn } } };
    }
    case 'SET_BUD': {
      const r = roundState(state);
      return {
        ...state,
        rounds: {
          ...state.rounds,
          [state.round]: { ...r, bud: { ...r.bud, [action.id]: action.value } },
        },
      };
    }
    case 'CONFIRM_BESLUIT': {
      const r = roundState(state);
      const cards = pilotLockedCards(state);
      const ctx = {
        results: state.results,
        rounds: {
          ...state.rounds,
          [state.round]: { cards, bud: r.bud },
        },
      };
      const q = vermoedenQ(state.round, r.verm);
      const res = compute(state.round, cards, q, ctx, r.bud);
      return {
        ...state,
        phase: 'scan',
        results: { ...state.results, [state.round]: res },
        rounds: { ...state.rounds, [state.round]: { ...r, cards } },
      };
    }
    case 'FINISH_SCAN':
      return { ...state, phase: 'uitkomst' };
    case 'TRY_AGAIN': {
      const r = roundState(state);
      const pc = ROUNDS[state.round].pilotCard;
      const cards = r.pilot === 'pilot' ? [pc] : [];
      const nextR = {
        ...r,
        cards,
        spoken: [],
        bud: freshRoundUi(state.round).bud,
      };
      const results = { ...state.results };
      delete results[state.round];
      return {
        ...state,
        phase: 'besluit',
        results,
        rounds: { ...state.rounds, [state.round]: nextR },
        tLeft: state.tLeft > 0 ? state.tLeft : 600,
      };
    }
    default:
      return state;
  }
}

export { freshGame };
