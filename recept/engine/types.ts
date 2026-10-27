import type { Drivers } from '../data/startDrivers';
import type { RoundDefinition } from '../data/schemas/rounds.schema';

export type BudgetMap = Record<string, number>;

export interface RoundPlayState {
  cards: string[];
  bud: BudgetMap;
}

/** Vervangt globale S uit de referentie-HTML */
export interface GameContext {
  results: Partial<Record<number, ComputeResult>>;
  rounds: Partial<Record<number, RoundPlayState>>;
}

export interface HrKostBreakdown {
  verzuim: number;
  werving: number;
  inwerken: number;
  motivatie: number;
  vertrek: number;
  totaal: number;
}

export interface RoundStartSnapshot {
  dr: Drivers;
  V0: number;
  rep0: number;
  Pb: number;
  HRb: HrKostBreakdown;
  verz0: number;
  notes: string[];
}

export interface ComputeResult {
  n: number;
  verl: number;
  hr: HrKostBreakdown;
  eurNext: number;
  dr: Drivers;
  eff: Record<string, Record<string, number>>;
  E: number;
  R: number;
  W: number;
  B: number;
  basis: number;
  g: number;
  P0: number;
  P1: number;
  verz: number;
  winst: number;
  eurRes: number;
  u: BudgetMap;
  beff: Record<string, Record<string, number>>;
  er: number;
  bud: BudgetMap;
  rep: number;
  V: number;
  contra: boolean;
  syn: boolean;
  dom: string[];
  anb: number;
  betr: number;
  sel: RoundDefinition['cards'];
  s0: RoundStartSnapshot;
}

export type RoundNumber = keyof typeof import('../data/rounds').ROUNDS;
