import { describe, expect, it } from 'vitest';
import { piotrIntroResolved, piotrPrivéBerichtQuote } from '../../data/piotrSpel';

describe('piotrSpel', () => {
  it('toont definitieve intro en privébericht aan studenten', () => {
    const intro = piotrIntroResolved(false);
    expect(intro.isFallback).toBe(false);
    expect(intro.tekst).toMatch(/Peter Kramer/);
    expect(intro.tekst).toMatch(/Serieus, hard werkend/);

    const bericht = piotrPrivéBerichtQuote(false);
    expect(bericht).toMatch(/Ik wil u niet lastig vallen/);
    expect(bericht).toMatch(/Ik zeg meestal niets/);
    expect(bericht).not.toMatch(/Antwoordopties/);
  });
});
