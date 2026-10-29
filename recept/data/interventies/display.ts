import type { Interventie } from './types';

/** Velden die in studentmodus getoond mogen worden (geen verborgen meters). */
export function interventieZichtbaarVoorStudent(i: Interventie): Omit<Interventie, 'verborgen'> & { verborgen?: never } {
  const { verborgen: _v, ...rest } = i;
  return rest;
}

export function studentZietVerborgenMeterInInterventie(i: Interventie, docent: boolean): boolean {
  if (docent) return true;
  const z = interventieZichtbaarVoorStudent(i);
  return 'verborgen' in z && z.verborgen != null;
}
