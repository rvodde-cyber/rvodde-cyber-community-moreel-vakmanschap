import { ROUNDS } from '../data/rounds';
import { RESOURCE_DRIVER_KEYS, type Drivers } from '../data/startDrivers';
import { clamp, has, marcoBud, tempFactor } from './helpers';
import { hrKost } from './hrKost';
import { startOf } from './startOf';
import type { BudgetMap, ComputeResult, GameContext } from './types';

/**
 * Spelmotor — port van referentie/demo-aflevering4-v6.html (compute)
 */
export function compute(
  roundNum: 1 | 2,
  ids: string[],
  q: number,
  ctx: GameContext,
  bud?: BudgetMap,
): ComputeResult {
  const R = ROUNDS[roundNum];
  const s0 = startOf(roundNum, ctx);
  const STA = s0.dr;
  const budget = bud ?? marcoBud(roundNum);

  const sel = R.cards.filter((k) => has(ids, k.id));
  const contra = R.contra.some((pair) => has(ids, pair[0]) && has(ids, pair[1]));

  const sum: Record<string, number> = {};
  const eff: Record<string, Record<string, number>> = {};

  for (const k of sel) {
    const f = k.fit ? 1.3 : 1.0;
    const cardEff: Record<string, number> = {};
    eff[k.id] = cardEff;
    for (const key of Object.keys(k.e) as (keyof typeof k.e)[]) {
      const base = k.e[key];
      if (base === undefined) continue;
      let v = base * f * q;
      if (contra && v > 0 && has(RESOURCE_DRIVER_KEYS, key)) {
        v *= 0.75;
      }
      cardEff[key] = v;
      sum[key] = (sum[key] ?? 0) + v;
    }
  }

  const u: BudgetMap = {};
  for (const p of R.posten) {
    u[p.id] = Math.sqrt((budget[p.id] ?? 0) / 100000) - Math.sqrt(p.marco / 100000);
  }

  const beff: Record<string, Record<string, number>> = {};
  for (const pid of Object.keys(R.BE)) {
    beff[pid] = {};
    const beEntry = R.BE[pid];
    if (!beEntry) continue;
    for (const key of Object.keys(beEntry) as (keyof typeof beEntry)[]) {
      const base = beEntry[key];
      if (base === undefined) continue;
      const v = base * (u[pid] ?? 0);
      beff[pid][key] = v;
      sum[key] = (sum[key] ?? 0) + v;
    }
  }

  const dr = {} as Drivers;
  for (const key of Object.keys(STA) as (keyof Drivers)[]) {
    dr[key] = clamp(STA[key] + clamp(sum[key] ?? 0, -25, 25), 0, 100);
  }

  const E =
    0.3 * dr.tempo +
    0.2 * dr.controle +
    0.15 * dr.rolonduid +
    0.15 * dr.bureaucratie +
    0.2 * dr.moreel;
  const Rr =
    0.2 * dr.regelruimte +
    0.2 * dr.steunlg +
    0.1 * dr.collegas +
    0.15 * dr.betekenis +
    0.1 * dr.ontwikkeling +
    0.15 * dr.erkenning +
    0.1 * dr.middelen;
  const U = (dr.techniek + dr.verantw) / 2;
  const W = 50 + 0.5 * (Rr - E);
  const basis = ((100 - dr.rolonduid) + dr.middelen) / 2;
  const g = Math.min(1, basis / 50);
  const bij = (2 * dr.steunlg + dr.erkenning) / 3;
  const erbij = (dr.regelruimte + dr.betekenis + dr.collegas) / 3;
  const c = Rr >= 50 ? 0.1 * (U - 50) : -0.1 * (U - 50);
  const B = 38 + 0.5 * (0.3 * basis + g * (0.3 * bij + 0.25 * erbij + 0.15 * dr.ontwikkeling) + c - 0.15 * (E - 50) - 38);

  let vt = 0;
  let er = 50;
  let rep = s0.rep0;
  let cap = 0;
  for (const k of sel) {
    vt += k.vt;
    er += k.er;
    rep += k.rep;
    cap += k.cap;
  }

  er += 1 * (u.mensen ?? 0) - 2 * (u[R.tech] ?? 0) - 3 * (u.directie ?? 0);
  vt += -2 * (u.directie ?? 0);
  rep += 1 * (u.directie ?? 0);
  cap += 1.5 * (u.robot ?? 0) * (dr.vaardigheden / 60) + 1 * (u[R.tech] ?? 0);

  const V = clamp(s0.V0 + Math.min(5, vt) + (contra ? -5 : 0), 0, 100);
  const P0 = (s0.Pb * tempFactor(dr.tempo)) / tempFactor(STA.tempo);
  const eurRes = R.eurBase + 45000 * (P0 - s0.Pb);
  if (B < 30) {
    rep -= 3;
  }
  rep = clamp(rep, 0, 100);

  const tn = Math.min(100, dr.tempo + (has(ids, R.brake) ? 0 : 5));
  let verz = 3 + 0.25 * Math.max(0, 70 - W) + (W < 30 ? 5 : 0);
  const K = 1 - verz / 100 + cap / 100;
  const geo = Math.pow(
    (dr.vaardigheden / 100) * (((B + er) / 2) / 100) * (((dr.regelruimte + dr.inspraak) / 2) / 100),
    1 / 3,
  );
  const dom: string[] = [];
  for (const k of sel) {
    if (!has(dom, k.amo)) {
      dom.push(k.amo);
    }
  }
  const syn = sel.length === 2 && !contra && dom.length === 2;
  const P1 = 1.5364 * 100 * geo * K * tempFactor(tn) + (syn ? 2 : 0);
  const anb = Math.max(3, 45 - 0.5 * B);
  const betr = Math.max(5, B - 25);
  const verl = 2 + 0.2 * Math.max(0, 60 - B) + 0.1 * Math.max(0, 60 - V);
  const hr = hrKost(verz, verl, 100 - anb - betr, anb);
  const hb = s0.HRb;
  const eurNext =
    R.eurBase +
    45000 * (P1 - s0.Pb) -
    (hr.verzuim + hr.werving + hr.inwerken - (hb.verzuim + hb.werving + hb.inwerken));

  return {
    n: roundNum,
    verl,
    hr,
    eurNext,
    dr,
    eff,
    E,
    R: Rr,
    W,
    B,
    basis,
    g,
    P0,
    P1,
    verz,
    winst: 50 + (eurRes - R.eurBase) / 40000,
    eurRes,
    u,
    beff,
    er,
    bud: budget,
    rep,
    V,
    contra,
    syn,
    dom,
    anb,
    betr,
    sel,
    s0,
  };
}
