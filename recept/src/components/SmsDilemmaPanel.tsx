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

/** Privé-sms 2009 (geen merk-UI) — dilemma zoals A1, kanaal sms2009. */
export function SmsDilemmaPanel({ def, state, dispatch, periodKey }: Props) {
  const theme = PERIOD_THEMES[periodKey];
  const { dilemma } = state;
  const showChoices =
    (state.phase === 'onderzoek' || state.phase === 'besluit') &&
    state.round === def.ronde &&
    !dilemma.done;

  return (
    <section
      className="panel sms-dilemma-panel"
      aria-label="Sms op mobiele telefoon uit 2009"
      style={
        {
          '--sms-bg': theme.colors.panel,
          '--sms-ink': theme.colors.text,
          '--sms-muted': theme.colors.muted,
          '--sms-accent': theme.colors.accent,
        } as React.CSSProperties
      }
    >
      <div className="ph">
        <h2>SMS</h2>
        <span className="live">PRIVÉ</span>
      </div>
      <div className="sms-phone" role="region" aria-labelledby="sms-van">
        <div className="sms-phone-chrome" aria-hidden="true" />
        <p id="sms-van" className="sms-van">
          Van {def.privéBericht.van}
        </p>
        <div className="sms-body-wrap">
          <p className="sms-body">{def.privéBericht.tekst}</p>
        </div>
      </div>
      {showChoices ? (
        <div className="sms-keuzes">
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
          Jullie besluit over deze sms is vastgelegd.
        </p>
      ) : (
        <p className="note">De sms staat klaar. Jullie beslissen straks samen wat jullie ermee doen.</p>
      )}
    </section>
  );
}
