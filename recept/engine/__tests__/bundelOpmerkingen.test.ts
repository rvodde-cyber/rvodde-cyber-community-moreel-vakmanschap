import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { INTRO_TEKSTEN } from '@content/intros.nl';
import { SpokenLineText } from '../../src/components/SpokenLineText';
import { Onderstroom } from '../../src/components/Onderstroom';
import { PERSONEN, portretCode } from '@data/personen';
import { GlossaryModal } from '../../src/components/modals/GlossaryModal';

const ROOT = resolve(import.meta.dirname, '../..');

const HINTS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'Let op wat er aan de familietafel wordt gezegd en wat niet. Wie is erbij, en wie kan niet meebeslissen? Ook wat niet wordt gezegd, heeft invloed.',
  2: 'Eerst maakte je als medewerker een compleet worstenbroodje, waar je trots op kon zijn. Nu is je werk teruggebracht tot steeds dezelfde handeling aan een lopende band. Bedenk eens wat dat met mensen doet.',
  3: 'Aan de vergadertafel praten sommige mensen veel en zwijgen anderen. Bedenk eens waarom iemand zwijgt, en wat jullie daardoor niet te horen krijgen.',
  4: 'Het dashboard laat cijfers zien. Bedenk eens wie die cijfers heeft ingevoerd, en wie er in deze cijfers niet in voorkomt.',
  5: 'In dit bedrijf wordt alles gemeten. Bedenk eens wat zich niet laat meten, en wat daarvan nog over is sinds de schuur.',
};

function walkTs(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statIsDir(p)) walkTs(p, acc);
    else if ((name.endsWith('.ts') || name.endsWith('.tsx')) && !name.includes('.test.')) acc.push(p);
  }
  return acc;
}

function statIsDir(p: string) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function spelerTekstCorpus(): string {
  const dirs = [join(ROOT, 'content'), join(ROOT, 'src')];
  const files: string[] = [];
  for (const d of dirs) {
    try {
      walkTs(d, files);
    } catch {
      /* skip */
    }
  }
  files.push(join(ROOT, 'data', 'episodes', 'introUiCopy.ts'));
  return files.map((f) => readFileSync(f, 'utf8')).join('\n');
}

describe('bundel opmerkingen 1–3', () => {
  it('(b) hint per aflevering letterlijk in content/intros.nl.ts', () => {
    for (const ep of [1, 2, 3, 4, 5] as const) {
      expect(INTRO_TEKSTEN[ep].hint).toBe(HINTS[ep]);
    }
  });

  it('(a) geen HINT/UITDAGINGEN-labels in spelersteksten', () => {
    const corpus = spelerTekstCorpus();
    expect(corpus).not.toMatch(/<h4>HINT<\/h4>/);
    expect(corpus).not.toMatch(/<h4>UITDAGINGEN<\/h4>/);
    expect(corpus).toContain('DE UITDAGING');
    expect(corpus).toContain('DE SITUATIE');
  });

  it('(a) IntroPhase-bron bevat De situatie en De uitdaging', () => {
    const src = readFileSync(join(ROOT, 'src', 'screens', 'phases', 'IntroPhase.tsx'), 'utf8');
    expect(src).toContain('DE SITUATIE');
    expect(src).toContain('DE UITDAGING');
    expect(src).not.toMatch(/<h4>HINT<\/h4>/);
    expect(src).not.toMatch(/<h4>UITDAGINGEN<\/h4>/);
  });

  it('(c) gesproken regel met spreker: aanhalingstekens aria-hidden', () => {
    const html = renderToStaticMarkup(
      React.createElement(SpokenLineText, { text: 'Hallo.', quoted: true }),
    );
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('“');
    expect(html).toContain('Hallo.');
  });

  it('(c) titelkaart / zonder spreker: geen aanhalingstekens', () => {
    const html = renderToStaticMarkup(
      React.createElement(SpokenLineText, { text: 'Deel 1', quoted: false }),
    );
    expect(html).not.toContain('spoken-q');
  });

  it('(c) onderstroom: geen spoken-q', () => {
    const html = renderToStaticMarkup(
      React.createElement(Onderstroom, {
        line: { type: 'onderstroom', kanaal: 'sms', van: 'Wim', tekst: 'Test' },
        reducedMotion: true,
      }),
    );
    expect(html).not.toContain('spoken-q');
  });

  it('(e) geen managementteam / vormen samen / verdelen jullie', () => {
    const c = spelerTekstCorpus().toLowerCase();
    expect(c).not.toContain('managementteam');
    expect(c).not.toContain('vormen samen');
    expect(c).not.toContain('verdelen jullie');
  });

  it('(f) elke portretcode in personen.ts heeft JPG in public', () => {
    const dir = join(ROOT, 'public', 'beelden', 'portretten');
    const codes = new Set<string>();
    for (const p of PERSONEN) {
      const per = p.afleveringen;
      if (!per) continue;
      for (const blok of Object.values(per)) {
        if (blok?.portret) codes.add(blok.portret);
      }
    }
    for (const code of codes) {
      expect(existsSync(join(dir, `${code}.jpg`)), `ontbreekt: ${code}`).toBe(true);
    }
  });

  it('Glossary: portret in markup; PhonePanel niet', () => {
    const gloss = renderToStaticMarkup(
      React.createElement(GlossaryModal, { episode: 4, round: 1, onClose: () => {} }),
    );
    expect(gloss).toContain('beelden/portretten/');
    const phoneSrc = readFileSync(join(ROOT, 'src', 'components', 'PhonePanel.tsx'), 'utf8');
    expect(phoneSrc).not.toContain('PersonAvatar');
    expect(phoneSrc).not.toContain('Portret');
  });
});

describe('gewone taal — A4 r2 en gesprekskaart', () => {
  it('(c) A4 hint ronde 2 uit intros.nl.ts; geen Groei voelt', () => {
    const hint =
      'Er komen steeds meer regels en formulieren. Bedenk eens wie daar last van heeft, en wie er eigenlijk om gevraagd heeft.';
    expect(INTRO_TEKSTEN[4].hintRonde2).toBe(hint);
    const corpus = spelerTekstCorpus();
    expect(corpus).not.toContain('Groei voelt als succes');
  });

  it('(b) Wat zijn topresultaten waard nergens in spelersteksten', () => {
    expect(spelerTekstCorpus()).not.toMatch(/topresultaten waard/i);
  });
});

describe('portretcodes helper', () => {
  it('portretCode resolveert naar register', () => {
    const harrie = PERSONEN.find((p) => p.slug === 'harrie-van-gorp')!;
    expect(portretCode(harrie, 4)).toBe('P-HARRIE-2026');
  });
});
