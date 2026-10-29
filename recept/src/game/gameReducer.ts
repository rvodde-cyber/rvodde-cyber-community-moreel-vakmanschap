import { compute } from '@engine/compute';
import { BERICHTEN } from '@data/berichten';
import type { BerichtDef } from '@data/berichten';
import type { DilemmaKeuze } from '@data/dilemmas/ep4-piotr';
import { dilemmaGroepBerichten } from '@data/berichten';
import type { ChatChannel } from '@data/berichten';
import { useSkeletonMotor } from '@data/interventieFlags';
import { freshGame, freshEpisode, freshRoundUi, vermoedenQ } from './budgetUi';
import { roundDefFor } from './roundSource';
import { stubComputeResult } from './stubCompute';
import { pilotLockedCards } from './besluitRules';
import { chatTimeLabel } from './chatHelpers';
import { applyDilemmaHidden, applyHiddenAfterRound } from './hiddenMeters';
import type { GameUiState, Phase } from './uiTypes';
import type { FilmKind } from './uiTypes';

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
  | { type: 'MARK_ROLE_SPOKE'; id: string }
  | { type: 'SET_FIELD'; field: 'mot' | 'min' | 'w0' | 'w1' | 'w2'; value: string }
  | { type: 'TOGGLE_MIN' }
  | { type: 'SET_BUD'; id: string; value: number }
  | { type: 'CONFIRM_BESLUIT' }
  | { type: 'FINISH_SCAN' }
  | { type: 'TRY_AGAIN' }
  | { type: 'SET_CHAT_TAB'; tab: ChatChannel }
  | { type: 'CHAT_TYPING'; id: string }
  | { type: 'CHAT_DELIVER'; id: string; text: string }
  | { type: 'MARK_PHASE_DELIVERED'; key: string }
  | { type: 'SET_DILEMMA_CHOICE'; choice: DilemmaKeuze }
  | { type: 'SET_DILEMMA_TEXT'; text: string }
  | { type: 'CONFIRM_DILEMMA' }
  | { type: 'REGISTER_DYNAMIC'; berichten: BerichtDef[] }
  | { type: 'CLEAR_PENDING_REACTIES' }
  | { type: 'PLAY_FILM'; kind: FilmKind }
  | { type: 'END_FILM' }
  | { type: 'START_ROUND_2' }
  | { type: 'SET_GOK'; id: string }
  | { type: 'START_EPISODE'; episode: import('@data/episodes/meta').EpisodeId }
  | { type: 'SET_OPVOLGING'; keuze: import('@data/opvolging').OpvolgingKeuze }
  | { type: 'EXIT_TO_HOME' }
  | { type: 'TICK' }
  | { type: 'ADJUST_TIMER'; delta: number }
  | { type: 'SET_TIMER_ON'; on: boolean };

function roundState(state: GameUiState) {
  return state.rounds[state.round];
}

function deliverMessage(state: GameUiState, id: string, text: string): GameUiState {
  if (state.inbox.includes(id)) return state;
  return {
    ...state,
    typingId: null,
    inbox: [...state.inbox, id],
    msgText: { ...state.msgText, [id]: text },
    msgTimes: { ...state.msgTimes, [id]: chatTimeLabel(state.round) },
  };
}

