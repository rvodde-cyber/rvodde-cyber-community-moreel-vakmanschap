import { HR_COST_PARAMS } from '../data/startDrivers';
import type { HrKostBreakdown } from './types';

/** HR-kosten per halfjaar — referentie demo-aflevering4-v6.html */
export function hrKost(
  verz: number,
  verl: number,
  niet: number,
  anb: number,
): HrKostBreakdown {
  const fte = HR_COST_PARAMS.prod + HR_COST_PARAMS.eng;
  const verzuim = fte * (verz / 100) * HR_COST_PARAMS.dagen * HR_COST_PARAMS.dagkost;
  const vp = (HR_COST_PARAMS.prod * verl) / 100;
  const ve = (HR_COST_PARAMS.eng * verl * 1.5) / 100;
  const werving = vp * HR_COST_PARAMS.wervP + ve * HR_COST_PARAMS.wervE;
  const inwerken = vp * HR_COST_PARAMS.inwP + ve * HR_COST_PARAMS.inwE;
  const motivatie =
    (fte * (niet / 100) * HR_COST_PARAMS.sal * 0.18 +
      fte * (anb / 100) * HR_COST_PARAMS.sal * 0.34) /
    2;
  return {
    verzuim,
    werving,
    inwerken,
    motivatie,
    vertrek: vp + ve,
    totaal: verzuim + werving + inwerken + motivatie,
  };
}

export const HR0 = hrKost(8, 7, 61, 26);
