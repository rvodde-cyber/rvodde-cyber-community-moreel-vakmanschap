import { DocentPausePanel } from '../DocentPausePanel';
import type { GameAction } from '../../game/gameReducer';
import type { GameUiState } from '../../game/uiTypes';

type Props = {
  onResume: () => void;
  onHowto: () => void;
  onGloss: () => void;
  onSettings?: () => void;
  onMenu: () => void;
  gameState?: GameUiState | null;
  gameDispatch?: (a: GameAction) => void;
};

export function PauseModal({ onResume, onHowto, onGloss, onSettings, onMenu, gameState, gameDispatch }: Props) {
  return (
    <>
      <p className="k">GEPAUZEERD</p>
      <h2 id="modh">Even pauze</h2>
      <p className="note">De beslistijd staat stil zolang dit venster open is. Jullie voortgang wordt bewaard.</p>
      {gameState && gameDispatch ? <DocentPausePanel state={gameState} dispatch={gameDispatch} /> : null}
      <button type="button" className="btn" onClick={onResume}>Hervatten</button>
      <button type="button" className="btn ghost" onClick={onHowto}>Hoe het werkt</button>
      <button type="button" className="btn ghost" onClick={onGloss}>Wie is wie en begrippen</button>
      {onSettings ? (
        <button type="button" className="btn ghost" onClick={onSettings}>Instellingen</button>
      ) : null}
      <button type="button" className="btn ghost" onClick={onMenu}>Naar het hoofdmenu</button>
    </>
  );
}
