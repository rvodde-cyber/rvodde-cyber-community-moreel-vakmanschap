import type { RoundDefinition } from '@data/schemas/rounds.schema';
import type { BudgetMap, ComputeResult } from '@engine/types';

/** Placeholder-uitkomst voor conceptskeletten (geen spelmotor). */
export function stubComputeResult(
  roundDef: RoundDefinition,
  cardIds: string[],
  bud: BudgetMap,
): ComputeResult {
  const sel = roundDef.cards.filter((c) => cardIds.includes(c.id));
  const fits = sel.filter((c) => c.fit).length;
  const hr = { verzuim: 0, werving: 0, inwerken: 0, motivatie: 0, vertrek: 0, totaal: 0 };
  const s0 = {
    dr: {} as ComputeResult['s0']['dr'],
    V0: 50,
    rep0: 50,
    Pb: 50,
    HRb: hr,
    verz0: 5,
    notes: ['Conceptskelet — geen volledige motorberekening'],
  };
  return {
    n: 1,
    verl: 0,
    hr,
    eurNext: roundDef.eurBase,
    dr: s0.dr,
    eff: {},
    E: 50,
    R: 50,
    W: 52,
    B: 48,
    basis: 50,
    g: fits ? 1 : 0.85,
    P0: 55,
    P1: 56,
    verz: 5,
    winst: 50,
    eurRes: roundDef.eurBase,
    u: bud,
    beff: {},
    er: 50,
    bud,
    rep: 50,
    V: 50,
    contra: false,
    syn: false,
    dom: [],
    anb: 50,
    betr: 45,
    sel,
    s0,
  };
}
