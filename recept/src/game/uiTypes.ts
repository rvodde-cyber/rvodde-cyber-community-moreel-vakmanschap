import type { ComputeResult } from '@engine/types';

export type Phase =
  | 'intro'
  | 'cold'
  | 'onderzoek'
  | 'besluit'
  | 'uitkomst'
  | 'scan';

export interface RoundUiState {
  acties: string[];
  verm: string | null;
  pilot: 'pilot' | 'zelf' | null;
  cards: string[];
  spoken: string[];
  w: [string, string, string];
  mot: string;
  minOn: boolean;
  min: string;
  bud: Record<string, number>;
  coldSub: number;
  trailerDone: boolean;
}

export interface GameUiState {
  v: number;
  playerName: string;
  team: string;
  round: 1 | 2;
  phase: Phase;
  rounds: Record<1 | 2, RoundUiState>;
  results: Partial<Record<1 | 2, ComputeResult>>;
  tLeft: number;
  timerOn: boolean;
}
