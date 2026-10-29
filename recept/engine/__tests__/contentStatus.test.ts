import { describe, expect, it } from 'vitest';
import {
  FALLBACK_SPELER,
  assertScenesConsistent,
  resolveScene,
  studentSeesConceptText,
  type Scene,
} from '../../data/contentStatus';
import { PIOTR_SCENES } from '../../data/piotr-lijn';

describe('contentStatus', () => {
  it('student krijgt fallback bij concept of leeg', () => {
    for (const s of PIOTR_SCENES) {
      expect(studentSeesConceptText(s)).toBe(false);
      const r = resolveScene(s, false);
      expect(r.showConceptLabel).toBe(false);
      if (s.status !== 'definitief') {
        expect(r.tekst).toBe(FALLBACK_SPELER);
        expect(r.isFallback).toBe(true);
      }
    }
  });

  it('docent ziet concept met label-flag', () => {
    const concept = PIOTR_SCENES.find((s) => s.status === 'concept');
    expect(concept).toBeDefined();
    const r = resolveScene(concept!, true);
    expect(r.showConceptLabel).toBe(true);
    expect(r.isFallback).toBe(false);
  });

  it('faalt bij definitief zonder tekst', () => {
    const bad: Scene = { id: 'x', titel: 't', tekst: '   ', status: 'definitief' };
    expect(() => assertScenesConsistent([bad])).toThrow(/definitief zonder tekst/);
    expect(() => resolveScene(bad, true)).toThrow(/definitief maar tekst is leeg/);
  });
});
