import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname, sep } from 'node:path';
import { COLD_OPEN } from '@data/coldOpen';
import { DILEMMA_EP1_FRANS } from '@data/dilemmas/ep1-frans';
import { DILEMMA_EP2_WIM } from '@data/dilemmas/ep2-wim';
import { DILEMMA_EP3_WAALWIJK } from '@data/dilemmas/ep3-waalwijk';
import { DILEMMA_EP4_PIOTR } from '@data/dilemmas/ep4-piotr';
import { DILEMMA_EP5_SCHRIFT } from '@data/dilemmas/ep5-schrift';
import { buildSlotEp1, buildSlotEp2, buildSlotEp3, buildSlotEp5 } from '@data/filmSequences';
import { COLD_OPEN_EP1 } from '@data/episodes/coldOpenEp1';
import { A1_ROUNDS } from '@data/episodes/a1Rounds';
import { A2_ROUNDS } from '@data/episodes/a2Rounds';
import { A3_ROUNDS } from '@data/episodes/a3Rounds';
import { A5_ROUNDS } from '@data/episodes/a5Rounds';
import { COLD_OPEN_EP2 } from '@data/episodes/coldOpenEp2';
import { COLD_OPEN_EP3 } from '@data/episodes/coldOpenEp3';
import { COLD_OPEN_EP5 } from '@data/episodes/coldOpenEp5';
import {
  EPISODE_CONTENT,
  episodeContent,
  isFullEpisode,
} from '@data/episodes/content';
import type { EpisodeId } from '@data/episodes/meta';
import { ROUNDS } from '@data/rounds';
import { SKELETON_COLD } from '@data/skeleton/coldOpen';
import { slotLineRonde1, slotLinesFinale } from '@data/slotLines';
import { slotLineA1 } from '@data/slotLineA1';
import { slotLineA2 } from '@data/slotLineA2';
import { slotLineA3 } from '@data/slotLineA3';
import { slotLineA5 } from '@data/slotLineA5';
import { TRAILER_RONDE_1, TRAILER_RONDE_2 } from '@data/filmSequences';
import { roundDefFor } from '../../src/game/roundSource';
import { freshEpisode } from '../../src/game/budgetUi';
import { showAppDilemmaPanel, showBriefjePanel, showPhonePanel, showSmsDilemmaPanel } from '../../src/game/commPanel';
import type { GameUiState } from '../../src/game/uiTypes';
import { episodeMotorKind, showsSkeletLabel } from '@data/episodes/motor';

const ALL_EPS: EpisodeId[] = [1, 2, 3, 4, 5];

function expectPauzekaartMetVoorspelling(c: ReturnType<typeof episodeContent>) {
  expect(c.pauzeKaart?.tafelvragen).toHaveLength(2);
  const v = c.pauzeKaart?.voorspelling;
  expect(v).toBeDefined();
  expect(v!.opties).toHaveLength(3);
}

describe('EPISODE_CONTENT register', () => {
  it('has an entry for episodes 1 through 5', () => {
    for (const id of ALL_EPS) {
      expect(EPISODE_CONTENT[id]).toBeDefined();
      expect(episodeContent(id).rounds[1]).toBeDefined();
    }
  });

  it('introBeeldRechts-episodes hebben introBeeldFocus met x en y tussen 0 en 100; A4 niet', () => {
    for (const id of [1, 2, 3, 5] as const) {
      const c = episodeContent(id);
      expect(c.introBeeldRechts).toBe(true);
      const f = c.introBeeldFocus;
      expect(f).toBeDefined();
      expect(f!.x).toBeGreaterThanOrEqual(0);
      expect(f!.x).toBeLessThanOrEqual(100);
      expect(f!.y).toBeGreaterThanOrEqual(0);
      expect(f!.y).toBeLessThanOrEqual(100);
    }
    expect(episodeContent(4).introBeeldFocus).toBeUndefined();
    expect(episodeContent(4).introBeeldRechts).toBe(false);
  });

  it('isFullEpisode true for 1, 2, 3, 4 en 5', () => {
    for (const id of [1, 2, 3, 4, 5] as const) {
      expect(isFullEpisode(id)).toBe(true);
    }
  });

  it('skelet-label in UI: geen vaste aflevering skeleton; alleen bij motorKind skeleton', () => {
    expect(episodeMotorKind(1)).toBe('interventie');
    expect(showsSkeletLabel(1)).toBe(false);
    expect(episodeMotorKind(2)).toBe('interventie');
    expect(showsSkeletLabel(2)).toBe(false);
    expect(episodeMotorKind(3)).toBe('interventie');
    expect(showsSkeletLabel(3)).toBe(false);
    expect(episodeMotorKind(4)).toBe('a4');
    expect(showsSkeletLabel(4)).toBe(false);
    expect(episodeMotorKind(5)).toBe('interventie');
    expect(showsSkeletLabel(5)).toBe(false);
  });
});

