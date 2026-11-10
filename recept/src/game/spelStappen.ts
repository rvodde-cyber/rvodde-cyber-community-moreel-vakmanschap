import { episodeContent } from '@data/episodes/content';
import type { EpisodeId } from '@data/episodes/meta';
import type { Phase } from './uiTypes';

/** Zelfde titels als `UITLEG_STAPPEN` in content/uitleg.ts (sectie Zo loopt een deel). */
export const STAP_KIJK = 'Kijk';
export const STAP_ONDERZOEK = 'Onderzoek';
export const STAP_BESLIS = 'Beslis';
export const STAP_LEG_UIT = 'Leg uit';
export const STAP_PRAAT = 'Praat';
export const STAP_KIJK_TERUG = 'Kijk terug';

export type SpelStapId = 'kijk' | 'onderzoek' | 'beslis' | 'leg-uit' | 'praat' | 'kijk-terug';

export type SpelStap = { id: SpelStapId; label: string };

export function spelStappenVoorRonde(episode: EpisodeId, round: 1 | 2): SpelStap[] {
  const content = episodeContent(episode);
  const stappen: SpelStap[] = [
    { id: 'kijk', label: STAP_KIJK },
    { id: 'onderzoek', label: STAP_ONDERZOEK },
    { id: 'beslis', label: STAP_BESLIS },
    { id: 'leg-uit', label: STAP_LEG_UIT },
  ];
  if (round === 1 && content.gesprekskaartActief) {
    stappen.push({ id: 'praat', label: STAP_PRAAT });
  } else if (round === 2 && content.dilemma) {
    stappen.push({ id: 'praat', label: STAP_PRAAT });
  }
  stappen.push({ id: 'kijk-terug', label: STAP_KIJK_TERUG });
  return stappen;
}

/** Bepaalt welke stap actief is in de rondebalk. */
export function actieveSpelStap(
  phase: Phase,
  round: 1 | 2,
  opts: { gesprekskaartActief: boolean; heeftDilemma: boolean; dilemmaOpen: boolean },
): SpelStapId | null {
  if (phase === 'intro' || phase === 'cold') return 'kijk';
  if (phase === 'onderzoek') return 'onderzoek';
  if (phase === 'besluit') {
    if (round === 2 && opts.heeftDilemma && opts.dilemmaOpen) return 'praat';
    return 'beslis';
  }
  if (phase === 'argument') {
    if (round === 2 && opts.heeftDilemma && opts.dilemmaOpen) return 'praat';
    return 'leg-uit';
  }
  if (phase === 'gesprek') return 'praat';
  if (phase === 'uitkomst' || phase === 'scan') return 'kijk-terug';
  return null;
}
