import { compute } from '@engine/compute';
import { BERICHTEN, dilemmaGroepBerichten, dilemmaGroepBerichtenA5 } from '@data/berichten';
import type { BerichtDef, ChatChannel } from '@data/berichten';
import { episodeContent } from '@data/episodes/content';
import type { DilemmaKeuze } from '@data/episodes/dilemmaDef';
import { episodeMotorKind, usesInterventieMotor } from '@data/episodes/motor';
import { canColdNext } from '@data/episodes/coldOpenFlow';
import { useSkeletonMotor } from '@data/interventieFlags';
import type { EpisodeId } from '@data/episodes/meta';
import {
  initialInterventieMeters,
  interventieCompute,
  laterEffectenVanKeuze,
} from '@engine/interventieCompute';
import { applyInterventieHidden } from './interventieHidden';
import { applyAutoFixBud } from './budgetFix';
import { freshGame, freshEpisode, freshRoundUi, vermoedenQ } from './budgetUi';
import { roundDefFor } from './roundSource';
import { stubComputeResult } from './stubCompute';
import { okArgument } from '@data/schemas/argument.schema';
import { okBesluitKeuze, pilotLockedCards } from './besluitRules';
import { chatTimeLabel } from './chatHelpers';
import { applyDilemmaHidden, applyHiddenAfterRound } from './hiddenMeters';
import { phaseAfterBesluitConfirm, phaseAfterGesprek } from './gesprekFlow';
import { validateGesprekOpslaan, type GesprekskaartExportEntry } from '@data/schemas/gesprekskaart.schema';
import { gesprekskaartVoor } from '@data/gesprekskaarten';
import { moetAfleveringstrailer } from './episodeTrailerFlow';
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
  | { type: 'PROCEED_TO_ARGUMENT' }
  | { type: 'SET_FIELD'; field: 'mot' | 'min' | 'argument' | 'tegenargument' | 'w0' | 'w1' | 'w2'; value: string }
  | { type: 'TOGGLE_MIN' }
  | { type: 'SET_BUD'; id: string; value: number }
  | { type: 'AUTO_FIX_BUDGET' }
  | { type: 'CONFIRM_BESLUIT' }
  | { type: 'GESPREK_OPSLAAN'; zin: string; waarden: string[]; tijdsduurSec: number }
  | { type: 'GESPREK_OVERSLAAN'; tijdsduurSec: number }
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
  | { type: 'TOGGLE_TIJDGEEST_GELUID' }
  | { type: 'START_EPISODE'; episode: import('@data/episodes/meta').EpisodeId }
  | { type: 'SKIP_EPISODE_TRAILER'; markSeen: boolean }
  | { type: 'REPLAY_EPISODE_TRAILER' }
  | { type: 'SET_OPVOLGING'; keuze: import('@data/opvolging').OpvolgingKeuze }
  | { type: 'EXIT_TO_HOME' }
  | { type: 'TICK' }
  | { type: 'ADJUST_TIMER'; delta: number }
  | { type: 'SET_TIMER_ON'; on: boolean };

function roundState(state: GameUiState) {
  return state.rounds[state.round];
}

function replaceGesprekEntry(state: GameUiState, entry: GesprekskaartExportEntry): GesprekskaartExportEntry[] {
  const kaartId = gesprekskaartVoor(state.episode).id;
  const rest = state.gesprekskaarten.filter(
    (g) => !(g.episode === state.episode && g.kaartId === kaartId),
  );
  return [...rest, entry];
}

