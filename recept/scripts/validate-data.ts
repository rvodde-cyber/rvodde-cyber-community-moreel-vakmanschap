import { PERSONEN } from '../data/personen';
import { DILEMMA_STUBS } from '../data/dilemmas/stubs';
import { validateNabesprekingEp4 } from '../data/nabespreking-ep4';
import { validatePiotrLijn } from '../data/piotr-lijn';
import { INTERVENTIES_SKELET } from '../data/interventies-skelet';
import { assertInterventieFlagsConsistent, INTERVENTIE_FLAGS } from '../data/interventieFlags';
import { ROUNDS } from '../data/rounds';
import { SKELETON_ROUNDS } from '../data/skeleton/rounds';
import { dilemmaStubSchema } from '../data/schemas/dilemma.schema';
import { personenSchema } from '../data/schemas/personen.schema';
import { roundDefinitionSchema, roundsRecordSchema } from '../data/schemas/rounds.schema';

function main() {
  assertInterventieFlagsConsistent(INTERVENTIE_FLAGS);

  const nab = validateNabesprekingEp4();
  if (!nab.success) {
    console.error('NABESPREKING_EP4 validatie mislukt:', nab.error.flatten());
    process.exit(1);
  }

  validatePiotrLijn();

  if (INTERVENTIES_SKELET.some((i) => i.interventieDefinitief !== false)) {
    console.error('INTERVENTIES_SKELET: interventieDefinitief moet false zijn');
    process.exit(1);
  }

  const rounds = roundsRecordSchema.safeParse(ROUNDS);
  if (!rounds.success) {
    console.error('ROUNDS validatie mislukt:', rounds.error.flatten());
    process.exit(1);
  }

  for (const [key, def] of Object.entries(SKELETON_ROUNDS)) {
    const sk = roundDefinitionSchema.safeParse(def);
    if (!sk.success) {
      console.error(`SKELETON_ROUNDS[${key}] mislukt:`, sk.error.flatten());
      process.exit(1);
    }
  }

  for (const d of DILEMMA_STUBS) {
    const ok = dilemmaStubSchema.safeParse(d);
    if (!ok.success) {
      console.error('DILEMMA_STUBS mislukt:', ok.error.flatten());
      process.exit(1);
    }
  }

  const personen = personenSchema.safeParse(PERSONEN);
  if (!personen.success) {
    console.error('PERSONEN validatie mislukt:', personen.error.flatten());
    process.exit(1);
  }

  console.log(
    'Data OK: ronden 1–2, skeleton 1/2/3/5,',
    DILEMMA_STUBS.length,
    'dilemma-stubs,',
    PERSONEN.length,
    'personen.',
  );
}

main();
