import { ROUNDS } from '@data/rounds';
import { SKELETON_ROUNDS } from '@data/skeleton/rounds';
import type { RoundDefinition } from '@data/schemas/rounds.schema';
import type { EpisodeId } from '@data/episodes/meta';
import { isFullEpisode } from '@data/episodes/meta';
import type { GameUiState } from '../game/uiTypes';

export function roundDefFor(state: Pick<GameUiState, 'episode' | 'round'>): RoundDefinition {
  if (isFullEpisode(state.episode)) {
    return ROUNDS[state.round];
  }
  const ep = state.episode as keyof typeof SKELETON_ROUNDS;
  return SKELETON_ROUNDS[ep];
}

export function roundDefEpisode(episode: EpisodeId, round: 1 | 2 = 1): RoundDefinition {
  if (isFullEpisode(episode)) return ROUNDS[round];
  return SKELETON_ROUNDS[episode as keyof typeof SKELETON_ROUNDS];
}
