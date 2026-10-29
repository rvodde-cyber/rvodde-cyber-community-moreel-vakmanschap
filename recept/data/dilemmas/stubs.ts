import type { DilemmaStub } from '../schemas/dilemma.schema';

export type { DilemmaStub };

export const DILEMMA_STUBS: DilemmaStub[] = [
  {
    id: 'ep1-frans',
    aflevering: 1,
    status: 'concept',
    titel: 'Het geheim van Frans',
    samenvatting:
      'Frans helpt in de schuur; Harrie hoort een gerucht over softdrugs en overweegt hem niet meer te vragen.',
    spanningsveld: 'Privéleven tegenover bedrijfswaarden.',
    speelbaar: false,
  },
  {
    id: 'ep2-ab',
    aflevering: 2,
    status: 'concept',
    titel: 'Ab komt uit de kast',
    samenvatting: 'Ab vertelt over hiv en homoseksualiteit; Gerrit moet kiezen tussen beschermen en uitsluiten.',
    spanningsveld: 'Bescherming tegenover uitsluiting.',
    speelbaar: false,
  },
  {
    id: 'ep3-karim',
    aflevering: 3,
    status: 'concept',
    titel: 'Karim wordt overgeslagen',
    samenvatting: 'Karim runt de beste vestiging maar wordt niet genoemd bij opvolging.',
    spanningsveld: 'Onzichtbare uitsluiting.',
    speelbaar: false,
  },
  {
    id: 'ep5-judith',
    aflevering: 5,
    status: 'concept',
    titel: 'Het algoritme van Judith',
    samenvatting: 'Een AI-systeem zet Judith op een reorganisatielijst zonder dat iemand het durft te bevragen.',
    spanningsveld: 'Geautomatiseerde discriminatie versus inclusierapport.',
    speelbaar: false,
  },
];
