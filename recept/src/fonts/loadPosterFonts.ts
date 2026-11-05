let loaded = false;

/** Poster / landingspagina / intro rechts: Instrument Serif + Chakra Petch (latin). */
export async function loadPosterFonts(): Promise<void> {
  if (loaded) return;
  await import('./packs/poster');
  loaded = true;
}
