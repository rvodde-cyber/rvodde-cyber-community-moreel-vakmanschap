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

export type GreinerCrisisEp4Waarde = {
  titel: string;
  waarInSpel: string;
  symptomen: string[];
  verborgenDrijvers: string;
  spelmechaniek: string;
  piotrKoppeling: string;
  bron: string;
};

/** Sanne: data/sanne.ts (niet gekoppeld aan spelmotor). */

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
    if (slot === (greinerCrisisEp4 as ContentSlot<T>)) {
      return formatGreinerWaarde(slot.waarde as unknown as GreinerCrisisEp4Waarde, docent);
    }
    if (typeof slot.waarde === 'string') return slot.waarde;
    return JSON.stringify(slot.waarde);
  }
  if (docent && slot.status === 'concept' && slot.waarde != null) {
    if (slot === (greinerCrisisEp4 as ContentSlot<T>)) {
      return formatGreinerWaarde(slot.waarde as unknown as GreinerCrisisEp4Waarde, true);
    }
    return `[CONCEPT]\n${JSON.stringify(slot.waarde, null, 2)}`;
  }
  return docent ? slot.fallbackDocent : slot.fallbackSpeler;
}
