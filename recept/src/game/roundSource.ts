import type { RoundDefinition } from '@data/schemas/rounds.schema';
import type { EpisodeId } from '@data/episodes/meta';
import { episodeContent } from '@data/episodes/content';
import type { GameUiState } from '../game/uiTypes';

export function roundDefFor(state: Pick<GameUiState, 'episode' | 'round'>): RoundDefinition {
  const c = episodeContent(state.episode);
  return c.rounds[state.round] ?? c.rounds[1];
}

export function roundDefEpisode(episode: EpisodeId, round: 1 | 2 = 1): RoundDefinition {
  const c = episodeContent(episode);
  return c.rounds[round] ?? c.rounds[1];
}
