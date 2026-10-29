import type { ComputeResult } from '@engine/types';

type RoundUiSlice = {
  pilot: 'pilot' | 'zelf' | null;
  cards: string[];
  bud: Record<string, number>;
};

type DilemmaChoice = 'niets' | 'groep' | 'prive' | null;

/** Slotscène na ronde 1 — referentie demo cliff1() */
export function slotLineRonde1(res: ComputeResult, r: RoundUiSlice): [place: string, line: string] {
  if (res.contra || (r.pilot === 'pilot' && res.V < 50)) {
    return ['03:00 UUR, NACHTPLOEG', 'De nachtploeg legt het werk neer. Ans staat vooraan.'];
  }
  if ((r.bud.directie ?? 0) < 280000) {
    return ['MARCO, IN ZIJN OUDE AUTO', 'Erik? We moeten praten. Over mijn tante.'];
  }
  if ((r.bud.optivora ?? 0) < 400000) {
    return ['ERIK, AAN DE TELEFOON', 'Sanne? Je broer heeft een probleem. En jij misschien een kans.'];
  }
  if (res.syn && res.W >= 50) {
    return ['STATION 14', 'Ans plakt een briefje op het scherm: wij bepalen het tempo. TEMPO meldt een storing.'];
  }
  return ['STATION 14', 'Er staat een stoel leeg. Niemand weet meer van wie.'];
}

export type FinaleBeat = [place: string, line: string];

/** Twee beats einde aflevering 4 — referentie demo finale() */
export function slotLinesFinale(
  res: ComputeResult,
  r2: RoundUiSlice,
  dilemmaChoice: DilemmaChoice,
): [FinaleBeat, FinaleBeat] {
  const c = r2.cards;
  const has = (id: string) => c.includes(id);
  let a: FinaleBeat;
  if (res.contra) a = ['HAL 3, NACHT', 'De nachtploeg weigert hal 3 in te gaan. Ans staat vooraan.'];
  else if (has('G')) a = ['HAL 3', 'De eerste defensiedrones verlaten de hal. Op de vloer zegt niemand iets.'];
  else if (has('F')) a = ['DE KANTINE', 'De engineers lunchen weer samen aan de lange tafel. Eén stoel blijft leeg.'];
  else if (has('H')) a = ['STATION 14', 'Ans scheurt formulier F-17 doormidden. Niemand houdt haar tegen.'];
  else a = ['HAL 3', 'De pasjeslezer piept. Rood. Groen. Rood.'];

  let b: FinaleBeat;
  if (dilemmaChoice === 'groep') {
    b = ['HARRIE, AAN DE TELEFOON', 'Piotr? Met Harrie. Kom morgen maar gewoon. Via de voordeur.'];
  } else if (dilemmaChoice === 'prive') {
    b = ['PIOTR, OP DE PARKEERPLAATS', 'Hij leest jullie bericht twee keer. Dan zet hij zijn auto terug in het vak.'];
  } else {
    b = ['PIOTR, OP DE PARKEERPLAATS', 'Hij ruimt zijn kastje leeg. Niemand van het MT heeft hem gesproken.'];
  }
  return [a, b];
}
