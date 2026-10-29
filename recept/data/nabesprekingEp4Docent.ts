import type { Status } from './contentStatus';

/** Tekst uit docs/GESPREKSVRAGEN-EP4-VOORSTEL.md — alleen docentmodus, boven gespreksvragen. */
export type VeiligGesprekBlok = {
  status: Status;
  tekst: string;
  bron: string;
};

export const VEILIG_GESPREK_EP4: VeiligGesprekBlok = {
  status: 'leeg',
  tekst: '',
  bron: 'docs/GESPREKSVRAGEN-EP4-VOORSTEL.md',
};

export function veiligGesprekTekst(docent: boolean): string | null {
  if (!docent) return null;
  if (VEILIG_GESPREK_EP4.status === 'definitief' && VEILIG_GESPREK_EP4.tekst.trim()) {
    return VEILIG_GESPREK_EP4.tekst;
  }
  if (VEILIG_GESPREK_EP4.status === 'concept' && VEILIG_GESPREK_EP4.tekst.trim()) {
    return VEILIG_GESPREK_EP4.tekst;
  }
  return 'Blok “Veilig gesprek” volgt zodra Claude docs/GESPREKSVRAGEN-EP4-VOORSTEL.md levert (status leeg).';
}

export function veiligGesprekIsConcept(): boolean {
  return VEILIG_GESPREK_EP4.status === 'concept';
}
