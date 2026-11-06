import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RECEPT_CSS = join(__dirname, '..', 'styles', 'recept.css');

describe('intro-split scroll CSS (recept.css)', () => {
  it('scrolling container gebruikt 100dvh en overflow-y: auto', () => {
    const css = readFileSync(RECEPT_CSS, 'utf8');
    expect(css).toMatch(/\.intro-split-scroll\s*\{[^}]*height:\s*100dvh/s);
    expect(css).toMatch(/\.intro-split-scroll\s*\{[^}]*overflow-y:\s*auto/s);
  });

  it('desktop: intro-beeld__frame heeft max-height met 100dvh', () => {
    const css = readFileSync(RECEPT_CSS, 'utf8');
    expect(css).toMatch(
      /@media\s*\(\s*min-width:\s*900px\s*\)[\s\S]*?\.intro-split-scroll\s+\.intro-beeld__frame[\s\S]*?max-height:\s*calc\(100dvh\s*-\s*160px\)/,
    );
  });
});
