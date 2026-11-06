const VERKOOP_ID = 'a5-2-2';

const LINE_VERKOOP =
  'Een paar maanden later staat het bedrijf in de boeken van Optivora. De schuur staat op een lijst met overige activa.';
const LINE_ANDERS =
  'Een paar maanden later is het bedrijf nog niet verkocht. Niemand durft de schuur open te maken.';

/** Slot A5 — variant 1 als team voor verkoop aan investeerder koos (5.2.2). */
export function slotLineA5(gekozen: string[]): string {
  return gekozen.includes(VERKOOP_ID) ? LINE_VERKOOP : LINE_ANDERS;
}
