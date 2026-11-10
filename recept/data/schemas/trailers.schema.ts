import { z } from 'zod';
export const trailerBewegingSchema = z.enum(['in', 'uit', 'pan-links', 'pan-rechts', 'geen']);

export const trailerShotSchema = z.object({
  code: z.string().min(1),
  ms: z.number().int().positive(),
  beweging: trailerBewegingSchema,
  tekst: z.string().min(1),
});

export const trailerTitelkaartSchema = z.object({
  deel: z.string().min(1),
  naam: z.string().min(1),
  jaar: z.number().int(),
  ms: z.literal(4000),
});

export const episodeTrailerSchema = z.object({
  loopPeriode: z.string().optional(),
  shots: z.array(trailerShotSchema).min(1),
  titelkaart: trailerTitelkaartSchema,
});

export const trailersRecordSchema = z.object({
  1: episodeTrailerSchema,
  2: episodeTrailerSchema,
  3: episodeTrailerSchema,
  4: episodeTrailerSchema,
  5: episodeTrailerSchema,
});

export type TrailerBeweging = z.infer<typeof trailerBewegingSchema>;
export type TrailerShot = z.infer<typeof trailerShotSchema>;
export type EpisodeTrailerDef = z.infer<typeof episodeTrailerSchema>;
