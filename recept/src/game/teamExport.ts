import { isFullEpisode } from '@data/episodes/meta';
import { DILEMMA_EP4_PIOTR } from '@data/dilemmas/ep4-piotr';
import { MT_ROLLEN } from '@data/rollen';
import { ROL_BELANG } from '@data/rolBelang';
import { roundDefFor } from './roundSource';
import type { GameUiState, Phase } from './uiTypes';

export type TeamExport = {
  exportedAt: string;
  episode: number;
  playerName: string;
  opvolging: GameUiState['opvolging'];
  conceptLog: string[];
  phase: Phase;
  rounds: unknown[];
  dilemma: GameUiState['dilemma'] | (GameUiState['dilemma'] & { titel?: string });
  hidden: GameUiState['hidden'];
  gok: GameUiState['gok'];
};

export function buildTeamExport(state: GameUiState): TeamExport {
  const rounds: TeamExport['rounds'] = [];
  const rNums = isFullEpisode(state.episode) ? ([1, 2] as const) : ([1] as const);

  for (const n of rNums) {
    const ui = state.rounds[n];
    const res = state.results[n];
    const D = isFullEpisode(state.episode) ? roundDefFor({ ...state, round: n }) : roundDefFor(state);
    const verm = D.verm.find((v) => v.id === ui.verm);
    rounds.push({
      round: n,
      label: D.label,
      acties: ui.acties,
      vermoeden: verm ? { id: verm.id, titel: verm.t, q: verm.q } : null,
      pilot: ui.pilot,
      interventies: ui.cards,
      motivatie: ui.mot,
      minderheid: ui.minOn ? ui.min : null,
      weging: ui.w,
      begroting: ui.bud,
      rolStandpunten: MT_ROLLEN.map((ro) => ({
        rol: ro.n,
        gesproken: ui.spoken.includes(ro.id),
        belangOnthuld: ROL_BELANG[n]?.[ro.id] ?? '',
      })),
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
          titel: state.episode === 4 ? DILEMMA_EP4_PIOTR.titel : undefined,
        }
      : state.dilemma,
    hidden: state.hidden,
    gok: state.gok,
  };
}

export function downloadTeamExport(state: GameUiState) {
  const data = buildTeamExport(state);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recept-team-${state.playerName || 'mt'}-ep${state.episode}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
