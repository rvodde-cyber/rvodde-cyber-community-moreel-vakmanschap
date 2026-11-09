import type { OnderstroomInsert } from './episodes/coldOpenModel';

const A4_R1_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 1,
    kanaal: 'app',
    van: 'Marco',
    naar: 'Sanne',
    tekst: 'Pap begint weer over vroeger.',
  },
  {
    type: 'onderstroom',
    afterIndex: 1,
    kanaal: 'app',
    van: 'Sanne',
    naar: 'Marco',
    tekst: 'Hij kende ze nog.',
  },
];

const A4_R2_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'app',
    van: 'Marco',
    naar: 'Sanne',
    tekst: 'Kun jij Erik even afremmen?',
  },
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'app',
    van: 'Sanne',
    naar: 'Marco',
    tekst: 'Nee. Hij heeft een punt.',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'app',
    van: 'Marco',
    naar: 'Sanne',
    tekst: 'Dat is toch…',
    typIndicator: true,
  },
];

export const COLD_OPEN = {
  1: {
    place: 'VILLA VAN GORP, OISTERWIJK',
    img: 'C4',
    lines: [
      ['', 'Zaterdagavond. Harrie wordt 71.'],
      ['HARRIE', 'Vroeger kende ik iedereen bij naam.'],
      ['MARCO', 'Pap, het dashboard kent iedereen. Bij naam én prestatie.'],
      ['ERIK', 'En het dashboard liegt niet.'],
      ['', 'Maandag, 09:14. Het verzuim is weer gestegen.'],
    ] as [string, string][],
    onderstroom: A4_R1_ONDERSTROOM,
  },
  2: {
    place: 'HAL 3, VOSSENBERG',
    img: 'D1',
    lines: [
      ['', 'Een half jaar later. Hal 3 krijgt een hek en een pasjeslezer.'],
      ['MARCO', 'Vrijdag tekenen we. Dan zijn we eindelijk groot.'],
      ['ERIK', 'Groter worden betekent vooral meer formulieren, Marco.'],
      ['ANS', 'Ik heb deze week maar twee uur op de vloer gestaan. De rest was overleg.'],
      ['', 'Dinsdag, 09:14. Piotrs pas werkt niet meer.'],
    ] as [string, string][],
    onderstroom: A4_R2_ONDERSTROOM,
  },
} as const;
