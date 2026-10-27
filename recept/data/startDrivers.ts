/** Startdrijvers ronde 1 — bron: referentie/demo-aflevering4-v6.html */
export const START_DRIVERS = {
  tempo: 80,
  controle: 70,
  rolonduid: 55,
  bureaucratie: 30,
  moreel: 15,
  techniek: 60,
  verantw: 40,
  regelruimte: 30,
  steunlg: 40,
  collegas: 55,
  betekenis: 35,
  ontwikkeling: 40,
  erkenning: 30,
  middelen: 40,
  vaardigheden: 60,
  inspraak: 30,
} as const;

export type DriverKey = keyof typeof START_DRIVERS;
export type Drivers = Record<DriverKey, number>;

export const RESOURCE_DRIVER_KEYS: DriverKey[] = [
  'regelruimte',
  'steunlg',
  'collegas',
  'betekenis',
  'ontwikkeling',
  'erkenning',
  'middelen',
];

export const HR_COST_PARAMS = {
  prod: 204,
  eng: 36,
  sal: 42000,
  dagen: 130,
  dagkost: 300,
  wervP: 4500,
  inwP: 8100,
  wervE: 17500,
  inwE: 52500,
} as const;
