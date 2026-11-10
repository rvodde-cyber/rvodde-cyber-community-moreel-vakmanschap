export const ARGUMENT_MIN = 20;
export const ARGUMENT_MAX = 280;
export const TEGENARGUMENT_MIN = 10;
export const TEGENARGUMENT_MAX = 140;

export function argumentLength(s: string): number {
  return s.trim().length;
}

export function validateArgumentField(argument: string, tegenargument: string): { ok: true } | { ok: false; reason: string } {
  const a = argumentLength(argument);
  const t = argumentLength(tegenargument);
  if (a < ARGUMENT_MIN) {
    return { ok: false, reason: `Schrijf minstens ${ARGUMENT_MIN} tekens waarom jullie deze twee kiezen.` };
  }
  if (a > ARGUMENT_MAX) {
    return { ok: false, reason: `Maximaal ${ARGUMENT_MAX} tekens.` };
  }
  if (t < TEGENARGUMENT_MIN) {
    return { ok: false, reason: `Schrijf minstens ${TEGENARGUMENT_MIN} tekens voor het tegenargument.` };
  }
  if (t > TEGENARGUMENT_MAX) {
    return { ok: false, reason: `Maximaal ${TEGENARGUMENT_MAX} tekens.` };
  }
  return { ok: true };
}

export function okArgument(argument: string, tegenargument: string): boolean {
  return validateArgumentField(argument, tegenargument).ok;
}
