import { RESOURCE_DRIVER_KEYS, START_DRIVERS, type Drivers } from '../data/startDrivers';
import { clamp, has, roundInt } from './helpers';
import { HR0 } from './hrKost';
import type { GameContext, RoundStartSnapshot } from './types';

function formatEur(x: number): string {
  const n = Math.round(Math.abs(x));
  const t = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (x < 0 ? '−' : '') + '€ ' + t;
}

function copyDrivers(source: Drivers): Drivers {
  return { ...source };
}

/** Startpositie van een ronde — padeffect na ronde 1 in referentie */
export function startOf(roundNum: number, ctx: GameContext): RoundStartSnapshot {
  if (roundNum === 1 || !ctx.results[1]) {
    return {
      dr: copyDrivers(START_DRIVERS),
      V0: 50,
      rep0: 50,
      Pb: 68,
      HRb: HR0,
      verz0: 8,
      notes: [],
    };
  }

  const p = ctx.results[1];
  const st = copyDrivers(p.dr);
  const notes: string[] = [];
  const cards1 = ctx.rounds[1]?.cards ?? [];
  const res1 = ctx.rounds[1]?.bud.reserve ?? 0;

  const shock: Partial<Drivers> = {
    tempo: 8,
    bureaucratie: 15,
    moreel: 20,
    controle: 4,
    rolonduid: 4,
  };
  if (has(cards1, 'D')) {
    shock.tempo = 4;
    notes.push('De ploeg beslist sinds ronde 1 mee over de norm: de nieuwe drukte komt minder hard aan.');
  }
  if (has(cards1, 'B')) {
    shock.controle = (shock.controle ?? 0) + 4;
    notes.push('De aanwezigheidsbonus uit ronde 1 werkt door: het gevoel van controle is gebleven.');
  }
  if (has(cards1, 'E')) {
    notes.push('Ans heeft er sinds ronde 1 een tweede ploegleider bij.');
  }

  const buf = Math.min(0.4, (res1 / 300000) * 0.4);
  if (res1 >= 150000) {
    notes.push(`De reserve van ${formatEur(res1)} vangt een deel van de schok op en komt bij het budget.`);
  } else if (res1 >= 60000) {
    notes.push(`De kleine reserve van ${formatEur(res1)} vangt maar een klein deel van de schok op.`);
  } else {
    notes.push('Er is vrijwel geen reserve over: de schok van de order komt vol binnen.');
  }

  const dividend = ctx.rounds[1]?.bud.dividend;
  if (dividend !== undefined && dividend < 300000) {
    notes.push('Het dividend was lager dan beloofd. De familie kijkt dit keer extra mee.');
  }

  for (const k of Object.keys(shock) as (keyof Drivers)[]) {
    const delta = shock[k];
    if (delta !== undefined) {
      st[k] = clamp(st[k] + delta * (1 - buf), 0, 100);
    }
  }

  notes.unshift(
    `Productiviteit ${roundInt(p.P1)}, verzuim ${String(roundInt(p.verz * 10) / 10).replace('.', ',')}%: zo eindigde ronde 1.`,
  );

  return {
    dr: st,
    V0: p.V,
    rep0: p.rep,
    Pb: p.P1,
    HRb: p.hr,
    verz0: p.verz,
    notes,
  };
}

export { RESOURCE_DRIVER_KEYS };
