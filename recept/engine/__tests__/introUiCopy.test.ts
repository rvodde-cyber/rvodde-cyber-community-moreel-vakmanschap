import { afterEach, describe, expect, it, vi } from 'vitest';
import { episodeContent } from '@data/episodes/content';
import type { EpisodeContent } from '@data/episodes/content';
import {
  INTRO_SKELET_DISCLAIMER,
  introBeslistijdZin,
  introCarryLines,
  introOpdrachtKern,
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
    const lines = introCarryLines(c, 1, 1, 'Marja');
    const text = lines.join(' ');
    expect(text).toContain('Jullie zijn Marja');
    expect(text).toContain('schrijven jullie op waarom');
    expect(text).toContain('budgetpunten');
    expect(text).toContain(`${budgetVoorRonde(1, 1)} punten`);
    expect(text).toContain('ongeveer tien minuten');
    expect(text.toLowerCase()).not.toContain('conceptskelet');
    expect(text).not.toMatch(/mln/i);
    expect(text.toLowerCase()).not.toContain('managementteam');
  });

  it('A2 interventie: budgetpunten, geen mln', () => {
    const c = episodeContent(2);
    const lines = introCarryLines(c, 2, 1, '');
    const text = lines.join(' ');
    expect(text).toContain('budgetpunten');
    expect(text).toContain(`${budgetVoorRonde(2, 1)} punten`);
    expect(text).toContain('ongeveer tien minuten');
    expect(text).not.toMatch(/mln/i);
  });

  it('A5 interventie: budgetpunten en timer (geen houtskoolschets-disclaimer)', () => {
    const c = episodeContent(5);
    const lines = introCarryLines(c, 5, 1, '');
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
    vi.spyOn(motor, 'usesBeslistijdTimer').mockReturnValue(false);
    const lines = introCarryLines(SKELET_CARRY_MINIMAAL, 1, 1, '');
    const text = lines.join(' ');
    expect(text).toContain(INTRO_SKELET_DISCLAIMER);
    expect(text).toContain('Neem de tijd om samen te kiezen');
    expect(text).not.toContain('tien minuten');
    expect(text).not.toMatch(/€\s*0[,.]00/i);
    expect(text).not.toMatch(/mln/i);
  });

  it('A3 interventie: budgetpunten + tien minuten, geen conceptskelet', () => {
    const c = episodeContent(3);
    const lines = introCarryLines(c, 3, 1, '');
    const text = lines.join(' ');
    expect(text).toContain('budgetpunten');
    expect(text).toContain(`${budgetVoorRonde(3, 1)} punten`);
    expect(text).toContain('ongeveer tien minuten');
    expect(text.toLowerCase()).not.toContain('conceptskelet');
    expect(text).not.toContain(INTRO_SKELET_DISCLAIMER);
    expect(text).not.toMatch(/mln/i);
  });

  it('(c) A4 carry: zelfde kern + tien minuten', () => {
    const c = episodeContent(4);
    const r1 = introCarryLines(c, 4, 1, 'Sanne');
    expect(r1[0]).toBe(introOpdrachtKern('Sanne'));
    expect(r1.join(' ')).toContain('ongeveer tien minuten');
    const r2 = introCarryLines(c, 4, 2, '');
    expect(r2).toContain('Let op: wat jullie in ronde 1 hebben gekozen, werkt door in deze ronde.');
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
