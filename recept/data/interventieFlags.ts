import type { EpisodeId } from './episodes/meta';

/** Per skeletaflevering: pas spelmotor koppelen als definitief én gevolgenCompleet. */
export type InterventieFlag = {
  interventieDefinitief: boolean;
  gevolgenCompleet: boolean;
};

export const INTERVENTIE_FLAGS: Record<Exclude<EpisodeId, 4>, InterventieFlag> = {
  1: { interventieDefinitief: false, gevolgenCompleet: false },
  2: { interventieDefinitief: false, gevolgenCompleet: false },
  3: { interventieDefinitief: false, gevolgenCompleet: false },
  5: { interventieDefinitief: false, gevolgenCompleet: false },
};

export function assertInterventieFlagsConsistent(flags: Record<Exclude<EpisodeId, 4>, InterventieFlag>): void {
  for (const [ep, f] of Object.entries(flags)) {
    if (f.interventieDefinitief && !f.gevolgenCompleet) {
      throw new Error(`Aflevering ${ep}: interventieDefinitief=true maar gevolgenCompleet=false`);
    }
  }
}

export function useSkeletonMotor(episode: EpisodeId): boolean {
  if (episode === 4) return false;
  const f = INTERVENTIE_FLAGS[episode as Exclude<EpisodeId, 4>];
  return !(f.interventieDefinitief && f.gevolgenCompleet);
}
