import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { episodeContent } from '@data/episodes/content';
import { OVERSTAP_UITLEG_A4 } from '@data/episodes/overstapUitlegA4';
import { INTRO_TEKSTEN } from '@content/intros.nl';

/** Scan src/, data/, themes/ op verboden woorden (NL-spelteksten); documenten uitgezonderd. */
const ROOT = join(__dirname, '..', '..');
const DIRS = ['src', 'data', 'themes', 'content'] as const;
const EXT = new Set(['.ts', '.tsx', '.css', '.html', '.json']);
const FORBIDDEN = ['kroket', 'paneer', 'frituur'] as const;

function walk(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.has(getExt(name))) out.push(p);
  }
}

function getExt(name: string): string {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i) : '';
}

function scanForForbidden(): { file: string; matches: string[] }[] {
  const hits: { file: string; matches: string[] }[] = [];
  for (const d of DIRS) {
    const base = join(ROOT, d);
    const files: string[] = [];
    walk(base, files);
    for (const file of files) {
      const text = readFileSync(file, 'utf8').toLowerCase();
      const bad: string[] = [];
      for (const w of FORBIDDEN) {
        if (text.includes(w)) bad.push(w);
      }
      if (bad.length) hits.push({ file: relative(ROOT, file).replace(/\\/g, '/'), matches: bad });
    }
  }
  return hits;
}

describe('worstenbroodje / bedrijfsnamen (register + scan)', () => {
  it('(a) geen kroket, paneer of frituur in src/, data/, themes/', () => {
    const hits = scanForForbidden();
    expect(hits, JSON.stringify(hits, null, 2)).toEqual([]);
  });

  it('(c) A4: overstapUitleg + intro toont HOE HET ZO VER KWAM en Machinebouw', () => {
    const c = episodeContent(4);
    expect(c.overstapUitleg).toBe(OVERSTAP_UITLEG_A4);
    expect(c.overstapUitleg).toContain('Van Gorp Machinebouw B.V.');
  });

  it('(d) A3 geschiedenis bevat Van Gorp Machinebouw B.V.', () => {
    expect(INTRO_TEKSTEN[3].geschiedenis).toContain('Van Gorp Machinebouw B.V.');
  });
});
