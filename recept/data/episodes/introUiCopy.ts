import { INTRO_TEKSTEN } from '@content/intros.nl';
import { budgetVoorRonde } from '../interventies/vertaaltabel';
import type { EpisodeContent } from './content';
import type { EpisodeId } from './meta';
import { usesBeslistijdTimer } from './motor';

export const INTRO_SKELET_DISCLAIMER =
  'Dit is een eerste opzet: de uitkomst is nog niet gekoppeld aan de volledige spelmotor.';

const INTERVENTIE_OPDRACHT_KERN =
  'Jullie vormen samen het managementteam. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies en verdelen jullie de budgetpunten.';

/** Zin over beslistijd of rustig tempo — afgeleid uit register (timer op interventie + A4). */
export function introBeslistijdZin(episode: EpisodeId): string {
  return usesBeslistijdTimer(episode)
    ? 'Voor onderzoek en besluit samen hebben jullie ongeveer tien minuten.'
    : 'Neem de tijd om samen te kiezen.';
}

/** Regels in het vak JULLIE OPDRACHT (intro ronde 1, niet-demo). */
export function introCarryLines(content: EpisodeContent, episode: EpisodeId, round: 1 | 2): string[] {
  switch (content.motorKind) {
    case 'interventie': {
      const punten = budgetVoorRonde(episode as Exclude<EpisodeId, 4>, round);
      return [
        INTERVENTIE_OPDRACHT_KERN,
        `Jullie budget deze ronde: ${punten} punten.`,
        introBeslistijdZin(episode),
      ];
    }
    case 'skeleton':
      return [INTRO_TEKSTEN[episode].opdracht, INTRO_SKELET_DISCLAIMER, introBeslistijdZin(episode)];
    default:
      return [INTRO_TEKSTEN[episode].opdracht];
  }
}

/** A4 demo ronde 1 — vaste copy (golden). */
export const A4_INTRO_CARRY_R1 =
  'Jullie vormen samen het managementteam (MT) van Van Gorp Drones. Per ronde onderzoeken jullie eerst wat er speelt. Daarna kiezen jullie twee interventies en verdelen jullie het budget. Voor onderzoek en besluit samen hebben jullie ongeveer tien minuten.';

/** A4 demo ronde 2 — vaste copy (golden). */
export const A4_INTRO_CARRY_R2 =
  'Dezelfde werkwijze als in ronde 1: eerst onderzoeken, dan besluiten, dan kijken wat er gebeurt. Let op: wat jullie in ronde 1 hebben gekozen, werkt door in deze ronde. Jullie hebben weer ongeveer tien minuten.';

export function a4IntroCarryR1(): string {
  return A4_INTRO_CARRY_R1;
}

export function a4IntroCarryR2(): string {
  return A4_INTRO_CARRY_R2;
}
