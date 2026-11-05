import type { RoundDefinition } from '../schemas/rounds.schema';
import { episodeContent } from './content';
import type { EpisodeId } from './meta';

/** Tickerregels voor weergave: demo-ticker uit rounds.ts + tijdgeest, of alleen tijdgeest. */
export function tickerRegelsVoor(
  episode: EpisodeId,
  roundTicker: RoundDefinition['ticker'],
): RoundDefinition['ticker'] {
  const tijd = episodeContent(episode).tijdgeest.ticker;
  if (episodeContent(episode).usesDemoBudget) {
    return [...roundTicker, ...tijd];
  }
  return [...tijd];
}
