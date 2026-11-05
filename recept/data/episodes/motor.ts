import type { EpisodeId } from './meta';
import { episodeContent } from './content';

export type EpisodeMotorKind = 'a4' | 'interventie' | 'skeleton';

export function episodeMotorKind(episode: EpisodeId): EpisodeMotorKind {
  return episodeContent(episode).motorKind;
}

export function usesInterventieMotor(episode: EpisodeId): boolean {
  return episodeMotorKind(episode) === 'interventie';
}

/** UI-label „— skelet” op de aflevering-keuzelijst (register, niet playMode in meta). */
export function showsSkeletLabel(episode: EpisodeId): boolean {
  return episodeMotorKind(episode) === 'skeleton';
}
