import type { Persoon } from './schemas/personen.schema';

/** Volgorde en teksten: CURSOR-PROMPT.md §8.2 */
export const PERSONEN: Persoon[] = [
  {
    slug: 'harrie-van-gorp',
    naam: 'Harrie van Gorp',
    leeftijd: 71,
    rol: 'President-commissaris',
    tekst: 'Jullie broer, 71 jaar en president-commissaris van Van Gorp Drones.',
    portretAlt: 'Portret van Harrie van Gorp, president-commissaris',
  },
  {
    slug: 'marco-van-gorp',
    naam: 'Marco van Gorp',
    leeftijd: 46,
    rol: 'Directeur',
    tekst: 'Harries zoon en jullie neef. Hij stelde de begroting op en wil vrijdag een plan zien.',
    portretAlt: 'Portret van Marco van Gorp, directeur',
  },
  {
    slug: 'ans-willems',
    naam: 'Ans Willems',
    leeftijd: 57,
    rol: 'Ploegleider',
    tekst: 'Ploegleider op de vloer. Zij voert de normen uit die TEMPO bepaalt.',
    portretAlt: 'Portret van Ans Willems, ploegleider',
  },
  {
    slug: 'erik-verhoeven',
    naam: 'Erik Verhoeven',
    leeftijd: 49,
    rol: 'Adviseur Optivora',
    tekst: 'Adviseur van Optivora, de leverancier van TEMPO en PILOT. Hij heeft ook iets te verkopen.',
    portretAlt: 'Portret van Erik Verhoeven, adviseur Optivora',
  },
  {
    slug: 'joost-hendriks',
    naam: 'Joost Hendriks',
    leeftijd: 52,
    rol: 'Medewerkersvertegenwoordiging',
    tekst: 'Denkt mee vanuit de medewerkers en vraagt of de OR wordt betrokken.',
    portretAlt: 'Portret van Joost Hendriks, medewerkersvertegenwoordiging',
  },
  {
    slug: 'dennis-kuijpers',
    naam: 'Dennis Kuijpers',
    leeftijd: 39,
    rol: 'Financieel directeur',
    tekst: 'Financieel directeur in het MT; zijn beloning hangt af van het halfjaarresultaat.',
    portretAlt: 'Portret van Dennis Kuijpers, financieel directeur',
  },
  {
    slug: 'yasmin-el-amrani',
    naam: 'Yasmin El Amrani',
    leeftijd: 29,
    rol: 'HR-manager',
    tekst: 'HR-manager; PILOT en personeelsbeleid vallen onder haar verantwoordelijkheid.',
    portretAlt: 'Portret van Yasmin El Amrani, HR-manager',
  },
  {
    slug: 'piotr-nowak',
    naam: 'Piotr Nowak',
    leeftijd: 34,
    rol: 'Engineer',
    tekst: 'Engineer in de assemblage; zijn dilemma raakt de defensieorder en vertrouwen op de vloer.',
    portretAlt: 'Portret van Piotr Nowak, engineer',
  },
];
