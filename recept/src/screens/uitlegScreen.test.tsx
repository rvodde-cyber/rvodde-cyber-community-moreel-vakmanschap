import { describe, expect, it, afterEach } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act, type ReactNode } from 'react';
import {
  UITLEG_H1,
  UITLEG_NAV,
  UITLEG_BODY,
  UITLEG_STAPPEN,
} from '@content/uitleg';
import { PosterTypographyScope } from '../components/PosterTypographyScope';
import { UiModalsProvider } from '../context/UiModalsContext';
import { StepsNav } from '../components/StepsNav';
import { UitlegScreen } from './UitlegScreen';

function renderUi(node: ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root: Root = createRoot(container);
  act(() => {
    root.render(<UiModalsProvider onExitMenu={() => {}}>{node}</UiModalsProvider>);
  });
  return { container, root };
}

describe('UitlegScreen', () => {
  let root: Root | null = null;

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    document.body.innerHTML = '';
  });

  it('(a) toont één h1 en de elf secties', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <UitlegScreen onBack={() => {}} onOpenGlossary={() => {}} onOpenSettings={() => {}} />
      </PosterTypographyScope>,
    );
    root = r.root;
    const h1s = r.container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
    expect(h1s[0]?.textContent).toBe(UITLEG_H1);
    expect(r.container.querySelectorAll('.uitleg-sectie')).toHaveLength(11);
    expect(r.container.querySelectorAll('h2.uitleg-h2')).toHaveLength(11);
  });

  it('(b) inhoudsopgave: elf links naar sectie-ankers', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <UitlegScreen onBack={() => {}} onOpenGlossary={() => {}} onOpenSettings={() => {}} />
      </PosterTypographyScope>,
    );
    root = r.root;
    const links = r.container.querySelectorAll<HTMLAnchorElement>('.uitleg-nav__link');
    expect(links).toHaveLength(11);
    links.forEach((a, i) => {
      expect(a.getAttribute('href')).toBe(`#uitleg-${UITLEG_NAV[i]!.id}`);
      expect(r.container.querySelector(a.getAttribute('href')!)).not.toBeNull();
    });
  });

  it('(c) terugknop roept onBack aan', () => {
    let back = 0;
    const r = renderUi(
      <PosterTypographyScope>
        <UitlegScreen
          onBack={() => {
            back += 1;
          }}
          onOpenGlossary={() => {}}
          onOpenSettings={() => {}}
        />
      </PosterTypographyScope>,
    );
    root = r.root;
    const btn = r.container.querySelector<HTMLButtonElement>('.uitleg-back');
    act(() => btn?.click());
    expect(back).toBe(1);
  });

  it('(e) noemt verborgen meters niet bij naam', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <UitlegScreen onBack={() => {}} onOpenGlossary={() => {}} onOpenSettings={() => {}} />
      </PosterTypographyScope>,
    );
    root = r.root;
    const text = r.container.textContent ?? '';
    expect(text.toLowerCase()).not.toContain('menselijke maat');
    expect(text).not.toMatch(/Verborgen meters/i);
  });

  it('(f) praktisch noemt Doorgaan waar je was', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <UitlegScreen onBack={() => {}} onOpenGlossary={() => {}} onOpenSettings={() => {}} />
      </PosterTypographyScope>,
    );
    root = r.root;
    expect(r.container.textContent).toContain('Doorgaan waar je was');
  });

  it('(h) zes stappen en vier tafelmomenten in uitleg', () => {
    expect(UITLEG_STAPPEN).toHaveLength(6);
    expect(UITLEG_STAPPEN[3]?.titel).toBe('Leg uit');
    const tafel = UITLEG_BODY.tafel.paragraphs?.join(' ') ?? '';
    expect(tafel).toContain('vier momenten');
    expect(tafel).toContain('Het argument (elke ronde)');
    const r = renderUi(
      <PosterTypographyScope>
        <UitlegScreen onBack={() => {}} onOpenGlossary={() => {}} onOpenSettings={() => {}} />
      </PosterTypographyScope>,
    );
    root = r.root;
    expect(r.container.textContent).toContain('zes stappen');
    expect(r.container.textContent).toContain('vier momenten');
  });

  it('(g) geen cold open in zichtbare uitlegteksten', () => {
    expect(JSON.stringify(UITLEG_BODY).toLowerCase()).not.toContain('cold open');
    expect(JSON.stringify(UITLEG_STAPPEN).toLowerCase()).not.toContain('cold open');
    expect(UITLEG_STAPPEN[0]?.tekst).toContain('openingsscène');
  });

  it('(d) StepsNav toont openingsscène i.p.v. cold open', () => {
    const r = renderUi(<StepsNav phase="cold" />);
    root = r.root;
    const text = r.container.textContent ?? '';
    expect(text.toUpperCase()).toContain('OPENINGSSCÈNE');
    expect(text.toLowerCase()).not.toContain('cold open');
  });
});
