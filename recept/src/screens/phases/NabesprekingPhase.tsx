import { isFullEpisode } from '@data/episodes/meta';
import { episodeMeta } from '@data/episodes/meta';
import { DILEMMA_EP4_PIOTR } from '@data/dilemmas/ep4-piotr';
import { MT_ROLLEN } from '@data/rollen';
import { ROL_BELANG } from '@data/rolBelang';
import { MV_DIMENSIES, PORTRAIT_ETHIEK } from '@content/moreelVakmanschap.nl';
import { PersonCard, personenInGlossarium } from '../../components/PersonCard';
import { useDocentMode } from '../../hooks/useDocentMode';
import { downloadTeamExport } from '../../game/teamExport';
import { roundDefFor } from '../../game/roundSource';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

export function NabesprekingPhase({ state, dispatch }: { state: GameUiState; dispatch: (a: GameAction) => void }) {
  const docent = useDocentMode();
  const meta = episodeMeta(state.episode);
  const roundNums = isFullEpisode(state.episode) ? ([1, 2] as const) : ([1] as const);
  const personen = personenInGlossarium(state.round);
  const h = state.hidden;

  return (
    <div className="wrap nabespreking" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <section className="panel">
        <div className="ph">
          <h2>NABESPREKING</h2>
          <span className="live">{meta.titel}</span>
        </div>
        <p className="body">
          Team <strong>{state.playerName || 'MT'}</strong> — aflevering {state.episode}. Geen ranglijst: vergelijk jullie
          keuzes als spiegel, niet als wedstrijd.
        </p>
        {docent ? (
          <button type="button" className="btn ghost" onClick={() => downloadTeamExport(state)}>
            Exporteer keuzeketen (JSON)
          </button>
        ) : null}
      </section>

      {roundNums.map((n) => {
        const ui = state.rounds[n];
        const res = state.results[n];
        if (!ui.mot && !res && ui.cards.length === 0) return null;
        const D = roundDefFor({ ...state, round: n });
        const verm = D.verm.find((v) => v.id === ui.verm);
        return (
          <section className="panel" key={n}>
            <div className="ph">
              <h2>RONDE {n}</h2>
              <span className="data">{D.label}</span>
            </div>
            <dl className="chain">
              <dt>Vermoeden</dt>
              <dd>{verm?.t ?? '—'}</dd>
              <dt>Interventies</dt>
              <dd>{ui.cards.length ? ui.cards.join(' en ') : '—'}</dd>
              <dt>Motivatie MT</dt>
              <dd>{ui.mot || '—'}</dd>
              {ui.minOn && ui.min ? (
                <>
                  <dt>Minderheidsstandpunt</dt>
                  <dd>{ui.min}</dd>
                </>
              ) : null}
              {res ? (
                <>
                  <dt>Gevolg (indicatief)</dt>
                  <dd>
                    Welzijn {Math.round(res.W)}, betrokkenheid {Math.round(res.B)}, productiviteit {Math.round(res.P0)}
                  </dd>
                </>
              ) : null}
            </dl>
            <details>
              <summary>Rolbelangen onthuld (nabespreking)</summary>
              <ul className="note">
                {MT_ROLLEN.map((ro) => (
                  <li key={ro.id}>
                    <strong>{ro.n}</strong>: {ROL_BELANG[n]?.[ro.id] ?? '—'}
                  </li>
                ))}
              </ul>
            </details>
          </section>
        );
      })}

      {state.dilemma.done && state.episode === 4 ? (
        <section className="panel">
          <div className="ph">
            <h2>MOREEL DILEMMA</h2>
          </div>
          <p className="body">{DILEMMA_EP4_PIOTR.titel}</p>
          <p>
            Keuze: <strong>{state.dilemma.choice}</strong>
            {state.dilemma.choice === 'prive' && state.dilemma.text ? ` — “${state.dilemma.text}”` : null}
          </p>
        </section>
      ) : null}

      {state.opvolging ? (
        <section className="panel">
          <div className="ph">
            <h2>OPVOLGING</h2>
          </div>
          <p>Opgeslagen keuze: {state.opvolging}</p>
        </section>
      ) : null}

      <section className="panel">
        <div className="ph">
          <h2>VERBORGEN METERS</h2>
        </div>
        <p className="big">
          Menselijke maat {Math.round(h.menselijkeMaat)} · Eerlijkheid {Math.round(h.eerlijkheid)}
        </p>
        {h.logMm.map((l) => (
          <p className="note" key={l}>
            {l}
          </p>
        ))}
        {h.logEer.map((l) => (
          <p className="note" key={l}>
            {l}
          </p>
        ))}
      </section>

      <section className="panel">
        <div className="ph">
          <h2>MOREEL VAKMANSCHAP</h2>
        </div>
        {MV_DIMENSIES.map((d) => (
          <div className="q" key={d.id}>
            <span className="tag">{d.titel.toUpperCase()}</span>
            <p>{d.vraag}</p>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="ph">
          <h2>PERSONEN</h2>
        </div>
        <p className="note">{PORTRAIT_ETHIEK}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {personen.map((p) => (
            <PersonCard key={p.slug} persoon={p} />
          ))}
        </div>
      </section>

      <button type="button" className="btn gold big" onClick={() => dispatch({ type: 'EXIT_TO_HOME' })}>
        Terug naar afleveringen
      </button>
    </div>
  );
}
