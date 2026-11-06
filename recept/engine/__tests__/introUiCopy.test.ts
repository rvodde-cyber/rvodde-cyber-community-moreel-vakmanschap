import { afterEach, describe, expect, it, vi } from 'vitest';
import { episodeContent } from '@data/episodes/content';
import type { EpisodeContent } from '@data/episodes/content';
import {
  A4_INTRO_CARRY_R1,
  A4_INTRO_CARRY_R2,
  INTRO_SKELET_DISCLAIMER,
  introBeslistijdZin,
  introCarryLines,
} from '@data/episodes/introUiCopy';
import { budgetVoorRonde } from '@data/interventies/vertaaltabel';
import * as motor from '@data/episodes/motor';

/** Alleen voor test: skeleton-motor om disclaimer/ carry-gedrag te blijven vastleggen. */
const SKELET_CARRY_MINIMAAL: EpisodeContent = {
  ...episodeContent(1),
  motorKind: 'skeleton',
};

describe('introUiCopy', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('(a) A1 interventie: budgetpunten, geen mln/conceptskelet', () => {
    const c = episodeContent(1);
    const lines = introCarryLines(c, 1, 1);
    const text = lines.join(' ');
    expect(text).toContain('budgetpunten');
    expect(text).toContain(`${budgetVoorRonde(1, 1)} punten`);
    expect(text).toContain('ongeveer tien minuten');
    expect(text.toLowerCase()).not.toContain('conceptskelet');
    expect(text).not.toMatch(/mln/i);
  });

  it('A2 interventie: budgetpunten, geen mln', () => {
    const c = episodeContent(2);
    const lines = introCarryLines(c, 2, 1);
    const text = lines.join(' ');
    expect(text).toContain('budgetpunten');
    expect(text).toContain(`${budgetVoorRonde(2, 1)} punten`);
    expect(text).toContain('ongeveer tien minuten');
    expect(text).not.toMatch(/mln/i);
  });

  it('A5 interventie: budgetpunten en timer (geen houtskoolschets-disclaimer)', () => {
    const c = episodeContent(5);
    const lines = introCarryLines(c, 5, 1);
    const text = lines.join(' ');
    expect(text).toContain('budgetpunten');
    expect(text).toContain(`${budgetVoorRonde(5, 1)} punten`);
    expect(text).toContain('ongeveer tien minuten');
    expect(text).not.toContain(INTRO_SKELET_DISCLAIMER);
    expect(text).not.toMatch(/mln/i);
  });

  it('Houtskoolschets: INTRO_SKELET_DISCLAIMER letterlijk', () => {
    expect(INTRO_SKELET_DISCLAIMER).toBe(
      'Dit is een houtskoolschets: de lijnen staan er, de uitwerking volgt. De uitkomst is nog niet gekoppeld aan de volledige spelmotor.',
    );
  });

  it('skeleton-tak introCarryLines: disclaimer + Neem de tijd, geen tien minuten, geen mln', () => {
    /** Zonder mock zou `introBeslistijdZin(1)` het echte register lezen (interventie → timer). */
    vi.spyOn(motor, 'usesBeslistijdTimer').mockReturnValue(false);
    const lines = introCarryLines(SKELET_CARRY_MINIMAAL, 1, 1);
    const text = lines.join(' ');
    expect(text).toContain(INTRO_SKELET_DISCLAIMER);
    expect(text).toContain('Neem de tijd om samen te kiezen');
    expect(text).not.toContain('tien minuten');
    expect(text).not.toMatch(/€\s*0[,.]00/i);
    expect(text).not.toMatch(/mln/i);
  });

  it('A3 interventie: budgetpunten + tien minuten, geen conceptskelet', () => {
    const c = episodeContent(3);
    const lines = introCarryLines(c, 3, 1);
    const text = lines.join(' ');
    expect(text).toContain('budgetpunten');
    expect(text).toContain(`${budgetVoorRonde(3, 1)} punten`);
    expect(text).toContain('ongeveer tien minuten');
    expect(text.toLowerCase()).not.toContain('conceptskelet');
    expect(text).not.toContain(INTRO_SKELET_DISCLAIMER);
    expect(text).not.toMatch(/mln/i);
  });

  it('(c) A4 carry-teksten ongewijzigd (golden)', () => {
    expect(A4_INTRO_CARRY_R1).toContain('managementteam (MT)');
    expect(A4_INTRO_CARRY_R1).toContain('tien minuten');
    expect(A4_INTRO_CARRY_R2).toContain('Jullie hebben weer ongeveer tien minuten.');
  });

  it('(d) tien minuten bij timer (A1–A5, incl. interventie A5)', () => {
    expect(introBeslistijdZin(1)).toContain('tien minuten');
    expect(introBeslistijdZin(2)).toContain('tien minuten');
    expect(introBeslistijdZin(3)).toContain('tien minuten');
    expect(introBeslistijdZin(4)).toContain('tien minuten');
    expect(introBeslistijdZin(5)).toContain('tien minuten');
    expect(motor.usesBeslistijdTimer(1)).toBe(true);
    expect(motor.usesBeslistijdTimer(2)).toBe(true);
    expect(motor.usesBeslistijdTimer(3)).toBe(true);
    expect(motor.usesBeslistijdTimer(5)).toBe(true);
  });
});
