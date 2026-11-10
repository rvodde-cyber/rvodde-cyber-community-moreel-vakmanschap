import { describe, expect, it } from 'vitest';
import { UITLEG_STAPPEN } from '@content/uitleg';
import { episodeContent } from '@data/episodes/content';
import {
  STAP_BESLIS,
  STAP_KIJK,
  STAP_KIJK_TERUG,
  STAP_LEG_UIT,
  STAP_ONDERZOEK,
  STAP_PRAAT,
  actieveSpelStap,
  spelStappenVoorRonde,
} from '../../src/game/spelStappen';

describe('spelStappen / rondebalk', () => {
  it('labels komen overeen met uitlegpagina', () => {
    const titels = UITLEG_STAPPEN.map((s) => s.titel);
    expect(titels).toEqual([STAP_KIJK, STAP_ONDERZOEK, STAP_BESLIS, STAP_LEG_UIT, STAP_PRAAT, STAP_KIJK_TERUG]);
  });

  it.each([1, 2, 3, 4, 5] as const)('aflevering %i r1: geen OPENINGSSCÈNE-label', (ep) => {
    const stappen = spelStappenVoorRonde(ep, 1);
    const labels = stappen.map((s) => s.label.toUpperCase()).join(' ');
    expect(labels).not.toContain('OPENINGSSCÈNE');
    expect(labels).toContain('KIJK');
    expect(stappen[0]!.label).toBe(STAP_KIJK);
  });

  it('A4 r1: geen Praat (geen gesprekskaart)', () => {
    expect(episodeContent(4).gesprekskaartActief).toBe(false);
    const labels = spelStappenVoorRonde(4, 1).map((s) => s.label);
    expect(labels).not.toContain(STAP_PRAAT);
  });

  it('A1 r1: wel Praat (gesprekskaart)', () => {
    const labels = spelStappenVoorRonde(1, 1).map((s) => s.label);
    expect(labels).toContain(STAP_PRAAT);
  });

  it('A1 r2: Praat i.p.v. gesprekskaart (privédilemma)', () => {
    const labels = spelStappenVoorRonde(1, 2).map((s) => s.label);
    expect(labels).toContain(STAP_PRAAT);
  });

  it('argument-fase toont Leg uit in de balk', () => {
    expect(
      actieveSpelStap('argument', 1, {
        gesprekskaartActief: true,
        heeftDilemma: true,
        dilemmaOpen: true,
      }),
    ).toBe('leg-uit');
  });
});
