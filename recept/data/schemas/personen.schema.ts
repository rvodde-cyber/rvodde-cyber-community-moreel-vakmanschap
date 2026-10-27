import { z } from 'zod';

export const persoonSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  naam: z.string().min(1),
  leeftijd: z.number().int().positive(),
  rol: z.string().min(1),
  tekst: z.string().min(1),
  portret: z.string().optional(),
  portretAlt: z.string().min(1),
});

export const personenSchema = z.array(persoonSchema).min(1);

export type Persoon = z.infer<typeof persoonSchema>;
