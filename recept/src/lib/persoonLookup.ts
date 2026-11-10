import type { EpisodeId } from '@data/episodes/meta';
import { PERSONEN, persoonVoorAflevering } from '@data/personen';
import type { Persoon } from '@data/schemas/personen.schema';

export function persoonByVan(van: string, episode: EpisodeId = 4): Persoon | undefined {
  const exact = PERSONEN.find((p) => p.naam === van);
  const base = exact ?? findByVoornaam(van);
  return base ? persoonVoorAflevering(base, episode) : undefined;
}

function findByVoornaam(van: string): Persoon | undefined {
  const first = van.split(' ')[0]?.toLowerCase();
  if (!first) return undefined;
  if (first === 'lies') return PERSONEN.find((p) => p.slug === 'lies-van-gorp');
  if (first === 'gerrit') return PERSONEN.find((p) => p.slug === 'gerrit-smulders');
  if (first === 'sanne') return PERSONEN.find((p) => p.slug === 'sanne-van-gorp');
  if (first === 'anne-fleur' || first === 'anne') {
    return PERSONEN.find((p) => p.slug === 'anne-fleur-van-gorp');
  }
  return PERSONEN.find((p) => p.naam.toLowerCase().startsWith(first));
}
