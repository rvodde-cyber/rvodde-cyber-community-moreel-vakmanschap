import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute, emptyContext, marcoBud } from '../engine';
import { meterSnapshot } from '../engine/snapshot';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../engine/__golden__/generated');

const scenarios: { file: string; ids: string[]; q: number }[] = [
  { file: 'r1-none.json', ids: [], q: 1.0 },
  { file: 'r1-D.json', ids: ['D'], q: 1.0 },
  { file: 'r1-E.json', ids: ['E'], q: 1.0 },
  { file: 'r1-D-E.json', ids: ['D', 'E'], q: 1.0 },
];

mkdirSync(outDir, { recursive: true });
const ctx = emptyContext();
const bud = marcoBud(1);

for (const s of scenarios) {
  const res = compute(1, s.ids, s.q, ctx, bud);
  const payload = {
    scenario: s.file.replace('.json', ''),
    ids: s.ids,
    q: s.q,
    meters: meterSnapshot(res),
  };
  writeFileSync(path.join(outDir, s.file), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log('geschreven:', s.file, payload.meters);
}
