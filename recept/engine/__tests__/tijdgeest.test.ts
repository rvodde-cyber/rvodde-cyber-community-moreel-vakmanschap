import { describe, expect, it } from 'vitest';
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { TIJDGEEST } from '@data/episodes/tijdgeest';
import { tickerRegelsVoor } from '@data/episodes/tickerForEpisode';
import { ROUNDS } from '@data/rounds';
import { freshEpisode } from '../../src/game/budgetUi';
import type { EpisodeId } from '@data/episodes/meta';

const EPS: EpisodeId[] = [1, 2, 3, 4, 5];

const EERSTE_LAATSTE: Record<
  EpisodeId,
  { eerste: string; laatste: string }
> = {
  1: {
    eerste: 'Telefoon bezet. Weer.',
    laatste: 'Op de cassette: The Cure, zachtjes, bij het inpakken.',
  },
  2: {
    eerste: 'Euro ’96: de ploeg kijkt mee in de pauze.',
    laatste: 'De semafoon piept. Niemand weet van wie.',
  },
  3: {
    eerste: 'Kredietcrisis: iedereen zegt "in deze tijd".',
    laatste: 'Wii in de pauzeruimte: de ploeg van Dongen staat bovenaan.',
  },
  4: {
    eerste: 'AI-notulist: 14 actiepunten, 0 eigenaren.',
    laatste: 'Marco’s leaseauto staat op de plek van de ploegleider. Elektrisch.',
  },
  5: {
    eerste: 'Koffieautomaat: je hebt vandaag nog niet bewogen.',
    laatste: 'Bezorgwagen zonder bestuurder staat weer te lang bij de laaddock.',
  },
};

function collectAudioFiles(dir: string, acc: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      collectAudioFiles(full, acc);
    } else if (['.mp3', '.wav', '.ogg', '.m4a', '.webm'].includes(extname(name).toLowerCase())) {
      acc.push(full);
    }
  }
  return acc;
}

describe('tijdgeest register (docs/TIJDGEEST.md)', () => {
  it.each(EPS)('aflevering %i: precies 3 tickerregels', (ep) => {
    expect(TIJDGEEST[ep].ticker).toHaveLength(3);
  });

  it.each(EPS)('aflevering %i: letterlijke eerste en laatste tickerregel', (ep) => {
    const t = TIJDGEEST[ep].ticker;
    expect(t[0]?.[1]).toBe(EERSTE_LAATSTE[ep].eerste);
    expect(t[2]?.[1]).toBe(EERSTE_LAATSTE[ep].laatste);
  });

  it('A4 demo-ticker in rounds.ts ongewijzigd (golden)', () => {
    const demo1 = ROUNDS[1].ticker;
    const demo2 = ROUNDS[2].ticker;
    expect(demo1.length).toBeGreaterThan(0);
    expect(tickerRegelsVoor(4, demo1).slice(0, demo1.length)).toEqual(demo1);
    expect(tickerRegelsVoor(4, demo2).slice(0, demo2.length)).toEqual(demo2);
    expect(tickerRegelsVoor(4, demo1).length).toBe(demo1.length + 3);
  });

  it('skeleton-afleveringen: alleen tijdgeest-ticker', () => {
    for (const ep of [1, 2, 3, 5] as EpisodeId[]) {
      expect(tickerRegelsVoor(ep, [])).toEqual(TIJDGEEST[ep].ticker);
    }
  });
});

describe('tijdgeest geluid UI-state', () => {
  it('standaard uit per aflevering', () => {
    for (const ep of EPS) {
      expect(freshEpisode(ep).tijdgeestGeluidAan).toBe(false);
    }
  });

  it.each(EPS)('aflevering %i: geluid heeft tekstalternatief', (ep) => {
    const g = TIJDGEEST[ep].geluid;
    expect(g).not.toBeNull();
    expect(g!.tekstalternatief.length).toBeGreaterThan(0);
  });
});

describe('geen tijdgeest-audiobestanden in repo', () => {
  const root = join(import.meta.dirname, '..', '..');
  const publicDir = join(root, 'public');
  const dataDir = join(root, 'data');

  it('geen mp3/wav/ogg in public/ of data/ (tijdgeest voegt geen audio toe)', () => {
    const found = [...collectAudioFiles(publicDir), ...collectAudioFiles(dataDir)];
    const tijdgeestPaths = found.filter(
      (p) => p.includes('tijdgeest') || p.includes('cassette') || p.includes('a1-cassette'),
    );
    expect(tijdgeestPaths).toEqual([]);
  });
});