function clearGesprekForEpisode(state: GameUiState): GesprekskaartExportEntry[] {
  const kaartId = gesprekskaartVoor(state.episode).id;
  return state.gesprekskaarten.filter((g) => !(g.episode === state.episode && g.kaartId === kaartId));
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
    case 'START_EPISODE': {
      const trailerGezien = state.trailerGezien ?? {};
      const phase: Phase = moetAfleveringstrailer(action.episode, trailerGezien, true) ? 'trailer' : 'intro';
      return {
        ...freshEpisode(action.episode),
        playerName: state.playerName,
        team: state.team,
        trailerGezien,
        phase,
      };
    }
    case 'SKIP_EPISODE_TRAILER': {
      const ep = state.episode;
      const trailerGezien = { ...(state.trailerGezien ?? {}) };
      if (action.markSeen) trailerGezien[ep] = true;
      return { ...state, phase: 'intro', trailerGezien };
    }
    case 'REPLAY_EPISODE_TRAILER':
      if (episodeContent(state.episode).trailerActief === false) return state;
      return { ...state, phase: 'trailer' };
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
      const round = state.round as 1 | 2;
      if (!canColdNext(state.episode, round, r.coldSub)) return state;
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
    case 'PROCEED_TO_ARGUMENT':
      if (!okBesluitKeuze(state)) return state;
      return { ...state, phase: 'argument' };
    case 'SET_FIELD': {
      const r = roundState(state);
      if (action.field === 'mot') return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, mot: action.value } } };
      if (action.field === 'min') return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, min: action.value } } };
      if (action.field === 'argument') {
        return { ...state, rounds: { ...state.rounds, [state.round]: { ...r, argument: action.value.slice(0, 280) } } };
      }
      if (action.field === 'tegenargument') {
        return {
          ...state,
          rounds: { ...state.rounds, [state.round]: { ...r, tegenargument: action.value.slice(0, 140) } },
        };
      }
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
    case 'AUTO_FIX_BUDGET':
      return applyAutoFixBud(state);
    case 'CONFIRM_BESLUIT': {
      if (state.phase !== 'argument') return state;
      const r = roundState(state);
      if (!okBesluitKeuze(state) || !okArgument(r.argument, r.tegenargument)) return state;
      const cards = pilotLockedCards(state);
      const motor = episodeMotorKind(state.episode);
      if (motor === 'interventie') {
        const ep = state.episode as Exclude<EpisodeId, 4>;
        const D = roundDefFor(state);
        const meterIn =
          state.interventieMeters ??
          initialInterventieMeters(ep);
        const laterFromPrevRound =
          state.round === 2 ? laterEffectenVanKeuze(state.rounds[1].cards) : [];
        const { result, meterStateOut, hiddenDelta } = interventieCompute({
          episode: ep,
          round: state.round,
          cardIds: cards,
          roundDef: D,
          meterStateIn: meterIn,
          laterFromPrevRound,
        });
        const hidden = applyInterventieHidden(state.hidden, cards, hiddenDelta);
        const nextPhase = phaseAfterBesluitConfirm(state.episode, state.round, motor);
        return {
          ...state,
          phase: nextPhase,
          hidden,
          interventieMeters: meterStateOut,
          results: { ...state.results, [state.round]: result },
          rounds: { ...state.rounds, [state.round]: { ...r, cards } },
        };
      }
      if (motor === 'skeleton') {
        const D = roundDefFor(state);
        const res = stubComputeResult(D, cards, r.bud);
        const conceptLog = [...state.conceptLog];
        for (const id of cards) {
          const c = D.cards.find((x) => x.id === id);
          if (c?.status === 'concept') conceptLog.push(`ep${state.episode}-${id}`);
        }
        const nextPhase = phaseAfterBesluitConfirm(state.episode, state.round, motor);
        return {
          ...state,
          phase: nextPhase,
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
      const hidden = applyHiddenAfterRound(
        state.hidden,
        state.episode,
        state.round,
        { ...r, cards },
        res,
      );
      const nextPhase = phaseAfterBesluitConfirm(state.episode, state.round, motor);
      return {
        ...state,
        phase: nextPhase,
        hidden,
        results: { ...state.results, [state.round]: res },
        rounds: { ...state.rounds, [state.round]: { ...r, cards } },
      };
    }
    case 'GESPREK_OPSLAAN': {
      if (state.phase !== 'gesprek' || state.round !== 1) return state;
      const v = validateGesprekOpslaan(action.zin, action.waarden);
      if (!v.ok) return state;
      const kaart = gesprekskaartVoor(state.episode);
      const entry: GesprekskaartExportEntry = {
        episode: state.episode,
        kaartId: kaart.id,
        zin: action.zin.trim(),
        waarden: [...action.waarden],
        overgeslagen: false,
        tijdsduurSec: action.tijdsduurSec,
      };
      return {
        ...state,
        phase: phaseAfterGesprek(state.episode),
        gesprekskaarten: replaceGesprekEntry(state, entry),
      };
    }
    case 'GESPREK_OVERSLAAN': {
      if (state.phase !== 'gesprek' || state.round !== 1) return state;
      const kaart = gesprekskaartVoor(state.episode);
      const entry: GesprekskaartExportEntry = {
        episode: state.episode,
        kaartId: kaart.id,
        zin: '',
        waarden: [],
        overgeslagen: true,
        tijdsduurSec: action.tijdsduurSec,
      };
      return {
        ...state,
        phase: phaseAfterGesprek(state.episode),
        gesprekskaarten: replaceGesprekEntry(state, entry),
      };
    }
    case 'FINISH_SCAN':
      return { ...state, phase: 'uitkomst', pendingReacties: true };
    case 'TRY_AGAIN': {
      const r = roundState(state);
      const D = roundDefFor(state);
      const pc = D.pilotCard;
      const cards = r.pilot === 'pilot' && pc ? [pc] : [];
      const nextR = {
        ...r,
        cards,
        spoken: [],
        argument: '',
        tegenargument: '',
        reacted: false,
        bud: freshRoundUi(state.episode, state.round).bud,
      };
      const results = { ...state.results };
      delete results[state.round];
      let interventieMeters = state.interventieMeters;
      if (usesInterventieMotor(state.episode)) {
        const ep = state.episode as Exclude<EpisodeId, 4>;
        if (state.round === 1) {
          interventieMeters = initialInterventieMeters(ep);
        } else if (state.rounds[1].cards.length === 2) {
          interventieMeters = interventieCompute({
            episode: ep,
            round: 1,
            cardIds: state.rounds[1].cards,
            roundDef: roundDefFor({ ...state, round: 1 }),
            meterStateIn: initialInterventieMeters(ep),
            laterFromPrevRound: [],
          }).meterStateOut;
        }
      }
      return {
        ...state,
        phase: 'besluit',
        results,
        interventieMeters,
        pendingReacties: false,
        gesprekskaarten: state.round === 1 ? clearGesprekForEpisode(state) : state.gesprekskaarten,
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
      const def = episodeContent(state.episode).dilemma;
      if (!choice || !def) return state;
      const minPriv = def.effecten.prive.minTekst ?? 10;
      if (choice === 'prive' && text.replace(/\s/g, '').length < minPriv) return state;

      let next: GameUiState = {
        ...state,
        dilemma: { ...state.dilemma, done: true },
        hidden: applyDilemmaHidden(state.hidden, def, choice, text),
      };

      if (choice === 'groep' && (def.privéBericht.kanaal === 'app' || def.privéBericht.kanaal === 'lens')) {
        const defs =
          state.episode === 5 && def.id === 'ep5-schrift'
            ? dilemmaGroepBerichtenA5(state.playerName)
            : dilemmaGroepBerichten(state.playerName);
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
        const content = episodeContent(state.episode);
        if (content.roundCount === 2 && content.tussenKaart) {
          next = { ...next, phase: 'tussen' };
        } else if (useSkeletonMotor(state.episode)) {
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
    case 'TOGGLE_TIJDGEEST_GELUID':
      return { ...state, tijdgeestGeluidAan: !state.tijdgeestGeluidAan };
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
