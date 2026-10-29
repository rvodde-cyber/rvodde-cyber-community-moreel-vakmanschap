import { A4R2_PIOTR_IN_DIENST } from './ep4Interventies';
import { DILEMMA_EP4_PIOTR } from './dilemmas/ep4-piotr';
import { resolveScene, type ResolvedScene } from './contentStatus';
import { sceneById } from './piotr-lijn';

const PRIVEBERICHT_QUOTE = /— "([\s\S]*?)"\s*Antwoordopties/;

export type TestamentVariantKey = 'met' | 'zonder';

export type TestamentVoorSpel = {
  base: ResolvedScene;
  variant: ResolvedScene;
  variantKey: TestamentVariantKey;
};

/** MT koos Piotr in vaste dienst (begrotingspost piotr-vast ≥ aannamekosten). */
export function mtKoosPiotrInDienst(bud: Record<string, number>): boolean {
  const post = A4R2_PIOTR_IN_DIENST.postId;
  const min = DILEMMA_EP4_PIOTR.vasteAanname.bedrag;
  return (bud[post] ?? 0) >= min;
}

function resolveVariantField(
  id: string,
  field: 'variantMetContract' | 'variantZonderContract',
  docent: boolean,
): ResolvedScene {
  const slot = sceneById('a4-slot-testament');
  const v = slot?.[field];
  if (!v) {
    return resolveScene({ id, titel: '', tekst: '', status: 'leeg' }, docent);
  }
  return resolveScene({ id, titel: '', tekst: v.tekst, status: v.status, bron: v.bron }, docent);
}

/** Eén variant per keuze — nooit beide tegelijk. */
export function resolveTestamentForSpel(piotrInDienst: boolean, docent: boolean): TestamentVoorSpel {
  const slot = sceneById('a4-slot-testament');
  const base = slot
    ? resolveScene(slot, docent)
    : resolveScene({ id: 'a4-slot-testament', titel: '', tekst: '', status: 'leeg' }, docent);

  const variantKey: TestamentVariantKey = piotrInDienst ? 'met' : 'zonder';
  const field = piotrInDienst ? 'variantMetContract' : 'variantZonderContract';
  const variant = resolveVariantField(`a4-slot-testament-${variantKey}`, field, docent);

  return { base, variant, variantKey };
}

/** Privéchat-tekst uit scène a4r2-dilemma-privebericht (statusmodel). */
export function piotrPrivéBerichtQuote(docent: boolean): string {
  const scene = sceneById('a4r2-dilemma-privebericht');
  if (!scene) return resolveScene({ id: 'x', titel: '', tekst: '', status: 'leeg' }, docent).tekst;
  const resolved = resolveScene(scene, docent);
  if (resolved.isFallback) return resolved.tekst;
  const m = scene.tekst.match(PRIVEBERICHT_QUOTE);
  return m?.[1]?.trim() ?? scene.tekst;
}

export function piotrIntroResolved(docent: boolean) {
  const scene = sceneById('a4r1-piotr-intro');
  if (!scene) {
    return resolveScene({ id: 'x', titel: '', tekst: '', status: 'leeg' }, docent);
  }
  return resolveScene(scene, docent);
}
