import { useEffect, useId, useRef } from 'react';
import {
  ARGUMENT_MAX,
  ARGUMENT_MIN,
  TEGENARGUMENT_MAX,
  TEGENARGUMENT_MIN,
  argumentLength,
  validateArgumentField,
} from '@data/schemas/argument.schema';
import { TaskBar } from '../../components/TaskBar';
import { ConceptDocentBanner } from '../../components/ConceptDocentBanner';
import { needTextBesluit, okBesluitKeuze } from '../../game/besluitRules';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function ArgumentPhase({
  state,
  dispatch,
}: {
  state: GameUiState;
  dispatch: (a: GameAction) => void;
}) {
  const r = state.rounds[state.round];
  const tegenHintId = useId();
  const argRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    argRef.current?.focus();
  }, []);

  const aLen = argumentLength(r.argument);
  const tLen = argumentLength(r.tegenargument);
  const valid = validateArgumentField(r.argument, r.tegenargument);
  const canConfirm = valid.ok && okBesluitKeuze(state);
  const blockMsg = !okBesluitKeuze(state) ? needTextBesluit(state) : !valid.ok ? valid.reason : '';

  return (
    <>
      <ConceptDocentBanner />
      <TaskBar
        step={4}
        title="LEG UIT"
        lead="Leg vast waarom jullie deze twee interventies kiezen en wat het sterkste argument is om het juist níet te doen."
        sub='De knop “Dit is ons besluit” wordt actief zodra beide velden kloppen.'
      />
      <section className="panel argument-panel">
        <label className="lab" htmlFor="arg-waarom">
          Waarom kiezen jullie deze twee?
        </label>
        <textarea
          id="arg-waarom"
          ref={argRef}
          className="inp gk-zin"
          rows={4}
          maxLength={ARGUMENT_MAX}
          value={r.argument}
          autoComplete="off"
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'argument', value: e.target.value })}
        />
        <p className="note argument-teller" aria-live="polite">
          <span aria-hidden="true">
            {aLen} / {ARGUMENT_MAX} tekens
          </span>
          <span className="sr-only">
            {aLen} van {ARGUMENT_MAX} tekens gebruikt. Minimaal {ARGUMENT_MIN} tekens nodig.
          </span>
        </p>

        <label className="lab" htmlFor="arg-tegen">
          Wat is het sterkste argument om dit juist niet te doen?
        </label>
        <textarea
          id="arg-tegen"
          className="inp gk-zin"
          rows={3}
          maxLength={TEGENARGUMENT_MAX}
          value={r.tegenargument}
          autoComplete="off"
          aria-describedby={tegenHintId}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'tegenargument', value: e.target.value })}
        />
        <p id={tegenHintId} className="argument-hint">
          Zijn er ook mensen die hier op achteruitgaan?
        </p>
        <p className="note argument-teller" aria-live="polite">
          <span aria-hidden="true">
            {tLen} / {TEGENARGUMENT_MAX} tekens
          </span>
          <span className="sr-only">
            {tLen} van {TEGENARGUMENT_MAX} tekens gebruikt. Minimaal {TEGENARGUMENT_MIN} tekens nodig.
          </span>
        </p>

        <div className="besluit-submit" role="region" aria-labelledby="argument-submit-heading">
          <h2 id="argument-submit-heading" className="sr-only">
            Besluit bevestigen
          </h2>
          {blockMsg ? (
            <p className="need besluit-need" id="arg-need" role="status" aria-live="polite">
              {blockMsg}
            </p>
          ) : null}
          <button
            type="button"
            className="btn gold big"
            disabled={!canConfirm}
            aria-describedby={blockMsg ? 'arg-need' : undefined}
            onClick={() => dispatch({ type: 'CONFIRM_BESLUIT' })}
          >
            Dit is ons besluit
          </button>
        </div>
      </section>
      <button type="button" className="btn ghost" onClick={() => dispatch({ type: 'SET_PHASE', phase: 'besluit' })}>
        Terug naar interventies
      </button>
    </>
  );
}
