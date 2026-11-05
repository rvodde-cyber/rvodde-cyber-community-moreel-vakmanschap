import type { EpisodeId } from './meta';
import type { RoundDefinition } from '../schemas/rounds.schema';

export type TijdgeestGeluidBron = 'geen' | 'eigen' | 'rechtenvrij';

export type TijdgeestGeluid = {
  id: string;
  label: string;
  tekstalternatief: string;
  bron: TijdgeestGeluidBron;
  /** Optioneel pad onder public/; geen bestand = stille fallback */
  audioPath?: string;
};

export type TijdgeestRekwisiet = {
  id: string;
  omschrijving: string;
  beeldCode: string;
};

export type Tijdgeest = {
  rekwisieten: TijdgeestRekwisiet[];
  geluid: TijdgeestGeluid | null;
  ticker: RoundDefinition['ticker'];
};

/** Letterlijke teksten: docs/TIJDGEEST.md (5 november 2026). */
export const TIJDGEEST: Record<EpisodeId, Tijdgeest> = {
  1: {
    rekwisieten: [
      {
        id: 'renault-5-1984',
        omschrijving: 'Rode Renault 5 voor de schuur, kratten kroketten op de achterbank',
        beeldCode: 'RENAULT-84',
      },
      {
        id: 'cassette-the-cure',
        omschrijving:
          'Cassetterecorder in de schuur met een bandje waarop met de hand "The Cure" staat',
        beeldCode: 'REKW-84-CASSETTE',
      },
      {
        id: 'telefoon-draaischijf',
        omschrijving: 'Telefoon met draaischijf',
        beeldCode: 'REKW-84-TELEFOON',
      },
    ],
    geluid: {
      id: 'a1-cassette',
      label: 'Cassettemuziek (optioneel)',
      tekstalternatief: '♪ cassettemuziek, zacht',
      bron: 'eigen',
    },
    ticker: [
      ['i', 'Telefoon bezet. Weer.'],
      ['!', 'De Renault 5 staat te dicht op de schuurdeur.'],
      ['i', 'Op de cassette: The Cure, zachtjes, bij het inpakken.'],
    ],
  },
  2: {
    rekwisieten: [
      {
        id: 'renault-5-1996',
        omschrijving: 'Dezelfde auto, roestig, achter het hek op het industrieterrein',
        beeldCode: 'RENAULT-96',
      },
      {
        id: 'pc-90s',
        omschrijving: 'Beige pc uit de jaren negentig',
        beeldCode: 'REKW-96-PC',
      },
      {
        id: 'semafoon',
        omschrijving: 'Semafoon op het bureau',
        beeldCode: 'REKW-96-SEMAFOON',
      },
    ],
    geluid: {
      id: 'a2-kantine',
      label: 'Kantinemuziek (optioneel)',
      tekstalternatief: '♪ zomerse dance-pop in de kantine, zacht',
      bron: 'rechtenvrij',
    },
    ticker: [
      ['i', 'Euro ’96: de ploeg kijkt mee in de pauze.'],
      ['i', 'Macarena in de kantine. Niemand weet wie het aanzette.'],
      ['!', 'De semafoon piept. Niemand weet van wie.'],
    ],
  },
  3: {
    rekwisieten: [
      {
        id: 'renault-5-2009',
        omschrijving: 'Klassieker op het parkeerterrein, jongere medewerkers maken grapjes',
        beeldCode: 'RENAULT-09',
      },
      {
        id: 'blackberry',
        omschrijving: 'BlackBerry',
        beeldCode: 'REKW-09-BLACKBERRY',
      },
      {
        id: 'hyves-pc',
        omschrijving: 'Pc met Hyves open',
        beeldCode: 'REKW-09-HYVES',
      },
      {
        id: 'wii-pauze',
        omschrijving: 'Wii in de pauzeruimte',
        beeldCode: 'REKW-09-WII',
      },
    ],
    geluid: {
      id: 'a3-chat',
      label: 'Chatmelding (optioneel)',
      tekstalternatief: '♪ meldingsgeluidje van een chatprogramma',
      bron: 'eigen',
    },
    ticker: [
      ['i', 'Kredietcrisis: iedereen zegt "in deze tijd".'],
      ['!', 'Hyves staat open op de pc van de planning. Weer.'],
      ['i', 'Wii in de pauzeruimte: de ploeg van Dongen staat bovenaan.'],
    ],
  },
  4: {
    rekwisieten: [
      {
        id: 'renault-5-2026',
        omschrijving: 'De nieuwe elektrische Renault 5: leaseauto van Marco',
        beeldCode: 'RENAULT-26',
      },
      {
        id: 'padelbaan',
        omschrijving: 'Padelbaan op het terrein',
        beeldCode: 'REKW-26-PADEL',
      },
      {
        id: 'smartwatch',
        omschrijving: 'Smartwatch',
        beeldCode: 'REKW-26-SMARTWATCH',
      },
    ],
    geluid: {
      id: 'a4-melding',
      label: 'Meldingsgeluiden (optioneel)',
      tekstalternatief: '♪ meldingstonen, zacht',
      bron: 'eigen',
    },
    ticker: [
      ['i', 'AI-notulist: 14 actiepunten, 0 eigenaren.'],
      ['i', 'Padelbaan op het terrein: baan 2 is al een maand vol.'],
      ['!', 'Marco’s leaseauto staat op de plek van de ploegleider. Elektrisch.'],
    ],
  },
  5: {
    rekwisieten: [
      {
        id: 'renault-5-2036',
        omschrijving: 'De oude rode Renault 5 in een glazen vitrine in de lobby, als erfgoed',
        beeldCode: 'RENAULT-36',
      },
      {
        id: 'bezorgwagen',
        omschrijving: 'Zelfrijdende bezorgwagen',
        beeldCode: 'REKW-36-BEZORG',
      },
    ],
    geluid: {
      id: 'a5-koffie',
      label: 'Koffieautomaat (optioneel)',
      tekstalternatief: '♪ zachte, synthetische stem van de koffieautomaat',
      bron: 'eigen',
    },
    ticker: [
      ['i', 'Koffieautomaat: je hebt vandaag nog niet bewogen.'],
      ['i', 'De rode auto in de lobby is vandaag gepoetst. Door een robot.'],
      ['!', 'Bezorgwagen zonder bestuurder staat weer te lang bij de laaddock.'],
    ],
  },
};

export function tijdgeestVoor(episode: EpisodeId): Tijdgeest {
  return TIJDGEEST[episode];
}
