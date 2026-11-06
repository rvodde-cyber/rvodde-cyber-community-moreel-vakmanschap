import type { DilemmaDef } from '@data/episodes/dilemmaDef';
import { PERIOD_THEMES } from '../../themes/periods';
import type { PeriodKey } from '../../themes/periods';
import { DilemmaChoices } from './DilemmaChoices';
import type { GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';

type Props = {
  def: DilemmaDef;
  state: GameUiState;
  dispatch: (a: GameAction) => void;
  periodKey: PeriodKey;
};

/** Privé-app (2036, neutrale skin) — dilemma met kanaal app + dil; geen merk-UI. */
export function AppDilemmaPanel({ def, state, dispatch, periodKey }: Props) {
  const theme = PERIOD_THEMES[periodKey];
  const { dilemma } = state;
  const showChoices =
    (state.phase === 'onderzoek' || state.phase === 'besluit') &&
    state.round === def.ronde &&
    !dilemma.done;

  return (
    <section
      className="panel app-dilemma-panel"
      aria-label="Bericht in app, alleen voor jullie"
      style={
        {
          '--app-bg': theme.colors.panel,
          '--app-ink': theme.colors.text,
          '--app-muted': theme.colors.muted,
          '--app-accent': theme.colors.accent,
        } as React.CSSProperties
      }
    >
      <div className="ph">
        <h2>APP</h2>
        <span className="live">PRIVÉ</span>
      </div>
      <div className="app-device" role="region" aria-labelledby="app-van">
        <div className="app-device-chrome" aria-hidden="true" />
        <p id="app-van" className="app-van">
          Van {def.privéBericht.van}
        </p>
        <div className="app-body-wrap">
          <p className="app-body">{def.privéBericht.tekst}</p>
        </div>
      </div>
      {showChoices ? (
        <div className="app-keuzes">
          <p className="lab">Moreel dilemma — {def.titel}</p>
          <DilemmaChoices
            def={def}
            dilemma={dilemma}
            onChoice={(c) => dispatch({ type: 'SET_DILEMMA_CHOICE', choice: c })}
            onText={(t) => dispatch({ type: 'SET_DILEMMA_TEXT', text: t })}
            onConfirm={() => dispatch({ type: 'CONFIRM_DILEMMA' })}
          />
        </div>
      ) : dilemma.done ? (
        <p className="note" aria-live="polite">
          Jullie besluit over dit bericht is vastgelegd.
        </p>
      ) : (
        <p className="note">Het bericht staat klaar. Jullie beslissen straks in het MT-overleg.</p>
      )}
    </section>
  );
}
