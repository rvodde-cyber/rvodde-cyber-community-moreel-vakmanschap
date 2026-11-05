import { describe, expect, it } from 'vitest';
import { episodeContent } from '@data/episodes/content';
import {
  A4_INTRO_CARRY_R1,
  A4_INTRO_CARRY_R2,
  INTRO_SKELET_DISCLAIMER,
  introBeslistijdZin,
  introCarryLines,
} from '@data/episodes/introUiCopy';
import { budgetVoorRonde } from '@data/interventies/vertaaltabel';
import { usesBeslistijdTimer } from '@data/episodes/motor';

describe('introUiCopy', () => {
  it('(a) A1 interventie: budgetpunten, geen mln/conceptskelet', () => {
    const c = episodeContent(1);
    const lines = introCarryLines(c, 1, 1);
    const text = lines.join(' ');
    expect(text).toContain('budgetpunten');
    expect(text).toContain(`${budgetVoorRonde(1, 1)} punten`);
    expect(text.toLowerCase()).not.toContain('conceptskelet');
    expect(text).not.toMatch(/mln/i);
  });

  it.each([2, 3, 5] as const)('(b) skelet A%i: disclaimer zonder mln', (ep) => {
    const lines = introCarryLines(episodeContent(ep), ep, 1);
    const text = lines.join(' ');
    expect(text).toContain(INTRO_SKELET_DISCLAIMER);
    expect(text).not.toMatch(/€\s*0[,.]00/i);
    expect(text).not.toMatch(/mln/i);
  });

  it('(c) A4 carry-teksten ongewijzigd (golden)', () => {
    expect(A4_INTRO_CARRY_R1).toContain('managementteam (MT)');
    expect(A4_INTRO_CARRY_R1).toContain('tien minuten');
    expect(A4_INTRO_CARRY_R2).toContain('Jullie hebben weer ongeveer tien minuten.');
  });

  it('(d) tien minuten alleen bij timer (A1 + A4)', () => {
    expect(introBeslistijdZin(1)).toContain('tien minuten');
    expect(introBeslistijdZin(4)).toContain('tien minuten');
    expect(introBeslistijdZin(2)).not.toContain('tien minuten');
    expect(introBeslistijdZin(3)).not.toContain('tien minuten');
    expect(introBeslistijdZin(5)).not.toContain('tien minuten');
    expect(usesBeslistijdTimer(1)).toBe(true);
    expect(usesBeslistijdTimer(2)).toBe(false);
  });
});
