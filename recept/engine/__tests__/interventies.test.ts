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
  interventieToontConceptLabel,
  interventieZichtbaarInModus,
  interventieZichtbaarVoorStudent,
  studentZietVerborgenMeterInInterventie,
} from '@data/interventies/display';
import { INTERVENTIES_A1, NABESPREKING_A1 } from '@data/interventies-a1';
import { INTERVENTIES_A2, NABESPREKING_A2 } from '@data/interventies-a2';
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

  const A1_IDS = ['a1-1-1', 'a1-1-2', 'a1-1-3', 'a1-1-4', 'a1-2-1', 'a1-2-2', 'a1-2-3', 'a1-2-4'] as const;

  it('alle acht A1-interventies zijn definitief en velden compleet', () => {
    expect(INTERVENTIES_A1).toHaveLength(8);
    for (const id of A1_IDS) {
      const i = INTERVENTIE_BY_ID[id]!;
      expect(i.status).toBe('definitief');
      expect(i.interventieDefinitief).toBe(true);
      expect(interventieVeldenCompleet(i)).toBe(true);
    }
    expect(() => assertInterventieDefinitiefCompleet(ALL_INTERVENTIES)).not.toThrow();
  });

  it('studentmodus toont A1-interventies zonder verborgen meter; docent geen CONCEPT bij A1', () => {
    for (const i of INTERVENTIES_A1) {
      expect(interventieZichtbaarInModus(i, false)).toBe(true);
      expect(interventieToontConceptLabel(i, true)).toBe(false);
      expect(studentZietVerborgenMeterInInterventie(i, false)).toBe(false);
      const z = interventieZichtbaarVoorStudent(i);
      expect('verborgen' in z).toBe(false);
    }
  });

  it('nabespreking A1 blijft concept', () => {
    expect(NABESPREKING_A1.length).toBeGreaterThan(0);
    for (const v of NABESPREKING_A1) {
      expect(v.status).toBe('concept');
    }
  });

  const A2_IDS = ['a2-1-1', 'a2-1-2', 'a2-1-3', 'a2-1-4', 'a2-2-1', 'a2-2-2', 'a2-2-3', 'a2-2-4'] as const;

  it('alle acht A2-interventies zijn definitief en velden compleet', () => {
    expect(INTERVENTIES_A2).toHaveLength(8);
    for (const id of A2_IDS) {
      const i = INTERVENTIE_BY_ID[id]!;
      expect(i.status).toBe('definitief');
      expect(i.interventieDefinitief).toBe(true);
      expect(interventieVeldenCompleet(i)).toBe(true);
    }
    expect(() => assertInterventieDefinitiefCompleet(ALL_INTERVENTIES)).not.toThrow();
  });

  it('studentmodus toont A2-interventies zonder verborgen meter; docent geen CONCEPT bij A2', () => {
    for (const i of INTERVENTIES_A2) {
      expect(interventieZichtbaarInModus(i, false)).toBe(true);
      expect(interventieToontConceptLabel(i, true)).toBe(false);
      expect(studentZietVerborgenMeterInInterventie(i, false)).toBe(false);
      const z = interventieZichtbaarVoorStudent(i);
      expect('verborgen' in z).toBe(false);
    }
  });

  it('nabespreking A2 blijft concept (inclusief conditionele Wegen-vraag)', () => {
    expect(NABESPREKING_A2.length).toBeGreaterThan(0);
    for (const v of NABESPREKING_A2) {
      expect(v.status).toBe('concept');
    }
    const bonus = NABESPREKING_A2.find((v) => v.id === 'a2-nb-bonus-echo');
    expect(bonus?.fase).toBe('wegen');
    expect(bonus?.tonenAlsGekozen).toEqual(['a1-2-2', 'a2-2-2']);
  });

  it('A2: echo a2-2-2 alleen zichtbaar als a1-2-2 eerder gekozen is', () => {
    const a2Bonus = INTERVENTIE_BY_ID['a2-2-2']!;
    expect(a2Bonus.status).toBe('definitief');
    expect(echoTekstenVoorGekozenInterventies(a2Bonus, new Set(['a2-2-2']))).toHaveLength(0);
    expect(echoTekstenVoorGekozenInterventies(a2Bonus, new Set(['a1-2-2']))).toHaveLength(1);
  });
});
