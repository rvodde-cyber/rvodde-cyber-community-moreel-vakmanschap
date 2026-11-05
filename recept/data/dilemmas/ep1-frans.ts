import type { DilemmaDef } from '../episodes/dilemmaDef';

export const DILEMMA_EP1_FRANS = {
  id: 'ep1-frans',
  aflevering: 1,
  ronde: 2,
  status: 'goedgekeurd',
  titel: 'Het geheim van Frans',
  privéBericht: {
    van: 'Lies',
    tekst:
      "Even tussendoor, want in de schuur kan ik het niet zeggen. Harrie heeft gehoord dat Frans in het weekend in een bandje speelt en dat er 'wel eens wat rondgaat'. Hij wil hem volgende week niet meer vragen. Frans weet van niks. Ik weet niet eens of het waar is, of dat het uitmaakt. Jij kent Harrie: zeg jij niks, dan zegt niemand wat. Liefs, L.",
    kanaal: 'briefje',
    dil: true,
  },
  keuzes: [
    { id: 'niets', label: 'Niets doen', kort: 'Het briefje blijft liggen.' },
    { id: 'groep', label: 'Aan de keukentafel bespreken', kort: 'Het gerucht komt bij Harrie en Lies op tafel.' },
    { id: 'prive', label: 'Privé een besluit nemen', kort: 'Korte motivatie (min. 10 tekens).' },
  ],
  effecten: {
    niets: {
      eerlijkheid: -8,
      menselijkeMaat: -10,
      logEer: 'Een gerucht over Frans bleef onbesproken',
      logMm: 'Frans werd niet meer gevraagd en wist niet waarom',
    },
    groep: {
      eerlijkheid: 6,
      menselijkeMaat: -2,
      logEer: 'Het gerucht over Frans open besproken',
      logMm: 'Frans kreeg geen stem in het gesprek over hem',
    },
    prive: {
      eerlijkheid: 4,
      menselijkeMaat: 8,
      minTekst: 10,
      logEer: 'Een eigen besluit genomen over Frans',
      logMm: 'Frans niet buitengesloten op een gerucht',
    },
  },
  ethiekNoot:
    'Geen juist antwoord. Het gerucht is niet bevestigd; Frans heeft nooit slecht gewerkt. Geen oordeel over zijn privéleven in de UI; het gaat om hoor en wederhoor en wat een werkgever mag laten meewegen. Nabesprekingsvraag: Wie zat er niet aan tafel?',
} satisfies DilemmaDef;
