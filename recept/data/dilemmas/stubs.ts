import type { DilemmaStub } from '../schemas/dilemma.schema';

export type { DilemmaStub };

export const DILEMMA_STUBS: DilemmaStub[] = [
  {
    id: 'ep1-frans',
    aflevering: 1,
    status: 'goedgekeurd',
    titel: 'Het geheim van Frans',
    samenvatting:
      'Frans helpt in de schuur; Harrie hoort een gerucht over softdrugs en overweegt hem niet meer te vragen.',
    spanningsveld: 'Privéleven tegenover bedrijfswaarden.',
    speelbaar: true,
  },
  {
    id: 'ep2-wim',
    aflevering: 2,
    status: 'goedgekeurd',
    titel: 'Een briefje zonder naam',
    samenvatting:
      'Anoniem briefje over Wim en een waarschuwing van Gerrit; kiezen tussen niets, MT of privé met motivatie.',
    spanningsveld: 'Regel tegenover menselijke omstandigheden.',
    speelbaar: true,
  },
  {
    id: 'ep3-waalwijk',
    aflevering: 3,
    status: 'goedgekeurd',
    titel: 'De cijfers van Waalwijk',
    samenvatting:
      'Marco sms’t drie berichten over Waalwijk en de bank; niets, MT of privé met motivatie.',
    spanningsveld: 'Transparantie tegenover druk en loyaliteit.',
    speelbaar: true,
  },
  {
    id: 'ep5-schrift',
    aflevering: 5,
    status: 'goedgekeurd',
    titel: 'Het schrift in de schuur',
    samenvatting:
      'Anne-Fleur app’t over Optivora en het receptschrift; niets, MT of privé met motivatie.',
    spanningsveld: 'Transparantie tegenover onzekerheid over het verleden.',
    speelbaar: true,
  },
];
