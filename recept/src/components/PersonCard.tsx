import type { EpisodeId } from '@data/episodes/meta';
import type { Persoon } from '@data/schemas/personen.schema';
import { personenInGlossariumVoorAflevering } from '@data/glossarium';
import { PersonAvatar } from './PersonAvatar';

type Props = {
  persoon: Persoon;
  episode?: EpisodeId;
  size?: 'sm' | 'md';
};

export function PersonCard({ persoon, episode = 4, size = 'md' }: Props) {
  return (
    <div className={`person-card${size === 'md' ? ' person-card-md' : ''}`}>
      <PersonAvatar persoon={persoon} episode={episode} size={size} />
      <div>
        <strong>{persoon.naam}</strong>
        <p className="note" style={{ margin: '4px 0 0' }}>
          {persoon.tekst}
        </p>
      </div>
    </div>
  );
}

export function personenInGlossarium(episode: EpisodeId, round: 1 | 2): Persoon[] {
  return personenInGlossariumVoorAflevering(episode, round);
}
