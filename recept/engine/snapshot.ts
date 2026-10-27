import type { ComputeResult } from './types';
import { roundInt } from './helpers';

/** Compacte snapshot voor golden tests (afronding op hele punten waar van toepassing) */
export function meterSnapshot(res: ComputeResult) {
  return {
    W: roundInt(res.W),
    B: roundInt(res.B),
    P0: roundInt(res.P0),
    P1: roundInt(res.P1),
    V: roundInt(res.V),
    rep: roundInt(res.rep),
    verz: Math.round(res.verz * 10) / 10,
    anb: roundInt(res.anb),
    betr: roundInt(res.betr),
    syn: res.syn,
    contra: res.contra,
  };
}
