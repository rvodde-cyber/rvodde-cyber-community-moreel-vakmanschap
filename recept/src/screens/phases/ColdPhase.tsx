import { COLD_OPEN } from '@data/coldOpen';
import { HelpLinks } from '../../components/HelpLinks';
import { useUiModals } from '../../context/UiModalsContext';
import type { GameAction } from '../../game/gameReducer';
import type { RoundUiState } from '../../game/uiTypes';

const base = import.meta.env.BASE_URL;

export function ColdPhase({
  roundUi,
  dispatch,
}: {
  roundUi: RoundUiState;
  dispatch: (a: GameAction) => void;
}) {
  const { openHowto, openGloss } = useUiModals();
  const sb = COLD_OPEN[1];
  const head = (
    <>
      <div className="cine-bar t" />
      <div className="cine-bar b" />
    </>
  );

  if (!roundUi.trailerDone) {
    return (
      <div className="cine">
        <div
          className="cine-img"
          style={{ backgroundImage: `url(${base}beelden/T4.jpg)` }}
        />
        <div className="cine-shade" />
        {head}
        <div className="cine-in">
          <p className="kick">AFLEVERING 4 / RONDE 1</p>
          <p className="ep">Het dashboard liegt niet</p>
          <p className="task-line">
            Stap 1 van 4. Kijk eerst de trailer en de scène, met geluid als het kan. Daarna beginnen jullie aan het
            onderzoek.
          </p>
          <div className="filmbtns">
            <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'TRAILER_DONE' })}>
              ▶ Speel de trailer
            </button>
            <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'TRAILER_DONE' })}>
              Naar de scène
            </button>
          </div>
          <p className="note">Trailer en geluid volgen in stap 6; nu ga je direct naar de cold open.</p>
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
