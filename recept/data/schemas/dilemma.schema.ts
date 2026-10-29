import { z } from 'zod';

export const dilemmaStubSchema = z.object({
  id: z.string(),
  aflevering: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(5)]),
  status: z.enum(['concept', 'goedgekeurd']),
  titel: z.string(),
  samenvatting: z.string(),
  spanningsveld: z.string(),
  speelbaar: z.literal(false),
});

export type DilemmaStub = z.infer<typeof dilemmaStubSchema>;
