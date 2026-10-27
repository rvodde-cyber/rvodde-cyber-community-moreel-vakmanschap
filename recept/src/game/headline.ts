import type { ComputeResult } from '@engine/types';

export function outcomeHeadline(res: ComputeResult, base: ComputeResult): string {
  const dw = Math.round(res.W) - Math.round(base.W);
  const db = Math.round(res.B) - Math.round(base.B);
  if (res.contra) return 'Dubbel signaal. Het vertrouwen kraakt.';
  if (dw >= 6 && db >= 5) return 'Beide paden geraakt. De fabriek herstelt.';
  if (dw >= 4 && db < 3) return 'Minder uitputting, maar de motivatie blijft steken.';
  if (db >= 4 && dw < 4) return 'De ploeg krijgt houvast terug. De druk blijft.';
  if (res.P0 >= base.P0 && dw <= 1) return 'De cijfers houden stand. De mensen niet.';
  return 'Weinig verschil met niets doen.';
}
