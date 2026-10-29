import { PIOTR_SCENES } from '../piotr-lijn';
import type { Interventie } from './types';
import { INTERVENTIES_PER_RONDE, KEUZES_PER_RONDE } from './types';

const REQUIRED_STRING_KEYS: (keyof Interventie)[] = [
  'id',
  'naam',
  'omschrijving',
  'anker',
  'ethischRisico',
  'uitkomsttekst',
  'opvolging',
  'bron',
];

function isMeterEffectComplete(e: Interventie['effect']): boolean {
  return (
    e.productiviteit != null &&
    e.betrokkenheid != null &&
    e.verzuim != null &&
    e.verloop != null &&
    e.budget != null
  );
}

export function interventieVeldenCompleet(i: Interventie): boolean {
  if (!isMeterEffectComplete(i.effect)) return false;
  if (i.verborgen.eerlijkheid == null || i.verborgen.menselijkeMaat == null) return false;
  for (const k of REQUIRED_STRING_KEYS) {
    const v = i[k];
    if (typeof v !== 'string' || !v.trim()) return false;
  }
  return true;
}

export function assertInterventieDefinitiefCompleet(items: Interventie[]): void {
  for (const i of items) {
    if (i.interventieDefinitief && !interventieVeldenCompleet(i)) {
      throw new Error(`Interventie ${i.id}: interventieDefinitief=true maar velden incompleet`);
    }
  }
}

export function assertTweeKeuzesPerRonde(items: Interventie[]): void {
  if (KEUZES_PER_RONDE !== 2) {
    throw new Error('Regel: teams kiezen precies twee interventies per ronde');
  }
  for (const ep of [1, 2, 3, 4, 5] as const) {
    for (const ronde of [1, 2] as const) {
      const n = items.filter((i) => i.episode === ep && i.ronde === ronde).length;
      if (n !== INTERVENTIES_PER_RONDE) {
        throw new Error(`Aflevering ${ep} ronde ${ronde}: verwacht ${INTERVENTIES_PER_RONDE} interventies, got ${n}`);
      }
    }
  }
}

export function assertEchoBronnenBestaan(items: Interventie[]): void {
  const ids = new Set(items.map((i) => i.id));
  for (const i of items) {
    for (const e of i.echo ?? []) {
      if (!ids.has(e.bron)) {
        throw new Error(`Interventie ${i.id}: echo verwijst naar onbekende bron ${e.bron}`);
      }
    }
  }
}

/** 4.2.1 mag pas definitief als variantZonderContract bevestigd is (Richard). */
export function assertPiotrContractVariant(items: Interventie[]): void {
  const piotr = items.find((i) => i.id === 'a4-2-1');
  if (!piotr?.interventieDefinitief) return;
  const slot = PIOTR_SCENES.find((s) => s.id === 'a4-slot-testament');
  const variant = slot?.variantZonderContract;
  if (!variant || variant.status !== 'definitief' || !variant.tekst.trim()) {
    throw new Error('a4-2-1: interventieDefinitief zonder bevestigde variantscène variantZonderContract');
  }
}

/** Studentmodus mag verborgen meters nooit tonen. */
export function studentZietVerborgenMeter(_i: Interventie, docent: boolean): boolean {
  if (docent) return true;
  return false;
}

export function assertInterventieBundles(items: Interventie[]): void {
  assertInterventieDefinitiefCompleet(items);
  assertTweeKeuzesPerRonde(items);
  assertEchoBronnenBestaan(items);
  assertPiotrContractVariant(items);
}
