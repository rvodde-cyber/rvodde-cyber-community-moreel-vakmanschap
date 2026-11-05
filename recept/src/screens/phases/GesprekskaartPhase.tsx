import { useEffect, useRef, useState } from 'react';
import { episodeContent } from '@data/episodes/content';
import { episodeMeta } from '@data/episodes/meta';
import { WAARDEN, GESPREK_ZIN_MAX, GESPREK_WAARDEN_MAX } from '@data/schemas/gesprekskaart.schema';
import { PeriodThemeScope } from '../../components/PeriodThemeScope';
import { ConceptDocentBanner } from '../../components/ConceptDocentBanner';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';
import { usePrefersReducedMotion } from '../../lib/prefersReducedMotion';

const START_SEC = 120;
const EXTEND_SEC = 60;

export function GesprekskaartPhase({
  state,
  dispatch,
}: {
  state: GameUiState;
  dispatch: (a: GameAction) => void;
}) {
  const content = episodeContent(state.episode);
  const kaart = content.gesprekskaart;
  const meta = episodeMeta(state.episode);
  const reduced = usePrefersReducedMotion();

  const [zin, setZin] = useState('');
  const [waarden, setWaarden] = useState<string[]>([]);
  const [waardeMelding, setWaardeMelding] = useState('');
  const [totalSec, setTotalSec] = useState(START_SEC);
  const [elapsed, setElapsed] = useState(0);
  const [hidden, setHidden] = useState(typeof document !== 'undefined' && document.hidden);
  const [paused, setPaused] = useState(false);
  const warned30 = useRef(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (paused || hidden) return;
    const id = window.setInterval(() => {
      const sec = Math.floor((Date.now() - startRef.current) / 1000);
      setElapsed(sec);
    }, 500);
    return () => window.clearInterval(id);
  }, [paused, hidden]);

  const remaining = Math.max(0, totalSec - elapsed);
  const progress = totalSec > 0 ? Math.min(1, elapsed / totalSec) : 1;

  useEffect(() => {
    if (remaining === 30 && !warned30.current) {
      warned30.current = true;
    }
  }, [remaining]);

  const toggleWaarde = (id: string) => {
    setWaardeMelding('');
    setWaarden((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= GESPREK_WAARDEN_MAX) {
        setWaardeMelding(`Maximaal ${GESPREK_WAARDEN_MAX} waarden. Deselecteer eerst een chip.`);
        return prev;
      }
      return [...prev, id];
    });
  };

  const tijdsduurSec = () => Math.min(elapsed, totalSec + EXTEND_SEC * 3);

  const opslaan = () => {
    dispatch({
      type: 'GESPREK_OPSLAAN',
      zin,
      waarden,
      tijdsduurSec: tijdsduurSec(),
    });
  };

  const overslaan = () => {
    dispatch({ type: 'GESPREK_OVERSLAAN', tijdsduurSec: tijdsduurSec() });
  };

  const verleng = () => {
    setTotalSec((t) => t + EXTEND_SEC);
  };

  const sterren = '★'.repeat(kaart.sterren) + '☆'.repeat(Math.max(0, 2 - kaart.sterren));

  return (
    <>
      <ConceptDocentBanner />
      <div className="wrap gesprek-wrap">
        <PeriodThemeScope periodKey={meta.periodKey}>
          <article className="panel gesprekskaart-panel" aria-labelledby="gk-titel">
            <div className="ph">
              <h2 id="gk-titel">TEAMGESPREK</h2>
              <span className="live">RONDE 1</span>
            </div>
            <p className="gesprek-meta">
              <span className="gk-niveau">{kaart.niveau === 'micro' ? 'Micro' : 'Meso'}</span>
              <span className="gk-sterren" aria-label={`${kaart.sterren} van 2 sterren`}>
                {sterren}
              </span>
            </p>
            <h3 className="gk-titel">{kaart.titel}</h3>
            {kaart.alineas.map((p, i) => (
              <p key={i} className="body gk-alinea">
                {p}
              </p>
            ))}
            <p className="gk-slotvraag">
              <strong>Slotvraag:</strong> {kaart.slotvraag}
            </p>

            <div className="gesprek-timer" aria-hidden={reduced ? undefined : false}>
              <div
                className={`gesprek-timer-bar${reduced ? ' static' : ''}`}
                style={reduced ? undefined : { width: `${progress * 100}%` }}
              />
              <p className="note gesprek-timer-label">
                Gesprekstijd (richtlijn): {Math.floor(remaining / 60)}:
                {(remaining % 60).toString().padStart(2, '0')} — niet verplicht
              </p>
              {remaining <= 30 && remaining > 0 ? (
                <p className="note" role="status" aria-live="polite">
                  Nog ongeveer dertig seconden richtlijn.
                </p>
              ) : null}
            </div>

            <div className="gesprek-timer-actions">
              <button type="button" className="btn ghost" onClick={() => setPaused((p) => !p)}>
                {paused ? 'Timer hervatten' : 'Timer pauzeren'}
              </button>
              <button type="button" className="btn ghost" onClick={verleng}>
                +1 minuut
              </button>
            </div>

            <label className="lab" htmlFor="gk-zin">
              Onze zin
            </label>
            <textarea
              id="gk-zin"
              className="inp gk-zin"
              rows={3}
              maxLength={GESPREK_ZIN_MAX}
              value={zin}
              onChange={(e) => setZin(e.target.value)}
              placeholder="Eén zin die jullie als team vastleggen…"
            />
            <p className="need" aria-live="polite">
              {zin.length} / {GESPREK_ZIN_MAX} tekens
            </p>

            <p className="lab">Waarden (maximaal {GESPREK_WAARDEN_MAX})</p>
            <div className="gk-waarden" role="group" aria-label="Kies waarden">
              {WAARDEN.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className="chip gk-waarde"
                  aria-pressed={waarden.includes(w.id)}
                  onClick={() => toggleWaarde(w.id)}
                >
                  {w.label}
                </button>
              ))}
            </div>
            {waardeMelding ? (
              <p className="note" role="status">
                {waardeMelding}
              </p>
            ) : null}

            <div className="filmbtns">
              <button type="button" className="btn gold big" onClick={opslaan}>
                Naar de uitkomsten
              </button>
              <button type="button" className="btn ghost" onClick={overslaan}>
                Sla de kaart over
              </button>
            </div>
          </article>
        </PeriodThemeScope>
      </div>
    </>
  );
}
