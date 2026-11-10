import { describe, expect, it } from 'vitest';
import { freshGame, bcalc, engineContext } from '../../src/game/budgetUi';
import { gameReducer } from '../../src/game/gameReducer';
import { okBesluitKeuze } from '../../src/game/besluitRules';
import {
  budgetBlockMessage,
  canAutoFixBudget,
  computeAutoFixBud,
} from '../../src/game/budgetFix';

describe('budgetFix ep4 ronde 1', () => {
  it('meldt tekort in gewone taal', () => {
    let state = freshGame();
    state = { ...state, playerName: 'Demo', phase: 'besluit' };
    state = gameReducer(state, { type: 'SET_PILOT', mode: 'pilot' });
    state = gameReducer(state, { type: 'TOGGLE_CARD', id: 'B' });
    state = gameReducer(state, { type: 'TOGGLE_CARD', id: 'D' });
    const msg = budgetBlockMessage(state);
    expect(msg).toMatch(/pas de begroting aan/);
    expect(msg).toMatch(/boven het budget/);
  });

  it('autofix maakt begroting geldig na PILOT B+D', () => {
    let state = freshGame();
    state = { ...state, playerName: 'Demo', phase: 'besluit' };
    state = gameReducer(state, { type: 'SET_PILOT', mode: 'pilot' });
    state = gameReducer(state, { type: 'TOGGLE_CARD', id: 'B' });
    state = gameReducer(state, { type: 'TOGGLE_CARD', id: 'D' });
    expect(canAutoFixBudget(state)).toBe(true);
    state = gameReducer(state, { type: 'AUTO_FIX_BUDGET' });
    const b = bcalc(state, state.rounds[1], engineContext(state));
    expect(b.left).toBeGreaterThanOrEqual(0);
    expect(computeAutoFixBud(state)).not.toBeNull();
  });

  it('na autofix kan interventiekeuze doorgaan naar argument', () => {
    let state = freshGame();
    state = { ...state, playerName: 'Demo', phase: 'besluit' };
    state = gameReducer(state, { type: 'SET_PILOT', mode: 'pilot' });
    state = gameReducer(state, { type: 'TOGGLE_CARD', id: 'B' });
    state = gameReducer(state, { type: 'TOGGLE_CARD', id: 'D' });
    state = gameReducer(state, { type: 'AUTO_FIX_BUDGET' });
    expect(okBesluitKeuze(state)).toBe(true);
    state = gameReducer(state, { type: 'PROCEED_TO_ARGUMENT' });
    expect(state.phase).toBe('argument');
  });
});
