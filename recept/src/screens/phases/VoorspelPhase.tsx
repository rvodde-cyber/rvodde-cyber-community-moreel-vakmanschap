import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';
import { mtKoosPiotrInDienst, resolveTestamentForSpel } from '@data/piotrSpel';
import { useDocentMode } from '../../hooks/useDocentMode';

const GOK = [
  { id: 'marco', t: 'Marco' },
  { id: 'sanne', t: 'Sanne' },
  { id: 'lies', t: 'Lies' },
  { id: 'zus', t: 'Jullie, als zus van Harrie' },
] as const;

export function VoorspelPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const docent = useDocentMode();
  const inDienst = mtKoosPiotrInDienst(state.rounds[2].bud);
  const testament = resolveTestamentForSpel(inDienst, docent);

  return (
    <div className="wrap" style={{ paddingTop: 24 }}>
      <section className="panel">
        <div className="ph">
          <h2>WORDT VERVOLGD</h2>
          <span className="live">EINDE AFLEVERING 4</span>
        </div>
        <p className="big">Harrie overlijdt in 2031. In zijn testament is één zin doorgestreept.</p>
        {!testament.base.isFallback ? (
          <>
            <h3 className="data" style={{ marginTop: 16 }}>
              2031 — TESTAMENT
            </h3>
            <p className="body">{testament.base.tekst}</p>
            {!testament.variant.isFallback ? (
              <p className="body">
                {testament.variant.showConceptLabel ? <span className="concept-tag">CONCEPT </span> : null}
                {testament.variant.tekst}
              </p>
            ) : null}
          </>
        ) : null}
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
      <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'nabespreking' })}>
        Naar de nabespreking
      </button>
      <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'EXIT_TO_HOME' })}>
        Terug naar afleveringen
      </button>
    </div>
  );
}
