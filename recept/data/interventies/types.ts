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

/** Legenda meter-notatie (data + docs). */
export const INTERVENTIE_METER_NOTATIE_LEGEND =
  "+ / - = richting van de meterwaarde. Verzuim '-' = verzuim daalt (gunstig). Budget '-' = budget daalt (uitgave). (later) = effect in de volgende ronde of aflevering.";

/** Begrotingspost-id's die als echo-bron mogen (geen interventie-id). */
export const ECHO_BRON_BEGROTING_IDS = ['piotr-vast'] as const;

export function interventiesBeschikbaarPerRonde(episode: 1 | 2 | 3 | 4 | 5, ronde: 1 | 2): number {
  if (episode === 4 && ronde === 2) return 3;
  return INTERVENTIES_PER_RONDE;
}

export type NabesprekingInterventieVraag = {
  id: string;
  fase: 'zien' | 'voelen' | 'wegen' | 'handelen' | 'volhouden';
  tekst: string;
  status: 'concept' | 'definitief';
  /** Vraag alleen tonen als al deze interventie-id's eerder zijn gekozen. */
  tonenAlsGekozen?: string[];
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
