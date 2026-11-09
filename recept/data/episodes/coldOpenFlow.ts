import { buildColdTimeline } from './coldOpenTimeline';
import { episodeContent } from './content';
import type { EpisodeId } from './meta';
import type { ColdOpenDef } from './content';

export function coldOpenForRound(episode: EpisodeId, round: 1 | 2): ColdOpenDef {
  const c = episodeContent(episode);
  return c.coldOpen[round] ?? c.coldOpen[1]!;
}

export function coldOpenTimelineForRound(episode: EpisodeId, round: 1 | 2) {
  const c = episodeContent(episode);
  const def = coldOpenForRound(episode, round);
  return buildColdTimeline(def, c.onderstroomActief);
}

/** Hoogste geldige coldSub-index (laatste regel). */
export function coldOpenMaxSub(episode: EpisodeId, round: 1 | 2): number {
  const steps = coldOpenTimelineForRound(episode, round);
  return Math.max(0, steps.length - 1);
}

export function canColdNext(episode: EpisodeId, round: 1 | 2, coldSub: number): boolean {
  return coldSub < coldOpenMaxSub(episode, round);
}
