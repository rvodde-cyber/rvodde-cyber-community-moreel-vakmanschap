import { INTERVENTIE_BY_ID } from '@data/interventies/all';
import { VERBORGEN_DELTA } from '@data/interventies/vertaaltabel';
import type { HiddenMetersState } from './uiTypes';

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function pushLog(lines: string[], delta: number, text: string) {
  lines.push(`${delta > 0 ? '▲' : '▼'} ${text}`);
}

/** Verborgen meters na interventiemotor-besluit. */
export function applyInterventieHidden(
  hidden: HiddenMetersState,
  cardIds: string[],
  delta: { menselijkeMaat: number; eerlijkheid: number },
): HiddenMetersState {
  const wm = [...hidden.logMm];
  const we = [...hidden.logEer];
  for (const id of cardIds) {
    const i = INTERVENTIE_BY_ID[id];
    if (!i) continue;
    const dMm = VERBORGEN_DELTA[i.verborgen.menselijkeMaat];
    if (dMm !== 0) pushLog(wm, dMm, i.naam);
  }
  if (delta.eerlijkheid !== 0) {
    pushLog(we, delta.eerlijkheid, 'Eerlijkheid na interventies');
  }
  return {
    menselijkeMaat: clamp(Math.round(hidden.menselijkeMaat + delta.menselijkeMaat), 0, 100),
    eerlijkheid: clamp(Math.round(hidden.eerlijkheid + delta.eerlijkheid), 0, 100),
    logMm: wm,
    logEer: we,
  };
}
