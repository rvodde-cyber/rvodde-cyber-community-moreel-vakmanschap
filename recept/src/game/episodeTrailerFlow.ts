import { episodeContent } from '@data/episodes/content';
import type { EpisodeId } from '@data/episodes/meta';

export type TrailerGezien = Partial<Record<EpisodeId, boolean>>;

export function episodeTrailerActief(episode: EpisodeId): boolean {
  return episodeContent(episode).trailerActief !== false;
}

export function moetAfleveringstrailer(
  episode: EpisodeId,
  trailerGezien: TrailerGezien,
  vanafIntro: boolean,
): boolean {
  if (!vanafIntro) return false;
  if (!episodeTrailerActief(episode)) return false;
  return !trailerGezien[episode];
}
