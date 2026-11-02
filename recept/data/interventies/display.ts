import type { Interventie, NabesprekingInterventieVraag } from './types';

/** Velden die in studentmodus getoond mogen worden (geen verborgen meters). */
export function interventieZichtbaarVoorStudent(i: Interventie): Omit<Interventie, 'verborgen'> & { verborgen?: never } {
  const { verborgen: _v, ...rest } = i;
  return rest;
}

export function studentZietVerborgenMeterInInterventie(i: Interventie, docent: boolean): boolean {
  if (docent) return true;
  const z = interventieZichtbaarVoorStudent(i);
  return 'verborgen' in z && z.verborgen != null;
}

/** Studentmodus: alleen status definitief; docent ziet alles. */
export function interventieZichtbaarInModus(i: Interventie, docent: boolean): boolean {
  if (docent) return true;
  return i.status === 'definitief';
}

/** CONCEPT-label in docentmodus voor interventies die nog concept zijn. */
export function interventieToontConceptLabel(i: Interventie, docent: boolean): boolean {
  return docent && i.status === 'concept';
}

/** Echo-regels alleen als de bron-interventie (of begrotingskeuze) eerder is gekozen. */
export function echoTekstenVoorGekozenInterventies(
  i: Interventie,
  gekozenInterventieIds: ReadonlySet<string>,
): string[] {
  return (i.echo ?? []).filter((e) => gekozenInterventieIds.has(e.bron)).map((e) => e.tekst);
}

export function nabesprekingVraagZichtbaar(
  vraag: NabesprekingInterventieVraag,
  gekozenInterventieIds: ReadonlySet<string>,
): boolean {
  const vereist = vraag.tonenAlsGekozen;
  if (!vereist?.length) return true;
  return vereist.every((id) => gekozenInterventieIds.has(id));
}
