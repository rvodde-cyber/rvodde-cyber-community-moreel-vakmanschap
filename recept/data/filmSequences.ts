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

/** Slotscène aflevering 1 (1984), ±27 s. Beelden C1, T1, A1-SCHRIFT volgen beeldbank/placeholder. */
export function buildSlotEp1(openingLine: string): FilmScript {
  return {
    id: 'slot-ep1',
    label: 'Einde van dit deel',
    titleMark: 'RECEPT',
    titleAfter: 'AFLEVERING 1',
    titleEp: 'Alles met de hand',
    duration: 27000,
    cues: [
      { at: 200, kind: 'sub', text: openingLine },
      { at: 3200, kind: 'shot', img: 'T1', zoom: 'in' },
      { at: 3200, kind: 'sub', text: 'Berkel-Enschot, 1984.' },
      { at: 5200, kind: 'shot', img: 'C1', zoom: 'pan' },
      { at: 5800, kind: 'sub', who: 'GERRIT', text: 'Tien keer zoveel, Harrie. Dat moet je opschrijven. Ik ben er niet altijd.' },
      { at: 8800, kind: 'sub', who: 'LIES', text: 'En als jullie er niet zijn? Wie weet dan nog waarom we het zo doen?' },
      { at: 11800, kind: 'sub', who: 'HARRIE', text: 'Dat weet ik toch? Ik weet alles.' },
      { at: 14800, kind: 'shot', img: 'A1-SCHRIFT', zoom: 'in' },
      { at: 17800, kind: 'shot', img: 'C1', zoom: 'in' },
      { at: 20800, kind: 'blank' },
      { at: 21200, kind: 'text', text: 'Wie weet er straks nog hoe het gaat?' },
      { at: 21200, kind: 'boom', soft: true },
      { at: 25000, kind: 'title' },
    ],
  };
}

/** Slotscène aflevering 2 (1996), ±27 s. Beelden I2 volgen beeldbank/placeholder. */
export function buildSlotEp2(openingLine: string): FilmScript {
  return {
    id: 'slot-ep2',
    label: 'Einde van dit deel',
    titleMark: 'RECEPT',
    titleAfter: 'AFLEVERING 2',
    titleEp: 'Sneller, Gerrit',
    duration: 27000,
    cues: [
      { at: 200, kind: 'sub', text: openingLine },
      { at: 3200, kind: 'shot', img: 'I2', zoom: 'in' },
      { at: 3200, kind: 'sub', text: 'Loven, Tilburg, 1996.' },
      { at: 5200, kind: 'sub', who: 'HARRIE', text: 'Jij bent... even denken. Marco? Nee. Jij hoort bij de verpakking, toch?' },
      { at: 8200, kind: 'sub', who: 'GERRIT', text: 'Harrie, ga even zitten. Je ziet er niet uit.' },
      { at: 11200, kind: 'sub', who: 'HARRIE', text: 'Dat gaat zo wel over, joh. Er staat nog een vrachtwagen te wachten.' },
      { at: 14200, kind: 'shot', img: 'I2', zoom: 'pan' },
      { at: 17200, kind: 'sub', who: 'GERRIT', text: 'Harrie? Harrie! Bel iemand. Nu!' },
      { at: 20200, kind: 'text', text: 'Gerrit belt de ambulance.' },
      { at: 20200, kind: 'boom', soft: true },
      { at: 23800, kind: 'text', text: 'Wie neemt het straks over?' },
      { at: 23800, kind: 'boom', soft: true },
      { at: 26200, kind: 'title' },
    ],
  };
}

/** Slotscène aflevering 3 (2009), ±27 s. Beelden I3; brug naar A4 aan het einde. */
export function buildSlotEp3(openingLine: string): FilmScript {
  return {
    id: 'slot-ep3',
    label: 'Einde van dit deel',
    titleMark: 'RECEPT',
    titleAfter: 'AFLEVERING 3',
    titleEp: 'Een Van Gorp aan het roer',
    duration: 27000,
    cues: [
      { at: 200, kind: 'sub', text: openingLine },
      { at: 2800, kind: 'shot', img: 'I3', zoom: 'in' },
      { at: 2800, kind: 'sub', text: 'Tilburg, 2009.' },
      { at: 5200, kind: 'sub', who: 'HARRIE', text: 'Ik heb het lang laten liggen, hè. Maar ik heb besloten. Marco neemt het over.' },
      { at: 8000, kind: 'sub', who: 'MARCO', text: 'Dank je, pap. Ik zorg dat het goed komt.' },
      { at: 10800, kind: 'sub', who: 'SANNE', text: 'En de vloer dan? Heb je daar ook over nagedacht?' },
      { at: 13600, kind: 'sub', who: 'HARRIE', text: 'Daar praten we later over, Sanne.' },
      { at: 16400, kind: 'sub', who: 'SANNE', text: 'Later.' },
      { at: 16400, kind: 'sub', text: '(zet haar glas neer) Ik ga even buiten staan.' },
      { at: 19200, kind: 'shot', img: 'I3', zoom: 'pan' },
      { at: 19200, kind: 'sub', text: 'De lege stoel. Een glas trilt nog na.' },
      { at: 22000, kind: 'text', text: 'Sanne verlaat het restaurant.' },
      { at: 22000, kind: 'boom', soft: true },
      {
        at: 24800,
        kind: 'sub',
        text: 'Rond 2020 zoekt Defensie productiecapaciteit voor drones. Van Gorp Machinebouw krijgt de order.',
      },
      { at: 24800, kind: 'boom', soft: true },
      { at: 26400, kind: 'title' },
    ],
  };
}

/** Slotscène aflevering 5 (2036), ±27 s. Beeld I5/placeholder schuur; geen zus in beeld. */
export function buildSlotEp5(openingLine: string): FilmScript {
  return {
    id: 'slot-ep5',
    label: 'Einde van dit deel',
    titleMark: 'RECEPT',
    titleAfter: 'AFLEVERING 5',
    titleEp: 'Wie heeft het schrift?',
    duration: 27000,
    cues: [
      { at: 200, kind: 'sub', text: openingLine },
      { at: 2800, kind: 'shot', img: 'I5', zoom: 'in' },
      { at: 2800, kind: 'sub', text: 'Berkel-Enschot, 2036.' },
      { at: 5600, kind: 'sub', text: 'Anne-Fleur tilt het deksel van een houten kist. Onderin ligt een schrift met een bruine kaft.' },
      { at: 8400, kind: 'sub', who: 'ANNE-FLEUR', text: 'Dit is het. Het schrift.' },
      { at: 11200, kind: 'sub', who: 'PIOTR', text: 'Heb je het gevonden?' },
      { at: 14000, kind: 'sub', who: 'ANNE-FLEUR', text: 'Ja. Het lag hier al die tijd.' },
      { at: 16800, kind: 'sub', text: 'Close-up: Harries handschrift. Eén zin doorgestreept, net niet leesbaar.' },
      { at: 19600, kind: 'sub', who: 'ANNE-FLEUR', text: 'Iemand heeft hier iets doorgehaald. Ik wil weten wie dat heeft gedaan, en waarom.' },
      { at: 22800, kind: 'text', text: 'Wie heeft het schrift?' },
      { at: 22800, kind: 'boom', soft: true },
      { at: 26400, kind: 'title' },
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
