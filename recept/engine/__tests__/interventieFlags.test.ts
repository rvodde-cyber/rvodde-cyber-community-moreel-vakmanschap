import { describe, expect, it } from 'vitest';
import { assertInterventieFlagsConsistent, INTERVENTIE_FLAGS } from '@data/interventieFlags';

describe('interventieFlags', () => {
  it('huidige flags zijn consistent', () => {
    expect(() => assertInterventieFlagsConsistent(INTERVENTIE_FLAGS)).not.toThrow();
  });

  it('faalt als definitief zonder volledige gevolgen', () => {
    const bad = {
      ...INTERVENTIE_FLAGS,
      1: { interventieDefinitief: true, gevolgenCompleet: false },
    };
    expect(() => assertInterventieFlagsConsistent(bad)).toThrow(/gevolgenCompleet/);
  });
});
