import { describe, expect, it, vi, afterEach } from 'vitest';
import * as content from '@data/episodes/content';
import { showsSkeletLabel } from '@data/episodes/motor';
import type { EpisodeId } from '@data/episodes/meta';

describe('showsSkeletLabel — hypothetisch skeleton in register', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('geeft true wanneer episodeContent motorKind skeleton teruggeeft (mock)', () => {
    vi.spyOn(content, 'episodeContent').mockImplementation((id: EpisodeId) => {
      const base = content.EPISODE_CONTENT[id];
      if (id === 2) {
        return { ...base, motorKind: 'skeleton' };
      }
      return base;
    });
    expect(showsSkeletLabel(2)).toBe(true);
    expect(showsSkeletLabel(1)).toBe(false);
  });
});
