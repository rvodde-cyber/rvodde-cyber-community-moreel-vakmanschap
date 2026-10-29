import { useEffect, useRef } from 'react';
import { BERICHTEN, resolveTekst } from '@data/berichten';
import type { GameAction } from '../game/gameReducer';
import { berichtCtx, phaseDeliveryKey } from '../game/chatHelpers';
import { reactiesVoorRonde } from '../game/reacties';
import type { GameUiState } from '../game/uiTypes';

const TYPING_MS = 1800;

function scheduleDeliver(
  dispatch: (a: GameAction) => void,
  id: string,
  text: string,
  delay: number,
  timers: number[],
) {
  timers.push(
    window.setTimeout(() => dispatch({ type: 'CHAT_TYPING', id }), delay),
  );
  timers.push(
    window.setTimeout(() => {
      dispatch({ type: 'CHAT_DELIVER', id, text });
    }, delay + TYPING_MS),
  );
}

export function useMessageDelivery(state: GameUiState, dispatch: (a: GameAction) => void) {
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      for (const t of timersRef.current) window.clearTimeout(t);
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const phase = state.phase;
    if (phase !== 'onderzoek' && phase !== 'besluit') return;

    const key = phaseDeliveryKey(state.round, phase);
    if (state.deliveredPhases[key]) return;

    const ctx = berichtCtx(state);
    const batch = BERICHTEN.filter((m) => m.round === state.round && m.at === phase);
    const timers: number[] = [];

    for (const m of batch) {
      if (state.inbox.includes(m.id)) continue;
      const text = resolveTekst(m, ctx);
      scheduleDeliver(dispatch, m.id, text, m.delay, timers);
    }

    dispatch({ type: 'MARK_PHASE_DELIVERED', key });
    timersRef.current.push(...timers);
  }, [state.phase, state.round, state.deliveredPhases, dispatch, state.playerName, state.results]);

  useEffect(() => {
    if (!state.pendingReacties) return;
    const r = state.rounds[state.round];
    if (r.reacted) return;
    const res = state.results[state.round];
    if (!res) return;

    dispatch({ type: 'CLEAR_PENDING_REACTIES' });

    const reacties = reactiesVoorRonde(state, res);

    dispatch({ type: 'REGISTER_DYNAMIC', berichten: reacties });
    const ctx = berichtCtx(state);
    const timers: number[] = [];
    reacties.forEach((m, i) => {
      if (state.inbox.includes(m.id)) return;
      const text = resolveTekst(m, ctx);
      scheduleDeliver(dispatch, m.id, text, 2600 + i * 4800, timers);
    });
    timersRef.current.push(...timers);
  }, [state.pendingReacties, state.round, state.results, state.rounds, dispatch]);

  useEffect(() => {
    if (!state.dilemma.done || state.dilemma.choice !== 'groep') return;
    if (state.inbox.includes('dil-h')) return;

    const defs = [state.dynamicBerichten['dil-h'], state.dynamicBerichten['dil-m']].filter(Boolean);
    if (defs.length < 2) return;

    const ctx = berichtCtx(state);
    const timers: number[] = [];
    for (const m of defs) {
      if (!m || state.inbox.includes(m.id)) continue;
      const text = resolveTekst(m, ctx);
      scheduleDeliver(dispatch, m.id, text, m.delay, timers);
    }
    timersRef.current.push(...timers);
  }, [state.dilemma.done, state.dilemma.choice, state.dynamicBerichten, state.inbox, dispatch]);
}
