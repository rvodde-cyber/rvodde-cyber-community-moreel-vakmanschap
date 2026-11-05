const SNELHEID_IDS = ['a1-1-4', 'a1-2-2', 'a1-2-3'] as const;

const LINE_SNEL =
  'Een paar maanden later loopt het keigoed. Er staan meer namen op de lijst dan er mensen aan tafel zitten.';
const LINE_ANDERS =
  'Een paar maanden later zijn de jongens er nog allemaal. Ze kennen elkaar goed, maar dat staat nergens in het kasboek.';

/** Openingszin slotscène A1 — minstens 2 van a1-1-4, a1-2-2, a1-2-3 in gekozen set. */
export function slotLineA1(gekozen: string[]): string {
  const n = SNELHEID_IDS.filter((id) => gekozen.includes(id)).length;
  return n >= 2 ? LINE_SNEL : LINE_ANDERS;
}
