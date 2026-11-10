import { useCallback, useState, type CSSProperties } from 'react';
import { magPortretTonen } from '@data/personen';

const INITIALS: Record<string, string> = {
  'harrie-van-gorp': 'HG',
  'lies-van-gorp': 'LG',
  'gerrit-smulders': 'GS',
  'sanne-van-gorp': 'SV',
  'marco-van-gorp': 'MG',
  'ans-willems': 'AW',
  'erik-verhoeven': 'EV',
  'joost-hendriks': 'JH',
  'dennis-kuijpers': 'DK',
  'yasmin-el-amrani': 'YA',
  'piotr-nowak': 'PN',
  'anne-fleur-van-gorp': 'AF',
  'caroline-de-wit': 'CD',
};

type Props = {
  code?: string;
  naam: string;
  leeftijd?: number;
  slug: string;
  size?: 'sm' | 'md';
  className?: string;
};

export function portretAltTekst(naam: string, leeftijd?: number): string {
  if (leeftijd != null && leeftijd > 0) {
    return `Portret van ${naam}, ${leeftijd}`;
  }
  return `Portret van ${naam}`;
}

export function Portret({ code, naam, leeftijd, slug, size = 'md', className }: Props) {
  const base = import.meta.env.BASE_URL;
  const [beeldOk, setBeeldOk] = useState(true);

  const opError = useCallback(() => {
    setBeeldOk(false);
  }, []);

  const cls = ['person-avatar', size === 'sm' ? 'person-avatar-sm' : 'person-avatar-md', className]
    .filter(Boolean)
    .join(' ');

  const shell: CSSProperties = {
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    flexShrink: 0,
    borderRadius: size === 'sm' ? '50%' : 8,
    border: '1px solid var(--cyan)',
  };

  const init = INITIALS[slug] ?? naam.slice(0, 2).toUpperCase();
  const alt = portretAltTekst(naam, leeftijd);

  const toonBeeld = code && magPortretTonen(slug) && beeldOk;

  if (toonBeeld) {
    return (
      <img
        src={`${base}beelden/portretten/${code}.jpg`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cls}
        onError={opError}
        style={shell}
        width={size === 'sm' ? 38 : 72}
        height={size === 'sm' ? 38 : 72}
      />
    );
  }

  return (
    <span
      className={cls}
      aria-hidden="true"
      style={{
        ...shell,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--cyan-dim)',
        color: 'var(--cyan)',
        fontFamily: 'var(--data)',
        fontWeight: 600,
      }}
    >
      {init}
    </span>
  );
}
