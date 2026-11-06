import { buildFinale, buildSlotEp1, buildSlotEp2, buildSlotEp3, buildSlotEp5, buildSlotRonde1 } from '@data/filmSequences';
import { episodeContent } from '@data/episodes/content';
import { mtKoosPiotrInDienst, resolveTestamentForSpel } from '@data/piotrSpel';
import { slotLineA1 } from '@data/slotLineA1';
import { slotLineA2 } from '@data/slotLineA2';
import { slotLineA3 } from '@data/slotLineA3';
import { slotLineA5 } from '@data/slotLineA5';
import type { FilmScript } from '@data/filmSequences';
import type { GameUiState } from './uiTypes';

export function resolveFilmScript(state: GameUiState): FilmScript | null {
  const content = episodeContent(state.episode);
  const { film, slotLines } = content;

  if (content.roundCount === 1) {
    switch (state.filmKind) {
      case 'trailer-r1':
        return film.trailerR1;
      case 'slot-r1':
        return film.slotSkeleton ?? null;
      default:
        return null;
    }
  }

  switch (state.filmKind) {
    case 'trailer-r1':
      return film.trailerR1;
    case 'trailer-r2':
      return film.trailerR2 ?? null;
    case 'slot-r1': {
      const res = state.results[1];
      if (!res || !slotLines) return null;
      const [place, line] = slotLines.ronde1(res, state.rounds[1]);
      return buildSlotRonde1(place, line);
    }
    case 'finale': {
      if (state.episode === 1) {
        const gekozen = [...state.rounds[1].cards, ...state.rounds[2].cards];
        return buildSlotEp1(slotLineA1(gekozen));
      }
      if (state.episode === 2) {
        const gekozen = [...state.rounds[1].cards, ...state.rounds[2].cards];
        return buildSlotEp2(slotLineA2(gekozen));
      }
      if (state.episode === 3) {
        const gekozen = [...state.rounds[1].cards, ...state.rounds[2].cards];
        return buildSlotEp3(slotLineA3(gekozen));
      }
      if (state.episode === 5) {
        const gekozen = [...state.rounds[1].cards, ...state.rounds[2].cards];
        return buildSlotEp5(slotLineA5(gekozen));
      }
      const res = state.results[2];
      if (!res || !slotLines) return null;
      const [a, b] = slotLines.finale(res, state.rounds[2], state.dilemma.choice);
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
