/** Opvolgingskeuze aflevering 3 — opslag nu; gevolgen in ep 4/5 als TODO-data. */

export type OpvolgingKeuze = 'marco' | 'sanne' | 'extern';

export const OPVOLGING_OPTIES: {
  id: OpvolgingKeuze;
  naam: string;
  kort: string;
  /** TODO: filter berichten/scènes in aflevering 4 */
  gevolgEp4: 'TODO';
  /** TODO: filter kansen in aflevering 5 */
  gevolgEp5: 'TODO';
}[] = [
  {
    id: 'marco',
    naam: 'Marco van Gorp',
    kort: 'Het pak, het plan, de stem die niet twijfelt.',
    gevolgEp4: 'TODO',
    gevolgEp5: 'TODO',
  },
  {
    id: 'sanne',
    naam: 'Sanne van Gorp',
    kort: 'Kent elke lijn op de vloer omdat ze erin is opgegroeid.',
    gevolgEp4: 'TODO',
    gevolgEp5: 'TODO',
  },
  {
    id: 'extern',
    naam: 'Externe directeur',
    kort: 'Iemand van buiten de familie; Harrie beslist bij gelijke stemmen.',
    gevolgEp4: 'TODO',
    gevolgEp5: 'TODO',
  },
];

export const OPVOLGING_UITLEG =
  'Stem als MT. Bij gelijke stemmen beslist de directeur (Harrie). De keuze wordt opgeslagen voor latere afleveringen.';
