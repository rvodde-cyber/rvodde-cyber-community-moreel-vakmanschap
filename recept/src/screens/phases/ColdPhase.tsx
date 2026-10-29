import { COLD_OPEN } from '@data/coldOpen';
import { HelpLinks } from '../../components/HelpLinks';
import { useUiModals } from '../../context/UiModalsContext';
import { unlockAudio } from '../../audio/sfx';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

const base = import.meta.env.BASE_URL;

export function ColdPhase({
  state,
  dispatch,
}: {
  state: GameUiState;
  dispatch: (a: GameAction) => void;
}) {
  const { openHowto, openGloss } = useUiModals();
  const round = state.round;
  const roundUi = state.rounds[round];
  const sb = COLD_OPEN[round];
  const head = (
    <>
      <div className="cine-bar t" />
      <div className="cine-bar b" />
    </>
  );
  const epTitle = round === 1 ? 'Het dashboard liegt niet' : 'Wie tekent er eigenlijk?';
  const trailerKind = round === 1 ? 'trailer-r1' : 'trailer-r2';
  const coldImg = round === 1 ? 'T4' : 'R2';

  if (!roundUi.trailerDone) {
    return (
      <div className="cine">
        <div className="cine-img" style={{ backgroundImage: `url(${base}beelden/${coldImg}.jpg)` }} />
        <div className="cine-shade" />
        {head}
        <div className="cine-in">
          <p className="kick">AFLEVERING 4 / RONDE {round}</p>
          <p className="ep">{epTitle}</p>
          <p className="task-line">
            Stap 1 van 4. Kijk eerst de trailer en de scène, met geluid als het kan. Daarna beginnen jullie aan het
            onderzoek.
          </p>
          <div className="filmbtns">
            <button
              type="button"
              className="btn gold big"
              onClick={() => {
                unlockAudio();
                dispatch({ type: 'PLAY_FILM', kind: trailerKind });
              }}
            >
              ▶ Speel de trailer
            </button>
            <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'TRAILER_DONE' })}>
              Naar de scène
            </button>
          </div>
          <HelpLinks onHowto={openHowto} onGloss={openGloss} />
        </div>
      </div>
    );
  }

  const line = sb.lines[roundUi.coldSub] ?? ['', ''];
  const last = roundUi.coldSub >= sb.lines.length - 1;

  return (
    <div className="cine">
      <div className="cine-img" style={{ backgroundImage: `url(${base}beelden/${sb.img}.jpg)` }} />
      <div className="cine-shade" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.2) 70%)' }} />
      {head}
      <div className="cine-in">
        <p className="kick">{sb.place}</p>
        <p className="sub" aria-live="polite">
          {line[0] ? <span className="who">{line[0]}</span> : null}
          {line[1]}
        </p>
        <p className="task-line">
          {last
            ? 'Dit was de scène. Zodra jullie op de knop drukken, begint de beslistijd van tien minuten.'
            : 'Stap 1 van 4. Tik op Verder om de scène te volgen. Overslaan mag ook.'}
        </p>
        <div className="filmbtns">
          {last ? (
            <button
              type="button"
              className="btn gold big"
              onClick={() => dispatch({ type: 'SET_PHASE', phase: 'onderzoek' })}
            >
              Start het MT-overleg
            </button>
          ) : (
            <>
              <button type="button" className="btn" onClick={() => dispatch({ type: 'COLD_NEXT' })}>
                Verder
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => dispatch({ type: 'SET_PHASE', phase: 'onderzoek' })}
              >
                Overslaan
              </button>
            </>
          )}
        </div>
        <HelpLinks onHowto={openHowto} onGloss={openGloss} />
      </div>
    </div>
  );
}
