import type { EffectRichting } from './types';
import type { EpisodeId } from '../episodes/meta';

/** Zichtbare meters: ++ = +8, + = +4, 0 = 0, - = -4, -- = -8 */
export const ZICHTBAAR_DELTA: Record<EffectRichting, number> = {
  '++': 8,
  '+': 4,
  '0': 0,
  '-': -4,
  '--': -8,
};

/** Verborgen meters (eerlijkheid, menselijke maat): ++ = +6, + = +3, … */
export const VERBORGEN_DELTA: Record<EffectRichting, number> = {
  '++': 6,
  '+': 3,
  '0': 0,
  '-': -3,
  '--': -6,
};

/** Verzuim en verloop: 1 tabelpunt = 0,25 procentpunt */
export const VERZUIM_VERLOOP_FACTOR = 0.25;

export function deltaVerzuimVerloop(richting: EffectRichting): number {
  return ZICHTBAAR_DELTA[richting] * VERZUIM_VERLOOP_FACTOR;
}

export const KOSTEN_PUNTEN: Record<'€' | '€€' | '€€€', number> = {
  '€': 3,
  '€€': 5,
  '€€€': 6,
};

/** Aflevering 1: budgetpunten per ronde (Richard 5 nov 2026). */
export const BUDGET_PER_RONDE_A1 = { 1: 8, 2: 9 } as const;

export const LATER_FACTOR = 0.5;

/** Budgetpunten voor interventiemotor; A4 gebruikt dit niet. */
export function budgetVoorRonde(episode: Exclude<EpisodeId, 4>, round: 1 | 2): number {
  if (episode === 1) return BUDGET_PER_RONDE_A1[round];
  // TODO: kalibratie A2/A3/A5 na playtest
  return 8;
}

export function kostenInPunten(cat: '€' | '€€' | '€€€'): number {
  return KOSTEN_PUNTEN[cat];
}

export function somKaartKosten(categorien: ('€' | '€€' | '€€€')[]): number {
  return categorien.reduce((s, c) => s + kostenInPunten(c), 0);
}
