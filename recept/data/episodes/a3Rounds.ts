import { INTERVENTIES_A3 } from '../interventies-a3';
import { kostenInPunten, budgetVoorRonde } from '../interventies/vertaaltabel';
import { episodeMeta } from './meta';
import type { RoundDefinition } from '../schemas/rounds.schema';
import { roundDefinitionSchema } from '../schemas/rounds.schema';

function interventieCard(i: (typeof INTERVENTIES_A3)[0]): RoundDefinition['cards'][0] {
  return {
    id: i.id,
    t: i.naam,
    d: i.omschrijving,
    e: {},
    amo: '-',
    fit: 0,
    kosten: kostenInPunten(i.kostenCategorie),
    vt: 0,
    er: 0,
    rep: 0,
    cap: 0,
    status: i.status === 'definitief' ? 'goedgekeurd' : 'concept',
  };
}

const ONDERZOEKEN_A3_R1: RoundDefinition['acties'] = [
  {
    id: 'a1',
    t: 'Signalen tussen vestigingen',
    quote:
      'Waalwijk en Dongen werken op een andere manier aan hetzelfde product. Als er mensen worden uitgeleend, begint de uitleg steeds opnieuw.',
    sig: '▼ AFSTEMMING',
  },
  {
    id: 'a2',
    t: 'Cijfers en targets',
    quote:
      'Dongen haalt het target, Waalwijk zit al drie maanden eronder. Op het dashboard staat de score, maar niet de reden.',
    sig: '▲ CONTROLE  ▼ INFORMATIE',
  },
  {
    id: 'a3',
    t: 'Gesprek met Harrie',
    quote:
      '‘Vroeger liep ik door de hal en zag ik het,’ zegt Harrie. ‘Nu vraag ik wat een afdeling doet en krijg ik een spreadsheet.’',
    sig: '▼ OVERZICHT  ▼ CONTACT',
  },
  {
    id: 'a4',
    t: 'Gesprek met Sanne',
    quote:
      '‘De lijn loopt vast op de vloer,’ zegt Sanne. ‘De managers sturen op cijfers, maar de mensen weten niet wie ze moeten bellen.’',
    sig: '▼ INFORMATIE  ▼ STEUN LEIDING',
  },
  {
    id: 'a5',
    t: 'Managers en doorgroei',
    quote:
      'Twee van de drie afdelingsmanagers zijn nog maar kort in dienst. Twee goede medewerkers uit Dongen vertrokken omdat ze nergens konden doorgroeien.',
    sig: '▲ VERLOOP  ▼ DOORGROEI',
  },
];

const ONDERZOEKEN_A3_R2: RoundDefinition['acties'] = [
  {
    id: 'a1',
    t: 'De planning',
    quote:
      'Het nieuwe planningssysteem rekent de bezetting uit. Vorige maand stond er op dinsdagmiddag niemand op de lijn.',
    sig: '▲ CONTROLE  ▼ MENSELIJKE MAAT',
  },
  {
    id: 'a2',
    t: 'Cijfers en kosten',
    quote: 'De herfinanciering komt eraan. De bank wil lagere kosten en betere cijfers per vestiging.',
    sig: '▲ CONTROLE  ▲ DRUK',
  },
  {
    id: 'a3',
    t: 'Het personeel',
    quote:
      'Medewerkers vragen: ‘Als er wordt gereorganiseerd, wie blijft er dan?’ Twee collega’s hebben hun cv al bijgewerkt.',
    sig: '▲ ONZEKERHEID  ▼ VERTROUWEN',
  },
  {
    id: 'a4',
    t: 'Gesprek met Marco',
    quote: '‘Als we niets doen, redden we het niet,’ zegt Marco. ‘Het systeem is objectiever dan wij, pap.’',
    sig: '▲ CONTROLE  ▼ INSPRAAK',
  },
  {
    id: 'a5',
    t: 'Verloop en mobiliteit',
    quote:
      'Het verloop is in Waalwijk 14 procent en in Dongen 5 procent. Wie weggaat, zegt vaak: ‘Ik kon nergens anders terecht.’',
    sig: '▲ VERLOOP  ▼ DOORGROEI',
  },
];

function buildRound(ronde: 1 | 2): RoundDefinition {
  const meta = episodeMeta(3);
  const cards = INTERVENTIES_A3.filter((i) => i.ronde === ronde).map(interventieCard);
  if (cards.length !== 4) {
    throw new Error(`A3 ronde ${ronde}: verwacht 4 interventies, kreeg ${cards.length}`);
  }
  const acties = ronde === 1 ? ONDERZOEKEN_A3_R1 : ONDERZOEKEN_A3_R2;
  const shared = {
    label: String(meta.jaar),
    crisis: meta.greinerCrisis,
    budget: budgetVoorRonde(3, ronde),
    eurBase: 2100000,
    tech: 'excel-bi',
    brake: '',
    pilotCard: '',
    pilotRec: '',
    pilotPred: '',
    q1: 'Wat is symptoom, en wat is oorzaak?',
    q2: 'Welke twee interventies passen bij jullie kas en jullie mensen?',
    q3: 'Wat zien jullie terug op de vloer — en wat niet in de rapporten?',
    contra: [] as [string, string][],
    posten: [] as RoundDefinition['posten'],
    BE: {},
    acties,
    verm: [
      { id: 'v1', t: 'Mensen en vertrouwen', q: 1.1, o: 'verbondenheid' },
      { id: 'v2', t: 'Orde en cijfers', q: 1, o: 'structuur' },
      { id: 'v3', t: 'Groei en druk', q: 0.9, o: 'kas' },
    ],
    ticker: [
      ['i', '2009 — drie vestigingen, één Machinebouw B.V.'],
      [
        '!',
        ronde === 1
          ? 'Kies twee interventies binnen acht punten'
          : 'Kies twee interventies binnen negen punten',
      ],
    ] as RoundDefinition['ticker'],
  };
  const def = { ...shared, cards };
  roundDefinitionSchema.parse(def);
  return def;
}

export const A3_ROUNDS: { 1: RoundDefinition; 2: RoundDefinition } = {
  1: buildRound(1),
  2: buildRound(2),
};
