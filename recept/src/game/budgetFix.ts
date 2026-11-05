import { episodeContent } from '@data/episodes/content';
import { usesInterventieMotor } from '@data/episodes/motor';
import { roundDefFor } from './roundSource';
import { budgetOf, budgetOfDef } from '@engine/helpers';
import { kostEur } from '../lib/format';
import { eur } from '../lib/format';
import { bcalc, engineContext } from './budgetUi';
import type { GameUiState } from './uiTypes';

const BUD_STEP = 20000;

function roundBudgetTotal(state: GameUiState): number {
  const ctx = engineContext(state);
  const D = roundDefFor(state);
  const content = episodeContent(state.episode);
  return content.usesDemoBudget ? budgetOf(state.round, ctx) : budgetOfDef(D, state.round, ctx);
}

export function budgetBlockMessage(state: GameUiState): string | null {
  const R = state.rounds[state.round];
  const b = bcalc(state, R, engineContext(state));
  if (b.left >= 0) return null;
  if (usesInterventieMotor(state.episode)) {
    const cap = roundDefFor(state).budget;
    return `Nog nodig: jullie zitten ${-b.left} punt${-b.left === 1 ? '' : 'en'} boven het budget van ${cap}.`;
  }
  return `Nog nodig: pas de begroting aan: je zit ${eur(-b.left)} boven het budget`;
}

/** Berekent begrotingssliders die b.left ≥ 0 maken (stappen van € 20.000). */
export function computeAutoFixBud(state: GameUiState): Record<string, number> | null {
  const round = state.round;
  const R = state.rounds[round];
  const D = roundDefFor(state);
  const cap = roundBudgetTotal(state);

  let iv = 0;
  for (const k of D.cards) {
    if (R.cards.includes(k.id)) iv += kostEur(k.kosten);
  }
  if (iv > cap) return null;

  const bud: Record<string, number> = { ...R.bud };
  const postIds = D.posten.map((p) => p.id).sort((a, b) => (bud[b] ?? 0) - (bud[a] ?? 0));

  const sumPo = () => D.posten.reduce((s, p) => s + (bud[p.id] ?? 0), 0);
  let left = cap - iv - sumPo();
  if (left >= 0) return bud;

  let guard = 500;
  while (left < 0 && guard-- > 0) {
    let changed = false;
    for (const id of postIds) {
      const v = bud[id] ?? 0;
      if (v <= 0) continue;
      bud[id] = v - BUD_STEP;
      left = cap - iv - sumPo();
      changed = true;
      if (left >= 0) return bud;
    }
    if (!changed) return null;
  }
  return left >= 0 ? bud : null;
}

export function canAutoFixBudget(state: GameUiState): boolean {
  if (usesInterventieMotor(state.episode)) return false;
  return computeAutoFixBud(state) != null;
}

export function applyAutoFixBud(state: GameUiState): GameUiState {
  const next = computeAutoFixBud(state);
  if (!next) return state;
  const round = state.round;
  return {
    ...state,
    rounds: {
      ...state.rounds,
      [round]: { ...state.rounds[round], bud: next },
    },
  };
}
