import { describe, expect, it, afterEach } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act, type ReactNode } from 'react';
import { personenInGlossarium } from './PersonCard';
import { Portret, portretAltTekst } from './Portret';
import { ZUS_SLAG, magPortretTonen } from '@data/personen';

function renderUi(node: ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root: Root = createRoot(container);
  act(() => {
    root.render(node);
  });
  return { container, root };
}

describe('Portret en glossarium', () => {
  let root: Root | null = null;

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    document.body.innerHTML = '';
  });

  it('(a) met code: img met juiste alt-tekst', () => {
    const r = renderUi(
      <Portret code="P-HARRIE-2026" naam="Harrie van Gorp" leeftijd={71} slug="harrie-van-gorp" />,
    );
    root = r.root;
    const img = r.container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('alt')).toBe(portretAltTekst('Harrie van Gorp', 71));
    expect(img?.getAttribute('loading')).toBe('lazy');
    expect(img?.getAttribute('decoding')).toBe('async');
    const src = img?.getAttribute('src') ?? '';
    expect(src).toMatch(/beelden\/portretten\/P-HARRIE-2026\.webp$/);
    expect(src).not.toMatch(/^https?:/);
  });

  it('(b) zonder code: initialen-tegel', () => {
    const r = renderUi(<Portret naam="Ans Willems" leeftijd={57} slug="ans-willems" />);
    root = r.root;
    expect(r.container.querySelector('img')).toBeNull();
    expect(r.container.textContent).toContain('AW');
  });

  it('(c) zus-slug: geen portretfoto', () => {
    expect(magPortretTonen(ZUS_SLAG)).toBe(false);
    const r = renderUi(
      <Portret code="P-ZUS-2026" naam="Mies" leeftijd={30} slug={ZUS_SLAG} />,
    );
    root = r.root;
    expect(r.container.querySelector('img')).toBeNull();
  });

  it('(d) Wie is wie voor alle vijf afleveringen', () => {
    for (const ep of [1, 2, 3, 4, 5] as const) {
      const r1 = personenInGlossarium(ep, 1);
      const r2 = personenInGlossarium(ep, 2);
      expect(r1.length).toBeGreaterThan(0);
      expect(r2.length).toBeGreaterThanOrEqual(r1.length);
      for (const p of r1) {
        expect(p.naam.length).toBeGreaterThan(0);
        expect(p.tekst.length).toBeGreaterThan(0);
      }
    }
  });

  it('(e) geen externe src in portret-paden', () => {
    const r = renderUi(
      <Portret code="P-ERIK-2026" naam="Erik Verhoeven" leeftijd={49} slug="erik-verhoeven" />,
    );
    root = r.root;
    const src = r.container.querySelector('img')?.getAttribute('src') ?? '';
    expect(src.startsWith('http://') || src.startsWith('https://')).toBe(false);
  });
});
