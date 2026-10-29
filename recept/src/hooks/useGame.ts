import { useEffect, useReducer } from 'react';
import { freshGame, gameReducer, type GameAction } from '../game/gameReducer';
import { migrateGameState } from '../game/migrateState';
import type { GameUiState } from '../game/uiTypes';

const KEY = 'recept-game-v4';

function load(): GameUiState | null {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem('recept-game-v3');
    if (!raw) return null;
    return migrateGameState(JSON.parse(raw));
  } catch {
    return null;
  }
}

function save(state: GameUiState) {
  try {
    if (state.phase === 'intro' && state.round === 1 && !state.playerName) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, freshGame(), (init) => load() ?? init);

  useEffect(() => {
    save(state);
  }, [state]);

  useEffect(() => {
    if (!state.timerOn) return;
    if (state.phase !== 'onderzoek' && state.phase !== 'besluit') return;
    const id = window.setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => window.clearInterval(id);
  }, [state.timerOn, state.phase]);

  const act = (action: GameAction) => dispatch(action);

  return { state, dispatch: act, hasSave: !!load() };
}
