import { z } from 'zod';

const driverEffectSchema = z.record(
  z.enum([
    'tempo',
    'controle',
    'rolonduid',
    'bureaucratie',
    'moreel',
    'techniek',
    'verantw',
    'regelruimte',
    'steunlg',
    'collegas',
    'betekenis',
    'ontwikkeling',
    'erkenning',
    'middelen',
    'vaardigheden',
    'inspraak',
  ]),
  z.number(),
);

export const interventionCardSchema = z.object({
  id: z.string().min(1),
  t: z.string(),
  d: z.string(),
  e: driverEffectSchema,
  amo: z.enum(['A', 'M', 'O', '-']),
  fit: z.union([z.literal(0), z.literal(1)]),
  kosten: z.number(),
  vt: z.number(),
  er: z.number(),
  rep: z.number(),
  cap: z.number(),
  status: z.enum(['concept', 'goedgekeurd']).optional(),
});

export const roundDefinitionSchema = z.object({
  label: z.string(),
  crisis: z.string(),
  budget: z.number().positive(),
  eurBase: z.number().positive(),
  tech: z.string(),
  brake: z.string(),
  pilotCard: z.string(),
  pilotRec: z.string(),
  pilotPred: z.string(),
  q1: z.string(),
  q2: z.string(),
  q3: z.string(),
  cards: z.array(interventionCardSchema).length(5),
  contra: z.array(z.tuple([z.string(), z.string()])),
  posten: z.array(
    z.object({
      id: z.string(),
      t: z.string(),
      d: z.string(),
      marco: z.number().nonnegative(),
    }),
  ),
  BE: z.record(z.string(), driverEffectSchema),
  acties: z.array(
    z.object({
      id: z.string(),
      ic: z.string().optional(),
      t: z.string(),
      quote: z.string(),
      sig: z.string(),
    }),
  ),
  verm: z.array(
    z.object({
      id: z.string(),
      t: z.string(),
      q: z.number(),
      o: z.string(),
    }),
  ),
  ticker: z.array(z.tuple([z.enum(['!', 'i']), z.string()])),
});

export type RoundDefinition = z.infer<typeof roundDefinitionSchema>;

export const roundsRecordSchema = z.object({
  1: roundDefinitionSchema,
  2: roundDefinitionSchema,
});
