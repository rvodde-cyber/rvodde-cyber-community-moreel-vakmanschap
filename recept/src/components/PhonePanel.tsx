import { useEffect, useRef } from 'react';
import { ROUNDS } from '@data/rounds';
import { NAAM_KLEUR } from '@data/berichten';
import { DilemmaChoices } from './DilemmaChoices';
import { notifyChatToast } from './MessageToast';
import { berichtDef } from '../game/chatHelpers';
import type { GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';

type Props = {
  state: GameUiState;
  dispatch: (a: GameAction) => void;
};

export function PhonePanel({ state, dispatch }: Props) {
  const chatRef = useRef<HTMLDivElement>(null);
  const prevLen = useRef(state.inbox.length);
  const tab = state.chatTab;

  useEffect(() => {
    if (state.inbox.length > prevLen.current) {
      const id = state.inbox[state.inbox.length - 1]!;
      const def = berichtDef(id, state);
      if (def) {
        notifyChatToast(def.channel, def.van, state.msgText[id] ?? '', def.fwd);
      }
    }
    prevLen.current = state.inbox.length;
  }, [state.inbox, state.msgText, state]);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.inbox, state.typingId, tab, state.dilemma]);

  const items = state.inbox.map((id) => berichtDef(id, state)).filter(Boolean);
  const unread = { g: 0, p: 0 };
  for (const id of state.inbox) {
    const m = berichtDef(id, state);
    if (m && !state.read[id] && m.channel !== tab) unread[m.channel]++;
  }

  const typingDef = state.typingId ? berichtDef(state.typingId, state) : null;
  const typingOnTab = typingDef?.channel === tab;

  const list = items.filter((m) => m!.channel === tab);
  let lastRound = 0;

  return (
    <section className="panel phone" aria-label="Berichten">
      <div className="chead">
        <span className="gav" aria-hidden="true">
          {tab === 'g' ? 'VG' : '🔒'}
        </span>
        <span>
          <span className="gn">{tab === 'g' ? 'MT Van Gorp Drones' : 'Privéberichten'}</span>
          <span className={`gm${typingOnTab ? ' typing' : ''}`}>
            {typingOnTab
              ? `${typingDef!.van.split(' ')[0]} typt…`
              : tab === 'g'
                ? `Marco, Dennis, Harrie, ${state.playerName || 'Mies'}`
                : 'Alleen zichtbaar voor jullie'}
          </span>
        </span>
      </div>
      <div className="ctabs" role="tablist">
        {(
          [
            ['g', 'GROEP'],
            ['p', 'PRIVÉ'],
          ] as const
        ).map(([ch, label]) => (
          <button
            key={ch}
            type="button"
            role="tab"
            aria-selected={tab === ch}
            className={unread[ch] ? 'pulse' : undefined}
            onClick={() => dispatch({ type: 'SET_CHAT_TAB', tab: ch })}
          >
            {label}
            {unread[ch] ? <span className="badge">{unread[ch]}</span> : null}
          </button>
        ))}
      </div>
      <div className="chat" ref={chatRef}>
        {list.length === 0 && !typingOnTab ? (
          <p className="cempty">{tab === 'g' ? 'Nog geen berichten in de groep.' : 'Nog geen privéberichten.'}</p>
        ) : (
          list.map((m) => {
            const def = m!;
            const first = def.van.split(' ')[0] ?? def.van;
            let dayEl = null;
            if (def.round !== lastRound) {
              lastRound = def.round;
              dayEl = (
                <div className="cday" key={`day-${def.round}`}>
                  <span>{ROUNDS[def.round].label}</span>
                </div>
              );
            }
            const isDil = def.dil && def.id === 'piotr';
            return (
              <div key={def.id}>
                {dayEl}
                <div className={`bub${isDil ? ' dil' : ''}`}>
                  {def.channel === 'p' ? (
                    <span className="lock">{isDil ? 'PRIVÉ  /  MOREEL DILEMMA' : 'PRIVÉ'}</span>
                  ) : null}
                  <span className="n" style={{ color: NAAM_KLEUR[first] ?? 'var(--soft)' }}>
                    {def.van}
                  </span>
                  {def.fwd ? <span className="fw">↪ Doorgestuurd</span> : null}
                  <span className="x">{state.msgText[def.id] ?? ''}</span>
                  {isDil ? (
                    <DilemmaChoices
                      dilemma={state.dilemma}
                      onChoice={(c) => dispatch({ type: 'SET_DILEMMA_CHOICE', choice: c })}
                      onText={(t) => dispatch({ type: 'SET_DILEMMA_TEXT', text: t })}
                      onConfirm={() => dispatch({ type: 'CONFIRM_DILEMMA' })}
                    />
                  ) : null}
                  <span className="t">
                    {state.msgTimes[def.id] ?? ''}
                    {def.channel === 'g' ? <b>✓✓</b> : null}
                  </span>
                </div>
              </div>
            );
          })
        )}
        {typingOnTab ? (
          <div className="bub" aria-label={`${typingDef!.van} typt`}>
            <span className="dots">
              <span />
              <span />
              <span />
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
