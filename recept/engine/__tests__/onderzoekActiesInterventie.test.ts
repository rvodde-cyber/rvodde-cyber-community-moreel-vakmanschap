import { describe, expect, it } from 'vitest';
import { A1_ROUNDS } from '@data/episodes/a1Rounds';
import { A2_ROUNDS } from '@data/episodes/a2Rounds';
import { A3_ROUNDS } from '@data/episodes/a3Rounds';
import { A5_ROUNDS } from '@data/episodes/a5Rounds';
import { ROUNDS } from '@data/rounds';

const INTERVENTIE_ROUNDS = [
  { label: 'A1', rounds: A1_ROUNDS },
  { label: 'A2', rounds: A2_ROUNDS },
  { label: 'A3', rounds: A3_ROUNDS },
  { label: 'A5', rounds: A5_ROUNDS },
] as const;

/** Signaalregel: begint met pijl, hoofdletters, geen sluitpunt; signalen gescheiden door twee spaties */
function assertSigValid(sig: string) {
  expect(sig.length).toBeGreaterThan(0);
  expect(sig.startsWith('▲') || sig.startsWith('▼')).toBe(true);
  expect(sig.endsWith('.')).toBe(false);
  expect(/[a-z]/.test(sig)).toBe(false);
  const parts = sig.split(/\s{2,}/).map((p) => p.trim());
  for (const p of parts) {
    expect(p.startsWith('▲') || p.startsWith('▼')).toBe(true);
  }
}

describe('Onderzoeken interventie-afleveringen (A1, A2, A3, A5)', () => {
  it('elke ronde heeft precies 5 acties met inhoud; geen … in quote', () => {
    for (const { label, rounds } of INTERVENTIE_ROUNDS) {
      for (const r of [1, 2] as const) {
        const def = rounds[r];
        expect(def.acties, `${label} r${r}`).toHaveLength(5);
        for (const a of def.acties) {
          expect(a.t.trim().length, `${label} r${r} ${a.id} t`).toBeGreaterThan(0);
          expect(a.quote.trim().length, `${label} r${r} ${a.id} quote`).toBeGreaterThan(0);
          expect(a.quote, `${label} r${r} ${a.id}`).not.toMatch(/…/);
          assertSigValid(a.sig);
        }
      }
    }
  });

  it('A4-demo (data/rounds.ts): ronde 1 acties ongewijzigd in aantal en eerste signaal', () => {
    const r1 = ROUNDS[1];
    expect(r1.acties).toHaveLength(6);
    expect(r1.acties[0]?.sig).toBe('▲ TEMPO  ▼ REGELRUIMTE');
    const exit = r1.acties.find((a) => a.id === 'exit');
    expect(exit?.quote).toContain('nummer');
  });
});
