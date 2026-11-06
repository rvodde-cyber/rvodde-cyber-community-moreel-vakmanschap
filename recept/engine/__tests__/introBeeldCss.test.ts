import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RECEPT_CSS = join(__dirname, '..', '..', 'src', 'styles', 'recept.css');
const INTRO_SCENE_IMAGE = join(__dirname, '..', '..', 'src', 'components', 'IntroSceneImage.tsx');

describe('Intro beeld: polaroid schaduw + focus CSS', () => {
  it('polaroid rendert geen .intro-beeld__shade (wel kettingpapier/venster/glas met --soft)', () => {
    const src = readFileSync(INTRO_SCENE_IMAGE, 'utf8');
    expect(src).toContain("const showShadeSoft = kader !== 'polaroid'");
    expect(src).toContain('{showShadeSoft ?');
    expect(src).toContain('intro-beeld__shade--soft');
  });

  it('recept.css: img gebruikt --intro-focus van .intro-beeld; phone 4/5 tablet 4/3; caps 55dvh', () => {
    const css = readFileSync(RECEPT_CSS, 'utf8');
    expect(css).toMatch(/object-position:\s*var\(--intro-focus-x[^)]+\)\s+var\(--intro-focus-y[^)]+\)/);
    expect(css).toMatch(
      /@media\s*\(\s*max-width:\s*599px\s*\)[\s\S]*?aspect-ratio:\s*4\s*\/\s*5/s,
    );
    expect(css).toMatch(
      /@media\s*\(\s*min-width:\s*600px\s*\)\s+and\s+\(\s*max-width:\s*899px\s*\)[\s\S]*?aspect-ratio:\s*4\s*\/\s*3/s,
    );
    expect(css).toMatch(/--intro-phone-cap:\s*min\(\s*55dvh/);
    expect(css).toMatch(/--intro-tablet-cap:\s*min\(\s*55dvh/);
  });
});
