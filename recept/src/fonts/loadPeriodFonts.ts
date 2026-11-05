import type { PeriodKey } from '../../themes/periods';

const loaded = new Set<PeriodKey>();

/** Laadt self-hosted @fontsource-bestanden alleen voor het actieve tijdperk. */
export async function loadPeriodFonts(periodKey: PeriodKey): Promise<void> {
  if (loaded.has(periodKey)) return;
  switch (periodKey) {
    case '1984':
      await import('./packs/1984');
      break;
    case '1996':
      await import('./packs/1996');
      break;
    case '2009':
      await import('./packs/2009');
      break;
    case '2026':
      await import('./packs/2026');
      break;
    case '2036':
      await import('./packs/2036');
      break;
    default:
      break;
  }
  loaded.add(periodKey);
}
