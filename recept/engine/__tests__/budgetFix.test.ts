import { describe, expect, it } from 'vitest';
import { MT_ROLLEN } from '../../data/rollen';
import { freshGame, bcalc, engineContext } from '../../src/game/budgetUi';
import { gameReducer } from '../../src/game/gameReducer';
import { okBesluit } from '../../src/game/besluitRules';
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

  it('na autofix + MT-velden kan besluit kloppen', () => {
    let state = freshGame();
    state = { ...state, playerName: 'Demo', phase: 'besluit' };
    state = gameReducer(state, { type: 'SET_PILOT', mode: 'pilot' });
    state = gameReducer(state, { type: 'TOGGLE_CARD', id: 'B' });
    state = gameReducer(state, { type: 'TOGGLE_CARD', id: 'D' });
    state = gameReducer(state, { type: 'AUTO_FIX_BUDGET' });
    for (const ro of MT_ROLLEN) {
      state = gameReducer(state, { type: 'MARK_ROLE_SPOKE', id: ro.id });
    }
    state = gameReducer(state, { type: 'SET_FIELD', field: 'mot', value: 'We volgen PILOT en begrenzen TEMPO.' });
    expect(okBesluit(state)).toBe(true);
  });
});
