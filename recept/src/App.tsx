import { useState } from 'react';
import { UiModalsProvider } from './context/UiModalsContext';
import { useGame } from './hooks/useGame';
import { PeriodTypographyScope } from './components/PeriodTypographyScope';
import { episodeMeta } from '@data/episodes/meta';
import type { GameAction } from './game/gameReducer';
import { GameShell } from './screens/GameShell';
import { HomeScreen } from './screens/HomeScreen';
import { UitlegScreen } from './screens/UitlegScreen';
import { PosterTypographyScope } from './components/PosterTypographyScope';
import type { UitlegOrigin } from './context/UiModalsContext';
import { useUiModals } from './context/UiModalsContext';

function UitlegWithModals({
  episodeHint,
  onBack,
  onToGame,
}: {
  episodeHint?: import('@data/episodes/meta').EpisodeId;
  onBack: () => void;
  onToGame?: () => void;
}) {
  const { openGloss, openSettings } = useUiModals();
  return (
    <UitlegScreen
      episodeHint={episodeHint}
      onBack={onBack}
      onToGame={onToGame}
      onOpenGlossary={openGloss}
      onOpenSettings={openSettings}
    />
  );
}

export default function App() {
  const { state, dispatch, hasSave } = useGame();
  const [playing, setPlaying] = useState(false);
  const [draftName, setDraftName] = useState(state.playerName);
  const [uitlegFrom, setUitlegFrom] = useState<UitlegOrigin | null>(null);

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
      onOpenUitleg={(from) => setUitlegFrom(from)}
      gameState={playing ? state : null}
      gameDispatch={playing ? dispatchGame : undefined}
    >
      {uitlegFrom ? (
        <PosterTypographyScope className="landing-typography">
          <UitlegWithModals
            episodeHint={uitlegFrom === 'game' ? state.episode : undefined}
            onBack={() => setUitlegFrom(null)}
            onToGame={uitlegFrom === 'game' ? () => setUitlegFrom(null) : undefined}
          />
        </PosterTypographyScope>
      ) : !playing ? (
        <PosterTypographyScope className="landing-typography">
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
        </PosterTypographyScope>
      ) : (
        <PeriodTypographyScope periodKey={episodeMeta(state.episode).periodKey}>
          <GameShell state={state} dispatch={dispatchGame} />
        </PeriodTypographyScope>
      )}
    </UiModalsProvider>
  );
}
