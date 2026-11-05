import { describe, expect, it } from 'vitest';
import { COLD_OPEN } from '@data/coldOpen';
import { DILEMMA_EP1_FRANS } from '@data/dilemmas/ep1-frans';
import { DILEMMA_EP4_PIOTR } from '@data/dilemmas/ep4-piotr';
import { buildSlotEp1 } from '@data/filmSequences';
import { COLD_OPEN_EP1 } from '@data/episodes/coldOpenEp1';
import {
  EPISODE_CONTENT,
  episodeContent,
  isFullEpisode,
} from '@data/episodes/content';
import type { EpisodeId } from '@data/episodes/meta';
import { ROUNDS } from '@data/rounds';
import { SKELETON_COLD } from '@data/skeleton/coldOpen';
import { SKELETON_SLOTS, SKELETON_TRAILERS } from '@data/skeleton/film';
import { SKELETON_ROUNDS } from '@data/skeleton/rounds';
import { slotLineRonde1, slotLinesFinale } from '@data/slotLines';
import { slotLineA1 } from '@data/slotLineA1';
import { TRAILER_RONDE_1, TRAILER_RONDE_2 } from '@data/filmSequences';
import { roundDefEpisode, roundDefFor } from '../../src/game/roundSource';
import { freshEpisode } from '../../src/game/budgetUi';
import { showBriefjePanel, showPhonePanel } from '../../src/game/commPanel';
import type { GameUiState } from '../../src/game/uiTypes';

const ALL_EPS: EpisodeId[] = [1, 2, 3, 4, 5];

describe('EPISODE_CONTENT register', () => {
  it('has an entry for episodes 1 through 5', () => {
    for (const id of ALL_EPS) {
      expect(EPISODE_CONTENT[id]).toBeDefined();
      expect(episodeContent(id).rounds[1]).toBeDefined();
    }
  });

  it('isFullEpisode true for 1 and 4, false for 2, 3 and 5', () => {
    expect(isFullEpisode(1)).toBe(true);
    expect(isFullEpisode(4)).toBe(true);
    for (const id of [2, 3, 5] as const) {
      expect(isFullEpisode(id)).toBe(false);
    }
  });
});

describe('episode 1 content (stap 2)', () => {
  const c = episodeContent(1);

  it('(a) cold opens: line counts and first/last lines', () => {
    expect(c.coldOpen[1]).toEqual(COLD_OPEN_EP1[1]);
    expect(c.coldOpen[2]).toEqual(COLD_OPEN_EP1[2]);
    expect(c.coldOpen[1]!.lines).toHaveLength(8);
    expect(c.coldOpen[2]!.lines).toHaveLength(5);
    expect(c.coldOpen[1]!.lines[0]![1]).toBe('Zondagavond. Het kasboek ligt open op de keukentafel.');
    expect(c.coldOpen[1]!.lines[7]![1]).toBe('Maandag, half zeven. In de schuur wachten vier problemen tegelijk.');
    expect(c.coldOpen[2]!.lines[4]![1]).toBe(
      "Donderdag, kwart voor vijf. Tussen de pagina's van het kasboek zit een briefje.",
    );
  });

  it('register: two rounds, dilemma ep1-frans, slotLines', () => {
    expect(c.roundCount).toBe(2);
    expect(c.dilemma?.id).toBe('ep1-frans');
    expect(c.slotLines).not.toBeNull();
    expect(c.usesDemoBudget).toBe(false);
  });

  it('(b) ep1-frans: three choices, minTekst 10, effects', () => {
    expect(DILEMMA_EP1_FRANS.keuzes).toHaveLength(3);
    expect(DILEMMA_EP1_FRANS.effecten.prive.minTekst).toBe(10);
    expect(DILEMMA_EP1_FRANS.effecten.niets).toMatchObject({ eerlijkheid: -8, menselijkeMaat: -10 });
    expect(DILEMMA_EP1_FRANS.effecten.groep).toMatchObject({ eerlijkheid: 6, menselijkeMaat: -2 });
    expect(DILEMMA_EP1_FRANS.effecten.prive).toMatchObject({ eerlijkheid: 4, menselijkeMaat: 8 });
    expect(DILEMMA_EP1_FRANS.privéBericht.kanaal).toBe('briefje');
  });

  it('(c) briefje channel: BriefjePanel yes, PhonePanel no in r2 besluit', () => {
    const state: GameUiState = {
      ...freshEpisode(1),
      round: 2,
      phase: 'besluit',
    };
    expect(showBriefjePanel(state)).toBe(true);
    expect(showPhonePanel(state)).toBe(false);
  });

  it('(d) slotLineA1 both variants', () => {
    const snel = slotLineA1(['a1-1-4', 'a1-2-2', 'other']);
    expect(snel).toContain('keigoed');
    const anders = slotLineA1(['a1-1-1']);
    expect(anders).toContain('kasboek');
  });

  it('(e) pauzekaart: two questions and three prediction options', () => {
    expect(c.pauzeKaart?.tafelvragen).toHaveLength(2);
    expect(c.pauzeKaart?.voorspelling.opties).toHaveLength(3);
  });

  it('slot-ep1 script id and duration', () => {
    const script = buildSlotEp1('test');
    expect(script.id).toBe('slot-ep1');
    expect(script.duration).toBe(27000);
  });
});

describe('episode 4 golden (unchanged references)', () => {
  const c = episodeContent(4);

  it('(f) rounds match ROUNDS', () => {
    expect(c.rounds[1]).toBe(ROUNDS[1]);
    expect(c.rounds[2]).toBe(ROUNDS[2]);
  });

  it('cold open matches COLD_OPEN', () => {
    expect(c.coldOpen[1]).toBe(COLD_OPEN[1]);
    expect(c.coldOpen[2]).toBe(COLD_OPEN[2]);
  });

  it('dilemma is DILEMMA_EP4_PIOTR with same effects', () => {
    expect(c.dilemma).toBe(DILEMMA_EP4_PIOTR);
    expect(c.dilemma?.effecten).toEqual(DILEMMA_EP4_PIOTR.effecten);
  });

  it('slot line builders are unchanged', () => {
    expect(c.slotLines?.ronde1).toBe(slotLineRonde1);
    expect(c.slotLines?.finale).toBe(slotLinesFinale);
  });

  it('film trailers match legacy exports', () => {
    expect(c.film.trailerR1).toBe(TRAILER_RONDE_1);
    expect(c.film.trailerR2).toBe(TRAILER_RONDE_2);
  });

  it('roundDefFor matches ROUNDS for fresh ep4 state', () => {
    const state = freshEpisode(4);
    expect(roundDefFor({ ...state, round: 1 })).toBe(ROUNDS[1]);
    expect(roundDefFor({ ...state, round: 2 })).toBe(ROUNDS[2]);
  });
});

describe('skeleton episodes (2, 3, 5)', () => {
  it.each([2, 3, 5] as const)('ep %i uses skeleton round and film', (ep) => {
    const c = episodeContent(ep);
    expect(c.roundCount).toBe(1);
    expect(c.dilemma).toBeNull();
    expect(c.slotLines).toBeNull();
    expect(c.usesDemoBudget).toBe(false);
    expect(c.rounds[1]).toBe(SKELETON_ROUNDS[ep]);
    expect(c.coldOpen[1]).toBe(SKELETON_COLD[ep]);
    expect(c.film.trailerR1).toBe(SKELETON_TRAILERS[ep]);
    expect(c.film.slotSkeleton).toBe(SKELETON_SLOTS[ep]);
    expect(roundDefEpisode(ep, 1)).toBe(SKELETON_ROUNDS[ep]);
  });
});
