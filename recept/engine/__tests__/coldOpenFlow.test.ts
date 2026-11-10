import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  canColdNext,
  coldOpenForRound,
  coldOpenMaxSub,
} from '@data/episodes/coldOpenFlow';
import { episodeContent } from '@data/episodes/content';
import type { EpisodeId } from '@data/episodes/meta';
import { freshEpisode } from '../../src/game/budgetUi';
import { gameReducer } from '../../src/game/gameReducer';
import type { GameUiState } from '../../src/game/uiTypes';
import { coldLineDurationMs, shouldAutoAdvanceCold } from '../../src/game/coldOpenTiming';
import { coldSceneTaskLine } from '../../src/game/coldOpenCopy';
import { usesBeslistijdTimer } from '@data/episodes/motor';

const EPS: EpisodeId[] = [1, 2, 3, 4, 5];

function advanceColdToEnd(state: GameUiState, round: 1 | 2): GameUiState {
  let s: GameUiState = {
    ...state,
    round,
    phase: 'cold',
    rounds: {
      ...state.rounds,
      [round]: { ...state.rounds[round], trailerDone: true },
    },
  };
  while (canColdNext(s.episode, round, s.rounds[round].coldSub)) {
    s = gameReducer(s, { type: 'COLD_NEXT' });
  }
  return s;
}

describe('cold open grens uit register', () => {
  it.each(EPS)('aflevering %i ronde 1: COLD_NEXT tot laatste regel', (ep) => {
    const max = coldOpenMaxSub(ep, 1);
    const base = coldOpenForRound(ep, 1).lines.length - 1;
    const c = episodeContent(ep);
    if (c.onderstroomActief) {
      expect(max).toBeGreaterThanOrEqual(base);
    } else {
      expect(max).toBe(base);
    }
    const end = advanceColdToEnd(freshEpisode(ep), 1);
    expect(end.rounds[1].coldSub).toBe(max);
    expect(gameReducer(end, { type: 'COLD_NEXT' })).toEqual(end);
  });

  it('aflevering 1 ronde 2: golden 5 regels + onderstroom (index 0–6)', () => {
    expect(coldOpenForRound(1, 2).lines).toHaveLength(5);
    expect(coldOpenMaxSub(1, 2)).toBe(6);
    const end = advanceColdToEnd(freshEpisode(1), 2);
    expect(end.rounds[2].coldSub).toBe(6);
  });

  it('aflevering 4 ronde 1: demo cold open ongewijzigd lengte', () => {
    const lines = episodeContent(4).coldOpen[1]!.lines.length;
    expect(lines).toBe(5);
    expect(coldOpenMaxSub(4, 1)).toBe(4);
  });
});

describe('coldLineDurationMs', () => {
  it('respecteert minimum 2500 ms', () => {
    expect(coldLineDurationMs(['', ''])).toBe(2500);
  });

  it('respecteert maximum 7000 ms', () => {
    const long = 'x'.repeat(200);
    expect(coldLineDurationMs(['', long])).toBe(7000);
  });

  it('lineair: 1500 + 55 per teken', () => {
    expect(coldLineDurationMs(['', 'abcd'])).toBe(2500);
    expect(coldLineDurationMs(['', 'a'.repeat(20)])).toBe(1500 + 20 * 55);
  });
});

describe('shouldAutoAdvanceCold', () => {
  it('pauze of tab verborgen of reduced motion stopt doorloop', () => {
    expect(shouldAutoAdvanceCold({ reducedMotion: false, paused: false, tabHidden: false })).toBe(true);
    expect(shouldAutoAdvanceCold({ reducedMotion: true, paused: false, tabHidden: false })).toBe(false);
    expect(shouldAutoAdvanceCold({ reducedMotion: false, paused: true, tabHidden: false })).toBe(false);
    expect(shouldAutoAdvanceCold({ reducedMotion: false, paused: false, tabHidden: true })).toBe(false);
  });
});

describe('gesimuleerde klok op leestijd', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('advance callback na berekende ms', () => {
    vi.useFakeTimers();
    let fired = false;
    const ms = coldLineDurationMs(['HARRIE', 'Dan lopen we gewoon wat harder.']);
    setTimeout(() => {
      fired = true;
    }, ms);
    vi.advanceTimersByTime(ms - 1);
    expect(fired).toBe(false);
    vi.advanceTimersByTime(1);
    expect(fired).toBe(true);
  });
});

describe('cold open copy — beslistijd alleen met timer', () => {
  it('aflevering 1 toont tien minuten op laatste regel', () => {
    expect(usesBeslistijdTimer(1)).toBe(true);
    expect(
      coldSceneTaskLine({ last: true, hasBeslistijdTimer: true, manualAdvance: false }),
    ).toContain('tien minuten');
  });

  it('timer: A3 en A5; cold-regel zonder timer toont geen tien minuten', () => {
    expect(usesBeslistijdTimer(3)).toBe(true);
    expect(usesBeslistijdTimer(5)).toBe(true);
    expect(
      coldSceneTaskLine({ last: true, hasBeslistijdTimer: true, manualAdvance: false }),
    ).toContain('tien minuten');
    expect(
      coldSceneTaskLine({ last: true, hasBeslistijdTimer: false, manualAdvance: false }),
    ).not.toContain('tien minuten');
  });
});

describe('aflevering 1 — verplichte klikken intro → onderzoek', () => {
  it('maximaal 3 speleracties vóór onderzoek (intro, trailer, start overleg)', () => {
    const mandatory: Parameters<typeof gameReducer>[1][] = [
      { type: 'SET_PHASE', phase: 'cold' },
      { type: 'PLAY_FILM', kind: 'trailer-r1' },
    ];
    let s = freshEpisode(1);
    expect(s.phase).toBe('intro');
    for (const a of mandatory) s = gameReducer(s, a);
    s = gameReducer(s, { type: 'END_FILM' });
    expect(s.rounds[1].trailerDone).toBe(true);
    s = advanceColdToEnd(s, 1);
    mandatory.push({ type: 'SET_PHASE', phase: 'onderzoek' });
    s = gameReducer(s, mandatory[2]!);
    expect(s.phase).toBe('onderzoek');
    expect(mandatory).toHaveLength(3);
  });
});

describe('flow reducer — geen dode eindes A1 slotfilm', () => {
  it('END_FILM slot-r1 na r1 gaat naar tussen', () => {
    let s = freshEpisode(1);
    s = {
      ...s,
      phase: 'uitkomst',
      results: { 1: { sel: [], P0: 50, B: 50, verz: 3, verl: 5 } as never },
      filmKind: 'slot-r1',
    };
    s = gameReducer(s, { type: 'END_FILM' });
    expect(s.phase).toBe('tussen');
  });

  it('END_FILM finale gaat naar voorspel', () => {
    let s = freshEpisode(1);
    s = { ...s, phase: 'uitkomst', filmKind: 'finale' };
    s = gameReducer(s, { type: 'END_FILM' });
    expect(s.phase).toBe('voorspel');
  });
});
