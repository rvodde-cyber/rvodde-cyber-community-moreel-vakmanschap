import { describe, expect, it } from 'vitest';
import { EPISODE_CONTENT } from '@data/episodes/content';
import { GESPREKSKAARTEN, gesprekskaartVoor } from '@data/gesprekskaarten';
import {
  STANDAARD_SLOTVRAAG,
  validateGesprekOpslaan,
  WAARDEN,
  gesprekskaartSchema,
} from '@data/schemas/gesprekskaart.schema';
import { freshEpisode } from '../../src/game/budgetUi';
import { gameReducer } from '../../src/game/gameReducer';
import { buildTeamExport } from '../../src/game/teamExport';
import { migrateGameState } from '../../src/game/migrateState';
import { interventieCompute, initialInterventieMeters } from '@engine/interventieCompute';
import { roundDefFor } from '../../src/game/roundSource';

describe('gesprekskaarten register', () => {
  it.each([1, 2, 3, 4, 5] as const)('aflevering %i: kaart met titel, niveau, ≥3 alinea\'s, slotvraag', (ep) => {
    const k = gesprekskaartVoor(ep);
    gesprekskaartSchema.parse(k);
    expect(k.alineas.length).toBeGreaterThanOrEqual(3);
    expect(k.slotvraag).toBe(STANDAARD_SLOTVRAAG);
  });

  it('WAARDEN: precies zeven waarden', () => {
    expect(WAARDEN).toHaveLength(7);
  });

  it('A4: gesprekskaartActief uit', () => {
    expect(EPISODE_CONTENT[4].gesprekskaartActief).toBe(false);
  });

  it('A1: gesprekskaartActief aan', () => {
    expect(EPISODE_CONTENT[1].gesprekskaartActief).toBe(true);
  });

  it('A3 topresultaten: nieuwe alinea\'s met Dongen', () => {
    const k = gesprekskaartVoor(3);
    expect(k.alineas[0]).toContain('Dongen');
    expect(k.alineas[2]).toContain('Wat doet Mark?');
    expect(k.alineas.join(' ')).not.toMatch(/topresultaten waard/i);
  });
});

describe('validateGesprekOpslaan', () => {
  it('weigert lege zin', () => {
    expect(validateGesprekOpslaan('  ', ['eerlijkheid']).ok).toBe(false);
  });

  it('weigert zin boven 280 tekens', () => {
    expect(validateGesprekOpslaan('x'.repeat(281), []).ok).toBe(false);
  });

  it('weigert meer dan 3 waarden', () => {
    expect(
      validateGesprekOpslaan('Onze zin.', ['eerlijkheid', 'loyaliteit', 'zorg', 'veiligheid']).ok,
    ).toBe(false);
  });
});

const ARG = 'Wij kiezen dit omdat Lies en de buren eerst gehoord moeten worden.';
const TEGEN = 'Sneller kan ook fouten geven.';

function bevestigMetArgument(s: ReturnType<typeof freshEpisode>) {
  s = gameReducer(s, { type: 'PROCEED_TO_ARGUMENT' });
  s = {
    ...s,
    rounds: {
      ...s.rounds,
      [s.round]: { ...s.rounds[s.round], argument: ARG, tegenargument: TEGEN },
    },
  };
  return gameReducer(s, { type: 'CONFIRM_BESLUIT' });
}

describe('reducer flow gesprek', () => {
  it('A1 r1: besluit → gesprek → uitkomst; r2 geen gesprek', () => {
    let s = freshEpisode(1);
    s = {
      ...s,
      phase: 'besluit',
      rounds: {
        ...s.rounds,
        1: { ...s.rounds[1], cards: ['a1-1-1', 'a1-1-2'] },
      },
    };
    s = bevestigMetArgument(s);
    expect(s.phase).toBe('gesprek');
    expect(s.results[1]).toBeDefined();
    s = gameReducer(s, {
      type: 'GESPREK_OPSLAAN',
      zin: 'We kiezen voor openheid richting Lies.',
      waarden: ['eerlijkheid', 'zorg'],
      tijdsduurSec: 100,
    });
    expect(s.phase).toBe('uitkomst');
    expect(s.gesprekskaarten[0]?.overgeslagen).toBe(false);

    s = { ...s, round: 2, phase: 'besluit', rounds: { ...s.rounds, 2: { ...s.rounds[2], cards: ['a1-2-1', 'a1-2-2'] } } };
    s = bevestigMetArgument(s);
    expect(s.phase).toBe('uitkomst');
  });

  it('overslaan logt overgeslagen', () => {
    let s = freshEpisode(2);
    s = {
      ...s,
      phase: 'gesprek',
      results: { 1: { sel: [], P0: 50, B: 50, verz: 3, verl: 5 } as never },
    };
    s = gameReducer(s, { type: 'GESPREK_OVERSLAAN', tijdsduurSec: 10 });
    expect(s.gesprekskaarten[0]?.overgeslagen).toBe(true);
    expect(s.gesprekskaarten[0]?.zin).toBe('');
  });

  it('A4: besluit → scan (geen gesprek)', () => {
    let s = freshEpisode(4);
    s = {
      ...s,
      phase: 'besluit',
      rounds: {
        ...s.rounds,
        1: {
          ...s.rounds[1],
          cards: ['A', 'B'],
          pilot: 'pilot',
          verm: 'verzuim',
          w: ['1', '1', '1'],
        },
      },
    };
    s = gameReducer(s, { type: 'AUTO_FIX_BUDGET' });
    s = bevestigMetArgument(s);
    expect(s.phase).toBe('scan');
  });
});

describe('compute ongewijzigd door gesprek', () => {
  it('A1: resultaat vóór en na opslaan gelijk', () => {
    let s = freshEpisode(1);
    const cards = ['a1-1-1', 'a1-1-2'];
    s = {
      ...s,
      phase: 'besluit',
      rounds: { ...s.rounds, 1: { ...s.rounds[1], cards } },
    };
    s = bevestigMetArgument(s);
    const before = s.results[1];
    s = gameReducer(s, {
      type: 'GESPREK_OPSLAAN',
      zin: 'Testzin voor het team.',
      waarden: ['transparantie'],
      tijdsduurSec: 60,
    });
    expect(s.results[1]).toEqual(before);
    const direct = interventieCompute({
      episode: 1,
      round: 1,
      cardIds: cards,
      roundDef: roundDefFor({ ...s, round: 1 }),
      meterStateIn: initialInterventieMeters(1),
      laterFromPrevRound: [],
    }).result;
    expect(s.results[1]).toEqual(direct);
  });
});

describe('teamExport en migratie', () => {
  it('export bevat gesprekskaarten sectie v2', () => {
    const s = {
      ...freshEpisode(1),
      gesprekskaarten: [
        {
          episode: 1 as const,
          kaartId: GESPREKSKAARTEN[1].id,
          zin: 'Zin',
          waarden: ['eerlijkheid'],
          overgeslagen: false,
          tijdsduurSec: 80,
        },
      ],
    };
    const ex = buildTeamExport(s);
    expect(ex.exportVersion).toBe(2);
    expect(ex.gesprekskaarten).toHaveLength(1);
  });

  it('migratie v4 zonder gesprekskaarten', () => {
    const raw = { ...freshEpisode(4), v: 4 };
    delete (raw as { gesprekskaarten?: unknown }).gesprekskaarten;
    const m = migrateGameState(raw);
    expect(m?.gesprekskaarten).toEqual([]);
  });
});
