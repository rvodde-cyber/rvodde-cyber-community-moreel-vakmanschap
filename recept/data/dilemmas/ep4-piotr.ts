/**
 * Moreel dilemma aflevering 4 — screening Defensie / Piotr.
 * Effecten op verborgen meters: port referentie hidden() (demo v6).
 * Defensie-contract: altijd door; geen spelmotor-effect.
 */
export type DilemmaKeuze = 'niets' | 'groep' | 'prive';

export const DILEMMA_EP4_PIOTR = {
  id: 'ep4-piotr-screening',
  aflevering: 4,
  ronde: 2,
  status: 'goedgekeurd' as const,
  titel: 'De order van Defensie en de verdenking van Piotr',
  privéBericht: {
    van: 'Piotr Nowak',
    tekst:
      'Mijn pas werkt niet meer bij hal 3. Beveiliging zegt dat ik een veiligheidsrisico ben. Niemand kan zeggen waarom. Ik werk hier al jaren via het bureau.',
    dil: true,
  },
  keuzes: [
    { id: 'niets' as const, label: 'Niets doen', kort: 'Het bericht blijft liggen.' },
    { id: 'groep' as const, label: 'In de groep bespreken', kort: 'Zichtbaar in de MT-groepsapp.' },
    { id: 'prive' as const, label: 'Privé een besluit nemen', kort: 'Korte motivatie (min. 10 tekens).' },
  ],
  effecten: {
    niets: { eerlijkheid: -8, menselijkeMaat: -10, logEer: 'Het verzoek om alle dossiers bleef onbeantwoord liggen', logMm: 'Piotr bleef alleen met een vermoeden' },
    groep: { eerlijkheid: 8, menselijkeMaat: 3, logEer: 'Het verzoek van Defensie en de zaak-Piotr open op tafel gelegd', logMm: 'Piotr kreeg een stem in het MT' },
    prive: {
      eerlijkheid: 4,
      menselijkeMaat: 6,
      minTekst: 10,
      logEer: 'Een eigen besluit genomen over Piotr en de dossiers',
      logMm: 'Piotr niet alleen gelaten',
    },
  },
  /** MT kan in ronde 2 budgetteren voor vaste aanname Piotr */
  vasteAanname: {
    postId: 'piotr-vast' as const,
    bedrag: 25000,
    label: 'Piotr in vaste dienst (loyaliteit)',
    beschrijving: 'Aanname via Brabantse Personeelsdiensten; pas na een jaar zonder bureau mogelijk.',
    /** Zie data/ep4Interventies.ts — interventieDefinitief false tot Richard akkoord */
  },
  ethiekNoot:
    'Geen juist antwoord. Herkomst niet expliciet benoemen in UI. Nabespreking: stereotypen en beeld bij personages (Bianchi et al., 2023).',
};
