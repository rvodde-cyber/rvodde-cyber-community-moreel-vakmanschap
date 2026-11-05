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

export function BriefjePanel({ def, state, dispatch, periodKey }: Props) {
  const theme = PERIOD_THEMES[periodKey];
  const { dilemma } = state;
  const showChoices =
    (state.phase === 'onderzoek' || state.phase === 'besluit') &&
    state.round === def.ronde &&
    !dilemma.done;

  return (
    <section
      className="panel briefje-panel"
      aria-label="Handgeschreven briefje in het kasboek"
      style={
        {
          '--briefje-bg': theme.colors.panel,
          '--briefje-ink': theme.colors.text,
          '--briefje-muted': theme.colors.muted,
          '--briefje-accent': theme.colors.accent,
        } as React.CSSProperties
      }
    >
      <div className="ph">
        <h2>BRIEFJE</h2>
        <span className="live">PRIVÉ</span>
      </div>
      <div className="briefje-sheet" role="region" aria-labelledby="briefje-van">
        <p id="briefje-van" className="briefje-van">
          Van {def.privéBericht.van}
        </p>
        <p className="briefje-body">{def.privéBericht.tekst}</p>
      </div>
      {showChoices ? (
        <div className="briefje-keuzes">
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
          Jullie besluit over dit briefje is vastgelegd.
        </p>
      ) : (
        <p className="note">Het briefje ligt klaar. Jullie beslissen straks in het MT-overleg.</p>
      )}
    </section>
  );
}
