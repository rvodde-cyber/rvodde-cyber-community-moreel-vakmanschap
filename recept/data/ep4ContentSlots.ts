/** Inhoudsslots — Richard/Claude vullen; app toont fallback zolang status !== definitief */

export type ContentSlotStatus = 'leeg' | 'concept' | 'definitief';

export type ContentSlot<T> = {
  status: ContentSlotStatus;
  /** Alleen tonen aan spelers als status === definitief */
  waarde: T | null;
  fallbackSpeler: string;
  fallbackDocent: string;
};

export const sanneReactieEp4: ContentSlot<string> = {
  status: 'leeg',
  waarde: null,
  fallbackSpeler:
    'De reactie van Sanne op deze ronde is nog niet vastgelegd in het spel. Bespreek in de nabespreking wat jullie verwacht hadden.',
  fallbackDocent:
    'Slot sanneReactieEp4 is leeg. Vul via docs/OPEN-VRAGEN.md wanneer Richard/Claude de tekst aanlevert.',
};

export const greinerCrisisEp4: ContentSlot<{ ronde1: string; ronde2: string; bron: string }> = {
  status: 'leeg',
  waarde: null,
  fallbackSpeler:
    'De Greiner-crisis per ronde volgt de demo (leiderschap / autonomie). Het serieconcept noemt bureaucratie — zie docs/AFWIJKINGEN.md.',
  fallbackDocent:
    'Slot greinerCrisisEp4: leeg. Demo-waarden staan in data/rounds.ts; definitieve keuze wacht op Richard.',
};

export function slotTekst<T>(slot: ContentSlot<T>, docent: boolean): string {
  if (slot.status === 'definitief' && slot.waarde != null) {
    if (typeof slot.waarde === 'string') return slot.waarde;
    return JSON.stringify(slot.waarde);
  }
  return docent ? slot.fallbackDocent : slot.fallbackSpeler;
}
