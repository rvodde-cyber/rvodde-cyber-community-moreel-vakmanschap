import type { Status } from '../contentStatus';

export type EffectRichting = '--' | '-' | '0' | '+' | '++';

export type MeterEffect = {
  productiviteit: EffectRichting;
  betrokkenheid: EffectRichting;
  verzuim: EffectRichting;
  verloop: EffectRichting;
  budget: EffectRichting;
};

export type VerborgenEffect = {
  eerlijkheid: EffectRichting;
  menselijkeMaat: EffectRichting;
};

export type InterventieEcho = { bron: string; tekst: string };

export type Interventie = {
  id: string;
  episode: 1 | 2 | 3 | 4 | 5;
  ronde: 1 | 2;
  nummer: string;
  naam: string;
  omschrijving: string;
  kostenCategorie: '€' | '€€' | '€€€';
  anker: string;
  effect: MeterEffect;
  effectLater?: Partial<MeterEffect>;
  verborgen: VerborgenEffect;
  ethischRisico: string;
  uitkomsttekst: string;
  opvolging: string;
  echo?: InterventieEcho[];
  status: Status;
  interventieDefinitief: boolean;
  bron: string;
};

export const KEUZES_PER_RONDE = 2;
export const INTERVENTIES_PER_RONDE = 4;

export type NabesprekingInterventieVraag = {
  id: string;
  fase: 'zien' | 'voelen' | 'wegen' | 'handelen' | 'volhouden';
  tekst: string;
  status: 'concept' | 'definitief';
};

const BRON_DEFAULT = 'docs/INTERVENTIES-AFLEVERING-1-29-10-2026.md';

export function makeConceptInterventie(
  partial: Omit<Interventie, 'status' | 'interventieDefinitief'> & {
    status?: Status;
    interventieDefinitief?: boolean;
    bron?: string;
  },
): Interventie {
  return {
    ...partial,
    status: partial.status ?? 'concept',
    interventieDefinitief: partial.interventieDefinitief ?? false,
    bron: partial.bron ?? BRON_DEFAULT,
  };
}
