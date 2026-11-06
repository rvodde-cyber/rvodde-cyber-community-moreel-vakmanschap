const CONTROLE_CIJFERS_IDS = ['a3-1-1', 'a3-1-2', 'a3-1-3', 'a3-2-2'] as const;

const LINE_CONTROLE =
  'Een paar maanden later halen alle vestigingen hun cijfers. Op de vloer weet niemand meer wie er aan tafel zit.';
const LINE_ANDERS =
  'Een paar maanden later gaat het goed op de vloer. In de cijfers staat dat niet altijd.';

/** Slot A3 — minstens 2 van de vier controle/cijfers-interventies in gekozen set (rondes 1+2). */
export function slotLineA3(gekozen: string[]): string {
  const n = CONTROLE_CIJFERS_IDS.filter((id) => gekozen.includes(id)).length;
  return n >= 2 ? LINE_CONTROLE : LINE_ANDERS;
}
