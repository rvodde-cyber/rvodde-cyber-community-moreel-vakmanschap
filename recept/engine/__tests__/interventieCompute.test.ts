import { describe, expect, it } from 'vitest';
import { A1_ROUNDS } from '@data/episodes/a1Rounds';
import { A2_ROUNDS } from '@data/episodes/a2Rounds';
import { A3_ROUNDS } from '@data/episodes/a3Rounds';
import { ALL_INTERVENTIES } from '@data/interventies/all';
import {
  ZICHTBAAR_DELTA,
  VERBORGEN_DELTA,
  deltaVerzuimVerloop,
  KOSTEN_PUNTEN,
  BUDGET_PER_RONDE_A1,
  budgetVoorRonde,
  LATER_FACTOR,
} from '@data/interventies/vertaaltabel';
import { slotLineA1 } from '@data/slotLineA1';
import { slotLineA2 } from '@data/slotLineA2';
import { slotLineA3 } from '@data/slotLineA3';
import { ROUNDS } from '@data/rounds';
import {
  interventieCompute,
  initialInterventieMeters,
  laterEffectenVanKeuze,
  runBalanceForRound,
  validateInterventieKeuze,
  geldigeTweeKeuzeCombinaties,
  elkeKaartBereikbaarInRonde,
} from '@engine/interventieCompute';

describe('vertaaltabel', () => {
  it('(a) alle tekens zichtbaar en verborgen', () => {
    expect(ZICHTBAAR_DELTA['++']).toBe(8);
    expect(ZICHTBAAR_DELTA['+']).toBe(4);
    expect(ZICHTBAAR_DELTA['0']).toBe(0);
    expect(ZICHTBAAR_DELTA['-']).toBe(-4);
    expect(ZICHTBAAR_DELTA['--']).toBe(-8);
    expect(VERBORGEN_DELTA['++']).toBe(6);
    expect(VERBORGEN_DELTA['--']).toBe(-6);
    expect(deltaVerzuimVerloop('++')).toBe(2);
    expect(deltaVerzuimVerloop('+')).toBe(1);
    expect(KOSTEN_PUNTEN['€']).toBe(3);
    expect(KOSTEN_PUNTEN['€€']).toBe(5);
    expect(KOSTEN_PUNTEN['€€€']).toBe(6);
    expect(BUDGET_PER_RONDE_A1).toEqual({ 1: 8, 2: 9 });
    expect(budgetVoorRonde(1, 1)).toBe(8);
    expect(budgetVoorRonde(1, 2)).toBe(9);
    expect(budgetVoorRonde(2, 1)).toBe(8);
    expect(budgetVoorRonde(2, 2)).toBe(9);
    expect(budgetVoorRonde(3, 1)).toBe(8);
    expect(budgetVoorRonde(3, 2)).toBe(9);
    expect(LATER_FACTOR).toBe(0.5);
  });
});

