import { COLD_OPEN } from '../coldOpen';
import { DILEMMA_EP1_FRANS } from '../dilemmas/ep1-frans';
import { DILEMMA_EP2_WIM } from '../dilemmas/ep2-wim';
import { DILEMMA_EP3_WAALWIJK } from '../dilemmas/ep3-waalwijk';
import { DILEMMA_EP4_PIOTR } from '../dilemmas/ep4-piotr';
import { DILEMMA_EP5_SCHRIFT } from '../dilemmas/ep5-schrift';
import type { FilmScript } from '../filmSequences';
import { TRAILER_RONDE_1, TRAILER_RONDE_2 } from '../filmSequences';
import { ROUNDS } from '../rounds';
import type { RoundDefinition } from '../schemas/rounds.schema';
import { episodeMeta, type EpisodeId } from './meta';
import { SKELETON_TRAILERS } from '../skeleton/film';
import { A1_ROUNDS } from './a1Rounds';
import { A2_ROUNDS } from './a2Rounds';
import { A3_ROUNDS } from './a3Rounds';
import { A5_ROUNDS } from './a5Rounds';
import { COLD_OPEN_EP2 } from './coldOpenEp2';
import { COLD_OPEN_EP3 } from './coldOpenEp3';
import { COLD_OPEN_EP1 } from './coldOpenEp1';
import { COLD_OPEN_EP5 } from './coldOpenEp5';
import { slotLineRonde1, slotLinesFinale } from '../slotLines';
import type { ComputeResult } from '@engine/types';
import type { DilemmaDef } from './dilemmaDef';
import { TIJDGEEST, type Tijdgeest } from './tijdgeest';
import { GESPREKSKAARTEN, type Gesprekskaart } from '../gesprekskaarten';
import { OVERSTAP_UITLEG_A4 } from './overstapUitlegA4';

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
  /** Weggelaten bij laatste aflevering (A5): alleen tafelvragen, daarna nabespreking. */
  voorspelling?: {
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
  /** Introfase: posterindeling met beeld rechts (A4-demo uit). */
  introBeeldRechts: boolean;
  introBeeldAlt: string;
  introBeeldTekst: string;
  /** Sfeer en kader intro-beeld rechts — zie docs/DESIGNGIDS.md §10 */
  introLook: EpisodeIntroLook;
  /** Alleen A4: blok „Hoe het zo ver kwam” onder de andere introkoppen */
  overstapUitleg?: string;
};

export type IntroKader = 'polaroid' | 'kettingpapier' | 'venster' | 'dashboard' | 'glas';

export type EpisodeIntroLook = {
  kader: IntroKader;
  /** CSS `background` voor semi-transparante tintlaag (~max 25%) */
  tint: string;
  kicker: string;
  onderschrift: string;
};

const INTRO_REGISTER: Record<
  EpisodeId,
  Pick<EpisodeContent, 'introBeeldRechts' | 'introBeeldAlt' | 'introLook'>
> = {
  1: {
    introBeeldRechts: true,
    introBeeldAlt: 'Woonhuis met een schuur ernaast in Berkel-Enschot, schemering in 1984',
    introLook: {
      kader: 'polaroid',
      tint:
        'linear-gradient(165deg, rgba(120, 85, 45, 0.2) 0%, rgba(210, 175, 95, 0.12) 50%, rgba(80, 55, 30, 0.15) 100%)',
      kicker: 'AFLEVERING 1 / 1984',
      onderschrift: 'BERKEL-ENSCHOT, 1984',
    },
  },
  2: {
    introBeeldRechts: true,
    introBeeldAlt: 'Fabriekshal met lopende band in Tilburg, ochtendlicht in 1996',
    introLook: {
      kader: 'kettingpapier',
      tint: 'linear-gradient(180deg, rgba(60, 90, 70, 0.18), rgba(140, 180, 130, 0.1))',
      kicker: 'AFLEVERING 2 / 1996',
      onderschrift: 'LOVEN, TILBURG, 1996',
    },
  },
  3: {
    introBeeldRechts: true,
    introBeeldAlt: 'Lege directietafel in Tilburg, middaglicht in 2009',
    introLook: {
      kader: 'venster',
      tint: 'linear-gradient(180deg, rgba(200, 220, 240, 0.2), rgba(120, 160, 200, 0.12))',
      kicker: 'AFLEVERING 3 / 2009',
      onderschrift: 'TILBURG-WEST, 2009',
    },
  },
  4: {
    introBeeldRechts: false,
    introBeeldAlt: 'Leeg kantoor met actieve schermen bij zonsopgang',
    introLook: {
      kader: 'dashboard',
      tint: 'transparent',
      kicker: 'AFLEVERING 4 / 2026',
      onderschrift: 'VOSSENBERG, TILBURG, 2026',
    },
  },
  5: {
    introBeeldRechts: true,
    introBeeldAlt: 'Glazen ingang van de Spoorzone in Tilburg, schemering in 2036',
    introLook: {
      kader: 'glas',
      tint: 'linear-gradient(145deg, rgba(255, 255, 255, 0.22), rgba(180, 210, 255, 0.12))',
      kicker: 'AFLEVERING 5 / 2036',
      onderschrift: 'VOSSENBERG, TILBURG, 2036',
    },
  },
};

