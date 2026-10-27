import { ROUNDS } from '@data/rounds';
import { mln } from '../lib/format';
import type { GameUiState } from '../game/uiTypes';
import { GaugeRing } from './GaugeRing';

function distBar(betr: number) {
  const b = Math.max(5, betr - 25);
  const a = Math.max(3, 45 - 0.5 * betr);
  return (
    <div className="distbar" aria-hidden="true">
      <span style={{ width: `${b}%`, background: 'var(--cyan)' }} />
      <span style={{ width: `${100 - b - a}%` }} />
      <span style={{ width: `${a}%`, background: 'var(--amber)' }} />
    </div>
  );
}

export function DashboardColumn({ state }: { state: GameUiState }) {
  const res = state.results[state.round];
  const eb = ROUNDS[state.round].eurBase;

  if (!res) {
    return (
      <div className="gauges">
        <GaugeRing value={68} label="Productiviteit" />
        <GaugeRing value={50} label="Resultaat" extra={<div className="lbl data">{mln(eb)}</div>} />
        <GaugeRing value={50} label="Reputatie" />
        <GaugeRing value={50} label="Welzijn" warn />
        <GaugeRing value={38} label="Betrokkenheid" warn extra={distBar(38)} />
        <GaugeRing value={50} label="Vertrouwen" warn />
      </div>
    );
  }

  return (
    <div className="gauges">
      <GaugeRing
        value={Math.round(res.P0)}
        label="Productiviteit"
        extra={<div className="lbl data">volgende ronde {Math.round(res.P1)}</div>}
      />
      <GaugeRing
        value={Math.round(res.winst)}
        label="Resultaat"
        warn={res.winst < 40}
        extra={
          <>
            <div className="lbl data">{mln(res.eurRes)}</div>
            <div className="lbl data">prognose {mln(res.eurNext)}</div>
          </>
        }
      />
      <GaugeRing value={Math.round(res.rep)} label="Reputatie" />
      <GaugeRing value={Math.round(res.W)} label="Welzijn" warn={res.W < 45} />
      <GaugeRing
        value={Math.round(res.B)}
        label="Betrokkenheid"
        warn={res.B < 40}
        extra={distBar(res.B)}
      />
      <GaugeRing value={Math.round(res.V)} label="Vertrouwen" warn={res.V < 50} />
    </div>
  );
}
