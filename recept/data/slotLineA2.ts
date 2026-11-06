const SNELHEID_CONTROLE_IDS = ['a2-1-4', 'a2-2-2', 'a2-2-4'] as const;

const LINE_SNEL =
  'Een paar maanden later draait de band bijna dag en nacht. Harrie is er overal bij, en niemand durft hem te vragen of het wel gaat.';
const LINE_ANDERS =
  'Een paar maanden later regelen de ploegen veel zelf. Harrie staat er nog steeds bij, ook op dagen dat hij thuis hoort te zijn.';

/** Openingszin slotscène A2 — minstens 2 van a2-1-4, a2-2-2, a2-2-4 in gekozen set (rondes 1+2). */
export function slotLineA2(gekozen: string[]): string {
  const n = SNELHEID_CONTROLE_IDS.filter((id) => gekozen.includes(id)).length;
  return n >= 2 ? LINE_SNEL : LINE_ANDERS;
}
