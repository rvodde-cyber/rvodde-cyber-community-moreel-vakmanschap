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
import { INTERVENTIES_A3, NABESPREKING_A3 } from '@data/interventies-a3';
import { INTERVENTIES_A5, NABESPREKING_A5 } from '@data/interventies-a5';
import { ROUNDS } from '@data/rounds';
import {
  ECHO_BRON_DEMO_KAARTEN_IDS,
  interventiesBeschikbaarPerRonde,
  KEUZES_PER_RONDE,
  type Interventie,
} from '@data/interventies/types';

describe('interventies data', () => {
  it('bundle laadt 32 interventies (8×4: A1–A3 + A5; A4 via demo rounds.ts)', () => {
    expect(ALL_INTERVENTIES).toHaveLength(32);
    expect(ALL_INTERVENTIES.some((i) => i.episode === 4)).toBe(false);
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

  it('A4 demo: rounds.ts heeft per ronde vijf kaarten met de goedgekeurde namen', () => {
    const r1 = ROUNDS[1].cards.map((c) => c.t);
    expect(r1).toEqual([
      'Vitaliteitsweek',
      'Aanwezigheidsbonus',
      'Flexkrachten',
      'TEMPO-norm begrenzen',
      'Coaching en extra ploegleider',
    ]);
    const r2 = ROUNDS[2].cards.map((c) => c.t);
    expect(r2).toEqual([
      'Gewetensclausule',
      'Defensie via TEMPO',
      'Regels schrappen',
      'Ploegleiders opleiden',
      'Compliance-afdeling',
    ]);
    expect(ROUNDS[1].contra).toEqual([
      ['B', 'D'],
      ['B', 'E'],
    ]);
    expect(ROUNDS[2].contra).toEqual([
      ['H', 'J'],
      ['F', 'G'],
    ]);
    expect(KEUZES_PER_RONDE).toBe(2);
    expect(() => interventiesBeschikbaarPerRonde(4, 1)).toThrow(/rounds\.ts/);
  });

  it('interventies-a4-concept is nergens meer geïmporteerd (geen a4-1-x / a4-2-x in bundle)', () => {
    expect(INTERVENTIE_BY_ID['a4-1-1']).toBeUndefined();
    expect(INTERVENTIE_BY_ID['a4-2-4']).toBeUndefined();
    for (const i of ALL_INTERVENTIES) {
      expect(i.id).not.toMatch(/^a4-/);
    }
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

  const A3_IDS = ['a3-1-1', 'a3-1-2', 'a3-1-3', 'a3-1-4', 'a3-2-1', 'a3-2-2', 'a3-2-3', 'a3-2-4'] as const;

  it('alle acht A3-interventies zijn definitief en velden compleet', () => {
    expect(INTERVENTIES_A3).toHaveLength(8);
    for (const id of A3_IDS) {
      const i = INTERVENTIE_BY_ID[id]!;
      expect(i.status).toBe('definitief');
      expect(i.interventieDefinitief).toBe(true);
      expect(interventieVeldenCompleet(i)).toBe(true);
    }
    expect(() => assertInterventieDefinitiefCompleet(ALL_INTERVENTIES)).not.toThrow();
    expect(() => assertEchoBronnenBestaan(ALL_INTERVENTIES)).not.toThrow();
    expect(INTERVENTIE_BY_ID['a1-2-2']!.status).toBe('definitief');
    expect(INTERVENTIE_BY_ID['a2-2-2']!.status).toBe('definitief');
  });

  it('studentmodus toont A3-interventies zonder verborgen meter; docent geen CONCEPT bij A3', () => {
    for (const i of INTERVENTIES_A3) {
      expect(interventieZichtbaarInModus(i, false)).toBe(true);
      expect(interventieToontConceptLabel(i, true)).toBe(false);
      expect(studentZietVerborgenMeterInInterventie(i, false)).toBe(false);
      const z = interventieZichtbaarVoorStudent(i);
      expect('verborgen' in z).toBe(false);
    }
  });

  it('nabespreking A3 blijft concept (a3-nb-1 t/m a3-nb-5)', () => {
    expect(NABESPREKING_A3).toHaveLength(5);
    for (const v of NABESPREKING_A3) {
      expect(v.status).toBe('concept');
    }
  });

  it('a3-2-4 is aanwezig en definitief (Aandelenregeling MT)', () => {
    const mt = INTERVENTIE_BY_ID['a3-2-4']!;
    expect(mt.nummer).toBe('3.2.4');
    expect(mt.status).toBe('definitief');
    expect(mt.interventieDefinitief).toBe(true);
    expect(mt.naam).toContain('Aandelenregeling');
  });

  it('A3: echo kwaliteit alleen bij gekozen bonus a1-2-2 of a2-2-2', () => {
    const a3 = INTERVENTIE_BY_ID['a3-1-1']!;
    expect(a3.echo).toHaveLength(2);
    expect(echoTekstenVoorGekozenInterventies(a3, new Set())).toHaveLength(0);
    expect(echoTekstenVoorGekozenInterventies(a3, new Set(['a1-2-2']))).toHaveLength(1);
    expect(echoTekstenVoorGekozenInterventies(a3, new Set(['a1-2-2', 'a2-2-2']))).toHaveLength(2);
  });

  const A5_IDS = ['a5-1-1', 'a5-1-2', 'a5-1-3', 'a5-1-4', 'a5-2-1', 'a5-2-2', 'a5-2-3', 'a5-2-4'] as const;

  it('alle acht A5-interventies zijn definitief en velden compleet', () => {
    expect(INTERVENTIES_A5).toHaveLength(8);
    for (const id of A5_IDS) {
      const i = INTERVENTIE_BY_ID[id]!;
      expect(i.status).toBe('definitief');
      expect(i.interventieDefinitief).toBe(true);
      expect(interventieVeldenCompleet(i)).toBe(true);
    }
    expect(() => assertInterventieDefinitiefCompleet(ALL_INTERVENTIES)).not.toThrow();
    expect(() => assertEchoBronnenBestaan(ALL_INTERVENTIES)).not.toThrow();
  });

  it('studentmodus toont A5-interventies zonder verborgen meter; docent geen CONCEPT bij A5', () => {
    for (const i of INTERVENTIES_A5) {
      expect(interventieZichtbaarInModus(i, false)).toBe(true);
      expect(interventieToontConceptLabel(i, true)).toBe(false);
      expect(studentZietVerborgenMeterInInterventie(i, false)).toBe(false);
      const z = interventieZichtbaarVoorStudent(i);
      expect('verborgen' in z).toBe(false);
    }
  });

  it('nabespreking A5 blijft concept (a5-nb-1 t/m a5-nb-5)', () => {
    expect(NABESPREKING_A5).toHaveLength(5);
    for (const v of NABESPREKING_A5) {
      expect(v.status).toBe('concept');
    }
  });

  it('a5-2-3 heeft echo demo-a4-H; bron bestaat in rounds (Regels schrappen)', () => {
    const bureau = INTERVENTIE_BY_ID['a5-2-3']!;
    expect(bureau.echo?.[0]?.bron).toBe('demo-a4-H');
    expect(ECHO_BRON_DEMO_KAARTEN_IDS).toContain('demo-a4-H');
    const kaartH = ROUNDS[2].cards.find((c) => c.id === 'H');
    expect(kaartH?.t).toBe('Regels schrappen');
    expect(echoTekstenVoorGekozenInterventies(bureau, new Set())).toHaveLength(0);
    expect(echoTekstenVoorGekozenInterventies(bureau, new Set(['demo-a4-H']))).toHaveLength(1);
  });

  it('a5-1-3 (Anne-Fleur) is aanwezig en definitief', () => {
    const anneFleur = INTERVENTIE_BY_ID['a5-1-3']!;
    expect(anneFleur.nummer).toBe('5.1.3');
    expect(anneFleur.naam).toContain('Anne-Fleur');
    expect(anneFleur.status).toBe('definitief');
    expect(anneFleur.interventieDefinitief).toBe(true);
  });
});
