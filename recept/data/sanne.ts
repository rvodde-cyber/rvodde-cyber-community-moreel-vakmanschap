import { resolveScene, type Scene } from './contentStatus';

const BRON = 'docs/SANNE-UITWERKING-29-10-2026.md';

export type SanneContract = 'ja' | 'nee';
export type SanneToon = 'A' | 'B';

export const SANNE_STANDAARD_TOON: SanneToon = 'A';

function scene(id: string, titel: string, tekst: string): Scene {
  return { id, titel, tekst, status: 'concept', bron: BRON };
}

/** MT-besluit "Piotr in dienst nemen" × toon A/B — geen spelmotor-koppeling in v1. */
export const sanneReactieEp4: Record<SanneContract, Record<SanneToon, Scene>> = {
  ja: {
    A: scene(
      'sanne-ep4-ja-a',
      'Sanne na MT-besluit (contract ja, toon A)',
      'Sanne (groepsapp): "Goed dat we hem een contract geven. Maar maandag komt het screeningsformulier van Defensie, en ik wil niet dat Piotr dat als eerste bij een collega hoort. Wie praat er vóór het formulier met hem? Niet via een systeem, maar met hem."',
    ),
    B: scene(
      'sanne-ep4-ja-b',
      'Sanne na MT-besluit (contract ja, toon B)',
      'Sanne (groepsapp): "Ik zeg niet nee. Maar ik wil niet dat we hier te snel in zijn gegaan. Weet Piotr zelf wat dit voor hem betekent, ook met Defensie erbij? Laten we eerst met hem praten, niet over hem."',
    ),
  },
  nee: {
    A: scene(
      'sanne-ep4-nee-a',
      'Sanne na MT-besluit (contract nee, toon A)',
      'Sanne (groepsapp): "Ik snap dat het financieel niet paste. Maar Harrie staat bij Defensie voor hem in, en wij hebben hem niets terug te zeggen. Als dat uitkomt, wat leggen we dan uit? Ik wil in elk geval dat iemand hem vertelt wat er speelt, vóór hij het van een collega hoort."',
    ),
    B: scene(
      'sanne-ep4-nee-b',
      'Sanne na MT-besluit (contract nee, toon B)',
      'Sanne (groepsapp): "Ik wil dit niet laten rusten. Piotr zit er al een jaar, Harrie staat voor hem in, en wij zeggen niets. Dat kan, maar dan wil ik het wel hardop horen: waarom niet?"',
    ),
  },
};

export const sanneSlotEp4: Scene = scene(
  'sanne-slot-ep4',
  'Sanne in slotscène 2031',
  'Sanne leest de zin twee keer. Ze kijkt niet naar Erik of naar de familie. "Heeft iemand Piotr al gesproken?" vraagt ze. Niemand antwoordt meteen.',
);

export const sanneOnthullingEp5: Scene = scene(
  'sanne-onthulling-ep5',
  'Sanne bij onthulling 2036',
  'Sanne zit stil terwijl Erik uitlegt. Wat hij zegt klopt, voor zover ze het kan nagaan. Dat is wat haar het meest raakt. "Ik heb jaren die stukken getekend," zegt ze. "Ik heb nooit gevraagd wat er niet in stond."',
);

export function resolveSanneReactie(
  contract: SanneContract,
  toon: SanneToon,
  docent: boolean,
): ReturnType<typeof resolveScene> & { toon: SanneToon; contract: SanneContract } {
  const s = sanneReactieEp4[contract][toon];
  const r = resolveScene(s, docent);
  return { ...r, toon, contract };
}

export function assertSanneScenesConsistent(): void {
  for (const contract of ['ja', 'nee'] as const) {
    for (const toon of ['A', 'B'] as const) {
      const s = sanneReactieEp4[contract][toon];
      if (s.status === 'definitief' && !s.tekst.trim()) {
        throw new Error(`sanneReactieEp4 ${contract}/${toon}: definitief zonder tekst`);
      }
    }
  }
  for (const s of [sanneSlotEp4, sanneOnthullingEp5]) {
    if (s.status === 'definitief' && !s.tekst.trim()) {
      throw new Error(`${s.id}: definitief zonder tekst`);
    }
  }
}

assertSanneScenesConsistent();
