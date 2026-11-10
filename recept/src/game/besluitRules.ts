import { okArgument } from '@data/schemas/argument.schema';
import { usesInterventieMotor } from '@data/episodes/motor';
import { budgetBlockMessage } from './budgetFix';
import { bcalc, engineContext } from './budgetUi';
import { roundDefFor } from './roundSource';
import type { GameUiState } from './uiTypes';

/** Twee interventies + budget (en piloot bij A4) — stap vóór argument. */
export function okBesluitKeuze(state: GameUiState): boolean {
  const R = state.rounds[state.round];
  const ctx = engineContext(state);
  const b = bcalc(state, R, ctx);
  const interventie = usesInterventieMotor(state.episode);
  return !!((interventie || R.pilot) && R.cards.length === 2 && b.left >= 0);
}

export function needTextBesluit(state: GameUiState): string {
  const R = state.rounds[state.round];
  const interventie = usesInterventieMotor(state.episode);
  if (!interventie && !R.pilot) {
    return 'Nog nodig: kies of jullie het advies van PILOT volgen of zelf wegen.';
  }
  if (R.cards.length !== 2) {
    return `Nog nodig: kies precies twee interventies (nu ${R.cards.length} van 2).`;
  }
  const budgetMsg = budgetBlockMessage(state);
  if (budgetMsg) return budgetMsg;
  return okBesluitKeuze(state) ? '' : 'Nog nodig: rond jullie keuze af.';
}

/** @deprecated gebruik okBesluitKeuze of okArgument voor fase */
export function okBesluit(state: GameUiState): boolean {
  const R = state.rounds[state.round];
  return okBesluitKeuze(state) && okArgument(R.argument, R.tegenargument);
}

export function needText(state: GameUiState): string {
  return needTextBesluit(state);
}

export function pilotLockedCards(state: GameUiState): string[] {
  if (usesInterventieMotor(state.episode)) return state.rounds[state.round].cards;
  const R = state.rounds[state.round];
  const pc = roundDefFor(state).pilotCard;
  if (R.pilot === 'pilot' && pc && !R.cards.includes(pc)) {
    return [pc, ...R.cards].slice(0, 2);
  }
  return R.cards;
}
