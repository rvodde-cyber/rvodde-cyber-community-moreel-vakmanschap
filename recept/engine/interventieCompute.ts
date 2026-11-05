import { INTERVENTIE_BY_ID } from '@data/interventies/all';
import type { Interventie, MeterEffect, VerborgenEffect } from '@data/interventies/types';
import {
  LATER_FACTOR,
  VERBORGEN_DELTA,
  ZICHTBAAR_DELTA,
  deltaVerzuimVerloop,
  kostenInPunten,
  somKaartKosten,
} from '@data/interventies/vertaaltabel';
import { startwaardenVoor, type InterventieStartMeters } from '@data/interventies/startwaarden';
import type { EpisodeId } from '@data/episodes/meta';
import type { RoundDefinition } from '@data/schemas/rounds.schema';
import type { ComputeResult } from './types';

export type InterventieMeterState = Pick<
  InterventieStartMeters,
  'productiviteit' | 'betrokkenheid' | 'verzuim' | 'verloop' | 'eerlijkheid' | 'menselijkeMaat'
>;

export type InterventieComputeInput = {
  episode: Exclude<EpisodeId, 4>;
  round: 1 | 2;
  cardIds: string[];
  roundDef: RoundDefinition;
  /** Eindstand meters na vorige ronde (ronde 2); bij ronde 1 = start aflevering */
  meterStateIn: InterventieMeterState;
  /** effectLater van gekozen kaarten vorige ronde (ronde 2) */
  laterFromPrevRound: Partial<MeterEffect>[];
};

