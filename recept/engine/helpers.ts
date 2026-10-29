import { ROUNDS } from '@data/rounds';
import type { RoundDefinition } from '@data/schemas/rounds.schema';
import type { GameContext } from './types';

export function has(list: readonly string[], x: string): boolean {
  return list.includes(x);
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/** Tempofactor T = 0,8 + 0,4 × tempo / 100 */
export function tempFactor(tempo: number): number {
  return 0.8 + (0.4 * tempo) / 100;
}

export function roundInt(x: number): number {
  return Math.round(x);
}

export function marcoBudFromPosten(posten: RoundDefinition['posten']): Record<string, number> {
  const b: Record<string, number> = {};
  for (const p of posten) b[p.id] = p.marco;
  return b;
}

export function marcoBud(roundNum: 1 | 2): Record<string, number> {
  return marcoBudFromPosten(ROUNDS[roundNum].posten);
}

export function budgetOf(roundNum: 1 | 2, ctx: GameContext): number {
  const base = ROUNDS[roundNum].budget;
  if (roundNum === 2 && ctx.rounds[1]?.bud.reserve !== undefined) {
    return base + ctx.rounds[1].bud.reserve;
  }
  return base;
}

export function budgetOfDef(def: RoundDefinition, roundNum: 1 | 2, ctx: GameContext): number {
  if (roundNum === 2 && ctx.rounds[1]?.bud.reserve !== undefined) {
    return def.budget + ctx.rounds[1].bud.reserve;
  }
  return def.budget;
}

export function emptyContext(): GameContext {
  return { results: {}, rounds: {} };
}
