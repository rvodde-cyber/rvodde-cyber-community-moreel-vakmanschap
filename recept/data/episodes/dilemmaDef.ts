import type { EpisodeId } from './meta';

export type DilemmaKeuze = 'niets' | 'groep' | 'prive';

export type DilemmaEffect = {
  eerlijkheid: number;
  menselijkeMaat: number;
  logEer: string;
  logMm: string;
  minTekst?: number;
};

export type DilemmaDef = {
  id: string;
  aflevering: EpisodeId;
  ronde: 1 | 2;
  status: 'concept' | 'goedgekeurd';
  titel: string;
  privéBericht: {
    van: string;
    tekst: string;
    kanaal: 'app' | 'briefje' | 'sms2009' | 'lens';
    dil?: boolean;
  };
  keuzes: readonly { id: DilemmaKeuze; label: string; kort: string }[];
  effecten: Record<DilemmaKeuze, DilemmaEffect>;
  ethiekNoot: string;
};