function introEpisodeFields(id: EpisodeId): Pick<
  EpisodeContent,
  'introBeeldRechts' | 'introBeeldAlt' | 'introBeeldTekst' | 'introLook'
> {
  const r = INTRO_REGISTER[id];
  return {
    introBeeldRechts: r.introBeeldRechts,
    introBeeldAlt: r.introBeeldAlt,
    introLook: r.introLook,
    introBeeldTekst: r.introLook.onderschrift,
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
  ...introEpisodeFields(1),
};

const EPISODE_2_CONTENT: EpisodeContent = {
  motorKind: 'interventie',
  rounds: { 1: A2_ROUNDS[1], 2: A2_ROUNDS[2] },
  roundCount: 2,
  coldOpen: { 1: COLD_OPEN_EP2[1], 2: COLD_OPEN_EP2[2] },
  dilemma: DILEMMA_EP2_WIM,
  slotLines: {
    ronde1: (_res, _r) => ['LOVEN', 'De band draait. In ronde 2 valt het briefje tussen de loonzakjes.'],
    finale: () => [
      ['', ''],
      ['', ''],
    ],
  },
  film: {
    trailerR1: SKELETON_TRAILERS[2],
    trailerR2: SKELETON_TRAILERS[2],
  },
  titelByRound: { 1: episodeMeta(2).titel, 2: episodeMeta(2).titel },
  kick: episodeMeta(2).kick,
  usesDemoBudget: false,
  tussenKaart: {
    title: 'EINDE VAN RONDE 1',
    tafelvragen: ['Wat nemen jullie mee naar ronde 2, nu de band sneller moet?'],
    note: 'Neem de tijd. Ronde 2 begint pas als jullie verder gaan.',
    ctaLabel: 'Door naar ronde 2',
  },
  pauzeKaart: {
    tafelvragen: [
      'Welke ploegleiders kregen mandaat, en wie kreeg niets?',
      'Wat gebeurt er in een bedrijf als de oprichter overal bij wil zijn?',
    ],
    voorspelling: {
      vraag: 'Hoe ziet het bedrijf er in 2009 uit?',
      opties: [
        { id: 'a', label: 'Meer vestigingen, meer afdelingen.' },
        { id: 'b', label: 'Harrie leidt nog steeds elke dag.' },
        { id: 'c', label: 'Een familielid heeft het roer overgenomen.' },
      ],
    },
    liveLabel: 'EINDE AFLEVERING 2',
    intro: 'De scène is voorbij. Neem de tijd voor deze vragen voordat jullie verder gaan.',
  },
  tijdgeest: TIJDGEEST[2],
  gesprekskaart: GESPREKSKAARTEN[2],
  gesprekskaartActief: true,
  ...introEpisodeFields(2),
};

const EPISODE_3_CONTENT: EpisodeContent = {
  motorKind: 'interventie',
  rounds: { 1: A3_ROUNDS[1], 2: A3_ROUNDS[2] },
  roundCount: 2,
  coldOpen: { 1: COLD_OPEN_EP3[1], 2: COLD_OPEN_EP3[2] },
  dilemma: DILEMMA_EP3_WAALWIJK,
  slotLines: {
    ronde1: (_res, _r) => ['TILBURG', 'Het scherm toont planning. In ronde 2 komt de sms binnen.'],
    finale: () => [
      ['', ''],
      ['', ''],
    ],
  },
  film: {
    trailerR1: SKELETON_TRAILERS[3],
    trailerR2: SKELETON_TRAILERS[3],
  },
  titelByRound: { 1: episodeMeta(3).titel, 2: episodeMeta(3).titel },
  kick: episodeMeta(3).kick,
  usesDemoBudget: false,
  tussenKaart: {
    title: 'EINDE VAN RONDE 1',
    tafelvragen: ['Wat nemen jullie mee naar ronde 2, nu de vestigingen meer zelf sturen?'],
    note: 'Neem de tijd. Ronde 2 begint pas als jullie verder gaan.',
    ctaLabel: 'Door naar ronde 2',
  },
  pauzeKaart: {
    tafelvragen: [
      'Wat gebeurt er met de vloer als vooral de cijfers tellen?',
      'Wie koos er voor Marco, en wie vroeg het aan Sanne?',
    ],
    voorspelling: {
      vraag: 'Hoe ziet het bedrijf er in 2026 uit?',
      opties: [
        { id: 'a', label: 'Het draait nog steeds om worstenbroodjes.' },
        { id: 'b', label: 'Er worden ook machines en drones gebouwd.' },
        { id: 'c', label: 'De familie is verdeeld en het bedrijf is geschrompeld.' },
      ],
    },
    liveLabel: 'EINDE AFLEVERING 3',
    intro: 'De scène is voorbij. Neem de tijd voor deze vragen voordat jullie verder gaan.',
  },
  tijdgeest: TIJDGEEST[3],
  gesprekskaart: GESPREKSKAARTEN[3],
  gesprekskaartActief: true,
  ...introEpisodeFields(3),
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

const EPISODE_5_CONTENT: EpisodeContent = {
  motorKind: 'interventie',
  rounds: { 1: A5_ROUNDS[1], 2: A5_ROUNDS[2] },
  roundCount: 2,
  coldOpen: { 1: COLD_OPEN_EP5[1], 2: COLD_OPEN_EP5[2] },
  dilemma: DILEMMA_EP5_SCHRIFT,
  slotLines: {
    ronde1: (_res, _r) => ['VOSSENBERG', 'Optivora wacht. In ronde 2 komt het appbericht over het schrift.'],
    finale: () => [
      ['', ''],
      ['', ''],
    ],
  },
  film: {
    trailerR1: SKELETON_TRAILERS[5],
    trailerR2: SKELETON_TRAILERS[5],
  },
  titelByRound: { 1: episodeMeta(5).titel, 2: episodeMeta(5).titel },
  kick: episodeMeta(5).kick,
  usesDemoBudget: false,
  tussenKaart: {
    title: 'EINDE VAN RONDE 1',
    tafelvragen: ['Wat nemen jullie mee naar ronde 2, nu er over opvolging en het archief wordt beslist?'],
    note: 'Neem de tijd. Ronde 2 begint pas als jullie verder gaan.',
    ctaLabel: 'Door naar ronde 2',
  },
  pauzeKaart: {
    tafelvragen: [
      'Wie wist wat er in het schrift stond, en wie had het in handen?',
      'Wat is er in vijf afleveringen vastgelegd, en wat zat alleen in iemands hoofd?',
    ],
    liveLabel: 'EINDE AFLEVERING 5',
    intro: 'De scène is voorbij. Neem de tijd voor deze vragen voordat jullie de nabespreking starten.',
  },
  tijdgeest: TIJDGEEST[5],
  gesprekskaart: GESPREKSKAARTEN[5],
  gesprekskaartActief: true,
  ...introEpisodeFields(5),
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
  overstapUitleg: OVERSTAP_UITLEG_A4,
  ...introEpisodeFields(4),
};

export const EPISODE_CONTENT: Record<EpisodeId, EpisodeContent> = {
  1: EPISODE_1_CONTENT,
  2: EPISODE_2_CONTENT,
  3: EPISODE_3_CONTENT,
  4: EPISODE_4_CONTENT,
  5: EPISODE_5_CONTENT,
};

export function episodeContent(id: EpisodeId): EpisodeContent {
  return EPISODE_CONTENT[id];
}

/** Volledige speelmodus: twee rondes, dilemma en dynamische slotlijnen (register, niet playMode-label). */
export function isFullEpisode(id: EpisodeId): boolean {
  const c = EPISODE_CONTENT[id];
  return c.roundCount === 2 && c.dilemma != null && c.slotLines != null;
}
