import { describe, expect, it, vi, afterEach } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act, type ReactNode } from 'react';
import { EPISODE_CONTENT } from '@data/episodes/content';
import { INTRO_SCENE } from '@data/sceneCodes';
import { showsSkeletLabel } from '@data/episodes/motor';
import type { EpisodeId } from '@data/episodes/meta';
import { freshEpisode } from '../game/budgetUi';
import { UiModalsProvider } from '../context/UiModalsContext';
import { PosterTypographyScope } from '../components/PosterTypographyScope';
import { HomeScreen } from './HomeScreen';
import { IntroPhase } from './phases/IntroPhase';

function renderUi(node: ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root: Root = createRoot(container);
  act(() => {
    root.render(<UiModalsProvider onExitMenu={() => {}}>{node}</UiModalsProvider>);
  });
  return { container, root };
}

describe('Landingspagina HomeScreen', () => {
  let root: Root | null = null;

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    document.body.innerHTML = '';
  });

  it('(a) toont h1 RECEPT en vijf afleverkaarten', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <HomeScreen
          name=""
          hasSave={false}
          onName={() => {}}
          dispatch={() => {}}
          onStart={() => {}}
          onResume={() => {}}
        />
      </PosterTypographyScope>,
    );
    root = r.root;
    expect(r.container.querySelector('h1.landing-title')?.textContent).toBe('RECEPT');
    expect(r.container.querySelectorAll('.landing-ep-card')).toHaveLength(5);
  });

  it('(b) kaarten disabled bij korte voornaam, actief daarna', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <HomeScreen
          name="M"
          hasSave={false}
          onName={() => {}}
          dispatch={() => {}}
          onStart={() => {}}
          onResume={() => {}}
        />
      </PosterTypographyScope>,
    );
    root = r.root;
    const cards = r.container.querySelectorAll<HTMLButtonElement>('.landing-ep-card');
    expect(cards[0]?.disabled).toBe(true);

    act(() => {
      r.root.render(
        <UiModalsProvider onExitMenu={() => {}}>
          <PosterTypographyScope>
            <HomeScreen
              name="Marja"
              hasSave={false}
              onName={() => {}}
              dispatch={() => {}}
              onStart={() => {}}
              onResume={() => {}}
            />
          </PosterTypographyScope>
        </UiModalsProvider>,
      );
    });
    const cards2 = r.container.querySelectorAll<HTMLButtonElement>('.landing-ep-card');
    expect(cards2[0]?.disabled).toBe(false);
  });

  it('(c) klik dispatcht SET_NAME en START_EPISODE', () => {
    const dispatch = vi.fn<(a: import('../game/gameReducer').GameAction) => void>();
    const onStart = vi.fn();
    const r = renderUi(
      <PosterTypographyScope>
        <HomeScreen
          name="Marja"
          hasSave={false}
          onName={() => {}}
          dispatch={dispatch}
          onStart={onStart}
          onResume={() => {}}
        />
      </PosterTypographyScope>,
    );
    root = r.root;
    const btn = r.container.querySelectorAll<HTMLButtonElement>('.landing-ep-card')[2];
    act(() => btn?.click());
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_NAME', name: 'Marja' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'START_EPISODE', episode: 3 });
    expect(onStart).toHaveBeenCalled();
  });

  it('(d) label Skelet alleen A2, A3, A5', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <HomeScreen
          name="xx"
          hasSave={false}
          onName={() => {}}
          dispatch={() => {}}
          onStart={() => {}}
          onResume={() => {}}
        />
      </PosterTypographyScope>,
    );
    root = r.root;
    const statuses = [...r.container.querySelectorAll('.landing-ep-card__status')].map(
      (el) => el.textContent?.trim(),
    );
    expect(statuses[0]).toBe('Speelbaar');
    expect(statuses[1]).toBe('Skelet');
    expect(statuses[2]).toBe('Skelet');
    expect(statuses[3]).toBe('Speelbaar');
    expect(statuses[4]).toBe('Skelet');
    expect(showsSkeletLabel(1)).toBe(false);
  });

  it('(e) dataregel is aria-hidden', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <HomeScreen
          name=""
          hasSave={false}
          onName={() => {}}
          dispatch={() => {}}
          onStart={() => {}}
          onResume={() => {}}
        />
      </PosterTypographyScope>,
    );
    root = r.root;
    expect(r.container.querySelector('.landing-data')?.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('Intro register en IntroPhase', () => {
  const ALL: EpisodeId[] = [1, 2, 3, 4, 5];

  it('(f) elke aflevering heeft introbeeld-velden en INTRO_SCENE', () => {
    for (const id of ALL) {
      const c = EPISODE_CONTENT[id];
      expect(c.introBeeldAlt.length).toBeGreaterThan(10);
      expect(c.introBeeldTekst).toMatch(/\d{4}/);
      expect(INTRO_SCENE[id].fileCode).toBeTruthy();
    }
  });

  let root: Root | null = null;
  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    document.body.innerHTML = '';
  });

  it('(g) A1 intro rendert beeld met alt uit register', () => {
    const state = { ...freshEpisode(1), phase: 'intro' as const, round: 1 as const };
    const r = renderUi(<IntroPhase state={state} dispatch={() => {}} />);
    root = r.root;
    const img = r.container.querySelector('.intro-beeld__frame img');
    expect(img?.getAttribute('alt')).toBe(EPISODE_CONTENT[1].introBeeldAlt);
  });

  it('(h) ontbrekend bestand toont plaatsaanduiding BEELD I2 VOLGT', () => {
    const state = { ...freshEpisode(2), phase: 'intro' as const, round: 1 as const };
    const r = renderUi(<IntroPhase state={state} dispatch={() => {}} />);
    root = r.root;
    const img = r.container.querySelector('.intro-beeld__frame img') as HTMLImageElement | null;
    expect(img).toBeTruthy();
    act(() => {
      img?.dispatchEvent(new Event('error'));
    });
    expect(r.container.textContent).toContain('BEELD I2 VOLGT');
  });

  it('(i) A4 introBeeldRechts uit: geen intro-split', () => {
    expect(EPISODE_CONTENT[4].introBeeldRechts).toBe(false);
    const state = { ...freshEpisode(4), phase: 'intro' as const, round: 1 as const };
    const r = renderUi(<IntroPhase state={state} dispatch={() => {}} />);
    root = r.root;
    expect(r.container.querySelector('.intro-split')).toBeNull();
    expect(r.container.querySelector('.cine')).toBeTruthy();
  });
});
