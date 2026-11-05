import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { COLD_SCENE, INTRO_SCENE } from '@data/sceneCodes';
import { episodeContent } from '@data/episodes/content';
import { episodeMeta } from '@data/episodes/meta';
import { usesBeslistijdTimer } from '@data/episodes/motor';
import { SceneBackground } from '../../components/SceneBackground';
import { HelpLinks } from '../../components/HelpLinks';
import { useUiModals } from '../../context/UiModalsContext';
import { unlockAudio } from '../../audio/sfx';
import { coldSceneTaskLine, coldTrailerIntroTaskLine } from '../../game/coldOpenCopy';
import { coldLineDurationMs, shouldAutoAdvanceCold } from '../../game/coldOpenTiming';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';
import { usePrefersReducedMotion } from '../../lib/prefersReducedMotion';

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
  const reducedMotion = usePrefersReducedMotion();
  const [autoPaused, setAutoPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false,
  );

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const round = state.round;
  const roundUi = state.rounds[round];
  const content = episodeContent(state.episode);
  const meta = episodeMeta(state.episode);
  const sb = content.coldOpen[round] ?? content.coldOpen[1]!;
  const skeleton = content.roundCount === 1;
  const multiRound = content.roundCount === 2;
  const hasTimer = usesBeslistijdTimer(state.episode);
  const head = (
    <>
      <div className="cine-bar t" />
      <div className="cine-bar b" />
    </>
  );
  const epTitle = content.titelByRound[round] ?? content.titelByRound[1] ?? meta.titel;
  const trailerKind = skeleton ? 'trailer-r1' : round === 1 ? 'trailer-r1' : 'trailer-r2';
  const kick = skeleton || !multiRound ? content.kick : `AFLEVERING ${state.episode} / RONDE ${round}`;

  const line = sb.lines[roundUi.coldSub] ?? ['', ''];
  const last = roundUi.coldSub >= sb.lines.length - 1;
  const manualAdvance = reducedMotion;

  const advanceLine = useCallback(() => {
    if (last) return;
    dispatch({ type: 'COLD_NEXT' });
  }, [dispatch, last]);

  const skipToOnderzoek = useCallback(() => {
    dispatch({ type: 'SET_PHASE', phase: 'onderzoek' });
  }, [dispatch]);

  useEffect(() => {
    if (!roundUi.trailerDone || last || manualAdvance) return;
    const gate = { reducedMotion: false, paused: autoPaused, tabHidden };
    if (!shouldAutoAdvanceCold(gate)) return;
    const ms = coldLineDurationMs(line);
    const t = window.setTimeout(advanceLine, ms);
    return () => window.clearTimeout(t);
  }, [roundUi.trailerDone, roundUi.coldSub, last, manualAdvance, autoPaused, tabHidden, line, advanceLine]);

  useEffect(() => {
    if (!roundUi.trailerDone) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      e.preventDefault();
      if (last) return;
      advanceLine();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [roundUi.trailerDone, last, advanceLine]);

  const onSceneSurfaceClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, input')) return;
    if (!last) advanceLine();
  };

  if (!roundUi.trailerDone) {
    return (
      <div className="cine">
        {coldBackground(state, round)}
        <div className="cine-shade" />
        {head}
        <div className="cine-in">
          <p className="kick">{kick}</p>
          <p className="ep">{epTitle}</p>
          <p className="task-line">{coldTrailerIntroTaskLine()}</p>
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

  const autoOn = !manualAdvance && !last && shouldAutoAdvanceCold({
    reducedMotion: false,
    paused: autoPaused,
    tabHidden,
  });

  return (
    <div
      className="cine cold-scene"
      onClick={onSceneSurfaceClick}
      role="presentation"
    >
      {coldBackground(state, round)}
      <div
        className="cine-shade"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.2) 70%)' }}
      />
      {head}
      <div className="cine-in">
        <p className="kick">{sb.place}</p>
        <p className="sub" aria-live="polite">
          {line[0] ? <span className="who">{line[0]}</span> : null}
          {line[1]}
        </p>
        <div className="cold-progress" aria-hidden="true">
          {sb.lines.map((_, i) => (
            <span key={i} className={i <= roundUi.coldSub ? 'on' : undefined} />
          ))}
        </div>
        <p className="task-line">
          {coldSceneTaskLine({ last, hasBeslistijdTimer: hasTimer, manualAdvance })}
        </p>
        <div className="filmbtns">
          {last ? (
            <button type="button" className="btn gold big" onClick={skipToOnderzoek}>
              Start het MT-overleg
            </button>
          ) : (
            <>
              {!manualAdvance ? (
                <button
                  type="button"
                  className="btn ghost"
                  aria-pressed={autoPaused}
                  aria-label={autoPaused ? 'Automatische weergave hervatten' : 'Automatische weergave pauzeren'}
                  onClick={() => setAutoPaused((p) => !p)}
                >
                  {autoPaused ? 'Verder (auto)' : 'Pauze'}
                </button>
              ) : (
                <button type="button" className="btn" onClick={advanceLine}>
                  Verder
                </button>
              )}
              <button type="button" className="btn ghost" onClick={skipToOnderzoek}>
                Overslaan
              </button>
            </>
          )}
        </div>
        {autoOn ? (
          <p className="note cold-auto-hint" aria-live="off">
            Automatische weergave actief
          </p>
        ) : null}
        <HelpLinks onHowto={openHowto} onGloss={openGloss} />
      </div>
    </div>
  );
}
