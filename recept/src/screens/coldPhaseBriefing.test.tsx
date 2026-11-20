import { describe, expect, it, afterEach, beforeEach, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act, useReducer } from 'react';
import { freshEpisode } from '../game/budgetUi';
import { gameReducer, type GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';
import { ColdPhase } from './phases/ColdPhase';
import { UiModalsProvider } from '../context/UiModalsContext';
import {
  COLD_OPENING_KOP,
  COLD_OPENING_UITLEG,
  SCENE_BRIEFING_BODY,
  SCENE_BRIEFING_FOLLOW,
} from '../game/coldOpenCopy';

function briefingStateA1(): GameUiState {
  const base = freshEpisode(1);
  return {
    ...base,
    phase: 'cold',
    round: 1,
    timerOn: false,
    tLeft: 600,
    rounds: {
      ...base.rounds,
      1: {
        ...base.rounds[1],
        sceneGestartOp: null,
        coldSub: 0,
        trailerDone: false,
      },
    },
  };
}

function ColdPhaseHarness({
  initial,
  onState,
}: {
  initial: GameUiState;
  onState?: (s: GameUiState) => void;
}) {
  const [state, dispatch] = useReducer(gameReducer, initial);
  onState?.(state);
  return <ColdPhase state={state} dispatch={dispatch as (a: GameAction) => void} />;
}

describe('ColdPhase — scène-briefing (DOM A1 r1)', () => {
  let root: Root | null = null;
  let container: HTMLDivElement | null = null;
  let latestState: GameUiState = briefingStateA1();

  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    if (container) {
      container.remove();
      container = null;
    }
    document.body.innerHTML = '';
  });

  function renderCold(initial = briefingStateA1()) {
    latestState = initial;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root!.render(
        <UiModalsProvider onExitMenu={() => {}}>
          <ColdPhaseHarness
            initial={initial}
            onState={(s) => {
              latestState = s;
            }}
          />
        </UiModalsProvider>,
      );
    });
    return container;
  }

  it('briefing zichtbaar, geen scène/trailer, timer uit; na start scène + timer; geen oude uitleglijn', () => {
    const c = renderCold();
    const text = () => c.textContent ?? '';

    expect(text()).toContain(COLD_OPENING_KOP);
    expect(text()).toContain(SCENE_BRIEFING_BODY);
    expect(text()).toContain(SCENE_BRIEFING_FOLLOW);
    const startBtn = c.querySelector<HTMLButtonElement>('.scene-briefing__start');
    expect(startBtn?.textContent).toMatch(/Start de scène/i);

    expect(c.querySelector('.cold-scene')).toBeNull();
    expect(c.querySelector('.cold-open-uitleg')).toBeNull();
    expect(text()).not.toContain(COLD_OPENING_UITLEG);
    expect(c.querySelector('.filmbtns .btn.gold')).toBeNull();
    expect(latestState.timerOn).toBe(false);
    expect(latestState.rounds[1].sceneGestartOp).toBeNull();

    act(() => {
      startBtn!.click();
    });

    expect(latestState.rounds[1].sceneGestartOp).not.toBeNull();
    expect(latestState.timerOn).toBe(true);
    expect(c.querySelector('.scene-briefing__start')).toBeNull();
    expect(c.querySelector('.filmbtns .btn.gold')).not.toBeNull();
    expect(text()).not.toContain(COLD_OPENING_UITLEG);
  });
});