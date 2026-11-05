import type { EpisodeId } from '../episodes/meta';

export type InterventieStartMeters = {
  productiviteit: number;
  betrokkenheid: number;
  verzuim: number;
  verloop: number;
  /** Gelijk aan `freshHidden()` / A4-nabespreking-start */
  eerlijkheid: number;
  menselijkeMaat: number;
};

const PROVISIONAL: InterventieStartMeters = {
  productiviteit: 50,
  betrokkenheid: 70,
  verzuim: 3.0,
  verloop: 4.0,
  eerlijkheid: 50,
  menselijkeMaat: 50,
};

/** TODO: kalibratie na playtest — A2, A3, A5 gebruiken voorlopig dezelfde start. */
export const STARTWAARDEN: Record<Exclude<EpisodeId, 4>, InterventieStartMeters> = {
  1: { ...PROVISIONAL },
  2: { ...PROVISIONAL },
  3: { ...PROVISIONAL },
  5: { ...PROVISIONAL },
};

export function startwaardenVoor(episode: Exclude<EpisodeId, 4>): InterventieStartMeters {
  return { ...STARTWAARDEN[episode] };
}
