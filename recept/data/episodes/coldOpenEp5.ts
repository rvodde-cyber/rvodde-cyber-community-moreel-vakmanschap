import type { OnderstroomInsert } from './coldOpenModel';

type Ep5Cold = {
  place: string;
  img: string;
  lines: readonly [string, string][];
  onderstroom?: readonly OnderstroomInsert[];
};

const EP5_R1_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'lens',
    van: 'Anne-Fleur',
    naar: 'Piotr',
    tekst: 'Weet jij wat erin staat?',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'lens',
    van: 'Piotr',
    naar: 'Anne-Fleur',
    tekst: 'Dat vertel ik je liever buiten de vergadering.',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'lens',
    van: 'Anne-Fleur',
    naar: 'Piotr',
    tekst: 'Vanavond bij de schuur?',
  },
];

const EP5_R2_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'lens',
    van: 'Anne-Fleur',
    naar: 'Piotr',
    tekst: 'Weet Marco wat daar ligt?',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'lens',
    van: 'Piotr',
    naar: 'Anne-Fleur',
    tekst: 'Hij weet dat er een schuur is.',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'lens',
    van: 'Anne-Fleur',
    naar: 'Piotr',
    tekst: 'Dat is niet hetzelfde.',
  },
  {
    type: 'onderstroom',
    afterIndex: 4,
    kanaal: 'lens',
    van: 'Anne-Fleur',
    naar: 'Piotr',
    tekst: 'Ik moet dit…',
    typIndicator: true,
  },
];

export const COLD_OPEN_EP5: { 1: Ep5Cold; 2: Ep5Cold } = {
  1: {
    place: 'SPOORZONE, TILBURG',
    img: 'I5',
    lines: [
      ['', 'De glazen ingang weerspiegelt een verre schuur.'],
      ['', 'Bericht van Optivora: vrijdag een besluit over de herstructurering.'],
      ['ANNE-FLEUR', 'Weet iemand eigenlijk wie het schrift als laatste heeft vastgehad?'],
      ['PIOTR', 'In de schuur, denk ik. Daar lag het altijd.'],
      [
        '',
        'In Berkel-Enschot ligt nog het receptschrift. Niemand weet wie de doorgestreepte zin heeft geschrapt.',
      ],
    ],
    onderstroom: EP5_R1_ONDERSTROOM,
  },
  2: {
    place: 'HOOFDKANTOOR, VOSSENBERG',
    img: 'I5',
    lines: [
      ['', 'Donderdag, negen uur. Het voorstel van Optivora ligt op tafel.'],
      ['MARCO', 'Optivora neemt de capaciteit en de merknaam over. De schuur valt onder overige activa.'],
      ['ANNE-FLEUR', 'Overige activa? Daar ligt toch het schrift?'],
      ['PIOTR', 'Daar ligt het, ja. Ik heb het er zelf zien liggen.'],
      ['SANNE', 'Ik teken pas als ik weet wat er in dat schrift staat.'],
      ['', 'Vrijdag, tien voor vijf. Er staat een bericht op je lens, alleen voor jou.'],
    ],
    onderstroom: EP5_R2_ONDERSTROOM,
  },
};
