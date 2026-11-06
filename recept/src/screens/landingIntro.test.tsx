import { describe, expect, it, vi, afterEach } from 'vitest';
import * as content from '@data/episodes/content';
import { createRoot, type Root } from 'react-dom/client';
import { act, type ReactNode } from 'react';
import { EPISODE_CONTENT } from '@data/episodes/content';
import { INTRO_SCENE } from '@data/sceneCodes';
import { showsSkeletLabel } from '@data/episodes/motor';
import type { EpisodeId } from '@data/episodes/meta';
import { freshEpisode } from '../game/budgetUi';
import { UiModalsProvider } from '../context/UiModalsContext';
import { PosterTypographyScope } from '../components/PosterTypographyScope';
import { PeriodTypographyScope } from '../components/PeriodTypographyScope';
import { episodeMeta } from '@data/episodes/meta';
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
    vi.restoreAllMocks();
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
    expect(r.container.textContent).toContain('worstenbroodjesfabriek');
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

  it('(d) alle vijf afleveringen: label Speelbaar (geen skeleton in register)', () => {
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
    expect(statuses.every((s) => s === 'Speelbaar')).toBe(true);
    for (const id of [1, 2, 3, 4, 5] as const) {
      expect(showsSkeletLabel(id)).toBe(false);
    }
  });

  it('hypothetische skeleton-aflevering in register toont label Schets', () => {
    vi.spyOn(content, 'episodeContent').mockImplementation((id) => {
      const base = content.EPISODE_CONTENT[id];
      if (id === 5) return { ...base, motorKind: 'skeleton' };
      return base;
    });
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
    expect(statuses[4]).toBe('Schets');
    expect(showsSkeletLabel(5)).toBe(true);
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

  it('(f) elke aflevering heeft introbeeld-velden, introLook en INTRO_SCENE', () => {
    for (const id of ALL) {
      const c = EPISODE_CONTENT[id];
      expect(c.introBeeldAlt.length).toBeGreaterThan(10);
      expect(c.introBeeldTekst).toBe(c.introLook.onderschrift);
      expect(c.introLook.kader).toBeTruthy();
      expect(c.introLook.tint).toBeTruthy();
      expect(c.introLook.kicker).toMatch(/AFLEVERING/);
      expect(c.introLook.onderschrift).toMatch(/\d{4}/);
      expect(INTRO_SCENE[id].fileCode).toBeTruthy();
    }
  });

  it('(a) introLook kader per aflevering', () => {
    expect(EPISODE_CONTENT[1].introLook.kader).toBe('polaroid');
    expect(EPISODE_CONTENT[2].introLook.kader).toBe('kettingpapier');
    expect(EPISODE_CONTENT[3].introLook.kader).toBe('venster');
    expect(EPISODE_CONTENT[4].introLook.kader).toBe('dashboard');
    expect(EPISODE_CONTENT[5].introLook.kader).toBe('glas');
  });

  function introWithPeriod(ep: EpisodeId) {
    const state = { ...freshEpisode(ep), phase: 'intro' as const, round: 1 as const };
    return renderUi(
      <PeriodTypographyScope periodKey={episodeMeta(ep).periodKey}>
        <IntroPhase state={state} dispatch={() => {}} />
      </PeriodTypographyScope>,
    );
  }

  it.each([
    [1, 'polaroid'],
    [2, 'kettingpapier'],
    [3, 'venster'],
    [5, 'glas'],
  ] as const)('(b) aflevering %i rendert intro-kader-%s', (ep, kader) => {
    const r = introWithPeriod(ep);
    root = r.root;
    expect(r.container.querySelector('#intro-split-scroll.intro-split-scroll')).toBeTruthy();
    expect(r.container.querySelector(`.intro-kader-${kader}`)).toBeTruthy();
    expect(r.container.querySelector(`.intro-kader-shell--${kader}`)).toBeTruthy();
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
    const r = introWithPeriod(1);
    root = r.root;
    const img = r.container.querySelector('.intro-beeld__frame img');
    expect(img?.getAttribute('alt')).toBe(EPISODE_CONTENT[1].introBeeldAlt);
  });

  it('(h) ontbrekend bestand toont plaatsaanduiding binnen kader', () => {
    const r = introWithPeriod(2);
    root = r.root;
    const img = r.container.querySelector('.intro-beeld__frame img') as HTMLImageElement | null;
    expect(img).toBeTruthy();
    act(() => {
      img?.dispatchEvent(new Event('error'));
    });
    expect(r.container.querySelector('.intro-beeld__frame')?.textContent).toContain('BEELD I2 VOLGT');
  });

  it('(e) venster-kader: decoratieve titelbalk aria-hidden', () => {
    const r = introWithPeriod(3);
    root = r.root;
    expect(r.container.querySelector('.intro-kader-venster-bar')?.getAttribute('aria-hidden')).toBe('true');
    expect(r.container.textContent).toContain('Van Gorp Machinebouw B.V.');
  });

  it('(i) A4 introBeeldRechts uit: geen intro-split', () => {
    expect(EPISODE_CONTENT[4].introBeeldRechts).toBe(false);
    const state = { ...freshEpisode(4), phase: 'intro' as const, round: 1 as const };
    const r = renderUi(<IntroPhase state={state} dispatch={() => {}} />);
    root = r.root;
    expect(r.container.querySelector('.intro-split')).toBeNull();
    expect(r.container.querySelector('.cine')).toBeTruthy();
    expect(r.container.textContent).toContain('managementteam (MT)');
    expect(r.container.textContent).toMatch(/HOE HET ZO VER KWAM/i);
    expect(r.container.textContent).toContain('Van Gorp Machinebouw B.V.');
  });

  it('A1 intro UI: geen conceptskelet, wel 8 punten', () => {
    const r = introWithPeriod(1);
    root = r.root;
    const t = r.container.textContent ?? '';
    expect(t.toLowerCase()).not.toContain('conceptskelet');
    expect(t).not.toMatch(/mln/i);
    expect(t).toContain('8 punten');
  });
});
