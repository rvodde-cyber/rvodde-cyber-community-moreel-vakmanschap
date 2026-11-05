import { episodeContent } from '@data/episodes/content';
import { episodeMeta } from '@data/episodes/meta';
import { PERIOD_THEMES } from '../../themes/periods';
import { budgetOf, budgetOfDef } from '@engine/helpers';
import { BriefjePanel } from '../components/BriefjePanel';
import { ConceptDocentBanner } from '../components/ConceptDocentBanner';
import { DashboardColumn } from '../components/DashboardColumn';
import { FilmOverlay } from '../components/FilmOverlay';
import { PeriodThemeScope } from '../components/PeriodThemeScope';
import { StepsNav } from '../components/StepsNav';
import { PhonePanel } from '../components/PhonePanel';
import { MessageToastHost } from '../components/MessageToast';
import { SyncModalRound, useUiModals } from '../context/UiModalsContext';
import { useMessageDelivery } from '../hooks/useMessageDelivery';
import { engineContext } from '../game/budgetUi';
import { showBriefjePanel, showPhonePanel } from '../game/commPanel';
import { resolveFilmScript } from '../game/filmResolve';
import { roundDefFor } from '../game/roundSource';
import type { GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';
import { mln, pad2 } from '../lib/format';
import { BesluitPhase } from './phases/BesluitPhase';
import { ColdPhase } from './phases/ColdPhase';
import { IntroPhase } from './phases/IntroPhase';
import { OnderzoekPhase } from './phases/OnderzoekPhase';
import { OpvolgingPhase } from './phases/OpvolgingPhase';
import { PauzePhase } from './phases/PauzePhase';
import { ScanPhase } from './phases/ScanPhase';
import { TussenPhase } from './phases/TussenPhase';
import { UitkomstPhase } from './phases/UitkomstPhase';
import { NabesprekingPhase } from './phases/NabesprekingPhase';
import { VoorspelPhase } from './phases/VoorspelPhase';

function Ticker({ state }: { state: GameUiState }) {
  const items = roundDefFor(state).ticker;
  const html = items
    .map(([t, msg]) => `<span>${t === '!' ? '<b>▲</b>' : '<i>●</i>'}${msg}</span>`)
    .join('');
  return (
    <div className="ticker" aria-live="off">
      <div className="run" dangerouslySetInnerHTML={{ __html: html + html }} />
    </div>
  );
}

function FilmLayer({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const script = resolveFilmScript(state);
  if (!script) return null;
  return (
    <FilmOverlay
      script={script}
      onDone={() => dispatch({ type: 'END_FILM' })}
      onSkip={() => dispatch({ type: 'END_FILM' })}
    />
  );
}

export function GameShell({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const { phase, round } = state;
  const { openPause } = useUiModals();
  useMessageDelivery(state, dispatch);
  const ctx = engineContext(state);
  const meta = episodeMeta(state.episode);
  const content = episodeContent(state.episode);
  const D = roundDefFor(state);
  const budget = content.usesDemoBudget ? budgetOf(round, ctx) : budgetOfDef(D, round, ctx);
  const showRoom = phase === 'onderzoek' || phase === 'besluit' || phase === 'uitkomst' || phase === 'scan';
  const film = state.filmKind ? <FilmLayer state={state} dispatch={dispatch} /> : null;
  const dashTitle = content.usesDemoBudget
    ? 'CONTROLEKAMER'
    : PERIOD_THEMES[meta.periodKey].dashboardLabel.toUpperCase();
  const multiRound = content.roundCount === 2;
  const dilemmaDef = content.dilemma;

  if (phase === 'intro') {
    return (
      <>
        <SyncModalRound round={round} />
        <ConceptDocentBanner />
        <IntroPhase state={state} dispatch={dispatch} />
        {film}
        <MessageToastHost />
      </>
    );
  }
  if (phase === 'cold') {
    return (
      <>
        <SyncModalRound round={round} />
        <ConceptDocentBanner />
        <ColdPhase state={state} dispatch={dispatch} />
        {film}
        <MessageToastHost />
      </>
    );
  }
  if (phase === 'opvolging') {
    return (
      <>
        <OpvolgingPhase state={state} dispatch={dispatch} />
        {film}
        <MessageToastHost />
      </>
    );
  }
  if (phase === 'pauze') {
    return (
      <>
        <PauzePhase state={state} dispatch={dispatch} />
        {film}
        <MessageToastHost />
      </>
    );
  }
  if (phase === 'nabespreking') {
    return (
      <>
        <ConceptDocentBanner />
        <NabesprekingPhase state={state} dispatch={dispatch} />
        <MessageToastHost />
      </>
    );
  }
  if (phase === 'tussen') {
    return (
      <>
        <SyncModalRound round={round} />
        <TussenPhase state={state} dispatch={dispatch} />
        {film}
        <MessageToastHost />
      </>
    );
  }
  if (phase === 'voorspel') {
    return (
      <>
        <SyncModalRound round={round} />
        <VoorspelPhase state={state} dispatch={dispatch} />
        {film}
        <MessageToastHost />
      </>
    );
  }

  return (
    <>
      <SyncModalRound round={round} />
      <ConceptDocentBanner />
      <header className="top">
        <div className="wrap">
          <div className="brand">
            <p className="mark">RECEPT</p>
            <p className="sys">
              Aflevering {state.episode} /{' '}
              {multiRound ? (
                <>
                  <b>Ronde {round} van 2</b> / {D.label}
                </>
              ) : (
                <>
                  <b>{meta.titel}</b> / {D.label}
                </>
              )}
            </p>
          </div>
          <div className="clocks">
            <span className="clock" id="clock">
              {content.usesDemoBudget ? (round === 2 ? 'DI' : 'MA') : ''} {meta.jaar} · 09:14
            </span>
            <button
              type="button"
              className="timer"
              aria-label="Beslistijd, tik om te pauzeren"
              onClick={openPause}
            >
              <small>Beslistijd</small>
              {pad2(Math.floor(state.tLeft / 60))}:{pad2(state.tLeft % 60)}
            </button>
            <button type="button" className="ib" aria-label="Menu" onClick={openPause}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <div className="hbud">
              <small>Budget ronde {round}</small>
              <b>{mln(budget)}</b>
            </div>
          </div>
        </div>
      </header>
      {showRoom && content.usesDemoBudget ? <Ticker state={state} /> : null}
      <div className="wrap">
        {showRoom ? <StepsNav phase={phase} /> : null}
        {showRoom ? (
          <div className="grid">
            <main>
              {phase === 'onderzoek' ? <OnderzoekPhase state={state} dispatch={dispatch} /> : null}
              {phase === 'besluit' ? <BesluitPhase state={state} dispatch={dispatch} /> : null}
              {phase === 'scan' ? <ScanPhase dispatch={dispatch} /> : null}
              {phase === 'uitkomst' ? <UitkomstPhase state={state} dispatch={dispatch} /> : null}
            </main>
            <aside>
              {showPhonePanel(state) ? <PhonePanel state={state} dispatch={dispatch} /> : null}
              {showBriefjePanel(state) && dilemmaDef ? (
                <BriefjePanel
                  def={dilemmaDef}
                  state={state}
                  dispatch={dispatch}
                  periodKey={meta.periodKey}
                />
              ) : null}
              <PeriodThemeScope periodKey={meta.periodKey}>
                <section className="panel period-panel">
                  <div className="ph">
                    <h2>{dashTitle}</h2>
                    <span className="live">LIVE</span>
                  </div>
                  <DashboardColumn state={state} />
                </section>
              </PeriodThemeScope>
            </aside>
          </div>
        ) : null}
      </div>
      {film}
      <MessageToastHost />
    </>
  );
}
