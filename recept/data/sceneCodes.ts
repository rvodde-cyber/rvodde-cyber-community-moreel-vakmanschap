import type { EpisodeId } from './episodes/meta';

/** Intro-beeld: akkoord-code (I1–I5) vs bestand in public/beelden/ */
export const INTRO_SCENE: Record<EpisodeId, { checkCode: string; fileCode: string }> = {
  1: { checkCode: 'I1', fileCode: 'I1' },
  2: { checkCode: 'I2', fileCode: 'I2' },
  3: { checkCode: 'I3', fileCode: 'I3' },
  4: { checkCode: 'I4', fileCode: 'T4' },
  5: { checkCode: 'I5', fileCode: 'I5' },
};

export const COLD_SCENE: Record<Exclude<EpisodeId, 4>, { checkCode: string; fileCode: string }> = {
  1: { checkCode: 'I1', fileCode: 'I1' },
  2: { checkCode: 'I2', fileCode: 'I2' },
  3: { checkCode: 'I3', fileCode: 'I3' },
  5: { checkCode: 'I5', fileCode: 'I5' },
};