describe('episode 1 content (stap 2)', () => {
  const c = episodeContent(1);

  it('(a) cold opens: line counts and first/last lines', () => {
    expect(c.coldOpen[1]).toEqual(COLD_OPEN_EP1[1]);
    expect(c.coldOpen[2]).toEqual(COLD_OPEN_EP1[2]);
    expect(c.coldOpen[1]!.lines).toHaveLength(8);
    expect(c.coldOpen[2]!.lines).toHaveLength(5);
    expect(c.coldOpen[1]!.lines[0]![1]).toBe('Zondagavond. Het kasboek ligt open op de keukentafel.');
    expect(c.coldOpen[1]!.lines[7]![1]).toBe('Maandag, half zeven. In de schuur wachten vier problemen tegelijk.');
    expect(c.coldOpen[2]!.lines[4]![1]).toBe(
      "Donderdag, kwart voor vijf. Tussen de pagina's van het kasboek zit een briefje.",
    );
  });

  it('register: two rounds, dilemma ep1-frans, slotLines, interventiemotor', () => {
    expect(c.roundCount).toBe(2);
    expect(c.dilemma?.id).toBe('ep1-frans');
    expect(c.slotLines).not.toBeNull();
    expect(c.usesDemoBudget).toBe(false);
    expect(c.motorKind).toBe('interventie');
    expect(c.rounds[1]).toBe(A1_ROUNDS[1]);
    expect(c.rounds[2]).toBe(A1_ROUNDS[2]);
    expect(c.rounds[1].cards).toHaveLength(4);
  });

  it('(b) ep1-frans: three choices, minTekst 10, effects', () => {
    expect(DILEMMA_EP1_FRANS.keuzes).toHaveLength(3);
    expect(DILEMMA_EP1_FRANS.effecten.prive.minTekst).toBe(10);
    expect(DILEMMA_EP1_FRANS.effecten.niets).toMatchObject({ eerlijkheid: -8, menselijkeMaat: -10 });
    expect(DILEMMA_EP1_FRANS.effecten.groep).toMatchObject({ eerlijkheid: 6, menselijkeMaat: -2 });
    expect(DILEMMA_EP1_FRANS.effecten.prive).toMatchObject({ eerlijkheid: 4, menselijkeMaat: 8 });
    expect(DILEMMA_EP1_FRANS.privéBericht.kanaal).toBe('briefje');
  });

  it('(c) briefje channel: BriefjePanel yes, PhonePanel no in r2 besluit', () => {
    const state: GameUiState = {
      ...freshEpisode(1),
      round: 2,
      phase: 'besluit',
    };
    expect(showBriefjePanel(state)).toBe(true);
    expect(showPhonePanel(state)).toBe(false);
  });

  it('(d) slotLineA1 both variants', () => {
    const snel = slotLineA1(['a1-1-4', 'a1-2-2', 'other']);
    expect(snel).toContain('keigoed');
    const anders = slotLineA1(['a1-1-1']);
    expect(anders).toContain('kasboek');
  });

  it('(e) pauzekaart: two questions and three prediction options', () => {
    expectPauzekaartMetVoorspelling(c);
  });

  it('slot-ep1: Brabants afscheid vóór A1-SCHRIFT, duur sluit aan bij titel', () => {
    const script = buildSlotEp1('test');
    expect(script.id).toBe('slot-ep1');
    expect(script.duration).toBe(28500);
    const idxGerritHoudoe = script.cues.findIndex(
      (c) =>
        c.kind === 'sub' &&
        c.who === 'GERRIT' &&
        typeof c.text === 'string' &&
        c.text.includes('Houdoe'),
    );
    const idxLiesHoudoe = script.cues.findIndex(
      (c) =>
        c.kind === 'sub' &&
        c.who === 'LIES' &&
        typeof c.text === 'string' &&
        c.text.includes('Houdoe'),
    );
    const idxSchrift = script.cues.findIndex((c) => c.kind === 'shot' && c.img === 'A1-SCHRIFT');
    expect(idxGerritHoudoe).toBeGreaterThan(-1);
    expect(idxLiesHoudoe).toBeGreaterThan(-1);
    expect(idxSchrift).toBeGreaterThan(-1);
    expect(idxGerritHoudoe).toBeLessThan(idxLiesHoudoe);
    expect(idxLiesHoudoe).toBeLessThan(idxSchrift);
    const titleCues = script.cues.filter((c) => c.kind === 'title');
    expect(titleCues.length).toBeGreaterThan(0);
    const lastAt = Math.max(...script.cues.map((c) => c.at));
    expect(lastAt).toBe(Math.max(...titleCues.map((c) => c.at)));
    expect(script.duration).toBeGreaterThanOrEqual(lastAt);
  });
});

