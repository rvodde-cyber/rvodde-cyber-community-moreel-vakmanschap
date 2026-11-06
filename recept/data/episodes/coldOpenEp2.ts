type Ep2Cold = {
  place: string;
  img: string;
  lines: readonly [string, string][];
};

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
  },
};
