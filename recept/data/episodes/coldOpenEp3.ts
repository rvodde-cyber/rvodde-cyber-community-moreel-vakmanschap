import type { OnderstroomInsert } from './coldOpenModel';

type Ep3Cold = {
  place: string;
  img: string;
  lines: readonly [string, string][];
  onderstroom?: readonly OnderstroomInsert[];
};

const EP3_R1_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'sms',
    van: 'Sanne',
    naar: 'Marco',
    tekst: 'In Waalwijk is de ploeg half nieuw.',
  },
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'sms',
    van: 'Marco',
    naar: 'Sanne',
    tekst: 'Dat staat niet in de cijfers.',
  },
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'sms',
    van: 'Sanne',
    naar: 'Marco',
    tekst: 'Dan zet je het erbij.',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'sms',
    van: 'Sanne',
    naar: 'Marco',
    tekst: 'Jij weet toch dat…',
    typIndicator: true,
  },
];

const EP3_R2_ONDERSTROOM: readonly OnderstroomInsert[] = [
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'sms',
    van: 'Sanne',
    naar: 'Marco',
    tekst: 'Dit had je eerst met mij kunnen bespreken.',
  },
  {
    type: 'onderstroom',
    afterIndex: 2,
    kanaal: 'sms',
    van: 'Marco',
    naar: 'Sanne',
    tekst: 'Niet nu. Pap kijkt.',
  },
  {
    type: 'onderstroom',
    afterIndex: 3,
    kanaal: 'sms',
    van: 'Sanne',
    naar: 'Marco',
    tekst: 'Hij kent ze allemaal bij naam.',
  },
];

export const COLD_OPEN_EP3: { 1: Ep3Cold; 2: Ep3Cold } = {
  1: {
    place: 'DIRECTIETAFEL, TILBURG',
    img: 'I3',
    lines: [
      ['', 'Vrijdagmiddag. Drie vestigingen en één vergadertafel.'],
      ['SANNE', 'Het loopt vast op de vloer, pap. Dat weet iedereen die er staat.'],
      ['MARCO', 'Ik heb de cijfers per vestiging op een rij gezet. Waalwijk zit al drie maanden onder target.'],
      ['HARRIE', 'Ik moet nog kiezen wie het straks overneemt. Daar slaap ik slecht van.'],
      ['', 'Niemand zegt iets. Buiten rijdt een vrachtwagen achteruit.'],
    ],
    onderstroom: EP3_R1_ONDERSTROOM,
  },
  2: {
    place: 'VERGADERRUIMTE, TILBURG',
    img: 'I3',
    lines: [
      ['', 'Dinsdagochtend. Op het scherm staat de nieuwe planning van het systeem. Niemand heeft hem gemaakt.'],
      ['SANNE', 'Dit klopt niet, Marco. Dinsdagmiddag staat daar niemand op de lijn.'],
      ['MARCO', 'Het systeem heeft het uitgerekend. Daarom hebben we het aangeschaft.'],
      ['HARRIE', 'Dat ding kent de jongens toch niet?'],
      ['MARCO', 'Het gaat om de bezetting, pap. Dat doet het systeem beter dan wij.'],
      ['', 'Vrijdag, tien voor vijf. Er komt een sms binnen.'],
    ],
    onderstroom: EP3_R2_ONDERSTROOM,
  },
};