export type InterventieComputeOutput = {
  result: ComputeResult;
  meterStateOut: InterventieMeterState;
  budgetRest: number;
  hiddenDelta: { menselijkeMaat: number; eerlijkheid: number };
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function interventiesForIds(ids: string[]): Interventie[] {
  return ids.map((id) => {
    const i = INTERVENTIE_BY_ID[id];
    if (!i) throw new Error(`Onbekende interventie: ${id}`);
    return i;
  });
}

export function validateInterventieKeuze(
  cardIds: string[],
  roundDef: RoundDefinition,
): { ok: true } | { ok: false; reason: string } {
  if (cardIds.length !== 2) {
    return { ok: false, reason: `Precies 2 kaarten verplicht (nu ${cardIds.length}).` };
  }
  for (const id of cardIds) {
    if (!roundDef.cards.some((c) => c.id === id)) {
      return { ok: false, reason: `Kaart ${id} hoort niet bij deze ronde.` };
    }
  }
  const cats = interventiesForIds(cardIds).map((i) => i.kostenCategorie);
  const kosten = somKaartKosten(cats);
  const cap = roundDef.budget;
  if (kosten > cap) {
    return { ok: false, reason: `Budget overschreden: ${kosten} van ${cap} punten.` };
  }
  return { ok: true };
}

function applyVisibleEffect(state: InterventieMeterState, effect: Partial<MeterEffect>, factor = 1) {
  const f = (r: keyof MeterEffect, apply: (delta: number) => void) => {
    const sym = effect[r];
    if (sym === undefined) return;
    if (r === 'verzuim' || r === 'verloop') {
      apply(deltaVerzuimVerloop(sym) * factor);
    } else if (r === 'productiviteit' || r === 'betrokkenheid') {
      apply(ZICHTBAAR_DELTA[sym] * factor);
    }
    // budget-symbolen in effect tabel: geen extra punten boven kaartkosten (besluit 2)
  };
  f('productiviteit', (d) => {
    state.productiviteit = clamp(state.productiviteit + d, 0, 100);
  });
  f('betrokkenheid', (d) => {
    state.betrokkenheid = clamp(state.betrokkenheid + d, 0, 100);
  });
  f('verzuim', (d) => {
    state.verzuim = clamp(state.verzuim + d, 0, 100);
  });
  f('verloop', (d) => {
    state.verloop = clamp(state.verloop + d, 0, 100);
  });
}

function applyVerborgenEffect(state: InterventieMeterState, effect: VerborgenEffect, factor = 1) {
  state.eerlijkheid = clamp(state.eerlijkheid + VERBORGEN_DELTA[effect.eerlijkheid] * factor, 0, 100);
  state.menselijkeMaat = clamp(
    state.menselijkeMaat + VERBORGEN_DELTA[effect.menselijkeMaat] * factor,
    0,
    100,
  );
}

function sumVerborgenDelta(effects: VerborgenEffect[], factor = 1) {
  let eerlijkheid = 0;
  let menselijkeMaat = 0;
  for (const e of effects) {
    eerlijkheid += VERBORGEN_DELTA[e.eerlijkheid] * factor;
    menselijkeMaat += VERBORGEN_DELTA[e.menselijkeMaat] * factor;
  }
  return { eerlijkheid, menselijkeMaat };
}

export function interventieCompute(input: InterventieComputeInput): InterventieComputeOutput {
  const valid = validateInterventieKeuze(input.cardIds, input.roundDef);
  if (!valid.ok) throw new Error(valid.reason);

  const chosen = interventiesForIds(input.cardIds);
  const meterStateOut: InterventieMeterState = { ...input.meterStateIn };

  for (const partial of input.laterFromPrevRound) {
    applyVisibleEffect(meterStateOut, partial, LATER_FACTOR);
  }

  for (const i of chosen) {
    applyVisibleEffect(meterStateOut, i.effect);
    applyVerborgenEffect(meterStateOut, i.verborgen);
  }

  const hiddenDelta = sumVerborgenDelta(chosen.map((i) => i.verborgen));
  const budgetRest = input.roundDef.budget - somKaartKosten(chosen.map((i) => i.kostenCategorie));

  const sel = input.roundDef.cards.filter((c) => input.cardIds.includes(c.id));
  const hr = { verzuim: 0, werving: 0, inwerken: 0, motivatie: 0, vertrek: 0, totaal: 0 };
  const s0 = {
    dr: {} as ComputeResult['s0']['dr'],
    V0: 50,
    rep0: 50,
    Pb: meterStateOut.productiviteit,
    HRb: hr,
    verz0: input.meterStateIn.verzuim,
    notes: ['Interventiemotor'],
  };

  const result: ComputeResult = {
    n: input.round,
    verl: meterStateOut.verloop,
    hr,
    eurNext: input.roundDef.eurBase,
    dr: s0.dr,
    eff: {},
    E: 50,
    R: 50,
    W: 52,
    B: meterStateOut.betrokkenheid,
    basis: 50,
    g: 1,
    P0: meterStateOut.productiviteit,
    P1: meterStateOut.productiviteit,
    verz: meterStateOut.verzuim,
    winst: 50,
    eurRes: input.roundDef.eurBase,
    u: {},
    beff: {},
    er: 50,
    bud: {},
    rep: 50,
    V: 50,
    contra: false,
    syn: false,
    dom: [],
    anb: 50,
    betr: meterStateOut.betrokkenheid,
    sel,
    s0,
  };

  return { result, meterStateOut, budgetRest, hiddenDelta };
}

/** Startmeters voor ronde 1 van een aflevering. */
export function initialInterventieMeters(episode: Exclude<EpisodeId, 4>): InterventieMeterState {
  return startwaardenVoor(episode);
}

/** effectLater van kaarten uit vorige ronde (alleen binnen dezelfde aflevering). */
export function laterEffectenVanKeuze(cardIds: string[]): Partial<MeterEffect>[] {
  return interventiesForIds(cardIds)
    .map((i) => i.effectLater)
    .filter((x): x is Partial<MeterEffect> => x != null && Object.keys(x).length > 0);
}

export function zichtbareMetersSnapshot(
  meterStateOut: InterventieMeterState,
  budgetRest: number,
): Record<'productiviteit' | 'betrokkenheid' | 'verzuim' | 'verloop' | 'budgetrest', number> {
  return {
    productiviteit: meterStateOut.productiviteit,
    betrokkenheid: meterStateOut.betrokkenheid,
    verzuim: meterStateOut.verzuim,
    verloop: meterStateOut.verloop,
    budgetrest: budgetRest,
  };
}

/** Voor balanstest: alle C(4,2) combinaties voor één ronde. */
export function alleTweeKeuzeCombinaties(roundDef: RoundDefinition): string[][] {
  const ids = roundDef.cards.map((c) => c.id);
  const out: string[][] = [];
  for (let a = 0; a < ids.length; a++) {
    for (let b = a + 1; b < ids.length; b++) {
      out.push([ids[a]!, ids[b]!]);
    }
  }
  return out;
}

const HIGHER_IS_BETTER: (keyof ReturnType<typeof zichtbareMetersSnapshot>)[] = [
  'productiviteit',
  'betrokkenheid',
  'budgetrest',
];
const LOWER_IS_BETTER: (keyof ReturnType<typeof zichtbareMetersSnapshot>)[] = ['verzuim', 'verloop'];

function meterAtLeast(
  a: ReturnType<typeof zichtbareMetersSnapshot>,
  b: ReturnType<typeof zichtbareMetersSnapshot>,
): boolean {
  for (const k of HIGHER_IS_BETTER) {
    if (a[k] < b[k]) return false;
  }
  for (const k of LOWER_IS_BETTER) {
    if (a[k] > b[k]) return false;
  }
  return true;
}

function meterStrictlyBetter(
  a: ReturnType<typeof zichtbareMetersSnapshot>,
  b: ReturnType<typeof zichtbareMetersSnapshot>,
): boolean {
  if (!meterAtLeast(a, b)) return false;
  for (const k of HIGHER_IS_BETTER) {
    if (a[k] > b[k]) return true;
  }
  for (const k of LOWER_IS_BETTER) {
    if (a[k] < b[k]) return true;
  }
  return false;
}

export function isDominantCombination(
  snapshots: { combo: string[]; meters: ReturnType<typeof zichtbareMetersSnapshot> }[],
): boolean {
  for (let i = 0; i < snapshots.length; i++) {
    for (let j = 0; j < snapshots.length; j++) {
      if (i === j) continue;
      const a = snapshots[i]!.meters;
      const b = snapshots[j]!.meters;
      if (meterAtLeast(a, b) && meterStrictlyBetter(a, b)) return true;
    }
  }
  return false;
}

export function runBalanceForRound(
  episode: Exclude<EpisodeId, 4>,
  round: 1 | 2,
  roundDef: RoundDefinition,
  meterStateIn: InterventieMeterState,
  laterFromPrev: Partial<MeterEffect>[],
): boolean {
  const combos = alleTweeKeuzeCombinaties(roundDef).filter(
    (combo) => validateInterventieKeuze(combo, roundDef).ok,
  );
  if (combos.length === 0) return true;
  const snapshots = combos.map((combo) => {
    const { meterStateOut, budgetRest } = interventieCompute({
      episode,
      round,
      cardIds: combo,
      roundDef,
      meterStateIn: { ...meterStateIn },
      laterFromPrevRound: laterFromPrev,
    });
    return { combo, meters: zichtbareMetersSnapshot(meterStateOut, budgetRest) };
  });
  return !isDominantCombination(snapshots);
}

/** Elke kaart komt voor in minstens één budget-geldige combinatie van twee keuzes. */
export function elkeKaartBereikbaarInRonde(roundDef: RoundDefinition): boolean {
  const valid = alleTweeKeuzeCombinaties(roundDef).filter((combo) =>
    validateInterventieKeuze(combo, roundDef).ok,
  );
  const used = new Set<string>();
  for (const combo of valid) {
    for (const id of combo) used.add(id);
  }
  return roundDef.cards.every((c) => used.has(c.id));
}

export function geldigeTweeKeuzeCombinaties(roundDef: RoundDefinition): string[][] {
  return alleTweeKeuzeCombinaties(roundDef).filter((combo) =>
    validateInterventieKeuze(combo, roundDef).ok,
  );
}

/** Export voor budgetvalidatie in UI */
export { kostenInPunten };
export { budgetVoorRonde } from '@data/interventies/vertaaltabel';