describe('episode 2 content', () => {
  const c = episodeContent(2);

  it('(a) cold opens r1 + r2: line counts and last line r2', () => {
    expect(c.coldOpen[1]).toEqual(COLD_OPEN_EP2[1]);
    expect(c.coldOpen[2]).toEqual(COLD_OPEN_EP2[2]);
    expect(c.coldOpen[1]!.lines).toHaveLength(5);
    expect(c.coldOpen[2]!.lines).toHaveLength(6);
    expect(c.coldOpen[2]!.lines[5]![1]).toBe(
      'Donderdag, kwart over vier. Tussen de loonzakjes zit een briefje zonder naam.',
    );
  });

  it('register: two rounds, dilemma ep2-wim, slotLines, interventiemotor', () => {
    expect(c.roundCount).toBe(2);
    expect(c.dilemma?.id).toBe('ep2-wim');
    expect(c.slotLines).not.toBeNull();
    expect(c.usesDemoBudget).toBe(false);
    expect(c.motorKind).toBe('interventie');
    expect(c.rounds[1]).toBe(A2_ROUNDS[1]);
    expect(c.rounds[2]).toBe(A2_ROUNDS[2]);
    expect(c.rounds[1].cards).toHaveLength(4);
  });

  it('(b) ep2-wim: three choices, minTekst 10, effects', () => {
    expect(DILEMMA_EP2_WIM.keuzes).toHaveLength(3);
    expect(DILEMMA_EP2_WIM.effecten.prive.minTekst).toBe(10);
    expect(DILEMMA_EP2_WIM.effecten.niets).toMatchObject({ eerlijkheid: -6, menselijkeMaat: -10 });
    expect(DILEMMA_EP2_WIM.effecten.groep).toMatchObject({ eerlijkheid: 8, menselijkeMaat: -2 });
    expect(DILEMMA_EP2_WIM.effecten.prive).toMatchObject({ eerlijkheid: 4, menselijkeMaat: 8 });
    expect(DILEMMA_EP2_WIM.privéBericht.kanaal).toBe('briefje');
  });

  it('(c) briefje channel: BriefjePanel yes, PhonePanel no in r2 besluit', () => {
    const state: GameUiState = {
      ...freshEpisode(2),
      round: 2,
      phase: 'besluit',
    };
    expect(showBriefjePanel(state)).toBe(true);
    expect(showPhonePanel(state)).toBe(false);
  });

  it('(d) slotLineA2 both variants', () => {
    const snel = slotLineA2(['a2-1-4', 'a2-2-2', 'other']);
    expect(snel).toContain('draait de band');
    const anders = slotLineA2(['a2-1-1']);
    expect(anders).toContain('ploegen veel zelf');
  });

  it('(e) pauzekaart: two questions and three prediction options', () => {
    expectPauzekaartMetVoorspelling(c);
  });

  it('slot-ep2 script id and duration', () => {
    const script = buildSlotEp2('test');
    expect(script.id).toBe('slot-ep2');
    expect(script.duration).toBe(27000);
  });
});

