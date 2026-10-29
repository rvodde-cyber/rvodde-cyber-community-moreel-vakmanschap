import {
  buildFinale,
  buildSlotRonde1,
  TRAILER_RONDE_1,
  TRAILER_RONDE_2,
  type FilmScript,
} from '@data/filmSequences';
import { isFullEpisode } from '@data/episodes/meta';
import { SKELETON_SLOTS, SKELETON_TRAILERS } from '@data/skeleton/film';
import { slotLineRonde1, slotLinesFinale } from '@data/slotLines';
import { mtKoosPiotrInDienst, resolveTestamentForSpel } from '@data/piotrSpel';
import type { GameUiState } from './uiTypes';

export function resolveFilmScript(state: GameUiState): FilmScript | null {
  if (!isFullEpisode(state.episode)) {
    const ep = state.episode as keyof typeof SKELETON_TRAILERS;
    switch (state.filmKind) {
      case 'trailer-r1':
        return SKELETON_TRAILERS[ep];
      case 'slot-r1':
        return SKELETON_SLOTS[ep];
      default:
        return null;
    }
  }

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
      const inDienst = mtKoosPiotrInDienst(state.rounds[2].bud);
      const testament = resolveTestamentForSpel(inDienst, false);
      return buildFinale(a, b, {
        base: testament.base.isFallback ? '' : testament.base.tekst,
        variant: testament.variant.isFallback ? '' : testament.variant.tekst,
      });
    }
    default:
      return null;
  }
}
