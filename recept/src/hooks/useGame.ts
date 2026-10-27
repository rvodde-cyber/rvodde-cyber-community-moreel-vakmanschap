import { useEffect, useReducer } from 'react';
import { freshGame, gameReducer, type GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';

const KEY = 'recept-game-v3';

function load(): GameUiState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as GameUiState;
    return s.v === 3 ? s : null;
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

  const act = (action: GameAction) => dispatch(action);

  return { state, dispatch: act, hasSave: !!load() };
}
