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
      ['', 'In de schuur ruikt het naar olie en nat gras.'],
    ],
  },
  2: {
    place: 'LOVEN, TILBURG',
    img: 'I2',
    lines: [
      ['', 'De productieteller tikt door.'],
      ['GERRIT', 'Sneller. Nog eens sneller.'],
      ['HARRIE', 'Ik ken jullie nog bij naam. Toch?'],
      ['', 'Niemand maakt vandaag een hele kroket.'],
    ],
  },
  3: {
    place: 'DIRECTIETAFEL, TILBURG',
    img: 'I3',
    lines: [
      ['', 'Drie vestigingen, één vraag die niemand hardop stelt.'],
      ['SANNE', 'Ik weet waar het vastloopt — op de vloer.'],
      ['MARCO', 'Ik weet waar het moet landen — in de cijfers.'],
      ['HARRIE', 'En ik moet kiezen wie straks aan het roer staat.'],
    ],
  },
  5: {
    place: 'SPOORZONE, TILBURG',
    img: 'I5',
    lines: [
      ['', 'De glazen ingang weerspiegelt een verre schuur.'],
      ['MARCO', 'De investeerder wil antwoord vóór vrijdag.'],
      ['', 'In Berkel-Enschot ligt nog het oorspronkelijke receptschrift.'],
      ['', 'Niemand weet wie de doorgestreepte zin heeft geschrapt.'],
    ],
  },
};
