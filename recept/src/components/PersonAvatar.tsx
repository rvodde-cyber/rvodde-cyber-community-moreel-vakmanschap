import { useState, type CSSProperties } from 'react';
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
  className?: string;
};

export function PersonAvatar({ persoon, size = 'md', className }: Props) {
  const base = import.meta.env.BASE_URL;
  const [failed, setFailed] = useState(false);
  const src = persoon.portret && !failed ? `${base}${persoon.portret}` : null;
  const init = INITIALS[persoon.slug] ?? persoon.naam.slice(0, 2).toUpperCase();
  const cls = ['person-avatar', size === 'sm' ? 'person-avatar-sm' : 'person-avatar-md', className]
    .filter(Boolean)
    .join(' ');

  const shell: CSSProperties = {
    objectFit: 'cover',
    flexShrink: 0,
    borderRadius: size === 'sm' ? '50%' : 8,
    border: '1px solid var(--cyan)',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={persoon.portretAlt}
        loading="lazy"
        className={cls}
        onError={() => setFailed(true)}
        style={shell}
      />
    );
  }

  return (
    <span className={cls} aria-hidden="true" style={{ ...shell, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cyan-dim)', color: 'var(--cyan)', fontFamily: 'var(--data)', fontWeight: 600 }}>
      {init}
    </span>
  );
}
