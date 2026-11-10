/**
 * Eenmalig: Firefly-trailerbestanden → canonieke {CODE}.jpg (1800×1200, ~q80).
 * Originelen → beelden-bron/trailers/. Geen package.json-wijziging (npx sharp-cli).
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const beelden = join(root, 'public', 'beelden');
const bronDir = join(root, 'beelden-bron', 'trailers');
mkdirSync(bronDir, { recursive: true });

const PREFIX_TO_CODE = [
  ['t1 ', 'T1'],
  ['w1 ', 'W1'],
  ['c1 ', 'C1'],
  ['L1 ', 'L1'],
  ['TR2-2 ', 'TR2-2'],
  ['TR2-3 ', 'TR2-3'],
  ['TR2-4 ', 'TR2-4'],
  ['TR2-5 ', 'TR2-5'],
  ['AFLEVERING 3 · 2009 TR3-1 ', 'TR3-1'],
  ['TR3-2 ', 'TR3-2'],
  ['TR3-3 ', 'TR3-3'],
  ['TR3-4 ', 'TR3-4'],
  ['TR3-5 ', 'TR3-5'],
  ['TR4-2 ', 'TR4-2'],
  ['TR4-4 ', 'TR4-4'],
  ['TR4-5 ', 'TR4-5'],
  ['TR5-1 ', 'TR5-1'],
  ['TR5-2 ', 'TR5-2'],
  ['TR5-3 ', 'TR5-3'],
  ['TR5-4 ', 'TR5-4'],
];

function kb(path) {
  return Math.round(statSync(path).size / 1024);
}

function codeFromName(name) {
  if (/^(I1|I2|T4)\.jpg$/i.test(name)) return null;
  const base = name.replace(/\.jpg$/i, '');
  if (/^(C4|D1|I3|I5|MENU|P9|PIOTR|R2|W4|X1|Y1)$/i.test(base)) return null;
  if (/^[A-Z0-9-]+\.jpg$/i.test(name) && !name.includes(' ')) return null;
  for (const [prefix, code] of PREFIX_TO_CODE) {
    if (name.toLowerCase().startsWith(prefix.toLowerCase())) return code;
  }
  return null;
}

function resizeTo(outPath, inPath) {
  execSync(
    `npx --yes sharp-cli -i "${inPath}" -o "${outPath}" resize 1800 1200 --fit cover --quality 80`,
    { stdio: 'inherit', cwd: root },
  );
}

const report = [];

for (const name of readdirSync(beelden)) {
  if (!name.toLowerCase().endsWith('.jpg')) continue;
  const code = codeFromName(name);
  if (!code) continue;
  const src = join(beelden, name);
  const dest = join(beelden, `${code}.jpg`);
  if (existsSync(dest) && src !== dest) {
    report.push({ code, status: 'dubbel', file: name, kb: kb(src) });
    continue;
  }
  const kbVoor = kb(src);
  copyFileSync(src, join(bronDir, name));
  const tmp = join(beelden, `_tmp_${code}.jpg`);
  resizeTo(tmp, src);
  renameSync(tmp, dest);
  if (src !== dest) unlinkSync(src);
  report.push({ code, file: name, kbVoor, kbNa: kb(dest) });
}

const d1 = join(beelden, 'D1.jpg');
const l4 = join(beelden, 'L4.jpg');
if (existsSync(d1) && !existsSync(l4)) {
  const kbVoor = kb(d1);
  copyFileSync(d1, join(bronDir, 'L4-bron-kopie-van-D1.jpg'));
  const tmp = join(beelden, '_tmp_L4.jpg');
  resizeTo(tmp, d1);
  renameSync(tmp, l4);
  report.push({ code: 'L4', file: 'D1.jpg (kopie)', kbVoor, kbNa: kb(l4) });
}

console.log(JSON.stringify(report, null, 2));
