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
      : 'Dit was de scène. Druk op de knop om het MT-overleg te starten.';
  }
  if (opts.manualAdvance) {
    return 'Kijk de scène. Tik op Verder of druk op spatie voor de volgende regel.';
  }
  return 'Kijk de scène. De regels lopen vanzelf door; tik ergens, spatie of enter om sneller te gaan. Pauzeer de automatische weergave indien nodig.';
}
