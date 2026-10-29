import type { GameUiState } from './uiTypes';
import { freshGame, freshHidden, freshRoundUi } from './budgetUi';

/** Migreer oude saves (v3) naar v4 chat/dilemma/hidden. */
export function migrateGameState(raw: unknown): GameUiState | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as GameUiState & { v?: number };
  if (s.v !== 3 && s.v !== 4) return null;

  const base = freshGame();
  const rounds: GameUiState['rounds'] = {
    1: { ...freshRoundUi(1), ...s.rounds?.[1], reacted: s.rounds?.[1]?.reacted ?? false },
    2: { ...freshRoundUi(2), ...s.rounds?.[2], reacted: s.rounds?.[2]?.reacted ?? false },
  };

  return {
    ...base,
    ...s,
    v: 4,
    rounds,
    chatTab: s.chatTab ?? 'g',
    inbox: s.inbox ?? [],
    msgText: s.msgText ?? {},
    msgTimes: s.msgTimes ?? {},
    read: s.read ?? {},
    typingId: null,
    dynamicBerichten: s.dynamicBerichten ?? {},
    deliveredPhases: s.deliveredPhases ?? {},
    pendingReacties: s.pendingReacties ?? false,
    dilemma: s.dilemma ?? base.dilemma,
    hidden: s.hidden ?? freshHidden(),
    filmKind: s.filmKind ?? null,
    gok: s.gok ?? null,
  };
}
