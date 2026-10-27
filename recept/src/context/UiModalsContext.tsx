import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Modal } from '../components/Modal';
import { GlossaryModal } from '../components/modals/GlossaryModal';
import { HowItWorksModal } from '../components/modals/HowItWorksModal';
import { PauseModal } from '../components/modals/PauseModal';
import { RoleBelangModal } from '../components/modals/RoleBelangModal';

export type ModalKind = 'howto' | 'gloss' | 'pause' | 'role' | null;

type UiModalsValue = {
  openHowto: () => void;
  openGloss: () => void;
  openPause: () => void;
  openRole: (roleId: string) => void;
  close: () => void;
  round: 1 | 2;
  setRound: (r: 1 | 2) => void;
  setRoleSpokeHandler: (fn: (roleId: string) => void) => void;
};

const Ctx = createContext<UiModalsValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  onExitMenu: () => void;
};

export function UiModalsProvider({ children, onExitMenu }: ProviderProps) {
  const [kind, setKind] = useState<ModalKind>(null);
  const [round, setRound] = useState<1 | 2>(1);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [roleRevealed, setRoleRevealed] = useState(false);
  const roleSpokeRef = useRef<(id: string) => void>(() => {});

  const close = useCallback(() => {
    setKind(null);
    setRoleId(null);
    setRoleRevealed(false);
  }, []);

  const setRoleSpokeHandler = useCallback((fn: (roleId: string) => void) => {
    roleSpokeRef.current = fn;
  }, []);

  const value = useMemo<UiModalsValue>(
    () => ({
      openHowto: () => setKind('howto'),
      openGloss: () => setKind('gloss'),
      openPause: () => setKind('pause'),
      openRole: (id) => {
        setRoleId(id);
        setRoleRevealed(false);
        setKind('role');
      },
      close,
      round,
      setRound,
      setRoleSpokeHandler,
    }),
    [close, round, setRoleSpokeHandler],
  );

  const handleRoleSpoke = () => {
    if (roleId) roleSpokeRef.current(roleId);
    close();
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      <Modal open={kind === 'howto'} label="Hoe het werkt" onClose={close}>
        <HowItWorksModal onClose={close} onOpenGlossary={() => setKind('gloss')} />
      </Modal>
      <Modal open={kind === 'gloss'} label="Wie is wie en begrippen" onClose={close}>
        <GlossaryModal round={round} onClose={close} />
      </Modal>
      <Modal open={kind === 'pause'} label="Pauze" onClose={close}>
        <PauseModal
          onResume={close}
          onHowto={() => setKind('howto')}
          onGloss={() => setKind('gloss')}
          onMenu={() => {
            close();
            onExitMenu();
          }}
        />
      </Modal>
      {roleId ? (
        <Modal open={kind === 'role'} label="Rondje MT" onClose={close}>
          <RoleBelangModal
            round={round}
            roleId={roleId}
            revealed={roleRevealed}
            onReveal={() => setRoleRevealed(true)}
            onSpoke={handleRoleSpoke}
            onClose={close}
          />
        </Modal>
      ) : null}
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
