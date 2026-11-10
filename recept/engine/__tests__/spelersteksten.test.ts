import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { HOE_HET_WERKT_STAPPEN, ROLBESCHRIJVING_INTRO } from '@content/howItWorks.nl';
import { UITLEG_BODY, UITLEG_STAPPEN } from '@content/uitleg';
import { BEGRIPPEN } from '@content/glossary.nl';
import { INTRO_TEKSTEN } from '@content/intros.nl';
import { introOpdrachtKern } from '@data/episodes/introUiCopy';

const ROOT = resolve(import.meta.dirname, '../..');

function walkTs(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walkTs(p, acc);
    } else if ((name.endsWith('.ts') || name.endsWith('.tsx')) && !name.includes('.test.')) {
      acc.push(p);
    }
  }
  return acc;
}

/** UI- en spelregelteksten; geen docs, referentie of tests. */
function spelerTekstBestanden(): string[] {
  const dirs = [join(ROOT, 'content'), join(ROOT, 'src'), join(ROOT, 'data', 'episodes', 'introUiCopy.ts')];
  const files = new Set<string>();
  for (const d of dirs) {
    if (d.endsWith('.ts')) {
      files.add(d);
    } else {
      walkTs(d, []).forEach((f) => files.add(f));
    }
  }
  return [...files];
}

function corpusFromExports(): string {
  return JSON.stringify({
    uitleg: UITLEG_BODY,
    stappen: UITLEG_STAPPEN,
    howto: HOE_HET_WERKT_STAPPEN,
    rol: ROLBESCHRIJVING_INTRO,
    begrippen: BEGRIPPEN,
    intro: INTRO_TEKSTEN,
    kern: introOpdrachtKern(''),
    kernNaam: introOpdrachtKern('Annelies'),
  });
}

describe('spelersteksten', () => {
  it('bevat geen “managementteam” in UI/content-bestanden', () => {
    const files = spelerTekstBestanden();
    expect(files.length).toBeGreaterThan(10);
    const hits: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      if (/managementteam/i.test(text)) {
        hits.push(relative(ROOT, file));
      }
    }
    expect(hits, hits.join(', ') || 'geen hits').toEqual([]);
  });

  it('bevat geen “managementteam” in geëxporteerde copy-objecten', () => {
    expect(corpusFromExports().toLowerCase()).not.toContain('managementteam');
  });

  it('introOpdrachtKern zonder en met naam', () => {
    expect(introOpdrachtKern('')).toContain('Jullie zijn de jongere zus van Harrie');
    expect(introOpdrachtKern('')).not.toContain('Jullie zijn ,');
    expect(introOpdrachtKern('Annelies')).toBe(
      'Jullie zijn Annelies, de jongere zus van Harrie. Jullie werken op de achtergrond, maar hebben het laatste woord over het budget. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies binnen jullie budgetpunten en schrijven jullie op waarom.',
    );
  });
});
