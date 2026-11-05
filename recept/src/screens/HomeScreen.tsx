import { EPISODES } from '@data/episodes/meta';
import { episodeMeta } from '@data/episodes/meta';
import { showsSkeletLabel } from '@data/episodes/motor';
import { HelpLinks } from '../components/HelpLinks';
import { useUiModals } from '../context/UiModalsContext';
import type { GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';

const base = import.meta.env.BASE_URL;

type Props = {
  name: string;
  hasSave: boolean;
  savedEpisode?: GameUiState['episode'];
  onName: (n: string) => void;
  dispatch: (a: GameAction) => void;
  onStart: () => void;
  onResume: () => void;
};

export function HomeScreen({
  name,
  hasSave,
  savedEpisode,
  onName,
  dispatch,
  onStart,
  onResume,
}: Props) {
  const { openHowto, openGloss, openSettings } = useUiModals();
  const nameOk = name.trim().length >= 2;

  const start = (episode: GameUiState['episode']) => {
    dispatch({ type: 'SET_NAME', name: name.trim() });
    dispatch({ type: 'START_EPISODE', episode });
    onStart();
  };

  return (
    <div className="landing landing-fade">
      <div
        className="landing-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${base}beelden/MENU.jpg)` }}
      />
      <div className="landing-overlay" aria-hidden="true" />

      <div className="landing-in">
        <header className="landing-hero">
          <p className="landing-kicker">EEN HR-DRAMA IN VIJF AFLEVERINGEN</p>
          <h1 className="landing-title">RECEPT</h1>
          <p className="landing-tagline landing-tagline--italic">Van Gorp Drones</p>
          <p className="landing-lead">
            Een krokettenfabriek. Vijf tijdperken. Jullie beslissen.
          </p>
          <p className="landing-accent landing-tagline--italic">Het MT vergadert. Jullie beslissen.</p>

          <div className="landing-data" aria-hidden="true">
            <div className="landing-data__line" />
            <ul className="landing-data__chips">
              <li>
                <span className="landing-data__tri" aria-hidden="true">
                  ▲
                </span>{' '}
                VERZUIM 8,0%
              </li>
              <li>
                <span className="landing-data__dot" aria-hidden="true">
                  ●
                </span>{' '}
                ORDER DFN-2231
              </li>
              <li>
                <span className="landing-data__tri" aria-hidden="true">
                  ▲
                </span>{' '}
                NORM STATION 14 +5%
              </li>
              <li>
                <span className="landing-data__dot" aria-hidden="true">
                  ●
                </span>{' '}
                PILOT-ADVIES
              </li>
            </ul>
            <div className="landing-data__line" />
          </div>
        </header>

        <section className="landing-play" aria-labelledby="landing-play-h">
          <h2 id="landing-play-h" className="landing-play__title">
            Speel mee
          </h2>
          <div className="landing-play__grid">
            <div className="landing-form">
              <p className="landing-form__intro">
                Jullie spelen de hoger opgeleide jongere zus van Harrie. Typ haar voornaam (max. 12 tekens). Gebruik
                geen echte persoonsgegevens.
              </p>
              <label className="landing-lab" htmlFor="pname">
                Voornaam van de zus
              </label>
              <input
                id="pname"
                className="landing-inp"
                value={name}
                maxLength={12}
                autoComplete="off"
                placeholder="Marja, Ingrid, Mieke…"
                onChange={(e) => onName(e.target.value)}
              />
              <ul className="landing-facts">
                <li>In teams van vier</li>
                <li>Ongeveer een uur</li>
                <li className="landing-facts__amber">Zet het geluid aan</li>
              </ul>
              {hasSave ? (
                <button type="button" className="btn ghost landing-resume" onClick={onResume}>
                  Doorgaan waar je was
                  {savedEpisode ? ` (aflevering ${savedEpisode}: ${episodeMeta(savedEpisode).titel})` : ''}
                </button>
              ) : null}
            </div>

            <div className="landing-eps">
              <p className="landing-lab">Kies je aflevering</p>
              <ul className="landing-ep-picker">
                {EPISODES.map((ep) => (
                  <li key={ep.id}>
                    <button
                      type="button"
                      className="landing-ep-card"
                      disabled={!nameOk}
                      onClick={() => start(ep.id)}
                    >
                      <span className="landing-ep-card__num">{ep.id}</span>
                      <span className="landing-ep-card__year">{ep.jaar}</span>
                      <span className="landing-ep-card__titel">{ep.titel}</span>
                      <span className="landing-ep-card__status">
                        {showsSkeletLabel(ep.id) ? 'Skelet' : 'Speelbaar'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <footer className="landing-foot">
          <p className="landing-foot__line">VAN GORP DRONES / VOSSENBERG, TILBURG / 2026</p>
          <HelpLinks onHowto={openHowto} onGloss={openGloss} onSettings={openSettings} />
        </footer>
      </div>
    </div>
  );
}
