import { describe, expect, it } from 'vitest';
import { assertScenesConsistent } from '../../data/contentStatus';
import {
  mtKoosPiotrInDienst,
  resolveTestamentForSpel,
  type TestamentVariantKey,
} from '../../data/piotrSpel';
import { sceneById, validatePiotrLijn } from '../../data/piotr-lijn';
import { assertPiotrContractVariant } from '../../data/interventies/validate';
import { INTERVENTIE_BY_ID } from '../../data/interventies/all';

describe('piotr testament varianten', () => {
  it('toont nooit beide variantteksten tegelijk', () => {
    const ja = resolveTestamentForSpel(true, false);
    const nee = resolveTestamentForSpel(false, false);
    expect(ja.variant.tekst).not.toBe(nee.variant.tekst);
    const metSnippet = 'Jullie gaven Piotr een contract';
    const zonderSnippet = 'Jullie lieten die voorbijgaan';
    expect(ja.variant.tekst).toContain(metSnippet);
    expect(ja.variant.tekst).not.toContain(zonderSnippet);
    expect(nee.variant.tekst).toContain(zonderSnippet);
    expect(nee.variant.tekst).not.toContain(metSnippet);
  });

  it('koppelt ja aan variantMetContract en nee aan variantZonderContract', () => {
    const keys = (inDienst: boolean): TestamentVariantKey =>
      resolveTestamentForSpel(inDienst, false).variantKey;
    expect(keys(true)).toBe('met');
    expect(keys(false)).toBe('zonder');
  });

  it('mtKoosPiotrInDienst volgt begrotingspost piotr-vast', () => {
    expect(mtKoosPiotrInDienst({ 'piotr-vast': 25000 })).toBe(true);
    expect(mtKoosPiotrInDienst({ 'piotr-vast': 20000 })).toBe(false);
    expect(mtKoosPiotrInDienst({})).toBe(false);
  });

  it('faalt bij definitief variant zonder tekst', () => {
    const slot = sceneById('a4-slot-testament');
    expect(slot?.variantZonderContract?.status).toBe('definitief');
    expect(() =>
      assertScenesConsistent([
        {
          id: 'x',
          titel: 't',
          tekst: 'ok',
          status: 'definitief',
        },
        {
          id: 'y',
          titel: 't',
          tekst: '   ',
          status: 'definitief',
        },
      ]),
    ).toThrow(/definitief zonder tekst/);
    expect(() => validatePiotrLijn()).not.toThrow();
  });

  it('a4-2-1 definitief mag nu met bevestigde variantZonderContract', () => {
    const piotr = { ...INTERVENTIE_BY_ID['a4-2-1']!, interventieDefinitief: true as const };
    expect(() => assertPiotrContractVariant([piotr])).not.toThrow();
  });
});
