import { compute } from '@engine/compute';
import { ROUNDS } from '@data/rounds';
import { TaskBar } from '../../components/TaskBar';
import { engineContext } from '../../game/budgetUi';
import { outcomeHeadline } from '../../game/headline';
import { eur } from '../../lib/format';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function UitkomstPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const res = state.results[state.round];
  if (!res) return null;
  const ctx = engineContext(state);
  const base = compute(state.round, [], 1, ctx);
  const D = ROUNDS[state.round];
  const v = D.verm.find((x) => x.id === state.rounds[state.round].verm);
  const fits = res.sel.filter((k) => k.fit).length;

  const verdicts = [
    {
      k: 'PAST HET BIJ DE CRISIS?',
      v: fits ? '×1,3' : '×1,0',
      x: fits
        ? `Minstens één interventie past bij de ${D.crisis}. Daardoor werkt jullie besluit sterker.`
        : `Geen interventie pakt de ${D.crisis} aan. Daardoor werkt jullie besluit niet extra.`,
      good: fits > 0,
      bad: false,
    },
    {
      k: 'VERSTERKEN ZE ELKAAR?',
      v: res.contra ? 'Dubbel signaal' : res.syn ? '+2 synergie' : 'Geen versterking',
      x: res.contra
        ? 'De twee interventies gaan tegen elkaar in. Dat kost vertrouwen (−5).'
        : res.syn
          ? 'De twee interventies versterken elkaar.'
          : 'Geen extra effect: beide interventies zitten in hetzelfde domein.',
      good: res.syn,
      bad: res.contra,
    },
    {
      k: 'KLOPTE JULLIE VERMOEDEN?',
      v: `×${String(v?.q ?? 1).replace('.', ',')}`,
      x: `Jullie vermoeden was ${v?.o ?? 'onbekend'}.`,
      good: (v?.q ?? 1) > 1,
      bad: (v?.q ?? 1) < 1,
    },
    {
      k: 'IS DE BASIS OP ORDE?',
      v: `${Math.round(res.g * 100)}%`,
      x:
        res.g < 1
          ? 'Medewerkers weten nog niet goed wat er van hen verwacht wordt. Daardoor tellen erkenning, erbij horen en groei maar gedeeltelijk mee.'
          : 'De basis is op orde: alles telt volledig mee.',
      good: res.g >= 1,
      bad: res.g < 0.9,
    },
    {
      k: 'WAAR GING HET GELD HEEN?',
      v: eur(res.bud.mensen ?? 0),
      x: `naar mensen, tegenover ${eur(res.bud.directie ?? 0)} naar de directie.`,
      good: (res.bud.mensen ?? 0) > (res.bud.directie ?? 0),
      bad: (res.bud.mensen ?? 0) < (res.bud.directie ?? 0),
    },
  ];

  const bes = base.hr.totaal - res.hr.totaal;

  return (
    <>
      <TaskBar
        step={4}
        title="UITKOMST"
        lead="TEMPO heeft jullie besluit doorgerekend. Lees van boven naar beneden: wat er gebeurde, wat het kost en hoe dat komt."
        sub='Klaar? Druk op “Einde van dit deel”.'
      />
      <section className="panel">
        <div className="ph">
          <h2>WAAROM DIT GEBEURDE</h2>
          <span className="live">HERBEREKEND</span>
        </div>
        <p className="big">{outcomeHeadline(res, base)}</p>
      </section>
      <section className="panel">
        <div className="ph">
          <h2>WAT MENSEN KOSTEN</h2>
          <span className="data" style={{ fontSize: 12, color: 'var(--soft)' }}>per halfjaar</span>
        </div>
        <p className="big" style={{ fontSize: 28 }}>
          {bes > 50000
            ? `Jullie besluit bespaart volgende ronde ${eur(bes)} aan HR-kosten.`
            : bes < -50000
              ? `Jullie besluit kost volgende ronde ${eur(-bes)} extra aan HR-kosten.`
              : 'De HR-kosten blijven vrijwel gelijk.'}
        </p>
      </section>
      <section className="panel">
        <div className="ph">
          <h2>WAT BEPAALDE DE UITKOMST?</h2>
        </div>
        <p className="note">Vijf dingen bepaalden hoe jullie besluit uitpakte. Blauw werkte voor jullie, oranje tegen.</p>
        <div className="verdicts">
          {verdicts.map((d) => (
            <div key={d.k} className={`vd${d.good ? ' good' : ''}${d.bad ? ' bad' : ''}`}>
              <span className="k">{d.k}</span>
              <span className="v">{d.v}</span>
              <span className="x">{d.x}</span>
            </div>
          ))}
        </div>
        <details>
          <summary>Voor de nabespreking: zo is het berekend</summary>
          <p>
            Welzijn {Math.round(res.W)} tegenover {Math.round(base.W)} zonder ingreep. Productiviteit nu{' '}
            {Math.round(res.P0)}, volgende ronde {Math.round(res.P1)}. Verzuim volgende ronde{' '}
            {(Math.round(res.verz * 10) / 10).toString().replace('.', ',')}%.
          </p>
        </details>
      </section>
      <div className="q">
        <span className="tag">MT-VRAAG</span>
        <p>{D.q3}</p>
      </div>
      <button
        type="button"
        className="btn gold big"
        onClick={() =>
          dispatch({
            type: 'PLAY_FILM',
            kind: state.round === 1 ? 'slot-r1' : 'finale',
          })
        }
      >
        Einde van dit deel
      </button>
      <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'TRY_AGAIN' })}>
        Ander besluit proberen
      </button>
    </>
  );
}
