import type { DilemmaDef } from '../episodes/dilemmaDef';

export const DILEMMA_EP2_WIM = {
  id: 'ep2-wim',
  aflevering: 2,
  ronde: 2,
  status: 'goedgekeurd',
  titel: 'Een briefje zonder naam',
  privéBericht: {
    van: 'Anoniem',
    tekst:
      'Aan wie het aangaat. Wim komt al drie weken te laat. Zijn moeder is ziek en hij helpt haar eerst uit bed. Gerrit heeft hem een waarschuwing gegeven, met een handtekening eronder. Wim durft er niks van te zeggen. Ik vind dat niet eerlijk. Mijn naam zet ik er niet onder, want ik wil mijn baan houden. Als jullie het nu weten en niks doen, wie dan wel?',
    kanaal: 'briefje',
    dil: true,
  },
  keuzes: [
    { id: 'niets', label: 'Niets doen', kort: 'Het briefje blijft tussen de loonzakjes.' },
    { id: 'groep', label: 'In het MT bespreken', kort: 'De waarschuwing komt op tafel, zonder Wim.' },
    { id: 'prive', label: 'Privé een besluit nemen', kort: 'Korte motivatie (min. 10 tekens).' },
  ],
  effecten: {
    niets: {
      eerlijkheid: -6,
      menselijkeMaat: -10,
      logEer: 'Een signaal zonder naam bleef onbeantwoord',
      logMm: 'Wim kreeg een waarschuwing en niemand vroeg waarom hij te laat was',
    },
    groep: {
      eerlijkheid: 8,
      menselijkeMaat: -2,
      logEer: 'De waarschuwing werd open getoetst aan de regels',
      logMm: 'Wim kreeg geen stem in het gesprek over hem',
    },
    prive: {
      eerlijkheid: 4,
      menselijkeMaat: 8,
      minTekst: 10,
      logEer: 'Een eigen besluit genomen over een waarschuwing',
      logMm: 'Wim werd gehoord voordat er iets werd besloten',
    },
  },
  ethiekNoot:
    'Geen juist antwoord. De regel geldt voor iedereen; de reden is zwaarwegend; Gerrit deed wat een ploegbaas hoort te doen. De game velt geen oordeel over Gerrit of over Wim. Nabesprekingsvraag: Wie bepaalt wat een goede reden is, en wie hoort dat te beslissen?',
} satisfies DilemmaDef;
