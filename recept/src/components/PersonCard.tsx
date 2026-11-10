import type { EpisodeId } from '@data/episodes/meta';
import type { Persoon } from '@data/schemas/personen.schema';
import { personenInGlossariumVoorAflevering } from '@data/glossarium';
import { PersonAvatar } from './PersonAvatar';

type Props = {
  persoon: Persoon;
  episode?: EpisodeId;
  size?: 'sm' | 'md';
  /** Alleen Wie is wie (glossary); elders geen portretverzoeken. */
  toonPortret?: boolean;
};

export function PersonCard({ persoon, episode = 4, size = 'md', toonPortret = false }: Props) {
  return (
    <div className={`person-card${size === 'md' ? ' person-card-md' : ''}`}>
      {toonPortret ? <PersonAvatar persoon={persoon} episode={episode} size={size} /> : null}
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
