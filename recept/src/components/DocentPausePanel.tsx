import { useDocentMode } from '../hooks/useDocentMode';
import { downloadTeamExport } from '../game/teamExport';
import type { GameAction } from '../game/gameReducer';
import type { GameUiState, Phase } from '../game/uiTypes';

const PHASES: { id: Phase; label: string }[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'cold', label: 'Cold open' },
  { id: 'onderzoek', label: 'Onderzoek' },
  { id: 'besluit', label: 'Besluit' },
  { id: 'scan', label: 'Scan' },
  { id: 'uitkomst', label: 'Uitkomst' },
  { id: 'tussen', label: 'Tussen' },
  { id: 'voorspel', label: 'Voorspel' },
  { id: 'opvolging', label: 'Opvolging' },
  { id: 'pauze', label: 'Pauze' },
  { id: 'nabespreking', label: 'Nabespreking' },
];

type Props = {
  state: GameUiState;
  dispatch: (a: GameAction) => void;
};

export function DocentPausePanel({ state, dispatch }: Props) {
  const docent = useDocentMode();
  if (!docent) return null;

  const h = state.hidden;

  return (
    <div className="docent-panel">
      <p className="glosh">DOCENT</p>
      <div className="docent-row">
        <span>Beslistijd</span>
        <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'ADJUST_TIMER', delta: -60 })}>
          −1 min
        </button>
        <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'ADJUST_TIMER', delta: 60 })}>
          +1 min
        </button>
        <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'SET_TIMER_ON', on: !state.timerOn })}>
          {state.timerOn ? 'Timer pauzeren' : 'Timer hervatten'}
        </button>
      </div>
      <label className="docent-row">
        <span>Spring naar fase</span>
        <select
          value={state.phase}
          onChange={(e) => dispatch({ type: 'SET_PHASE', phase: e.target.value as Phase })}
        >
          {PHASES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      <div className="docent-hidden" aria-live="polite">
        <p>
          <strong>Verborgen meters</strong> — Menselijke maat {Math.round(h.menselijkeMaat)} · Eerlijkheid{' '}
          {Math.round(h.eerlijkheid)}
        </p>
        {h.logMm.length > 0 ? (
          <ul className="note">
            {h.logMm.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        ) : null}
        {h.logEer.length > 0 ? (
          <ul className="note">
            {h.logEer.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <button type="button" className="btn" onClick={() => downloadTeamExport(state)}>
        Exporteer keuzeketen (JSON)
      </button>
    </div>
  );
}
