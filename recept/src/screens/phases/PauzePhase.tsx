import { episodeMeta } from '@data/episodes/meta';
import { roundDefFor } from '../../game/roundSource';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function PauzePhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const meta = episodeMeta(state.episode);
  const D = roundDefFor(state);

  return (
    <div className="cine">
      <div className="cine-shade" />
      <div className="cine-in">
        <p className="kick">{meta.kick} / PAUZE</p>
        <p className="ep">Tafelvragen</p>
        <div className="carry">
          <h4>1</h4>
          <p className="body">{D.q1}</p>
          <h4>2</h4>
          <p className="body">{D.q2}</p>
          <h4>3</h4>
          <p className="body">{D.q3}</p>
        </div>
        {state.opvolging ? (
          <p className="note">
            Jullie opvolgingskeuze ({state.opvolging}) staat klaar voor latere afleveringen zodra de gevolgdata zijn
            ingevuld.
          </p>
        ) : null}
        {state.conceptLog.length > 0 ? (
          <p className="note" aria-live="polite">
            Conceptinterventies gespeeld: {state.conceptLog.join(', ')}
          </p>
        ) : null}
        <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'nabespreking' })}>
          Naar de nabespreking
        </button>
        <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'EXIT_TO_HOME' })}>
          Terug naar afleveringen
        </button>
      </div>
    </div>
  );
}
