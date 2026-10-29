import { EPISODES } from '@data/episodes/meta';
import { episodeMeta } from '@data/episodes/meta';
import { HelpLinks } from '../components/HelpLinks';
import { useUiModals } from '../context/UiModalsContext';
import type { GameAction } from '../game/gameReducer';
import type { GameUiState } from '../game/uiTypes';

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

  const start = (episode: GameUiState['episode']) => {
    dispatch({ type: 'SET_NAME', name: name.trim() });
    dispatch({ type: 'START_EPISODE', episode });
    onStart();
  };

  return (
    <div className="setup">
      <div className="setup-in">
        <p className="kick">RECEPT</p>
        <h1 className="ep">Van Gorp Drones</h1>
        <p className="body">
          Jullie spelen de hoger opgeleide jongere zus van Harrie. Typ haar voornaam (max. 12 tekens). Gebruik geen
          echte persoonsgegevens.
        </p>
        <label className="lab" htmlFor="pname">
          Voornaam van de zus
        </label>
        <input
          id="pname"
          className="inp"
          value={name}
          maxLength={12}
          autoComplete="off"
          placeholder="Marja, Ingrid, Mieke…"
          onChange={(e) => onName(e.target.value)}
        />
        <p className="lab">Kies een aflevering</p>
        <ul className="ep-picker">
          {EPISODES.map((ep) => (
            <li key={ep.id}>
              <button
                type="button"
                className="btn gold"
                disabled={name.trim().length < 2}
                onClick={() => start(ep.id)}
              >
                {ep.id}. {ep.titel} ({ep.jaar})
                {ep.playMode === 'skeleton' ? ' — skelet' : ''}
              </button>
            </li>
          ))}
        </ul>
        {hasSave ? (
          <button type="button" className="btn ghost" onClick={onResume}>
            Doorgaan waar je was
            {savedEpisode ? ` (aflevering ${savedEpisode}: ${episodeMeta(savedEpisode).titel})` : ''}
          </button>
        ) : null}
        <HelpLinks onHowto={openHowto} onGloss={openGloss} onSettings={openSettings} />
      </div>
    </div>
  );
}
