import { describe, expect, it } from 'vitest';
import { resolveScene, studentSeesConceptText } from '@data/contentStatus';
import { sanneReactieEp4, sanneOnthullingEp5, sanneSlotEp4 } from '@data/sanne';

describe('sanne data', () => {
  it('student ziet fallback bij concept reacties', () => {
    for (const contract of ['ja', 'nee'] as const) {
      for (const toon of ['A', 'B'] as const) {
        const s = sanneReactieEp4[contract][toon];
        expect(studentSeesConceptText(s)).toBe(false);
        expect(resolveScene(s, false).isFallback).toBe(true);
      }
    }
  });

  it('docent ziet concept met label', () => {
    const s = sanneReactieEp4.ja.A;
    const r = resolveScene(s, true);
    expect(r.showConceptLabel).toBe(true);
    expect(r.isFallback).toBe(false);
  });

  it('faalt bij definitief zonder tekst (helper)', () => {
    const bad = { ...sanneSlotEp4, status: 'definitief' as const, tekst: ' ' };
    expect(() => resolveScene(bad, true)).toThrow(/definitief/);
  });

  it('sanneReactieEp4 heeft tekst voor ja en nee in elke toon (concept)', () => {
    for (const contract of ['ja', 'nee'] as const) {
      for (const toon of ['A', 'B'] as const) {
        expect(sanneReactieEp4[contract][toon].tekst.trim().length).toBeGreaterThan(10);
      }
    }
  });

  it('slot en onthulling zijn concept met tekst', () => {
    expect(sanneSlotEp4.status).toBe('concept');
    expect(sanneOnthullingEp5.tekst).toContain('getekend');
  });
});
