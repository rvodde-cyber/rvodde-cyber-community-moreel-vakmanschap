import type { DilemmaKeuze } from '@data/dilemmas/ep4-piotr';
import type { OpvolgingKeuze } from '@data/opvolging';
import type { EpisodeId } from '@data/episodes/meta';
import type { ComputeResult } from '@engine/types';
import type { BerichtDef, ChatChannel } from '@data/berichten';

export type Phase =
  | 'intro'
  | 'cold'
  | 'onderzoek'
  | 'besluit'
  | 'uitkomst'
  | 'scan'
  | 'tussen'
  | 'voorspel'
  | 'opvolging'
  | 'pauze'
  | 'nabespreking';

export type FilmKind = 'trailer-r1' | 'trailer-r2' | 'slot-r1' | 'finale';

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
  reacted: boolean;
}

export interface DilemmaState {
  choice: DilemmaKeuze | null;
  text: string;
  done: boolean;
}

export interface HiddenMetersState {
  menselijkeMaat: number;
  eerlijkheid: number;
  logMm: string[];
  logEer: string[];
}

export interface GameUiState {
  v: number;
  episode: EpisodeId;
  opvolging: OpvolgingKeuze | null;
  /** Conceptinterventies gekozen (docent/export); ids zoals ep1-A */
  conceptLog: string[];
  playerName: string;
  team: string;
  round: 1 | 2;
  phase: Phase;
  rounds: Record<1 | 2, RoundUiState>;
  results: Partial<Record<1 | 2, ComputeResult>>;
  tLeft: number;
  timerOn: boolean;
  chatTab: ChatChannel;
  inbox: string[];
  msgText: Record<string, string>;
  msgTimes: Record<string, string>;
  read: Record<string, boolean>;
  typingId: string | null;
  /** Extra berichten (reacties, dilemma-groep) */
  dynamicBerichten: Record<string, BerichtDef>;
  deliveredPhases: Record<string, true>;
  pendingReacties: boolean;
  dilemma: DilemmaState;
  hidden: HiddenMetersState;
  filmKind: FilmKind | null;
  gok: string | null;
}

export type BerichtFaseKey = `${1 | 2}-onderzoek` | `${1 | 2}-besluit`;
