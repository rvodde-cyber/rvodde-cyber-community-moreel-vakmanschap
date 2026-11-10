import { describe, expect, it, afterEach } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act, type ReactNode } from 'react';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { GlossaryModal } from './modals/GlossaryModal';
import { personenInGlossarium } from './PersonCard';
import { portretCode } from '@data/personen';

const ROOT = resolve(import.meta.dirname, '../..');

function renderUi(node: ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root: Root = createRoot(container);
  act(() => {
    root.render(node);
  });
  return { container, root };
}

describe('Wie is wie A4 — portret-jpg', () => {
  let root: Root | null = null;

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    document.body.innerHTML = '';
  });

  it.each([1, 2] as const)('ronde %i: Harrie, Marco, Ans laden .jpg', (round) => {
    const r = renderUi(<GlossaryModal episode={4} round={round} onClose={() => {}} />);
    root = r.root;
    const slugs = ['harrie-van-gorp', 'marco-van-gorp', 'ans-willems'] as const;
    for (const slug of slugs) {
      const p = personenInGlossarium(4, round).find((x) => x.slug === slug);
      expect(p, slug).toBeDefined();
      const code = p ? portretCode(p, 4) : undefined;
      expect(code).toBeTruthy();
      expect(existsSync(join(ROOT, 'public', 'beelden', 'portretten', `${code}.jpg`))).toBe(true);
    }
    const html = r.container.innerHTML;
    expect(html).toContain('P-HARRIE-2026.jpg');
    expect(html).toContain('P-MARCO-2026.jpg');
    expect(html).toContain('P-ANS-2026.jpg');
    expect(html).not.toContain('.webp');
  });
});
