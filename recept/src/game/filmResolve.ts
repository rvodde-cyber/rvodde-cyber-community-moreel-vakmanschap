import {
  buildFinale,
  buildSlotRonde1,
  TRAILER_RONDE_1,
  TRAILER_RONDE_2,
  type FilmScript,
} from '@data/filmSequences';
import { slotLineRonde1, slotLinesFinale } from '@data/slotLines';
import type { GameUiState } from './uiTypes';

export function resolveFilmScript(state: GameUiState): FilmScript | null {
  switch (state.filmKind) {
    case 'trailer-r1':
      return TRAILER_RONDE_1;
    case 'trailer-r2':
      return TRAILER_RONDE_2;
    case 'slot-r1': {
      const res = state.results[1];
      if (!res) return null;
      const [place, line] = slotLineRonde1(res, state.rounds[1]);
      return buildSlotRonde1(place, line);
    }
    case 'finale': {
      const res = state.results[2];
      if (!res) return null;
      const [a, b] = slotLinesFinale(res, state.rounds[2], state.dilemma.choice);
      return buildFinale(a, b);
    }
    default:
      return null;
  }
}
