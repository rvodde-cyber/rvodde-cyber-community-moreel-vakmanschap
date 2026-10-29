import { nabesprekingEp4Schema, type NabesprekingVraagEp4 } from './schemas/nabespreking-ep4.schema';

/**
 * Gespreksvragen nabespreking aflevering 4 (Piotr-lijn).
 * Alleen items met status `definitief` tonen aan spelers; concept alleen met ?docent=1.
 * Inhoud: docs/CONCEPT-GESPREKSVRAGEN-EP4.md (Claude) — nog niet ingevuld.
 */
export const NABESPREKING_EP4: NabesprekingVraagEp4[] = [];

export function validateNabesprekingEp4() {
  return nabesprekingEp4Schema.safeParse(NABESPREKING_EP4);
}
