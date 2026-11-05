import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PERIOD_THEMES, type PeriodKey } from '../../themes/periods';
import {
  PERIOD_2026_DATA_FONT,
  PERIOD_2026_UI_FONT,
  READABLE_SANS_STACK,
  resolvePeriodFonts,
} from '../../themes/periodTypography';

const KEYS: PeriodKey[] = ['1984', '1996', '2009', '2026', '2036'];

describe('PERIOD_THEMES fonts', () => {
  it.each(KEYS)('%s heeft display, hand, ui en data', (key) => {
    const f = PERIOD_THEMES[key].fonts;
    expect(f.display.length).toBeGreaterThan(0);
    expect(f.hand.length).toBeGreaterThan(0);
    expect(f.ui.length).toBeGreaterThan(0);
    expect(f.data.length).toBeGreaterThan(0);
  });

  it('aflevering 4 (2026): ui en data ongewijzigd in register', () => {
    expect(PERIOD_THEMES['2026'].fonts.ui).toBe(PERIOD_2026_UI_FONT);
    expect(PERIOD_THEMES['2026'].fonts.data).toBe(PERIOD_2026_DATA_FONT);
  });
});

describe('Leesbaar lettertype', () => {
  it('display en hand worden neutrale sans', () => {
    const f = PERIOD_THEMES['1984'].fonts;
    const r = resolvePeriodFonts(f, '1984', true);
    expect(r.display).toBe(READABLE_SANS_STACK);
    expect(r.hand).toBe(READABLE_SANS_STACK);
    expect(r.ui).toBe(f.ui);
  });

  it('2026 overschrijft root niet behalve readable titel', () => {
    const r = resolvePeriodFonts(PERIOD_THEMES['2026'].fonts, '2026', false);
    expect(r.overridesRootTypography).toBe(false);
    const rr = resolvePeriodFonts(PERIOD_THEMES['2026'].fonts, '2026', true);
    expect(rr.display).toBe(READABLE_SANS_STACK);
    expect(rr.hand).toBe(READABLE_SANS_STACK);
    expect(rr.readableTitleOverride).toBe(true);
  });
});

describe('geen externe font-CDN in bron', () => {
  const root = join(import.meta.dirname, '..', '..');
  const dirs = [join(root, 'src'), join(root, 'themes')];

  function walk(dir: string, acc: string[] = []): string[] {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, name.name);
      if (name.isDirectory() && name.name !== 'node_modules') walk(p, acc);
      else if (/\.(tsx?|css|html)$/.test(name.name) && !/\.test\.(tsx?)$/.test(name.name)) acc.push(p);
    }
    return acc;
  }

  it('src/ en themes/ bevatten geen fonts.googleapis.com', () => {
    const files = dirs.flatMap((d) => walk(d));
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      expect(text).not.toMatch(/fonts\.googleapis\.com/);
      expect(text).not.toMatch(/fonts\.gstatic\.com/);
    }
  });
});
