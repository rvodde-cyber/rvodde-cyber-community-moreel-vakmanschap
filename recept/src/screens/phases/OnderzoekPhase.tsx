import { roundDefFor } from '../../game/roundSource';
import { TaskBar } from '../../components/TaskBar';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function OnderzoekPhase({
  state,
  dispatch,
}: {
  state: GameUiState;
  dispatch: (a: GameAction) => void;
}) {
  const roundUi = state.rounds[state.round];
  const D = roundDefFor(state);
  const n = roundUi.acties.length;
  const ok = n >= 1 && roundUi.verm;

  return (
    <>
      <TaskBar
        step={2}
        title="ONDERZOEK"
        lead="Nog geen besluit. Tik één tot drie onderzoeken aan en lees wat ze laten zien. Kies daarna het vermoeden dat jullie het meest overtuigt."
        sub="Praat hardop met elkaar: wat zien we, en wat zou daarachter kunnen zitten? Jullie vermoeden telt straks mee in de uitkomst."
      />
      <div className="q">
        <span className="tag">MT-VRAAG</span>
        <p>{D.q1}</p>
      </div>
      <section className="panel">
        <div className="ph">
          <h2>ONDERZOEK</h2>
          <span className="count">{n} / 3</span>
        </div>
        <div className="tiles">
          {D.acties.map((a) => {
            const on = roundUi.acties.includes(a.id);
            const off = !on && n >= 3;
            return (
              <button
                key={a.id}
                type="button"
                className="tile"
                aria-pressed={on}
                disabled={off}
                onClick={() => dispatch({ type: 'TOGGLE_ACTIE', id: a.id })}
              >
                <span className="t">{a.t}</span>
                {on ? (
                  <>
                    <span className="quote">{a.quote}</span>
                    <span className="sig">{a.sig}</span>
                  </>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>
      <section className="panel">
        <div className="ph">
          <h2>VERMOEDEN VAN HET MT</h2>
        </div>
        <div className="opts">
          {D.verm.map((v) => (
            <button
              key={v.id}
              type="button"
              className="opt"
              aria-pressed={roundUi.verm === v.id}
              onClick={() => dispatch({ type: 'SET_VERM', id: v.id })}
            >
              {v.t}
            </button>
          ))}
        </div>
      </section>
      <button
        type="button"
        className="btn"
        disabled={!ok}
        onClick={() => dispatch({ type: 'SET_PHASE', phase: 'besluit' })}
      >
        Naar het MT-besluit
      </button>
      {!ok ? <p className="need">Nog nodig om door te gaan: minstens één onderzoek en een vermoeden.</p> : null}
    </>
  );
}
