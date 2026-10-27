import { describe, expect, it } from 'vitest';
import { ROUNDS } from '../../data/rounds';
import { compute, emptyContext, marcoBud } from '../index';

describe('richtingsregels (spelmotor.md)', () => {
  const ctx = emptyContext();
  const bud = marcoBud(1);

  it('zelfde keuzes geven dezelfde uitkomst', () => {
    const a = compute(1, ['D', 'E'], 1.0, ctx, bud);
    const b = compute(1, ['D', 'E'], 1.0, ctx, bud);
    expect(a.P1).toBe(b.P1);
    expect(a.W).toBe(b.W);
    expect(a.B).toBe(b.B);
  });

  it('geen meter buiten 0–100', () => {
    const res = compute(1, ['B', 'C'], 0.8, ctx, bud);
    expect(res.W).toBeGreaterThanOrEqual(0);
    expect(res.W).toBeLessThanOrEqual(100);
    expect(res.B).toBeGreaterThanOrEqual(0);
    expect(res.B).toBeLessThanOrEqual(100);
    expect(res.V).toBeGreaterThanOrEqual(0);
    expect(res.V).toBeLessThanOrEqual(100);
    expect(res.rep).toBeGreaterThanOrEqual(0);
    expect(res.rep).toBeLessThanOrEqual(100);
    for (const v of Object.values(res.dr)) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    }
  });

  it('hindernis-eisen verlagen verlaagt welzijn niet (D vs geen interventie)', () => {
    const none = compute(1, [], 1.0, ctx, bud);
    const d = compute(1, ['D'], 1.0, ctx, bud);
    expect(d.W).toBeGreaterThanOrEqual(none.W);
    expect(d.dr.tempo).toBeLessThan(none.dr.tempo);
  });

  it('meer hulpbronnen verlagen betrokkenheid niet (E vs geen interventie)', () => {
    const none = compute(1, [], 1.0, ctx, bud);
    const e = compute(1, ['E'], 1.0, ctx, bud);
    expect(e.B).toBeGreaterThanOrEqual(none.B);
    expect(e.R).toBeGreaterThan(none.R);
  });

  it('passende interventie (fit=1) heeft sterker effect dan neutrale (fit=0) opzelfde drijver', () => {
    const cardD = ROUNDS[1].cards.find((c) => c.id === 'D');
    const cardA = ROUNDS[1].cards.find((c) => c.id === 'A');
    expect(cardD?.fit).toBe(1);
    expect(cardA?.fit).toBe(0);
    const d = compute(1, ['D'], 1.0, ctx, bud);
    const a = compute(1, ['A'], 1.0, ctx, bud);
    const dEff = d.eff.D?.erkenning ?? 0;
    const aEff = a.eff.A?.erkenning ?? 0;
    expect(dEff).toBeGreaterThan(aEff);
  });

  it('tegenstrijdig paar verlaagt vertrouwen ten opzichte van D+E zonder B', () => {
    const de = compute(1, ['D', 'E'], 1.0, ctx, bud);
    const bde = compute(1, ['B', 'D'], 1.0, ctx, bud);
    expect(bde.contra).toBe(true);
    expect(bde.V).toBeLessThan(de.V);
  });
});
