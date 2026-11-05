import { compute } from '@engine/compute';
import { episodeContent } from '@data/episodes/content';
import { outcomeHeadline } from '../../game/headline';
import { engineContext } from '../../game/budgetUi';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function TussenPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const res = state.results[1];
  if (!res) return null;
  const content = episodeContent(state.episode);
  const tussen = content.tussenKaart;
  if (!tussen) return null;

  const ctx = engineContext(state);
  const base = compute(1, [], 1, ctx);
  let headline = '';
  if (content.slotLines) {
    const [, line] = content.slotLines.ronde1(res, state.rounds[1]);
    headline = line;
  }

  return (
    <div className="wrap" style={{ paddingTop: 24 }}>
      <section className="panel">
        <div className="ph">
          <h2>{tussen.title}</h2>
          <span className="live">PAUZE</span>
        </div>
        {headline ? <p className="big">{headline}</p> : null}
        {content.usesDemoBudget ? <p className="note">{outcomeHeadline(res, base)}</p> : null}
      </section>
      {tussen.tafelvragen.map((q) => (
        <div className="q" key={q.slice(0, 48)}>
          <span className="tag">TAFELVRAAG</span>
          <p>{q}</p>
        </div>
      ))}
      <p className="note">{tussen.note}</p>
      <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'START_ROUND_2' })}>
        {tussen.ctaLabel}
      </button>
    </div>
  );
}
