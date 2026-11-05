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

/** Demo A4-kaart-id's als echo-bron (ronde 2 kaarten F–J); id-formaat `demo-a4-{kaartId}`. */
export const ECHO_BRON_DEMO_KAARTEN_IDS = ['demo-a4-H'] as const;

/**
 * Aflevering 4 staat niet in `ALL_INTERVENTIES`. Kaarten en keuzeregels: `data/rounds.ts`
 * (bron: `referentie/demo-aflevering4-v6.html`).
 *
 * Demo v6 (spelmotor ongewijzigd):
 * - Per ronde **5** kaarten (`ROUNDS[n].cards`, id A–E / F–J).
 * - Team kiest **precies 2** kaarten per ronde (zelfde getal als `KEUZES_PER_RONDE` voor A1–A3/A5).
 * - **contra**: paren in `ROUNDS[n].contra` mogen niet tegelijk gekozen worden (tegenstrijdig signaal).
 * - Piotr-contract: begrotingspost `piotr-vast` in ronde 2, geen 4.x-kaart.
 */
export function interventiesBeschikbaarPerRonde(episode: 1 | 2 | 3 | 4 | 5, _ronde: 1 | 2): number {
  if (episode === 4) {
    throw new Error(
      'Aflevering 4: gebruik data/rounds.ts (5 kaarten per ronde), niet interventiesBeschikbaarPerRonde',
    );
  }
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
