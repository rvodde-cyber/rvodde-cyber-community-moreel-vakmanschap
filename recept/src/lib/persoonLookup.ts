import { PERSONEN } from '@data/personen';
import type { Persoon } from '@data/schemas/personen.schema';

export function persoonByVan(van: string): Persoon | undefined {
  const exact = PERSONEN.find((p) => p.naam === van);
  if (exact) return exact;
  const first = van.split(' ')[0]?.toLowerCase();
  return PERSONEN.find((p) => p.naam.toLowerCase().startsWith(first ?? ''));
}
