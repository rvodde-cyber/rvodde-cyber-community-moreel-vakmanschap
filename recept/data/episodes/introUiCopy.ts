import { budgetVoorRonde } from '../interventies/vertaaltabel';
import { episodeContent } from './content';
import type { EpisodeContent } from './content';
import type { EpisodeId } from './meta';
import { usesBeslistijdTimer } from './motor';

export const INTRO_SKELET_DISCLAIMER =
  'Dit is een houtskoolschets: de lijnen staan er, de uitwerking volgt. De uitkomst is nog niet gekoppeld aan de volledige spelmotor.';

/** Eerste alinea JULLIE OPDRACHT — gelijk in alle afleveringen. */
export function introOpdrachtKern(playerName: string): string {
  const trimmed = playerName.trim();
  const who =
    trimmed.length >= 2
      ? `Jullie zijn ${trimmed}, de jongere zus van Harrie.`
      : 'Jullie zijn de jongere zus van Harrie.';
  return `${who} Jullie werken op de achtergrond, maar hebben het laatste woord over het budget. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies binnen jullie budgetpunten en schrijven jullie op waarom.`;
}

/** Zin over beslistijd of rustig tempo — afgeleid uit register (timer op interventie + A4). */
export function introBeslistijdZin(episode: EpisodeId): string {
  return usesBeslistijdTimer(episode)
    ? 'Voor onderzoek en besluit samen hebben jullie ongeveer tien minuten.'
    : 'Neem de tijd om samen te kiezen.';
}

const A4_RONDE2_EXTRA =
  'Let op: wat jullie in ronde 1 hebben gekozen, werkt door in deze ronde.';

/** Regels in het vak JULLIE OPDRACHT (intro). */
export function introCarryLines(
  content: EpisodeContent,
  episode: EpisodeId,
  round: 1 | 2,
  playerName = '',
): string[] {
  const kern = introOpdrachtKern(playerName);
  switch (content.motorKind) {
    case 'interventie': {
      const punten = budgetVoorRonde(episode as Exclude<EpisodeId, 4>, round);
      return [kern, `Jullie budget deze ronde: ${punten} punten.`, introBeslistijdZin(episode)];
    }
    case 'a4':
      if (round === 2) {
        return [kern, A4_RONDE2_EXTRA, introBeslistijdZin(episode)];
      }
      return [kern, introBeslistijdZin(episode)];
    case 'skeleton':
      return [kern, INTRO_SKELET_DISCLAIMER, introBeslistijdZin(episode)];
    default:
      return [kern, introBeslistijdZin(episode)];
  }
}

/** @deprecated gebruik introCarryLines(episodeContent(4), 4, round, name) */
export function a4IntroCarryR1(playerName = ''): string {
  return introCarryLines(episodeContent(4), 4, 1, playerName).join(' ');
}

/** @deprecated gebruik introCarryLines voor ronde 2 */
export function a4IntroCarryR2(playerName = ''): string {
  return introCarryLines(episodeContent(4), 4, 2, playerName).join(' ');
}
