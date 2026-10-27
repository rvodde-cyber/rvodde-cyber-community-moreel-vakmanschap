import { ROUNDS } from '@data/rounds';
import { budgetOf } from '@engine/helpers';
import { DashboardColumn } from '../components/DashboardColumn';
import { StepsNav } from '../components/StepsNav';
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
  const ctx = engineContext(state);
  const showRoom = phase === 'onderzoek' || phase === 'besluit' || phase === 'uitkomst' || phase === 'scan';

  if (phase === 'intro') return <IntroPhase dispatch={dispatch} />;
  if (phase === 'cold') return <ColdPhase roundUi={state.rounds[round]} dispatch={dispatch} />;

  return (
    <>
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
            <button type="button" className="timer" aria-label="Timer">
              <small>Beslistijd</small>
              {pad2(Math.floor(state.tLeft / 60))}:{pad2(state.tLeft % 60)}
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
    </>
  );
}
