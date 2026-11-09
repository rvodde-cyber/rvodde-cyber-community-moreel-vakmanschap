import type { ColdTimelineStep, OnderstroomKanaal } from '@data/episodes/coldOpenModel';

const KANAAL_LABEL: Record<OnderstroomKanaal, string> = {
  kantlijn: 'kantlijn',
  plakbriefje: 'plakbriefje',
  sms: 'sms',
  app: 'app',
  lens: 'lens',
};

export function speechStepAriaLabel(step: { speaker: string; text: string }): string {
  if (!step.speaker) return step.text;
  return `Hardop, ${formatWho(step.speaker)}. ${step.text}`;
}

export function onderstroomAriaLabel(line: {
  van: string;
  naar?: string;
  kanaal: OnderstroomKanaal;
  tekst: string;
  doorgehaald?: boolean;
}): string {
  const van = formatWho(line.van);
  const naar = line.naar ? formatWho(line.naar) : null;
  const base = naar
    ? `Onderstroom, ${van} aan ${naar}, ${KANAAL_LABEL[line.kanaal]}`
    : `Onderstroom, ${van}, ${KANAAL_LABEL[line.kanaal]}`;
  const body = line.doorgehaald ? `doorgehaald: ${line.tekst}` : line.tekst;
  return `${base}. ${body}`;
}

export function typingAriaLabel(van: string): string {
  return `${formatWho(van)} begint een bericht en wist het`;
}

function formatWho(id: string): string {
  const parts = id.trim().split(/[\s-]+/);
  if (parts.length === 0) return id;
  return parts
    .map((p) => (p.length ? p[0]!.toUpperCase() + p.slice(1).toLowerCase() : p))
    .join(' ');
}

export function stepDurationHint(step: ColdTimelineStep): 'speech' | 'onderstroom' | 'typing' {
  if (step.kind === 'onderstroom-typing') return 'typing';
  if (step.kind === 'onderstroom') return 'onderstroom';
  return 'speech';
}
