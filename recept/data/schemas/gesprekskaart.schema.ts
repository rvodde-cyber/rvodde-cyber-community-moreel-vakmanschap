import { z } from 'zod';
import type { EpisodeId } from '../episodes/meta';

export const gesprekskaartNiveauSchema = z.enum(['micro', 'meso']);
export const gesprekskaartSterrenSchema = z.union([z.literal(1), z.literal(2)]);

export const gesprekskaartSchema = z.object({
  id: z.string().min(1),
  episode: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  titel: z.string().min(1),
  niveau: gesprekskaartNiveauSchema,
  sterren: gesprekskaartSterrenSchema,
  alineas: z.array(z.string().min(1)).min(3),
  slotvraag: z.string().min(1),
});

export type Gesprekskaart = z.infer<typeof gesprekskaartSchema>;

export const waardeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

export const WAARDEN = [
  { id: 'eerlijkheid', label: 'Eerlijkheid' },
  { id: 'loyaliteit', label: 'Loyaliteit' },
  { id: 'rechtvaardigheid', label: 'Rechtvaardigheid' },
  { id: 'zorg', label: 'Zorg' },
  { id: 'vertrouwen', label: 'Vertrouwen' },
  { id: 'veiligheid', label: 'Veiligheid' },
  { id: 'transparantie', label: 'Transparantie' },
] as const;

export const waardenSchema = z.array(waardeSchema).length(7);

export const STANDAARD_SLOTVRAAG =
  'Wat zou jij doen en waarom? Welke waarden zijn hier in het spel?';

export const GESPREK_ZIN_MAX = 280;
export const GESPREK_WAARDEN_MAX = 3;

export function validateGesprekOpslaan(zin: string, waarden: string[]): { ok: true } | { ok: false; reason: string } {
  const trimmed = zin.trim();
  if (!trimmed) return { ok: false, reason: 'zin_leeg' };
  if (trimmed.length > GESPREK_ZIN_MAX) return { ok: false, reason: 'zin_te_lang' };
  if (waarden.length > GESPREK_WAARDEN_MAX) return { ok: false, reason: 'te_veel_waarden' };
  const allowed = new Set(WAARDEN.map((w) => w.id));
  for (const id of waarden) {
    if (!allowed.has(id as (typeof WAARDEN)[number]['id'])) return { ok: false, reason: 'onbekende_waarde' };
  }
  return { ok: true };
}

export type GesprekskaartExportEntry = {
  episode: EpisodeId;
  kaartId: string;
  zin: string;
  waarden: string[];
  overgeslagen: boolean;
  tijdsduurSec: number;
};

export const TEAM_EXPORT_GESPREK_VERSION = 2;
