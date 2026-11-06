import type { EpisodeId } from '../episodes/meta';

type ColdDef = {
  place: string;
  img: string;
  lines: [string, string][];
};

export const SKELETON_COLD: Record<Exclude<EpisodeId, 4>, ColdDef> = {
  1: {
    place: 'SCHUUR, BERKEL-ENSCHOT',
    img: 'I1',
    lines: [
      ['', 'Laat op de avond. De telefoon gaat alweer.'],
      ['HARRIE', 'Als we ja zeggen, moet iedereen morgen weten waarom.'],
      ['LIES', 'En als we nee zeggen, moet iemand dat tegen de inkoper durven.'],
      ['', 'In de schuur ruikt het naar warm deeg en nat gras.'],
    ],
  },
  2: {
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
  3: {
    place: 'DIRECTIETAFEL, TILBURG',
    img: 'I3',
    lines: [
      ['', 'Vrijdagmiddag. Drie vestigingen en één vergadertafel.'],
      ['SANNE', 'Het loopt vast op de vloer, pap. Dat weet iedereen die er staat.'],
      ['MARCO', 'Ik heb de cijfers per vestiging op een rij gezet. Waalwijk zit al drie maanden onder target.'],
      ['HARRIE', 'Ik moet nog kiezen wie het straks overneemt. Daar slaap ik slecht van.'],
      ['', 'Niemand zegt iets. Buiten rijdt een vrachtwagen achteruit.'],
    ],
  },
  5: {
    place: 'SPOORZONE, TILBURG',
    img: 'I5',
    lines: [
      ['', 'De glazen ingang weerspiegelt een verre schuur.'],
      ['', 'Bericht van Optivora: vrijdag een besluit over de herstructurering.'],
      ['ANNE-FLEUR', 'Weet iemand eigenlijk wie het schrift als laatste heeft vastgehad?'],
      ['PIOTR', 'In de schuur, denk ik. Daar lag het altijd.'],
      ['', 'In Berkel-Enschot ligt nog het receptschrift. Niemand weet wie de doorgestreepte zin heeft geschrapt.'],
    ],
  },
};
