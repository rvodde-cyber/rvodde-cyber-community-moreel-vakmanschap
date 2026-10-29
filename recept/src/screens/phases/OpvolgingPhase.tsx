import { OPVOLGING_OPTIES, OPVOLGING_UITLEG } from '@data/opvolging';
import { HelpLinks } from '../../components/HelpLinks';
import { useUiModals } from '../../context/UiModalsContext';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function OpvolgingPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const { openHowto, openGloss } = useUiModals();

  return (
    <div className="cine">
      <div className="cine-shade" />
      <div className="cine-in">
        <p className="kick">AFLEVERING 3 / OPVOLGING</p>
        <p className="ep">Wie neemt het straks over?</p>
        <p className="body">{OPVOLGING_UITLEG}</p>
        <div className="opvolg-grid">
          {OPVOLGING_OPTIES.map((o) => (
            <button
              key={o.id}
              type="button"
              className="btn ghost big opvolg-btn"
              onClick={() => dispatch({ type: 'SET_OPVOLGING', keuze: o.id })}
            >
              <strong>{o.naam}</strong>
              <span className="body">{o.kort}</span>
            </button>
          ))}
        </div>
        {state.opvolging ? (
          <p className="note">Opgeslagen: {state.opvolging}. Gevolgen in aflevering 4 en 5: TODO in data.</p>
        ) : null}
        <HelpLinks onHowto={openHowto} onGloss={openGloss} />
      </div>
    </div>
  );
}
