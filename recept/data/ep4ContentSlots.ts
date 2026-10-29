/** Inhoudsslots — Richard/Claude vullen; app toont fallback zolang status !== definitief */

import type { Status } from './contentStatus';

export type ContentSlotStatus = Status;

export type ContentSlot<T> = {
  status: ContentSlotStatus;
  /** Alleen tonen aan spelers als status === definitief */
  waarde: T | null;
  fallbackSpeler: string;
  fallbackDocent: string;
};

export type SanneReactieEp4Waarde = {
  standaardVariant: 'A' | 'B';
  variantA: {
    bijContract: string;
    zonderContract: string;
  };
  variantB: {
    bijContract: string;
    zonderContract: string;
  };
  bron: string;
};

export type GreinerCrisisEp4Waarde = {
  titel: string;
  waarInSpel: string;
  symptomen: string[];
  verborgenDrijvers: string;
  spelmechaniek: string;
  piotrKoppeling: string;
  bron: string;
};

/** docs/VOORSTELLEN-RECEPT-29-10-2026.md §3 + docs/SANNE-UITWERKING-29-10-2026.md */
export const sanneReactieEp4: ContentSlot<SanneReactieEp4Waarde> = {
  status: 'concept',
  waarde: {
    standaardVariant: 'A',
    variantA: {
      bijContract:
        'Sanne (groepsapp): "Goed dat we hem een contract geven. Maar maandag komt het screeningsformulier van Defensie, en ik wil niet dat Piotr dat als eerste bij een collega hoort. Wie praat er vóór het formulier met hem? Niet via een systeem, maar met hem."',
      zonderContract:
        'Sanne (groepsapp): "Ik snap dat het financieel niet paste. Maar Harrie staat bij Defensie voor hem in, en wij hebben hem niets terug te zeggen. Als dat uitkomt, wat leggen we dan uit? Ik wil in elk geval dat iemand hem vertelt wat er speelt, vóór hij het van een collega hoort."',
    },
    variantB: {
      bijContract:
        'Sanne (groepsapp): "Ik zeg niet nee. Maar ik wil niet dat we hier te snel in zijn gegaan. Weet Piotr zelf wat dit voor hem betekent, ook met Defensie erbij? Laten we eerst met hem praten, niet over hem."',
      zonderContract:
        'Sanne (groepsapp): "Ik wil dit niet laten rusten. Piotr zit er al een jaar, Harrie staat voor hem in, en wij zeggen niets. Dat kan, maar dan wil ik het wel hardop horen: waarom niet?"',
    },
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §3; SANNE-UITWERKING §3',
  },
  fallbackSpeler: 'Dit onderdeel volgt.',
  fallbackDocent:
    'sanneReactieEp4: concept — niet gekoppeld aan spelmotor. Standaard variant A; zie waarde in data/ep4ContentSlots.ts.',
};

/** docs/VOORSTELLEN-RECEPT-29-10-2026.md §4 */
export const greinerCrisisEp4: ContentSlot<GreinerCrisisEp4Waarde> = {
  status: 'concept',
  waarde: {
    titel: 'Greiner aflevering 4: bureaucratiecrisis (red tape)',
    waarInSpel: 'Vanaf ronde 3 van aflevering 4, zichtbaar in het dashboard.',
    symptomen: [
      'Doorlooptijd van besluiten neemt toe',
      'Staf wordt groter dan de vloer',
      'Innovatieprojecten stranden in procedures',
      'Medewerkers zeggen "dat moet via PILOT"',
      'Verzuim bij stafafdelingen loopt op',
      'Ploegleiders voelen zich genegeerd',
    ],
    verborgenDrijvers:
      'JD-R (eisen: administratie, controles, rapportage; hulpbronnen: autonomie, steun) en HPWS (zeggenschap, informatie, opleiding).',
    spelmechaniek:
      'Elke extra systeemlaag (TEMPO, PILOT, auditsysteem) verhoogt controle maar verlaagt snelheid en menselijke maat. Teams kunnen kiezen voor: administratielast verlagen, mandaat teruggeven aan ploegleiders, of externe audit versoberen. Het Defensie-contract gaat door; de crisis raakt vooral cultuur en tempo.',
    piotrKoppeling:
      'De Defensie-screening is een voorbeeld van procedure zonder menselijke maat; het dilemma blijft persoonlijk en niet systemisch uitgelegd.',
    bron: 'docs/VOORSTELLEN-RECEPT-29-10-2026.md §4',
  },
  fallbackSpeler: 'Dit onderdeel volgt.',
  fallbackDocent:
    'greinerCrisisEp4: concept — niet gekoppeld aan spelmotor. Zie waarde in data/ep4ContentSlots.ts.',
};

function formatSanneWaarde(w: SanneReactieEp4Waarde, docent: boolean): string {
  const lines = [
    `[CONCEPT · standaard variant ${w.standaardVariant}]`,
    'Variant A — bij contract:',
    w.variantA.bijContract,
    'Variant A — zonder contract:',
    w.variantA.zonderContract,
    'Variant B — bij contract:',
    w.variantB.bijContract,
    'Variant B — zonder contract:',
    w.variantB.zonderContract,
  ];
  if (docent) lines.push(`Bron: ${w.bron}`);
  return lines.join('\n\n');
}

function formatGreinerWaarde(w: GreinerCrisisEp4Waarde, docent: boolean): string {
  const lines = [
    `[CONCEPT] ${w.titel}`,
    w.waarInSpel,
    'Symptomen:',
    ...w.symptomen.map((s) => `• ${s}`),
    `Verborgen drijvers: ${w.verborgenDrijvers}`,
    `Spelmechaniek: ${w.spelmechaniek}`,
    `Piotr-koppeling: ${w.piotrKoppeling}`,
  ];
  if (docent) lines.push(`Bron: ${w.bron}`);
  return lines.join('\n\n');
}

export function slotTekst<T>(slot: ContentSlot<T>, docent: boolean): string {
  if (slot.status === 'definitief' && slot.waarde != null) {
    if (slot === (sanneReactieEp4 as ContentSlot<T>)) {
      return formatSanneWaarde(slot.waarde as unknown as SanneReactieEp4Waarde, docent);
    }
    if (slot === (greinerCrisisEp4 as ContentSlot<T>)) {
      return formatGreinerWaarde(slot.waarde as unknown as GreinerCrisisEp4Waarde, docent);
    }
    if (typeof slot.waarde === 'string') return slot.waarde;
    return JSON.stringify(slot.waarde);
  }
  if (docent && slot.status === 'concept' && slot.waarde != null) {
    if (slot === (sanneReactieEp4 as ContentSlot<T>)) {
      return formatSanneWaarde(slot.waarde as unknown as SanneReactieEp4Waarde, true);
    }
    if (slot === (greinerCrisisEp4 as ContentSlot<T>)) {
      return formatGreinerWaarde(slot.waarde as unknown as GreinerCrisisEp4Waarde, true);
    }
    return `[CONCEPT]\n${JSON.stringify(slot.waarde, null, 2)}`;
  }
  return docent ? slot.fallbackDocent : slot.fallbackSpeler;
}