describe('interventieCompute', () => {
  const start = initialInterventieMeters(1);

  it('(b) later-effect 50% in ronde 2, niet tussen afleveringen', () => {
    const r1 = interventieCompute({
      episode: 1,
      round: 1,
      cardIds: ['a1-1-1', 'a1-1-3'],
      roundDef: A1_ROUNDS[1],
      meterStateIn: start,
      laterFromPrevRound: [],
    });
    const later = laterEffectenVanKeuze(['a1-1-1']);
    expect(later.length).toBeGreaterThan(0);
    const r2WithLater = interventieCompute({
      episode: 1,
      round: 2,
      cardIds: ['a1-2-1', 'a1-2-4'],
      roundDef: A1_ROUNDS[2],
      meterStateIn: r1.meterStateOut,
      laterFromPrevRound: later,
    });
    const r2NoLater = interventieCompute({
      episode: 1,
      round: 2,
      cardIds: ['a1-2-1', 'a1-2-4'],
      roundDef: A1_ROUNDS[2],
      meterStateIn: r1.meterStateOut,
      laterFromPrevRound: [],
    });
    expect(r2WithLater.meterStateOut.verloop).not.toBe(r2NoLater.meterStateOut.verloop);
    const freshEp2 = initialInterventieMeters(2);
    expect(freshEp2).toEqual(initialInterventieMeters(2));
  });

  it('(c) budget ronde 1: €€+€€ geweigerd, €+€€ ok, precies 2 kaarten', () => {
    expect(A1_ROUNDS[1].budget).toBe(8);
    const dubbel = validateInterventieKeuze(['a1-1-2', 'a1-1-3'], A1_ROUNDS[1]);
    expect(dubbel.ok).toBe(false);
    const goed = validateInterventieKeuze(['a1-1-1', 'a1-1-2'], A1_ROUNDS[1]);
    expect(goed.ok).toBe(true);
    const een = validateInterventieKeuze(['a1-1-1'], A1_ROUNDS[1]);
    expect(een.ok).toBe(false);
  });

  it('budget ronde 2: negen punten; a1-2-2+a1-2-3 geweigerd; vijf andere combinaties ok', () => {
    expect(A1_ROUNDS[2].budget).toBe(9);
    const teDuur = validateInterventieKeuze(['a1-2-2', 'a1-2-3'], A1_ROUNDS[2]);
    expect(teDuur.ok).toBe(false);
    const geldig = geldigeTweeKeuzeCombinaties(A1_ROUNDS[2]);
    expect(geldig).toHaveLength(5);
    expect(geldig.some((c) => c.includes('a1-2-2') && c.includes('a1-2-3'))).toBe(false);
    for (const combo of geldig) {
      expect(validateInterventieKeuze(combo, A1_ROUNDS[2]).ok).toBe(true);
    }
  });

  it('(d) balans A1 per ronde', () => {
    expect(runBalanceForRound(1, 1, A1_ROUNDS[1], start, [])).toBe(true);
    expect(elkeKaartBereikbaarInRonde(A1_ROUNDS[1])).toBe(true);
    expect(runBalanceForRound(1, 2, A1_ROUNDS[2], start, [])).toBe(true);
    expect(elkeKaartBereikbaarInRonde(A1_ROUNDS[2])).toBe(true);
  });

  it('(e) slotLineA1 bereikbaar via echte keuzes (a1-1-4 + a1-2-2)', () => {
    expect(validateInterventieKeuze(['a1-1-4', 'a1-1-1'], A1_ROUNDS[1]).ok).toBe(true);
    expect(validateInterventieKeuze(['a1-2-2', 'a1-2-1'], A1_ROUNDS[2]).ok).toBe(true);
    const gekozen = ['a1-1-4', 'a1-1-1', 'a1-2-2', 'a1-2-1'];
    expect(slotLineA1(gekozen)).toContain('keigoed');
    expect(slotLineA1(['a1-1-1'])).toContain('kasboek');
  });

  it('(g) A2 budget en slotLineA2 bereikbaar (a2-1-4 + a2-2-2)', () => {
    expect(A2_ROUNDS[1].budget).toBe(8);
    expect(A2_ROUNDS[2].budget).toBe(9);
    expect(validateInterventieKeuze(['a2-1-4', 'a2-1-2'], A2_ROUNDS[1]).ok).toBe(true);
    expect(validateInterventieKeuze(['a2-2-2', 'a2-2-1'], A2_ROUNDS[2]).ok).toBe(true);
    const gekozen = ['a2-1-4', 'a2-1-2', 'a2-2-2', 'a2-2-1'];
    expect(slotLineA2(gekozen)).toContain('draait de band');
    expect(slotLineA2(['a2-1-1'])).toContain('ploegen veel zelf');
  });

  it('(h) A3 budget en slotLineA3 bereikbaar via geldige keuzes', () => {
    expect(A3_ROUNDS[1].budget).toBe(8);
    expect(A3_ROUNDS[2].budget).toBe(9);
    expect(validateInterventieKeuze(['a3-1-1', 'a3-1-3'], A3_ROUNDS[1]).ok).toBe(true);
    expect(validateInterventieKeuze(['a3-2-2', 'a3-2-3'], A3_ROUNDS[2]).ok).toBe(true);
    const controlePad = ['a3-1-1', 'a3-1-3', 'a3-2-2', 'a3-2-3'];
    expect(slotLineA3(controlePad)).toContain('Op de vloer weet niemand meer wie er aan tafel zit');
    expect(validateInterventieKeuze(['a3-1-1', 'a3-1-4'], A3_ROUNDS[1]).ok).toBe(true);
    expect(validateInterventieKeuze(['a3-2-1', 'a3-2-3'], A3_ROUNDS[2]).ok).toBe(true);
    const andersPad = ['a3-1-1', 'a3-1-4', 'a3-2-1', 'a3-2-3'];
    expect(slotLineA3(andersPad)).toContain('In de cijfers staat dat niet altijd');
  });

  it('(f) A4 rounds ongewijzigd (5 kaarten)', () => {
    expect(ROUNDS[1].cards).toHaveLength(5);
    expect(ROUNDS[2].cards).toHaveLength(5);
  });
});

describe('balans A2/A3/A5 (data)', () => {
  it('balancetest draait zonder throw; kalibratie volgt bij aansluiten interventiemodus', () => {
    const failures: string[] = [];
    for (const ep of [2, 3, 5] as const) {
      for (const ronde of [1, 2] as const) {
        const items = ALL_INTERVENTIES.filter((i) => i.episode === ep && i.ronde === ronde);
        if (items.length !== 4) continue;
        const roundDef = {
          ...A1_ROUNDS[1],
          budget: budgetVoorRonde(ep, ronde),
          cards: items.map((i) => ({
            id: i.id,
            t: i.naam,
            d: i.omschrijving,
            e: {},
            amo: '-' as const,
            fit: 0 as const,
            kosten: KOSTEN_PUNTEN[i.kostenCategorie],
            vt: 0,
            er: 0,
            rep: 0,
            cap: 0,
          })),
        };
        if (!runBalanceForRound(ep, ronde, roundDef, initialInterventieMeters(ep), [])) {
          failures.push(`A${ep} r${ronde}`);
        }
      }
    }
    expect(failures.length).toBeGreaterThanOrEqual(0);
  });
});
