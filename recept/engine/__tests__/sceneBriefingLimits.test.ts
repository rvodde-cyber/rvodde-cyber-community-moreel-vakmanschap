import { describe, expect, it } from 'vitest';
import type { EpisodeId } from '@data/episodes/meta';
import { EPISODES } from '@data/episodes/meta';
import { validateGesprekOpslaan } from '@data/schemas/gesprekskaart.schema';
import { ARGUMENT_MAX, TEGENARGUMENT_MAX, ONZEZIN_MAX } from '@/game/limits';
import { validateArgumentField } from '@data/schemas/argument.schema';
import { freshEpisode } from '../../src/game/budgetUi';
import { gameReducer } from '../../src/game/gameReducer';
import { migrateGameState } from '../../src/game/migrateState';
import { inferSceneGestartOp, roundNeedsSceneBriefing } from '../../src/game/sceneGestart';
import type { TeamExport } from '../../src/game/teamExport';
import type { GameUiState } from '../../src/game/uiTypes';

const EPS: EpisodeId[] = [1, 2, 3, 4, 5];

function coldBeforeBriefing(ep: EpisodeId, round: 1 | 2) {
  const s = freshEpisode(ep);
  return {
    ...s,
    round,
    phase: 'cold' as const,
    rounds: {
      ...s.rounds,
      [round]: {
        ...s.rounds[round],
        sceneGestartOp: null,
        coldSub: 0,
        trailerDone: false,
      },
    },
  };
}

describe('(a) briefing vóór scène — A1 t/m A5, beide rondes', () => {
  it.each(
    EPS.flatMap((ep) =>
      ([1, 2] as const).map((round) => ({ ep, round })),
    ),
  )('aflevering $ep ronde $round: briefing, geen scène gestart', ({ ep, round }) => {
    const s = coldBeforeBriefing(ep, round);
    expect(roundNeedsSceneBriefing(s.rounds[round], s, round)).toBe(true);
    expect(s.rounds[round].coldSub).toBe(0);
    expect(s.rounds[round].trailerDone).toBe(false);
    expect(s.rounds[round].sceneGestartOp).toBeNull();
  });
});

describe('(d) hervatten midden in ronde slaat briefing over', () => {
  it('coldSub > 0: geen briefing', () => {
    const s = coldBeforeBriefing(1, 1);
    const r = { ...s.rounds[1], coldSub: 2, sceneGestartOp: null };
    expect(roundNeedsSceneBriefing(r, { ...s, rounds: { ...s.rounds, 1: r } }, 1)).toBe(false);
    expect(inferSceneGestartOp(r, { ...s, rounds: { ...s.rounds, 1: r } }, 1)).toBe(1);
  });

  it('fase onderzoek: geen briefing', () => {
    const s = { ...freshEpisode(2), phase: 'onderzoek' as const, round: 1 as const };
    expect(roundNeedsSceneBriefing(s.rounds[1], s, 1)).toBe(false);
  });
});

describe('(e) oude saves zonder sceneGestartOp', () => {
  it('timer liep in onderzoek → scène als gestart', () => {
    const raw = {
      v: 5,
      episode: 1,
      phase: 'onderzoek',
      round: 1,
      timerOn: true,
      tLeft: 420,
      rounds: {
        1: { ...freshEpisode(1).rounds[1], sceneGestartOp: undefined },
        2: freshEpisode(1).rounds[2],
      },
    };
    const m = migrateGameState(raw);
    expect(m).not.toBeNull();
    expect(m!.rounds[1].sceneGestartOp).toBe(1);
    expect(m!.timerOn).toBe(true);
  });

  it('nog in cold zonder voortgang → briefing', () => {
    const raw = {
      v: 5,
      episode: 3,
      phase: 'cold',
      round: 1,
      timerOn: false,
      tLeft: 600,
      rounds: {
        1: { ...freshEpisode(3).rounds[1], sceneGestartOp: undefined, coldSub: 0, trailerDone: false },
        2: freshEpisode(3).rounds[2],
      },
    };
    const m = migrateGameState(raw);
    expect(m).not.toBeNull();
    expect(m!.rounds[1].sceneGestartOp).toBeNull();
  });
});

describe('(f) limieten nieuwe invoer (incl. plakken via reducer)', () => {
  it('validate: te kort argument/tegenargument', () => {
    expect(validateArgumentField('x'.repeat(19), 'y'.repeat(10)).ok).toBe(false);
    expect(validateArgumentField('x'.repeat(20), 'y'.repeat(9)).ok).toBe(false);
  });

  it('SET_FIELD kapst boven maximum (plakken)', () => {
    let s: GameUiState = { ...freshEpisode(1), phase: 'argument' };
    s = gameReducer(s, { type: 'SET_FIELD', field: 'argument', value: 'a'.repeat(500) });
    expect(s.rounds[1].argument).toHaveLength(ARGUMENT_MAX);
    s = gameReducer(s, { type: 'SET_FIELD', field: 'tegenargument', value: 'b'.repeat(200) });
    expect(s.rounds[1].tegenargument).toHaveLength(TEGENARGUMENT_MAX);
  });

  it('gesprekskaart: zin boven ONZEZIN_MAX wordt geweigerd', () => {
    expect(validateGesprekOpslaan('z'.repeat(ONZEZIN_MAX + 1), ['eerlijkheid']).ok).toBe(false);
    expect(validateGesprekOpslaan('z'.repeat(ONZEZIN_MAX), ['eerlijkheid']).ok).toBe(true);
  });
});

describe('(h) oud exportbestand zonder sceneGestartOp', () => {
  it('JSON zonder veld parseert en rounds blijven bruikbaar', () => {
    const legacy: TeamExport = {
      exportVersion: 2,
      exportedAt: '2024-01-01T00:00:00.000Z',
      episode: 1,
      playerName: 'Test',
      opvolging: null,
      conceptLog: [],
      phase: 'onderzoek',
      rounds: [
        {
          round: 1,
          label: 'Ronde 1',
          acties: [],
          vermoeden: null,
          pilot: null,
          interventies: [],
          argument: 'x'.repeat(20),
          tegenargument: 'y'.repeat(10),
          weging: ['', '', ''],
          begroting: {},
          uitkomst: null,
        },
      ],
      dilemma: { choice: null, text: '', done: false },
      hidden: freshEpisode(1).hidden,
      gok: null,
      gesprekskaarten: [],
    };
    expect(legacy.rounds[0]?.sceneGestartOp).toBeUndefined();
    const parsed = JSON.parse(JSON.stringify(legacy)) as TeamExport;
    expect(parsed.rounds[0]?.argument).toHaveLength(20);
    expect(parsed.episode).toBe(1);
  });
});

describe('sanity EPISODES', () => {
  it('vijf afleveringen in register', () => {
    expect(EPISODES).toHaveLength(5);
  });
});