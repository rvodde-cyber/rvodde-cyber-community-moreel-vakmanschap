import { BEGRIPPEN } from '@content/glossary.nl';
import type { EpisodeId } from '@data/episodes/meta';
import { PersonCard, personenInGlossarium } from '../PersonCard';

type Props = {
  episode: EpisodeId;
  round: 1 | 2;
  onClose: () => void;
};

export function GlossaryModal({ episode, round, onClose }: Props) {
  const personen = personenInGlossarium(episode, round);
  return (
    <>
      <p className="k">WIE IS WIE</p>
      <h2 id="modh">Wie en wat je tegenkomt</h2>
      <p className="glosh">PERSONEN</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
        {personen.map((p) => (
          <PersonCard key={p.slug} persoon={p} episode={episode} />
        ))}
      </div>
      <p className="glosh">BEGRIPPEN</p>
      <dl className="glos">
        {BEGRIPPEN.map((b) => (
          <div key={b.term}>
            <dt>{b.term}</dt>
            <dd>{b.uitleg}</dd>
          </div>
        ))}
      </dl>
      <button type="button" className="btn" onClick={onClose}>Duidelijk</button>
    </>
  );
}
