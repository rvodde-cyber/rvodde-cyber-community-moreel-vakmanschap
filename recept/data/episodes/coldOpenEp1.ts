import type { OnderstroomInsert } from './coldOpenModel';

type Ep1Cold = {
  place: string;
  img: string;
  lines: readonly [string, string][];
  onderstroom?: readonly OnderstroomInsert[];
};

const EP1_R1_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'kantlijn',
    van: 'Lies',
    tekst: 'Tien keer zoveel. En wie staat er morgen om zes uur in de schuur?',
    handschrift: 'potlood',
  },
  {
    type: 'onderstroom',
    afterIndex: 4,
    kanaal: 'kantlijn',
    van: 'Gerrit',
    tekst: 'IK. WEER.',
    handschrift: 'blokletters',
  },
  {
    type: 'onderstroom',
    afterIndex: 6,
    kanaal: 'kantlijn',
    van: 'Lies',
    tekst: 'Hij hoort alleen wat hij wil horen.',
    doorgehaald: true,
    handschrift: 'potlood',
  },
];

const EP1_R2_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'kantlijn',
    van: 'Lies',
    tekst: 'Ze vragen niet voor niets vrij.',
    handschrift: 'potlood',
  },
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'kantlijn',
    van: 'Gerrit',
    tekst: 'ZE ZIJN MOE, LIES. IK OOK.',
    handschrift: 'blokletters',
  },
];

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
      ['GERRIT', 'Van harder lopen worden worstenbroodjes echt niet sneller klaar, Harrie.'],
      ['HARRIE', 'Dat red ik wel.'],
      ['', 'Maandag, half zeven. In de schuur wachten vier problemen tegelijk.'],
    ],
    onderstroom: EP1_R1_ONDERSTROOM,
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
    onderstroom: EP1_R2_ONDERSTROOM,
  },
};
