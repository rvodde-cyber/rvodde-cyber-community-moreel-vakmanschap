import { useState } from 'react';
import { UiModalsProvider } from './context/UiModalsContext';
import { useGame } from './hooks/useGame';
import { GameShell } from './screens/GameShell';
import { HomeScreen } from './screens/HomeScreen';

export default function App() {
  const { state, dispatch, hasSave } = useGame();
  const [playing, setPlaying] = useState(false);
  const [draftName, setDraftName] = useState(state.playerName);

  return (
    <UiModalsProvider onExitMenu={() => setPlaying(false)}>
      {!playing ? (
        <HomeScreen
          name={draftName}
          hasSave={hasSave}
          onName={setDraftName}
          dispatch={dispatch}
          onStart={() => setPlaying(true)}
          onResume={() => {
            setDraftName(state.playerName);
            setPlaying(true);
          }}
        />
      ) : (
        <GameShell state={state} dispatch={dispatch} />
      )}
    </UiModalsProvider>
  );
}
