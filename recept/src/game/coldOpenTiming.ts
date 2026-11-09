import type { ColdTimelineStep } from '@data/episodes/coldOpenModel';

/** Leestijd per cold-open-regel (Richard 5 nov 2026): 1,5 s + 55 ms/teken, min 2,5 s, max 7 s. */
export function coldLineDurationMs(line: readonly [string, string]): number {
  const chars = (line[0]?.length ?? 0) + (line[1]?.length ?? 0);
  return Math.min(7000, Math.max(2500, 1500 + chars * 55));
}

/** Onderstroom korter; typ-indicator vast 1,5 s. */
export function coldStepDurationMs(step: ColdTimelineStep): number {
  if (step.kind === 'onderstroom-typing') return 1500;
  if (step.kind === 'onderstroom') {
    const chars = step.line.tekst.length;
    return Math.min(4500, Math.max(2000, 1200 + chars * 45));
  }
  return coldLineDurationMs([step.speaker, step.text]);
}

export type ColdAutoGate = {
  reducedMotion: boolean;
  paused: boolean;
  tabHidden: boolean;
};

export function shouldAutoAdvanceCold(gate: ColdAutoGate): boolean {
  return !gate.reducedMotion && !gate.paused && !gate.tabHidden;
}
