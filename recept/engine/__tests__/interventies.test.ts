import { describe, expect, it } from 'vitest';
import { ALL_INTERVENTIES, INTERVENTIE_BY_ID } from '@data/interventies/all';
import {
  assertInterventieDefinitiefCompleet,
  assertEchoBronnenBestaan,
  assertPiotrContractVariant,
  assertTweeKeuzesPerRonde,
  interventieVeldenCompleet,
} from '@data/interventies/validate';
import { studentZietVerborgenMeterInInterventie } from '@data/interventies/display';
import { KEUZES_PER_RONDE, type Interventie } from '@data/interventies/types';

describe('interventies data', () => {
  it('bundle laadt 40 interventies (8×5 afleveringen)', () => {
    expect(ALL_INTERVENTIES).toHaveLength(40);
  });

  it('faalt als interventieDefinitief true zonder volledige velden', () => {
    const base = INTERVENTIE_BY_ID['a1-1-1']!;
    const bad: Interventie = { ...base, interventieDefinitief: true, uitkomsttekst: '  ' };
    expect(interventieVeldenCompleet(bad)).toBe(false);
    expect(() => assertInterventieDefinitiefCompleet([bad])).toThrow(/incompleet/);
  });

  it('faalt als meer dan twee keuzes per ronde zijn toegestaan in regels', () => {
    expect(KEUZES_PER_RONDE).toBe(2);
    expect(() => assertTweeKeuzesPerRonde(ALL_INTERVENTIES)).not.toThrow();
  });

  it('faalt als echo verwijst naar niet-bestaande interventie', () => {
    const bad: Interventie = {
      ...INTERVENTIE_BY_ID['a2-2-2']!,
      echo: [{ bron: 'onbekend-id', tekst: 'x' }],
    };
    expect(() => assertEchoBronnenBestaan([bad, ...ALL_INTERVENTIES.filter((i) => i.id !== 'a2-2-2')])).toThrow(
      /onbekende bron/,
    );
  });

  it('faalt als 4.2.1 definitief is zonder bevestigde variantscène', () => {
    const bad: Interventie = { ...INTERVENTIE_BY_ID['a4-2-1']!, interventieDefinitief: true };
    expect(() => assertPiotrContractVariant([bad])).toThrow(/variantscène/);
  });

  it('verborgen meters nooit zichtbaar voor studenten', () => {
    for (const i of ALL_INTERVENTIES) {
      expect(studentZietVerborgenMeterInInterventie(i, false)).toBe(false);
    }
  });
});
