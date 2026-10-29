import { MT_ROLLEN } from '@data/rollen';
import { budgetBlockMessage } from './budgetFix';
import { bcalc, engineContext } from './budgetUi';
import { roundDefFor } from './roundSource';
import type { GameUiState } from './uiTypes';

export function okBesluit(state: GameUiState): boolean {
  const R = state.rounds[state.round];
  const ctx = engineContext(state);
  const b = bcalc(state, R, ctx);
  return !!(
    R.pilot &&
    R.cards.length === 2 &&
    R.spoken.length === MT_ROLLEN.length &&
    R.mot.replace(/\s/g, '').length >= 8 &&
    b.left >= 0
  );
}

export function needText(state: GameUiState): string {
  const R = state.rounds[state.round];
  if (!R.pilot) return 'Nog nodig: kies of jullie het advies van PILOT volgen of zelf wegen.';
  if (R.cards.length !== 2) {
    return `Nog nodig: kies precies twee interventies (nu ${R.cards.length} van 2).`;
  }
  const budgetMsg = budgetBlockMessage(state);
  if (budgetMsg) return budgetMsg;
  if (R.spoken.length !== MT_ROLLEN.length) {
    return `Nog nodig: iedere rol bekijkt in stilte zijn belang en geeft daarna een standpunt (nu ${R.spoken.length} van ${MT_ROLLEN.length}).`;
  }
  return okBesluit(state) ? '' : 'Nog nodig: schrijf in één zin waarom het MT zo besluit.';
}

export function pilotLockedCards(state: GameUiState): string[] {
  const R = state.rounds[state.round];
  const pc = roundDefFor(state).pilotCard;
  if (R.pilot === 'pilot' && !R.cards.includes(pc)) {
    return [pc, ...R.cards].slice(0, 2);
  }
  return R.cards;
}
