import { compute } from '@engine/compute';
import { slotLineRonde1 } from '@data/slotLines';
import { outcomeHeadline } from '../../game/headline';
import { engineContext } from '../../game/budgetUi';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function TussenPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const res = state.results[1];
  if (!res) return null;
  const base = compute(1, [], 1, engineContext(state));
  const [, line] = slotLineRonde1(res, state.rounds[1]);

  return (
    <div className="wrap" style={{ paddingTop: 24 }}>
      <section className="panel">
        <div className="ph">
          <h2>EINDE VAN RONDE 1</h2>
          <span className="live">PAUZE</span>
        </div>
        <p className="big">{line}</p>
        <p className="note">{outcomeHeadline(res, base)}</p>
      </section>
      <div className="q">
        <span className="tag">TAFELVRAAG</span>
        <p>Wat heeft jullie besluit gekost, en wie betaalt die rekening?</p>
      </div>
      <div className="q">
        <span className="tag">TAFELVRAAG</span>
        <p>Wie in deze familie wordt het minst gezien, en wat kost dat?</p>
      </div>
      <p className="note">Neem de tijd voor deze vragen. Ronde 2 begint pas als jullie verder gaan.</p>
      <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'START_ROUND_2' })}>
        Door naar ronde 2
      </button>
    </div>
  );
}
