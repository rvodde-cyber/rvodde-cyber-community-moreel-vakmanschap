/** Akkoord Richard verplicht voordat beeld in UI i.p.v. placeholder. */

export type BeeldCheckItem = {
  code: string;
  omschrijving: string;
  bron: string;
  altNl: string;
  stereotypencheck: string;
  akkoordRichard: boolean;
};

export const BEELDEN_CHECK: BeeldCheckItem[] = [
  {
    code: 'I1',
    omschrijving: 'Intro aflevering 1 — schuur 1984',
    bron: 'Nog aan te leveren (Firefly/beeldbank)',
    altNl: 'Sfeerbeeld: schuur bij schemer, placeholder tot akkoord',
    stereotypencheck: 'Geen personage-portret; controleer geen klassieke arbeidersstereotypen in scène.',
    akkoordRichard: false,
  },
  {
    code: 'I2',
    omschrijving: 'Intro aflevering 2 — lopende band 1996',
    bron: 'Nog aan te leveren',
    altNl: 'Sfeerbeeld: fabriekshal met band, placeholder',
    stereotypencheck: 'Geen uitsluiting op basis van identiteit zichtbaar maken.',
    akkoordRichard: false,
  },
  {
    code: 'I3',
    omschrijving: 'Intro aflevering 3 — directietafel 2009',
    bron: 'Nog aan te leveren',
    altNl: 'Sfeerbeeld: lege directietafel, placeholder',
    stereotypencheck: 'Twee stoelen — geen impliciete gender-/afkomstcodering als “goed/slecht”.',
    akkoordRichard: false,
  },
  {
    code: 'I4',
    omschrijving: 'Intro aflevering 4 — TEMPO kantoor (T4 demo)',
    bron: 'referentie/beelden/T4.jpg',
    altNl: 'Leeg kantoor met actieve schermen bij zonsopgang',
    stereotypencheck: 'Geen personen in beeld.',
    akkoordRichard: false,
  },
  {
    code: 'I5',
    omschrijving: 'Intro aflevering 5 — Spoorzone 2036',
    bron: 'Nog aan te leveren',
    altNl: 'Glazen ingang met reflectie, placeholder',
    stereotypencheck: 'Geen conglomeraat als “koud” visueel cliché zonder context.',
    akkoordRichard: false,
  },
];

export function beeldAkkoord(code: string): boolean {
  return BEELDEN_CHECK.find((b) => b.code === code)?.akkoordRichard ?? false;
}

export function beeldAlt(code: string): string {
  return BEELDEN_CHECK.find((b) => b.code === code)?.altNl ?? `Sfeerbeeld ${code} (placeholder)`;
}
