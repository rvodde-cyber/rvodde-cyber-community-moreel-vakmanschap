import type { ComputeResult } from '@engine/types';
import { piotrPrivéBerichtQuote } from './piotrSpel';

export type ChatChannel = 'g' | 'p';
export type BerichtFase = 'onderzoek' | 'besluit';

export type BerichtCtx = {
  playerName: string;
  res1?: ComputeResult;
};

export type BerichtDef = {
  id: string;
  round: 1 | 2;
  at: BerichtFase;
  channel: ChatChannel;
  van: string;
  delay: number;
  dil?: boolean;
  fwd?: boolean;
  tekst: string | ((ctx: BerichtCtx) => string);
};

/** Vaste berichten — referentie demo v6 BERICHTEN (Piotr-tekst via dilemmadata). */
export const BERICHTEN: BerichtDef[] = [
  {
    id: 'marco',
    round: 1,
    at: 'onderzoek',
    channel: 'g',
    van: 'Marco',
    delay: 5000,
    tekst: (c) => `Tante ${c.playerName || 'Mies'}, vrijdag wil ik een plan zien. De productie blijft op peil. Pap leest mee 👀`,
  },
  {
    id: 'erik',
    round: 1,
    at: 'onderzoek',
    channel: 'p',
    van: 'Erik Verhoeven',
    delay: 16000,
    tekst: 'Onder ons: PILOT heeft een aanwezigheidsmodule. Eén klik. Werkt bij al mijn klanten. Niet doorsturen. E.',
  },
  {
    id: 'harrie0',
    round: 1,
    at: 'besluit',
    channel: 'g',
    van: 'Harrie',
    delay: 1500,
    tekst: 'Wie is die Ans eigenlijk? Vroeger kende ik iedereen.',
  },
  {
    id: 'joost',
    round: 1,
    at: 'besluit',
    channel: 'p',
    van: 'Joost Hendriks',
    delay: 7000,
    tekst: 'Betrekken jullie de OR nog? Er speelt meer dan verzuim.',
  },
  {
    id: 'ans',
    round: 1,
    at: 'besluit',
    channel: 'p',
    van: 'Ans Willems',
    delay: 15000,
    tekst: 'Nachtdienst draait met vier man minder. Ik hou het niet lang meer vol.',
  },
  {
    id: 'marco2',
    round: 2,
    at: 'onderzoek',
    channel: 'g',
    van: 'Marco',
    delay: 4000,
    tekst: (c) => `Tante ${c.playerName || 'Mies'}, Defensie tekent vrijdag. Dit is de order van ons leven. Geen gedoe nu.`,
  },
  {
    id: 'dilA',
    round: 2,
    at: 'onderzoek',
    channel: 'p',
    van: 'Marco',
    delay: 13000,
    tekst: 'Even buiten de groep: Defensie wil vóór de tekening alle personeelsdossiers. Ook medisch, ook nationaliteit. Voor een screening. Kun jij dat regelen? M.',
  },
  {
    id: 'piotr',
    round: 2,
    at: 'onderzoek',
    channel: 'p',
    van: 'Piotr Nowak',
    delay: 26000,
    dil: true,
    tekst: () => piotrPrivéBerichtQuote(false),
  },
  {
    id: 'ans2',
    round: 2,
    at: 'besluit',
    channel: 'p',
    van: 'Ans Willems',
    delay: 2500,
    tekst: (c) =>
      c.res1 && c.res1.W >= 50
        ? 'De nachtploeg draait weer, dank jullie. Maar nu zit ik veertien uur per week in overleg.'
        : 'Twee mensen van mijn ploeg zitten thuis. En nu moet ik ook nog formulier F-17 invullen.',
  },
  {
    id: 'joost2',
    round: 2,
    at: 'besluit',
    channel: 'p',
    van: 'Joost Hendriks',
    delay: 9000,
    tekst: 'Drie engineers willen niet aan defensie werken. Wat zeggen we ze?',
  },
  {
    id: 'erik2',
    round: 2,
    at: 'besluit',
    channel: 'p',
    van: 'Erik Verhoeven',
    delay: 17000,
    tekst: 'Optivora kan de screening voor Defensie regelen. Snel en discreet. E.',
  },
];

export const NAAM_KLEUR: Record<string, string> = {
  Marco: 'var(--cyan)',
  Harrie: 'var(--amber)',
  Dennis: 'var(--ink)',
  Piotr: 'var(--gold)',
};

export function berichtById(id: string): BerichtDef | undefined {
  return BERICHTEN.find((m) => m.id === id);
}

export function resolveTekst(m: BerichtDef, ctx: BerichtCtx): string {
  return typeof m.tekst === 'function' ? m.tekst(ctx) : m.tekst;
}

/** Berichten na keuze “in de groep bespreken” (referentie v6). */
export function dilemmaGroepBerichten(playerName: string): BerichtDef[] {
  const z = playerName || 'Mies';
  return [
    {
      id: 'dil-g',
      round: 2,
      at: 'besluit',
      channel: 'g',
      van: z,
      delay: 0,
      tekst: `Defensie wil alle personeelsdossiers, ook medisch en nationaliteit. En Piotr mag hal 3 niet meer in, zonder dat iemand weet waarom. Dit wil ik met jullie bespreken.`,
    },
    {
      id: 'dil-h',
      round: 2,
      at: 'besluit',
      channel: 'g',
      van: 'Harrie',
      delay: 2400,
      tekst: 'Piotr? Die jongen heeft mijn eerste drone nog gerepareerd.',
    },
    {
      id: 'dil-m',
      round: 2,
      at: 'besluit',
      channel: 'g',
      van: 'Marco',
      delay: 6600,
      tekst: `Waarom zet je dit in de groep, tante ${z}? Dit regelen we toch gewoon?`,
    },
  ];
}
