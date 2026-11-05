type Ep1Cold = {
  place: string;
  img: string;
  lines: readonly [string, string][];
};

export const COLD_OPEN_EP1: { 1: Ep1Cold; 2: Ep1Cold } = {
  1: {
    place: 'KEUKEN, BERKEL-ENSCHOT',
    img: 'C1',
    lines: [
      ['', 'Zondagavond. Het kasboek ligt open op de keukentafel.'],
      ['LIES', 'Dat kan toch geen bestelling voor ons zijn? Dat moet verkeerd afgeleverd zijn.'],
      ['HARRIE', 'Nee joh, die man belde zelf. Tien keer zoveel, binnen zes weken. Keileuk, hè?'],
      ['LIES', 'Keileuk? Daar komen we toch nooit aan toe?'],
      ['HARRIE', 'Dan lopen we gewoon wat harder.'],
      ['GERRIT', 'Van harder lopen worden kroketten echt niet sneller, Harrie.'],
      ['HARRIE', 'Dat red ik wel.'],
      ['', 'Maandag, half zeven. In de schuur wachten vier problemen tegelijk.'],
    ],
  },
  2: {
    place: 'SCHUUR, BERKEL-ENSCHOT',
    img: 'W1',
    lines: [
      ['', 'Drie weken later. De eerste drukte is voorbij, maar het is stil in de schuur.'],
      ['LIES', 'Twee van de jongens vroegen of ze volgende week vrij konden.'],
      ['HARRIE', 'Vrij? Nu het zo lekker loopt?'],
      ['GERRIT', 'De mensen willen gewoon aandacht, ze willen gezien worden, Harrie.'],
      ['', "Donderdag, kwart voor vijf. Tussen de pagina's van het kasboek zit een briefje."],
    ],
  },
};
