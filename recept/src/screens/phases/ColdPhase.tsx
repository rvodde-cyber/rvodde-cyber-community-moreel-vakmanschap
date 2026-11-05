import { COLD_SCENE, INTRO_SCENE } from '@data/sceneCodes';
import { episodeContent } from '@data/episodes/content';
import { episodeMeta } from '@data/episodes/meta';
import { SceneBackground } from '../../components/SceneBackground';
import { HelpLinks } from '../../components/HelpLinks';
import { useUiModals } from '../../context/UiModalsContext';
import { unlockAudio } from '../../audio/sfx';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

function coldBackground(state: GameUiState, round: 1 | 2) {
  const content = episodeContent(state.episode);
  const co = content.coldOpen[round] ?? content.coldOpen[1];
  if (content.usesDemoBudget) {
    const file = round === 1 ? 'T4' : 'R2';
    return <SceneBackground checkCode={INTRO_SCENE[4].checkCode} fileCode={file} />;
  }
  if (content.roundCount >= 2 && co?.img) {
    return <SceneBackground checkCode={co.img} fileCode={co.img} />;
  }
  const sc = COLD_SCENE[state.episode as keyof typeof COLD_SCENE];
  return <SceneBackground checkCode={sc.checkCode} fileCode={sc.fileCode} />;
}

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
  const content = episodeContent(state.episode);
  const meta = episodeMeta(state.episode);
  const sb = content.coldOpen[round] ?? content.coldOpen[1];
  const skeleton = content.roundCount === 1;
  const multiRound = content.roundCount === 2;
  const head = (
    <>
      <div className="cine-bar t" />
      <div className="cine-bar b" />
    </>
  );
  const epTitle =
    content.titelByRound[round] ?? content.titelByRound[1] ?? meta.titel;
  const trailerKind = skeleton ? 'trailer-r1' : round === 1 ? 'trailer-r1' : 'trailer-r2';
  const kick = skeleton || !multiRound ? content.kick : `AFLEVERING ${state.episode} / RONDE ${round}`;

  if (!roundUi.trailerDone) {
    return (
      <div className="cine">
        {coldBackground(state, round)}
        <div className="cine-shade" />
        {head}
        <div className="cine-in">
          <p className="kick">{kick}</p>
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
      {coldBackground(state, round)}
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
