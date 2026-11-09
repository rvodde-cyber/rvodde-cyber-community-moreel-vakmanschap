import { describe, expect, it } from 'vitest';
import { UITLEG_NAV, UITLEG_TIJDLIJN } from '@content/uitleg';
import { EPISODES } from '@data/episodes/meta';

describe('uitleg navigatie', () => {
  it('heeft precies elf secties in de inhoudsopgave', () => {
    expect(UITLEG_NAV).toHaveLength(11);
    const ids = new Set(UITLEG_NAV.map((n) => n.id));
    expect(ids.size).toBe(11);
  });

  it('tijdlijn: titels uit aflevering-meta', () => {
    expect(UITLEG_TIJDLIJN).toHaveLength(5);
    for (const row of UITLEG_TIJDLIJN) {
      const meta = EPISODES.find((e) => e.id === row.deel);
      expect(meta?.titel).toBe(row.titel);
    }
    expect(UITLEG_TIJDLIJN.find((r) => r.deel === 4)?.titel).toBe('Het dashboard liegt niet');
    expect(UITLEG_TIJDLIJN.find((r) => r.deel === 4)?.speelt).not.toContain('Het dashboard liegt niet');
  });
});
