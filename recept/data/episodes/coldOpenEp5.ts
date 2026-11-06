type Ep5Cold = {
  place: string;
  img: string;
  lines: readonly [string, string][];
};

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
      ['', 'Vrijdag, tien voor vijf. Er staat een bericht in de app, alleen voor jou.'],
    ],
  },
};
