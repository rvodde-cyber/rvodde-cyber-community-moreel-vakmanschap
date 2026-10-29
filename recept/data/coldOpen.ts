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
  },
  2: {
    place: 'HAL 3, VOSSENBERG',
    img: 'D1',
    lines: [
      ['', 'Een half jaar later. Hal 3 krijgt een hek en een pasjeslezer.'],
      ['MARCO', 'Vrijdag tekenen we. Dan zijn we eindelijk groot.'],
      ['ERIK', 'Groot zijn is vooral een kwestie van formulieren, Marco.'],
      ['ANS', 'Ik heb deze week twee uur op de vloer gestaan. De rest was overleg.'],
      ['', 'Dinsdag, 09:14. Piotrs pas werkt niet meer.'],
    ] as [string, string][],
  },
} as const;
