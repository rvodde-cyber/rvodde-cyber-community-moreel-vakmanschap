import type { DilemmaDef } from '../episodes/dilemmaDef';

const BERICHT =
  'Hoi, ik heb een vraag waar ik zelf niet uit kom. Optivora wil vóór vrijdag inzage in alle documenten uit het archief. Daar zit ook het oorspronkelijke receptschrift bij, in de schuur. Ik weet niet wat erin staat. Stuur ik het op, dan geef ik iets weg waarvan ik de inhoud niet ken. Houd ik het achter, dan houd ik iets achter. Ik wil het graag goed doen. Wat zou jij doen?';

export const DILEMMA_EP5_SCHRIFT = {
  id: 'ep5-schrift',
  aflevering: 5,
  ronde: 2,
  status: 'goedgekeurd',
  titel: 'Het schrift in de schuur',
  privéBericht: {
    van: 'Anne-Fleur',
    tekst: BERICHT,
    kanaal: 'app',
    dil: true,
  },
  keuzes: [
    { id: 'niets', label: 'Niets doen', kort: 'Geen antwoord; Anne-Fleur beslist alleen.' },
    { id: 'groep', label: 'In het MT bespreken', kort: 'De vraag komt op tafel, met Anne-Fleur erbij.' },
    { id: 'prive', label: 'Privé een besluit nemen', kort: 'Korte motivatie (min. 10 tekens).' },
  ],
  effecten: {
    niets: {
      eerlijkheid: -6,
      menselijkeMaat: -8,
      logEer: 'Een vraag om advies bleef onbeantwoord',
      logMm: 'Anne-Fleur stond alleen voor een zwaar besluit',
    },
    groep: {
      eerlijkheid: 8,
      menselijkeMaat: 2,
      logEer: 'De vraag werd open besproken',
      logMm: 'Anne-Fleur kreeg haar plek aan tafel',
    },
    prive: {
      eerlijkheid: 4,
      menselijkeMaat: 8,
      minTekst: 10,
      logEer: 'Een eigen besluit genomen over het schrift',
      logMm: 'Anne-Fleur werd gehoord en begeleid',
    },
  },
  ethiekNoot:
    'Geen juist antwoord. Transparantie tegenover de investeerder staat tegenover zorg voor wat in het schrift kan staan. De game velt geen oordeel; nabesprekingsvraag: wat is een organisatie de ander verschuldigd, en wat hoort in de familie?',
} satisfies DilemmaDef;