describe('episode 4 golden (unchanged references)', () => {
  const c = episodeContent(4);

  it('(f) rounds match ROUNDS', () => {
    expect(c.rounds[1]).toBe(ROUNDS[1]);
    expect(c.rounds[2]).toBe(ROUNDS[2]);
  });

  it('cold open matches COLD_OPEN', () => {
    expect(c.coldOpen[1]).toBe(COLD_OPEN[1]);
    expect(c.coldOpen[2]).toBe(COLD_OPEN[2]);
  });

  it('dilemma is DILEMMA_EP4_PIOTR with same effects', () => {
    expect(c.dilemma).toBe(DILEMMA_EP4_PIOTR);
    expect(c.dilemma?.effecten).toEqual(DILEMMA_EP4_PIOTR.effecten);
  });

  it('slot line builders are unchanged', () => {
    expect(c.slotLines?.ronde1).toBe(slotLineRonde1);
    expect(c.slotLines?.finale).toBe(slotLinesFinale);
  });

  it('film trailers match legacy exports', () => {
    expect(c.film.trailerR1).toBe(TRAILER_RONDE_1);
    expect(c.film.trailerR2).toBe(TRAILER_RONDE_2);
  });

  it('roundDefFor matches ROUNDS for fresh ep4 state', () => {
    const state = freshEpisode(4);
    expect(roundDefFor({ ...state, round: 1 })).toBe(ROUNDS[1]);
    expect(roundDefFor({ ...state, round: 2 })).toBe(ROUNDS[2]);
  });
});

describe('episode 5 content', () => {
  const c = episodeContent(5);

  it('(a) cold opens r1 + r2: line counts en laatste regels', () => {
    expect(c.coldOpen[1]).toEqual(COLD_OPEN_EP5[1]);
    expect(c.coldOpen[2]).toEqual(COLD_OPEN_EP5[2]);
    expect(c.coldOpen[1]!.lines).toHaveLength(5);
    expect(c.coldOpen[2]!.lines).toHaveLength(6);
    expect(c.coldOpen[2]!.lines[5]![1]).toBe(
      'Vrijdag, tien voor vijf. Er staat een bericht in de app, alleen voor jou.',
    );
  });

  it('register: twee rondes, dilemma ep5-schrift, slotLines, interventiemotor', () => {
    expect(c.roundCount).toBe(2);
    expect(c.dilemma?.id).toBe('ep5-schrift');
    expect(c.slotLines).not.toBeNull();
    expect(c.usesDemoBudget).toBe(false);
    expect(c.motorKind).toBe('interventie');
    expect(c.gesprekskaartActief).toBe(true);
    expect(c.rounds[1]).toBe(A5_ROUNDS[1]);
    expect(c.rounds[2]).toBe(A5_ROUNDS[2]);
    expect(c.rounds[1].cards).toHaveLength(4);
  });

  it('(b) ep5-schrift: drie keuzes, minTekst 10, kanaal app', () => {
    expect(DILEMMA_EP5_SCHRIFT.keuzes).toHaveLength(3);
    expect(DILEMMA_EP5_SCHRIFT.effecten.prive.minTekst).toBe(10);
    expect(DILEMMA_EP5_SCHRIFT.privéBericht.kanaal).toBe('app');
    expect(DILEMMA_EP5_SCHRIFT.privéBericht.dil).toBe(true);
  });

  it('(c) app-dilemma: AppDilemmaPanel ja in r2 besluit', () => {
    const state: GameUiState = {
      ...freshEpisode(5),
      round: 2,
      phase: 'besluit',
    };
    expect(showAppDilemmaPanel(state)).toBe(true);
    expect(showBriefjePanel(state)).toBe(false);
    expect(showSmsDilemmaPanel(state)).toBe(false);
    expect(showPhonePanel(state)).toBe(false);
  });

  it('(d) slotLineA5 beide varianten bereikbaar', () => {
    const verkoop = slotLineA5(['a5-2-2', 'a5-1-1']);
    expect(verkoop).toContain('Optivora');
    const nietVerkocht = slotLineA5(['a5-2-1', 'a5-2-3']);
    expect(nietVerkocht).toContain('nog niet verkocht');
  });

  it('(e) pauzekaart: twee tafelvragen, géén voorspelling', () => {
    expect(c.pauzeKaart?.tafelvragen).toHaveLength(2);
    expect(c.pauzeKaart?.voorspelling).toBeUndefined();
  });

  it('slot-ep5 script id and duration', () => {
    const script = buildSlotEp5('test');
    expect(script.id).toBe('slot-ep5');
    expect(script.duration).toBe(27000);
  });
});