export function gameReducer(state: GameUiState, action: GameAction): GameUiState {
  switch (action.type) {
    case 'RESET':
      return freshGame();
    case 'START_EPISODE':
      return { ...freshEpisode(action.episode), playerName: state.playerName, team: state.team };
    case 'SET_OPVOLGING':
      return { ...state, opvolging: action.keuze, phase: 'pauze' };
    case 'EXIT_TO_HOME':
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
        filmKind: null,
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
      const pc = roundDefFor(state).pilotCard;
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
      if (r.pilot === 'pilot' && action.id === roundDefFor(state).pilotCard) return state;
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
    case 'MARK_ROLE_SPOKE': {
      const r = roundState(state);
      if (r.spoken.includes(action.id)) return state;
      return {
        ...state,
        rounds: { ...state.rounds, [state.round]: { ...r, spoken: [...r.spoken, action.id] } },
      };
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
      if (useSkeletonMotor(state.episode)) {
        const D = roundDefFor(state);
        const res = stubComputeResult(D, cards, r.bud);
        const conceptLog = [...state.conceptLog];
        for (const id of cards) {
          const c = D.cards.find((x) => x.id === id);
          if (c?.status === 'concept') conceptLog.push(`ep${state.episode}-${id}`);
        }
        return {
          ...state,
          phase: 'uitkomst',
          conceptLog,
          results: { ...state.results, [state.round]: res },
          rounds: { ...state.rounds, [state.round]: { ...r, cards } },
        };
      }
      const ctx = {
        results: state.results,
        rounds: {
          ...state.rounds,
          [state.round]: { cards, bud: r.bud },
        },
      };
      const q = vermoedenQ(state, r.verm);
      const res = compute(state.round, cards, q, ctx, r.bud);
      const hidden = applyHiddenAfterRound(state.hidden, state.round, { ...r, cards }, res);
      return {
        ...state,
        phase: 'scan',
        hidden,
        results: { ...state.results, [state.round]: res },
        rounds: { ...state.rounds, [state.round]: { ...r, cards } },
      };
    }
    case 'FINISH_SCAN':
      return { ...state, phase: 'uitkomst', pendingReacties: true };
    case 'TRY_AGAIN': {
      const r = roundState(state);
      const pc = roundDefFor(state).pilotCard;
      const cards = r.pilot === 'pilot' ? [pc] : [];
      const nextR = {
        ...r,
        cards,
        spoken: [],
        reacted: false,
        bud: freshRoundUi(state.episode, state.round).bud,
      };
      const results = { ...state.results };
      delete results[state.round];
      return {
        ...state,
        phase: 'besluit',
        results,
        pendingReacties: false,
        rounds: { ...state.rounds, [state.round]: nextR },
        tLeft: state.tLeft > 0 ? state.tLeft : 600,
      };
    }
    case 'SET_CHAT_TAB': {
      const tab = action.tab;
      const read = { ...state.read };
      for (const id of state.inbox) {
        const def = state.dynamicBerichten[id] ?? BERICHTEN.find((m) => m.id === id);
        if (def?.channel === tab) read[id] = true;
      }
      return { ...state, chatTab: tab, read };
    }
    case 'CHAT_TYPING':
      return { ...state, typingId: action.id };
    case 'CHAT_DELIVER':
      return deliverMessage(state, action.id, action.text);
    case 'MARK_PHASE_DELIVERED':
      return {
        ...state,
        deliveredPhases: { ...state.deliveredPhases, [action.key]: true },
      };
    case 'SET_DILEMMA_CHOICE':
      return {
        ...state,
        dilemma: { ...state.dilemma, choice: action.choice },
      };
    case 'SET_DILEMMA_TEXT':
      return {
        ...state,
        dilemma: { ...state.dilemma, text: action.text.slice(0, 400) },
      };
    case 'CONFIRM_DILEMMA': {
      const { choice, text } = state.dilemma;
      if (!choice) return state;
      if (choice === 'prive' && text.replace(/\s/g, '').length < 10) return state;

      let next: GameUiState = {
        ...state,
        dilemma: { ...state.dilemma, done: true },
        hidden: applyDilemmaHidden(state.hidden, choice, text),
      };

      if (choice === 'groep') {
        const defs = dilemmaGroepBerichten(state.playerName);
        const dynamicBerichten = { ...next.dynamicBerichten };
        for (const d of defs) dynamicBerichten[d.id] = d;
        const own = defs[0]!;
        const ownText = typeof own.tekst === 'string' ? own.tekst : own.tekst({ playerName: state.playerName });
        next = {
          ...next,
          dynamicBerichten,
          chatTab: 'g',
          read: { ...next.read, [own.id]: true },
        };
        next = deliverMessage(next, own.id, ownText);
      }
      return next;
    }
    case 'REGISTER_DYNAMIC': {
      const dynamicBerichten = { ...state.dynamicBerichten };
      for (const b of action.berichten) dynamicBerichten[b.id] = b;
      return { ...state, dynamicBerichten };
    }
    case 'CLEAR_PENDING_REACTIES': {
      const r = roundState(state);
      return {
        ...state,
        pendingReacties: false,
        rounds: { ...state.rounds, [state.round]: { ...r, reacted: true } },
      };
    }
    case 'PLAY_FILM':
      return { ...state, filmKind: action.kind };
    case 'END_FILM': {
      const kind = state.filmKind;
      if (!kind) return state;
      let next: GameUiState = { ...state, filmKind: null };
      if (kind === 'trailer-r1' || kind === 'trailer-r2') {
        next = {
          ...next,
          rounds: {
            ...next.rounds,
            [next.round]: { ...roundState(next), trailerDone: true },
          },
        };
      } else if (kind === 'slot-r1') {
        if (useSkeletonMotor(state.episode)) {
          next = { ...next, phase: state.episode === 3 ? 'opvolging' : 'pauze' };
        } else {
          next = { ...next, phase: 'tussen' };
        }
      } else if (kind === 'finale') {
        next = { ...next, phase: 'voorspel' };
      }
      return next;
    }
    case 'START_ROUND_2': {
      const delivered: Record<string, true> = {};
      for (const [k, v] of Object.entries(state.deliveredPhases)) {
        if (!k.startsWith('2-')) delivered[k] = v;
      }
      return {
        ...state,
        round: 2,
        phase: 'intro',
        tLeft: 600,
        filmKind: null,
        pendingReacties: false,
        deliveredPhases: delivered,
        rounds: { ...state.rounds, 2: freshRoundUi(state.episode, 2) },
      };
    }
    case 'SET_GOK':
      return { ...state, gok: action.id };
    case 'TICK': {
      if (!state.timerOn || state.tLeft <= 0) return state;
      if (state.phase !== 'onderzoek' && state.phase !== 'besluit') return state;
      return { ...state, tLeft: state.tLeft - 1 };
    }
    case 'ADJUST_TIMER':
      return { ...state, tLeft: Math.max(0, Math.min(3600, state.tLeft + action.delta)) };
    case 'SET_TIMER_ON':
      return { ...state, timerOn: action.on };
    default:
      return state;
  }
}

export { freshGame, freshEpisode } from './budgetUi';
