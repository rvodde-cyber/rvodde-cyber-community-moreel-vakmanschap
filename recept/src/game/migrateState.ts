import type { GameUiState } from './uiTypes';
import { freshGame, freshHidden, freshRoundUi } from './budgetUi';
import { inferSceneGestartOp } from './sceneGestart';
import { usesBeslistijdTimer } from '@data/episodes/motor';

/** Migreer oude saves (v3–v5) naar huidige v5-state (episode, opvolging, chat, trailerGezien). */
export function migrateGameState(raw: unknown): GameUiState | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as GameUiState & { v?: number };
  if (s.v !== 3 && s.v !== 4 && s.v !== 5) return null;

  const episode = s.episode ?? 4;
  const base = freshGame();
  const merged1 = {
    ...freshRoundUi(episode, 1),
    ...s.rounds?.[1],
    argument: s.rounds?.[1]?.argument?.trim()
      ? s.rounds[1].argument
      : (s.rounds?.[1]?.mot ?? s.rounds?.[1]?.argument ?? ''),
    tegenargument: s.rounds?.[1]?.tegenargument ?? '',
    reacted: s.rounds?.[1]?.reacted ?? false,
  };
  const merged2 = {
    ...freshRoundUi(episode, 2),
    ...s.rounds?.[2],
    argument: s.rounds?.[2]?.argument?.trim()
      ? s.rounds[2].argument
      : (s.rounds?.[2]?.mot ?? s.rounds?.[2]?.argument ?? ''),
    tegenargument: s.rounds?.[2]?.tegenargument ?? '',
    reacted: s.rounds?.[2]?.reacted ?? false,
  };

  const draft: GameUiState = {
    ...base,
    ...s,
    episode,
    rounds: { 1: merged1, 2: merged2 },
  } as GameUiState;

  const rounds: GameUiState['rounds'] = {
    1: {
      ...merged1,
      sceneGestartOp: inferSceneGestartOp(merged1, { ...draft, round: 1 }, 1),
    },
    2: {
      ...merged2,
      sceneGestartOp: inferSceneGestartOp(merged2, { ...draft, round: 2 }, 2),
    },
  };

  const timerOn =
    s.timerOn ??
    (usesBeslistijdTimer(episode) && (rounds[1].sceneGestartOp != null || rounds[2].sceneGestartOp != null));

  return {
    ...base,
    ...s,
    v: 5,
    timerOn,
    trailerGezien: s.trailerGezien ?? {},
    episode,
    opvolging: s.opvolging ?? null,
    conceptLog: s.conceptLog ?? [],
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
    gesprekskaarten: s.gesprekskaarten ?? [],
  };
}