describe('episode 3 content', () => {
  const c = episodeContent(3);

  it('(a) cold opens r1 + r2 + coldOpenFlow grens r2', () => {
    expect(c.coldOpen[1]).toEqual(COLD_OPEN_EP3[1]);
    expect(c.coldOpen[2]).toEqual(COLD_OPEN_EP3[2]);
    expect(c.coldOpen[1]!.lines).toHaveLength(5);
    expect(c.coldOpen[2]!.lines).toHaveLength(6);
    const lines2 = c.coldOpen[2]!.lines;
    expect(lines2[0]![1]).toBe(
      'Dinsdagochtend. Op het scherm staat de nieuwe planning van het systeem. Niemand heeft hem gemaakt.',
    );
    expect(lines2[5]![1]).toBe('Vrijdag, tien voor vijf. Er komt een sms binnen.');
    expect(lines2[2]![0]).toBe('MARCO');
  });

  it('register: two rounds, dilemma ep3-waalwijk, slotLines, interventiemotor', () => {
    expect(c.roundCount).toBe(2);
    expect(c.dilemma?.id).toBe('ep3-waalwijk');
    expect(c.slotLines).not.toBeNull();
    expect(c.usesDemoBudget).toBe(false);
    expect(c.motorKind).toBe('interventie');
    expect(c.gesprekskaartActief).toBe(true);
    expect(c.rounds[1]).toBe(A3_ROUNDS[1]);
    expect(c.rounds[2]).toBe(A3_ROUNDS[2]);
    expect(c.rounds[1].cards).toHaveLength(4);
  });

  it('(b) ep3-waalwijk: drie sms’jes in tekstblok, drie keuzes, minTekst 10, effecten', () => {
    expect(DILEMMA_EP3_WAALWIJK.keuzes).toHaveLength(3);
    expect(DILEMMA_EP3_WAALWIJK.effecten.prive.minTekst).toBe(10);
    expect(DILEMMA_EP3_WAALWIJK.privéBericht.kanaal).toBe('sms2009');
    expect(DILEMMA_EP3_WAALWIJK.privéBericht.tekst).toContain('Hoi tante, de bank komt maandag langs');
    expect(DILEMMA_EP3_WAALWIJK.privéBericht.tekst).toContain(
      'Als we de afschrijving van de nieuwe lijn over vijf jaar uitsmeren in plaats van drie',
    );
    expect(DILEMMA_EP3_WAALWIJK.privéBericht.tekst).toContain('Kun je dit even laten staan');
    expect(DILEMMA_EP3_WAALWIJK.effecten.niets).toMatchObject({ eerlijkheid: -10, menselijkeMaat: -2 });
    expect(DILEMMA_EP3_WAALWIJK.effecten.groep).toMatchObject({ eerlijkheid: 8, menselijkeMaat: -4 });
    expect(DILEMMA_EP3_WAALWIJK.effecten.prive).toMatchObject({ eerlijkheid: 6, menselijkeMaat: 4 });
  });

  it('(c) sms-kanaal: SmsDilemmaPanel ja, BriefjePanel en PhonePanel demo nee in r2 besluit', () => {
    const state: GameUiState = {
      ...freshEpisode(3),
      round: 2,
      phase: 'besluit',
    };
    expect(showSmsDilemmaPanel(state)).toBe(true);
    expect(showBriefjePanel(state)).toBe(false);
    expect(showPhonePanel(state)).toBe(false);
  });

  it('(d) slotLineA3 beide varianten bereikbaar', () => {
    const controle = slotLineA3(['a3-1-1', 'a3-1-2', 'a3-2-4']);
    expect(controle).toContain('Op de vloer weet niemand meer wie er aan tafel zit');
    const anders = slotLineA3(['a3-1-4', 'a3-2-1']);
    expect(anders).toContain('In de cijfers staat dat niet altijd');
  });

  it('(e) pauzekaart: twee tafelvragen en drie voorspellingsopties', () => {
    expectPauzekaartMetVoorspelling(c);
    expect(c.pauzeKaart?.voorspelling?.vraag).toBe('Hoe ziet het bedrijf er in 2026 uit?');
  });

  it('slot-ep3 Defensie-brugzin in slotfilm', () => {
    const script = buildSlotEp3('test');
    expect(script.id).toBe('slot-ep3');
    expect(script.duration).toBe(27000);
    expect(script.cues.some((x) => x.kind === 'sub' && x.text?.includes('Defensie') && x.text?.includes('drones'))).toBe(
      true,
    );
  });
});

