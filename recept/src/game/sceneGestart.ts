import { usesBeslistijdTimer } from '@data/episodes/motor';
import type { GameUiState, RoundUiState } from './uiTypes';

/** Bepaalt of de briefing overgeslagen moet worden (hervatten / oude saves). */
export function inferSceneGestartOp(
  round: RoundUiState & { sceneGestartOp?: number | null },
  state: GameUiState,
  roundNum: 1 | 2,
): number | null {
  if (round.sceneGestartOp != null) return round.sceneGestartOp;
  if (state.round !== roundNum) return null;
  const coldStarted = round.coldSub > 0 || round.trailerDone;
  const pastCold = !['trailer', 'intro', 'cold'].includes(state.phase);
  const timerLiepAl =
    usesBeslistijdTimer(state.episode) &&
    pastCold &&
    (state.timerOn || state.tLeft < 600);
  if (coldStarted || pastCold || timerLiepAl) return 1;
  return null;
}

export function roundNeedsSceneBriefing(
  round: RoundUiState,
  state: GameUiState,
  roundNum: 1 | 2,
): boolean {
  return state.round === roundNum && state.phase === 'cold' && inferSceneGestartOp(round, state, roundNum) == null;
}