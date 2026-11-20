import { describe, expect, it } from 'vitest';
import {
  COLD_OPENING_KOP,
  SCENE_BRIEFING_BODY,
  SCENE_BRIEFING_FOLLOW,
  SCENE_BRIEFING_TIMER_HINT,
} from '../../src/game/coldOpenCopy';
import { EPISODES } from '@data/episodes/meta';

describe('openingsscène briefing', () => {
  it('(d) vaste kop en briefingteksten voor alle afleveringen', () => {
    expect(COLD_OPENING_KOP).toBe('OPENINGSSCÈNE');
    expect(SCENE_BRIEFING_BODY).toContain('vlak voordat jullie beslissen');
    expect(SCENE_BRIEFING_BODY).toContain('onder tafel');
    expect(SCENE_BRIEFING_FOLLOW).toContain('twee interventies');
    expect(SCENE_BRIEFING_TIMER_HINT).toContain('op de knop drukken');
    expect(EPISODES).toHaveLength(5);
  });
});
