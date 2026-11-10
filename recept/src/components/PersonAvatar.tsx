import type { Persoon } from '@data/schemas/personen.schema';
import type { EpisodeId } from '@data/episodes/meta';
import { portretCode } from '@data/personen';
import { Portret } from './Portret';

type Props = {
  persoon: Persoon;
  episode?: EpisodeId;
  size?: 'sm' | 'md';
  className?: string;
};

export function PersonAvatar({ persoon, episode = 4, size = 'md', className }: Props) {
  return (
    <Portret
      code={portretCode(persoon, episode)}
      naam={persoon.naam}
      leeftijd={persoon.leeftijd}
      slug={persoon.slug}
      size={size}
      className={className}
    />
  );
}
