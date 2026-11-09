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

/** Privé-bericht op de lens (2036) — zelfde glas-skin als Onderstroom lens. */
export function LensDilemmaPanel({ def, state, dispatch, periodKey }: Props) {
  const theme = PERIOD_THEMES[periodKey];
  const { dilemma } = state;
  const showChoices =
    (state.phase === 'onderzoek' || state.phase === 'besluit') &&
    state.round === def.ronde &&
    !dilemma.done;

  return (
    <section
      className="panel lens-dilemma-panel"
      aria-label="Privébericht op je lens, alleen voor jullie"
      style={
        {
          '--lens-bg': theme.colors.panel,
          '--lens-ink': theme.colors.text,
          '--lens-muted': theme.colors.muted,
          '--lens-accent': theme.colors.accent,
        } as React.CSSProperties
      }
    >
      <div className="ph">
        <h2>LENS</h2>
        <span className="live">PRIVÉ</span>
      </div>
      <div className="lens-dilemma-glas-wrap" role="region" aria-labelledby="lens-van">
        <p className="onderstroom-lens-label">Privé · buiten het bedrijfsplatform</p>
        <div className="onderstroom-lens-glas lens-dilemma-glas">
          <p id="lens-van" className="onderstroom-lens-meta">
            Van {def.privéBericht.van}
          </p>
          <p className="onderstroom-lens-tekst lens-dilemma-body">{def.privéBericht.tekst}</p>
        </div>
      </div>
      {showChoices ? (
        <div className="lens-keuzes">
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
        <p className="note">Het bericht staat klaar op je lens. Jullie beslissen straks in het MT-overleg.</p>
      )}
    </section>
  );
}
