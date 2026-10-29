import { INTERVENTIES_A1, NABESPREKING_A1 } from '../interventies-a1';
import { INTERVENTIES_A2, NABESPREKING_A2 } from '../interventies-a2';
import { INTERVENTIES_A3, NABESPREKING_A3 } from '../interventies-a3';
import { INTERVENTIES_A4, NABESPREKING_A4 } from '../interventies-a4';
import { INTERVENTIES_A5, NABESPREKING_A5 } from '../interventies-a5';
import type { Interventie, NabesprekingInterventieVraag } from './types';
import { assertInterventieBundles } from './validate';

export const ALL_INTERVENTIES: Interventie[] = [
  ...INTERVENTIES_A1,
  ...INTERVENTIES_A2,
  ...INTERVENTIES_A3,
  ...INTERVENTIES_A4,
  ...INTERVENTIES_A5,
];

export const ALL_NABESPREKING_BY_EP: Record<
  1 | 2 | 3 | 4 | 5,
  NabesprekingInterventieVraag[]
> = {
  1: NABESPREKING_A1,
  2: NABESPREKING_A2,
  3: NABESPREKING_A3,
  4: NABESPREKING_A4,
  5: NABESPREKING_A5,
};

export const INTERVENTIE_BY_ID: Record<string, Interventie> = Object.fromEntries(
  ALL_INTERVENTIES.map((i) => [i.id, i]),
);

assertInterventieBundles(ALL_INTERVENTIES);
