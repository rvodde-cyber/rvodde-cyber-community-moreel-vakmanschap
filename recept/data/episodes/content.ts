import { COLD_OPEN } from '../coldOpen';
import { DILEMMA_EP1_FRANS } from '../dilemmas/ep1-frans';
import { DILEMMA_EP4_PIOTR } from '../dilemmas/ep4-piotr';
import type { FilmScript } from '../filmSequences';
import { TRAILER_RONDE_1, TRAILER_RONDE_2 } from '../filmSequences';
import { ROUNDS } from '../rounds';
import type { RoundDefinition } from '../schemas/rounds.schema';
import { episodeMeta, type EpisodeId } from './meta';
import { SKELETON_COLD } from '../skeleton/coldOpen';
import { SKELETON_SLOTS, SKELETON_TRAILERS } from '../skeleton/film';
import { A1_ROUNDS } from './a1Rounds';
import { COLD_OPEN_EP1 } from './coldOpenEp1';
import { SKELETON_ROUNDS } from '../skeleton/rounds';
import { slotLineRonde1, slotLinesFinale } from '../slotLines';
import type { ComputeResult } from '@engine/types';
import type { DilemmaDef } from './dilemmaDef';
import { TIJDGEEST, type Tijdgeest } from './tijdgeest';
import { GESPREKSKAARTEN, type Gesprekskaart } from '../gesprekskaarten';

export type ColdOpenDef = {
  place: string;
  img: string;
  lines: readonly [string, string][];
};

export type RoundUiSlice = {
  pilot: 'pilot' | 'zelf' | null;
  cards: string[];
  bud: Record<string, number>;
};

export type SlotLinesDef = {
  ronde1: (res: ComputeResult, r: RoundUiSlice) => [place: string, line: string];
  finale: (
    res: ComputeResult,
    r2: RoundUiSlice,
    dilemmaChoice: 'niets' | 'groep' | 'prive' | null,
  ) => [[string, string], [string, string]];
};

export type EpisodeFilmDef = {
  trailerR1: FilmScript;
  trailerR2?: FilmScript;
  slotSkeleton?: FilmScript;
};

export type EpisodePauzeKaart = {
  tafelvragen: readonly string[];
  voorspelling: {
    vraag: string;
    opties: readonly { id: string; label: string }[];
  };
  liveLabel?: string;
  intro?: string;
};

export type EpisodeTussenKaart = {
  title: string;
  tafelvragen: readonly string[];
  note: string;
  ctaLabel: string;
};

export type EpisodeContent = {
  /** Welke berekeningslaag: A4-demo, interventiemodel of stub */
  motorKind: 'a4' | 'interventie' | 'skeleton';
  rounds: { 1: RoundDefinition; 2?: RoundDefinition };
  roundCount: 1 | 2;
  coldOpen: { 1: ColdOpenDef; 2?: ColdOpenDef };
  dilemma: DilemmaDef | null;
  slotLines: SlotLinesDef | null;
  film: EpisodeFilmDef;
  titelByRound: Partial<Record<1 | 2, string>>;
  kick: string;
  /** Demo A4: marcoBud + budgetOf; skeleton: budgetOfDef + posten-marco */
  usesDemoBudget: boolean;
  tussenKaart?: EpisodeTussenKaart;
  pauzeKaart?: EpisodePauzeKaart;
  /** Sfeerlaag per periode — docs/TIJDGEEST.md */
  tijdgeest: Tijdgeest;
  gesprekskaart: Gesprekskaart;
  /** Teamgesprek ronde 1; A4-demo standaard uit (golden-flow). */
  gesprekskaartActief: boolean;
};

function skeletonEpisodeContent(ep: Exclude<EpisodeId, 4 | 1>): EpisodeContent {
  const meta = episodeMeta(ep);
  return {
    motorKind: 'skeleton',
    rounds: { 1: SKELETON_ROUNDS[ep] },
    roundCount: 1,
    coldOpen: { 1: SKELETON_COLD[ep] },
    dilemma: null,
    slotLines: null,
    film: {
      trailerR1: SKELETON_TRAILERS[ep],
      slotSkeleton: SKELETON_SLOTS[ep],
    },
    titelByRound: { 1: meta.titel },
    kick: meta.kick,
    usesDemoBudget: false,
    tijdgeest: TIJDGEEST[ep],
    gesprekskaart: GESPREKSKAARTEN[ep],
    gesprekskaartActief: true,
  };
}

