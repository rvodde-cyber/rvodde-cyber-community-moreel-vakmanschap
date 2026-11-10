import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, afterEach } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { act, type ReactNode } from 'react';
import { validateArgumentField } from '@data/schemas/argument.schema';
import { freshEpisode } from '../game/budgetUi';
import { gameReducer } from '../game/gameReducer';
import { migrateGameState } from '../game/migrateState';
import { buildTeamExport, normalizeRoundFromImport } from '../game/teamExport';
import { UiModalsProvider } from '../context/UiModalsContext';
import { PosterTypographyScope } from '../components/PosterTypographyScope';
import { ArgumentPhase } from './phases/ArgumentPhase';
import { HomeScreen } from './HomeScreen';

const ARG = 'Wij kiezen dit omdat Lies en de buren eerst gehoord moeten worden.';
const TEGEN = 'Sneller kan ook fouten geven.';

function renderUi(node: ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root: Root = createRoot(container);
  act(() => {
    root.render(<UiModalsProvider onExitMenu={() => {}}>{node}</UiModalsProvider>);
  });
  return { container, root };
}

function confirmWithArgument(state: ReturnType<typeof freshEpisode>) {
  let s = gameReducer(state, { type: 'PROCEED_TO_ARGUMENT' });
  s = {
    ...s,
    rounds: {
      ...s.rounds,
      [s.round]: { ...s.rounds[s.round], argument: ARG, tegenargument: TEGEN },
    },
  };
  return gameReducer(s, { type: 'CONFIRM_BESLUIT' });
}

describe('argument stap', () => {
  let root: Root | null = null;

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    document.body.innerHTML = '';
  });

  it('(c) bevestigen uit bij korte velden, aan bij geldige', () => {
    let s = freshEpisode(1);
    s = {
      ...s,
      phase: 'besluit',
      rounds: { ...s.rounds, 1: { ...s.rounds[1], cards: ['a1-1-1', 'a1-1-2'] } },
    };
    s = gameReducer(s, { type: 'PROCEED_TO_ARGUMENT' });
    const r = renderUi(
      <PosterTypographyScope>
        <ArgumentPhase state={s} dispatch={() => {}} />
      </PosterTypographyScope>,
    );
    root = r.root;
    const btn = r.container.querySelector<HTMLButtonElement>('.btn.gold.big');
    expect(btn?.disabled).toBe(true);
    s = {
      ...s,
      rounds: { ...s.rounds, 1: { ...s.rounds[1], argument: ARG, tegenargument: TEGEN } },
    };
    const r2 = renderUi(
      <PosterTypographyScope>
        <ArgumentPhase state={s} dispatch={() => {}} />
      </PosterTypographyScope>,
    );
    root = r2.root;
    const btn2 = r2.container.querySelector<HTMLButtonElement>('.btn.gold.big');
    expect(btn2?.disabled).toBe(false);
  });

  it('(d) validate weigert te lange tekens', () => {
    expect(validateArgumentField('x'.repeat(281), 'ok genoeg lang').ok).toBe(false);
    expect(validateArgumentField('x'.repeat(20), 'y'.repeat(141)).ok).toBe(false);
  });

  it('(e) export bevat argument; import zonder velden werkt', () => {
    const s = {
      ...freshEpisode(1),
      rounds: {
        ...freshEpisode(1).rounds,
        1: {
          ...freshEpisode(1).rounds[1],
          cards: ['a1-1-1', 'a1-1-2'],
          argument: ARG,
          tegenargument: TEGEN,
        },
      },
    };
    const ex = buildTeamExport(s);
    expect(ex.rounds[0]?.argument).toBe(ARG);
    expect(ex.rounds[0]?.tegenargument).toBe(TEGEN);
    const legacy = normalizeRoundFromImport({ motivatie: 'Oude mot', tegenargument: '' });
    expect(legacy.argument).toBe('Oude mot');
    expect(normalizeRoundFromImport({}).argument).toBe('');
  });

  it('(b) migratie met spoken en mot blijft geldig', () => {
    const raw = {
      ...freshEpisode(1),
      v: 4,
      rounds: {
        1: {
          ...freshEpisode(1).rounds[1],
          spoken: ['dir', 'fin', 'hr', 'or'],
          mot: 'Oude MT-zin',
        },
        2: freshEpisode(1).rounds[2],
      },
    };
    const m = migrateGameState(raw);
    expect(m?.rounds[1].spoken).toHaveLength(4);
    expect(m?.rounds[1].argument).toBe('Oude MT-zin');
  });

  it('flow: besluit → argument → gesprek', () => {
    let s = freshEpisode(1);
    s = {
      ...s,
      phase: 'besluit',
      rounds: { ...s.rounds, 1: { ...s.rounds[1], cards: ['a1-1-1', 'a1-1-2'] } },
    };
    s = confirmWithArgument(s);
    expect(s.phase).toBe('gesprek');
  });

  it('CONFIRM_BESLUIT in besluit-fase doet niets', () => {
    let s = freshEpisode(1);
    s = {
      ...s,
      phase: 'besluit',
      rounds: { ...s.rounds, 1: { ...s.rounds[1], cards: ['a1-1-1', 'a1-1-2'], argument: ARG, tegenargument: TEGEN } },
    };
    const before = s;
    s = gameReducer(s, { type: 'CONFIRM_BESLUIT' });
    expect(s).toBe(before);
  });
});

describe('rolverdeling UI', () => {
  it('(a) RoleBelangModal is verwijderd en geen RONDJE MT in BesluitPhase', () => {
    const modalPath = resolve('src/components/modals/RoleBelangModal.tsx');
    expect(existsSync(modalPath)).toBe(false);
    const besluit = readFileSync(resolve('src/screens/phases/BesluitPhase.tsx'), 'utf8');
    expect(besluit).not.toMatch(/RONDJE MT/);
    expect(besluit).not.toMatch(/openRole/);
  });
});

describe('HomeScreen naam', () => {
  let root: Root | null = null;

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = null;
    }
    document.body.innerHTML = '';
  });

  it('(g) nieuwe teksten en fout bij korte naam', () => {
    const r = renderUi(
      <PosterTypographyScope>
        <HomeScreen
          name="A"
          hasSave={false}
          onName={() => {}}
          dispatch={() => {}}
          onStart={() => {}}
          onResume={() => {}}
        />
      </PosterTypographyScope>,
    );
    root = r.root;
    const text = r.container.textContent ?? '';
    expect(text).toContain('Bedenk een naam voor de zus');
    expect(text).toContain('Naam van de zus');
    expect(text).toContain('Kies een naam van minstens 2 tekens');
    expect(r.container.querySelector<HTMLButtonElement>('.landing-ep-card')?.disabled).toBe(true);
  });
});
