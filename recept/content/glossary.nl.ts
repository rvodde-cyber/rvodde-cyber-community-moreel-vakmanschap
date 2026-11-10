import type { EpisodeId } from '@data/episodes/meta';
import { personenInGlossariumVoorAflevering } from '@data/glossarium';

export type Begrip = { term: string; uitleg: string };

/** Personen per aflevering voor het glossarium (data/personen.ts + glossarium.ts) */
export function personenVoorGlossarium(episode: EpisodeId, toonPiotr: boolean) {
  const round: 1 | 2 = toonPiotr ? 2 : 1;
  return personenInGlossariumVoorAflevering(episode, round).map((p) => ({
    term: p.naam,
    uitleg: p.tekst,
  }));
}

export const BEGRIPPEN: Begrip[] = [
  {
    term: 'MT',
    uitleg: 'Het MT rond Harrie: Harrie, Lies, Gerrit, Marco, Sanne en anderen. Jullie beslissen het budget; zij adviseren, werken tegen of zwijgen.',
  },
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
