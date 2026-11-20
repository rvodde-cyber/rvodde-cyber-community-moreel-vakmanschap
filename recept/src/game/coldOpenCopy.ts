export const COLD_OPENING_KOP = 'OPENINGSSCÈNE';

/** @deprecated briefing-scherm vervangt de uitleglijn onder de scène */
export const COLD_OPENING_UITLEG =
  'Dit gebeurt er vlak voordat jullie beslissen. Let op wat hardop wordt gezegd en wat onder tafel rondgaat.';

export const SCENE_BRIEFING_BODY =
  'Je ziet zo een korte scène: een gesprek vlak voordat jullie beslissen. Let op wat hardop wordt gezegd en wat onder tafel rondgaat. Lees mee, jullie hoeven nu nog niets te kiezen.';

export const SCENE_BRIEFING_FOLLOW =
  'Daarna onderzoeken jullie de situatie en kiezen jullie twee interventies.';

export const SCENE_BRIEFING_TIMER_HINT = 'De tijd start zodra jullie op de knop drukken.';

export function coldTrailerIntroTaskLine(): string {
  return 'Kijk eerst de trailer. Daarna volgt de scène regel voor regel. Tik of druk op spatie om sneller door te gaan.';
}

export function coldSceneTaskLine(opts: {
  last: boolean;
  hasBeslistijdTimer: boolean;
  manualAdvance: boolean;
}): string {
  if (opts.last) {
    return opts.hasBeslistijdTimer
      ? 'Dit was de scène. Druk op de knop: dan start de beslistijd van tien minuten.'
      : 'Dit was de scène. Druk op de knop om met onderzoek te starten.';
  }
  if (opts.manualAdvance) {
    return 'Kijk de scène. Tik op Verder of druk op spatie voor de volgende regel.';
  }
  return 'Kijk de scène. De regels lopen vanzelf door; tik ergens, spatie of enter om sneller te gaan. Pauzeer de automatische weergave indien nodig.';
}
