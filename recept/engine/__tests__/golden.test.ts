import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { compute, emptyContext, marcoBud, meterSnapshot } from '../index';

const goldenDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../__golden__/generated');

function loadGolden(name: string) {
  const raw = readFileSync(path.join(goldenDir, name), 'utf8');
  return JSON.parse(raw) as { ids: string[]; q: number; meters: ReturnType<typeof meterSnapshot> };
}

describe('golden snapshots ronde 1', () => {
  const ctx = emptyContext();
  const bud = marcoBud(1);

  it.each([
    ['r1-none.json', []],
    ['r1-D.json', ['D']],
    ['r1-E.json', ['E']],
    ['r1-D-E.json', ['D', 'E']],
  ] as const)('match %s', (file, ids) => {
    const golden = loadGolden(file);
    const res = compute(1, ids, golden.q, ctx, bud);
    expect(meterSnapshot(res)).toEqual(golden.meters);
  });
});
