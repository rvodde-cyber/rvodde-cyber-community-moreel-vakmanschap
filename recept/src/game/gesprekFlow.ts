import { episodeContent } from '@data/episodes/content';
import type { EpisodeMotorKind } from '@data/episodes/motor';
import type { Phase } from './uiTypes';

/** Ronde 1: optioneel teamgesprek vóór uitkomst (A4 uit via register). */
export function phaseAfterBesluitConfirm(
  episode: import('@data/episodes/meta').EpisodeId,
  round: 1 | 2,
  motor: EpisodeMotorKind,
): Phase {
  const content = episodeContent(episode);
  if (round === 1 && content.gesprekskaartActief) return 'gesprek';
  if (motor === 'a4') return 'scan';
  return 'uitkomst';
}

export function phaseAfterGesprek(_episode: import('@data/episodes/meta').EpisodeId): Phase {
  return 'uitkomst';
}
