import { nabesprekingEp4Schema, type NabesprekingVraagEp4 } from './schemas/nabespreking-ep4.schema';

/** Gespreksvragen nabespreking aflevering 4 — bron: docs/VOORSTELLEN-RECEPT-29-10-2026.md §5 */
export const NABESPREKING_EP4: NabesprekingVraagEp4[] = [
  {
    id: 'ep4-nb-1',
    fase: 'zien',
    status: 'concept',
    tekst:
      'Wat viel je op aan hoe Piotr in de fabriek werd gezien? Wat viel je op aan wie wél en wie níet een naam had?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-2',
    fase: 'zien',
    status: 'concept',
    tekst: 'Welke informatie had je nodig om het dilemma goed te begrijpen? Wat miste je?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-3',
    fase: 'voelen',
    status: 'concept',
    tekst: 'Wat deed het bericht van Piotr met je? Welke gevoelens kwamen op, en bij wie?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-4',
    fase: 'voelen',
    status: 'concept',
    tekst: 'Waar voelde je spanning tussen loyaliteit, veiligheid en eerlijkheid?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-5',
    fase: 'wegen',
    status: 'concept',
    tekst:
      'Welke belangen speelden mee: van Piotr, Harrie, Erik, het MT, Defensie? Welke leken vanzelfsprekend, welke gingen verloren?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-6',
    fase: 'wegen',
    status: 'concept',
    tekst: 'Waar werd een zakelijk argument ingezet, en wat werd daarmee besproken (of juist niet)?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-7',
    fase: 'wegen',
    status: 'concept',
    tekst: 'Wat betekent het om "instaan" voor iemand? Wat kost dat, en wie draagt dat?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-8',
    fase: 'handelen',
    status: 'concept',
    tekst: 'Wat heb je gedaan, en wat had je anders kunnen doen? Waarom koos je zoals je koos?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-9',
    fase: 'handelen',
    status: 'concept',
    tekst: 'Wat zou nodig zijn geweest om iets anders te kiezen: informatie, tijd, steun?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-10',
    fase: 'volhouden',
    status: 'concept',
    tekst: 'Wat gebeurt er op de lange termijn met een keuze die vandaag klein lijkt (testament 2031)?',
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-11',
    fase: 'volhouden',
    status: 'concept',
    tekst: "Wat heeft een organisatie nodig om zulke dilemma's ook onder druk menselijk te houden?",
    thema: 'piotr-lijn',
  },
  {
    id: 'ep4-nb-12',
    fase: 'volhouden',
    status: 'concept',
    tekst: 'Wat neem je mee naar je eigen werkplek of stage?',
    thema: 'piotr-lijn',
  },
];

export function validateNabesprekingEp4() {
  return nabesprekingEp4Schema.safeParse(NABESPREKING_EP4);
}
