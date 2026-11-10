import { z } from 'zod';

export const episodeIdSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export type EpisodeIdPersoon = z.infer<typeof episodeIdSchema>;

const afleveringVariantSchema = z.object({
  leeftijd: z.number().int().positive(),
  rol: z.string().min(1),
  tekst: z.string().min(1),
  /** Beeldbankcode, bijv. P-HARRIE-1984 (bestand: public/beelden/portretten/<code>.webp) */
  portret: z.string().min(1).optional(),
  portretAlt: z.string().min(1).optional(),
});

export const persoonSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  naam: z.string().min(1),
  /** Standaardwaarden (meestal aflevering 4 / 2026) */
  leeftijd: z.number().int().positive(),
  rol: z.string().min(1),
  tekst: z.string().min(1),
  portretAlt: z.string().min(1),
  /** Optionele variant per aflevering; `portret` is daar een code, geen pad */
  afleveringen: z
    .object({
      1: afleveringVariantSchema.optional(),
      2: afleveringVariantSchema.optional(),
      3: afleveringVariantSchema.optional(),
      4: afleveringVariantSchema.optional(),
      5: afleveringVariantSchema.optional(),
    })
    .optional(),
});

export const personenSchema = z.array(persoonSchema).min(1);

export type AfleveringVariant = z.infer<typeof afleveringVariantSchema>;
export type Persoon = z.infer<typeof persoonSchema>;
