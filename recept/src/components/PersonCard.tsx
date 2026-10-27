import { PERSONEN } from '@data/personen';
import type { Persoon } from '@data/schemas/personen.schema';

const INITIALS: Record<string, string> = {
  'harrie-van-gorp': 'HG',
  'marco-van-gorp': 'MG',
  'ans-willems': 'AW',
  'erik-verhoeven': 'EV',
  'joost-hendriks': 'JH',
  'dennis-kuijpers': 'DK',
  'yasmin-el-amrani': 'YA',
  'piotr-nowak': 'PN',
};

type Props = {
  persoon: Persoon;
  size?: 'sm' | 'md';
};

export function PersonCard({ persoon, size = 'md' }: Props) {
  const base = import.meta.env.BASE_URL;
  const px = size === 'sm' ? 38 : 96;
  const src = persoon.portret ? `${base}${persoon.portret}` : null;
  const init = INITIALS[persoon.slug] ?? persoon.naam.slice(0, 2).toUpperCase();

  return (
    <div className="person-card" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      {src ? (
        <img
          src={src}
          alt={persoon.portretAlt}
          width={px}
          height={px}
          loading="lazy"
          style={{
            width: px,
            height: px,
            objectFit: 'cover',
            borderRadius: size === 'sm' ? '50%' : 8,
            border: '1px solid var(--cyan)',
            flexShrink: 0,
          }}
        />
      ) : (
        <span
          aria-hidden="true"
          style={{
            width: px,
            height: px,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: size === 'sm' ? '50%' : 8,
            border: '1px solid var(--cyan)',
            background: 'var(--cyan-dim)',
            color: 'var(--cyan)',
            fontFamily: 'var(--data)',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {init}
        </span>
      )}
      <div>
        <strong>{persoon.naam}</strong>
        <p className="note" style={{ margin: '4px 0 0' }}>{persoon.tekst}</p>
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
