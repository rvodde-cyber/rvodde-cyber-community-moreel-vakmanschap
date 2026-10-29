import { resolveScene } from './contentStatus';
import { sceneById } from './piotr-lijn';

const PRIVEBERICHT_QUOTE = /— "([\s\S]*?)"\s*Antwoordopties/;

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
