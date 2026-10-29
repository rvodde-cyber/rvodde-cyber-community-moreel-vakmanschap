import { ROUNDS } from '@data/rounds';
import { budgetOf } from '@engine/helpers';
import { DashboardColumn } from '../components/DashboardColumn';
import { StepsNav } from '../components/StepsNav';
import { PhonePanel } from '../components/PhonePanel';
import { MessageToastHost } from '../components/MessageToast';
import { SyncModalRound, useUiModals } from '../context/UiModalsContext';
import { useMessageDelivery } from '../hooks/useMessageDelivery';
import { engineContext } from '../game/budgetUi';
import type { GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';
import { mln, pad2 } from '../lib/format';
import { BesluitPhase } from './phases/BesluitPhase';
import { ColdPhase } from './phases/ColdPhase';
import { IntroPhase } from './phases/IntroPhase';
import { OnderzoekPhase } from './phases/OnderzoekPhase';
import { ScanPhase } from './phases/ScanPhase';
import { UitkomstPhase } from './phases/UitkomstPhase';

function Ticker({ round }: { round: 1 | 2 }) {
  const items = ROUNDS[round].ticker;
  const html = items
    .map(([t, msg]) => `<span>${t === '!' ? '<b>▲</b>' : '<i>●</i>'}${msg}</span>`)
    .join('');
  return (
    <div className="ticker" aria-live="off">
      <div className="run" dangerouslySetInnerHTML={{ __html: html + html }} />
    </div>
  );
}

export function GameShell({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const { phase, round } = state;
  const { openPause } = useUiModals();
  useMessageDelivery(state, dispatch);
  const ctx = engineContext(state);
  const showRoom = phase === 'onderzoek' || phase === 'besluit' || phase === 'uitkomst' || phase === 'scan';

  if (phase === 'intro') {
    return (
      <>
        <SyncModalRound round={round} />
        <IntroPhase dispatch={dispatch} />
      </>
    );
  }
  if (phase === 'cold') {
    return (
      <>
        <SyncModalRound round={round} />
        <ColdPhase roundUi={state.rounds[round]} dispatch={dispatch} />
      </>
    );
  }

  return (
    <>
      <SyncModalRound round={round} />
      <header className="top">
        <div className="wrap">
          <div className="brand">
            <p className="mark">RECEPT</p>
            <p className="sys">
              Aflevering 4 / <b>Ronde {round} van 2</b> / {ROUNDS[round].label}
            </p>
          </div>
          <div className="clocks">
            <span className="clock" id="clock">MA 09:14:00</span>
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
              <b>{mln(budgetOf(round, ctx))}</b>
            </div>
          </div>
        </div>
      </header>
      {showRoom ? <Ticker round={round} /> : null}
      <div className="wrap">
        {showRoom ? <StepsNav phase={phase} /> : null}
        {showRoom ? (
          <div className="grid">
            <main>
              {phase === 'onderzoek' ? <OnderzoekPhase roundUi={state.rounds[round]} dispatch={dispatch} /> : null}
              {phase === 'besluit' ? <BesluitPhase state={state} dispatch={dispatch} /> : null}
              {phase === 'scan' ? <ScanPhase dispatch={dispatch} /> : null}
              {phase === 'uitkomst' ? <UitkomstPhase state={state} dispatch={dispatch} /> : null}
            </main>
            <aside>
              {(phase === 'onderzoek' || phase === 'besluit' || phase === 'uitkomst') ? (
                <PhonePanel state={state} dispatch={dispatch} />
              ) : null}
              <section className="panel">
                <div className="ph">
                  <h2>CONTROLEKAMER</h2>
                  <span className="live">LIVE</span>
                </div>
                <DashboardColumn state={state} />
              </section>
            </aside>
          </div>
        ) : null}
      </div>
      <MessageToastHost />
    </>
  );
}
