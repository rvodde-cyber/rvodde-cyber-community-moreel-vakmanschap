import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RECEPT_CSS = join(__dirname, '..', 'styles', 'recept.css');
const INTRO_SCENE_IMAGE = join(__dirname, '..', 'components', 'IntroSceneImage.tsx');

describe('intro-split scroll CSS (recept.css)', () => {
  it('scrolling container gebruikt 100dvh en overflow-y: auto', () => {
    const css = readFileSync(RECEPT_CSS, 'utf8');
    expect(css).toMatch(/\.intro-split-scroll\s*\{[^}]*height:\s*100dvh/s);
    expect(css).toMatch(/\.intro-split-scroll\s*\{[^}]*overflow-y:\s*auto/s);
  });

  it('kader-shell onder intro-split-scroll: geen max-height; alleen beeld begrensd met --intro-viewport-cap en --intro-kader-extra-*', () => {
    const css = readFileSync(RECEPT_CSS, 'utf8');
    expect(css).toMatch(/--intro-viewport-cap:\s*calc\(100dvh\s*-\s*48px\)/);
    expect(css).toMatch(/--intro-kader-extra-polaroid:\s*100px/);
    expect(css).not.toMatch(/\.intro-split-scroll\s+\.intro-kader-shell\s*\{[^}]*max-height/s);

    expect(css).toMatch(
      /\.intro-split-scroll\s+\.intro-kader-shell--polaroid\s+\.intro-beeld__frame[\s\S]*?max-height:\s*calc\(var\(--intro-viewport-cap\)\s*-\s*var\(--intro-kader-extra-polaroid\)\)/,
    );
  });

  it('IntroSceneImage: onderschrift (figcaption) staat binnen .intro-kader-shell in de DOM', () => {
    const src = readFileSync(INTRO_SCENE_IMAGE, 'utf8');
    expect(src).toContain('intro-kader-shell');
    expect(src).toMatch(/<div className=\{`intro-kader-shell[^`]+`[^>]*>[\s\S]*<figcaption className=\{`intro-beeld__cap/);
    expect(src).toMatch(/<\/figcaption>\s*\n\s*<\/div>\s*\n\s*<\/figure>/);
  });
});
