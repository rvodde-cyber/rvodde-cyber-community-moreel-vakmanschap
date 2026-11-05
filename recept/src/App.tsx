import { useState } from 'react';
import { UiModalsProvider } from './context/UiModalsContext';
import { useGame } from './hooks/useGame';
import { PeriodTypographyScope } from './components/PeriodTypographyScope';
import { episodeMeta } from '@data/episodes/meta';
import type { GameAction } from './game/gameReducer';
import { GameShell } from './screens/GameShell';
import { HomeScreen } from './screens/HomeScreen';

export default function App() {
  const { state, dispatch, hasSave } = useGame();
  const [playing, setPlaying] = useState(false);
  const [draftName, setDraftName] = useState(state.playerName);

  const dispatchGame = (action: GameAction) => {
    dispatch(action);
    if (action.type === 'EXIT_TO_HOME') {
      setPlaying(false);
      setDraftName('');
    }
  };

  return (
    <UiModalsProvider
      onExitMenu={() => setPlaying(false)}
      gameState={playing ? state : null}
      gameDispatch={playing ? dispatchGame : undefined}
    >
      {!playing ? (
        <HomeScreen
          name={draftName}
          hasSave={hasSave}
          savedEpisode={state.playerName ? state.episode : undefined}
          onName={setDraftName}
          dispatch={dispatchGame}
          onStart={() => setPlaying(true)}
          onResume={() => {
            setDraftName(state.playerName);
            setPlaying(true);
          }}
        />
      ) : (
        <PeriodTypographyScope periodKey={episodeMeta(state.episode).periodKey}>
          <GameShell state={state} dispatch={dispatchGame} />
        </PeriodTypographyScope>
      )}
    </UiModalsProvider>
  );
}
