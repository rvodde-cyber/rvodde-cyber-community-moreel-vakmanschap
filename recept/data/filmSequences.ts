/** Vereenvoudigde trailer/slot-cues (referentie v6, korter voor web). */

export type FilmCue =
  | { at: number; kind: 'text'; text: string; question?: boolean }
  | { at: number; kind: 'shot'; img: string; zoom?: 'in' | 'pan' }
  | { at: number; kind: 'ui'; ui: 'norm' | 'rank' | 'verz' | 'order' | 'f17' | 'toegang' }
  | { at: number; kind: 'sub'; who?: string; text: string }
  | { at: number; kind: 'blank' }
  | { at: number; kind: 'tick' }
  | { at: number; kind: 'boom'; soft?: boolean }
  | { at: number; kind: 'title' };

export type FilmScript = {
  id: string;
  label: string;
  titleMark: string;
  titleAfter?: string;
  titleEp?: string;
  duration: number;
  cues: FilmCue[];
};

export const TRAILER_RONDE_1: FilmScript = {
  id: 'trailer-r1',
  label: 'Trailer ronde 1',
  titleMark: 'RECEPT',
  titleAfter: 'AFLEVERING 4',
  titleEp: 'Het dashboard liegt niet',
  duration: 18000,
  cues: [
    { at: 200, kind: 'text', text: '2026  /  TILBURG' },
    { at: 3200, kind: 'blank' },
    { at: 3800, kind: 'shot', img: 'W4', zoom: 'in' },
    { at: 3800, kind: 'sub', who: 'ANS', text: 'Ik weet niet wat de norm vandaag is.' },
    { at: 7200, kind: 'shot', img: 'T4', zoom: 'pan' },
    { at: 7800, kind: 'ui', ui: 'norm' },
    { at: 8400, kind: 'tick' },
    { at: 9000, kind: 'shot', img: 'X1', zoom: 'in' },
    { at: 9600, kind: 'ui', ui: 'rank' },
    { at: 10200, kind: 'ui', ui: 'verz' },
    { at: 10800, kind: 'blank' },
    { at: 11200, kind: 'text', text: 'Liegt het dashboard?', question: true },
    { at: 11200, kind: 'boom', soft: true },
    { at: 15000, kind: 'text', text: '' },
    { at: 15400, kind: 'title' },
    { at: 15400, kind: 'boom' },
  ],
};

export const TRAILER_RONDE_2: FilmScript = {
  id: 'trailer-r2',
  label: 'Trailer ronde 2',
  titleMark: 'RECEPT',
  titleAfter: 'AFLEVERING 4, RONDE 2',
  titleEp: 'Wie tekent er eigenlijk?',
  duration: 14000,
  cues: [
    { at: 200, kind: 'text', text: '2027  /  HAL 3' },
    { at: 2800, kind: 'shot', img: 'R2', zoom: 'in' },
    { at: 2800, kind: 'sub', who: 'MARCO', text: 'Vrijdag tekenen we. Dan zijn we eindelijk groot.' },
    { at: 6200, kind: 'ui', ui: 'order' },
    { at: 6800, kind: 'boom' },
    { at: 7400, kind: 'ui', ui: 'f17' },
    { at: 8200, kind: 'shot', img: 'D1', zoom: 'pan' },
    { at: 8200, kind: 'sub', who: 'ANS', text: 'Ik heb deze week twee uur op de vloer gestaan.' },
    { at: 11000, kind: 'text', text: 'Wie tekent er eigenlijk?', question: true },
    { at: 11000, kind: 'boom', soft: true },
    { at: 13200, kind: 'title' },
  ],
};

export function buildSlotRonde1(place: string, line: string): FilmScript {
  return {
    id: 'slot-r1',
    label: 'Einde van dit deel',
    titleMark: 'Zes maanden later',
    titleAfter: 'RECEPT  /  AFLEVERING 4, RONDE 2',
    duration: 15000,
    cues: [
      { at: 200, kind: 'shot', img: 'W4', zoom: 'in' },
      { at: 200, kind: 'sub', who: place, text: line },
      { at: 1400, kind: 'tick' },
      { at: 2600, kind: 'tick' },
      { at: 3800, kind: 'tick' },
      { at: 5000, kind: 'tick' },
      { at: 6800, kind: 'blank' },
      { at: 7200, kind: 'text', text: 'Einde van ronde 1' },
      { at: 7200, kind: 'boom' },
      { at: 9600, kind: 'title' },
      { at: 9600, kind: 'boom' },
    ],
  };
}

export function buildFinale(
  a: [string, string],
  b: [string, string],
  testament?: { base: string; variant: string },
): FilmScript {
  const cues: FilmScript['cues'] = [
    { at: 200, kind: 'shot', img: 'D1', zoom: 'in' },
    { at: 200, kind: 'sub', who: a[0], text: a[1] },
    { at: 4800, kind: 'shot', img: 'PIOTR', zoom: 'in' },
    { at: 4800, kind: 'sub', who: b[0], text: b[1] },
    { at: 9000, kind: 'blank' },
    { at: 9400, kind: 'text', text: '2031' },
    { at: 9400, kind: 'boom' },
    { at: 11800, kind: 'shot', img: 'Y1', zoom: 'in' },
    { at: 11800, kind: 'sub', text: 'Zondagochtend, 06:12. De telefoon gaat al voor de derde keer.' },
    { at: 14800, kind: 'sub', who: 'MARCO', text: 'Pap?' },
    { at: 16200, kind: 'blank' },
    { at: 16600, kind: 'text', text: 'Harrie van Gorp  1955–2031' },
    { at: 16600, kind: 'boom', soft: true },
    { at: 19200, kind: 'shot', img: 'C4', zoom: 'in' },
    { at: 19200, kind: 'sub', who: 'DE NOTARIS', text: 'Er is één zin in het testament doorgestreept.' },
  ];
  if (testament?.base.trim()) {
    cues.push({ at: 20400, kind: 'sub', text: testament.base });
  }
  if (testament?.variant.trim()) {
    cues.push({ at: 21800, kind: 'sub', text: testament.variant });
  }
  cues.push({ at: 23400, kind: 'title' });
  return {
    id: 'finale',
    label: 'Einde van aflevering 4',
    titleMark: 'Wordt vervolgd',
    titleAfter: 'RECEPT  /  AFLEVERING 5: WIE HEEFT HET SCHRIFT?',
    duration: 24600,
    cues,
  };
}

export const TR_UI_LABELS: Record<string, { k: string; huge: string; cyan?: boolean }> = {
  norm: { k: 'TEMPO  /  STATION 14', huge: 'NORM +5%' },
  rank: { k: 'RANGLIJST WEEK 43', huge: '71% ▼' },
  verz: { k: 'VERZUIM ASSEMBLAGEHAL', huge: '8,0%' },
  order: { k: 'ORDER DFN-2231  /  DEFENSIE', huge: '€ 4,2 MLN', cyan: true },
  f17: { k: 'NIEUW  /  VERPLICHT VANAF MAANDAG', huge: 'FORMULIER F-17' },
  toegang: { k: 'HAL 3  /  P. NOWAK', huge: 'GEEN TOEGANG' },
};
