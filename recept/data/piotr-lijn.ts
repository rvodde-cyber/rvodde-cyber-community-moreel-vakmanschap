import { assertScenesConsistent, type MvFase, type Scene, type Status } from './contentStatus';

export type PiotrBeeldRef = 'I1' | 'I2' | 'I3' | 'I4' | 'I5' | 'placeholder';

export type PiotrScene = Scene & {
  fase: MvFase;
  beeld: PiotrBeeldRef;
  /** Slotscène ep4: vertakking zonder MT-contract ronde 2 — wacht op Richard */
  variantZonderContract?: { tekst: string; status: Status; bron?: string };
};

/** Conceptteksten uit docs/VOORSTELLEN-RECEPT-29-10-2026.md §2 — niet definitief zonder Richard. */
export const PIOTR_SCENES: PiotrScene[] = [
  {
    id: 'a4r1-piotr-intro',
    titel: 'Piotr op de lijn (ronde 1)',
    tekst:
      'Op de vloer van hal 2 staat een man die je niet kent bij naam, maar wel kent van gezicht: Piotr. Hij werkt voor Brabantse Personeelsdiensten, vierde ploegendienst deze maand. Peter Kramer van het bureau zegt over hem: "Komt op tijd, doet wat nodig is, vraagt weinig." De anderen op de flexploeg zijn namen op een lijst. Piotr is de enige van wie de ploegleider de koffievoorkeur weet.',
    status: 'concept',
    fase: 'zien',
    beeld: 'I4',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §2',
  },
  {
    id: 'a4r2-keuze-contract',
    titel: 'Interventie: Piotr in dienst nemen',
    tekst:
      'Piotr in dienst nemen. Pas mogelijk na een jaar via het bureau. Kleine post, ongeveer € 25.000 aan aanname- en overnamekosten. Het levert geen extra productie op. Het levert wel iets op waar jullie later naar kunnen kijken: wie horen er bij ons?',
    status: 'concept',
    fase: 'wegen',
    beeld: 'placeholder',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §2; data/ep4Interventies.ts interventieDefinitief=false',
  },
  {
    id: 'a4r2-harrie-belt',
    titel: 'Harrie belt',
    tekst:
      'Harrie belt, midden in jullie overleg. "Piotr is een van ons. Ik heb hem zelf binnengehaald, jongens, ik sta voor hem in. Defensie mag van mij alles vragen." Aan tafel blijft het even stil. Niet iedereen vindt dat je zomaar voor iemand kunt instaan.',
    status: 'concept',
    fase: 'voelen',
    beeld: 'placeholder',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §2',
  },
  {
    id: 'a4r2-erik-twijfel',
    titel: 'Erik twijfelt',
    tekst:
      'Erik legt zijn bril neer. "Ik twijfel niet aan Piotr. Ik twijfel aan wat het ons kost als er iets misgaat. Aansprakelijkheid, de licentie, de audit van Defensie. Dat is geen oordeel over een mens. Dat is een rekensom." Hij schuift een velletje met drie regels over de tafel.',
    status: 'concept',
    fase: 'wegen',
    beeld: 'placeholder',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §2',
  },
  {
    id: 'a4r2-dilemma-privebericht',
    titel: 'Dilemma via privébericht',
    tekst:
      'Privébericht van Piotr, 21:47 — "Ik wil u niet lastig vallen. Defensie wil mij screenen voor het project. Een collega zei dat het door waar ik vandaan kom ligt. Er is niets met mij aan de hand. Ik weet niet wat ik moet doen: zeggen dat ik het niet wil, of het laten gebeuren. Ik wil Harrie niet in verlegenheid brengen. Wat zou u doen?" Antwoordopties (geen juiste): (a) Je zegt dat je morgen met Harrie belt. (b) Je vraagt wat hij zelf wil. (c) Je zegt dat je eerst uitzoekt wat de screening inhoudt. (d) Je antwoordt niet meteen en wacht af.',
    status: 'concept',
    fase: 'handelen',
    beeld: 'placeholder',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §2; data/dilemmas/ep4-piotr.ts',
  },
  {
    id: 'a4-slot-testament',
    titel: 'Slotscène 2031 — testament',
    tekst:
      'Berkel-Enschot, een koude ochtend in 2031. Harrie is er niet meer. In zijn testament staat één zin: de schuur is voor Piotr. Hij schreef die zelf, zonder iemand te vragen. Eén zin is doorgestreept, met een andere pen. Piotr staat bij de deur en weet van niets.',
    status: 'concept',
    fase: 'volhouden',
    beeld: 'placeholder',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §2',
    variantZonderContract: {
      tekst: '',
      status: 'leeg',
      bron:
        'OPEN-VRAGEN: vertakking zonder MT-contract ronde 2 — zonder MT-contract had Harrie het zelf geregeld; het MT mist die kans (Richard bevestigen)',
    },
  },
  {
    id: 'a5-onthulling',
    titel: 'Onthulling 2036',
    tekst:
      'De brief lag al jaren in de schuur, tussen de recepten. Lies leest hem hardop en herkent Harries woorden. Erik zegt het zakelijk: de grond, Sanne, Optivora. Hij had het zo bedoeld. Sanne zit stil. Ze wist het niet.',
    status: 'concept',
    fase: 'zien',
    beeld: 'I5',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §2',
  },
  {
    id: 'a5-overdracht',
    titel: 'Overdracht schuur',
    tekst:
      'Piotr is inmiddels ploegleider. Zijn huis en gezin staan in Nederland. Hij kijkt naar de schuur, naar Lotte, en draagt hem over. Lies geeft haar beslissende stem aan Lotte.',
    status: 'concept',
    fase: 'volhouden',
    beeld: 'I5',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §2',
  },
];

export function sceneById(id: string): PiotrScene | undefined {
  return PIOTR_SCENES.find((s) => s.id === id);
}

export function validatePiotrLijn(): void {
  assertScenesConsistent(PIOTR_SCENES);
}

validatePiotrLijn();
