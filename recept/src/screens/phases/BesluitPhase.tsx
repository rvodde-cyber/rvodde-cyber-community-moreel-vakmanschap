import { ROUNDS } from '@data/rounds';
import { MT_ROLLEN } from '@data/rollen';
import { TaskBar } from '../../components/TaskBar';
import { needText, okBesluit } from '../../game/besluitRules';
import { bcalc, engineContext } from '../../game/budgetUi';
import { eur, kostEur } from '../../lib/format';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function BesluitPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const round = state.round;
  const R = state.rounds[round];
  const D = ROUNDS[round];
  const ctx = engineContext(state);
  const b = bcalc(round, R, ctx);
  const pl = R.pilot === 'pilot';
  const zelf = R.pilot === 'zelf';

  return (
    <>
      <TaskBar
        step={3}
        title="MT-BESLUIT"
        lead="Nu beslissen jullie als MT. Loop de onderdelen van boven naar beneden langs: het advies van PILOT, twee interventies, de begroting, het rondje MT en één zin motivatie."
        sub='De knop “Besluit vastleggen” onderaan wordt actief zodra alles is ingevuld. Wat er nog ontbreekt, staat daaronder.'
      />
      <div className="q">
        <span className="tag">MT-VRAAG</span>
        <p>{D.q2}</p>
      </div>
      <div className="pilot">
        <span className="k">▲ PILOT ADVIES</span>
        <p className="rec">{D.pilotRec}</p>
        <p className="pred">{D.pilotPred}</p>
        <div className="opts">
          <button type="button" className="opt" aria-pressed={pl} onClick={() => dispatch({ type: 'SET_PILOT', mode: 'pilot' })}>
            PILOT volgen
          </button>
          <button type="button" className="opt" aria-pressed={zelf} onClick={() => dispatch({ type: 'SET_PILOT', mode: 'zelf' })}>
            Zelf wegen
          </button>
        </div>
        {zelf ? (
          <div className="w3">
            <label className="lab" htmlFor="w0">Wie heeft baat?</label>
            <input id="w0" className="inp" value={R.w[0]} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'w0', value: e.target.value })} />
            <label className="lab" htmlFor="w1">Wie draagt de lasten?</label>
            <input id="w1" className="inp" value={R.w[1]} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'w1', value: e.target.value })} />
            <label className="lab" htmlFor="w2">Welke informatie missen we?</label>
            <input id="w2" className="inp" value={R.w[2]} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'w2', value: e.target.value })} />
          </div>
        ) : null}
      </div>
      <section className="panel">
        <div className="ph">
          <h2>INTERVENTIES</h2>
          <span className="count">{R.cards.length} / 2</span>
        </div>
        <div className="cards">
          {D.cards.map((k) => {
            const on = R.cards.includes(k.id);
            const lock = pl && k.id === D.pilotCard;
            const off = (!on && R.cards.length >= 2) || lock;
            return (
              <button
                key={k.id}
                type="button"
                className="cardt"
                aria-pressed={on}
                disabled={off}
                onClick={() => dispatch({ type: 'TOGGLE_CARD', id: k.id })}
              >
                {k.id === D.pilotCard ? <span className="pl">PILOT</span> : null}
                <span className="id">{k.id}</span>
                <span className="t">{k.t}</span>
                <span className="d">{k.d}</span>
                <span className="eur">{k.kosten < 0 ? `levert ${eur(-kostEur(k.kosten))} op` : eur(kostEur(k.kosten))}</span>
              </button>
            );
          })}
        </div>
      </section>
      <section className="panel" id="budget">
        <div className="ph">
          <h2>BEGROTING RONDE {round}</h2>
        </div>
        <p className="note">Opgesteld door Marco van Gorp. Akkoord, of passen jullie aan?</p>
        <div className="bsum">
          <div><span>Interventies</span><b>{eur(b.iv)}</b></div>
          <div><span>Begrotingsposten</span><b>{eur(b.po)}</b></div>
          <div className={`left ${b.left < 0 ? 'neg' : 'pos'}`}>
            <span>{b.left < 0 ? 'Tekort' : 'Nog te verdelen'}</span>
            <b>{eur(Math.abs(b.left))}</b>
          </div>
        </div>
        {D.posten.map((p) => {
          const v = R.bud[p.id] ?? 0;
          return (
            <div className="brow" key={p.id}>
              <label htmlFor={`b-${p.id}`}>
                <span className="t">{p.t}</span>
                <span className="d">{p.d}</span>
              </label>
              <input
                type="range"
                id={`b-${p.id}`}
                min={0}
                max={800000}
                step={20000}
                value={v}
                onChange={(e) => dispatch({ type: 'SET_BUD', id: p.id, value: Number(e.target.value) })}
              />
              <output className={v !== p.marco ? 'ch' : ''} htmlFor={`b-${p.id}`}>{eur(v)}</output>
            </div>
          );
        })}
      </section>
      <section className="panel">
        <div className="ph">
          <h2>RONDJE MT</h2>
          <span className="count">{R.spoken.length} / 4</span>
        </div>
        <p className="note">Geef het scherm per rol aan wie die rol speelt. Elke rol leest eerst in stilte zijn eigen belang.</p>
        <div className="roles">
          {MT_ROLLEN.map((ro) => {
            const on = R.spoken.includes(ro.id);
            return (
              <button
                key={ro.id}
                type="button"
                className="role"
                aria-pressed={on}
                onClick={() => dispatch({ type: 'TOGGLE_ROLE', id: ro.id })}
              >
                <span className="n">{ro.n}</span>
                <span className="s">{on ? '✓ STANDPUNT GEGEVEN' : 'BEKIJK JE BELANG'}</span>
              </button>
            );
          })}
        </div>
        <label className="lab" htmlFor="mot">Motivatie van het MT (één zin)</label>
        <input
          id="mot"
          className="inp"
          value={R.mot}
          autoComplete="off"
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'mot', value: e.target.value })}
        />
        <button type="button" className="btn ghost" aria-pressed={R.minOn} onClick={() => dispatch({ type: 'TOGGLE_MIN' })}>
          {R.minOn ? '✓ Minderheidsstandpunt' : '+ Minderheidsstandpunt'}
        </button>
        {R.minOn ? (
          <>
            <label className="lab" htmlFor="min">Wie is het oneens, en waarom?</label>
            <input
              id="min"
              className="inp"
              value={R.min}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'min', value: e.target.value })}
            />
          </>
        ) : null}
      </section>
      <button
        type="button"
        className="btn gold big"
        disabled={!okBesluit(state)}
        onClick={() => dispatch({ type: 'CONFIRM_BESLUIT' })}
      >
        Besluit vastleggen
      </button>
      <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'onderzoek' })}>
        Terug naar onderzoek
      </button>
      <p className="need" id="need">{needText(state)}</p>
    </>
  );
}
