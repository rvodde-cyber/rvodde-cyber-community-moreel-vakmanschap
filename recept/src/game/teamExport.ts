import { episodeContent } from '@data/episodes/content';
import { roundDefFor } from './roundSource';
import type { GameUiState, Phase } from './uiTypes';
import type { GesprekskaartExportEntry } from '@data/schemas/gesprekskaart.schema';
import { TEAM_EXPORT_GESPREK_VERSION } from '@data/schemas/gesprekskaart.schema';
import { WAARDEN } from '@data/schemas/gesprekskaart.schema';

export type TeamExportRound = {
  round: number;
  label: string;
  acties: string[];
  vermoeden: { id: string; titel: string; q: number } | null;
  pilot: string | null;
  interventies: string[];
  argument: string;
  tegenargument: string;
  /** @deprecated oude export — alleen import */
  motivatie?: string;
  minderheid?: string | null;
  weging: [string, string, string];
  begroting: Record<string, number>;
  uitkomst: {
    P0: number;
    W: number;
    B: number;
    winst: number;
    verzuim: number;
  } | null;
};

export type TeamExport = {
  exportVersion: number;
  exportedAt: string;
  episode: number;
  playerName: string;
  opvolging: GameUiState['opvolging'];
  conceptLog: string[];
  phase: Phase;
  rounds: TeamExportRound[];
  dilemma: GameUiState['dilemma'] | (GameUiState['dilemma'] & { titel?: string });
  hidden: GameUiState['hidden'];
  gok: GameUiState['gok'];
  gesprekskaarten: GesprekskaartExportEntry[];
};

/** Oude of nieuwe export-ronde — zonder crash bij ontbrekende velden. */
export function normalizeRoundFromImport(raw: unknown): Pick<TeamExportRound, 'argument' | 'tegenargument'> {
  if (!raw || typeof raw !== 'object') return { argument: '', tegenargument: '' };
  const r = raw as TeamExportRound & { rolStandpunten?: unknown };
  return {
    argument: (r.argument ?? r.motivatie ?? '').trim(),
    tegenargument: (r.tegenargument ?? '').trim(),
  };
}

export function buildTeamExport(state: GameUiState): TeamExport {
  const content = episodeContent(state.episode);
  const rounds: TeamExportRound[] = [];
  const rNums = content.roundCount === 2 ? ([1, 2] as const) : ([1] as const);

  for (const n of rNums) {
    const ui = state.rounds[n];
    const res = state.results[n];
    const D = roundDefFor({ ...state, round: n });
    const verm = D.verm.find((v) => v.id === ui.verm);
    rounds.push({
      round: n,
      label: D.label,
      acties: ui.acties,
      vermoeden: verm ? { id: verm.id, titel: verm.t, q: verm.q } : null,
      pilot: ui.pilot,
      interventies: ui.cards,
      argument: ui.argument.trim(),
      tegenargument: ui.tegenargument.trim(),
      weging: ui.w,
      begroting: ui.bud,
      uitkomst: res
        ? {
            P0: res.P0,
            W: res.W,
            B: res.B,
            winst: res.winst,
            verzuim: res.verz,
          }
        : null,
    });
  }

  return {
    exportVersion: TEAM_EXPORT_GESPREK_VERSION,
    exportedAt: new Date().toISOString(),
    episode: state.episode,
    playerName: state.playerName,
    opvolging: state.opvolging,
    conceptLog: state.conceptLog,
    phase: state.phase,
    rounds,
    dilemma: state.dilemma.done
      ? {
          ...state.dilemma,
          titel: content.dilemma?.titel,
        }
      : state.dilemma,
    hidden: state.hidden,
    gok: state.gok,
    gesprekskaarten: state.gesprekskaarten,
  };
}

export function waardeLabels(ids: string[]): string[] {
  const map = new Map(WAARDEN.map((w) => [w.id, w.label]));
  return ids.map((id) => map.get(id as (typeof WAARDEN)[number]['id']) ?? id);
}

export function downloadTeamExport(state: GameUiState) {
  const data = buildTeamExport(state);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recept-team-${state.playerName || 'team'}-ep${state.episode}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
