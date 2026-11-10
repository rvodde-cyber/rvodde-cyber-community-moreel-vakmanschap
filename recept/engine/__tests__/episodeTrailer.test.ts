import { describe, expect, it } from 'vitest';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { EPISODE_TRAILERS, trailerVerborgenTekst } from '@data/trailers';
import { EPISODES } from '@data/episodes/meta';
import { episodeContent } from '@data/episodes/content';
import { gameReducer, type GameAction } from '../../src/game/gameReducer';
import { freshEpisode } from '../../src/game/budgetUi';
import { moetAfleveringstrailer } from '../../src/game/episodeTrailerFlow';
import { trailerShotBewegingKlasse } from '../../src/screens/phases/EpisodeTrailerPhase';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function reduce(state: ReturnType<typeof freshEpisode>, action: GameAction) {
  return gameReducer(state, action);
}

describe('afleveringstrailer (vóór intro)', () => {
  it('(a) nieuwe start gaat naar trailer; na trailerGezien naar intro', () => {
    let s = { ...freshEpisode(1), playerName: 'Kim', team: '4a' };
    s = reduce(s, { type: 'START_EPISODE', episode: 2 });
    expect(s.phase).toBe('trailer');
    expect(s.episode).toBe(2);

    s = reduce(s, { type: 'SKIP_EPISODE_TRAILER', markSeen: true });
    expect(s.phase).toBe('intro');
    expect(s.trailerGezien[2]).toBe(true);

    s = reduce(s, { type: 'START_EPISODE', episode: 2 });
    expect(s.phase).toBe('intro');
  });

  it('(b) overslaan zet introfase', () => {
    const s0 = { ...freshEpisode(3), phase: 'trailer' as const };
    const s1 = reduce(s0, { type: 'SKIP_EPISODE_TRAILER', markSeen: true });
    expect(s1.phase).toBe('intro');
  });

  it('(e) na afloop trailerGezien; herstart niet opnieuw', () => {
    let s = reduce(freshEpisode(1), { type: 'START_EPISODE', episode: 1 });
    expect(s.phase).toBe('trailer');
    s = reduce(s, { type: 'SKIP_EPISODE_TRAILER', markSeen: true });
    expect(s.trailerGezien[1]).toBe(true);
    s = reduce(s, { type: 'START_EPISODE', episode: 1 });
    expect(s.phase).toBe('intro');
  });

  it('(f) replay gaat naar trailer', () => {
    const s0 = { ...freshEpisode(4), phase: 'intro' as const, trailerGezien: { 4: true } };
    const s1 = reduce(s0, { type: 'REPLAY_EPISODE_TRAILER' });
    expect(s1.phase).toBe('trailer');
    expect(s1.trailerGezien[4]).toBe(true);
  });

  it('(g) bij reduced motion geen bewegingsklasse', () => {
    expect(trailerShotBewegingKlasse('pan-rechts', true)).toBe('episode-trailer__shot--geen');
    expect(trailerShotBewegingKlasse('in', false)).toBe('episode-trailer__shot--in');
  });

  it('(h) titelkaarten in verborgen trailerlijst', () => {
    for (const ep of EPISODES) {
      const lines = trailerVerborgenTekst(ep.id);
      const tk = EPISODE_TRAILERS[ep.id].titelkaart;
      expect(lines[lines.length - 1]).toBe(`${tk.deel} · ${tk.naam} · ${tk.jaar}`);
    }
  });

  it('(d) minder dan twee laadbare shots: markSeen false in reducer-flow', () => {
    const s0 = { ...freshEpisode(2), phase: 'trailer' as const };
    const s1 = reduce(s0, { type: 'SKIP_EPISODE_TRAILER', markSeen: false });
    expect(s1.phase).toBe('intro');
    expect(s1.trailerGezien[2]).toBeUndefined();
  });

  it('trailerActief uit: geen trailer bij start', () => {
    const base = freshEpisode(1);
    const off = { ...base, trailerGezien: {} };
    expect(moetAfleveringstrailer(1, off.trailerGezien, true)).toBe(true);
    expect(episodeContent(1).trailerActief).toBe(true);
    expect(moetAfleveringstrailer(1, off.trailerGezien, false)).toBe(false);
  });

  it('(i) geen nieuwe externe font-URL in trailer-CSS/bron', () => {
    const css = readFileSync(resolve('src/styles/recept.css'), 'utf8');
    expect(css.slice(css.indexOf('.episode-trailer'))).not.toMatch(/https?:\/\//);
    const phase = readFileSync(resolve('src/screens/phases/EpisodeTrailerPhase.tsx'), 'utf8');
    expect(phase).not.toMatch(/fonts\.googleapis|fonts\.gstatic/);
  });

  it('elke aflevering heeft trailerdata en trailerActief', () => {
    for (const ep of EPISODES) {
      expect(EPISODE_TRAILERS[ep.id].shots.length).toBeGreaterThanOrEqual(2);
      expect(episodeContent(ep.id).trailerActief).not.toBe(false);
    }
  });

  it('(c) ontbrekende shotcodes: filter houdt volgorde', async () => {
    const { filterLoadableShotCodes } = await import('../../src/lib/trailerProbe');
    const orig = globalThis.Image;
    const ok = new Set(['I1', 'I2', 'SKIP', 'T4']);
    class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(v: string) {
        const hit = [...ok].find((c) => v.includes(c));
        queueMicrotask(() => (hit && hit !== 'SKIP' ? this.onload?.() : this.onerror?.()));
      }
    }
    globalThis.Image = MockImage as unknown as typeof Image;
    try {
      const kept = await filterLoadableShotCodes(['SKIP', 'I1', 'I2'], '/');
      expect(kept).toEqual(['I1', 'I2']);
    } finally {
      globalThis.Image = orig;
    }
  });
});

describe('afleveringstrailer beelden aanwezigheid (inventaris)', () => {
  it('logt welke trailer-codes in public/beelden staan', () => {
    const dir = join(process.cwd(), 'public', 'beelden');
    const files = new Set(readdirSync(dir));
    const codes = new Set<string>();
    for (const ep of EPISODES) {
      for (const s of EPISODE_TRAILERS[ep.id].shots) codes.add(s.code);
    }
    const missing: string[] = [];
    for (const code of codes) {
      const has = [...files].some((f) => f.startsWith(code) || f === `${code}.jpg` || f === `${code}.webp`);
      if (!has) missing.push(code);
    }
    expect(missing).toEqual([]);
  });
});
