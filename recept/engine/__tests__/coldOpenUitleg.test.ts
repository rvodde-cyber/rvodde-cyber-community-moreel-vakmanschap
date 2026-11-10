import { describe, expect, it } from 'vitest';
import { COLD_OPENING_KOP, COLD_OPENING_UITLEG } from '../../src/game/coldOpenCopy';
import { EPISODES } from '@data/episodes/meta';

describe('openingsscène uitleglijn', () => {
  it('(d) vaste kop en uitleg voor alle afleveringen', () => {
    expect(COLD_OPENING_KOP).toBe('OPENINGSSCÈNE');
    expect(COLD_OPENING_UITLEG).toContain('vlak voordat jullie beslissen');
    expect(COLD_OPENING_UITLEG).toContain('onder tafel');
    expect(EPISODES).toHaveLength(5);
  });
});
