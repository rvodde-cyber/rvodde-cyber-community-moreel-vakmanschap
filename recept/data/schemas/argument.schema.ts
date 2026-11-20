export {
  ARGUMENT_MIN,
  ARGUMENT_MAX,
  TEGENARGUMENT_MIN,
  TEGENARGUMENT_MAX,
} from '@/game/limits';
import { ARGUMENT_MIN, TEGENARGUMENT_MIN } from '@/game/limits';

export function argumentLength(s: string): number {
  return s.trim().length;
}

export function validateArgumentField(argument: string, tegenargument: string): { ok: true } | { ok: false; reason: string } {
  const a = argumentLength(argument);
  const t = argumentLength(tegenargument);
  if (a < ARGUMENT_MIN) {
    return { ok: false, reason: `Schrijf minstens ${ARGUMENT_MIN} tekens waarom jullie deze twee kiezen.` };
  }
  if (t < TEGENARGUMENT_MIN) {
    return { ok: false, reason: `Schrijf minstens ${TEGENARGUMENT_MIN} tekens voor het tegenargument.` };
  }
  return { ok: true };
}

export function okArgument(argument: string, tegenargument: string): boolean {
  return validateArgumentField(argument, tegenargument).ok;
}
