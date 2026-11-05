import { episodeContent } from './content';
import type { EpisodeId } from './meta';
import type { ColdOpenDef } from './content';

export function coldOpenForRound(episode: EpisodeId, round: 1 | 2): ColdOpenDef {
  const c = episodeContent(episode);
  return c.coldOpen[round] ?? c.coldOpen[1]!;
}

/** Hoogste geldige coldSub-index (laatste regel). */
export function coldOpenMaxSub(episode: EpisodeId, round: 1 | 2): number {
  return Math.max(0, coldOpenForRound(episode, round).lines.length - 1);
}

export function canColdNext(episode: EpisodeId, round: 1 | 2, coldSub: number): boolean {
  return coldSub < coldOpenMaxSub(episode, round);
}
