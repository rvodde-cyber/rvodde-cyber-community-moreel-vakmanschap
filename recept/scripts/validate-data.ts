import { PERSONEN } from '../data/personen';
import { ROUNDS } from '../data/rounds';
import { personenSchema } from '../data/schemas/personen.schema';
import { roundsRecordSchema } from '../data/schemas/rounds.schema';

function main() {
  const rounds = roundsRecordSchema.safeParse(ROUNDS);
  if (!rounds.success) {
    console.error('ROUNDS validatie mislukt:', rounds.error.flatten());
    process.exit(1);
  }

  const personen = personenSchema.safeParse(PERSONEN);
  if (!personen.success) {
    console.error('PERSONEN validatie mislukt:', personen.error.flatten());
    process.exit(1);
  }

  console.log('Data OK: ronden 1–2 en', PERSONEN.length, 'personen.');
}

main();
