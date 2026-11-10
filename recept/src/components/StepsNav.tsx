import { episodeContent } from '@data/episodes/content';
import type { EpisodeId } from '@data/episodes/meta';
import { actieveSpelStap, spelStappenVoorRonde, type SpelStapId } from '../game/spelStappen';
import type { Phase } from '../game/uiTypes';

type Props = {
  phase: Phase;
  episode: EpisodeId;
  round: 1 | 2;
  dilemmaDone: boolean;
};

function doneBefore(current: SpelStapId | null, stepId: SpelStapId, order: SpelStapId[]): boolean {
  if (!current) return false;
  return order.indexOf(stepId) < order.indexOf(current);
}

export function StepsNav({ phase, episode, round, dilemmaDone }: Props) {
  const content = episodeContent(episode);
  const stappen = spelStappenVoorRonde(episode, round);
  const order = stappen.map((s) => s.id);
  const current = actieveSpelStap(phase, round, {
    gesprekskaartActief: content.gesprekskaartActief,
    heeftDilemma: !!content.dilemma,
    dilemmaOpen: !dilemmaDone,
  });

  if (phase === 'tussen') {
    return (
      <ol className="steps">
        <li className="now" style={{ gridColumn: '1 / -1' }}>
          PAUZE / EINDE VAN RONDE 1
        </li>
      </ol>
    );
  }
  if (phase === 'voorspel') {
    return (
      <ol className="steps">
        <li className="now" style={{ gridColumn: '1 / -1' }}>
          EINDE VAN AFLEVERING 4
        </li>
      </ol>
    );
  }

  if (!current) return null;

  return (
    <ol className="steps steps--stappen">
      {stappen.map((stap, i) => {
        const isNow = stap.id === current;
        const isDone = doneBefore(current, stap.id, order);
        return (
          <li
            key={stap.id}
            className={[isDone ? 'done' : '', isNow ? 'now' : ''].filter(Boolean).join(' ')}
            aria-current={isNow ? 'step' : undefined}
          >
            {i + 1} {stap.label.toUpperCase()}
          </li>
        );
      })}
    </ol>
  );
}
