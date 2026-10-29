import { z } from 'zod';

export const mvFaseSchema = z.enum(['zien', 'voelen', 'wegen', 'handelen', 'volhouden']);

export const nabesprekingVraagSchema = z.object({
  id: z.string(),
  tekst: z.string().min(1),
  fase: mvFaseSchema,
  status: z.enum(['concept', 'definitief']),
  /** Optioneel: koppeling aan Piotr-lijn */
  thema: z.string().optional(),
});

export const nabesprekingEp4Schema = z.array(nabesprekingVraagSchema);

export type NabesprekingVraagEp4 = z.infer<typeof nabesprekingVraagSchema>;
