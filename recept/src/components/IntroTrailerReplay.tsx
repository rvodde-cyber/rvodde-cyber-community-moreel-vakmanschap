import { episodeContent } from '@data/episodes/content';
import type { GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';

export function IntroTrailerReplay({
  state,
  dispatch,
}: {
  state: GameUiState;
  dispatch: (a: GameAction) => void;
}) {
  if (state.round !== 1) return null;
  if (episodeContent(state.episode).trailerActief === false) return null;
  return (
    <button
      type="button"
      className="btn ghost intro-trailer-replay"
      onClick={() => dispatch({ type: 'REPLAY_EPISODE_TRAILER' })}
    >
      Trailer opnieuw bekijken
    </button>
  );
}