describe('taalronde cold opens (5 nov 2026)', () => {
  it('A2 ronde 1: letterlijke regels (register)', () => {
    const lines = COLD_OPEN_EP2[1].lines;
    expect(lines).toHaveLength(5);
    expect(lines[0]![1]).toBe('Dinsdag, tien over zeven. De band loopt al een uur.');
    expect(lines[4]![1]).toBe('Niemand maakt vandaag nog een heel worstenbroodje.');
    expect(lines[2]![0]).toBe('LIES');
  });

  it('A2 stub SKELETON_COLD: ongewijzigd voor documentatie', () => {
    const lines = SKELETON_COLD[2].lines;
    expect(lines[0]![1]).toBe('Dinsdag, tien over zeven. De band loopt al een uur.');
  });

  it('A3: letterlijke regels (register COLD_OPEN_EP3[1]; stub SKELETON_COLD[3] gelijk)', () => {
    const lines = COLD_OPEN_EP3[1].lines;
    expect(lines).toHaveLength(5);
    expect(lines).toEqual(SKELETON_COLD[3].lines);
    expect(lines[0]![1]).toBe('Vrijdagmiddag. Drie vestigingen en één vergadertafel.');
    expect(lines[4]![1]).toBe('Niemand zegt iets. Buiten rijdt een vrachtwagen achteruit.');
    expect(lines[2]![0]).toBe('MARCO');
  });

  it('A5 ronde 1: letterlijke regels (register COLD_OPEN_EP5[1]; stub SKELETON_COLD[5] gelijk)', () => {
    const lines = COLD_OPEN_EP5[1].lines;
    expect(lines).toHaveLength(5);
    expect(lines).toEqual(SKELETON_COLD[5].lines);
    expect(lines[0]![1]).toBe('De glazen ingang weerspiegelt een verre schuur.');
    expect(lines[4]![1]).toBe(
      'In Berkel-Enschot ligt nog het receptschrift. Niemand weet wie de doorgestreepte zin heeft geschrapt.',
    );
    expect(lines[2]![0]).toBe('ANNE-FLEUR');
  });

  it('A4 COLD_OPEN[2]: alleen twee regels gewijzigd, ronde 1 ongewijzigd', () => {
    expect(COLD_OPEN[1]).toEqual({
      place: 'VILLA VAN GORP, OISTERWIJK',
      img: 'C4',
      lines: [
        ['', 'Zaterdagavond. Harrie wordt 71.'],
        ['HARRIE', 'Vroeger kende ik iedereen bij naam.'],
        ['MARCO', 'Pap, het dashboard kent iedereen. Bij naam én prestatie.'],
        ['ERIK', 'En het dashboard liegt niet.'],
        ['', 'Maandag, 09:14. Het verzuim is weer gestegen.'],
      ],
    });
    expect(COLD_OPEN[2].lines[2]).toEqual([
      'ERIK',
      'Groter worden betekent vooral meer formulieren, Marco.',
    ]);
    expect(COLD_OPEN[2].lines[3]).toEqual([
      'ANS',
      'Ik heb deze week maar twee uur op de vloer gestaan. De rest was overleg.',
    ]);
    expect(COLD_OPEN[2].lines[0]).toEqual(['', 'Een half jaar later. Hal 3 krijgt een hek en een pasjeslezer.']);
    expect(COLD_OPEN[2].lines[1]).toEqual(['MARCO', 'Vrijdag tekenen we. Dan zijn we eindelijk groot.']);
    expect(COLD_OPEN[2].lines[4]).toEqual(['', 'Dinsdag, 09:14. Piotrs pas werkt niet meer.']);
  });
});

describe('Anne-Fleur hernoeming in code', () => {
  it('geen Lotte meer in src/, data/, content/', () => {
    const root = join(__dirname, '..', '..');
    const dirs = ['data', 'engine', 'src', 'content'] as const;
    const textExt = new Set(['.ts', '.tsx', '.json', '.md']);

    function walk(dir: string): string[] {
      const out: string[] = [];
      for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) {
          if (name === 'node_modules') continue;
          out.push(...walk(p));
        } else if (textExt.has(extname(name))) {
          out.push(p);
        }
      }
      return out;
    }

    const hits: string[] = [];
    const lotteName = /\bLotte\b/i;
    for (const d of dirs) {
      for (const file of walk(join(root, d))) {
        if (file.includes(`${sep}__tests__${sep}`)) continue;
        const text = readFileSync(file, 'utf8');
        if (lotteName.test(text)) hits.push(file.replace(root + sep, ''));
      }
    }
    expect(hits).toEqual([]);
  });
});
