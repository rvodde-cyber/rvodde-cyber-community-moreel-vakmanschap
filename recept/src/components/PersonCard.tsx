import { PERSONEN } from '@data/personen';
import type { Persoon } from '@data/schemas/personen.schema';
import { PersonAvatar } from './PersonAvatar';

type Props = {
  persoon: Persoon;
  size?: 'sm' | 'md';
};

export function PersonCard({ persoon, size = 'md' }: Props) {
  return (
    <div className={`person-card${size === 'md' ? ' person-card-md' : ''}`}>
      <PersonAvatar persoon={persoon} size={size} />
      <div>
        <strong>{persoon.naam}</strong>
        <p className="note" style={{ margin: '4px 0 0' }}>
          {persoon.tekst}
        </p>
      </div>
    </div>
  );
}

export function personenInGlossarium(round: 1 | 2): Persoon[] {
  const slugs = [
    'harrie-van-gorp',
    'marco-van-gorp',
    'ans-willems',
    'erik-verhoeven',
    'joost-hendriks',
    ...(round >= 2 ? ['piotr-nowak'] : []),
  ];
  return slugs.map((s) => PERSONEN.find((p) => p.slug === s)).filter((p): p is Persoon => !!p);
}
