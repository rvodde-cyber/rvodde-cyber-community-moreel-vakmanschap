import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Modal } from '../components/Modal';
import { GlossaryModal } from '../components/modals/GlossaryModal';
import { PauseModal } from '../components/modals/PauseModal';
import { SettingsModal } from '../components/modals/SettingsModal';

export type ModalKind = 'howto' | 'gloss' | 'pause' | 'settings' | null;
export type UitlegOrigin = 'landing' | 'game';

type UiModalsValue = {
  openHowto: () => void;
  openGloss: () => void;
  openPause: () => void;
  openSettings: () => void;
  openUitlegPage: () => void;
  close: () => void;
  round: 1 | 2;
  setRound: (r: 1 | 2) => void;
};

const Ctx = createContext<UiModalsValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  onExitMenu: () => void;
  onOpenUitleg?: (from: UitlegOrigin) => void;
  gameState?: import('../game/uiTypes').GameUiState | null;
  gameDispatch?: (a: import('../game/gameReducer').GameAction) => void;
};

export function UiModalsProvider({ children, onExitMenu, onOpenUitleg, gameState = null, gameDispatch }: ProviderProps) {
  const [kind, setKind] = useState<ModalKind>(null);
  const [round, setRound] = useState<1 | 2>(1);

  const close = useCallback((resumeAfterPause?: boolean) => {
    const resume = resumeAfterPause !== false;
    setKind((k) => {
      if (k === 'pause' && resume) gameDispatch?.({ type: 'SET_TIMER_ON', on: true });
      return null;
    });
  }, [gameDispatch]);

  const value = useMemo<UiModalsValue>(
    () => ({
      openHowto: () => {
        const from: UitlegOrigin = gameState ? 'game' : 'landing';
        onOpenUitleg?.(from);
      },
      openUitlegPage: () => {
        const from: UitlegOrigin = gameState ? 'game' : 'landing';
        onOpenUitleg?.(from);
      },
      openGloss: () => setKind('gloss'),
      openPause: () => {
        gameDispatch?.({ type: 'SET_TIMER_ON', on: false });
        setKind('pause');
      },
      openSettings: () => setKind('settings'),
      close,
      round,
      setRound,
    }),
    [close, round, gameDispatch, gameState, onOpenUitleg],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <Modal open={kind === 'gloss'} label="Wie is wie en begrippen" onClose={close}>
        <GlossaryModal episode={gameState?.episode ?? 4} round={round} onClose={close} />
      </Modal>
      <Modal open={kind === 'pause'} label="Pauze" onClose={close}>
        <PauseModal
          onResume={close}
          onUitleg={() => {
            close(false);
            onOpenUitleg?.('game');
          }}
          onGloss={() => setKind('gloss')}
          onSettings={() => setKind('settings')}
          onMenu={() => {
            close();
            onExitMenu();
          }}
          gameState={gameState}
          gameDispatch={gameDispatch}
        />
      </Modal>
      <Modal open={kind === 'settings'} label="Instellingen" onClose={close}>
        <SettingsModal onClose={close} />
      </Modal>
    </Ctx.Provider>
  );
}

export function useUiModals() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useUiModals buiten provider');
  return v;
}

/** Houdt glossarium (Piotr vanaf ronde 2) gelijk met spelronde. */
export function SyncModalRound({ round }: { round: 1 | 2 }) {
  const { setRound } = useUiModals();
  useEffect(() => {
    setRound(round);
  }, [round, setRound]);
  return null;
}
