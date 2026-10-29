import type { EpisodeId } from './episodes/meta';
import type { Status } from './contentStatus';

/** Skeletinterventies afleveringen 1, 2, 3, 5 — niet gekoppeld aan spelmotor tot Richard akkoord. */
export type InterventieSkelet = {
  id: string;
  episode: Exclude<EpisodeId, 4>;
  interventie: string;
  anker: string;
  effectMeters: string;
  menselijkeMaat: string;
  ethischRisico: string;
  opvolgingsgevolg: string;
  status: Status;
  interventieDefinitief: false;
  bron: string;
};

/** docs/VOORSTELLEN-RECEPT-29-10-2026.md §7 + docs/INTERVENTIES-AFLEVERING-* */
export const INTERVENTIES_SKELET: InterventieSkelet[] = [
  // Aflevering 1 — leiderschapscrisis
  {
    id: 'a1-i1',
    episode: 1,
    interventie: 'Rollen en afspraken op papier zetten',
    anker: 'Greiner (1972)',
    effectMeters: 'Productiviteit ↑ licht, betrokkenheid ↔',
    menselijkeMaat: '↑',
    ethischRisico: 'Minder ruimte voor informele zorg',
    opvolgingsgevolg: 'Wordt later basis voor het functiehuis',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a1-i2',
    episode: 1,
    interventie: 'Oprichter laat taken los (eerste ploegleider)',
    anker: 'JD-R',
    effectMeters: 'Betrokkenheid ↑, risico op kwaliteit ↓',
    menselijkeMaat: '↑',
    ethischRisico: 'Overdracht zonder opleiding',
    opvolgingsgevolg: 'Ploegleider klaagt over werkdruk',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a1-i3',
    episode: 1,
    interventie: 'Investeren in koffie- en pauzeruimte',
    anker: 'HPWS (Appelbaum et al., 2000)',
    effectMeters: 'Verzuim ↓, kosten ↑',
    menselijkeMaat: '↑',
    ethischRisico: 'Symbolisch als het bij een gebaar blijft',
    opvolgingsgevolg: 'Vertrouwen groeit, tenzij beloofd "extra" uitblijft',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a1-i4',
    episode: 1,
    interventie: 'Extra jongeren inhuren als flex',
    anker: 'Kostenfocus',
    effectMeters: 'Productiviteit ↑',
    menselijkeMaat: '↓',
    ethischRisico: 'Eerste vorm van anonieme flexploeg',
    opvolgingsgevolg: 'Later: wie hoort erbij?',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  // Aflevering 2 — autonomiecrisis
  {
    id: 'a2-i1',
    episode: 2,
    interventie: 'Functiehuis invoeren',
    anker: 'Greiner',
    effectMeters: 'Verloop ↓, betrokkenheid ↔',
    menselijkeMaat: '↔',
    ethischRisico: 'Schijnzekerheid',
    opvolgingsgevolg: 'Wordt A4-bureaucratie',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a2-i2',
    episode: 2,
    interventie: 'Ploegoverleg met zeggenschap',
    anker: 'JD-R, HPWS',
    effectMeters: 'Betrokkenheid ↑, tempo ↓',
    menselijkeMaat: '↑',
    ethischRisico: 'Tijdwinst en zeggenschap botsen',
    opvolgingsgevolg: 'Ploegleiders vragen meer mandaat',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a2-i3',
    episode: 2,
    interventie: 'Bonus op volume',
    anker: 'Gallup/motivatie',
    effectMeters: 'Productiviteit ↑, verzuim ↑ later',
    menselijkeMaat: '↓',
    ethischRisico: 'Perverse prikkels',
    opvolgingsgevolg: 'Kwaliteitsproblemen in A3',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a2-i4',
    episode: 2,
    interventie: 'OR formeel betrekken',
    anker: 'Zeggenschap',
    effectMeters: 'Vertrouwen ↑, snelheid ↓',
    menselijkeMaat: '↑',
    ethischRisico: 'Vorm zonder inhoud',
    opvolgingsgevolg: 'Joost wordt serieus gesprekspartner',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  // Aflevering 3 — controlecrisis
  {
    id: 'a3-i1',
    episode: 3,
    interventie: 'Afdelingen eigen winstverantwoordelijkheid',
    anker: 'Greiner',
    effectMeters: 'Productiviteit ↑, onderlinge samenwerking ↓',
    menselijkeMaat: '↓',
    ethischRisico: 'Zelfverrijking',
    opvolgingsgevolg: 'Rivaliteit tussen afdelingen',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a3-i2',
    episode: 3,
    interventie: 'Centrale rapportage (MT-dashboard)',
    anker: 'Controle',
    effectMeters: 'Transparantie ↑, vertrouwen ↓',
    menselijkeMaat: '↓',
    ethischRisico: 'Wantrouwen als standaard',
    opvolgingsgevolg: 'Voorbode van TEMPO/PILOT',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a3-i3',
    episode: 3,
    interventie: 'Reorganisatie met sociaal plan',
    anker: 'Verandermanagement',
    effectMeters: 'Verloop ↑ tijdelijk, kosten ↑',
    menselijkeMaat: '↑',
    ethischRisico: 'Onzekerheid, angst',
    opvolgingsgevolg: 'Verzuim stijgt kort',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a3-i4',
    episode: 3,
    interventie: 'Investeren in automatisering',
    anker: 'AMO',
    effectMeters: 'Productiviteit ↑',
    menselijkeMaat: '↓',
    ethischRisico: 'Verdringing van mensen',
    opvolgingsgevolg: 'A4: drones en AI-aansturing',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  // Aflevering 5 — opvolging
  {
    id: 'a5-i1',
    episode: 5,
    interventie: 'Familieraad voor opvolging',
    anker: 'Governance',
    effectMeters: 'Betrokkenheid ↑, snelheid ↓',
    menselijkeMaat: '↑',
    ethischRisico: 'Uitsluiting niet-familie',
    opvolgingsgevolg: 'Erfenisconflict wordt zichtbaar',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a5-i2',
    episode: 5,
    interventie: 'Waarden en doel opnieuw formuleren',
    anker: 'JD-R (zingeving)',
    effectMeters: 'Betrokkenheid ↑',
    menselijkeMaat: '↑',
    ethischRisico: 'Slogans zonder daden',
    opvolgingsgevolg: 'Lies en Lotte krijgen weer gehoor',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a5-i3',
    episode: 5,
    interventie: 'Verkoop aan investeerder',
    anker: 'Kostenfocus',
    effectMeters: 'Resultaat ↑',
    menselijkeMaat: '↓',
    ethischRisico: 'Verlies van betekenis',
    opvolgingsgevolg: 'Schuur en Piotr-lijn in gevaar',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
  {
    id: 'a5-i4',
    episode: 5,
    interventie: 'Bureaucratie afslanken',
    anker: 'Greiner',
    effectMeters: 'Tempo ↑, controle ↓',
    menselijkeMaat: '↑',
    ethischRisico: 'Risico bij Defensie',
    opvolgingsgevolg: 'Piotr en ploegleiders krijgen mandaat',
    status: 'concept',
    interventieDefinitief: false,
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §7',
  },
];

export function assertInterventiesSkeletConsistent(items: InterventieSkelet[]): void {
  for (const i of items) {
    if (i.interventieDefinitief !== false) {
      throw new Error(`${i.id}: interventieDefinitief moet false blijven tot Richard akkoord`);
    }
  }
}

assertInterventiesSkeletConsistent(INTERVENTIES_SKELET);
