import type { DilemmaDef } from '../episodes/dilemmaDef';

const SMS_BLOK =
  '1. "Hoi tante, de bank komt maandag langs voor de herfinanciering. De cijfers van Waalwijk zien er niet best uit."\n\n' +
  '2. "Als we de afschrijving van de nieuwe lijn over vijf jaar uitsmeren in plaats van drie, ziet het eruit alsof Waalwijk de target haalt. Is alleen boekhouding."\n\n' +
  '3. "Kun je dit even laten staan en niks tegen pap zeggen? Ik regel het verder. Thx!"';

export const DILEMMA_EP3_WAALWIJK = {
  id: 'ep3-waalwijk',
  aflevering: 3,
  ronde: 2,
  status: 'goedgekeurd',
  titel: 'De cijfers van Waalwijk',
  privéBericht: {
    van: 'Marco',
    tekst: SMS_BLOK,
    kanaal: 'sms2009',
    dil: true,
  },
  keuzes: [
    { id: 'niets', label: 'Niets doen', kort: 'De sms’jes blijven tussen jullie.' },
    { id: 'groep', label: 'In het MT bespreken', kort: 'Het voorstel komt op tafel, zonder Marco.' },
    { id: 'prive', label: 'Privé een besluit nemen', kort: 'Korte motivatie (min. 10 tekens).' },
  ],
  effecten: {
    niets: {
      eerlijkheid: -10,
      menselijkeMaat: -2,
      logEer: 'Een aanpassing van de cijfers bleef onbesproken',
      logMm: 'Marco stond er alleen voor',
    },
    groep: {
      eerlijkheid: 8,
      menselijkeMaat: -4,
      logEer: 'Het voorstel werd open besproken',
      logMm: 'Marco werd aangesproken voordat hij zijn kant kon vertellen',
    },
    prive: {
      eerlijkheid: 6,
      menselijkeMaat: 4,
      minTekst: 10,
      logEer: 'Een eigen besluit genomen over de cijfers',
      logMm: 'Marco kreeg de kans het zelf recht te zetten',
    },
  },
  ethiekNoot:
    'Geen juist antwoord. De game velt geen oordeel over Marco; het gaat om druk, loyaliteit en transparantie. Nabesprekingsvraag: Wie draagt het risico als de bank het later ontdekt?',
} satisfies DilemmaDef;
