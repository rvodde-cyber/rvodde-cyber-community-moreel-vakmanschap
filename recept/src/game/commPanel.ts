import { episodeContent } from '@data/episodes/content';
import type { GameUiState } from './uiTypes';

const PLAY_PHASES = new Set(['onderzoek', 'besluit', 'argument', 'uitkomst']);

export function showPhonePanel(state: GameUiState): boolean {
  const content = episodeContent(state.episode);
  if (!content.usesDemoBudget) return false;
  return PLAY_PHASES.has(state.phase);
}

export function showBriefjePanel(state: GameUiState): boolean {
  const content = episodeContent(state.episode);
  const def = content.dilemma;
  if (!def || def.privéBericht.kanaal !== 'briefje') return false;
  if (state.round !== def.ronde) return false;
  return PLAY_PHASES.has(state.phase);
}

export function showSmsDilemmaPanel(state: GameUiState): boolean {
  const content = episodeContent(state.episode);
  const def = content.dilemma;
  if (!def || def.privéBericht.kanaal !== 'sms2009') return false;
  if (state.round !== def.ronde) return false;
  return PLAY_PHASES.has(state.phase);
}

/** Lens-dilemma (A5): kanaal lens + dil, niet de A4-demo-telefoon. */
export function showLensDilemmaPanel(state: GameUiState): boolean {
  const content = episodeContent(state.episode);
  const def = content.dilemma;
  if (!def || def.privéBericht.kanaal !== 'lens' || !def.privéBericht.dil) return false;
  if (content.usesDemoBudget) return false;
  if (state.round !== def.ronde) return false;
  return PLAY_PHASES.has(state.phase);
}
