import type { PeriodKey } from '../../themes/periods';

export type EpisodeId = 1 | 2 | 3 | 4 | 5;
export type EpisodePlayMode = 'full' | 'skeleton';

export interface EpisodeMeta {
  id: EpisodeId;
  jaar: number;
  titel: string;
  greinerCrisis: string;
  periodKey: PeriodKey;
  playMode: EpisodePlayMode;
  kick: string;
}

export const EPISODES: EpisodeMeta[] = [
  {
    id: 1,
    jaar: 1984,
    titel: 'Alles met de hand',
    greinerCrisis: 'leiderschapscrisis',
    periodKey: '1984',
    playMode: 'skeleton',
    kick: 'AFLEVERING 1 / 1984',
  },
  {
    id: 2,
    jaar: 1996,
    titel: 'Sneller, Gerrit',
    greinerCrisis: 'autonomiecrisis',
    periodKey: '1996',
    playMode: 'skeleton',
    kick: 'AFLEVERING 2 / 1996',
  },
  {
    id: 3,
    jaar: 2009,
    titel: 'Een Van Gorp aan het roer',
    greinerCrisis: 'controlecrisis',
    periodKey: '2009',
    playMode: 'skeleton',
    kick: 'AFLEVERING 3 / 2009',
  },
  {
    id: 4,
    jaar: 2026,
    titel: 'Het dashboard liegt niet',
    greinerCrisis: 'leiderschapscrisis',
    periodKey: '2026',
    playMode: 'full',
    kick: 'AFLEVERING 4 / 2026',
  },
  {
    id: 5,
    jaar: 2036,
    titel: 'Wie heeft het schrift?',
    greinerCrisis: 'coordinatiecrisis',
    periodKey: '2036',
    playMode: 'skeleton',
    kick: 'AFLEVERING 5 / 2036',
  },
];

export function episodeMeta(id: EpisodeId): EpisodeMeta {
  const m = EPISODES.find((e) => e.id === id);
  if (!m) throw new Error(`Onbekende aflevering ${id}`);
  return m;
}

export function isFullEpisode(id: EpisodeId): boolean {
  return episodeMeta(id).playMode === 'full';
}
