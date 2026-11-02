import { describe, expect, it } from 'vitest';
import { ALL_INTERVENTIES, INTERVENTIE_BY_ID } from '@data/interventies/all';
import {
  assertInterventieDefinitiefCompleet,
  assertEchoBronnenBestaan,
  assertTweeKeuzesPerRonde,
  interventieVeldenCompleet,
} from '@data/interventies/validate';
import {
  echoTekstenVoorGekozenInterventies,
  studentZietVerborgenMeterInInterventie,
} from '@data/interventies/display';
import { interventiesBeschikbaarPerRonde, KEUZES_PER_RONDE, type Interventie } from '@data/interventies/types';

describe('interventies data', () => {
  it('bundle laadt 39 interventies (8×5 minus Piotr-kaart 4.2.1)', () => {
    expect(ALL_INTERVENTIES).toHaveLength(39);
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

  it('a1-1-1 heeft effectLater.verloop +', () => {
    expect(INTERVENTIE_BY_ID['a1-1-1']?.effectLater?.verloop).toBe('+');
  });

  it('a1-1-4 heet Flexkrachten inhuren voor piekdrukte; Flexibele jongeren komt nergens voor', () => {
    expect(INTERVENTIE_BY_ID['a1-1-4']?.naam).toBe('Flexkrachten inhuren voor piekdrukte');
    const json = JSON.stringify(ALL_INTERVENTIES);
    expect(json).not.toContain('Flexibele jongeren');
  });

  it('echo a2-2-2 verschijnt alleen als a1-2-2 gekozen is', () => {
    const bonusA2 = INTERVENTIE_BY_ID['a2-2-2']!;
    const zonder = echoTekstenVoorGekozenInterventies(bonusA2, new Set());
    expect(zonder).toHaveLength(0);
    const met = echoTekstenVoorGekozenInterventies(bonusA2, new Set(['a1-2-2']));
    expect(met).toHaveLength(1);
    expect(met[0]).toContain('schuur');
  });

  it('A4 ronde 2 heeft precies drie interventies, maximaal twee kiesbaar', () => {
    expect(interventiesBeschikbaarPerRonde(4, 2)).toBe(3);
    expect(KEUZES_PER_RONDE).toBe(2);
    const r2 = ALL_INTERVENTIES.filter((i) => i.episode === 4 && i.ronde === 2);
    expect(r2).toHaveLength(3);
    expect(r2.map((i) => i.id).sort()).toEqual(['a4-2-2', 'a4-2-3', 'a4-2-4']);
    expect(INTERVENTIE_BY_ID['a4-2-1']).toBeUndefined();
  });

  it('verborgen meters nooit zichtbaar voor studenten', () => {
    for (const i of ALL_INTERVENTIES) {
      expect(studentZietVerborgenMeterInInterventie(i, false)).toBe(false);
    }
  });
});
