/** Gedeeld statusmodel voor scènes en inhoudsslots (CURSOR-PROMPT 29 okt 2026). */

export type Status = 'leeg' | 'concept' | 'definitief';

export type MvFase = 'zien' | 'voelen' | 'wegen' | 'handelen' | 'volhouden';

export type Scene = {
  id: string;
  titel: string;
  tekst: string;
  status: Status;
  bron?: string;
};

export const FALLBACK_SPELER = 'Dit onderdeel volgt.';

export type ResolvedScene = {
  tekst: string;
  isFallback: boolean;
  /** Alleen true in docentmodus bij status concept */
  showConceptLabel: boolean;
};

export function resolveScene(scene: Scene, docent: boolean): ResolvedScene {
  const trimmed = scene.tekst.trim();
  if (scene.status === 'definitief') {
    if (!trimmed) {
      throw new Error(`Scène ${scene.id}: status definitief maar tekst is leeg`);
    }
    return { tekst: scene.tekst, isFallback: false, showConceptLabel: false };
  }
  if (docent && scene.status === 'concept' && trimmed) {
    return { tekst: scene.tekst, isFallback: false, showConceptLabel: true };
  }
  return { tekst: FALLBACK_SPELER, isFallback: true, showConceptLabel: false };
}

export function assertScenesConsistent(scenes: Scene[]): void {
  for (const s of scenes) {
    if (s.status === 'definitief' && !s.tekst.trim()) {
      throw new Error(`Scène ${s.id}: definitief zonder tekst`);
    }
  }
}

/** Testhelper: concept mag nooit zichtbaar zijn voor studenten zonder fallback. */
export function studentSeesConceptText(scene: Scene): boolean {
  if (scene.status !== 'concept') return false;
  const r = resolveScene(scene, false);
  return !r.isFallback && r.tekst === scene.tekst.trim();
}
