import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

const GOK = [
  { id: 'marco', t: 'Marco' },
  { id: 'sanne', t: 'Sanne' },
  { id: 'lies', t: 'Lies' },
  { id: 'zus', t: 'Jullie, als zus van Harrie' },
] as const;

export function VoorspelPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  return (
    <div className="wrap" style={{ paddingTop: 24 }}>
      <section className="panel">
        <div className="ph">
          <h2>WORDT VERVOLGD</h2>
          <span className="live">EINDE AFLEVERING 4</span>
        </div>
        <p className="big">Harrie overlijdt in 2031. In zijn testament is één zin doorgestreept.</p>
      </section>
      <div className="q">
        <span className="tag">TAFELVRAAG</span>
        <p>Wat heeft dit MT aan Harries opvolger nagelaten, behalve geld?</p>
      </div>
      <section className="panel">
        <div className="ph">
          <h2>VOORSPEL</h2>
          <span className="data" style={{ fontSize: 12, color: 'var(--soft)' }}>
            onthulling in aflevering 5
          </span>
        </div>
        <p className="note">Wie krijgt de beslissende stem over het bedrijf?</p>
        <div className="opts">
          {GOK.map((g) => (
            <button
              key={g.id}
              type="button"
              className="opt"
              aria-pressed={state.gok === g.id}
              onClick={() => dispatch({ type: 'SET_GOK', id: g.id })}
            >
              {g.t}
            </button>
          ))}
        </div>
      </section>
      <p className="note">De volledige nabespreking met verborgen meters volgt in stap 8 (docentmodus).</p>
    </div>
  );
}