const EPISODE_1_CONTENT: EpisodeContent = {
  motorKind: 'interventie',
  rounds: { 1: A1_ROUNDS[1], 2: A1_ROUNDS[2] },
  roundCount: 2,
  coldOpen: { 1: COLD_OPEN_EP1[1], 2: COLD_OPEN_EP1[2] },
  dilemma: DILEMMA_EP1_FRANS,
  slotLines: {
    ronde1: (_res, _r) => ['SCHUUR', 'De eerste order staat. In ronde 2 valt het briefje.'],
    finale: () => [
      ['', ''],
      ['', ''],
    ],
  },
  film: {
    trailerR1: SKELETON_TRAILERS[1],
    trailerR2: SKELETON_TRAILERS[1],
  },
  titelByRound: { 1: episodeMeta(1).titel, 2: episodeMeta(1).titel },
  kick: episodeMeta(1).kick,
  usesDemoBudget: false,
  tussenKaart: {
    title: 'EINDE VAN RONDE 1',
    tafelvragen: ['Wat nemen jullie mee naar ronde 2, nu het drukker wordt in de schuur?'],
    note: 'Neem de tijd. Ronde 2 begint pas als jullie verder gaan.',
    ctaLabel: 'Door naar ronde 2',
  },
  pauzeKaart: {
    tafelvragen: [
      'Wat hebben jullie in de schuur vastgelegd, en wat zit alleen nog in iemands hoofd?',
      'Wie hoorde bij de grote beslissingen aan tafel, en wie niet?',
    ],
    voorspelling: {
      vraag: 'Hoe ziet het bedrijf er na de sprong naar 1996 uit?',
      opties: [
        { id: 'a', label: 'Iedereen kent nog iedereen bij naam.' },
        { id: 'b', label: 'Het werk is in stukjes geknipt.' },
        { id: 'c', label: 'Harrie doet nog steeds alles zelf.' },
      ],
    },
    liveLabel: 'EINDE AFLEVERING 1',
    intro: 'De scène is voorbij. Neem de tijd voor deze vragen voordat jullie verder gaan.',
  },
  tijdgeest: TIJDGEEST[1],
  gesprekskaart: GESPREKSKAARTEN[1],
  gesprekskaartActief: true,
};

const EPISODE_4_TUSSEN: EpisodeTussenKaart = {
  title: 'EINDE VAN RONDE 1',
  tafelvragen: [
    'Wat heeft jullie besluit gekost, en wie betaalt die rekening?',
    'Wie in deze familie wordt het minst gezien, en wat kost dat?',
  ],
  note: 'Neem de tijd voor deze vragen. Ronde 2 begint pas als jullie verder gaan.',
  ctaLabel: 'Door naar ronde 2',
};

const EPISODE_4_CONTENT: EpisodeContent = {
  motorKind: 'a4',
  rounds: { 1: ROUNDS[1], 2: ROUNDS[2] },
  roundCount: 2,
  coldOpen: { 1: COLD_OPEN[1], 2: COLD_OPEN[2] },
  dilemma: DILEMMA_EP4_PIOTR,
  slotLines: {
    ronde1: slotLineRonde1,
    finale: slotLinesFinale,
  },
  film: {
    trailerR1: TRAILER_RONDE_1,
    trailerR2: TRAILER_RONDE_2,
  },
  titelByRound: {
    1: 'Het dashboard liegt niet',
    2: 'Wie tekent er eigenlijk?',
  },
  kick: episodeMeta(4).kick,
  usesDemoBudget: true,
  tussenKaart: EPISODE_4_TUSSEN,
  tijdgeest: TIJDGEEST[4],
  gesprekskaart: GESPREKSKAARTEN[4],
  gesprekskaartActief: false,
};

export const EPISODE_CONTENT: Record<EpisodeId, EpisodeContent> = {
  1: EPISODE_1_CONTENT,
  2: skeletonEpisodeContent(2),
  3: skeletonEpisodeContent(3),
  4: EPISODE_4_CONTENT,
  5: skeletonEpisodeContent(5),
};

export function episodeContent(id: EpisodeId): EpisodeContent {
  return EPISODE_CONTENT[id];
}

/** Volledige speelmodus: twee rondes, dilemma en dynamische slotlijnen (register, niet playMode-label). */
export function isFullEpisode(id: EpisodeId): boolean {
  const c = EPISODE_CONTENT[id];
  return c.roundCount === 2 && c.dilemma != null && c.slotLines != null;
}
