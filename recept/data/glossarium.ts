import type { EpisodeId } from './episodes/meta';
import { EPISODES } from './episodes/meta';
import { PERSONEN, persoonVoorAflevering } from './personen';
import type { Persoon } from './schemas/personen.schema';

/** Slugs in volgorde op het glossariumscherm Wie is wie (prioriteit 1). Geen zus. */
const GLOSSARIUM_SLUGS: Record<EpisodeId, readonly string[]> = {
  1: ['harrie-van-gorp', 'lies-van-gorp', 'gerrit-smulders'],
  2: ['harrie-van-gorp', 'lies-van-gorp', 'gerrit-smulders', 'joost-hendriks'],
  3: ['harrie-van-gorp', 'sanne-van-gorp', 'marco-van-gorp'],
  4: [
    'harrie-van-gorp',
    'marco-van-gorp',
    'ans-willems',
    'erik-verhoeven',
    'joost-hendriks',
    'dennis-kuijpers',
    'yasmin-el-amrani',
  ],
  5: ['anne-fleur-van-gorp', 'marco-van-gorp', 'sanne-van-gorp', 'piotr-nowak', 'caroline-de-wit'],
};

export function episodeJaar(episode: EpisodeId): number {
  return EPISODES.find((e) => e.id === episode)?.jaar ?? 2026;
}

export function slugsVoorGlossarium(episode: EpisodeId, round: 1 | 2): string[] {
  const base = [...GLOSSARIUM_SLUGS[episode]];
  if (episode === 4 && round >= 2) {
    base.push('piotr-nowak');
  }
  return base;
}

export function personenInGlossariumVoorAflevering(episode: EpisodeId, round: 1 | 2): Persoon[] {
  return slugsVoorGlossarium(episode, round)
    .map((slug) => {
      const p = PERSONEN.find((x) => x.slug === slug);
      return p ? persoonVoorAflevering(p, episode) : undefined;
    })
    .filter((p): p is Persoon => !!p);
}
