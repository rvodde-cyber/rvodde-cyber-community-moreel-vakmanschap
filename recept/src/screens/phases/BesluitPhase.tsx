import { usesInterventieMotor } from '@data/episodes/motor';
import { budgetVoorRonde } from '@data/interventies/vertaaltabel';
import type { EpisodeId } from '@data/episodes/meta';
import { TaskBar } from '../../components/TaskBar';
import { ConceptDocentBanner } from '../../components/ConceptDocentBanner';
import { useDocentMode } from '../../hooks/useDocentMode';
import { needTextBesluit, okBesluitKeuze } from '../../game/besluitRules';
import { budgetBlockMessage, canAutoFixBudget } from '../../game/budgetFix';
import { bcalc, engineContext } from '../../game/budgetUi';
import { roundDefFor } from '../../game/roundSource';
import { eur, budgetPuntenLabel, kostEur } from '../../lib/format';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function BesluitPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const docent = useDocentMode();

  const round = state.round;
  const R = state.rounds[round];
  const D = roundDefFor(state);
  const ctx = engineContext(state);
  const b = bcalc(state, R, ctx);
  const pl = R.pilot === 'pilot';
  const zelf = R.pilot === 'zelf';
  const blockMsg = needTextBesluit(state);
  const budgetMsg = budgetBlockMessage(state);
  const showAutoFix = budgetMsg != null && canAutoFixBudget(state);
  const interventie = usesInterventieMotor(state.episode);

  return (
    <>
      <ConceptDocentBanner />
      <TaskBar
        step={3}
        title="BESLISSEN"
        lead={
          interventie
            ? 'Kies twee interventies binnen acht punten. Daarna leggen jullie uit waarom.'
            : 'Kies twee interventies, pas de begroting aan en bepaal of jullie het advies van PILOT volgen of zelf wegen.'
        }
        sub='Is alles ingevuld? Ga verder naar jullie argument. Wat er nog ontbreekt, staat daaronder.'
      />
      <div className="q">
        <span className="tag">VRAAG</span>
        <p>{D.q2}</p>
      </div>
      {interventie ? null : (
      <div className="pilot">
        <span className="k">▲ PILOT ADVIES</span>
        <p className="rec">{D.pilotRec}</p>
        <p className="pred">{D.pilotPred}</p>
        <div className="opts">
          <button type="button" className="opt" aria-pressed={pl} onClick={() => dispatch({ type: 'SET_PILOT', mode: 'pilot' })}>
            PILOT volgen
          </button>
          <button type="button" className="opt" aria-pressed={zelf} onClick={() => dispatch({ type: 'SET_PILOT', mode: 'zelf' })}>
            Zelf wegen
          </button>
        </div>
        {zelf ? (
          <div className="w3">
            <label className="lab" htmlFor="w0">Wie heeft baat?</label>
            <input id="w0" className="inp" value={R.w[0]} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'w0', value: e.target.value })} />
            <label className="lab" htmlFor="w1">Wie draagt de lasten?</label>
            <input id="w1" className="inp" value={R.w[1]} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'w1', value: e.target.value })} />
            <label className="lab" htmlFor="w2">Welke informatie missen we?</label>
            <input id="w2" className="inp" value={R.w[2]} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'w2', value: e.target.value })} />
          </div>
        ) : null}
      </div>
      )}
      <section className="panel">
        <div className="ph">
          <h2>INTERVENTIES</h2>
          <span className="count">{R.cards.length} / 2</span>
        </div>
        <div className="cards">
          {D.cards.map((k) => {
            const on = R.cards.includes(k.id);
            const lock = !interventie && pl && k.id === D.pilotCard;
            const off = (!on && R.cards.length >= 2) || lock;
            return (
              <button
                key={k.id}
                type="button"
                className="cardt"
                aria-pressed={on}
                disabled={off}
                onClick={() => dispatch({ type: 'TOGGLE_CARD', id: k.id })}
              >
                {k.id === D.pilotCard && !interventie ? <span className="pl">PILOT</span> : null}
                {docent && k.status === 'concept' ? <span className="concept-tag">CONCEPT</span> : null}
                <span className="id">{k.id}</span>
                <span className="t">{k.t}</span>
                <span className="d">{k.d}</span>
                <span className="eur">
                  {interventie
                    ? budgetPuntenLabel(k.kosten, 'gulden')
                    : k.kosten < 0
                      ? `levert ${eur(-kostEur(k.kosten))} op`
                      : eur(kostEur(k.kosten))}
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <section className="panel" id="budget">
        <div className="ph">
          <h2>{interventie ? 'BUDGET RONDE' : 'BEGROTING RONDE'} {round}</h2>
        </div>
        {interventie ? (
          <>
            <p className="note">
              Jullie hebben {budgetVoorRonde(state.episode as Exclude<EpisodeId, 4>, round)} punten deze ronde — in
              1984 uitgedrukt in gulden op het kasboek.
            </p>
            <div className="bsum">
              <div>
                <span>Interventies</span>
                <b>{budgetPuntenLabel(b.iv, 'gulden')}</b>
              </div>
              <div className={`left ${b.left < 0 ? 'neg' : 'pos'}`}>
                <span>{b.left < 0 ? 'Tekort' : 'Nog beschikbaar'}</span>
                <b>{budgetPuntenLabel(Math.abs(b.left), 'gulden')}</b>
              </div>
            </div>
          </>
        ) : (
          <>
        <p className="note">Opgesteld door Marco van Gorp. Akkoord, of passen jullie aan?</p>
        <div className="bsum">
          <div><span>Interventies</span><b>{eur(b.iv)}</b></div>
          <div><span>Begrotingsposten</span><b>{eur(b.po)}</b></div>
          <div className={`left ${b.left < 0 ? 'neg' : 'pos'}`}>
            <span>{b.left < 0 ? 'Tekort' : 'Nog te verdelen'}</span>
            <b>{eur(Math.abs(b.left))}</b>
          </div>
        </div>
        {D.posten.map((p) => {
          const v = R.bud[p.id] ?? 0;
          return (
            <div className="brow" key={p.id}>
              <label htmlFor={`b-${p.id}`}>
                <span className="t">{p.t}</span>
                <span className="d">{p.d}</span>
              </label>
              <input
                type="range"
                id={`b-${p.id}`}
                min={0}
                max={800000}
                step={20000}
                value={v}
                onChange={(e) => dispatch({ type: 'SET_BUD', id: p.id, value: Number(e.target.value) })}
              />
              <output className={v !== p.marco ? 'ch' : ''} htmlFor={`b-${p.id}`}>{eur(v)}</output>
            </div>
          );
        })}
          </>
        )}
      </section>
      <div className="besluit-submit" role="region" aria-labelledby="besluit-submit-heading">
        <h2 id="besluit-submit-heading" className="sr-only">
          Verder naar argument
        </h2>
        {blockMsg ? (
          <p className="need besluit-need" id="need" role="status" aria-live="polite">
            {blockMsg}
          </p>
        ) : null}
        <div className="besluit-submit-actions">
          {showAutoFix ? (
            <button
              type="button"
              className="btn ghost"
              onClick={() => dispatch({ type: 'AUTO_FIX_BUDGET' })}
            >
              Begroting automatisch aanpassen
            </button>
          ) : null}
          <button
            type="button"
            className="btn gold big"
            disabled={!okBesluitKeuze(state)}
            aria-describedby={blockMsg ? 'need' : undefined}
            onClick={() => dispatch({ type: 'PROCEED_TO_ARGUMENT' })}
          >
            Verder: jullie argument
          </button>
        </div>
      </div>
      <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'onderzoek' })}>
        Terug naar onderzoek
      </button>
    </>
  );
}
