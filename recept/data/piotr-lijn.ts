import { assertScenesConsistent, type MvFase, type Scene, type Status } from './contentStatus';

export type PiotrBeeldRef = 'I1' | 'I2' | 'I3' | 'I4' | 'I5' | 'placeholder';

export type PiotrScene = Scene & {
  fase: MvFase;
  beeld: PiotrBeeldRef;
  /** Slotscène ep4: vertakking zonder MT-contract ronde 2 — wacht op Richard */
  variantZonderContract?: { tekst: string; status: Status; bron?: string };
};

/** Beat staat letterlijk in tekst (status concept) tot Richard/Claude uitwerken in PIOTR-SCENES-VOORSTEL.md */
export const PIOTR_SCENES: PiotrScene[] = [
  {
    id: 'a4r1-piotr-intro',
    titel: 'Piotr op de lijn (ronde 1)',
    tekst:
      'Piotr werkt als flexkracht via uitzendbureau Brabantse Personeelsdiensten (contactpersoon Peter Kramer). Overige flexkrachten blijven anoniem; alleen Piotr heeft naam, portret en verhaal.',
    status: 'concept',
    fase: 'zien',
    beeld: 'I4',
    bron: 'CURSOR-PROMPT Piotr-lijn',
  },
  {
    id: 'a4r2-keuze-contract',
    titel: 'Interventie: Piotr in dienst nemen',
    tekst:
      'MT-interventie "Piotr in dienst nemen" (loyaliteit, kleine post, aanname € 25.000; pas mogelijk na een jaar via het bureau). Defensie-contract loopt altijd door; deze keuze raakt alleen verborgen meters eerlijkheid en menselijke maat.',
    status: 'concept',
    fase: 'wegen',
    beeld: 'placeholder',
    bron: 'data/dilemmas/ep4-piotr.ts vasteAanname',
  },
  {
    id: 'a4r2-harrie-belt',
    titel: 'Harrie belt',
    tekst:
      'Tijdens het rondje MT belt Harrie. Hij noemt Piotr "een van ons", ziet hem als geadopteerd kind en staat bij Defensie garant, terwijl de familie twijfelt.',
    status: 'concept',
    fase: 'voelen',
    beeld: 'placeholder',
  },
  {
    id: 'a4r2-erik-twijfel',
    titel: 'Erik twijfelt',
    tekst:
      'Erik twijfelt met zakelijke argumenten (aansprakelijkheid, licentie), nooit met herkomstargumenten.',
    status: 'concept',
    fase: 'wegen',
    beeld: 'placeholder',
  },
  {
    id: 'a4r2-dilemma-privebericht',
    titel: 'Dilemma via privébericht',
    tekst:
      'Een screening door Defensie maakt Piotr verdacht om zijn herkomst, terwijl er niets met hem aan de hand is. Het dilemma komt via Piotr zelf, privé, bij de zus (de speler), niet via het MT-dashboard en los van de spelmotor.',
    status: 'concept',
    fase: 'handelen',
    beeld: 'placeholder',
    bron: 'data/dilemmas/ep4-piotr.ts',
  },
  {
    id: 'a4-slot-testament',
    titel: 'Slotscène 2031 — testament',
    tekst:
      'Harrie is overleden. In zijn testament staat een zin die Piotr de schuur in Berkel-Enschot nalaat, door Harrie eigenhandig en zonder overleg met de familie. Een andere pen heeft de zin doorgestreept. Piotr weet van niets en staat bij de deur.',
    status: 'concept',
    fase: 'volhouden',
    beeld: 'placeholder',
    variantZonderContract: {
      tekst: '',
      status: 'leeg',
      bron: 'OPEN-VRAGEN: vertakking zonder MT-contract ronde 2 — Harrie had het zelf geregeld; MT mist die kans',
    },
  },
  {
    id: 'a5-onthulling',
    titel: 'Onthulling 2036',
    tekst:
      'Erik blijkt de zin te hebben doorgestreept (grond, Sanne, Optivora). Aan het licht via een brief van Harrie in de schuur en Lies die zijn woorden herkent. Erik legt het zakelijk uit. Sanne wist het niet.',
    status: 'concept',
    fase: 'zien',
    beeld: 'I5',
  },
  {
    id: 'a5-overdracht',
    titel: 'Overdracht schuur',
    tekst:
      'Piotr (vaste ploegleider, huis en gezin in Nederland) draagt de schuur over aan Lotte. Lies geeft haar beslissende stem aan Lotte.',
    status: 'concept',
    fase: 'volhouden',
    beeld: 'I5',
  },
];

export function sceneById(id: string): PiotrScene | undefined {
  return PIOTR_SCENES.find((s) => s.id === id);
}

export function validatePiotrLijn(): void {
  assertScenesConsistent(PIOTR_SCENES);
}

validatePiotrLijn();
