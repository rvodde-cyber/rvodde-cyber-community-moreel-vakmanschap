import { BERICHTEN, type BerichtDef } from '@data/berichten';
import type { GameUiState } from './uiTypes';

export function berichtDef(id: string, state: GameUiState): BerichtDef | undefined {
  return state.dynamicBerichten[id] ?? BERICHTEN.find((m) => m.id === id);
}

export function phaseDeliveryKey(round: 1 | 2, phase: 'onderzoek' | 'besluit'): string {
  return `${round}-${phase}`;
}

/** Simulated klok — referentie start 09:14 MA / DI ronde 2 */
export function chatTimeLabel(round: 1 | 2): string {
  const base = round === 2 ? 9 * 3600 + 14 * 60 + 45 : 9 * 3600 + 14 * 60;
  const h = Math.floor(base / 3600) % 24;
  const m = Math.floor(base / 60) % 60;
  const pad = (n: number) => (n < 10 ? `0${n}` : String(n));
  return `${pad(h)}:${pad(m)}`;
}

export function berichtCtx(state: GameUiState) {
  return {
    playerName: state.playerName,
    res1: state.results[1],
  };
}

export function piotrDelivered(state: GameUiState): boolean {
  return state.inbox.includes('piotr');
}
