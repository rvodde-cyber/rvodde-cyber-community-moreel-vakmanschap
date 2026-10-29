import type { Status } from './contentStatus';

/** Tekst uit docs/VOORSTELLEN-RECEPT-29-10-2026.md §5 — alleen docentmodus, boven gespreksvragen. */
export type VeiligGesprekBlok = {
  status: Status;
  tekst: string;
  bron: string;
};

export const VEILIG_GESPREK_EP4: VeiligGesprekBlok = {
  status: 'concept',
  tekst:
    'Dit gesprek gaat over een verzonnen situatie. Er is geen juist antwoord. Niemand hoeft iets te delen dat te persoonlijk is. Wie een vraag liever overslaat, kan dat zeggen. Praat over personages, niet over elkaar.',
  bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §5',
};

export function veiligGesprekTekst(docent: boolean): string | null {
  if (!docent) return null;
  const trimmed = VEILIG_GESPREK_EP4.tekst.trim();
  if (VEILIG_GESPREK_EP4.status === 'definitief' && trimmed) {
    return VEILIG_GESPREK_EP4.tekst;
  }
  if (VEILIG_GESPREK_EP4.status === 'concept' && trimmed) {
    return VEILIG_GESPREK_EP4.tekst;
  }
  return 'Blok “Veilig gesprek” volgt zodra Richard de tekst definitief maakt (status leeg).';
}

export function veiligGesprekIsConcept(): boolean {
  return VEILIG_GESPREK_EP4.status === 'concept';
}
