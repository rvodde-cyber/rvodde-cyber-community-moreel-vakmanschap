import { PERSONEN } from '@data/personen';

export type Begrip = { term: string; uitleg: string };

/** Personen: teksten letterlijk uit CURSOR-PROMPT §8.2 (via data/personen.ts) */
export function personenVoorGlossarium(toonPiotr: boolean) {
  const kern = PERSONEN.filter((p) =>
    ['harrie-van-gorp', 'marco-van-gorp', 'ans-willems', 'erik-verhoeven', 'joost-hendriks'].includes(p.slug),
  );
  const piotr = PERSONEN.find((p) => p.slug === 'piotr-nowak');
  const lijst = toonPiotr && piotr ? [...kern, piotr] : kern;
  return lijst.map((p) => ({ term: p.naam, uitleg: p.tekst }));
}

export const BEGRIPPEN: Begrip[] = [
  { term: 'MT', uitleg: 'Het managementteam. Dat zijn jullie, met de rollen directeur, financiën, HR en OR.' },
  { term: 'OR', uitleg: 'De ondernemingsraad: die vertegenwoordigt de medewerkers richting de directie.' },
  { term: 'TEMPO', uitleg: 'Het sturingssysteem dat op de vloer het werktempo en de norm bepaalt.' },
  { term: 'PILOT', uitleg: 'Het algoritme dat de leiding advies geeft. Jullie mogen het volgen of zelf wegen.' },
  {
    term: 'Interventie',
    uitleg: 'Een maatregel die jullie kiezen, zoals coaching, een bonus of nieuwe regels. Elke ronde kiezen jullie er twee.',
  },
  {
    term: 'Symptoom en oorzaak',
    uitleg: 'Een symptoom is wat je ziet in de cijfers, zoals hoog verzuim. De oorzaak is de reden daarachter. Vraag je steeds af: waarom is dit zo?',
  },
  {
    term: 'Begroting',
    uitleg: 'Het geld dat jullie deze ronde mogen verdelen. Marco’s voorstel is het startpunt: jullie mogen het aanpassen.',
  },
];
