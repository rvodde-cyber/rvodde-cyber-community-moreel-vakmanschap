import type { OnderstroomInsert } from './coldOpenModel';

type Ep2Cold = {
  place: string;
  img: string;
  lines: readonly [string, string][];
  onderstroom?: readonly OnderstroomInsert[];
};

const EP2_R1_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'plakbriefje',
    van: 'Lies',
    naar: 'Gerrit',
    tekst: 'Hij weet zijn naam niet.',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'plakbriefje',
    van: 'Gerrit',
    naar: 'Lies',
    tekst: 'Dennis. Sinds maart. Niet hier zeggen.',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'plakbriefje',
    van: 'Lies',
    naar: 'Gerrit',
    tekst: 'Waarom niet?',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'plakbriefje',
    van: 'Gerrit',
    naar: 'Lies',
    tekst: 'Dan staat hij voor schut.',
    typIndicator: true,
  },
];

const EP2_R2_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'plakbriefje',
    van: 'Lies',
    naar: 'Gerrit',
    tekst: 'Veertig handtekeningen. Hij schrikt.',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'plakbriefje',
    van: 'Lies',
    naar: 'Gerrit',
    tekst: 'Wat doen we als hij nee zegt?',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'plakbriefje',
    van: 'Gerrit',
    naar: 'Lies',
    tekst: 'Dan teken ik ook.',
  },
];

export const COLD_OPEN_EP2: { 1: Ep2Cold; 2: Ep2Cold } = {
  1: {
    place: 'LOVEN, TILBURG',
    img: 'I2',
    lines: [
      ['', 'Dinsdag, tien over zeven. De band loopt al een uur.'],
      ['GERRIT', 'Sneller, jongens! De vrachtwagen staat al te wachten.'],
      ['LIES', 'Wie is eigenlijk die jongen bij de verpakking?'],
      ['HARRIE', 'Die ken ik wel. Even denken... Toch?'],
      ['', 'Niemand maakt vandaag nog een heel worstenbroodje.'],
    ],
    onderstroom: EP2_R1_ONDERSTROOM,
  },
  2: {
    place: 'KANTINE, LOVEN',
    img: 'I2',
    lines: [
      ['', 'Maandagochtend. In de kantine hangt een lijst met handtekeningen.'],
      ['JOOST', 'We willen graag meepraten over het rooster. Er hebben al veertig mensen getekend.'],
      ['HARRIE', 'Meepraten? Ik ken jullie toch allemaal? Je kunt gewoon bij mij langskomen.'],
      ['LIES', 'Joost wil een plek aan tafel, Harrie. Een praatje bij de koffie is iets anders.'],
      ['GERRIT', 'Veertig handtekeningen is veel, Harrie.'],
      ['', 'Donderdag, kwart over vier. Tussen de loonzakjes zit een briefje zonder naam.'],
    ],
    onderstroom: EP2_R2_ONDERSTROOM,
  },
};
